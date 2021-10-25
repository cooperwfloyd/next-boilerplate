import Global from "../../src/components";
import Footer from "../../src/components/Footer";
import Header from "../../src/components/Header";
import ResponsiveNav from "../../src/components/ResponsiveNav";
import Meta from "../../src/components/Meta";
import Link from "next/link";
import {GetStaticProps, InferGetStaticPropsType} from "next";
import {getContentList} from "../../src/lib/getContent";
import "./posts.scss";

export const getStaticProps: GetStaticProps = async () => {
  const allPosts = await getContentList({
    contentDir: `${process.env.mdContentDir}posts/`,
    fields: [
      "id",
      "title"
    ]
  });

  return {
    props: {
      pageTitle: "All Posts",
      pageDescription: "A list of all of the posts",
      allPosts
    }
  }
}

const PostsPage = ({allPosts, pageTitle, pageDescription}: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <Global className="posts">
      <Meta title={pageTitle} description={pageDescription}/>
      <ResponsiveNav/>
      <Header/>
      <main>
        <section>
          <h1>{pageTitle}</h1>
          {allPosts.map((post, index) => {
            return (
              <p key={index}>{post.data.id && post.data.title && <Link href={`/posts/md/${post.data.id}`}>{post.data.title}</Link>}</p>
            );
          })}
        </section>
      </main>
      <Footer/>
    </Global>
  );
}

export default PostsPage;
