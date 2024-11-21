function ModalLostAndFound({ subData }) {
  const items = subData.lostAndFoundList.flatMap((floorData) =>
    Object.entries(floorData).flatMap(([floor, items]) =>
      items.map((item) => ({
        floor,
        ...item,
      }))
    )
  );

  return (
    <div className="my-10">
      {/* Header Row */}
      <div className="grid grid-cols-[20%_20%_40%_20%] bg-[#F2F2F2] text-center py-4 text-[#864E41] rounded-md shadow-lg mb-3">
        <div>Name</div>
        <div>Floor</div>
        <div>Details</div>
        <div>Status</div>
      </div>

      {items.length > 0 ? (
        items.map((item, index) => (
          <div
            key={index}
            className="grid grid-cols-[20%_20%_40%_20%] bg-[#FFF] text-center py-4 text-[#333] rounded-md shadow-lg mb-3"
          >
            <div>{item.itemname}</div>
            <div>{item.floor}</div>
            <div>{item.detail}</div>
            <div
              className={`
               ${
                 item.status.toLowerCase().includes("lost")  ? (
                   "text-red-400"
                 ) : item.status.toLowerCase().includes("searching") ? (
                   "text-yellow-400"
                 ) : item.status.toLowerCase().includes("recieved")  ? (
                  "text-blue-400"
                ) : (
                   "text-green-400v"
                 )
               }
    `}
            >
              {item.status}
            </div>
          </div>
        ))
      ) : (
        <div className=" text-gray-500 text-center py-28">
          <span className="text-xl italic">No Lost and Found History</span>
        </div>
      )}
    </div>
  );
}

export default ModalLostAndFound;
