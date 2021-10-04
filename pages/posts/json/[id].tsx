import Global from "../../../src/components";
import ResponsiveNav from "../../../src/components/ResponsiveNav";
import Header from "../../../src/components/Header";
import Footer from "../../../src/components/Footer";
import Meta from "../../../src/components/Meta";
import {GetStaticProps, GetStaticPaths, InferGetStaticPropsType} from "next";
import {join} from "path";
import getContent from "../../../src/scripts/getContent";
import getAllContent from "../../../src/scripts/getAllContent";

const jsonContentDir = `${process.env.jsonContentDir}posts/`;

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = await getAllContent(join(process.cwd(), jsonContentDir));

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
  const post = await getContent(join(process.cwd(), `${jsonContentDir}/${context.params.id}/index.json`));

  return {
    props: {
      post
    }
  }
}

const PostPage = ({post}: InferGetStaticPropsType<typeof getStaticProps>) => {
  console.log(post);

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
