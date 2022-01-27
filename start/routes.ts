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
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { makeSchema } from 'nexus'
import * as types from '../graphql'
import { join } from 'path'
import { GraphQLServer } from '@91codes/adonis-graphql'
import { context } from '../context'

const schema = makeSchema({
  // GraphQL types that will be used to construct your GraphQL schema.
  types,
  outputs: {
    // Output path to where nexus should write the generated TypeScript definition types derived from your schema. This is mandatory to benefit from Nexus' type-safety.
    typegen: join(__dirname, '..', 'nexus-typegen.ts'),
    // Output path to where nexus should write the SDL (schema definition language) version of your GraphQL schema.
    schema: join(__dirname, '..', 'schema.GraphQL'),
  },
  contextType: {
    // Path to the module where the context type is exported
    module: join(__dirname, '..', 'context.ts'),
    // Name of the export in that module
    export: 'Context',
  },
})

const server = new GraphQLServer({ schema, context })
server.start()

Route.get('/', async () => {
  return { hello: 'world' }
})
Route.any('/graphql', async (ctx: HttpContextContract) => {
  // await server.start()

  return server.handle(
    ctx,
    ctx.request.method() === 'GET' || ctx.request.types().includes('text/html') // Show landing screen in this case
  )
})
