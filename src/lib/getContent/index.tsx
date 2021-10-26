import {promises as fs} from "fs";
import path from "path";
import matter from "gray-matter";

const getContentFile = async filePath => {
  try {
    return await fs.readFile(filePath);
  } catch (error) {
    throw new Error(error);
  }
}

const getMdFile = async filePath => {
  try {
    const contentFile = await getContentFile(filePath);
    const {data, content} = matter(contentFile);
    return {
      data,
      content
    };
  } catch (error) {
    throw new Error(error);
  }
}

const getJsonFile = async filePath => {
  try {
    const contentFile = await getContentFile(filePath);
    return JSON.parse(contentFile.toString());
  } catch (error) {
    throw new Error(error);
  }
}

export const getContentFiles = async ({dir, extension = true}) => {
  try {
    const contentDir = await fs.readdir(dir);
    return contentDir.map(item => {
      if(extension) return path.parse(item).base.toString();
      else return path.parse(item).name.toString();
    });
  } catch (error) {
    throw new Error(error);
  }
}

export const getContentById = async ({contentDir, id, fields = []}) => {
  const filePath = `${contentDir}${id}`;
  if(contentDir.includes("md")) return await getMdFile(`${filePath}.md`);
  if(contentDir.includes("json")) return await getJsonFile(`${filePath}.json`);
}

export const getContentByPath = async ({contentDir, fileName, fields = []}) => {
  const filePath = `${contentDir}${fileName}`;
  if(contentDir.includes("md")) return await getMdFile(filePath);
  if(contentDir.includes("json")) return await getJsonFile(filePath);
}

export const getContentList = async ({contentDir, fields = []}) => {
  try {
    const contentFiles = await getContentFiles({dir: contentDir});
    return await Promise.all(contentFiles.map(fileName => getContentByPath({contentDir, fileName, fields}))); // Can append a .sort as well for ordering by date / title / etc
  } catch (error) {
    throw new Error(error);
  }
}

export const fetchWPApi = async ({query = ``, variables = {}}) => { // Example https://github.com/vercel/next.js/blob/canary/examples/cms-wordpress/lib/api.js
  const headers = {
    "Content-Type": "application/json"
  };

  // if(process.env.WP_AUTH_REFRESH_TOKEN) headers["Authorization"] = `Bearer ${process.env.WP_AUTH_REFRESH_TOKEN}`;

  const res = await fetch(process.env.WP_API_URL, {
    method: "POST",
    headers,
    body: JSON.stringify({
      query,
      variables,
    }),
  });

  const resData = await res.json();

  if(resData.errors) console.error(resData);

  return resData.data;
}

const defaultWPQuery = `
  id
  content
  date
  featuredImage {
    node {
      altText
      caption
      description
      mediaItemUrl
    }
  }
  id
  seo {
    metaDesc
    metaRobotsNoindex
    metaRobotsNofollow
    opengraphAuthor
    opengraphDescription
    opengraphImage {
      altText
      caption
      description
      mediaItemUrl
    }
    opengraphTitle
    opengraphType
    readingTime
    twitterDescription
    twitterImage {
      altText
      caption
      description
      mediaItemUrl
    }
    twitterTitle
  }
  slug
  status
  template {
    templateName
    ... on DefaultTemplate {
      templateName
    }
  }
  title
  uri
`;

export const getWPPage = async ({id, query}) => {
  return await fetchWPApi({query: `
    query Page {
      page(id: "${process.env.wpPagesDir}${Array.isArray(id) ? id.join('/') : id}", idType: URI) {
        ${query || defaultWPQuery}
      }
    }
  `});
}

export const getWPPost = async ({id, query}) => {
  return await fetchWPApi({query: `
    query Post {
      post(id: "${process.env.wpPostsDir}${id}", idType: URI) {
        ${query || defaultWPQuery}
      }
    }
  `});
}

export const getAllWPPosts = async ({query}) => {
  return await fetchWPApi({query: `
    query Posts {
      nodes {
        ${query || defaultWPQuery}
      }
    }
  `});
}

export const getAllWPPageIds = async ({childPages = true, exclude = []} = {}) => {
  const data = await fetchWPApi({query: `
    query PageIds {
      pages {
        nodes {
          slug
          parent {
            node {
              slug
            }
          }
        }
      }
    }
  `});

  return data.pages.nodes.filter(page => exclude && !exclude.includes(page.slug) && !exclude.includes(page.parent?.node?.slug)).map(page => {
    if(childPages) {
      const id = [];
      const parentSlug = page.parent?.node?.slug;
      parentSlug && id.push(parentSlug);
      id.push(page.slug);

      return {
        params: {
          id
        }
      }
    } else {
      return {
        params: {
          id: page.slug
        }
      }
    }
  });
}

export const getAllWPPostIds = async () => {
  const data = await fetchWPApi({query: `
    query PostIds {
      posts {
        nodes {
          slug
        }
      }
    }
  `});

  return data.posts.nodes.map(post => {
    return {
      params: {
        id: post.slug
      }
    };
  });
}
