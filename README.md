This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run 
```bash
npm install
```

Then, run
```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.js`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

## Components

You can find reusable components at the `components` directory. The directories inside it express how pages are layed out. Some of the most used components are:

- `components/Layout.js` - Basic Layout around each page
- `components/ErrorC.js` - Error component to be displayed after an api call fails
- `components/Loading.js` - Loading component to be displayed when api call result is loading
- `components/buttons.js` - Contains various buttons

## Lib

The `lib` directory contains various files with things other than components or pages. Here are some of the most important ones:

- `lib/server.js` - contains things that are useful on the backend side of the application (under `pages/api`).
- `lib/hooks.js` - contains hooks that are useful throuought the application like useData and useMap.
- `lib/colors.js` - contains the color definitions that we want to use in Javascript code.
- `lib/form.js` - contains auxiliary functions for dealing with forms.
- `lib/util.js` - contains auxiliary functions that deal with other things.
- `lib/user.js` - contains hardcoded user data (for now).
