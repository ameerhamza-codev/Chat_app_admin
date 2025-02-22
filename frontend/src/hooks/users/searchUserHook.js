import { useState } from 'react';
import { searchUsers } from '../../api/userApi';

const useUserSearch = () => {
    const [query, setQuery] = useState('');
    const [filter, setFilter] = useState('name');
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleQueryChange = (e) => {
        setQuery(e.target.value);
    };

    const handleFilterChange = (e) => {
        setFilter(e.target.value);
    };

    const handleSearch = async () => {
        if (!query.trim()) {
            console.log('Empty query, skipping search');
            setResults([]);
            return;
        }

        setLoading(true);
        setError(null);
        try {
            console.log('Performing search with query:', query, 'and filter:', filter);
            const data = await searchUsers(query, filter);
            console.log('Search results:', data);
            setResults(data);
        } catch (err) {
            setError('Error searching users.');
            console.error('Error in handleSearch:', err.message);
        } finally {
            setLoading(false);
        }
    };

    return {
        query,
        filter,
        results,
        loading,
        error,
        handleQueryChange,
        handleFilterChange,
        handleSearch,
    };
};

export default useUserSearch;
