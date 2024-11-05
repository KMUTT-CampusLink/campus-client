import React from 'react'

export default function Chip({status, score}) {
  return (
    <p className={`${!status ? "bg-yellow-500" : score >= passMark ? "bg-green-500" : "bg-red-500"} text-white px-5 py-1 rounded-xl`}>{!status ? "processing" : score >= passMark ? "passed" : "failed"}</p>
  )
}
