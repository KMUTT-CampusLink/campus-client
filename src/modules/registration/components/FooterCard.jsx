import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faInstagram,
  faLinkedin,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";

const footerLinks = [
  {
    title: "Student Essentials",
    links: [
      { name: "Registration", href: "/regis" },
      { name: "Library", href: "/library" },
      { name: "Club Management", href: "/clubs" },
      { name: "Chatbot", href: "/botastra" },
    ],
  },
  {
    title: "Academics",
    links: [
      { name: "Online Course", href: "/courses" },
      { name: "Online Exam", href: "/exams" },
      { name: "Auto Attendance", href: "/attendance" },
    ],
  },
  {
    title: "Campus Services",
    links: [
      { name: "Transportation", href: "/transport" },
      { name: "Parking", href: "/parking" },
      { name: "Building & Security", href: "/security" },
      { name: "Interactive Map", href: "/map" },
    ],
  },
  {
    title: "Support",
    links: [
      { name: "Payment", href: "/payment" },
      { name: "Employment", href: "/employ" },
      { name: "Privacy Policy", href: "/" },
    ],
  },
];

const FooterCard = () => {
  return (
    <footer className="bg-gradient-to-r from-[rgba(194,84,77,0.5)] via-[rgba(238,143,9,0.5)] to-[rgba(255,234,191,0.5)] p-10 w-full font-georama">
      <div className="flex flex-wrap">
        <div className="w-1/2 md:w-1/6">
          <img
            className="bg-white p-2 rounded-full"
            src="/logos/long-logo.png"
            alt="mb-long-logo"
          />
          <p className="mt-2">
            Campus Link is a complete school management platform designed to
            simplify campus life and enhance the student experience.
          </p>
        </div>
        <div className="order-last flex-grow md:col-span-3 grid grid-cols-2 md:grid-cols-4 gap-6">
          {footerLinks.map((section, index) => (
            <div key={index}>
              <h6 className="font-semibold my-4">{section.title}</h6>
              {section.links.map((link, linkIndex) => (
                <Link key={linkIndex} to={link.href} className="block">
                  {link.name}
                </Link>
              ))}
            </div>
          ))}
        </div>
        <div className="w-1/2 md:w-auto md:order-last font-opensans">
          <p className="font-semibold mb-2">Subscribe Now</p>
          <form className="items-center justify-center ">
            <input
              type="email"
              placeholder="Your email"
              className="p-2 rounded mb-2 w-full text-white bg-gray-600 focus:outline-none focus:ring-2 focus:ring-orange-300"
            />
            <button className="bg-orange-400 w-full p-2 rounded">
              Subscribe
            </button>
          </form>
          <div className="flex justify-around mt-4">
            <a href="https://facebook.com" target="_blank">
              <FontAwesomeIcon
                icon={faFacebook}
                size="lg"
                className="text-blue-600"
              />
            </a>
            <a href="https://instagram.com" target="_blank">
              <FontAwesomeIcon
                icon={faInstagram}
                size="lg"
                className="text-pink-500"
              />
            </a>
            <a href="https://twitter.com" target="_blank">
              <FontAwesomeIcon
                icon={faTwitter}
                size="lg"
                className="text-blue-400"
              />
            </a>{" "}
            <a href="https://linkedin.com" target="_blank">
              <FontAwesomeIcon
                icon={faLinkedin}
                size="lg"
                className="text-blue-700"
              />
            </a>
          </div>
        </div>
      </div>
      <div className="divider"></div>
      <p className="text-center font-geologica font-extralight text-sm">
        &copy; 2024 KMUTT CS 24 Project. All Rights Reserved
      </p>
    </footer>
  );
};

export default FooterCard;
