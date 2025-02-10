const Roadmap = () => {
  const milestones = [
    {
      quarter: "Q1",
      title: "Local Framework Development",
      items: [
        "Multi-delegate support for governance contracts",
        "Dockerized setup for deployment",
        "Initial frontend for managing AI agents",
        "Integration of multiple DAOs"
      ]
    },
    {
      quarter: "Q2",
      title: "Testnet Deployment",
      items: [
        "Deployment on Sepolia Testnet",
        "Governance demo with Compound DAO",
        "Basic frontend dashboard",
        "Two-way AI communication skills"
      ]
    },
    {
      quarter: "Q3",
      title: "Smart Contract & Frontend Enhancements",
      items: [
        "Hosted frontend for AI agent management",
        "Smart contract security improvements",
        "Backend infrastructure for AI governance",
        "Operator delegation for executing votes"
      ]
    },
    {
      quarter: "Q4",
      title: "Full Audit & Mainnet Launch",
      items: [
        "Complete security audit",
        "Mainnet deployment",
        "Major protocol integrations",
        "Governance proposal analysis tools"
      ]
    }
  ];

  return (
    <section className="py-12 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-8 mb-16">
          <h2 className="text-4xl font-bold gradient-text">Roadmap</h2>
          <p className="max-w-2xl mx-auto text-xl text-muted-foreground">
            Our vision for the future of decentralized governance
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {milestones.map((milestone, index) => (
            <div 
              key={milestone.quarter}
              className="relative p-6 glass-card rounded-xl transition-all duration-300 hover:neon-border"
            >
              <div className="space-y-4">
                <span className="inline-block px-3 py-1 bg-primary/20 text-primary rounded-full text-sm font-medium">
                  {milestone.quarter}
                </span>
                <h3 className="text-xl font-semibold text-foreground">
                  {milestone.title}
                </h3>
                <ul className="space-y-2 text-muted-foreground">
                  {milestone.items.map((item, itemIndex) => (
                    <li key={itemIndex} className="flex items-start">
                      <span className="mr-2">•</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Roadmap;
