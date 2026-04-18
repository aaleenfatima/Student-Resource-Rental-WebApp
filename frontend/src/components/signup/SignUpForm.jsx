"use client";
import React, { useState } from "react";
import styles from "../signin/SignInPage.module.css";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
export function SignUpForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    age: "",
    bloodGroup: "",
    contact: "",
    rollNo: "",
    address: "",
    gender: "",
    profilePhoto: null,  // For storing profile photo
  });
const navigate = useNavigate();
const handleSubmit = async (e) => {
  e.preventDefault();

  const form = new FormData();
  form.append("UserName", formData.username);
  form.append("Email", formData.email);
  form.append("password", formData.password);
  form.append("confirmPassword", formData.confirmPassword);
  form.append("Age", formData.age);
  form.append("BloodGroup", formData.bloodGroup);
  form.append("Contact", formData.contact);
  form.append("RollNo", formData.rollNo);
  form.append("U_Address", formData.address);
  form.append("Gender", formData.gender);

  if (formData.profilePhoto) {
    form.append("images", formData.profilePhoto); // 'images' must match backend field name
  }

  try {
    const response = await axios.post('http://localhost:5000/signup', form, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    console.log('SignUp successful:', response.data);
    navigate('/home');
  } catch (err) {
    console.error('Signup error:', err.response?.data || err.message);
  }
};


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData((prevState) => ({
      ...prevState,
      profilePhoto: file,
    }));
  };

  const handleRemovePhoto = () => {
    setFormData((prevState) => ({
      ...prevState,
      profilePhoto: null,
    }));
  };

  return (
    <section className={styles.signInFormContainer}>
      <div className={styles.formHeader}>
        <h2 className={styles.formTitle}>Sign Up</h2>

        <div className={styles.divider}>
          <span className={styles.dividerText}></span>
        </div>
      </div>

      <form className={styles.signInForm} onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          name="username"
          value={formData.username}
          onChange={handleInputChange}
          className={styles.formInput}
        />
        <input
          type="email"
          placeholder="Email Address"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          className={styles.formInput}
        />
        <div className={styles.passwordInput}>
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            className={styles.formInput}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className={styles.togglePassword}
          >
            <img
              src="https://cdn.builder.io/api/v1/image/assets/46c49c6ab3714444ac32ad4faea97f64/6bed3c4f87ff30a9dcfd5be82fd95359907b7d1f87e12921bc52b37a75276d24?placeholderIfAbsent=true"
              alt="Toggle password visibility"
            />
          </button>
        </div>
        <div className={styles.passwordInput}>
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Confirm Password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleInputChange}
            className={styles.formInput}
          />
        </div>
        <input
          type="number"
          placeholder="Age"
          name="age"
          value={formData.age}
          onChange={handleInputChange}
          className={styles.formInput}
        />
        <select
          name="bloodGroup"
          value={formData.bloodGroup}
          onChange={handleInputChange}
          className={styles.formInput}
        >
          <option value="">Select Blood Group</option>
          <option value="A+">A+</option>
          <option value="A-">A-</option>
          <option value="B+">B+</option>
          <option value="B-">B-</option>
          <option value="AB+">AB+</option>
          <option value="AB-">AB-</option>
          <option value="O+">O+</option>
          <option value="O-">O-</option>
        </select>
        <input
          type="text"
          placeholder="Contact Number"
          name="contact"
          value={formData.contact}
          onChange={handleInputChange}
          className={styles.formInput}
        />
        <input
          type="text"
          placeholder="Roll Number"
          name="rollNo"
          value={formData.rollNo}
          onChange={handleInputChange}
          className={styles.formInput}
        />
        <textarea
          placeholder="Address"
          name="address"
          value={formData.address}
          onChange={handleInputChange}
          className={styles.formInput}
        ></textarea>
        <div className={styles.genderOptions}>
          <label>
            <input
              type="radio"
              name="gender"
              value="M"
              checked={formData.gender === "M"}
              onChange={handleInputChange}
            />
            Male
          </label>
          <label>
            <input
              type="radio"
              name="gender"
              value="F"
              checked={formData.gender === "F"}
              onChange={handleInputChange}
            />
            Female
          </label>
          <label>
            <input
              type="radio"
              name="gender"
              value="O"
              checked={formData.gender === "O"}
              onChange={handleInputChange}
            />
            Other
          </label>
        </div>

        {/* Profile Photo Upload */}
        <div className={styles.uploadPhoto}>
  <input
    type="file"
    accept="image/*"
    onChange={handleFileChange}
    className={styles.fileInput}
    id="fileInput"
  />
  
  {formData.profilePhoto ? (
    <div className={styles.preview}>
      <img
        src={URL.createObjectURL(formData.profilePhoto)}
        alt="Profile Preview"
        className={styles.previewImage}
      />
      <button
        type="button"
        onClick={handleRemovePhoto}
        className={styles.removePhotoButton}
      >
        Remove Photo
      </button>
    </div>
  ) : (
    <label htmlFor="fileInput" className={styles.customFileButton}>
      Choose a Profile Photo
    </label>
  )}
</div>


        <button type="submit" className={styles.submitButton}>
          <span>Sign Up</span>
          <span className={styles.arrowRight} />
        </button>
        <p className={styles.signUpPrompt}>
          Already have an account?
          <button type="submit" className={styles.signUpLink}>
            Sign In
          </button>
        </p>
      </form>
    </section>
  );
}
