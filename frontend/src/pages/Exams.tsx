import { useEffect, useState } from "react";
import api from "../services/api";

type Exam = {
  id: number;
  title: string;
  subject: string;
  exam_type: string;
  date: string;
  duration: string;
  description: string;
};

type Subject = {
  code: string;
  name: string;
  date: string;
  time: string;
  preparation: number;
  topics: string[];
};

type StudyDay = {
  day: number;
  title: string;
  topics: string;
};

function Exams() {
  const [selectedSubject, setSelectedSubject] =
    useState<Subject | null>(null);

  const [activeSection, setActiveSection] =
    useState<string>("home");

  const [selectedDay, setSelectedDay] =
    useState<StudyDay | null>(null);

  const [answer, setAnswer] =
    useState<number | null>(null);

  const [showResult, setShowResult] =
    useState(false);

  const [exams, setExams] =
    useState<Exam[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  // ============================================================
  // FETCH EXAMS
  // ============================================================

  useEffect(() => {
    fetchExams();
  }, []);

  const fetchExams = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await api.get("/exams");

      setExams(response.data.exams || []);
    } catch (err) {
      console.error("Failed to load exams:", err);

      setError(
        "Unable to load exams. Please make sure the backend is running."
      );
    } finally {
      setLoading(false);
    }
  };

  // ============================================================
  // SUBJECT ICON
  // ============================================================

  const getSubjectIcon = (subject: string) => {
    const text = subject.toLowerCase();

    if (text.includes("database") || text.includes("dbms")) {
      return "🗄️";
    }

    if (
      text.includes("network") ||
      text.includes("computer networks")
    ) {
      return "🌐";
    }

    if (
      text.includes("artificial") ||
      text.includes("machine learning")
    ) {
      return "🤖";
    }

    if (
      text.includes("operating") ||
      text.includes("os")
    ) {
      return "⚙️";
    }

    if (
      text.includes("programming") ||
      text.includes("java") ||
      text.includes("python") ||
      text.includes("c programming")
    ) {
      return "💻";
    }

    return "📚";
  };

  // ============================================================
  // CONVERT BACKEND EXAMS INTO SUBJECT FORMAT
  // ============================================================

  const subjects: Subject[] = exams.map((exam) => ({
    code: exam.subject
      .replace(/\s+/g, "")
      .slice(0, 6)
      .toUpperCase(),

    name: exam.subject,

    date: exam.date,

    time: exam.duration,

    preparation: 0,

    topics: exam.description
      ? exam.description
          .split(",")
          .map((topic) => topic.trim())
          .filter(Boolean)
      : [],
  }));

  // ============================================================
  // STUDY PLAN
  // ============================================================

  const studyDays: StudyDay[] = [
    {
      day: 1,
      title: "Core Concepts",
      topics:
        "Understand the basic concepts and terminology",
    },
    {
      day: 2,
      title: "Important Topics",
      topics:
        "Study the major topics and frequently asked concepts",
    },
    {
      day: 3,
      title: "Practice",
      topics:
        "Practice examples, problems and previous questions",
    },
    {
      day: 4,
      title: "Revision",
      topics:
        "Revise difficult topics and make short notes",
    },
    {
      day: 5,
      title: "Final Preparation",
      topics:
        "Review important questions and complete final revision",
    },
  ];

  // ============================================================
  // PRACTICE QUESTIONS
  // ============================================================

  const questions = [
    {
      question:
        "Which SQL command is used to retrieve data?",
      options: [
        "INSERT",
        "SELECT",
        "DELETE",
        "UPDATE",
      ],
      correct: 1,
    },

    {
      question:
        "Which normal form removes partial dependency?",
      options: [
        "1NF",
        "2NF",
        "3NF",
        "BCNF",
      ],
      correct: 1,
    },

    {
      question:
        "Which property of a transaction means 'All or Nothing'?",
      options: [
        "Consistency",
        "Isolation",
        "Atomicity",
        "Durability",
      ],
      correct: 2,
    },
  ];

  // ============================================================
  // START PREPARATION
  // ============================================================

  const startPreparation = (subject: Subject) => {
    setSelectedSubject(subject);
    setActiveSection("preparation");
    setSelectedDay(null);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // ============================================================
  // STUDY PLAN
  // ============================================================

  const openStudyPlan = () => {
    setActiveSection("study-plan");
    setSelectedDay(null);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const startStudyDay = (day: StudyDay) => {
    setSelectedDay(day);
    setActiveSection("study-day");

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // ============================================================
  // IMPORTANT TOPICS
  // ============================================================

  const openImportantTopics = () => {
    setActiveSection("important-topics");

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // ============================================================
  // PRACTICE QUESTIONS
  // ============================================================

  const openPracticeQuestions = () => {
    setAnswer(null);
    setShowResult(false);
    setActiveSection("practice");

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const checkAnswer = (index: number) => {
    setAnswer(index);
    setShowResult(true);
  };

  // ============================================================
  // AI GUIDANCE
  // ============================================================

  const openAIGuidance = () => {
    setActiveSection("ai");

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // ============================================================
  // RESOURCES
  // ============================================================

  const openResource = (url: string) => {
    window.open(
      url,
      "_blank",
      "noopener,noreferrer"
    );
  };

  // ============================================================
  // BACK
  // ============================================================

  const goBack = () => {
    setActiveSection("home");
    setSelectedSubject(null);
    setSelectedDay(null);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // ============================================================
  // LOADING
  // ============================================================

  if (loading) {
    return (
      <div className="page">

        <div className="page-header">
          <h1>Exam Preparation</h1>

          <p>
            Prepare for your exams with study plans,
            important topics and practice questions.
          </p>
        </div>

        <div className="resource-card">
          <h2>Loading exams...</h2>

          <p>
            Please wait while we load your examination data.
          </p>
        </div>

      </div>
    );
  }

  // ============================================================
  // ERROR
  // ============================================================

  if (error) {
    return (
      <div className="page">

        <div className="page-header">
          <h1>Exam Preparation</h1>

          <p>
            Prepare for your exams with study plans,
            important topics and practice questions.
          </p>
        </div>

        <div
          style={{
            padding: "20px",
            borderRadius: "16px",
            background: "#fff1f2",
            color: "#be123c",
            textAlign: "center",
          }}
        >
          {error}
        </div>

      </div>
    );
  }

  // ============================================================
  // PREPARATION PAGE
  // ============================================================

  if (
    activeSection === "preparation" &&
    selectedSubject
  ) {
    return (
      <div className="page">

        <button
          className="back-button"
          onClick={goBack}
        >
          ← Back to Exams
        </button>

        <div className="exam-header">

          <span className="subject-code">
            {selectedSubject.code}
          </span>

          <h1>
            {selectedSubject.name}
          </h1>

          <p>
            📅 {selectedSubject.date}
          </p>

          <p>
            ⏰ {selectedSubject.time}
          </p>

          <h3>
            Preparation: {selectedSubject.preparation}%
          </h3>

          <div className="progress-bar">
            <div
              className="progress-fill"
              style={{
                width:
                  `${selectedSubject.preparation}%`,
              }}
            ></div>
          </div>

        </div>

        <h2>
          Preparation Resources
        </h2>

        <div className="resource-grid">

          <div className="resource-card">

            <div className="resource-icon">
              📋
            </div>

            <h2>
              Study Plan
            </h2>

            <p>
              Follow a structured day-by-day plan
              for your exam.
            </p>

            <button
              className="primary-button"
              onClick={openStudyPlan}
            >
              View Study Plan →
            </button>

          </div>

          <div className="resource-card">

            <div className="resource-icon">
              ⭐
            </div>

            <h2>
              Important Topics
            </h2>

            <p>
              Focus on the most important topics
              for your exam.
            </p>

            <button
              className="primary-button"
              onClick={openImportantTopics}
            >
              View Important Topics →
            </button>

          </div>

          <div className="resource-card">

            <div className="resource-icon">
              ❓
            </div>

            <h2>
              Practice Questions
            </h2>

            <p>
              Test your knowledge using practice
              questions.
            </p>

            <button
              className="primary-button"
              onClick={openPracticeQuestions}
            >
              Start Practice →
            </button>

          </div>

          <div className="resource-card">

            <div className="resource-icon">
              🤖
            </div>

            <h2>
              AI Guidance
            </h2>

            <p>
              Get personalized guidance for
              your preparation.
            </p>

            <button
              className="primary-button"
              onClick={openAIGuidance}
            >
              Get AI Guidance →
            </button>

          </div>

        </div>

      </div>
    );
  }

  // ============================================================
  // STUDY PLAN
  // ============================================================

  if (activeSection === "study-plan") {
    return (
      <div className="page">

        <button
          className="back-button"
          onClick={() => {
            if (selectedSubject) {
              setActiveSection("preparation");
            } else {
              goBack();
            }
          }}
        >
          ← Back
        </button>

        <h1>
          Study Plan
        </h1>

        <p>
          Follow this schedule to prepare effectively
          for your examination.
        </p>

        <div className="resource-grid">

          {studyDays.map((day) => (
            <div
              className="resource-card"
              key={day.day}
            >

              <div className="resource-icon">
                📚
              </div>

              <h2>
                Day {day.day}
              </h2>

              <h3>
                {day.title}
              </h3>

              <p>
                {day.topics}
              </p>

              <button
                className="primary-button"
                onClick={() =>
                  startStudyDay(day)
                }
              >
                Start This Day →
              </button>

            </div>
          ))}

        </div>

      </div>
    );
  }

  // ============================================================
  // STUDY DAY
  // ============================================================

  if (
    activeSection === "study-day" &&
    selectedDay
  ) {
    return (
      <div className="page">

        <button
          className="back-button"
          onClick={openStudyPlan}
        >
          ← Back to Study Plan
        </button>

        <div className="resource-card study-day">

          <div className="resource-icon">
            📖
          </div>

          <h1>
            Day {selectedDay.day}:{" "}
            {selectedDay.title}
          </h1>

          <p className="large-text">
            {selectedDay.topics}
          </p>

          <h2>
            Today's Learning Goals
          </h2>

          <ul>
            {selectedDay.topics
              .split(",")
              .map((topic, index) => (
                <li key={index}>
                  {topic.trim()}
                </li>
              ))}
          </ul>

          <h2>
            Recommended Activities
          </h2>

          <div className="activity-list">

            <div>
              📖 Read the concepts
            </div>

            <div>
              ✍️ Write short notes
            </div>

            <div>
              💻 Practice examples
            </div>

            <div>
              ❓ Solve questions
            </div>

            <div>
              🔄 Revise before finishing
            </div>

          </div>

          <button
            className="primary-button"
            onClick={() => {
              setActiveSection("study-plan");
            }}
          >
            ✓ Mark Day as Completed
          </button>

        </div>

      </div>
    );
  }

  // ============================================================
  // IMPORTANT TOPICS
  // ============================================================

  if (
    activeSection === "important-topics"
  ) {
    return (
      <div className="page">

        <button
          className="back-button"
          onClick={() => {
            if (selectedSubject) {
              setActiveSection("preparation");
            } else {
              goBack();
            }
          }}
        >
          ← Back
        </button>

        <h1>
          ⭐ Important Topics
        </h1>

        <p>
          These are the topics you should prioritize
          before your examination.
        </p>

        <div className="topic-list">

          {(selectedSubject
            ? selectedSubject.topics
            : [
                "SQL",
                "Normalization",
                "Transactions",
                "ER Model",
                "Joins",
                "Indexing",
              ]
          ).map((topic, index) => (

            <div
              className="topic-item"
              key={index}
            >

              <div>

                <span className="topic-number">
                  {index + 1}
                </span>

                <strong>
                  {topic}
                </strong>

              </div>

              <span className="important-badge">
                Important
              </span>

            </div>

          ))}

        </div>

      </div>
    );
  }

  // ============================================================
  // PRACTICE QUESTIONS
  // ============================================================

  if (
    activeSection === "practice"
  ) {
    return (
      <div className="page">

        <button
          className="back-button"
          onClick={() => {
            if (selectedSubject) {
              setActiveSection("preparation");
            } else {
              goBack();
            }
          }}
        >
          ← Back
        </button>

        <h1>
          ❓ Practice Questions
        </h1>

        <p>
          Test your knowledge and improve your
          exam preparation.
        </p>

        {questions.map(
          (q, questionIndex) => (

            <div
              className="question-card"
              key={questionIndex}
            >

              <h2>
                Q{questionIndex + 1}.{" "}
                {q.question}
              </h2>

              <div className="options">

                {q.options.map(
                  (option, optionIndex) => (

                    <button
                      key={optionIndex}
                      className={
                        answer === optionIndex
                          ? "option-button selected"
                          : "option-button"
                      }
                      onClick={() =>
                        checkAnswer(optionIndex)
                      }
                    >
                      {String.fromCharCode(
                        65 + optionIndex
                      )}
                      . {option}
                    </button>

                  )
                )}

              </div>

              {showResult &&
                answer !== null && (

                  <p className="answer-result">

                    {answer === q.correct
                      ? "✅ Correct answer!"
                      : `❌ Incorrect. Correct answer: ${q.options[q.correct]}`}

                  </p>

                )}

            </div>

          )
        )}

      </div>
    );
  }

  // ============================================================
  // AI GUIDANCE
  // ============================================================

  if (activeSection === "ai") {
    return (
      <div className="page">

        <button
          className="back-button"
          onClick={() => {
            if (selectedSubject) {
              setActiveSection("preparation");
            } else {
              goBack();
            }
          }}
        >
          ← Back
        </button>

        <div className="resource-card ai-card">

          <div className="resource-icon">
            🤖
          </div>

          <h1>
            AI Exam Guidance
          </h1>

          <p>
            Get a personalized preparation strategy
            based on your progress.
          </p>

          <div className="ai-suggestions">

            <div>
              🎯 <strong>Focus Area</strong>

              <p>
                Spend more time on difficult topics.
              </p>
            </div>

            <div>
              ⏱️ <strong>Study Technique</strong>

              <p>
                Use 45 minutes of focused study
                followed by a 10-minute break.
              </p>
            </div>

            <div>
              🔄 <strong>Revision</strong>

              <p>
                Revise today's topics before
                starting new ones.
              </p>
            </div>

            <div>
              📝 <strong>Practice</strong>

              <p>
                Solve at least 10 questions every day.
              </p>
            </div>

          </div>

          <button
            className="primary-button"
            onClick={() => {
              setActiveSection("preparation");
            }}
          >
            Generate My Plan →
          </button>

        </div>

      </div>
    );
  }

  // ============================================================
  // MAIN EXAMS PAGE
  // ============================================================

  return (
    <div className="page">

      <div className="page-header">

        <h1>
          Exam Preparation
        </h1>

        <p>
          Prepare for your exams with study plans,
          important topics and practice questions.
        </p>

      </div>

      <div className="exam-grid">

        {subjects.length > 0 ? (

          subjects.map((subject) => (

            <div
              className="exam-card"
              key={subject.code}
            >

              <div className="subject-icon">
                {getSubjectIcon(subject.name)}
              </div>

              <span className="subject-code">
                {subject.code}
              </span>

              <h2>
                {subject.name}
              </h2>

              <p>
                📅 Date: {subject.date}
              </p>

              <p>
                ⏰ Duration: {subject.time}
              </p>

              <p>
                <strong>Exam Type:</strong>{" "}
                {
                  exams.find(
                    (exam) =>
                      exam.subject ===
                      subject.name
                  )?.exam_type
                }
              </p>

              <div className="preparation-text">
                Preparation{" "}
                {subject.preparation}%
              </div>

              <div className="progress-bar">

                <div
                  className="progress-fill"
                  style={{
                    width:
                      `${subject.preparation}%`,
                  }}
                ></div>

              </div>

              <p>
                <strong>Description:</strong>{" "}
                {subject.topics.join(" • ")}
              </p>

              <button
                className="primary-button"
                onClick={() =>
                  startPreparation(subject)
                }
              >
                Start Preparation →
              </button>

            </div>

          ))

        ) : (

          <div className="resource-card">

            <h2>
              No exams available
            </h2>

            <p>
              No examination data has been added
              yet.
            </p>

          </div>

        )}

      </div>

      <h2 className="section-title">
        📚 Free Learning Resources
      </h2>

      <p>
        Use these resources to strengthen your
        preparation.
      </p>

      <div className="resource-grid">

        <div className="resource-card">

          <div className="resource-icon">
            📘
          </div>

          <h2>
            W3Schools SQL
          </h2>

          <p>
            Learn SQL commands, queries, filtering,
            sorting and joins.
          </p>

          <button
            className="primary-button"
            onClick={() =>
              openResource(
                "https://www.w3schools.com/sql/"
              )
            }
          >
            Open Resource →
          </button>

        </div>

        <div className="resource-card">

          <div className="resource-icon">
            💻
          </div>

          <h2>
            GeeksforGeeks SQL
          </h2>

          <p>
            Practice SQL concepts and database
            questions.
          </p>

          <button
            className="primary-button"
            onClick={() =>
              openResource(
                "https://www.geeksforgeeks.org/sql/"
              )
            }
          >
            Open Resource →
          </button>

        </div>

        <div className="resource-card">

          <div className="resource-icon">
            🌐
          </div>

          <h2>
            Computer Networks
          </h2>

          <p>
            Learn networking concepts, OSI model
            and TCP/IP.
          </p>

          <button
            className="primary-button"
            onClick={() =>
              openResource(
                "https://www.geeksforgeeks.org/computer-networks/"
              )
            }
          >
            Open Resource →
          </button>

        </div>

        <div className="resource-card">

          <div className="resource-icon">
            ⚙️
          </div>

          <h2>
            Operating Systems
          </h2>

          <p>
            Learn processes, scheduling, memory
            management and deadlocks.
          </p>

          <button
            className="primary-button"
            onClick={() =>
              openResource(
                "https://www.geeksforgeeks.org/operating-systems/"
              )
            }
          >
            Open Resource →
          </button>

        </div>

      </div>

    </div>
  );
}

export default Exams;