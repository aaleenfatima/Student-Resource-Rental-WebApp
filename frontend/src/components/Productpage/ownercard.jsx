import React from 'react';
import RatingStars from './stars';
import styled from 'styled-components';

const UserCard = ({ name, email, memberSince }) => {
  return (
    <div className="user-card">
      <h3>{name}</h3>
      {email && <p className="email">{email}</p>}
      <p className="member-since">
        Member since: {memberSince || 'Unknown date'}
      </p>
    </div>
  );
};

const styles = {
  card: {
    border: '1px solid #e0e0e0',
    borderRadius: '20px',
    padding: '20px',
    maxWidth: '300px',
    fontFamily: 'sans-serif',
    background: '#ffffff',
    boxshadow: '0 20px 15px rgba(0, 0, 0, 0.1)'
    
  },
  amount: {
    fontSize: '32px',
    fontWeight: 600,
    textAlign: 'center',
    marginBottom: '10px',
  },
  divider: {
    borderBottom: '2px solid #ddd',
    marginBottom: '15px',
  },
  profileSection: {
    display: 'flex',
    alignItems: 'flex-start',
  },
  avatar: {
    width: '70px',
    height: '70px',
    borderRadius: '50%',
    objectFit: 'cover',
    marginRight: '15px',
  },
  details: {
    flex: 1,
  },
  addedBy: {
    fontSize: '14px',
    color: '#000',
    marginBottom: '4px',
  },
  viewProfile: {
    fontSize: '13px',
    color: '#007bff',
    textDecoration: 'none',
    display: 'inline-block',
    marginBottom: '10px',
    transition: 'text-decoration 0.2s ease'
  },
  emailRow: {
    fontSize: '14px',
    color: '#444',
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    marginBottom: '8px',
  },
  ratingRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
  },
  icon: {
    fontSize: '16px',
  },
  ratingRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    marginTop: '8px',
  },
  ratingLabel: {
    fontSize: '14px',
    color: '#444',
    minWidth: '45px', 
  },

};
export default UserCard;
