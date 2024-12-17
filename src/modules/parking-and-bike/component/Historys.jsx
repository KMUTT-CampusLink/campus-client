import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClockRotateLeft } from '@fortawesome/free-solid-svg-icons';
import { useState, useEffect } from 'react';

function History({ transId, price, status, date, time }) {
    console.log(transId, price, status, date, time)
    const [amount, setAmount] = useState('');

    useEffect(() => {
        if (price === null) {
            setAmount('In progress');
        } else {
            setAmount(price);
        }
    }, [price]);

    return (
        <>
            <div className="flex flex-row gap-3 w-72 sm:w-4/5 shadow-md p-4 rounded-xl justify-between">
                <div className='flex flex-row w-full gap-3 items-center'>
                    <div className='bg-red-400 px-3 py-3 rounded-xl flex items-center justify-center'>
                        <div className='bg-red-300 px-1 py-px rounded-lg'>
                            <FontAwesomeIcon className="w-4 h-4 text-white" icon={faClockRotateLeft} />
                        </div>
                    </div>

                    <div className='flex flex-col text-xs justify-center items-start'>
                        <h1 className='text-gray-500'>Transaction ID</h1>
                        <p>{transId}</p>
                    </div>
                </div>
                <div className='flex w-full flex-col items-end text-xs gap-1'>
                    <h1 className={`font-bold text-sm ${price === null ? 'text-gray-400' : ''}`}>{amount}</h1>
                    <p className={`px-4 rounded-md font-semibold ${status === 'Completed' ? 'bg-green-200 text-green-500' : 'bg-yellow-200 text-yellow-500'} `}>{status}</p>
                    <p className='text-gray-400'>{date} {time}</p>
                </div>
            </div>
        </>
    )
}

export default History;