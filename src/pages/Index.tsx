
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import TokenPresale from "../components/TokenPresale";
import Roadmap from "../components/Roadmap";
import Footer from "../components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="space-y-24">
        <Hero />
        <Roadmap />
        <TokenPresale />
      </div>
      <Footer />
    </div>
  );
};

export default Index;
