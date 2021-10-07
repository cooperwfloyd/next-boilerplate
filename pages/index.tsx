import Global from "../src/components";
import Header from "../src/components/Header";
import Footer from "../src/components/Footer";
import ResponsiveNav from "../src/components/ResponsiveNav";
import Meta from "../src/components/Meta";
import {GetStaticProps, InferGetStaticPropsType} from "next";
import "./index.scss";

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {
      pageDescription: "Lorem ipsum dolor sit amet"
    }
  }
}

const HomePage = ({pageDescription}) => {
  return (
    <Global className="home">
      <Meta description={pageDescription}/>
      <ResponsiveNav/>
      <Header/>
        <main>
          <section className="content">
            <h1>{process.env.orgName}</h1>
            <p className="lead">Lorem ipsum dolor sit amet consectetur adipiscing elit nam feugiat tincidunt ante non feugiat.</p>
          </section>
        </main>
      <Footer/>
    </Global>
  );
}

export default HomePage;
