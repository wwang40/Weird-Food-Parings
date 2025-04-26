function SearchSort({ searchTerm, setSearchTerm, sortBy, setSortBy }) {
    return (
      <div className="search-sort flex justify-between mb-20">
        <div style={{ width: '60%' }}>
          <input
            type="text"
            placeholder="Search by title..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ marginBottom: 0 }}
          />
        </div>
        <div>
          <label htmlFor="sort-by" style={{ marginRight: '10px' }}>Sort by:</label>
          <select
            id="sort-by"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            style={{ padding: '8px', borderRadius: '4px' }}
          >
            <option value="newest">Newest</option>
            <option value="oldest">Oldest</option>
            <option value="upvotes">Most Upvotes</option>
          </select>
        </div>
      </div>
    );
  }
  
  export default SearchSort;