import Global from "../../src/components";
import ResponsiveNav from "../../src/components/ResponsiveNav";
import Header from "../../src/components/Header";
import Footer from "../../src/components/Footer";
import Meta from "../../src/components/Meta";
import {GetStaticProps, GetStaticPaths, InferGetStaticPropsType} from "next";
import postsData from "./posts.json"; // Example data
import ReactHTMLParser from "react-html-parser";

interface post {
  id: number,
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
  
  return {
    props: {
      post
    }
  }
}

const PostPage = ({post}: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <Global className="work client">
      <Meta title={post.title} description={post.body}/>
      <ResponsiveNav/>
      <Header/>
      <main className="max-content-width">
        <section className="intro">
          {<h1>{post.title}</h1>}
          {post.body && <p>{post.body}</p>}
        </section>
      </main>
      <Footer/>
    </Global>
  );
}

export default PostPage;
