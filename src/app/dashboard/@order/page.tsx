import Metrics from '@/components/Metrics'
import React from 'react'

const Orders = () => {
    return (
        <div className="m-2 bg-yellow-500 p-4  border text-white rounded-md border-gray-300" >
            <Metrics label="Orders " amount={12565.89} />
        </div>
    )
}

export default Orders
