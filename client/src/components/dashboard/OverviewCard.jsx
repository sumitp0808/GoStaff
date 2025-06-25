import React from 'react'

const OverviewCard = ({thumbnail, text, number, bgcolor}) => {
  return (
    <div className="rounded flex bg-white">
        <div className={`${bgcolor} text-3xl flex justify-center items-center text-white px-4`}>
            {thumbnail}
        </div>
        <div className="pl-4 py-1">
            <p className="text-lg font-semibold ">{text}</p>
            <p className="text-xl font-bold">{number}</p>
        </div>
    </div>
  )
}

export default OverviewCard