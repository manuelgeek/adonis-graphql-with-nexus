// import { ApplicationContract } from '@ioc:Adonis/Core/Application'
// import { GraphQLServer } from '@91codes/adonis-graphql'
// import { join } from 'path'
// import { makeSchema } from 'nexus'
// import * as types from '../graphql'
// import { context } from '../context'
//
// /*
// |--------------------------------------------------------------------------
// | Provider
// |--------------------------------------------------------------------------
// |
// | Your application is not ready when this file is loaded by the framework.
// | Hence, the top level imports relying on the IoC container will not work.
// | You must import them inside the life-cycle methods defined inside
// | the provider class.
// |
// | @example:
// |
// | public async ready () {
// |   const Database = this.app.container.resolveBinding('Adonis/Lucid/Database')
// |   const Event = this.app.container.resolveBinding('Adonis/Core/Event')
// |   Event.on('db:query', Database.prettyPrint)
// | }
// |
// */
// export default class GraphqlProvider {
//   constructor(protected app: ApplicationContract) {}
//
//   public register() {
//     // Register your own bindings
//   }
//
//   public async boot() {
//     // All bindings are ready, feel free to use them
//     const schema = makeSchema({
//       // GraphQL types that will be used to construct your GraphQL schema.
//       types,
//       outputs: {
//         // Output path to where nexus should write the generated TypeScript definition types derived from your schema. This is mandatory to benefit from Nexus' type-safety.
//         typegen: join(__dirname, '..', 'nexus-typegen.ts'),
//         // Output path to where nexus should write the SDL (schema definition language) version of your GraphQL schema.
//         schema: join(__dirname, '..', 'schema.GraphQL'),
//       },
//       contextType: {
//         // Path to the module where the context type is exported
//         module: join(__dirname, '..', 'context.ts'),
//         // Name of the export in that module
//         export: 'Context',
//       },
//     })
//
//     const server = new GraphQLServer({ schema, context })
//     await server.start()
//
//     this.app.container.singleton('Adonis/GraphQL/Server', () => server)
//   }
//
//   public async ready() {
//     // App is ready
//   }
//
//   public async shutdown() {
//     // Cleanup, since app is going down
//   }
// }
