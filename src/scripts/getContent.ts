import {promises as fs} from "fs";
import matter from "gray-matter";

const getMdContent = async file => {
  let fileContents;

  try {
    fileContents = await fs.readFile(file, "utf8");
  } catch (error) {
    throw new Error(error);
  }

  if(file.endsWith(".md")) {
    try {
      const {data, content} = matter(fileContents);
  
      return {
        data,
        content
      };
    } catch (error) {
      throw new Error(error);
    }
  }
  
  if(file.endsWith(".json")) {
    try {
      return JSON.parse(fileContents);
    } catch (error) {
      throw new Error(error);
    }
  }
}

export default getMdContent;
