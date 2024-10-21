

const DeletePopUp = ({ onClose, a }) => {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40">
        <div className="bg-white rounded-lg shadow-lg p-6 w-96">
          <h2 className="text-center text-xl font-bold mb-4">
            ARE YOU SURE TO DELETE THE PROFILE?
          </h2>
          <div className="border-t border-gray-300 mt-4"></div>
          <div className="flex">
            <button
              onClick={onClose}
              className="w-1/2 text-center py-2 text-black font-semibold"
            >
              CANCEL
            </button>
            <button
              onClick= {a}
              className="w-1/2 tet-center py-2 text-white bg-[#EC5A51] font-semibold"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    );
  };

export default DeletePopUp