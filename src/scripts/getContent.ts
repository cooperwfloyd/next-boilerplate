import {promises as fs} from "fs";
import {join} from "path";
import matter from "gray-matter";

const getContentId = (id, fileExt) => {
  return id.replace(fileExt, "");
}

const getContentFile = async ({id, contentDir, fileExt}) => {
  const contentId = getContentId(id, fileExt);
  const filePath = join(contentDir, `${contentId}/index.${fileExt}`);

  try {
    return await fs.readFile(filePath);
  } catch (error) {
    throw new Error(error);
  }
}

export const getContentIds = async dir => {
  try {
    const contentDir = await fs.readdir(dir);
    return contentDir;
  } catch (error) {
    throw new Error(error);
  }
}

export const getContentById = async ({contentDir, id, fields = []}) => {
  let fileExt;
  let contentId;
  let file;

  if(contentDir.includes("md")) {
    fileExt = "md";
    contentId = getContentId(id, fileExt);
    file = await getContentFile({id, contentDir, fileExt});

    try {
      const {data, content} = matter(file);
      return {
        data,
        content
      };
    } catch (error) {
      throw new Error(error);
    }
  }
  
  if(contentDir.includes("json")) {
    fileExt = "json";
    file = await getContentFile({id, contentDir, fileExt});

    try {
      return JSON.parse(file);
    } catch (error) {
      throw new Error(error);
    }
  }
}

export const getContentList = async ({contentDir, fields = []}) => {
  try {
    const ids = await getContentIds(contentDir);
    return await Promise.all(ids.map(id => getContentById({contentDir, id, fields}))); // Can append a .sort as well for ordering by date / title / etc
  } catch (error) {
    throw new Error(error);
  }
}

