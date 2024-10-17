

function ParkingForm() {

  return (
    <>
    <div className="flex flex-col gap-6 ">
      <select className="py-3 px-4 rounded-lg drop-shadow-2xl shadow-black p-2">
          <option value="">FLOOR</option>
          <option value="">1st Floor (24/30)</option>
          <option value="">2nd Floor (24/30)</option>
          <option value="">3rd Floor (30/30)</option>
          <option value="">4th Floor (15/15)</option>
        </select>
        <select className="py-3 px-4 rounded-lg drop-shadow-2xl shadow-black p-2">
        <option value="">POSITION</option>
          <option value="">A01</option>
          <option value=""> A02</option>
          <option value=""> A03</option>
          <option value=""> B01</option>
        </select>

      </div>
    </>
  )
}

export default ParkingForm;
