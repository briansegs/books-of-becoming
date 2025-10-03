import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'

export default async function page() {
  const { userId } = await auth()

  if (!userId) {
    redirect('/')
  }

  redirect(`/dashboard/${userId}`)

  return <div className="flex min-h-screen w-full items-center justify-center">dashboard page</div>
}
