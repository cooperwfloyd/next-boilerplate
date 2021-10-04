import Global from "../../src/components";
import Footer from "../../src/components/Footer";
import Header from "../../src/components/Header";
import ResponsiveNav from "../../src/components/ResponsiveNav";
import Meta from "../../src/components/Meta";
import Link from "next/link";
import {GetStaticProps, InferGetStaticPropsType} from "next";
import postsData from "../../src/content/json/posts.json"; // Example data

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {
      pageTitle: "All Posts",
      pageDescription: "List of all blog posts",
      postsData
    }
  }
}

const PostsPage = ({pageTitle, pageDescription, postsData}: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <Global className="posts">
      <Meta title={pageTitle} description={pageDescription}/>
      <ResponsiveNav/>
      <Header/>
      <main>
        <section>
          <h1>{pageTitle}</h1>
          {postsData.map((post, index) => {
            return (
              <p key={index}>{post.id && post.title && <Link href={`/posts/json/${post.id}`}>{post.title}</Link>}</p>
            );
          })}
        </section>
      </main>
      <Footer/>
    </Global>
  );
}

export default PostsPage;
