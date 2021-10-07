import Global from "../../../src/components";
import ResponsiveNav from "../../../src/components/ResponsiveNav";
import Header from "../../../src/components/Header";
import Footer from "../../../src/components/Footer";
import Meta from "../../../src/components/Meta";
import {GetStaticProps, GetStaticPaths, InferGetStaticPropsType} from "next";
import {join} from "path";
import {getContentFiles, getContentById} from "../../../src/scripts/getContent";
import "../post.scss";

const jsonContentDir = `${process.env.jsonContentDir}posts/`;

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = await getContentFiles({dir: (join(process.cwd(), jsonContentDir)), extension: false});

  const postIds = posts.map(post => {
    return {
      params: {
        id: post
      }
    }
  });

  return {
    paths: postIds,
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps = async context => {
  const post = await getContentById({contentDir: (join(process.cwd(), jsonContentDir)), id: context.params.id});

  return {
    props: {
      post
    }
  }
}

const PostPage = ({post}: InferGetStaticPropsType<typeof getStaticProps>) => {

  return (
    <Global className="post">
      <Meta title={post.title} description={post.description}/>
      <ResponsiveNav/>
      <Header/>
      <main className="max-content-width">
        <section className="intro">
          {post.title && <h1>{post.title}</h1>}
          {post.body && post.body}
        </section>
      </main>
      <Footer/>
    </Global>
  );
}

export default PostPage;
