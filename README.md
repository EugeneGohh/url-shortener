# CoinGecko Engineering Written Assignment - Url Shortener

This is a URL Shortener web application built with Next.js, TailwindCSS and MongoDB that allows users to convert user-provided target URL ("_Target URL_") to short-form URL ("_Short URL_"), track number of clicks, originating geolocation and timestamp of each visit to a Short URL & can be publicly shared and accessed.

## Tech Stack

The following technologies were used to build the URL shortener:

- [Next.js](https://nextjs.org/): A React-based framework for building server-side rendered (SSR) web applications.
- [TailwindCSS](https://tailwindcss.com/): A utility-first CSS framework for quickly styling web applications.
- [MongoDB](https://www.mongodb.com/): A NoSQL document-oriented database for storing and retrieving data.

## The Rough App Design

![CG-Assignment excalidraw](https://user-images.githubusercontent.com/64187129/224989481-db4299ca-3fb6-400f-ad5c-ee4be58e114d.png)

## Prerequisites

Before moving into installing this project, make sure you have the following installed on your local machine:

- Node.js `v16.13.2+` and npm (Node Package Manager)
- Git or GitKraken
- [MongoDB Cloud](https://www.mongodb.com/cloud)

## Branching Strategy

The URL shortener project uses the Gitflow branching strategy, which is a well-known and widely used model for managing Git branches. The Gitflow model defines two main branches: `main` and `develop`, as well as several **supporting branches** for **features development**, **hotfixes**, and **releases**.

`main`: The `main` branch contains the stable and production-ready code. It should only be updated through merges from the `release` or `hotfix` branches.

`develop`: The `develop` branch contains the latest development code, which may not be fully tested or stable. All new features, bug fixes, and other changes should be merged into develop before they can be merged into `main`.

`feature/xxx`: A `feature` branch is used to develop a new features or functionality. They should be created from `develop` and merged back into `develop` once they are completed and tested.

`hotfix/xxx`: Hotfix branches are used to fix critical bugs or issues in the production code. They should be created from `main` and merged into both `main` and `develop` once the fixes are completed and tested.

`release/xxx`: Release branches are used to prepare a new release of the codebase. They should be created from `develop` and merged into both `develop`and `main` once they are ready for deployment.

## Installation Guide

1. Clone the repository to your local machine using

   ```
   git clone https://github.com/EugeneGohh/url-shortener
   ```

2. Navigate into the respository by using

   ```
   cd url-shortener
   ```

3. Install all the required dependencies by running

   ```
   npm install
   # or
   yarn install
   ```

4. Copy the `.env.example` file which located at the root of the directory to `.env` (which will be ignored by Git)

   ```
   cp .env.example .env
   ```

5. For setting up MongoDB in the cloud, please refer to this [guide](./MongoDB%20Setup%20Guide.md).
6. Add your MongoDB connection string

   ```
   MONGODB_URI=YOUR_MONGODB_URI
   NEXT_PUBLIC_VERCEL_URL=https://url-trimming.vercel.app/
   BASE=http://localhost:3000
   ```

7. Start the development server by running

   ```
   npm run dev
   # or
   yarn dev
   ```

8. To run the test suite

   ```
   npm run test
   ```

## Configuration

The URL shortener project should be configured using these environment variables, which are defined in the `.env` file. Here are the available environment variables:

`MONGODB_URI`: The MongoDB connection string.

`NEXT_PUBLIC_VERCEL_URL`: The production URL of the web application, used for generating shorten URLs in **production environment**.

`BASE`: The base URL of the web app in development environment, used for generating shorten URLs in **development environment**.

## Usage

To shorten a URL, follow these steps:

1. Enter a long URL in the input field.
2. Click the "**scissor**" button located on right of the input field.
3. Click the "**Get New Data**" button to bring in new data of the shortened URL.
4. A **Short URL**, the **original Target URL** and the **Title tag of the Target URL** returned in a new card.
5. Click "**View Report**", to view **number of clicks**, **originating geolocation** and **timestamp** of each visit to the Short URL
6. Copy the shortened URL to your clipboard or share it directly on social media.

[Video on How to Use](https://www.youtube.com/watch?v=-UlGg7phVMY)

## APIs

The URL shortener contains these RESTful APIs for

1. Retrieving all shortened URLs.
2. Receiving a Target URL as input, generates a unique short URL with a maximum length of 15 characters, stores the Target URL and short URL in a database, and returns the short URL, Target URL, and title tag of the Target URL to the user.
3. Receiving a short URL as input, looks up the corresponding Target URL in the database, update the number of clicks, originating geolocation, and timestamp of the visit in the database, and redirects the user to the Target URL.

**The API endpoints are**:

```
GET /api/all
Get all the shortened URLs

POST /api/shorten?origUrl="TARGET_URL"
Create a new short url based on target url

GET /api/redirect?shortUrl="SHORT_URL"
Update number of clicks, originating geolocation,
and timestamp of the visit in the database.
Redirects the user to the Target URL.
```

## Repository Structure

The repository has the following structure:

```
.
│   __tests__/
│   ├── index.test.js
│   ├── snapshot.js
│   lib/
│   ├── mongodb.js
│   ├── schema.js
│   └── seed.js
├── public/
│   ├── favicon.ico
│   ├── next.svg
│   └── thirteen.svg
│   └── vercel.svg
├── src/
│   ├── pages/
│   │   ├── api/
│   │   │   ├── all.js
│   │   │   ├── redirect.js
|   |   |   ├── shorten.js
│   │   ├── _app.js
│   │   ├── _document.js
│   │   ├── index.js
│   ├── styles/
│   │   ├── globals.css
│   │   ├── Home.module.css
├── .env.example
├── .eslintrc.json
├── .gitignore
├── jsconfig.json
├── next.config.js
├── package-lock.json
├── package.json
├── postcss.config.js
├── README.md
└── tailwind.config.js
```

### Overview of Important Folders and Files

- `__tests__/`: Contains automated tests used in the app.
- `lib/`: Contains utility functions used in the app.

  ```
     ├── mongodb.js --> File to connect to MongoDB
     ├── schema.js --> Contains structure of a document in a collection
     └── seed.js --> Code to populate the database with initial data
  ```

- `public/`: Contains static assets such as images and favicons.
- `src/`: Contains the source code of the Next.js app.
- `src/pages/`: Contains the app's pages and API routes.
- `src/styles/`: Contains the CSS styles used by the application
- `tailwind.config.js`: Contains the configuration for TailwindCSS.
- `package.json`: Contains the project's dependencies and scripts.

## Dependencies and Other Relevant Information (i.e scaffolding tools)

### Scripts

- `dev` - Runs Next.js in development mode.
- `build` - Builds the Next.js app for production.
- `start` - Starts a Next.js production server.
- `lint` - Lints the Next.js app using ESLint.
- `seed` - Seeds the MongoDB database with dummy data.
- `test` - Runs Jest tests in watch mode.

### Dependencies

The application was built using the following dependencies and scaffolding tools:

- [`axios`](https://www.npmjs.com/package/axios): A promise-based HTTP client for Node.js and the browser.
- [`cheerio`](https://www.npmjs.com/package/cheerio): A jQuery-like library for parsing HTML and manipulating the DOM.
- [`dotenv`](https://www.npmjs.com/package/dotenv): A zero-dependency module that loads environment variables from a .env file into process.env.
- `eslint`: A tool for identifying and reporting on patterns found in JavaScript code.
- `eslint-config-next`: A set of ESLint rules for Next.js applications.
- [`faker`](https://www.npmjs.com/package/@faker-js/faker): A library for generating fake data such as names, addresses, and phone numbers.
- `mongodb`: A NoSQL database that uses JSON-like documents with optional schemas.
- [`mongoose`](https://www.npmjs.com/package/mongoose): An Object-Document Mapping (ODM) library for MongoDB and Node.js.
- [`nanoid`](https://www.npmjs.com/package/nanoid): A tiny, secure, URL-friendly unique ID generator for JavaScript.
- `next`: A React-based framework for building server-side rendered (SSR) web applications.
- `react`: A JavaScript library for building user interfaces.
- `react-dom`: A package that provides DOM-specific methods that can be used at the top level of a web application.
- [`react-icons`](https://www.npmjs.com/package/react-icons): A set of SVG icons for popular icon libraries such as Font Awesome and Material Design.

### Development Dependencies

The project also has the following development dependencies:

- [`faker`](https://www.npmjs.com/package/@faker-js/faker): A TypeScript-compatible version of the faker library, which provides type definitions for use with TypeScript.
- [`@testing-library/jest-dom`](https://www.npmjs.com/package/@testing-library/jest-dom): A library of custom Jest matchers that you can use to extend Jest's default assertions.
- [`@testing-library/react`](https://www.npmjs.com/package/@testing-library/react): A library for testing React components and behavior.
  autoprefixer: A tool for adding vendor prefixes to CSS rules.
- [`jest`](https://jestjs.io/): A JavaScript testing framework.
- `jest-environment-jsdom`: A JSDOM-based environment for running Jest tests.
- `postcss`: A tool for transforming CSS with JavaScript.
- `autoprefixer`: A plugin for PostCSS that uses data from Can I Use to add vendor prefixes to CSS rules.
- [`tailwindcss`](https://tailwindcss.com/): A utility-first CSS framework for rapidly building custom user interfaces.

### Scaffolding Tools

The project does not use any scaffolding tools. However, it does use Next.js, which provides a framework for building React-based web applications. The `create-next-app` command can be used to create a new Next.js project with a basic file structure and configuration.

## Deployed Application URL

The deployed application can be found at <https://url-trimming.vercel.app/> 🎉.

Thank you for reviewing my submission 🥳!

## References

- [What is Git Flow?](https://www.gitkraken.com/learn/git/git-flow)
- [GitKraken for Git Flow](https://help.gitkraken.com/gitkraken-client/git-flow/)
- [Version Control Best Practices](https://about.gitlab.com/topics/version-control/version-control-best-practices/)
- [Aibnb JavaScript Style Guide](https://github.com/airbnb/javascript)
- [Vercel Deployment](https://vercel.com/docs/concepts/deployments/overview)
- [Next.js API Route](https://nextjs.org/docs/api-routes/introduction)

## License

[MIT](https://choosealicense.com/licenses/mit/)
