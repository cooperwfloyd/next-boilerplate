import Global from "../src/components";
import Header from "../src/components/Header";
import Footer from "../src/components/Footer";
import ResponsiveNav from "../src/components/ResponsiveNav";
import Meta from "../src/components/Meta";

const HomePage = () => {
  return (
    <Global className="home">
      <Meta/>
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
