import { extendType, intArg, nonNull, objectType, stringArg } from 'nexus'
import UserModel from 'App/Models/User'

export const User = objectType({
  name: 'User',
  definition(t) {
    t.nonNull.int('id')
    t.string('username')
    t.string('email')
    t.string('token')
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
    // delete a company by id
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
      async resolve(_root, { email, password }, { auth }) {
        const { token } = await auth.attempt(email, password)
        const user = await auth.user
        return { ...{ token }, ...user?.$attributes }
      },
    })
  },
})

export const CompanyQuery = extendType({
  type: 'Query',
  definition(t) {
    // get all companies
    t.list.field('users', {
      type: 'User',
      resolve(_root, args, _ctx) {
        console.log(args)
        return [{ id: 1, username: 'manu', email: 'example@mail.com' }]
      },
    })
    // get company by id
    t.field('user', {
      type: 'User',
      args: {
        id: nonNull(intArg()),
      },
      resolve(_root, _args, ctx) {
        console.log(ctx)
        return { id: 1, username: 'manu', email: 'example@mail.com' }
      },
    })
    // t.list.field('roles', {
    //   type: 'Role',
    //   resolve(_root, _args, ctx) {
    //     return ctx.db.role.findMany();
    //   },
    // });
  },
})
