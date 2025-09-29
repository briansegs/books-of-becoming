import { httpRouter } from 'convex/server'
import { httpAction } from './_generated/server'
import { WebhookEvent } from '@clerk/nextjs/server'
import { Webhook } from 'svix'
import { internal } from './_generated/api'

const validatePayload = async (req: Request): Promise<WebhookEvent | undefined> => {
  const rawBody = await req.text()
  const payload = JSON.parse(rawBody)
  const body = JSON.stringify(payload)

  const svixHeaders = {
    'svix-id': req.headers.get('svix-id')!,
    'svix-timestamp': req.headers.get('svix-timestamp')!,
    'svix-signature': req.headers.get('svix-signature')!,
  }

  const webhook = new Webhook(process.env.CLERK_WEBHOOK_SECRET || '')

  try {
    const event = webhook.verify(body, svixHeaders) as WebhookEvent

    return event
  } catch (error) {
    console.error('Clerk webhook request could not be verified', error)

    return
  }
}

const handleClerkWebhook = httpAction(async (ctx, req) => {
  const event = await validatePayload(req)

  if (!event) {
    return new Response('Could not validate Clerk payload', {
      status: 400,
    })
  }

  const eventType = event.type

  console.log(`Received Clerk webhook: ${eventType}`)

  // Handle user.created (log only, skip DB writes — often incomplete for email signups)
  if (eventType === 'user.created') {
    const {
      id,
      email_addresses,
      image_url,
      username: user_name,
      first_name,
      last_name,
    } = event.data

    const email = email_addresses?.[0]?.email_address

    if (!email) {
      console.warn(`Missing email for user.created event. Skipping user: ${id}`)
      return new Response('Email missing. Skipping.', { status: 200 })
    }

    const username = user_name ?? `${first_name ?? ''} ${last_name ?? ''}`.trim()

    try {
      await ctx.runMutation(internal.user.createUser, {
        clerkId: id,
        username,
        imageUrl: image_url,
        email,
      })

      console.log(`User created in DB: ${id}`)
    } catch (err) {
      console.error(`Error storing user ${id}`, err)
      return new Response('Database error', { status: 500 })
    }
  }

  // Handle user.updated (store or update user in Convex)
  if (eventType === 'user.updated') {
    const { id, email_addresses, image_url, username } = event.data

    const email = email_addresses?.[0]?.email_address

    if (!email) {
      console.warn(`Missing email for user.updated event. Skipping user: ${id}`)
      return new Response('Email missing. Skipping.', { status: 200 })
    }

    try {
      await ctx.runMutation(internal.user.updateUserInternal, {
        clerkId: id,
        data: {
          username: username || '',
          imageUrl: image_url,
          email,
        },
      })

      console.log(`User updated in DB: ${id}`)
    } catch (err) {
      console.error(`Error storing user ${id}`, err)
      return new Response('Database error', { status: 500 })
    }
  }

  if (eventType === 'user.deleted') {
    const { id } = event.data

    try {
      if (!id) {
        console.error('Missing user ID for deletion')
        return new Response('Missing user ID', { status: 400 })
      }

      await ctx.runMutation(internal.user.deleteUserInternal, { clerkId: id })
      console.log(`User deleted: ${id}`)
    } catch (err) {
      console.error(`Error deleting user ${id}`, err)
      return new Response('Error deleting user', { status: 500 })
    }
  }

  return new Response(null, {
    status: 200,
  })
})

const http = httpRouter()

http.route({
  path: '/clerk-users-webhook',
  method: 'POST',
  handler: handleClerkWebhook,
})

export default http
