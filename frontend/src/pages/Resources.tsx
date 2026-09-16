import { useEffect, useState } from "react";
import api from "../services/api";

interface Resource {
  id: number;
  title: string;
  description: string;
  category: string;
  resource_type: string;
  link: string;
  difficulty: string;
}

interface Subject {
  name: string;
  icon: string;
  topics: string;
}

function Resources() {
  const [search, setSearch] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("All");

  const [resources, setResources] = useState<Resource[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ================= RESOURCE ICON =================

  const getResourceIcon = (
    category: string,
    resourceType: string
  ) => {
    const categoryText = category.toLowerCase();
    const typeText = resourceType.toLowerCase();

    if (categoryText.includes("program")) {
      if (typeText.includes("course")) return "💻";
      return "🐍";
    }

    if (categoryText.includes("database")) {
      return "🗄️";
    }

    if (categoryText.includes("web")) {
      return "🌐";
    }

    if (categoryText.includes("computer")) {
      return "⚙️";
    }

    if (categoryText.includes("artificial")) {
      return "🤖";
    }

    if (categoryText.includes("cloud")) {
      return "☁️";
    }

    if (categoryText.includes("cyber")) {
      return "🔐";
    }

    if (typeText.includes("previous")) {
      return "📄";
    }

    if (typeText.includes("notes")) {
      return "📚";
    }

    if (typeText.includes("tutorial")) {
      return "🎓";
    }

    return "📖";
  };

  // ================= FETCH RESOURCES =================

  useEffect(() => {
    fetchResources();
  }, []);

  const fetchResources = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await api.get("/resources");

      setResources(response.data.resources || []);
    } catch (err) {
      console.error("Failed to load resources:", err);

      setError(
        "Unable to load resources. Please make sure the backend is running."
      );
    } finally {
      setLoading(false);
    }
  };

  // ================= DYNAMIC SUBJECTS =================

  const subjects: Subject[] = Array.from(
    new Set(resources.map((resource) => resource.category))
  ).map((category) => {
    const categoryResources = resources.filter(
      (resource) => resource.category === category
    );

    const topics = Array.from(
      new Set(
        categoryResources.map((resource) => {
          return resource.title;
        })
      )
    )
      .slice(0, 4)
      .join(" • ");

    return {
      name: category,
      icon: getResourceIcon(category, ""),
      topics:
        topics ||
        `${category} learning resources`,
    };
  });

  // ================= SEARCH + FILTER =================

  const filteredResources = resources.filter((resource) => {
    const searchText = search.toLowerCase().trim();

    const matchesSearch =
      resource.title.toLowerCase().includes(searchText) ||
      resource.description.toLowerCase().includes(searchText) ||
      resource.resource_type.toLowerCase().includes(searchText) ||
      resource.category.toLowerCase().includes(searchText) ||
      resource.difficulty.toLowerCase().includes(searchText);

    const matchesSubject =
      selectedSubject === "All" ||
      resource.category === selectedSubject;

    return matchesSearch && matchesSubject;
  });

  // ================= OPEN RESOURCE =================

  const openResource = (url: string) => {
    if (!url) {
      return;
    }

    window.open(
      url,
      "_blank",
      "noopener,noreferrer"
    );
  };

  // ================= LOADING =================

  if (loading) {
    return (
      <div className="resources-page">

        <section className="resources-header">

          <p className="small-title">
            LEARN • PRACTICE • GROW
          </p>

          <h1>Free Learning Resources</h1>

          <p>
            Everything you need for your academic journey,
            all in one place.
          </p>

        </section>

        <div className="no-results">

          <h2>
            Loading resources...
          </h2>

          <p>
            Please wait while we load your learning resources.
          </p>

        </div>

      </div>
    );
  }

  return (
    <div className="resources-page">

      {/* ================= HEADER ================= */}

      <section className="resources-header">

        <p className="small-title">
          LEARN • PRACTICE • GROW
        </p>

        <h1>
          Free Learning Resources
        </h1>

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
          onChange={(e) =>
            setSearch(e.target.value)
          }
        />

      </section>

      {/* ================= ERROR ================= */}

      {error && (
        <div
          style={{
            width: "90%",
            maxWidth: "1200px",
            margin: "0 auto 25px",
            padding: "15px 18px",
            borderRadius: "12px",
            background: "#fff1f2",
            color: "#be123c",
            textAlign: "center",
            boxSizing: "border-box",
          }}
        >
          {error}
        </div>
      )}

      {/* ================= RESOURCE SECTION ================= */}

      <section className="resource-section">

        <div className="section-heading">

          <p>
            RESOURCES
          </p>

          <h2>
            {selectedSubject === "All"
              ? "Explore Learning Resources"
              : `${selectedSubject} Resources`}
          </h2>

        </div>

        <div className="resource-grid">

          {filteredResources.length > 0 ? (

            filteredResources.map((resource) => (

              <div
                className="resource-card"
                key={resource.id}
              >

                {/* ICON */}

                <div className="resource-icon">

                  {getResourceIcon(
                    resource.category,
                    resource.resource_type
                  )}

                </div>

                {/* TYPE */}

                <small>
                  {resource.resource_type}
                </small>

                {/* TITLE */}

                <h2>
                  {resource.title}
                </h2>

                {/* DESCRIPTION */}

                <p>
                  {resource.description}
                </p>

                {/* CATEGORY */}

                <span
                  style={{
                    display: "inline-block",
                    marginRight: "8px",
                    marginBottom: "15px",
                    padding: "6px 10px",
                    borderRadius: "8px",
                    background: "#f0efff",
                    color: "#635bff",
                    fontSize: "12px",
                    fontWeight: 700,
                  }}
                >
                  {resource.category}
                </span>

                {/* DIFFICULTY */}

                <span
                  style={{
                    display: "inline-block",
                    marginBottom: "15px",
                    padding: "6px 10px",
                    borderRadius: "8px",
                    background: "#f3f4f6",
                    color: "#4b5563",
                    fontSize: "12px",
                    fontWeight: 700,
                  }}
                >
                  {resource.difficulty}
                </span>

                {/* BUTTON */}

                <button
                  onClick={() =>
                    openResource(resource.link)
                  }
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

          <p>
            SUBJECTS
          </p>

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
          onClick={() =>
            setSelectedSubject("All")
          }
        >
          All Resources
        </button>

        {/* SUBJECT CARDS */}

        <div className="subject-grid">

          {subjects.map((subject) => (

            <div
              className={
                selectedSubject === subject.name
                  ? "subject-card selected"
                  : "subject-card"
              }
              key={subject.name}
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