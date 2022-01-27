/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for the majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'
import server from '@ioc:App/GraphQL/Server'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

Route.get('/', async () => {
  return { hello: 'world' }
})
Route.any('/graphql', async (ctx: HttpContextContract) => {
  return server.handle(
    ctx,
    ctx.request.method() === 'GET' || ctx.request.types().includes('text/html') // Show landing screen in this case
  )
})
