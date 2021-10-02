import Global from "../../src/components";
import ResponsiveNav from "../../src/components/ResponsiveNav";
import Header from "../../src/components/Header";
import Footer from "../../src/components/Footer";
import {GetStaticProps, GetStaticPaths, InferGetStaticPropsType} from "next";
import projects from "./projects.json";
import ReactHTMLParser from "react-html-parser";

interface ProjectImage {
  url: string,
  alt: string,
  paddingTop?: string,
  width?: string
}

interface Project {
  id: string,
  name: string,
  stack?: string[],
  site?: {
    link: string,
    name: string
  },
  overview?: string,
  descriptionHeader?: string,
  description?: string[],
  images?: ProjectImage[]
}

export const getStaticPaths: GetStaticPaths = async () => {
  const ids = projects.map(index => {
    return {
      params: {
        id: index.id
      }
    }
  });

  return {
    paths: ids,
    fallback: false
  }
}

export const getStaticProps: GetStaticProps = async context => {
  const project: Project = projects.find(project => project.id === context.params.id);
  
  return {
    props: {
      project
    }
  }
}

const ProjectPage = ({project}: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <Global className="work client" documentTitle={project.name}>
      <ResponsiveNav/>
      <Header/>
      <main className="max-content-width">
        <section className="intro">
          {<h1>{project.name}</h1>}
          {
            project.stack
            &&
            <ul className="stack"> {
              project.stack.map((value, index) => {
                return <li key={index}>{value}</li>
              })
            }
            </ul>
          }
          {
            project.description
            &&
            <section className="description"> 
              {project.descriptionHeader && <h2>{ReactHTMLParser(project.descriptionHeader)}</h2>}
              {
                project.description.map((value, index) => {
                  return <p key={index}>{ReactHTMLParser(value)}</p>
                })
              }
            </section>
          }
          {
            project.site
            &&
            <div className="button-container detail"><a className="button" href={project.site.link} target="_blank" rel="noopener noreferrer">Visit {project.site.name}</a></div>
          }
        </section>
        {
          project.images
          &&
          <section className="images-container"> {
            project.images.map((img, index) => {
              return (
                <figure key={index} style={{width: img.width ? img.width : "100%"}}>
                  <picture style={img.paddingTop && {paddingTop: img.paddingTop}}>
                    <img src={`/assets/images/work/${project.id}/${img.url}`} alt={img.alt}/>
                  </picture>
                </figure>
              );
            })
          }
          </section>
        }
      </main>
      <Footer/>
    </Global>
  );
}

export default ProjectPage;
