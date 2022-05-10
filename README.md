# WEB-RI
This repository is for the Web-RI project. 

The Web-RI is a web interface that allows the users to interact with the functionalities provided by the SDK-RI. It can be reused and customized as part of each pilot specification and implementation needs.

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started
This project is divided into different directories:
- components: contains all visual elements that can be reused in all pages.
- lib: contains information such forms, colors, user and server configuration.
- pages: each file represents a React component with associated route based on its file name.
- public: contains files such images and logos.
- styles: responsible to customize the design of the website.

## Pre-Requisites
To perform the authentication, the i3M Wallet software must be installed and running on the user's computer. Also, must be created at least one wallet entry in the app, and for wallet entry must create at least one identity as well.

You can access [here](https://i3-market.gitlab.io/code/backplane/backplane-api-gateway/backplane-api-specification/systems/trust-security-privacy/smart-wallet/wallet-desktop.html) to get instructions to how to use it.


## Installation
```javascript
npm install
```

## Run
```javascript
[SDK_RI_ENDPOINT] [MONGO_URL] [OIDC_URL] npm run dev -- -p [PORT]

// SDK_RI_ENDPOINT: sdk-ri endpoint (e.g. http://12.345.6.789:1234)
// MONGO_URL: mongodb local instance (e.g. mongodb://localhost:port)
// OIDC_URL: oidc url deployed in i3-Market network (e.g. https://identity1.i3-market.eu)
// PORT: default running port (default=3000)
```
Note: Web-RI instance must run in same port as the registered OIDC client.

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### OIDC Client registration
When launching the Web-RI for the first time, it will request for an OIDC Client registered.
In order to achieve that, you must follow the steps in http://localhost:3000/oidc.

After successfully added the OIDC Client configuration, you will be redirected to the Authentication page.

### Register a verifiable credential in the Wallet
When choosing the "Register" button in authentication page, you can register a new verifiable credential in the wallet. For that, you must choose the role and set the desired username. Then, Web-RI will call the Wallet to add the new verifiable credential.

If the information was successfully, you will be redirected to the Login page.

### Login with the Wallet
When choosing the "Login" button in authentication page, you can log in using a verifiable credential from the wallet. For that, you must choose the role and then Web-RI will call the Wallet to sign with the desired role.

With successful login, you will be redirected to the Web-RI homepage.

## Run in Docker
To run WEB-RI as docker, first you must define the following environment variables in docker-compose.yml file:
````yaml
environment: 
  SDK_RI_ENDPOINT: sdk-ri endpoint
  MONGO_URL: mongodb url 
  OIDC_URL: oidc url

  MONGO_INITDB_ROOT_USERNAME: mongodb username
  MONGO_INITDB_ROOT_PASSWORD: mongodb password
````
Then,
```javascript
docker-compose up
```

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
```bash
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

___
###### This work was done in the context of i3-MARKET Research Project, which has received funding from the European Union’s Horizon 2020 research and innovation programme under grant agreement No 871754

