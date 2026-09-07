function Discussion() {
  return (
    <div className="page">
      <h1>Discussion Forum</h1>

      <p>
        Ask questions, discuss topics and learn from other students.
      </p>

      <div className="resource-grid">
        <div className="resource-card">
          <h2>💬 Ask a Question</h2>
          <p>Post your questions and get answers from students.</p>
        </div>

        <div className="resource-card">
          <h2>📢 Discussions</h2>
          <p>Discuss academic and campus-related topics.</p>
        </div>

        <div className="resource-card">
          <h2>👍 Helpful Answers</h2>
          <p>Upvote useful answers and help other students.</p>
        </div>

        <div className="resource-card">
          <h2>👥 Student Community</h2>
          <p>Connect and learn from students across your campus.</p>
        </div>
      </div>
    </div>
  );
}

export default Discussion;