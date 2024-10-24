import qr from "../../img/ponkrit_st_qr (1).png"
function Qr() {
    return (
        <>
            <div className="border-4 border-yellow-500 p-0 rounded-md">
                <img className="w-24 h-24" src={qr} alt="" />
            </div>
        </>
    )
}

export default Qr