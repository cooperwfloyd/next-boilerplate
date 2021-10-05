# Next Boilerplate

## Install

This project runs on Node v14. Install Node 14 to run this project or install <a href="https://github.com/nvm-sh/nvm#install--update-script" target="_blank" rel="noopener noreferrer">NVM</a> and run `nvm install v14`. If using NVM, precede your `npm run` commands with `nvm use;`.

Run `npm install` to install the project dependencies. Each NPM script except for `deploy` will run an `npm install` before running the command to ensure that the project's dependencies are available and up to date.

## Config

All of the project's environment variables are located in `next.config.js`. This is also where redirects, rewrites, headers and i18n options can be configured.

## Develop

To spin up the dev server for this project, run `npm run dev` (usually runs a little slow the first time but is fine after that). This will start the dev server on port 3000.

## Build

To build this project, run `npm run deploy`. This will export your project into the `out` directory. The built project can be served by running `npm run out-http-server`.

## Optional TypeScript

This project optionally uses TypeScript. To turn TypeScript on for any JS file, use the extension `.ts` — or `.tsx` for JSX files. To remove TypeScript from use in a file, change the extension to `.js` or `.jsx` and remove the file's TypeScript code.

## Structure

The `/pages` directory contains all of the project's page files as well as global `_app` and `_document` files. Only the page itself should be included here and not any additional files such as components or assets.

The `/public` directory contains all of the project's static files such as images and fonts. This contents of this directory will simply be copied to the project's `/out` folder at build time.

The `/src` directory contains every project file that is not a page or a static asset. This directory is used to house files for things such as components, content files, scripts and styles.
