'use client'
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import "./Profilecard.css";

const ProfileCard = () => {
  const [userData, setUserData] = useState({
    name: 'Loading...',
    profileImage: '',
    rollNo: ''
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch('http://localhost:5000/userprofile', {
          credentials: 'include'
        });
        
        const data = await response.json();
        console.log("API Response:", data); // Debug log
        
        if (!response.ok || !data.success) {
          throw new Error(data.message || 'Failed to load profile');
        }

        setUserData({
          name: data.name || 'User',
          profileImage: data.profileImage || '',
          rollNo: data.rollNo || ''
        });
      } catch (err) {
        console.error("Profile fetch error:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleSignOut = async (e) => {
    e.preventDefault();
    try {
      await fetch('http://localhost:5000/signout', {
        method: 'POST',
        credentials: 'include'
      });
      navigate('/signin');
    } catch (err) {
      console.error('Sign out failed:', err);
    }
  };

  if (loading) return <div className="loading">Loading profile...</div>;
  if (error) return <div className="error">Error: {error}</div>;

  return (
    <div className="profile-card">
      <div className="profile-header">
        {userData.profileImage ? (
          <img 
            src={userData.profileImage} 
            alt="Profile" 
            className="profile-image"
            onError={(e) => {
              e.target.src = 'https://via.placeholder.com/150';
              console.error("Image load failed, using fallback");
            }}
          />
        ) : (
          <div className="profile-image-fallback">
            <span>{userData.name.charAt(0).toUpperCase()}</span>
          </div>
        )}
        <h3>{userData.name}</h3>
        <p className="member-text">Member</p>
      </div>
      <div className="profile-menu">
        <Link to={`/profiledata`} className="menu-item">
          <i className="fas fa-user"></i>
          View Profile
        </Link>
        <Link to="/post-ad" className="menu-item">
          <i className="fas fa-plus"></i>
          Post an Ad
        </Link>
        <Link to="/my-ads" className="menu-item">
          <i className="fas fa-list"></i>
          My Ads
        </Link>
        <Link to="/notifications" className="menu-item">
          <i className="fas fa-heart"></i>
          Notifications
        </Link>
        <Link to="/profilesettings" className="menu-item">
          <i className="fas fa-cog"></i>
          Account Settings
        </Link>
        <p href="#" className="menu-item sign-out" onClick={handleSignOut}>
          <i className="fas fa-sign-out-alt"></i>
          Sign Out
        </p>
      </div>
    </div>
  );
};

export default ProfileCard;