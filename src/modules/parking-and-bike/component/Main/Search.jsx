import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';


function Search() {
    return (
        <>
            <div className="flex items-center min-w-96 min-h-70 shadow-gray shadow-xl bg-white rounded-lg p-2 ">
      <input
        type="text"
        placeholder="Search..."
        className="bg-transparent focus:outline-none flex-grow px-4"
      />
      <button className="bg-white-500 text-black p-2 rounded-full">
      <FontAwesomeIcon icon={faMagnifyingGlass} />            </button>
    </div>
        </>
    )
}

export default Search;