import Search from "./Search"
import SearchResult from "./SearchResult"

function SearchResultList({ results }) {
  return (

    <div className="flex flex-col items-center justify-center bg-slate-200 bg-opacity-0 z-10 rounded-lg">
      <hr />
      {results.map((results, id) => {
        return <SearchResult result={results} key={id} />
      })}
    </div>
  )
}

export default SearchResultList;