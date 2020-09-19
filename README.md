# Setting up the project

[next-auth-example README.md](https://github.com/nextauthjs/next-auth-example/README.md)

# Adding new entity types

## Server-side

### API route

Copy `pages/api/profiles` into `pages/api/todos`

### Schema

Add `TodoSchema` to `utils/mongoose/schemas.js`

## Client-side

### Entity type

Copy `tree/profile` into `tree/todo`

### Page

Copy `pages/profiles` into `pages/todos`

### Form

Copy `components/profile-form` into `components/todo-form`

## Both

Search/replace preserving case `profile` into `todo`

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
