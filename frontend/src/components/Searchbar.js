import React from 'react';
import { colors } from '../utils/colors';


const SearchBar = ({ placeholder, query, filter, onQueryChange, onFilterChange, onSearch, filters }) => {
    return (
        <div className="search-bar-container mt-2" style={{ display: 'flex', width: '100%' }}>
            <select
                className="filter-dropdown mx-2"
                onChange={onFilterChange}
                value={filter}
                style={{ marginRight: '10px' }}
            >
                {filters.map(filter => (
                    <option key={filter.value} value={filter.value}>
                        {filter.label}
                    </option>
                ))}
            </select>
            <input
                type="text"
                placeholder={placeholder}
                value={query}
                onChange={onQueryChange}
                style={{ flex: 1 }}
            />
            <button style={{backgroundColor:colors.secondary}} type="button" class="btn btn-primary mx-2" onClick={onSearch}>Search</button>
        </div>
    );
};

export default SearchBar;
