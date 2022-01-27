import { extendType, intArg, nonNull, objectType, stringArg } from 'nexus'
import UserModel from 'App/Models/User'

export const User = objectType({
  name: 'User',
  definition(t) {
    t.nonNull.int('id')
    t.nonNull.string('username')
    t.nonNull.string('email')
    t.string('token')
    t.string('message')
    // t.string('posts')
  },
})

export const UserMutation = extendType({
  type: 'Mutation',
  definition(t) {
    // create a new user
    t.nonNull.field('createUser', {
      type: 'User',
      args: {
        username: nonNull(stringArg()),
        email: nonNull(stringArg()),
        password: nonNull(stringArg()),
      },
      validate: ({ string }, args, _ctx) => ({
        username: string()
          .required()
          .test('user', `user with ${args.username} already exists`, async (username) => {
            return !(await UserModel.findBy('username', username))
          }),
        email: string()
          .email()
          .required()
          .test('user', `user with ${args.email} already exists`, async (email) => {
            return !(await UserModel.findBy('email', email))
          }),
        password: string().min(6).required(),
      }),
      async resolve(
        _root,
        { username, email, password }: { username: string; email: string; password: string },
        _ctx
      ) {
        return await UserModel.create({
          username,
          email,
          password,
        })
      },
    })
    // login
    t.field('userLogin', {
      type: 'User',
      args: {
        email: nonNull(stringArg()),
        password: nonNull(stringArg()),
      },
      validate: ({ string }, _args, _ctx) => ({
        email: string().required(),
        password: string().required(),
      }),
      // @ts-ignore
      async resolve(_root, { email, password }, { auth }) {
        const { token } = await auth.attempt(email, password)
        const user = await auth.user
        return { ...{ token }, ...user?.$attributes }
      },
    })
    // logout
    t.field('userLogout', {
      type: 'User',
      authorize: async (_root, _args, { auth }) => {
        return auth.use('api').check()
        // return auth.use('api').isLoggedIn
      },
      async resolve(_root, _args, { auth }) {
        await auth.logout()

        return { message: 'Logged out' }
      },
    })
  },
})

export const UserQuery = extendType({
  type: 'Query',
  definition(t) {
    // get all users
    t.list.field('users', {
      type: 'User',
      resolve(_root, _args, _ctx) {
        return UserModel.all()
      },
    })
    // get user by id
    t.field('user', {
      type: 'User',
      args: {
        id: nonNull(intArg()),
      },
      async resolve(_root, args, _ctx) {
        return await UserModel.find(args.id)
      },
    })
  },
})
