import { useState } from "react";

function Resources() {
  const [search, setSearch] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("All");

  const resources = [
    // ================= PROGRAMMING =================

    {
      icon: "☕",
      title: "Java Notes",
      type: "Notes",
      subject: "Programming",
      description:
        "Java basics, OOP, collections and important concepts.",
      url: "https://www.geeksforgeeks.org/java/",
    },

    {
      icon: "🐍",
      title: "Python Tutorials",
      type: "Tutorials",
      subject: "Programming",
      description:
        "Python programming tutorials from basics to advanced.",
      url: "https://docs.python.org/3/tutorial/",
    },

    {
      icon: "💻",
      title: "C Programming",
      type: "Notes",
      subject: "Programming",
      description:
        "C programming concepts, examples and practice problems.",
      url: "https://www.geeksforgeeks.org/c-programming-language/",
    },

    {
      icon: "📄",
      title: "Programming Previous Papers",
      type: "Previous Papers",
      subject: "Programming",
      description:
        "Practice previous programming examination questions.",
      url: "https://www.geeksforgeeks.org/practice-for-cracking-any-coding-interview/",
    },

    // ================= DATABASE =================

    {
      icon: "🗄️",
      title: "DBMS Notes",
      type: "Notes",
      subject: "Database",
      description:
        "ER models, normalization, transactions and SQL concepts.",
      url: "https://www.geeksforgeeks.org/dbms/",
    },

    {
      icon: "🔎",
      title: "SQL Tutorials",
      type: "Tutorials",
      subject: "Database",
      description:
        "Learn SQL queries, joins, functions and database operations.",
      url: "https://www.w3schools.com/sql/",
    },

    {
      icon: "🍃",
      title: "MongoDB Resources",
      type: "Tutorials",
      subject: "Database",
      description:
        "Learn MongoDB fundamentals and NoSQL database concepts.",
      url: "https://www.mongodb.com/docs/manual/tutorial/",
    },

    {
      icon: "📄",
      title: "DBMS Previous Papers",
      type: "Previous Papers",
      subject: "Database",
      description:
        "Practice previous DBMS examination papers.",
      url: "https://www.geeksforgeeks.org/dbms-gq/",
    },

    // ================= WEB DEVELOPMENT =================

    {
      icon: "🌐",
      title: "HTML & CSS",
      type: "Tutorials",
      subject: "Web Development",
      description:
        "Learn the fundamentals of modern web page development.",
      url: "https://developer.mozilla.org/en-US/docs/Learn_web_development",
    },

    {
      icon: "⚛️",
      title: "React Tutorials",
      type: "Tutorials",
      subject: "Web Development",
      description:
        "Build interactive websites using React.",
      url: "https://react.dev/learn",
    },

    {
      icon: "🎨",
      title: "Web Design Notes",
      type: "Notes",
      subject: "Web Development",
      description:
        "UI, UX, responsive design and frontend concepts.",
      url: "https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/CSS_layout",
    },

    {
      icon: "📄",
      title: "Web Development Papers",
      type: "Previous Papers",
      subject: "Web Development",
      description:
        "Practice previous web development examination questions.",
      url: "https://www.geeksforgeeks.org/web-development/",
    },

    // ================= COMPUTER SCIENCE =================

    {
      icon: "⚙️",
      title: "Operating Systems",
      type: "Notes",
      subject: "Computer Science",
      description:
        "Processes, memory management, scheduling and deadlocks.",
      url: "https://www.geeksforgeeks.org/operating-systems/",
    },

    {
      icon: "🌐",
      title: "Computer Networks",
      type: "Tutorials",
      subject: "Computer Science",
      description:
        "Networking concepts, protocols and network architecture.",
      url: "https://www.geeksforgeeks.org/computer-network-tutorials/",
    },

    {
      icon: "🧠",
      title: "Algorithms",
      type: "Tutorials",
      subject: "Computer Science",
      description:
        "Learn algorithms and problem-solving techniques.",
      url: "https://www.geeksforgeeks.org/fundamentals-of-algorithms/",
    },

    {
      icon: "📄",
      title: "CS Previous Papers",
      type: "Previous Papers",
      subject: "Computer Science",
      description:
        "Practice previous Computer Science examination papers.",
      url: "https://www.geeksforgeeks.org/engineering-mathematics-gate/",
    },
  ];

  // ================= SUBJECTS =================

  const subjects = [
    {
      icon: "💻",
      name: "Programming",
      topics: "Java • Python • C",
    },
    {
      icon: "🗄️",
      name: "Database",
      topics: "DBMS • SQL • MongoDB",
    },
    {
      icon: "🌐",
      name: "Web Development",
      topics: "HTML • CSS • React",
    },
    {
      icon: "⚙️",
      name: "Computer Science",
      topics: "OS • CN • Algorithms",
    },
  ];

  // ================= SEARCH + FILTER =================

  const filteredResources = resources.filter((resource) => {
    const searchText = search.toLowerCase();

    const matchesSearch =
      resource.title.toLowerCase().includes(searchText) ||
      resource.description.toLowerCase().includes(searchText) ||
      resource.type.toLowerCase().includes(searchText) ||
      resource.subject.toLowerCase().includes(searchText);

    const matchesSubject =
      selectedSubject === "All" ||
      resource.subject === selectedSubject;

    return matchesSearch && matchesSubject;
  });

  // ================= OPEN RESOURCE =================

  const openResource = (url: string) => {
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="resources-page">

      {/* ================= HEADER ================= */}

      <section className="resources-header">

        <p className="small-title">
          LEARN • PRACTICE • GROW
        </p>

        <h1>Free Learning Resources</h1>

        <p>
          Everything you need for your academic journey,
          all in one place.
        </p>

        {/* SEARCH */}

        <input
          type="text"
          placeholder="🔍 Search notes, tutorials, subjects..."
          className="resource-search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

      </section>


      {/* ================= RESOURCE SECTION ================= */}

      <section className="resource-section">

        <div className="section-heading">

          <p>RESOURCES</p>

          <h2>
            {selectedSubject === "All"
              ? "Explore Learning Resources"
              : `${selectedSubject} Resources`}
          </h2>

        </div>


        <div className="resource-grid">

          {filteredResources.length > 0 ? (

            filteredResources.map((resource, index) => (

              <div
                className="resource-card"
                key={index}
              >

                {/* ICON */}

                <div className="resource-icon">
                  {resource.icon}
                </div>


                {/* TYPE */}

                <small>
                  {resource.type}
                </small>


                {/* TITLE */}

                <h2>
                  {resource.title}
                </h2>


                {/* DESCRIPTION */}

                <p>
                  {resource.description}
                </p>


                {/* BUTTON */}

                <button
                  onClick={() => openResource(resource.url)}
                >
                  Open Resource →
                </button>

              </div>

            ))

          ) : (

            /* NO RESULTS */

            <div className="no-results">

              <h2>
                🔍 No resources found
              </h2>

              <p>
                Try another search or select a different subject.
              </p>

            </div>

          )}

        </div>

      </section>


      {/* ================= SUBJECTS ================= */}

      <section className="subjects-section">

        <div className="section-heading">

          <p>SUBJECTS</p>

          <h2>
            Explore by Subject
          </h2>

        </div>


        {/* ALL RESOURCES BUTTON */}

        <button
          className={
            selectedSubject === "All"
              ? "subject-filter active"
              : "subject-filter"
          }
          onClick={() => setSelectedSubject("All")}
        >
          All Resources
        </button>


        {/* SUBJECT CARDS */}

        <div className="subject-grid">

          {subjects.map((subject, index) => (

            <div
              className={
                selectedSubject === subject.name
                  ? "subject-card selected"
                  : "subject-card"
              }
              key={index}
              onClick={() =>
                setSelectedSubject(subject.name)
              }
            >

              <span>
                {subject.icon}
              </span>

              <h3>
                {subject.name}
              </h3>

              <p>
                {subject.topics}
              </p>

            </div>

          ))}

        </div>

      </section>

    </div>
  );
}

export default Resources;