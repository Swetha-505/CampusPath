import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  return (
    <div>
      {/* HERO */}
      <section className="hero">
        <div className="hero-content">
          <p className="tagline">YOUR CAMPUS. YOUR PATH.</p>

          <h1>
            Everything you need to
            <span> succeed as a student.</span>
          </h1>

          <p className="hero-text">
            CampusPath brings learning resources, exam preparation,
            student discussions and placement guidance together in one place.
          </p>

          <div className="hero-buttons">
            <button
              className="primary-btn"
              onClick={() => navigate("/resources")}
            >
              Explore Resources
            </button>

            <button
              className="secondary-btn"
              onClick={() => navigate("/exams")}
            >
              Prepare for Exams
            </button>
          </div>
        </div>

        {/* AI CARD */}
        <div className="ai-card">
          <div className="ai-icon">🤖</div>

          <h3>Need a study plan?</h3>

          <p>
            Get guidance based on your learning goals and exam preparation.
          </p>

          <div className="ai-input">
            <span>Ask CampusPath...</span>

            <button onClick={() => navigate("/exams")}>
              →
            </button>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="features">
        <div className="section-heading">
          <p>EXPLORE CAMPUSPATH</p>
          <h2>Everything a student needs</h2>
        </div>

        <div className="feature-grid">
          <div className="feature-card">
            <div className="feature-icon">📚</div>

            <h3>Free Resources</h3>

            <p>
              Find notes, tutorials, videos and study materials in one place.
            </p>

            <button
              className="card-button"
              onClick={() => navigate("/resources")}
            >
              Explore Resources
            </button>
          </div>

          <div className="feature-card">
            <div className="feature-icon">📝</div>

            <h3>Exam Preparation</h3>

            <p>
              Prepare for exams with study plans, important topics and
              practice questions.
            </p>

            <button
              className="card-button"
              onClick={() => navigate("/exams")}
            >
              Start Preparing
            </button>
          </div>

          <div className="feature-card">
            <div className="feature-icon">💬</div>

            <h3>Discussion Forum</h3>

            <p>
              Ask questions, discuss topics and learn from other students.
            </p>

            <button
              className="card-button"
              onClick={() => navigate("/discussion")}
            >
              Join Discussions
            </button>
          </div>

          <div className="feature-card">
            <div className="feature-icon">🎯</div>

            <h3>Placement Corner</h3>

            <p>
              Find interview experiences, internship information and
              placement resources.
            </p>

            <button
              className="card-button"
              onClick={() => navigate("/placements")}
            >
              Explore Placements
            </button>
          </div>
        </div>
      </section>

      {/* RECOMMENDATION / ROADMAP */}
      <section className="recommendation">
        <div>
          <p className="small-title">YOUR LEARNING JOURNEY</p>

          <h2>
            Learn with a clear
            <span> path.</span>
          </h2>

          <p>
            Track your progress, prepare for important subjects and build
            skills that support your academic and career goals.
          </p>

          <button
            className="primary-btn"
            onClick={() => navigate("/profile")}
          >
            View My Profile
          </button>
        </div>

        <div className="roadmap-card">
          <div className="roadmap-header">
            <strong>Student Roadmap</strong>
            <span>68% Complete</span>
          </div>

          <div className="progress">
            <div></div>
          </div>

          <div className="roadmap-item completed">
            ✓ Explore learning resources
          </div>

          <div className="roadmap-item completed">
            ✓ Start exam preparation
          </div>

          <div className="roadmap-item current">
            → Build technical skills
          </div>

          <div className="roadmap-item">
            ○ Prepare for placements
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer>
        <div>
          <h3>🎓 CampusPath</h3>
          <p>Your Campus. Your Path.</p>
        </div>

        <p>Learn. Prepare. Connect. Grow.</p>
      </footer>
    </div>
  );
}

export default Home;