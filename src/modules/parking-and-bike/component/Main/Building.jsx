import Reserbut from "./Reserbut";
function Building({ bdimage, bdname, avaslot }) {
    return (
        <>
            <div className="flex items-center min-w-96 max-h-48 bg-white rounded-lg shadow-gray shadow-xl p-0 my-10 ">
                <img src={bdimage} className="max-w-48 max-h-48 mr-3 rounded-lg" />

                <div className="flex flex-row w-full justify-between rounded-lg">
                    <div className="flex flex-col justify-evenly">
                        <h2 className="text-lg font-bold">{bdname}</h2>

                        <p className="text-green-600 font-semibold">Available Slot: {avaslot}</p>


                    </div> <Reserbut/>
                </div>




            </div>




        </>

    );
};


export default Building;
