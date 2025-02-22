import { useState } from "react";
import { searchSubGroup2 } from "../../api/groupsApi";

const useSearchSubGroup2 = () => {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("mainGroupCode");
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

    if(!query.trim()){
      setResults([]);
      setLoading(false);
      return;
    }
    try {
      const data = await searchSubGroup2(query, filter);
      setResults(data);
    } catch (err) {
      setError("Error fetching Sub Group 2 data.");
      console.error("Search failed:", err);
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
    setResults,
  };
};

export default useSearchSubGroup2;
