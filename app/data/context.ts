import AuthManager, { AuthContract } from '@ioc:Adonis/Addons/Auth'

export interface Context {
  auth: AuthContract
}

export const context = {
  auth: AuthManager,
}
