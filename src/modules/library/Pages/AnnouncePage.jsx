// import React from "react";
// import { useLocation } from "react-router-dom";
// import NavBar from "../../registration/components/NavBarComponents/NavBar";
// import MainNavbar from "../components/MainNavbar";

// function EventPage() {
//   const locationA = useLocation();
//   const { title, description, updated, location, image, source, duration, date } = locationA.state;

//   const formattedDate = new Date(date).toLocaleDateString("en-US", {
//     weekday: "long",
//     year: "numeric",
//     month: "long",
//     day: "numeric",
//   });

//   const formattedDescription = description ? description.replace(/\n/g, '<br />') : '';

//   const sourceLinks = source ? source.split(/\s+/).map(link => link.trim()).filter(link => (link.startsWith('http://') || link.startsWith('https://')) && link.length > 0).map((link, index) => (
//     <li key={index} className="mt-2">
//       <a href={link} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
//         {link}
//       </a>
//     </li>
//   )) : [];

//   return (
//     <div className="min-h-screen">
//       <NavBar />
//       <main className="pt-20 pb-6 mx-auto -z-10">
//         <MainNavbar />
//         <div className="bg-neutral-100 p-6 min-w-[530px]">
//           <div className="p-6 md:p-8 max-w-4xl mx-auto bg-white shadow-2xl">
//             <h1 className="text-2xl md:text-4xl font-bold mb-6 text-center">
//               {title}
//             </h1>

//             <img
//               src={image}
//               alt={title}
//               className="w-full h-auto rounded-lg shadow-xl mb-4"
//             />

//             <div className="text-lg md:text-xl mb-4 flex flex-col justify-center md:items-start items-center">
//               <h1 className="text-2xl underline underline-offset-[0.7rem] decoration-orange-500 mt-6">
//                 Location
//               </h1>
//               <p className="text-sm md:text-base lg:text-lg mt-4 leading-relaxed text-center md:text-left">
//                 {location}
//               </p>
//               <h1 className="text-2xl underline underline-offset-[0.7rem] decoration-orange-500 mt-6">
//                 Date
//               </h1>
//               <p className="text-sm md:text-base lg:text-lg mt-4 leading-relaxed text-center md:text-left">
//                 {formattedDate}
//               </p>
//               <p className="text-sm md:text-base lg:text-lg mt-4 leading-relaxed text-center md:text-left">
//                 From {duration}
//               </p>
//               <h1 className="text-2xl underline underline-offset-[0.7rem] decoration-orange-500 mt-6">
//                 Description
//               </h1>
//               <div className="text-sm md:text-base lg:text-lg mt-4 leading-relaxed text-center md:text-left">
//                 {formattedDescription ? (
//                   <span dangerouslySetInnerHTML={{ __html: formattedDescription }} />
//                 ) : (
//                   <p>No description available.</p>
//                 )}
//               </div>

//               {sourceLinks.length > 0 && (
//                 <>
//                   <h1 className="text-2xl underline underline-offset-[0.7rem] decoration-orange-500 mt-6">
//                     Link Here!
//                   </h1>
//                   <ul className="list-disc pl-5">
//                     {sourceLinks}
//                   </ul>
//                 </>
//               )}
//             </div>
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// }

// export default EventPage;


import React from "react";
import { useLocation } from "react-router-dom";
import NavBar from "../../registration/components/NavBarComponents/NavBar";
import MainNavbar from "../components/MainNavbar";

function EventPage() {
  const locationA = useLocation();
  const { title, description, updated, location, image, source, duration, date } = locationA.state;

  const formattedDate = new Date(date).toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const formattedDescription = description ? description.replace(/\n/g, '<br />') : '';

  const sourceLinks = source ? source.split(/\s+/).map(link => link.trim()).filter(link => (link.startsWith('http://') || link.startsWith('https://')) && link.length > 0).map((link, index) => (
    <li key={index} className="mt-2">
      <a href={link} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
        {link}
      </a>
    </li>
  )) : [];

  return (
    <div className="min-h-screen">
      <NavBar />
      <main className="pt-20 pb-6 mx-auto -z-10">
        <MainNavbar />
        <div className="bg-neutral-100 p-6 min-w-[530px]">
          <div className="p-6 md:p-8 max-w-4xl mx-auto bg-white shadow-2xl">
            <h1 className="text-2xl md:text-4xl font-bold mb-6 text-center">
              {title}
            </h1>

            <img
              src={image}
              alt={title}
              className="w-full h-auto rounded-lg shadow-xl mb-4"
            />

            <div className="text-lg md:text-xl mb-4 flex flex-col justify-center md:items-start items-center">
              <h1 className="text-2xl underline underline-offset-[0.7rem] decoration-orange-500 mt-6">
                Location
              </h1>
              <p className="text-sm md:text-base lg:text-lg mt-4 leading-relaxed text-center md:text-left">
                {location}
              </p>
              <h1 className="text-2xl underline underline-offset-[0.7rem] decoration-orange-500 mt-6">
                Date
              </h1>
              <p className="text-sm md:text-base lg:text-lg mt-4 leading-relaxed text-center md:text-left">
                {formattedDate}
              </p>
              {duration && (
                <p className="text-sm md:text-base lg:text-lg mt-4 leading-relaxed text-center md:text-left">
                  From {duration}
                </p>
              )}
              <h1 className="text-2xl underline underline-offset-[0.7rem] decoration-orange-500 mt-6">
                Description
              </h1>
              <div className="text-sm md:text-base lg:text-lg mt-4 leading-relaxed text-center md:text-left">
                {formattedDescription ? (
                  <span dangerouslySetInnerHTML={{ __html: formattedDescription }} />
                ) : (
                  <p>No description available.</p>
                )}
              </div>

              {sourceLinks.length > 0 && (
                <>
                  <h1 className="text-2xl underline underline-offset-[0.7rem] decoration-orange-500 mt-6">
                    Link Here!
                  </h1>
                  <ul className="list-disc pl-5">
                    {sourceLinks}
                  </ul>
                </>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default EventPage;
