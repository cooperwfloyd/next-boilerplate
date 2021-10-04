import Global from "../../../src/components";
import ResponsiveNav from "../../../src/components/ResponsiveNav";
import Header from "../../../src/components/Header";
import Footer from "../../../src/components/Footer";
import Meta from "../../../src/components/Meta";
import {GetStaticProps, GetStaticPaths, InferGetStaticPropsType} from "next";
import {join} from "path";
import marked from "marked";
import ReactHtmlParser from "react-html-parser";
import getContent from "../../../src/scripts/getContent";
import getAllContent from "../../../src/scripts/getAllContent";

const mdContentDir = `${process.env.mdContentDir}posts/`;

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = await getAllContent(join(process.cwd(), mdContentDir));

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
  const post = await getContent(join(process.cwd(), `${mdContentDir}/${context.params.id}/index.md`));

  return {
    props: {
      post
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
