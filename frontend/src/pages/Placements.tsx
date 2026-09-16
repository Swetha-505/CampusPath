import { useMemo, useState } from "react";
import "../Placements.css";

type Section = "experiences" | "internships" | "companies" | "preparation" | null;

const sections = {
  experiences: {
    icon: "💼",
    category: "EXPERIENCES",
    title: "Interview Experiences",
    description: "Read interview experiences, selection processes and practical preparation tips shared by students.",
  },
  internships: {
    icon: "🎓",
    category: "OPPORTUNITIES",
    title: "Internships",
    description: "Explore internship platforms, eligibility requirements and the skills you should prepare before applying.",
  },
  companies: {
    icon: "🏢",
    category: "RECRUITMENT",
    title: "Recruiting Companies",
    description: "Understand recruitment patterns, company career pages and the skills commonly expected in software roles.",
  },
  preparation: {
    icon: "📖",
    category: "LEARNING",
    title: "Placement Preparation",
    description: "Prepare for aptitude tests, coding rounds, technical interviews and HR discussions.",
  },
} as const;

const details = {
  experiences: [
    ["🧠", "Technical Interview", "Practice data structures, algorithms, OOP, DBMS, operating systems, networking and project-based questions.", "Technical Round", [["Practice DSA on GeeksforGeeks", "https://www.geeksforgeeks.org/data-structures/"], ["Practice coding on HackerRank", "https://www.hackerrank.com/domains"]]],
    ["💬", "HR Interview", "Prepare your introduction, project explanation, strengths, teamwork examples, career goals and situational questions.", "HR Round", [["Interview guidance on Indeed", "https://www.indeed.com/career-advice/interviewing"]]],
    ["📝", "Interview Preparation Tips", "Keep your resume updated, know every project on it, practice explaining your decisions and complete mock interviews.", "Preparation", [["Resume and interview guidance on LinkedIn", "https://www.linkedin.com/jobs/"]]],
  ],
  internships: [
    ["🔎", "Find Internships", "Search for software, web development, AI, data science and other technical internships.", "Opportunities", [["Search internships on Internshala", "https://internshala.com/internships/"], ["Search jobs on LinkedIn", "https://www.linkedin.com/jobs/"]]],
    ["📋", "Internship Checklist", "Keep a concise resume, active GitHub profile, portfolio projects and basic interview preparation ready before applying.", "Checklist", [["Create a GitHub profile", "https://github.com/"]]],
    ["✅", "Eligibility & Applications", "Check academic requirements, required skills, deadlines, application instructions and selection rounds for every opening.", "Eligibility", [["Explore AICTE internships", "https://internship.aicte-india.org/"]]],
  ],
  companies: [
    ["🏢", "Service-Based Companies", "Prepare aptitude, logical reasoning, verbal ability, programming fundamentals and communication skills.", "Aptitude + Coding", [["Explore TCS careers", "https://www.tcs.com/careers"], ["Explore Infosys careers", "https://www.infosys.com/careers/"]]],
    ["💻", "Product-Based Companies", "Strengthen DSA, problem-solving, core CS concepts, system fundamentals and project knowledge.", "DSA + Fundamentals", [["Explore Microsoft careers", "https://careers.microsoft.com/"], ["Explore Google careers", "https://www.google.com/about/careers/applications/"]]],
    ["🔬", "Research the Company", "Before applying, read the job description, study the required skills and understand the company's recruitment process.", "Research", [["Search company jobs on LinkedIn", "https://www.linkedin.com/jobs/"]]],
  ],
  preparation: [
    ["🧮", "Aptitude Preparation", "Practice percentages, ratios, averages, time and work, probability, number systems and logical reasoning.", "Aptitude", [["Practice aptitude on IndiaBIX", "https://www.indiabix.com/aptitude/questions-and-answers/"]]],
    ["⌨️", "Coding Preparation", "Practice arrays, strings, searching, sorting, recursion, linked lists, stacks, queues and basic dynamic programming.", "Coding", [["Practice on LeetCode", "https://leetcode.com/problemset/"], ["Practice on HackerRank", "https://www.hackerrank.com/domains/algorithms"]]],
    ["🛠️", "Technical Interview", "Revise Java, Python, OOP, DBMS, SQL, operating systems, computer networks and your academic projects.", "Technical", [["Review CS fundamentals", "https://www.geeksforgeeks.org/technical-interview-questions/"]]],
    ["🤝", "HR Preparation", "Prepare your introduction, project explanation, career goals, teamwork examples and commonly asked HR questions.", "HR", [["Practice interview questions", "https://www.indeed.com/career-advice/interviewing"]]],
  ],
} as const;

