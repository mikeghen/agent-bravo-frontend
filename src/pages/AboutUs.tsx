
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Card, CardContent } from "../components/ui/card";

const AboutUs = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      <main className="pt-24 pb-16">
        {/* Hero Section */}
        <div className="relative min-h-[60vh] flex items-center justify-center overflow-hidden bg-gradient-to-b from-white to-gray-50">
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px)] bg-[size:40px] bg-[position:center] z-0"></div>
            <div className="absolute inset-0 bg-[linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px] bg-[position:center] z-0"></div>
          </div>
          
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="inline-block mb-8">
              <span className="px-3 py-1 rounded-full text-sm font-medium bg-mint-100 text-mint-800">
                About Us
              </span>
            </div>
            <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl mb-6">
              About Agent Bravo
            </h1>
            <p className="mt-4 text-xl text-gray-600 max-w-2xl mx-auto">
              Revolutionizing the future of decentralized AI governance through innovative token mechanics and community-driven development.
            </p>
          </div>
        </div>

        {/* Mission Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Mission</h2>
            <p className="text-lg text-gray-600 mb-4">
              At Agent Bravo, we're dedicated to building the future of decentralized AI governance. Our platform enables communities to create, manage, and optimize AI agents through innovative token mechanics.
            </p>
            <p className="text-lg text-gray-600">
              We believe in the power of collective intelligence and are committed to making AI governance accessible, transparent, and truly decentralized.
            </p>
          </div>
        </div>

        {/* Values Section */}
        <div className="bg-mint-50/50 py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Our Values</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card className="bg-white/80 backdrop-blur-sm border-mint-100">
                <CardContent className="pt-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Innovation</h3>
                  <p className="text-gray-600">
                    Pushing the boundaries of what's possible in AI governance and token economics.
                  </p>
                </CardContent>
              </Card>
              <Card className="bg-white/80 backdrop-blur-sm border-mint-100">
                <CardContent className="pt-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Transparency</h3>
                  <p className="text-gray-600">
                    Building trust through open communication and decentralized decision-making.
                  </p>
                </CardContent>
              </Card>
              <Card className="bg-white/80 backdrop-blur-sm border-mint-100">
                <CardContent className="pt-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Community</h3>
                  <p className="text-gray-600">
                    Empowering our users to shape the future of AI governance together.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default AboutUs;

