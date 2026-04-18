"use client";
import React, { useState } from "react";

const FilterSection = ({ onFilterChange }) => {
  // State for selected filters
  const [selectedAdType, setSelectedAdType] = useState("All");
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Available options
  const adTypes = ["All", "Skill", "Product", "Request"];
  const categories = [
    "All",
    "Skill",
    "Stationary",
    "Notes/Resources",
    "Electronics",
    "Clothes",
    "Others"
  ];

  const handleAdTypeChange = (value) => {
    setSelectedAdType(value);
    onFilterChange({ adType: value, category: selectedCategory });
  };

  const handleCategoryChange = (value) => {
    setSelectedCategory(value);
    onFilterChange({ adType: selectedAdType, category: value });
  };

  return (
    <section className="search-section">
      <div className="search-container">
        <i className="ti ti-search search-icon" />
        <input
          type="text"
          placeholder="Ads title, keyword..."
          className="search-input"
          onChange={(e) => onFilterChange({ search: e.target.value })}
        />
      </div>
      
      <div className="filters-container">
        {/* Ad Type Filter */}
        <div className="filter-dropdown">
          <select
            value={selectedAdType}
            onChange={(e) => handleAdTypeChange(e.target.value)}
            className="filter-select"
          >
            {adTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
          <i className="ti ti-chevron-down dropdown-icon" />
        </div>

        {/* Category Filter */}
        <div className="filter-dropdown">
          <select
            value={selectedCategory}
            onChange={(e) => handleCategoryChange(e.target.value)}
            className="filter-select"
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
          <i className="ti ti-chevron-down dropdown-icon" />
        </div>
      </div>

      <style jsx>{`
        .filter-select {
          appearance: none;
          background: transparent;
          border: none;
          width: 100%;
          color: #464d61;
          font-size: 14px;
          cursor: pointer;
          padding-right: 25px;
        }
        /* Keep existing styles from previous component */
        .search-section {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 32px;
        }
        .search-container {
          position: relative;
          width: 100%;
          max-width: 984px;
          height: 56px;
          border: 1px solid #ebeef7;
          border-radius: 5px;
          margin-right: 10px;
          background-color: #fff;
        }
        .search-icon {
          position: absolute;
          left: 18px;
          top: 50%;
          transform: translateY(-50%);
          color: #00aaff;
        }
        .search-input {
          width: 100%;
          height: 100%;
          padding: 16px 180px 16px 54px;
          border: none;
          font-size: 16px;
          color: #939aad;
          outline: none;
        }
        .filters-container {
          display: flex;
          gap: 10px;
        }
        .filter-dropdown {
          display: flex;
          height: 44px;
          padding: 12px 16px;
          align-items: center;
          gap: 38px;
          border: 1px solid #edeff5;
          border-radius: 4px;
          cursor: pointer;
          min-width: 152px;
          position: relative;
          background-color: #fff;
        }
        .dropdown-icon {
          color: #939aad;
          position: absolute;
          right: 12px;
          pointer-events: none;
        }
        @media (max-width: 991px) {
          .search-section {
            flex-direction: column;
            gap: 20px;
          }
          .filters-container {
            width: 100%;
            justify-content: space-between;
          }
          .filter-dropdown {
            flex: 1;
          }
        }
      `}</style>
    </section>
  );
};

export default FilterSection;