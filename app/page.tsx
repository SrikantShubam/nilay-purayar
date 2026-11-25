import Banner from "./components/Banner/banner";
import About from "./components/about";
import Work from "./components/Work/Work";
import Projects from "./components/Projects/Projects";
import Contact from "./components/Contact";
import Footer from "./components/footer";
import { getSettings } from "./lib/settings";

export default async function Home() {
  const settings = await getSettings();

  return (
    <>
      <Banner />
      <About />
      <Work />
      <Projects />
      <Contact socials={settings.contactSocials} />
      <Footer
        email={settings.email}
        socials={settings.footerSocials}
        footer={settings.footer}
      />
    </>
  );
}
