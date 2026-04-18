import React, { useEffect, useState } from 'react';
import FilterSection from './filter';
import AdCard from './adcard';
import './Listings.css';

const ITEMS_PER_PAGE = 12;

const ListingPg = () => {
  const [allAds, setAllAds] = useState([]);
  const [filteredAds, setFilteredAds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [activeFilters, setActiveFilters] = useState({
    adType: 'All',
    category: 'All',
    search: ''
  });

  useEffect(() => {
    const fetchAds = async () => {
      try {
        const response = await fetch('http://localhost:5000/search');
        if (!response.ok) throw new Error('Failed to fetch ads');
        const data = await response.json();
        setAllAds(data.results);
        setFilteredAds(data.results);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchAds();
  }, []);

  useEffect(() => {
    // Apply filters whenever activeFilters changes
    const filtered = allAds.filter(ad => {
      // Filter by ad type
      if (activeFilters.adType !== 'All' && ad.AdType !== activeFilters.adType) {
        return false;
      }
      
      // Filter by category
      if (activeFilters.category !== 'All' && ad.Category !== activeFilters.category) {
        return false;
      }
      
      // Filter by search term
      if (activeFilters.search && 
          !ad.Title.toLowerCase().includes(activeFilters.search.toLowerCase())) {
        return false;
      }
      
      return true;
    });
    
    setFilteredAds(filtered);
    setCurrentPage(1); // Reset to first page when filters change
  }, [allAds, activeFilters]);

  const handleFilterChange = (newFilters) => {
    setActiveFilters(prev => ({ ...prev, ...newFilters }));
  };

  // Pagination calculations
  const totalPages = Math.ceil(filteredAds.length / ITEMS_PER_PAGE);
  const paginatedAds = filteredAds.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  if (loading) return <div className="loading">Loading ads...</div>;
  if (error) return <div className="error">Error: {error}</div>;

  return (
    <div className="listings-container">
      <h1>All Listings</h1>
      
      <FilterSection onFilterChange={handleFilterChange} />
      
      <div className="active-filters">
        {activeFilters.adType !== 'All' && (
          <span className="filter-tag">
            Type: {activeFilters.adType}
            <button onClick={() => handleFilterChange({ adType: 'All' })}>
              ×
            </button>
          </span>
        )}
        {activeFilters.category !== 'All' && (
          <span className="filter-tag">
            Category: {activeFilters.category}
            <button onClick={() => handleFilterChange({ category: 'All' })}>
              ×
            </button>
          </span>
        )}
        {activeFilters.search && (
          <span className="filter-tag">
            Search: {activeFilters.search}
            <button onClick={() => handleFilterChange({ search: '' })}>
              ×
            </button>
          </span>
        )}
      </div>

      {filteredAds.length === 0 ? (
        <div className="no-results">
          No ads match your filters. Try adjusting your search criteria.
        </div>
      ) : (
        <>
          <div className="ads-grid">
          {paginatedAds.map(ad => {
    

    return (
        <AdCard
            key={ad.ad_id}
            adId={ad.ad_id}
            imageSrc={ad.imageUrl}  // Use the processed URL from server
            title={ad.Title}
            category={ad.Category}
            price={ad.Price ? `$${ad.Price}` : 'Negotiable'}
            adType={ad.AdType}
        />
      );
    })}
          </div>

          <div className="pagination">
            <button 
              className="page-btn" 
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Previous
            </button>
            
            <span className="page-info">
              Page {currentPage} of {totalPages}
            </span>

            <button 
              className="page-btn" 
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default ListingPg;