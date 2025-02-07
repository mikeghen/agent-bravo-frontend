
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Card, CardContent } from "../components/ui/card";

const AboutUs = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      <main className="pt-24 pb-16">
        {/* Hero Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl">About Agent Bravo</h1>
            <p className="mt-4 text-xl text-gray-600 max-w-2xl mx-auto">
              Revolutionizing the future of decentralized AI governance through innovative token mechanics and community-driven development.
            </p>
          </div>

          {/* Mission Section */}
          <div className="mb-20">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Mission</h2>
                <p className="text-lg text-gray-600 mb-4">
                  At Agent Bravo, we're dedicated to building the future of decentralized AI governance. Our platform enables communities to create, manage, and optimize AI agents through innovative token mechanics.
                </p>
                <p className="text-lg text-gray-600">
                  We believe in the power of collective intelligence and are committed to making AI governance accessible, transparent, and truly decentralized.
                </p>
              </div>
              <div className="rounded-lg overflow-hidden shadow-xl">
                <img
                  src="https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7"
                  alt="Technology illustration"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>

          {/* Values Section */}
          <div className="mb-20">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Our Values</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card className="border-mint-100">
                <CardContent className="pt-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Innovation</h3>
                  <p className="text-gray-600">
                    Pushing the boundaries of what's possible in AI governance and token economics.
                  </p>
                </CardContent>
              </Card>
              <Card className="border-mint-100">
                <CardContent className="pt-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Transparency</h3>
                  <p className="text-gray-600">
                    Building trust through open communication and decentralized decision-making.
                  </p>
                </CardContent>
              </Card>
              <Card className="border-mint-100">
                <CardContent className="pt-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Community</h3>
                  <p className="text-gray-600">
                    Empowering our users to shape the future of AI governance together.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Team Section */}
          <div>
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Our Team</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <img
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e"
                  alt="Team member"
                  className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
                />
                <h3 className="text-xl font-semibold text-gray-900">Alex Thompson</h3>
                <p className="text-gray-600">Founder & CEO</p>
              </div>
              <div className="text-center">
                <img
                  src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80"
                  alt="Team member"
                  className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
                />
                <h3 className="text-xl font-semibold text-gray-900">Sarah Chen</h3>
                <p className="text-gray-600">CTO</p>
              </div>
              <div className="text-center">
                <img
                  src="https://images.unsplash.com/photo-1519345182560-3f2917c472ef"
                  alt="Team member"
                  className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
                />
                <h3 className="text-xl font-semibold text-gray-900">Michael Roberts</h3>
                <p className="text-gray-600">Head of Research</p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default AboutUs;
