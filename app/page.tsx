import Banner from "./components/Banner/banner";
import About from "./components/about";
import Work from "./components/Work/Work";
import Projects from "./components/Projects/Projects";
import Contact from "./components/Contact";
import Footer from "./components/footer";
import { getSettings } from "./lib/settings";
import { getAbout, getBanner, getContact } from "./lib/content";

export default async function Home() {
  const [settings, banner, about, contact] = await Promise.all([
    getSettings(),
    getBanner(),
    getAbout(),
    getContact(),
  ]);

  return (
    <>
      <Banner content={banner} />
      <About content={about} />
      <Work />
      <Projects />
      <Contact socials={settings.contactSocials} content={contact} />
      <Footer
        email={settings.email}
        socials={settings.footerSocials}
        footer={settings.footer}
      />
    </>
  );
}
