import Global from "../../src/components";
import Footer from "../../src/components/Footer";
import Header from "../../src/components/Header";
import Input from "../../src/components/Input";
import ResponsiveNav from "../../src/components/ResponsiveNav";
import Meta from "../../src/components/Meta";
import Textarea from "../../src/components/Textarea";
import {useInput} from "../../src/scripts/validations";

const ContactPage = () => {
  const {value: emailAddress, bind: bindEmailAddress} = useInput("", "email");
  const {value: message, bind: bindMessage} = useInput("", "message");

  return (
    <Global className="contact">
      <ResponsiveNav/>
      <Meta title="Contact" description="Let's get in touch."/>
      <Header/>
      <main>
        <section className="content">
          <h1>Contact</h1>
          <div className="form">
            <form id="contact-form" action="" method="post">
              <fieldset>
                <div className="row">
                  <div className="field">
                    <Input id="emailAddress" type="email" label="Email Address" required {...bindEmailAddress}/>
                  </div>
                </div>
              </fieldset>
              <fieldset>
                <div className="row">
                  <div className="field">
                    <Textarea id="message" label="Message" required {...bindMessage}/>
                  </div>
                </div>
              </fieldset>
              <button className="button" type="submit">Submit</button>
            </form>
          </div>
        </section>
      </main>
      <Footer/>
    </Global>
  );
}

export default ContactPage;
