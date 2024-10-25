import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function Participant() {
  const navigate = useNavigate()
  return (
    <>
      <button className='w-[100%] text-[14px] flex rounded-lg px-[20px] py-[15px] gap-[10px] bg-gray-200 drop-shadow-sm hover:bg-gray-300 text-left' onClick={() => { navigate(`/exams/professor/scoring/1`) }}>
        <p className='w-[30%] '>66130500843</p>
        <p className='w-[35%]'>Nudhana Sarutipaisan</p>
        <p className='w-[10%]'>90</p>
        <p className='w-[10%]'>100</p>
        <p className='w-[15%]'>passed</p>
      </button>
    </>
  )
}
