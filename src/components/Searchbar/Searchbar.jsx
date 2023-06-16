import cl from './Searchbar.module.css';
import { useState } from 'react';

export function Searchbar({searchQuery, onSubmit}) {
  const [query, setQuery] = useState("");

  const handleSearchChange = event => {    
    setQuery(event.currentTarget.value);
  };

  const handleSubmit = event => {
    event.preventDefault();    
    onSubmit(query);    
  };

  return (
      <header className={cl.searchbar}>
        <form className={cl.form} onSubmit={handleSubmit}>
          <button type="submit" className={cl.searchForm_button} >
            Search
          </button>

          <input
            className={cl.searchForm_input}
            type="text"
            name="search"            
            placeholder="Search images and photos"
            value={query}
            onChange={handleSearchChange}
          />
        </form>
      </header>
  );
};