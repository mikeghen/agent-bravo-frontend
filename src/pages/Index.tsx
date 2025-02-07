
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import TokenPresale from "../components/TokenPresale";
import Roadmap from "../components/Roadmap";

const Index = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <Hero />
      <TokenPresale />
      <Roadmap />
    </div>
  );
};

export default Index;
