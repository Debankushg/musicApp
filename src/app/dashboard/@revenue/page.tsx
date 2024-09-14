import Metrics from '@/components/Metrics'
import React from 'react'

const Revenue = () => {
  return (
    <div className="m-2 bg-green-900 p-4  border text-white rounded-md border-gray-300" >
          <Metrics label="Revenue " amount={12565.89} />
    </div>
  )
}

export default Revenue
