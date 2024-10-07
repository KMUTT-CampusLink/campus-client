import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faTimes,
  faAngleDown,
  faRightFromBracket,
  faCircleUser,
} from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect, useRef } from "react";
import { navbarColors } from "../styles/colors";
import { Link } from "react-router-dom";

const NavBar = () => {
  const navigationLinks = [
    {
      name: "Payment",
      href: "/payment",
      sublinks: [],
      subhrefs: [],
    },
    {
      name: "Learning",
      href: "/library",
      sublinks: ["Library", "Online Courses", "Online Exams"],
      subhrefs: ["/library", "/courses", "/exams"],
    },
    {
      name: "Campus Services",
      href: "/clubs",
      sublinks: ["Clubs", "Transport", "Parking & Bikes", "Buildings & Safety"],
      subhrefs: ["/clubs", "/transport", "parking", "security"],
    },
    {
      name: "Help & Tools",
      href: "/attendance",
      sublinks: ["Attendance", "Help Bot", "Campus Map"],
      subhrefs: ["/attendance", "/botastra", "map"],
    },
    {
      name: "Registration",
      href: "/regis/course",
      sublinks: [],
      subhrefs: [],
    },
    {
      name: "Grade",
      href: "/regis/grade",
      sublinks: [],
      subhrefs: [],
    },
  ];
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const profileRef = useRef(null);
  const mobileNavRef = useRef(null); // Mobile nav reference

  // Close the navigation dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
      if (
        mobileNavRef.current &&
        !mobileNavRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const [isOpen, setIsOpen] = useState(false);
  const [openDropdowns, setOpenDropdowns] = useState(Array(5).fill(false));

  const toggleDropdown = (index) => {
    const newOpenDropdowns = [...openDropdowns];
    newOpenDropdowns[index] = !newOpenDropdowns[index];
    setOpenDropdowns(newOpenDropdowns);
  };

  return (
    <nav
      className={`w-full ${
        isOpen ? "absolute overflow-y-auto h-full z-[100]" : ""
      }`}
    >
      <div
        className={`hidden md:block md:px-8 text-white bg-gradient-to-r`}
        style={{
          backgroundImage: `linear-gradient(to right, ${navbarColors.gradientFrom}, ${navbarColors.gradientTo})`,
        }}
      >
        <div className="h-16 flex py-2 mx-auto max-w-7xl justify-between items-center">
          <Link to="/">
            <div className="text-lg font-bold">CampusLink</div>
          </Link>
          <div className="ml-6 flex-grow flex-wrap">
            {navigationLinks.map((link, index) => (
              <div className="group relative inline-block" key={index}>
                {link.sublinks.length == 0 ? (
                  <Link to={link.href} className="hover:text-orange-300 px-3">
                    {link.name}
                  </Link>
                ) : (
                  <span className="hover:text-orange-300 px-3">
                    {link.name}
                    {"  "}
                    <FontAwesomeIcon icon={faAngleDown} />
                  </span>
                )}
                {link.sublinks.length > 0 && (
                  <div className="absolute hidden group-hover:block shadow-md bg-white text-black text-sm mt-1 rounded-md">
                    {link.sublinks.map((sublink, subindex) => (
                      <Link
                        key={subindex}
                        to={link.subhrefs[subindex]}
                        className="block px-4 py-2 hover:bg-orange-300"
                      >
                        {sublink}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
          <div className="relative mr-2" ref={profileRef}>
            <button
              onClick={() => setIsProfileOpen((prev) => !prev)}
              className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
            >
              <img
                alt="Profile"
                src="https://www.kmutt.ac.th/wp-content/uploads/2020/09/KMUTT_CI_Primary_Logo-Full-2048x2048.png"
                className="h-10 w-10 rounded-full"
              />
            </button>
          </div>
        </div>
      </div>
      <div
        className={`md:hidden text-white py-2 px-4 flex flex-col justify-between bg-gradient-to-r  ${
          isOpen ? "w-3/4 h-full rounded-e-2xl" : ""
        }`}
        style={{
          backgroundImage: `linear-gradient(to right, ${navbarColors.gradientFrom}, ${navbarColors.gradientTo})`,
        }}
        ref={mobileNavRef}
      >
        <div className="flex justify-between items-center">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`inline-flex items-center justify-center rounded-md p-2 hover:bg-[${navbarColors.hover}] hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white`}
          >
            {isOpen ? (
              <FontAwesomeIcon icon={faTimes} className="h-6 w-6" />
            ) : (
              <FontAwesomeIcon icon={faBars} className="h-6 w-6" />
            )}
          </button>

          {!isOpen && (
            <div className="relative mr-2" ref={profileRef}>
              <button
                onClick={() => setIsProfileOpen((prev) => !prev)}
                className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
              >
                <img
                  alt="Profile"
                  src="https://www.kmutt.ac.th/wp-content/uploads/2020/09/KMUTT_CI_Primary_Logo-Full-2048x2048.png"
                  className="h-10 w-10 rounded-full"
                />
              </button>
            </div>
          )}
        </div>

        {isOpen && (
          <div className="w-4/5 h-full overflow-x-hidden flex flex-grow flex-col justify-between">
            <div className="mx-auto my-6">
              <FontAwesomeIcon
                icon={faCircleUser}
                className="text-black w-20 h-20 mr-4"
              />
            </div>
            <div className="mt-4 space-y-2">
              {navigationLinks.map((link, index) => (
                <>
                  <div key={index} className="block">
                    <div
                      onClick={() => toggleDropdown(index)}
                      className="hover:text-orange-300 cursor-pointer flex justify-between"
                    >
                      {link.sublinks.length == 0 ? (
                        <Link
                          to={link.href}
                          className="hover:text-orange-300 px-3"
                        >
                          {link.name}
                        </Link>
                      ) : (
                        <div className="hover:text-orange-300 px-3 flex justify-between items-center w-full">
                          <span className="text-left">{link.name}</span>
                          <FontAwesomeIcon
                            icon={faAngleDown}
                            className="text-right"
                          />
                        </div>
                      )}
                    </div>
                    {openDropdowns[index] && link.sublinks.length > 0 && (
                      <div className="text-white text-sm w-full mt-1 rounded-md pl-4">
                        {link.sublinks.map((sublink, subindex) => (
                          <Link
                            key={subindex}
                            to={link.subhrefs[subindex]}
                            className="block px-4 py-2 hover:bg-orange-600 hover:text-white"
                          >
                            {sublink}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                  {index < navigationLinks.length - 1 && (
                    <hr className="border-t-2 border-gray-300 w-full mx-3" />
                  )}
                </>
              ))}
            </div>
            <div className="flex-grow"></div>
            <hr className="border-t-2 border-gray-300 w-full mx-3" />
            <div className="mb-8">
              <Link
                to="/regis/login"
                className="block px-6 py-2 text-white hover:text-orange-300"
              >
                {" "}
                <FontAwesomeIcon icon={faRightFromBracket} /> Log out
              </Link>
            </div>
          </div>
        )}
      </div>
      {isProfileOpen && (
        <div className="absolute mt-4 mr-4 right-0 z-10 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 transition">
          <Link
            to="/"
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
          >
            My Profile
          </Link>
          <Link
            to="/"
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
          >
            Settings
          </Link>
          <Link
            to="/"
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
          >
            Log out
          </Link>
        </div>
      )}
    </nav>
  );
};

export default NavBar;
