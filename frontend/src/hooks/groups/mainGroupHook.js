import { useState } from 'react';
import { getMainGroups } from '../../api/groupsApi';

const useMainGroupList = () => {
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
        setLoading(true);
        setError(null);
        try {
            const data = await getMainGroups(query, filter);
            setResults(data);
        } catch (err) {
            setError('Error searching users');
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

export default useMainGroupList;
