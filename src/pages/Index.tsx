
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import TokenPresale from "../components/TokenPresale";
import Roadmap from "../components/Roadmap";
import Footer from "../components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <div className="space-y-24"> {/* Add consistent 96px spacing between sections */}
        <Hero />
        <TokenPresale />
        <Roadmap />
      </div>
      <Footer />
    </div>
  );
};

export default Index;
