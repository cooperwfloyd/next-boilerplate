# Next Boilerplate

## Install

This project runs on Node v14. Install Node 14 to run this project or install <a href="https://github.com/nvm-sh/nvm#install--update-script" target="_blank" rel="noopener noreferrer">NVM</a> and run `nvm install v14`. If using NVM, precede your `npm run` commands with `nvm use;`.

Run `npm install` to install the project dependencies. Each NPM script except for `deploy` will run an `npm install` before running the command to ensure that the project's dependencies are available and up to date.

## Config

All of the project's public environment variables are located in `next.config.js`. This is also where redirects, rewrites, headers and i18n options can be configured.

## Develop

To spin up the dev server for this project, run `npm run dev` (usually runs a little slow the first time but is fine after that). This will start the dev server on port 3000.

## Build

To build this project, run `npm run deploy`. This will export your project into the `out` directory. The built project can be served by running `npm run out-http-server`.

## Optional TypeScript

This project optionally uses TypeScript. To turn TypeScript on for any JS file, use the extension `.ts` — or `.tsx` for JSX files. To remove TypeScript from use in a file, change the extension to `.js` or `.jsx` and remove the file's TypeScript code.

## Structure

### Pages

The `pages` directory contains all of the project's page files as well as global `_app` and `_document` files. Only the page itself and any page-specific CSS files should be included here and not any additional files such as components or assets.

#### Import Page-specific CSS

Place a `.scss` file in the same directory as your page and then import it into your page with `import "./filename.scss";`.

#### Routing

Next.JS has built-in routing based on how you name your file. Below are examples in this project of how specific and dynamic routes are generated. These routes are specified per sub-directory in the `pages` directory, so any routes placed further down the tree will override any previous routes.

- **High specificity:** The `pages` directory includes an `index` file, which will match the home page (ex. `/`).
- **Medium specificity:** The `pages` directory also includes an `[id]` file that will match any routes other than the `index` page directly inside the directory (ex. `/sample-page` This route will create a conflict with the `[...id]` route if they are both using the same list of paths in `getStaticPaths`.).
- **Low specificity:** The `pages` directory also includes a `[...id]` file that will match any routes other than the `index` page in any sub-directories (ex. `/sample-page` and `/sample-page/sub-page`) This route will create a conflict with the `[id]` route if they are both using the same list of paths in `getStaticPaths`.
- **Catch-all specificity:** If you want a universal catch-all route (matches `/`, `/sample-page`, `sample-page/sub-page`, use the `[[...id]]` convention to name your file. This file will override all of the above routes and Next.JS will crash if you attempt to use any other routes in a directory with this route.

### Static Files

The `/public` directory contains all of the project's static files such as images and fonts. This contents of this directory will simply be copied to the project's `/out` folder at build time.

### Everything Else

The `/src` directory contains every project file that is not a page or a static asset. This directory is used to house files for things such as components, content files, scripts and styles.

## Headless WordPress

### Environment

Create a `.env` file on your root if you don't already have one and add the `WP_API_URL = {yoururl}/graphql` variable to your list. If you're testing with a local installation of WordPress, you'll likely want to use `http` instead of `https` since `fetch` doesn't like self-signed certificates. 

### Plugins

- <a href="https://wordpress.org/plugins/add-wpgraphql-seo/" target="_blank" rel="noopener noreferrer">Add WPGraphQL SEO</a>
- <a href="https://wordpress.org/plugins/advanced-custom-fields/" target="_blank" rel="noopener noreferrer">Advanced Custom Fields</a>
- <a href="https://wordpress.org/plugins/wp-graphql/" target="_blank" rel="noopener noreferrer">WP GraphQL</a>
- <a href="https://www.wpgraphql.com/extenstion-plugins/wpgraphql-for-advanced-custom-fields/" target="_blank" rel="noopener noreferrer">WPGraphQL for Advanced Custom Fields</a>
- <a href="https://wordpress.org/plugins/wp-migrate-db/" target="_blank" rel="noopener noreferrer">WP Migrate DB (Pro Version)</a>
- <a href="https://wordpress.org/plugins/wordpress-seo/" target="_blank" rel="noopener noreferrer">Yoast SEO</a>

### Data Fetching

The functions used to pull data from WordPress include `getWPPage`, `getWPPost`, `getAllWPPosts`, `getAllWPPageIds` and `getAllWPPostIds`. Since all of these functions are fetching data, make sure to wrap them in an `async` function and `await` their response. Below is an example page that uses these functions to pass props to a page, destructures those props for use as variables in the page, generates static HTML and generates a static path to the page.

This example can be used in any dynamic route in the `pages` directory (ex. `[id]`, `[...id]`). If you're using this example with a directory-specific `[id]` route, you'll need to add an argument of `{childPages: false}` to the `getAllWPPageIds` function.

If you want to exclude any auto-generated routes from the `getStaticPaths` list, add an argument of `{exclude: ["path-to-page", "path-to-other-page"]}` to `getAllWPPageIds`.

```
import Global from "../src/components";
import ResponsiveNav from "../src/components/ResponsiveNav";
import Header from "../src/components/Header";
import Footer from "../src/components/Footer";
import Meta from "../src/components/Meta";
import {getWPPage, getAllWPPageIds} from "../src/lib/getContent";
import parseHTML from "html-react-parser";

export const getStaticPaths = async () => {
  const paths = await getAllWPPageIds(); // Gets list of paths for Next.js to generate

  return {
    paths,
    fallback: false,
  }
}

export const getStaticProps = async context => { // Switch to getServerSideProps if you want to server render instead of generating static HTML
  const data = await getWPPage({id: context.params.id}); // Gets data to be passed to the page. Use optional "query" parameter to pass a custom GraphQL query instead of the default fields

  return {
    props: data.page
  };
}

const Page = ({
    content,
    featuredImage,
    seo: {
      metaDesc,
      metaRobotsNoindex,
      metaRobotsNofollow,
      opengraphDescription,
      opengraphImage,
      opengraphTitle,
      opengraphType,
      twitterDescription,
      twitterImage,
      twitterTitle
    },
    template,
    title,
  } = page) => {
  return (
    <Global className={`page ${template?.templateName?.toLowerCase() || ""}`}>
      <Meta
        description={metaDesc}
        featuredImage={featuredImage?.node || null}
        follow={metaRobotsNofollow}
        index={metaRobotsNoindex}
        ogDescription={opengraphDescription}
        ogImage={opengraphImage}
        ogTitle={opengraphTitle}
        ogType={opengraphType}
        title={title}
        twitterDescription={twitterDescription}
        twitterImage={twitterImage}
        twitterTitle={twitterTitle}
      />
      <ResponsiveNav/>
      <Header/>
      <main className="max-content-width">
        <section className="intro">
          {featuredImage ? <img src={featuredImage.node.mediaItemUrl} alt={featuredImage.node.altText}/> : null}
          {content ? parseHTML(content) : null}
        </section>
      </main>
      <Footer/>
    </Global>
  );
}

export default Page;
```
