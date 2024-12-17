import NavBar from "../../registration/components/NavBarComponents/NavBar";
import Historys from "../component/Historys.jsx"
import { getHistoryData } from "../services/api.js";
import { useState, useEffect } from "react";

function History() {
    const [history, setHistory] = useState([]);
    const [status, setStatus] = useState(true);

    const getHistory = async () => {
        try {
            const res = await getHistoryData();
            if (res === 'No history available for this user.') {
                setStatus(false)
            } else {
                setHistory(res.history);
                setStatus(true)
            }
        } catch (error) {
            console.error('Error getting history:', error);
        } 
    }

    useEffect(() => {
        getHistory();
    }, []);

    return (
        <>
            <NavBar />
            <div className="flex w-full h-full flex-col justify-center items-center pt-40 py-20">
                <div className="flex flex-col w-72 sm:w-4/5 gap-4">
                    <h1 className="text-xl font-bold">Parking History</h1>
                    {history && history.map((key) => (
                        <Historys
                            key={key.reservation_id}
                            transId={key.reservation_id}
                            price={key.amount}
                            status={key.status}
                            date={key.reserve_date}
                            time={key.reserve_time}
                        />
                    ))}
                    <h1 className={`${status === true ? 'invisible' : 'visible'}`}>No Information found.</h1>
                </div>

            </div>
        </>
    )
}

export default History;