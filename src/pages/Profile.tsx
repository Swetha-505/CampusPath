function Profile() {
  return (
    <div className="profile-page">
      <h1>Student Profile</h1>

      <div className="profile-card">
        <div className="profile-icon">👩‍🎓</div>

        <h2>Student</h2>
        <p>Welcome to your CampusPath profile.</p>

        <div className="profile-info">
          <p><strong>Name:</strong> Student</p>
          <p><strong>Role:</strong> Student</p>
          <p><strong>College:</strong> Your College</p>
        </div>
      </div>
    </div>
  );
}

export default Profile;