function Placements() {
  const [activeSection, setActiveSection] = useState<Section>(null);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredSections = useMemo(() => {
    const q = searchTerm.trim().toLowerCase();
    return (Object.entries(sections) as [Exclude<Section, null>, (typeof sections)[Exclude<Section, null>]][]).filter(([key, section]) => {
      if (!q) return true;
      return key.includes(q) || section.title.toLowerCase().includes(q) || section.category.toLowerCase().includes(q) ||
        section.description.toLowerCase().includes(q) ||
        details[key].some((item) => item[1].toLowerCase().includes(q) || item[2].toLowerCase().includes(q) || item[3].toLowerCase().includes(q));
    });
  }, [searchTerm]);

  const openExternal = (url: string) => window.open(url, "_blank", "noopener,noreferrer");

  const openSection = (section: Exclude<Section, null>) => {
    setActiveSection(section);
    window.setTimeout(() => document.getElementById("placement-details")?.scrollIntoView({ behavior: "smooth", block: "start" }), 0);
  };

  return (
    <div className="page placements-page">
      <div className="page-header placements-header">
        <span className="eyebrow">CAREER • INTERNSHIPS • PLACEMENTS</span>
        <h1>Placement Corner</h1>
        <p>Explore opportunities, interview guidance, company resources and practical preparation material in one place.</p>
      </div>

      <div className="placement-search-area">
        <span className="search-icon">🔍</span>
        <input className="placement-search" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} placeholder="Search internships, interviews, companies..." />
      </div>

      {filteredSections.length ? (
        <div className="placement-grid">
          {filteredSections.map(([key, section]) => (
            <article className="placement-card" key={key}>
              <div className="placement-card-top">
                <div className="placement-icon">{section.icon}</div>
                <span className="card-category">{section.category}</span>
              </div>
              <h2>{section.title}</h2>
              <p>{section.description}</p>
              <button type="button" className="card-button" onClick={() => openSection(key)}>Explore {key === "preparation" ? "Preparation" : section.title} →</button>
            </article>
          ))}
        </div>
      ) : (
        <div className="empty-state"><div className="empty-icon">🔎</div><h3>No placement resources found</h3><p>Try searching for internships, companies, interviews or coding.</p></div>
      )}

      {activeSection && (
        <section className="placement-details" id="placement-details">
          <div className="details-header">
            <div><span className="eyebrow">{sections[activeSection].category}</span><h2>{sections[activeSection].icon} {sections[activeSection].title}</h2></div>
            <button type="button" className="close-details-button" onClick={() => setActiveSection(null)}>Close ✕</button>
          </div>
          <div className="details-content">
            {details[activeSection].map(([icon, title, description, tag, links]) => (
              <article className="info-item" key={title}>
                <div className="info-item-icon">{icon}</div>
                <div className="info-item-body">
                  <div className="info-item-heading"><h3>{title}</h3><span className="info-tag">{tag}</span></div>
                  <p>{description}</p>
                  <div className="placement-links">
                    {links.map(([label, url]) => <button type="button" className="placement-link-button" key={url} onClick={() => openExternal(url)}>{label} ↗</button>)}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

export default Placements;
