import { extendType, objectType } from 'nexus'

export const User = objectType({
  name: 'User',
  definition(t) {
    t.nonNull.int('id')
    t.string('username')
    t.string('email')
    // t.string('post')
  },
})

export const CompanyQuery = extendType({
  type: 'Query',
  definition(t) {
    // get all companies
    t.list.field('users', {
      type: 'User',
      resolve(_root, _args, _ctx) {
        return [{ id: 1, username: 'manu', email: 'example@mail.com' }]
      },
    })
    // get company by id
    // t.field('company', {
    //   type: 'Company',
    //   args: {
    //     id: nonNull(intArg()),
    //   },
    //   resolve(_root, args, ctx) {
    //     return ctx.db.company.findUnique({
    //       where: { id: args.id },
    //     });
    //   },
    // });
    // t.list.field('roles', {
    //   type: 'Role',
    //   resolve(_root, _args, ctx) {
    //     return ctx.db.role.findMany();
    //   },
    // });
  },
})
