import { Link } from "react-router-dom";

function AdminMainPage() {
  // Placeholder for the user profile image
  const user = {
    profileImage:
      "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp", // Sample image URL
  };

  return (
    <>
        <main className="mx-auto max-w-full sm:pt-[65px] pt-14 pb-6">
          <div className="bg-white min-h-screen rounded-lg sm:p-5">
            {/* User Profile */}
            <div className="flex items-center justify-center p-8">
              <div className="avatar">
                <div className="ring-primary ring-offset-base-100 w-32 rounded-full ring ring-offset-2">
                  <img src={user.profileImage} alt="User profile" />
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col items-center sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-8 p-8">
              {/* First Card */}
              <Link
                to="/clubs/"
                className="card bg-white border-solid border-2 border-black text-primary-content w-80 h-48 drop-shadow-lg"
              >
                <div className="card-body flex flex-col items-center justify-center h-full">
                  <svg
                    className="sm:h-20 sm:w-20 h-16 w-16"
                    data-slot="icon"
                    fill="black"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                  >
                    <path
                      clipRule="evenodd"
                      fillRule="evenodd"
                      d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z"
                    ></path>
                  </svg>
                  <p className="p-4 whitespace-nowrap text-black font-semibold">
                    To club detail admin page
                  </p>
                </div>
              </Link>

              {/* Second Card */}
              <Link
                to="/clubs/admin/club-create"
                className="card bg-white border-solid border-2 border-black text-primary-content w-80 h-48 drop-shadow-lg"
              >
                <div className="card-body flex flex-col items-center justify-center h-full">
                  <svg
                    className="sm:h-20 sm:w-20 h-16 w-16"
                    data-slot="icon"
                    fill="black"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                  >
                    <path
                      clipRule="evenodd"
                      fillRule="evenodd"
                      d="M12 3.75a.75.75 0 0 1 .75.75v6.75h6.75a.75.75 0 0 1 0 1.5h-6.75v6.75a.75.75 0 0 1-1.5 0v-6.75H4.5a.75.75 0 0 1 0-1.5h6.75V4.5a.75.75 0 0 1 .75-.75Z"
                    ></path>
                  </svg>
                  <p className="p-4 whitespace-nowrap text-black font-semibold">To Create New Club</p>
                </div>
              </Link>
            </div>
          </div>
        </main>
    </>
  );
}

export default AdminMainPage;
