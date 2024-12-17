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
    <div className=" lg:my-10 m-2 max-h-full overflow-auto relative text-xs md:text-sm lg:text-base">
      {/* Header Row */}
      <div className="sticky top-0 grid grid-cols-[20%_20%_40%_20%] bg-[#F2F2F2] text-center py-3 md:py-2 lg:py-4 text-[#864E41] rounded-md shadow-lg z-10">
        <div>Name</div>
        <div>Floor</div>
        <div>Details</div>
        <div>Status</div>
      </div>

      {/* Scrollable Content */}
      <div className="h-max overflow-hidden pt-4">
        {items.length > 0 ? (
          items.map((item, index) => (
            <div
              key={index}
              className="grid grid-cols-[20%_20%_40%_20%] bg-[#FFF] text-center py-3 md:py-2 lg:py-4 text-[#333] rounded-md shadow-lg mb-3 border-2 px-2"
            >
              <div>{item.itemname}</div>
              <div>{item.floor}</div>
              <div>{item.detail}</div>
              <div
                className={`
                  ${
                    item.status.toLowerCase().includes("lost")
                      ? "text-red-400"
                      : item.status.toLowerCase().includes("searching")
                      ? "text-yellow-400"
                      : item.status.toLowerCase().includes("recieved")
                      ? "text-blue-400"
                      : "text-green-400"
                  }
                `}
              >
                {item.status}
              </div>
            </div>
          ))
        ) : (
          <div className="text-gray-500 text-center py-24">
            <span className="text-xl italic">No Lost and Found History</span>
          </div>
        )}
      </div>
    </div>
  );
}

export default ModalLostAndFound;
