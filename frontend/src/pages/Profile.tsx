import { useEffect, useState } from "react";
import api from "../services/api";
import "../Profile.css";

interface Student {
  id?: number;
  name: string;
  role: string;
  college: string;
  year: string;
  email: string;
  goal: string;
}

const defaultStudent: Student = {
  name: "Student",
  role: "B.Tech Information Technology Student",
  college: "Your College",
  year: "2nd Year",
  email: "student@example.com",
  goal: "Software Developer",
};

const stats = [
  ["📚", "24", "Resources Completed"],
  ["🗺️", "68%", "Roadmap Progress"],
  ["✓", "18", "Assessments"],
  ["🔥", "7", "Day Learning Streak"],
];

const skills = [
  ["☕", "Java", 75],
  ["🐍", "Python", 65],
  ["🗄️", "DBMS", 80],
  ["🧩", "Data Structures", 55],
];

const achievements = [
  ["🏆", "Consistent Learner", "Maintained a 7-day learning streak."],
  ["⭐", "Quiz Performer", "Completed multiple assessments."],
  ["💬", "Community Contributor", "Participated in student discussions."],
];

function Profile() {
  const [student, setStudent] = useState<Student>(defaultStudent);
  const [formData, setFormData] = useState<Student>(defaultStudent);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => { fetchProfile(); }, []);

  const fetchProfile = async () => {
    try {
      setLoading(true);
      const response = await api.get("/profile");
      setStudent(response.data);
      setFormData(response.data);
    } catch (err: any) {
      if (err.response?.status === 404) {
        setStudent(defaultStudent);
        setFormData(defaultStudent);
      } else {
        setError("Unable to connect to the CampusPath backend.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setFormData((p) => ({ ...p, [e.target.name]: e.target.value }));

  const handleEdit = () => { setFormData(student); setMessage(""); setError(""); setIsEditing(true); };
  const handleCancel = () => { setFormData(student); setMessage(""); setError(""); setIsEditing(false); };

  const handleSave = async () => {
    try {
      setSaving(true); setMessage(""); setError("");
      const response = student.id ? await api.put("/profile", formData) : await api.post("/profile", formData);
      const updated = response.data.profile;
      setStudent(updated); setFormData(updated); setIsEditing(false); setMessage("Profile saved successfully.");
    } catch {
      setError("Unable to save profile. Please check the backend.");
    } finally { setSaving(false); }
  };

  if (loading) return <div className="profile-page"><div className="profile-loading"><div className="profile-loading-icon">👩‍🎓</div><h1>Loading your profile</h1><p>Getting your CampusPath information...</p></div></div>;

  const initials = student.name.split(" ").filter(Boolean).slice(0, 2).map((x) => x[0]?.toUpperCase()).join("") || "S";

  return (
    <div className="profile-page">
      <section className="profile-hero">
        <div className="profile-avatar">{initials}</div>
        <div className="profile-identity">
          <span className="eyebrow">STUDENT PROFILE</span>
          <h1>{student.name}</h1>
          <p className="profile-role">{student.role}</p>
          <div className="profile-meta"><span>🎓 {student.college}</span><span>📅 {student.year}</span><span>✉️ {student.email}</span></div>
        </div>
        {!isEditing && <button type="button" className="profile-primary-button" onClick={handleEdit}>Edit Profile</button>}
      </section>

      {message && <div className="profile-message">✓ {message}</div>}
      {error && <div className="profile-error">⚠ {error}</div>}

      <div className="profile-layout">
        <main>
          {isEditing ? (
            <section className="profile-panel">
              <div className="profile-section-heading"><div><span className="eyebrow">PERSONAL INFORMATION</span><h2>Edit Profile</h2></div><span className="section-icon">✎</span></div>
              <div className="profile-form-grid">
                {(["name", "role", "college", "year", "email", "goal"] as const).map((field) => (
                  <label key={field} className={field === "college" || field === "goal" ? "full-width" : ""}>
                    <span>{field === "goal" ? "Career Goal" : field.charAt(0).toUpperCase() + field.slice(1)}</span>
                    <input type={field === "email" ? "email" : "text"} name={field} value={formData[field]} onChange={handleChange} />
                  </label>
                ))}
              </div>
              <div className="profile-actions">
                <button type="button" className="profile-primary-button" onClick={handleSave} disabled={saving}>{saving ? "Saving..." : "Save Changes"}</button>
                <button type="button" className="profile-secondary-button" onClick={handleCancel} disabled={saving}>Cancel</button>
              </div>
            </section>
          ) : (
            <section className="profile-panel">
              <div className="profile-section-heading"><div><span className="eyebrow">ABOUT YOU</span><h2>Profile Information</h2></div><span className="section-icon">👤</span></div>
              <div className="profile-info-grid">
                <div><span>Name</span><strong>{student.name}</strong></div><div><span>Role</span><strong>{student.role}</strong></div>
                <div><span>College</span><strong>{student.college}</strong></div><div><span>Academic Year</span><strong>{student.year}</strong></div>
                <div><span>Email</span><strong>{student.email}</strong></div><div><span>Career Goal</span><strong>{student.goal}</strong></div>
              </div>
            </section>
          )}

          <section className="profile-panel">
            <div className="profile-section-heading"><div><span className="eyebrow">YOUR ACTIVITY</span><h2>Learning Overview</h2></div><span className="section-icon">📈</span></div>
            <div className="profile-stats">{stats.map(([icon, value, label]) => <div className="profile-stat-card" key={label}><div className="stat-icon">{icon}</div><strong>{value}</strong><span>{label}</span></div>)}</div>
          </section>

          <section className="profile-panel">
            <div className="profile-section-heading"><div><span className="eyebrow">DEVELOPMENT</span><h2>Skill Progress</h2></div><span className="section-icon">⚡</span></div>
            <div className="skills-list">{skills.map(([icon, name, value]) => <div className="profile-skill" key={name as string}><div className="skill-topline"><div className="skill-name"><span className="skill-icon">{icon}</span><strong>{name}</strong></div><span>{value}%</span></div><div className="profile-skill-track"><div className="profile-skill-fill" style={{ width: `${value}%` }} /></div></div>)}</div>
          </section>
        </main>

        <aside>
          <section className="profile-panel goal-panel"><span className="eyebrow">CAREER DIRECTION</span><div className="goal-icon">🚀</div><h2>{student.goal}</h2><p>Keep building skills, completing projects and preparing for the roles you want.</p></section>
          <section className="profile-panel">
            <div className="profile-section-heading"><div><span className="eyebrow">MILESTONES</span><h2>Achievements</h2></div><span className="section-icon">🏆</span></div>
            <div className="achievement-list">{achievements.map(([icon, title, description]) => <div className="achievement-card" key={title as string}><span className="achievement-icon">{icon}</span><div><h3>{title}</h3><p>{description}</p></div></div>)}</div>
          </section>
        </aside>
      </div>
    </div>
  );
}

export default Profile;
