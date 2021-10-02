import Global from "../src/components";
import Header from "../src/components/Header";
import Footer from "../src/components/Footer";
import ResponsiveNav from "../src/components/ResponsiveNav";

const HomePage = () => {
  return (
    <Global className="home" documentTitle="Home">
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
