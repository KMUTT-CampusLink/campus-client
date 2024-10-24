import Searchresult from "./Searchresult"

function Searchresultlist({results}) {
  return (

<div className="flex flex-col items-center justify-center bg-slate-200 bg-opacity-0 z-50 rounded-lg">
  <hr />
   {results.map((results, id) =>{
        return <Searchresult result={results} key={id}/>
})}
  </div>
  )
}

export default Searchresultlist