import Global from "../../src/components";
import Footer from "../../src/components/Footer";
import Header from "../../src/components/Header";
import ResponsiveNav from "../../src/components/ResponsiveNav";
import Meta from "../../src/components/Meta";
import Link from "next/link";
import {GetStaticProps, InferGetStaticPropsType} from "next";
import postsData from "./posts.json"; // Example data

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {
      pageTitle: "All Posts",
      postsData
    }
  }
}

const PostsPage = ({pageTitle, postsData}: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <Global className="posts">
      <Meta title="Posts" description="List of all blog posts"/>
      <ResponsiveNav/>
      <Header/>
      <main>
        <h1>{pageTitle}</h1>
        <ul>
          {postsData.map((post, index) => {
            return (
              <li key={index}>{post.id && post.title && <Link href={`/posts/${post.id}`}>{post.title}</Link>}</li>
            );
          })}
        </ul>
      </main>
      <Footer/>
    </Global>
  );
}

export default PostsPage;
