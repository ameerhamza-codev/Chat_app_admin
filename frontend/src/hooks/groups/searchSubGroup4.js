import { useState } from 'react';
import { searchSubGroup4 } from '../../api/groupsApi';

const useSearchSubGroup4 = () => {
    const [query, setQuery] = useState('');
    const [filter, setFilter] = useState('name');
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleQueryChange = (e) => setQuery(e.target.value);

    const handleFilterChange = (e) => {
        setFilter(e.target.value);
        setResults([]); // Clear the table when the filter changes
    };

    const handleSearch = async () => {
        setLoading(true);
        setError(null);
    
        try {
            if (!query.trim()) {
                // If the query is empty, clear results and return
                setResults([]);
                setLoading(false);
                return;
            }
    
            const data = await searchSubGroup4(query, filter);
            setResults(data);
        } catch (err) {
            setError('Error searching Sub Group 4');
        } finally {
            setLoading(false);
        }
    };
    

    return {
        query,
        filter,
        results,
        setResults, // Ensure setResults is exposed here
        loading,
        error,
        handleQueryChange,
        handleFilterChange,
        handleSearch,
    };
};

export default useSearchSubGroup4;
