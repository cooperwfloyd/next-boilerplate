import Global from "../../../src/components";
import ResponsiveNav from "../../../src/components/ResponsiveNav";
import Header from "../../../src/components/Header";
import Footer from "../../../src/components/Footer";
import Meta from "../../../src/components/Meta";
import {GetStaticProps, GetStaticPaths, InferGetStaticPropsType} from "next";
import postsData from "../../../src/content/json/posts/index.json"; // Example data
import {promises as fs} from "fs";
import {join} from "path";
import matter from "gray-matter";
import marked from "marked";
import ReactHtmlParser from "react-html-parser";

interface post {
  id: string | number,
  title: string,
  body: string
}

export const getStaticPaths: GetStaticPaths = async () => {
  const ids = postsData.map(index => {
    return {
      params: {
        id: index.id.toString()
      }
    }
  });

  return {
    paths: ids,
    fallback: false
  }
}

export const getStaticProps: GetStaticProps = async context => {
  const post: post = postsData.find(post => post.id.toString() === context.params.id);
  const postPath = join(process.cwd(), `src/content/md/posts/${context.params.id}/index.md`);
  const fileContents = await fs.readFile(postPath, "utf8");
  const {data, content} = matter(fileContents);
  
  return {
    props: {
      post: {
        data,
        content
      }
    }
  }
}

const PostPage = ({post}: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <Global className="post">
      <Meta title={post.data.title} description={post.data.description}/>
      <ResponsiveNav/>
      <Header/>
      <main className="max-content-width">
        <section className="intro">
          {ReactHtmlParser(marked(post.content))}
        </section>
      </main>
      <Footer/>
    </Global>
  );
}

export default PostPage;
