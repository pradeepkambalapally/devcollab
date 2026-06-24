import Navbar from "../components/Home/Navbar ";
import Hero from "../components/Home/Hero";
import Features from "../components/Home/Features";
import Roadmap from "../components/Home/Roadmap";
import CTA from "../components/Home/CTA";
import Footer from "../components/Home/Footer"

const Home = () => {
  return (
    <div className="min-h-screen bg-zinc-950 text-white">

      <Navbar />

      <Hero />

      <Features />

      <Roadmap />

      <CTA />

      <Footer />

    </div>
  );
};

export default Home;