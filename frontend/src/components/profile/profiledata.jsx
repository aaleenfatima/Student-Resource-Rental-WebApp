import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

const MyProfile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch('http://localhost:5000/alluserprofile', {
          credentials: 'include'
        });
        const data = await res.json();
        if (!data.success) throw new Error(data.message);
        setUser(data.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) return <Message>Loading profile...</Message>;
  if (error) return <Message style={{ color: 'red' }}>Error: {error}</Message>;

  return (
    <ProfileCard>
      <Avatar src={user.imageUrl || 'https://via.placeholder.com/150'} alt="User" />
      <h2>{user.userName}</h2>
      <Info><strong>Roll No:</strong> {user.rollNo}</Info>
      <Info><strong>Email:</strong> {user.email}</Info>
      <Info><strong>Contact:</strong> {user.contact}</Info>
      <Info><strong>Blood Group:</strong> {user.bloodGroup}</Info>
      <Info><strong>Address:</strong> {user.address}</Info>
      <Info><strong>Age:</strong> {user.age}</Info>
      <Info><strong>Gender:</strong> {user.gender}</Info>
      <Info><strong>Rating:</strong> {user.rating}</Info>
      <Info><strong>Member Since:</strong> {new Date(user.memberSince).toLocaleDateString()}</Info>
    </ProfileCard>
  );
};

export default MyProfile;

const ProfileCard = styled.div`
  max-width: 500px;
  margin: 60px auto;
  background: white;
  padding: 30px;
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.1);
  text-align: center;
`;

const Avatar = styled.img`
  width: 130px;
  height: 130px;
  border-radius: 50%;
  margin-bottom: 20px;
  object-fit: cover;
`;

const Info = styled.p`
  font-size: 16px;
  margin: 8px 0;
  color: #333;

  strong {
    color: #1a237e;
  }
`;

const Message = styled.div`
  text-align: center;
  padding: 60px;
  font-size: 18px;
`;
