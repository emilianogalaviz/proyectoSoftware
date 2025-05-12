import "../styles/dashboard.css";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getUserData, updateUserInfo } from "/Users/emilianogalaviz/Desktop/ingSoftware/gitSoftware/proyectoSoftware/App/BackEnd/api.js"; // Importar funciones de la API

export default function Dashboard() {
  const navigate = useNavigate();

  const [profileImage, setProfileImage] = useState(
    localStorage.getItem("profileImage") || "https://via.placeholder.com/140x140.png?text=profile"
  );
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const emailFromStorage = localStorage.getItem("userEmail"); // Obtener el email del usuario (almacenado tras login)
        if (!emailFromStorage) {
          navigate("/"); // Redirigir si no hay email
          return;
        }

        const userData = await getUserData(emailFromStorage);
        setName(userData.username);
        setEmail(userData.email);
        setPhone(userData.phone_number);
      } catch (error) {
        console.error("Error fetching user data:", error);
        alert("Error al cargar los datos del usuario.");
        navigate("/"); // Redirigir al inicio en caso de error
      }
    };

    fetchUserData();
  }, [navigate]);

  const handleUserInfoUpdate = async () => {
    try {
      await updateUserInfo(email, name, phone);
      alert("User information updated successfully!");
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating user information:", error);
      alert(error.error || "Error al actualizar la información del usuario.");
    }
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    alert("Password updated successfully!");
    setNewPassword("");
    setConfirmPassword("");
    setShowPasswordForm(false);
  };

  const handleBackClick = () => {
    navigate("/");
  };

  return (
    <div className="dashboard-container">
      {/* Panel izquierdo */}
      <div className="dashboard-left">
        <button className="back-btn" onClick={handleBackClick}>←</button>
        <label htmlFor="profile-upload" className="profile-upload-wrapper">
          <img src={profileImage} alt="Profile" className="profile-picture" />
          <div className="upload-overlay">📷</div>
        </label>
        <input
          id="profile-upload"
          type="file"
          accept="image/*"
          onChange={(e) => {
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
          }}
          style={{ display: "none" }}
        />
        <h1>Hi, {name || "User"}</h1>
        <p>Your personal space, your rules!</p>
      </div>

      {/* Panel derecho */}
      <div className="dashboard-right">
        <h2>Your Dashboard</h2>
        <div className="info-group">
          <div className="edit-header">
            <p className="section-title">Personal Information:</p>
            <button
              className="edit-btn"
              onClick={() => {
                if (isEditing) {
                  handleUserInfoUpdate(); // Llamar a la función para actualizar los datos del usuario
                }
                setIsEditing(!isEditing);
              }}
            >
              {isEditing ? "💾" : "✏️"}
            </button>
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
            {email || <i>sin info</i>} {/* El correo no se puede editar */}
          </p>
          <p>
            <b>Phone Number:</b>{" "}
            {isEditing ? (
              <input value={phone} onChange={(e) => setPhone(e.target.value)} />
            ) : (
              phone || <i>sin info</i>
            )}
          </p>
        </div>

        <div className="password-group">
          <div className="edit-header">
            <p className="section-title">Password:</p>
            <button
              className="edit-btn"
              onClick={() => setShowPasswordForm(!showPasswordForm)}
            >
              {showPasswordForm ? "❌" : "✏️"}
            </button>
          </div>
          {showPasswordForm && (
            <form onSubmit={handlePasswordSubmit}>
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
    </div>
  );
}