import { useState, useEffect } from "react";
import axios from "axios";

const ContactList = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/map/contacts`
        );
        setData(response.data);
        console.log(response.data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="my-10 overflow-scroll py-10">
      <h1 className="text-4xl px-4 py-8 mb-8 font-extrabold border-b-4 border-solid">
        Contact Numbers
      </h1>

      <div className="h-max w-full space-y-8 px-4">
        {Object.entries(data).map(([campusName, buildings]) => (
          <div key={campusName} className="">
            <h2 className=" font-semibold text-2xl py-2">{campusName}</h2>
            <ul className="">
                <div className=" bg-[#EEE7E6] flex border-[1px] my-2 py-6 px-8 shadow-md ">
                    <span className="w-[40%] ml-4">Name</span> 
                    <span className="w-[30%] text-center">Phone</span>
                    <span className="w-[30%] text-center">Fax</span>
                </div>
              {buildings.map((building) => (
                <div key={building.id} className="flex border-[1px] my-2 py-6 px-8 shadow-md">
                  <span className="w-[40%] flex-grow">{building.name}</span>
                  <span className="w-[30%] text-center">{building.phone}</span>
                  <span className="w-[30%] text-center">{building.fax}</span> 
                </div>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ContactList;
