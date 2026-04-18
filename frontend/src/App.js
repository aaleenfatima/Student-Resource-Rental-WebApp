// src/App.js
import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Layout } from './components/layout';
import Signin from './components/signin/SignInPage'
import Home from './components/homepage/home';
import Profile from './components/postad/Profilecard';
import ListingPg from './components/Listing/ListingPg';
import LAF from './components/LAF/laf';
import Blooddonation from './components/blooddonation/blooddonation';
import LAFform from './components/LAF/LostAndFoundForm';
import BloodRequest from './components/blooddonation/BloodDonationForm'
import AdDetailPage from './components/Productpage/productpage'
import PostAd from './components/postad/adpage'
import Settings from './components/settingspage/ProfileSettings'
import SignUp from './components/signup/SignUpPage'
import P_Ads from './components/personalAd/ProductAdd'
import Rules from './components/rules/UniShareGuidelines'
import Profiledata from './components/profile/profiledata'
import Card from './components/postad/Profilecard'
import Mydash from './components/notification/adsdasboardpage'
function App() {
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetch('http://localhost:5000')
      .then((response) => response.text())
      .then((data) => setMessage(data))
      .catch((error) => console.error("Error fetching message:", error));
  }, []);

  return (
    <Layout>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/" element={<Signin />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/listing" element={<ListingPg />} />
        <Route path="/ad/:adId" element={<AdDetailPage />} />
        <Route path="/post-ad" element={<PostAd />} />
        <Route path="/my-ads" element={<P_Ads />} />
        <Route path="/laf" element={<LAF />} />
        <Route path="/blooddonation" element={<Blooddonation />} />
        <Route path="/request-blood" element={<BloodRequest />} />
        <Route path="/lost-and-found-form" element={<LAFform />} />
        <Route path="/profilesettings" element={<Settings />} />
        <Route path="/rules" element={<Rules />} />
        <Route path="/profiledata" element={<Profiledata />} />
        <Route path="/card" element={<Card />} />
        <Route path="/notifications" element={<Mydash />} />




        {/* Add more routes as needed */}
      </Routes>
    </Layout>
  );
}

export default App;