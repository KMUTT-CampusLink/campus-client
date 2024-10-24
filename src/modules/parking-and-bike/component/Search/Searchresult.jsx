
function Searchresult({ result }) {
  return (
    <div className="bg-white hover:bg-gray-200 py-2 flex items-center justify-center z-50  px-28 w-full" onClick={(e) =>alert(`Clicked on ${result}`)}>{result.name}</div>
  )
}

export default Searchresult