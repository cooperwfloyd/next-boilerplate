import Global from "../../src/components";
import Footer from "../../src/components/Footer";
import Header from "../../src/components/Header";
import ResponsiveNav from "../../src/components/ResponsiveNav";
import Link from "next/link";
import posts from "./posts.json"; // Example data

const PostsPage = () => {
  return (
    <Global className="work" documentTitle="Dynamic">
      <ResponsiveNav/>
      <Header/>
      <main>
        <h1 className="screen-reader-only">List Page</h1>
        <section className="gallery">
          {posts.map((post, index) => {
            return (
              <article key={index}>
                {post.id && post.title && <p><Link href={`/dynamic/${post.id}`}>{post.title}</Link></p>}
              </article>
            );
          })}
        </section>
      </main>
      <Footer/>
    </Global>
  );
}

export default PostsPage;
