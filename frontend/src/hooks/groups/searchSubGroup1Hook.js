import { useState } from 'react';
import { searchSubGroup1 } from '../../api/groupsApi';

const useSearchSubGroup1 = () => {
    const [query, setQuery] = useState('');
    const [filter, setFilter] = useState('');
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleSearch = async () => {
        setLoading(true);
        setError(null);
    
        // Check if the query is empty
        if (!query.trim()) {
            setResults([]); // Clear results
            setLoading(false); // Stop loading
            return;
        }
    
        try {
            // Perform search if query is not empty
            const response = await searchSubGroup1(query, filter || 'main_group_code');
            setResults(response);
        } catch (error) {
            setError('Failed to fetch Sub Group 1');
        } finally {
            setLoading(false);
        }
    };
    

    const handleFilterChange = (e) => {
        setFilter(e.target.value);
        setQuery(''); // Reset query when filter changes
        setResults([]); // Clear results
    };

    return {
        query,
        filter,
        results,
        loading,
        error,
        handleQueryChange: (e) => setQuery(e.target.value),
        handleFilterChange,
        handleSearch,
        setResults,
    };
};

export default useSearchSubGroup1;
