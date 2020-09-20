# Demo

https://react-app-starter.vercel.app/

login: admin

password: admin

# Setting up the project

[next-auth-example README.md](https://github.com/nextauthjs/next-auth-example/README.md)

# Adding entity types

```
# server-side
cp -R pages/api/profiles pages/api/todos # api route

# client-side
cp -R pages/profiles pages/todos # client route
cp -R tree/profile tree/todo # entity type
cp components/profile-form components/todo-form # form
```

- Search for `profile` project-wide and replace (preserving case) with `todo`
- `tree/tree.js:` Import and add `TodoType` to `Tree`
- `utils/mongoose/schemas.js:` Add `TodoSchema`
- `middlewares/database.js:` Import and add `TodoSchema` to `req.models`

Optionally:

- `components/nav.js:` Add `<Link href="/todos">Todos</Link>` to `<MenuItems>`

# Credits

## Auth

- [NextAuth.js](https://next-auth.js.org)

## Object Data Modeling

### Client-side

- [MobX-state-tree](https://mobx-state-tree.js.org)

### Server-side

- [Mongoose](https://mongoosejs.com)

## i18n

TODO

## Styling

- [tailwindcss](https://tailwindcss.com) with [twin.macro](https://github.com/ben-rogerson/twin.macro)
- [chakra-ui](https://chakra-ui.com/)

## Forms

- [React Hook Form](https://react-hook-form.com)

## Misc

- [React Table](https://react-table.tanstack.com)
