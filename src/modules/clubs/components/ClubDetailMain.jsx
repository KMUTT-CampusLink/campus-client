import React from 'react'
import ClubDetailCard from './ClubDetailCard'
import ClubDetailInfo from './ClubDetailInfo'

const ClubDetailMain = () => {
  return (
    <div className="m-12 md:m-16 lg:m-20">
        <ClubDetailCard/>
        <ClubDetailInfo/>
    </div>
  )
}
export default ClubDetailMain;
