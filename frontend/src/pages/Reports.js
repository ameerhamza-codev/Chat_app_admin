import React from 'react';
import useUserSearch from '../hooks/users/searchUserHook';
import SearchBar from '../components/Searchbar';


const Reports = () => {
    const {
        query,
        filter,
        results,
        loading,
        error,
        handleQueryChange,
        handleFilterChange,
        handleSearch,
    } = useUserSearch();

    const filters = [
        { value: 'name', label: 'Name' },
        { value: 'email', label: 'Email' },
        { value: 'mobile', label: 'Mobile' },
        { value: 'city', label: 'City' },
        { value: 'country', label: 'Country' },
        { value: 'maingroup', label: 'Main Group' },
        { value: 'subgroup1', label: 'Sub Group 1' },
        { value: 'subgroup2', label: 'Sub Group 2' },
        { value: 'subgroup3', label: 'Sub Group 3' },
        { value: 'subgroup4', label: 'Sub Group 4' },
        { value: 'subgroup5', label: 'Sub Group 5' }

    ];

    return (
        <div>
            <div className='my-2 mx-2 d-flex align-items-center justify-content-between'>
                <h3>Reports</h3>
        
            </div>
            <SearchBar
                placeholder="Search..."
                query={query}
                filter={filter}
                onQueryChange={handleQueryChange}
                onFilterChange={handleFilterChange}
                onSearch={handleSearch}
                filters={filters}
            />
            {loading && <p>Loading...</p>}
            {error && <p>{error}</p>}
            <div className="results">
                {results.map(user => (
                    <div key={user.id}>{user.name}</div>
                ))}
            </div>
        </div>
    );
};

export default Reports;
