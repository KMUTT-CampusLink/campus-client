export default function getHomePageLink() {
  const userRole = localStorage.getItem("userRole");

  if (userRole === "Professor" || userRole === "Staff") {
    return "/security/administrator";
  } else if (userRole === "Student") {
    return "/security/student";
  } else {
    return "/regis";
  }
}
