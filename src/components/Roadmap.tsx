
import { CheckCircle2 } from "lucide-react";

const Roadmap = () => {
  const milestones = [
    {
      quarter: "Q1 2024",
      title: "Foundation",
      items: [
        "Launch BRAVO token",
        "Release whitepaper",
        "Community building",
        "Initial partnerships"
      ],
      completed: true
    },
    {
      quarter: "Q2 2024",
      title: "Development",
      items: [
        "Agent framework alpha",
        "Governance protocol testing",
        "Security audits",
        "Developer documentation"
      ],
      completed: false
    },
    {
      quarter: "Q3 2024",
      title: "Beta Release",
      items: [
        "Beta launch of Agent framework",
        "Integration with major DAOs",
        "Enhanced governance features",
        "Community expansion"
      ],
      completed: false
    },
    {
      quarter: "Q4 2024",
      title: "Expansion",
      items: [
        "MainNet launch",
        "Cross-chain governance",
        "Advanced AI features",
        "Ecosystem growth initiatives"
      ],
      completed: false
    }
  ];

  return (
    <div className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Roadmap</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Our journey to revolutionize DAO governance with AI agents
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {milestones.map((milestone, index) => (
            <div
              key={milestone.quarter}
              className="relative p-6 rounded-xl border border-gray-200 bg-white shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="absolute -top-3 left-6 px-4 py-1 rounded-full bg-mint-100 text-mint-800 text-sm font-medium">
                {milestone.quarter}
              </div>
              
              <div className="mt-4">
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  {milestone.title}
                  {milestone.completed && (
                    <CheckCircle2 className="h-5 w-5 text-mint-600" />
                  )}
                </h3>
                
                <ul className="space-y-3">
                  {milestone.items.map((item, itemIndex) => (
                    <li
                      key={itemIndex}
                      className="flex items-center gap-2 text-gray-600"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-mint-600" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Roadmap;
