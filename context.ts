import auth from 'Config/auth'
import { AuthContract } from '@ioc:Adonis/Addons/Auth'

export interface Context {
  auth: AuthContract
}

export const context = {
  auth: auth,
}
