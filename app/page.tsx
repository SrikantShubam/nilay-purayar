import Image from "next/image";
import Banner from "./components/Banner/banner";
import About from "./components/about";
import Work from "./components/Work/Work";
import Projects from "./components/Projects/Projects";
import Contact from "./components/Contact";
import Footer from "./components/footer";
export default function Home() {
  return (
    <>
<Banner/>
<About/>
<Work />
<Projects/>
<Contact/>
<Footer/>
    </>
  
  );
}




