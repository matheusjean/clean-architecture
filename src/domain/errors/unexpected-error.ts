export class UnexpectedError extends Error {
  constructor () {
    super('Someting wrong. Try again later.')
    this.name = 'InvalidCredentialsError'
  }
}