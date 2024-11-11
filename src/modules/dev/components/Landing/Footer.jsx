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
const Footer = () => {
  return (
    <div className="w-full h-fit relative">
      <div className="w-[20rem] md:w-[30rem] h-auto absolute top-0 right-0">
        <img
          className="w-full h-full object-cover"
          src="/logos/footer/grad_lg.png"
          alt=""
        />
      </div>

      {/* Text */}
      <div
        style={{
          backgroundImage:
            "linear-gradient(to bottom, #eb8b10, #ee9933, #f2a64d, #f4b365, #f7c07d, #f8c88c, #facf9b, #fbd7aa, #fcdcb3, #fde1bc, #fee5c6, #ffeacf)",
        }}
        className="w-full flex flex-col items-center justify-center absolute left-0 right-0 top-[7.5rem] md:top-[11.25rem]"
      >
        <div className="w-full flex flex-col justify-center items-center xl:flex-row">
          {/* Logo and About */}
          <div className="w-fit  flex flex-col p-[1rem] gap-4 items-center justify-center md:flex-row md:gap-8">
            <div className="w-[228px] h-[50px] bg-white/80 rounded-[50px] flex items-center justify-center">
              <img
                className="w-[70%] h-auto object-cover"
                src="/logos/footer/logo.png"
                alt=""
              />
            </div>

            {/* Links */}
            <div className="grid grid-cols-2 font-geologica gap-x-[3rem] gap-y-[1rem] md:gap-x-[1.5rem] md:gap-y-0 md:grid-cols-4">
              {footerLinks.map((section, index) => (
                <div
                  className="flex flex-col items-start justify-start"
                  key={index}
                >
                  <p className="font-semibold mb-1">{section.title}</p>
                  {section.links.map((link, linkIndex) => (
                    <Link key={linkIndex} to={link.href}>
                      <span className="text-sm">{link.name}</span>
                    </Link>
                  ))}
                </div>
              ))}
            </div>
          </div>

          {/* Subscribe and Social Media Logos */}
          <div className="font-geologica w-full px-[1rem] mt-[1rem] max-w-[25rem]">
            <p className="font-semibold mb-1">Subscribe Now</p>
            <form className="">
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
        <div className="w-full flex flex-col items-center justify-center px-[1rem]">
          <div className="divider"></div>
          <p className="text-center font-geologica font-extralight text-sm mb-[1rem]">
            &copy; 2024 KMUTT CS 24 Project. All Rights Reserved
          </p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
