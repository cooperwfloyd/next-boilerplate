import {promises as fs} from "fs";

const getMdContent = async dir => {
  try {
    return await fs.readdir(dir, "utf8");
  } catch (error) {
    throw new Error(error);
  }
}

export default getMdContent;
