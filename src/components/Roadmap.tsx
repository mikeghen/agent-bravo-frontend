
const Roadmap = () => {
  const milestones = [
    {
      quarter: "Q1 2024",
      title: "Framework Launch",
      items: [
        "Launch of Agent Bravo Framework",
        "Initial Token Distribution & Uniswap V4 Pools",
        "Community Building Initiative"
      ]
    },
    {
      quarter: "Q2 2024",
      title: "Ecosystem Growth",
      items: [
        "Integration with Major DAOs",
        "Advanced Agent Templates",
        "Developer SDK Release"
      ]
    },
    {
      quarter: "Q3 2024",
      title: "Protocol Expansion",
      items: [
        "Cross-chain Integration",
        "Governance Optimization",
        "Enhanced Security Features"
      ]
    },
    {
      quarter: "Q4 2024",
      title: "Scaling Solutions",
      items: [
        "L2 Integration",
        "Advanced Analytics Dashboard",
        "DAO-to-DAO Communication"
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
