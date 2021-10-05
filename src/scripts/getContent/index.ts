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

