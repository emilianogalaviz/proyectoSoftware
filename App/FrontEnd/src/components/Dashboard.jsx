import "../styles/dashboard.css";

import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Importar useNavigate

export default function Dashboard() {
  const navigate = useNavigate(); // Inicializar useNavigate

  const [profileImage, setProfileImage] = useState(
    localStorage.getItem("profileImage") || "https://via.placeholder.com/140x140.png?text=profile"
  );

  

  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState("Santiago Aguas");
  const [email, setEmail] = useState("santiago.ad@gmail.com");
  const [phone, setPhone] = useState("3315209002");
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = reader.result;
        setProfileImage(base64);
        localStorage.setItem("profileImage", base64);
      };
      reader.readAsDataURL(file);
    }
  };

  const toggleEdit = () => setIsEditing((prev) => !prev);
  const togglePasswordForm = () => setShowPasswordForm(!showPasswordForm);

  const handlePasswordChange = (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    alert("Password changed successfully!");
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
    setShowPasswordForm(false); // Cierra el formulario
  };

  const handleBackClick = () => {
    navigate("/"); // Redirigir al inicio
  };

  return (
    <div className="dashboard-container">
      {/* Panel azul izquierdo */}
      <div className="dashboard-left">
        <button className="back-btn" onClick={handleBackClick}>←</button>

        <label htmlFor="profile-upload" className="profile-upload-wrapper">
          <img
            src={profileImage}
            alt="Profile"
            className="profile-picture"
          />
          <div className="upload-overlay">📷</div>
        </label>
        <input
          id="profile-upload"
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          style={{ display: "none" }}
        />

        <h1>Hi, Santiago</h1>
        <p>Your personal space, your rules!</p>
      </div>

      {/* Panel derecho */}
      <div className="dashboard-right">
        <h2>Your Dashboard</h2>

        <div className="info-group">
          <div className="edit-header">
            <p className="section-title">Personal Information:</p>
            <button className="edit-btn" onClick={toggleEdit}>{isEditing ? "💾" : "✏️"}</button>
          </div>

          <p>
            <b>Name:</b>{" "}
            {isEditing ? (
              <input value={name} onChange={(e) => setName(e.target.value)} />
            ) : (
              name || <i>sin info</i>
            )}
          </p>

          <p>
            <b>Email:</b>{" "}
            {isEditing ? (
              <input value={email} onChange={(e) => setEmail(e.target.value)} />
            ) : (
              email || <i>sin info</i>
            )}
          </p>

          <p>
            <b>Phone Number:</b>{" "}
            {isEditing ? (
              <input value={phone} onChange={(e) => setPhone(e.target.value)} />
            ) : (
              phone || <i>sin info</i>
            )}
          </p>

          <p><b>Member Since:</b> 17/03/25</p>
        </div>

        <div className="info-group">
          <p className="section-title">Security & Settings:</p>
          <div className="toggle-section">
            <label>Disable Face ID</label>
            <input type="checkbox" />
          </div>
        </div>

        <button className="change-password-btn" onClick={togglePasswordForm}>CHANGE PASSWORD</button>

        {showPasswordForm && (
          <form className="password-form" onSubmit={handlePasswordChange}>
            <input
              type="password"
              placeholder="Current Password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Confirm New Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            <button type="submit" className="save-password-btn">
              Save
            </button>
          </form>
        )}
      </div>
    </div>
  );
}