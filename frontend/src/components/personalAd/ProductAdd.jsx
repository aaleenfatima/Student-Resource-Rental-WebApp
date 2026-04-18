import React, { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import AdCard from './adcard';
import { useParams } from 'react-router-dom';

const ProductAdd = () => {
  const { adId } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserAds = async () => {
      try {
        const response = await fetch(`http://localhost:5000/my-ads`, {
          credentials: 'include'
        });

        if (!response.ok) throw new Error('Failed to fetch user data');
        const data = await response.json();

        if (!data.success) {
          throw new Error(data.message || 'Invalid data received');
        }

        console.log("✅ skillAds:", data.data.skillAds);
        console.log("✅ productAds:", data.data.productAds);

        const userData = {
          userName: data.data.profile[0]?.UserName || 'Unknown User',
          rollNo: data.data.profile[0]?.RollNo || 'N/A',
          bloodGroup: data.data.profile[0]?.BloodGroup || 'N/A',
          age: data.data.profile[0]?.Age || 'N/A',
          gender: data.data.profile[0]?.Gender || 'N/A',
          email: data.data.profile[0]?.Email || 'N/A',
          imageUrl: data.data.profile[0]?.Profile_photo
            ? `data:${data.data.profile[0]?.Ptype || 'image/jpeg'};base64,${data.data.profile[0]?.Profile_photo.toString('base64')}`
            : 'https://via.placeholder.com/200',
          ads: [
            ...(data.data.skillAds || []).map(ad => ({
              type: 'skill',
              skillName: ad.SkillName,
              level: ad.Expertise_Level,
              availability: 'Available',
              price: ad.Price,
              imageUrl: ad.imageUrl
            })),
            ...(data.data.productAds || []).map(ad => ({
              type: 'product',
              productName: ad.ProductName,
              condition: `${ad.Condition}/5`,
              color: ad.Color || 'Various',
              price: ad.Price,
              imageUrl: ad.imageUrl
            }))
          ]
        };

        setUser(userData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserAds();
  }, [adId]);

  const getAdCardProps = (ad) => ({
    imageSrc: ad.imageUrl || 'https://via.placeholder.com/250x200',
    title: ad.type === 'product' ? ad.productName : ad.skillName,
    category: ad.type === 'product'
      ? `${ad.condition} • ${ad.color}`
      : `${ad.level} • ${ad.availability}`,
    price: ad.price,
    adType: ad.type === 'product' ? 'Product' : 'Skill'
  });

  if (loading) return <LoadingMessage>Loading user data...</LoadingMessage>;
  if (error) return <ErrorMessage>Error: {error}</ErrorMessage>;
  if (!user) return <ErrorMessage>No user data available</ErrorMessage>;

  const filteredAds = user.ads.filter(ad => ad.type !== 'service');
  const categorizedAds = filteredAds.reduce((acc, ad) => {
    if (!acc[ad.type]) acc[ad.type] = [];
    acc[ad.type].push(ad);
    return acc;
  }, {});

  return (
    <PageWrapper>
      
      <AdContainer>
        {Object.keys(categorizedAds).length > 0 ? (
          Object.entries(categorizedAds).map(([type, adList]) => (
            <div key={type}>
              <SectionTitle>{type.charAt(0).toUpperCase() + type.slice(1)} Ads</SectionTitle>
              <AdGrid>
                {adList.map((ad, index) => (
                  <AdCardWrapper key={index}>
                    <AdCard {...getAdCardProps(ad)} />
                  </AdCardWrapper>
                ))}
              </AdGrid>
            </div>
          ))
        ) : (
          <EmptyMessage>No ads posted yet.</EmptyMessage>
        )}
      </AdContainer>
    </PageWrapper>
  );
};

// Animations and Styled Components
const fadeInUp = keyframes`
  from { opacity: 0; transform: translateY(30px); }
  to { opacity: 1; transform: translateY(0); }
`;

const PageWrapper = styled.div`
  min-height: 100vh;
  width: 100vw;
  background: linear-gradient(to bottom right, #dde8ff, #cfdcf3);
  padding: 40px 20px;
  animation: ${fadeInUp} 1s ease;
`;

const ProfileLayout = styled.div`
  width: 90%;
  max-width: 1000px;
  background: white;
  border-radius: 25px;
  box-shadow: 0 25px 50px rgba(0, 0, 0, 0.2);
  padding: 40px;
  margin: 0 auto 50px auto;
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 40px;
  align-items: center;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const Avatar = styled.img`
  width: 200px;
  height: 200px;
  border-radius: 50%;
  object-fit: cover;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
  margin: auto;
`;

const InfoSection = styled.div`
  color: #1a237e;
  font-size: 18px;
`;

const Name = styled.h1`
  font-size: 32px;
  font-weight: 800;
  margin-bottom: 20px;
`;

const InfoList = styled.ul`
  list-style: none;
  padding: 0;
`;

const InfoItem = styled.li`
  margin-bottom: 16px;
  font-size: 18px;
  strong {
    color: #303f9f;
    font-weight: 700;
  }
`;

const AdContainer = styled.div`
  width: 90%;
  max-width: 1200px;
  margin: 0 auto;
`;

const SectionTitle = styled.h2`
  font-size: 26px;
  color: #1a237e;
  margin-bottom: 20px;
`;

const AdGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
  margin-bottom: 40px;
`;

const AdCardWrapper = styled.div`
  transition: transform 0.3s ease;
  &:hover {
    transform: translateY(-5px);
  }
`;

const LoadingMessage = styled.div`
  text-align: center;
  padding: 40px;
  font-size: 18px;
  color: #555;
`;

const ErrorMessage = styled.div`
  text-align: center;
  padding: 40px;
  font-size: 18px;
  color: #cc0000;
`;

const EmptyMessage = styled.p`
  text-align: center;
  font-size: 18px;
  color: #666;
  padding: 40px;
`;

export default ProductAdd;
