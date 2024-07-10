import React from 'react';
import useSearchSeubGroup1 from '../hooks/groups/searchSubGroup1Hook';
import SearchBar from '../components/Searchbar';
import { colors } from '../utils/colors';


const SubGroup2 = () => {
    const {
        query,
        filter,
        results,
        loading,
        error,
        handleQueryChange,
        handleFilterChange,
        handleSearch,
    } = useSearchSeubGroup1();

    const filters = [
        { value: 'code', label: 'Main Group Code' },

    ];

    return (
        <div>
            <div className='my-2 mx-2 d-flex align-items-center justify-content-between'>
                <h3>Sub Group 2</h3>
                <div>
                    <button  className='btn btn-primary' style={{backgroundColor:colors.secondary}}>Add Sub Group 2</button>
                    <button  className='btn btn-primary mx-2' style={{backgroundColor:colors.secondary}}>Import</button>

                    <button className='btn btn-primary' style={{backgroundColor:colors.secondary}}>Export</button>
                </div>
            </div>
            <SearchBar
                placeholder="Search Sub Group 2..."
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

export default SubGroup2;
