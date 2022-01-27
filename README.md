# WEB-RI
This repository is for the WEB-RI project. 

The WEB-RI is a web interface that allows the users to interact with the functionalities provided by the SDK-RI. It can be reused and customized as part of each pilot specification and implementation needs.

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started
This project is divided into different directories:
- components: contains all visual elements that can be reused in all pages.
- lib: contains information such forms, colors, user and server configuration.
- pages: each file represents a React component with associated route based on its file name.
- public: contains files such images and logos.
- styles: responsible to customize the design of the website. 

## Installation
```bash
npm install
```

## Run
```bash
[SDK_RI_ENDPOINT] [I3MARKET_USERNAME] [I3MARKET_PASSWORD] npm run dev

# SDK_RI_ENDPOINT: sdk-ri endpoint (http://12.345.6.789:1234 example)
# I3MARKET_USERNAME: i3-MARKET login username
# I3MARKET_PASSWORD: i3-MARKET login password
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.js`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages. Some of the API routes correspond to full pages, while some only return the contents of specific components.

## Run in Production
To run WEB-RI as docker, first you must define the following environment variables in docker-compose.yml file:
````yaml
environment: 
  SDK_RI_ENDPOINT: sdk-ri endpoint
  I3MARKET_USERNAME: i3-MARKET login username
  I3MARKET_PASSWORD: i3-MARKET login password
````
Then,
````bash
docker-compose up
````

### Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

### Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.


### Lint with auto-fix
Run the following command to auto-fix some eslint warnings:
```sh
make lint
```

### Tags
For editors that support tags, you can run the following command to create the ./tags file.

```sh
make tags
```

## Credits
This repository has been created by:

Márcio Mateus [marcio.mateus@unparallel.pt](mailto:marcio.mateus@unparallel.pt)

Pedro Ferreira [pedro.ferreira@unparallel.pt](mailto:marcio.mateus@unparallel.pt)

## License
The code in ths repository is licensed under the [MIT License](https://opensource.org/licenses/MIT).
