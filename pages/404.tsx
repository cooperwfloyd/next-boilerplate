import Global from "../src/components";
import Header from "../src/components/Header";
import Footer from "../src/components/Footer";

const FourOhFour = () => {
  return (
    <Global className="404" documentTitle="Error">
      <Header/>
      <main>
        <section className="content">
          <h1>That&apos;s an Error.</h1>
          <p className="lead">Sorry, that page couldn&apos;t be found.</p>
        </section>
      </main>
      <Footer/>
    </Global>
  );
};

export default FourOhFour;
