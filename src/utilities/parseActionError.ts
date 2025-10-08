type ValidationErrors = Record<string, { _errors?: string[] }> & {
  title?: { _errors?: string[] }
}

type SafeActionInnerError = {
  serverError?: string
  validationErrors?: ValidationErrors
  thrownError?: Error
}

export function parseActionError(error: SafeActionInnerError) {
  const { serverError, validationErrors, thrownError } = error

  if (serverError) {
    return serverError
  } else if (validationErrors?.title?._errors?.[0]) {
    return validationErrors.title._errors[0]
  } else if (thrownError) {
    return thrownError.message
  } else {
    return 'Unexpected error occurred'
  }
}
