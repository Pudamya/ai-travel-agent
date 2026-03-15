export default function AgentPanel() {
  const agents = [
    "Coordinator Agent",
    "Weather Agent",
    "Flights Agent",
    "Hotels Agent",
    "Places Agent",
    "Price Prediction Agent",
    "Planner Agent",
  ]

  return (
    <div className="sectionCard agentPanelCard">
      <div className="sectionHeader">
        <h2>AI Agent Workflow</h2>
        <span className="sectionBadge">System pipeline</span>
      </div>

      <div className="agentList">
        {agents.map((agent, index) => (
          <div className="agentItem" key={index}>
            <span className="agentDot" />
            <div>
              <strong>{agent}</strong>
              <p>Completed successfully</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}