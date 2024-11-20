import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import NavigationLink from "./NavigationLink";
import MobileNav from "./MobileNav";
import ProfileButton from "./ProfileButton";

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
      sublinks: ["Library", "Online Courses"],
      subhrefs: ["/library", "/courses"],
    },
    {
      name: "Campus Services",
      href: "/clubs",
      sublinks: ["Clubs", "Transport", "Parking & Bikes", "Buildings & Safety"],
      subhrefs: ["/clubs", "/transport", "/parking", "/security"],
    },
    {
      name: "Help & Tools",
      href: "/attendance",
      sublinks: ["Help Bot", "Campus Map"],
      subhrefs: ["/botastra", "/map"],
    },
    {
      name: "Registration",
      href: "/regis",
      sublinks: [],
      subhrefs: [],
    },
    {
      name: "Grade",
      href: "/regis/grade",
      sublinks: [],
      subhrefs: [],
    },
    {
      name: "Employ",
      href: "/employ",
      sublinks: [],
      subhrefs: [],
    },
  ];

  const role = localStorage.getItem("userRole");

  // Define removal logic for each role
  const roleBasedFilter = (link, role) => {
    switch (role) {
      case "Student":
        return link.name !== "Employ";
      case "Professor":
        return (
          link.name !== "Registration" &&
          link.name !== "Grade" &&
          link.name !== "Employ"
        );
      case "Management":
        return link.name !== "Registration" && link.name !== "Grade";
      case "Staff":
        return (
          link.name === "Help & Tools" ||
          link.name === "Payment" ||
          link.name === "Campus Services"
        );
      case "Driver":
        return (
          link.name === "Help & Tools" ||
          link.name === "Payment" ||
          link.name === "Campus Services"
        );
      default:
        return false;
    }
  };

  // Apply the filter
  const filteredNavigationLinks = navigationLinks.filter((link) =>
    roleBasedFilter(link, role)
  );

  const mobileNavRef = useRef(null); // mobile nav reference
  const [isOpen, setIsOpen] = useState(false);
  const [isNavVisible, setIsNavVisible] = useState(true);
  const [prevScrollPos, setPrevScrollPos] = useState(window.scrollY);

  // Close dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
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

  // Close navbar when scrolled
  useEffect(() => {
    const handleScroll = () => {
      if (!isOpen) {
        const currentScrollPos = window.scrollY;
        if (prevScrollPos > currentScrollPos || currentScrollPos < 50) {
          setIsNavVisible(true);
        } else {
          setIsNavVisible(false);
        }
        setPrevScrollPos(currentScrollPos);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [prevScrollPos, isOpen]);

  return (
    <nav
      className={`w-full fixed font-georama z-[100] transition-transform duration-300 ${
        isNavVisible ? "transform translate-y-0" : "transform -translate-y-full"
      } ${isOpen && " overflow-y-auto h-full"}`}
    >
      {/* Desktop Nav Bar */}
      <div
        className={`hidden min-[990px]:block text-white bg-gradient-to-r from-[#c2544d] to-[#f09107] `}
      >
        <div className="flex items-center justify-between h-16 px-8 py-2 mx-auto max-w-7xl">
          <Link to="/">
            <div className="text-xl font-bold">CampusLink</div>
          </Link>
          <div className="flex-wrap flex-grow ml-6">
            {filteredNavigationLinks.map((link, index) => (
              <NavigationLink key={index} link={link} index={index} />
            ))}
          </div>
          <ProfileButton />
        </div>
      </div>

      {/* Mobile Nav Bar */}
      <div
        className={`min-[990px]:hidden text-white py-2 px-4 flex flex-col justify-between bg-gradient-to-r from-[#c2544d] to-[#f09107]  ${
          isOpen && "w-3/4 h-full rounded-e-2xl"
        }`}
        ref={mobileNavRef}
      >
        <div className="flex items-center justify-between">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`inline-flex items-center justify-center rounded-md p-2 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white`}
          >
            {isOpen ? (
              <FontAwesomeIcon icon={faTimes} className="w-6 h-6" />
            ) : (
              <FontAwesomeIcon icon={faBars} className="w-6 h-6" />
            )}
          </button>

          {!isOpen && <ProfileButton />}
        </div>
        {isOpen && <MobileNav navigationLinks={filteredNavigationLinks} />}
      </div>
    </nav>
  );
};

export default NavBar;
