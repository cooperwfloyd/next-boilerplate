import {promises as fs} from "fs";
import path, {join} from "path";
import matter from "gray-matter";

const getContentFile = async filePath => {
  try {
    return await fs.readFile(filePath);
  } catch (error) {
    throw new Error(error);
  }
}

export const getContentIds = async dir => {
  try {
    const contentDir = await fs.readdir(dir);
    const contentIds = contentDir.map(item => {
      return path.parse(item).name.toString();
    });

    return contentIds;
  } catch (error) {
    throw new Error(error);
  }
}

export const getContentFiles = async dir => {
  try {
    const contentDir = await fs.readdir(dir);
    const contentIds = contentDir.map(item => {
      return path.parse(item).base.toString();
    });

    return contentIds;
  } catch (error) {
    throw new Error(error);
  }
}

export const getContentById = async ({contentDir, id, fields = []}) => {
  let contentFile;
  let filePath = `${contentDir}${id}`;

  if(contentDir.includes("md")) {
    contentFile = await getContentFile(`${filePath}.md`);

    try {
      const {data, content} = matter(contentFile);
      return {
        data,
        content
      };
    } catch (error) {
      throw new Error(error);
    }
  }
  
  if(contentDir.includes("json")) {
    contentFile = await getContentFile(`${filePath}.json`);

    try {
      return JSON.parse(contentFile);
    } catch (error) {
      throw new Error(error);
    }
  }
}

export const getContentByPath = async ({contentDir, fileName, fields = []}) => {
  const contentFile = await getContentFile(`${contentDir}${fileName}`);

  if(contentDir.includes("md")) {
    try {
      const {data, content} = matter(contentFile);
      return {
        data,
        content
      };
    } catch (error) {
      throw new Error(error);
    }
  }
  
  if(contentDir.includes("json")) {
    try {
      return JSON.parse(JSON.stringify(contentFile));
    } catch (error) {
      throw new Error(error);
    }
  }
}

export const getContentList = async ({contentDir, fields = []}) => {
  try {
    const contentFiles = await getContentFiles(contentDir);
    return await Promise.all(contentFiles.map(fileName => getContentByPath({contentDir, fileName, fields}))); // Can append a .sort as well for ordering by date / title / etc
  } catch (error) {
    throw new Error(error);
  }
}
