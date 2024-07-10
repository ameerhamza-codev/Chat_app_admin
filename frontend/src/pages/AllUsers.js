import React from 'react';
import useUserSearch from '../hooks/users/searchUserHook';
import SearchBar from '../components/Searchbar';
import { colors } from '../utils/colors';


const AllUsers = () => {
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
        { value: 'country', label: 'Country' }

    ];

    return (
        <div>
            <div className='my-2 mx-2 d-flex align-items-center justify-content-between'>
                <h3>All Users</h3>
                <div>
                    <button className='btn btn-primary mx-2' style={{backgroundColor:colors.secondary}}>Export</button>
                    <button  className='btn btn-primary' style={{backgroundColor:colors.secondary}}>Add User</button>
                </div>
            </div>
            <SearchBar
                placeholder="Search users..."
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

export default AllUsers;
