import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleDown,
  faRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import { NavLink, Link } from "react-router-dom";

const MobileNav = ({ navigationLinks }) => {
  const [openDropdowns, setOpenDropdowns] = useState({});

  const toggleDropdown = (index) => {
    setOpenDropdowns((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  return (
    <>
      <div className="flex flex-col justify-between flex-grow w-4/5 h-full overflow-x-hidden">
        <div className="mx-auto my-6">
          <img
            className="w-[6rem] h-[6rem]"
            src="/logos/mb-nav-logo.png"
            alt="mb-nav-logo"
          />
        </div>
        <div className="mt-4 space-y-2">
          {navigationLinks.map((link, index) => (
            <div key={index}>
              <div className="block">
                <div
                  onClick={() => toggleDropdown(index)}
                  className="flex justify-between mt-1 mb-1 cursor-pointer hover:text-amber-400"
                >
                  {link.sublinks.length == 0 ? (
                    <NavLink
                      to={link.href}
                      className={({ isActive }) =>
                        isActive ? "text-amber-400 px-3" : "px-3"
                      }
                    >
                      {link.name}
                    </NavLink>
                  ) : (
                    <div className="flex items-center justify-between w-full px-3 hover:text-amber-400">
                      <span className="text-left">{link.name}</span>
                      <FontAwesomeIcon
                        icon={faAngleDown}
                        className="text-right"
                      />
                    </div>
                  )}
                </div>
                {openDropdowns[index] && link.sublinks.length > 0 && (
                  <div className="w-full pl-4 mt-1 text-sm text-white rounded-md">
                    {link.sublinks.map((sublink, subindex) => (
                      <NavLink
                        key={subindex}
                        to={link.subhrefs[subindex]}
                        className={({ isActive }) =>
                          isActive
                            ? "block px-4 py-2 bg-orange-600 text-white mt-1 mb-1"
                            : "block px-4 py-2 hover:bg-orange-600 hover:text-white transition-colors"
                        }
                      >
                        {sublink}
                      </NavLink>
                    ))}
                  </div>
                )}
              </div>
              {index < navigationLinks.length - 1 && (
                <hr className="w-full mx-3 border-t-2 border-gray-300" />
              )}
            </div>
          ))}
        </div>
        <div className="flex-grow"></div>
        <hr className="w-full mx-3 border-t-2 border-gray-300" />
        <div className="mb-8">
          <Link
            to="/regis/login"
            className="block px-6 py-2 text-white hover:text-amber-400"
          >
            {" "}
            <FontAwesomeIcon icon={faRightFromBracket} /> Log out
          </Link>
        </div>
      </div>
    </>
  );
};

export default MobileNav;
