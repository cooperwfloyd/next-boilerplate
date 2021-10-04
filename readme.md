# Next Boilerplate

This project runs on Node v14. Install Node 14 to run this project or install <a href="https://github.com/nvm-sh/nvm#install--update-script" target="_blank" rel="noopener noreferrer">NVM</a> and run `nvm install v14`. If using NVM, precede your `npm run` commands with `nvm use;`.

Run `npm install` to install the project dependencies. Each NPM script except for `deploy` will run an `npm install` before running the command to ensure that the project's dependencies are available and up to date.

To spin up the dev server for this project, run `npm run dev`. This will start the dev server on port 3000.

To build this project, run `npm run deploy`. This will output your project into the `out` directory. The built project can be served by running `npm run out-http-server`.

This project optionally uses TypeScript. To turn TypeScript on for any JS file, use the extension `.ts` — or `.tsx` for JSX files. To remove TypeScript from use in a file, change the extension to `.js` or `.jsx` and remove the file's TypeScript code.
