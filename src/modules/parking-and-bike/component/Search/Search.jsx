import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import axios from 'axios';

function Search({ setResults }) {
  const [input, setInput] = useState("");

  const fetchData = (value) => {
    axios.get("https://jsonplaceholder.typicode.com/users")
    .then((response) => {
        const results = response.data.filter((user) => {
          return (
            value &&
            user &&
            user.name &&
            user.name.toLowerCase().includes(value.toLowerCase())
          );
        });
        setResults(results);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  const handleChange = (value) => {
    setInput(value);
    fetchData(value);
  };

  return (
    <>
      <div className="flex items-center min-w-96 min-h-70 shadow-gray shadow-xl bg-white rounded-lg p-2">
        <input
          type="text"
          placeholder="Search..."
          className="bg-transparent focus:outline-none flex-grow px-4"
          value={input}
          onChange={(e) => handleChange(e.target.value)}
        />
        <button className="bg-white-500 text-black p-2 rounded-full">
          <FontAwesomeIcon icon={faMagnifyingGlass} />
        </button>
      </div>
    </>
  );
}

export default Search;
