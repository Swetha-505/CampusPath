function Placements() {
  return (
    <div className="page">
      <h1>Placement Corner</h1>

      <p>
        Find interview experiences, internship information
        and placement resources.
      </p>

      <div className="resource-grid">
        <div className="resource-card">
          <h2>💼 Interview Experiences</h2>
          <p>
            Read experiences and tips shared by students.
          </p>
        </div>

        <div className="resource-card">
          <h2>🎓 Internships</h2>
          <p>
            Discover internship opportunities and useful information.
          </p>
        </div>

        <div className="resource-card">
          <h2>🏢 Companies</h2>
          <p>
            Explore companies that recruit students from campus.
          </p>
        </div>

        <div className="resource-card">
          <h2>📖 Placement Preparation</h2>
          <p>
            Prepare for aptitude tests, coding rounds and interviews.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Placements;