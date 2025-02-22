import { useState, useEffect } from 'react';
import { searchSubGroup3 } from '../../api/groupsApi';

const useSearchSubGroup3 = () => {
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState('main_group_code'); // Default filter
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null); // Define error state

  const handleQueryChange = (e) => setQuery(e.target.value);

  const handleFilterChange = (e) => setFilter(e.target.value);

  const handleSearch = async () => {
    try {
      setLoading(true);
      setError(null); // Reset error state before search
      const data = await searchSubGroup3(query, filter); // Call the updated API
      setResults(data); // Update results
    } catch (err) {
      setError('Failed to fetch Sub Group 3 data. Please try again.'); // Set error message
    } finally {
      setLoading(false);
    }
  };

  // Fetch initial data
  useEffect(() => {
    handleSearch();
  }, []); // Runs on mount

  return {
    query,
    filter,
    results,
    loading,
    error, // Return error state
    handleQueryChange,
    handleFilterChange,
    handleSearch,
  };
};

export default useSearchSubGroup3;
