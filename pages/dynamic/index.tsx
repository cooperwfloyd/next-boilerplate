import Global from "../../src/components";
import Footer from "../../src/components/Footer";
import Header from "../../src/components/Header";
import ResponsiveNav from "../../src/components/ResponsiveNav";
import Link from "next/link";
import projects from "./projects.json";

const WorkPage = () => {
  return (
    <Global className="work" documentTitle="Dynamic">
      <ResponsiveNav/>
      <Header/>
      <main>
        <h1 className="screen-reader-only">List Page</h1>
        <section className="gallery">
          {projects.map((project, index) => {
            return (
              <article key={index}>
                {project.name && <h2>{project.name}</h2>}
                {
                  project.stack
                  &&
                  <ul className="stack">
                    {project.stack.map((value, index) => {
                        return <li key={index}>{value}</li>
                    })}
                  </ul>
                }
                <div className="button-container">
                    <Link href={`/work/${project.id}`}><a className="button">Read More</a></Link>
                </div>
              </article>
            );
          })}
        </section>
      </main>
      <Footer/>
    </Global>
  );
}

export default WorkPage;
