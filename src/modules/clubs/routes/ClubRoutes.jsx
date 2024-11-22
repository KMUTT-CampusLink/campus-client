import { Outlet } from "react-router-dom"; // Import Outlet for nested routes
import Header from "../components/Header";
import NavBar from "../../registration/components/NavBarComponents/NavBar";
import ProfileForm from "../pages/MemberProfilePage";
import CreatePost from "../pages/CreatePostPage";
import ViewRequest from "../pages/ViewRequestPage";
import AdminNotification from "../pages/AdminNotiPage";
import ClubLandingPage from "../pages/ClubLandingPage";
import AdminMainPage from "../pages/AdminMainPage";
import ClubCreatePage from "../pages/ClubCreatePage";
import JoinFormPage from "../pages/JoinFormPage";
import ClubDetailPage from "../pages/ClubDetailPage";
import ClubHomePage from "../pages/AdminClubHomePage";
import CreateAnnouncement from "../pages/CreateAnnouncementsPage";
import MemClubHomePage from "../pages/MemClubHomePage";

export default function ClubRoutes() {
  return [
    // Main Clubs Section
    {
      path: "/clubs",
      element: (
        <div>
          <NavBar />
          <div className="pt-16">
            {/* Adjust top padding for NavBar */}
            <Header />
            <Outlet /> {/* Outlet for rendering nested routes */}
          </div>
        </div>
      ),
      children: [
        {
          index: true, // Clubs landing page at "/clubs"
          element: <ClubLandingPage />,
        },
        {
          path: ":clubId", // Club detail page at "/clubs/club-detail"
          element: <ClubDetailPage />,
        },
        {
          path: "join-club", // Join a club at "/clubs/join-club"
          element: <JoinFormPage />,
        },
        {
          path: "club-home/:clubId", // Club home page at "/clubs/club-home"
          element: <ClubHomePage />,
        },
      ],
    },
    // Admin Section under /clubs/admin
    {
      path: "/clubs/admin",
      element: (
        <div>
          <NavBar />
          <div className="pt-16">
            {" "}
            {/* Adjust top padding for NavBar */}
            <Header />
            <div className="flex-grow">
              <Outlet /> {/* Outlet for rendering admin-specific routes */}
            </div>
          </div>
        </div>
      ),
      children: [
        {
          index: true, // Admin main page at "/clubs/admin"
          element: <AdminMainPage />,
        },
        {
          path: "club-create", // Create a new club at "/clubs/club-create"
          element: <ClubCreatePage />,
        },
        {
          path: ":clubId/view-requests", // Admin view requests at "/clubs/admin/view-requests"
          element: <ViewRequest />,
        },
        {
          path: "create-post/:clubId", // Admin create post at "/clubs/admin/create-post"
          element: <CreatePost />,
        },
        {
          path: "create-announcement/:clubId", // Admin create announcement at "/clubs/admin/create-announcement"
          element: <CreateAnnouncement />,
        },
        {
          path: ":clubId/notifications", // Admin notifications at "/clubs/admin/notifications"
          element: <AdminNotification />,
        },
      ],
    },
    // Member Section under /clubs/member
    {
      path: "/clubs/member/:memberId",
      element: (
        <div>
          <NavBar />
          <div className="pt-16">
            {" "}
            {/* Adjust top padding for NavBar */}
            <Header />
            <div className="flex-grow">
              <Outlet /> {/* Outlet for rendering member-specific routes */}
            </div>
          </div>
        </div>
      ),
      children: [
        {
          index: true, // Member profile page at "/clubs/member"
          element: <ProfileForm />,
        },
        {
          path: "notifications", // Member notifications at "/clubs/member/notifications"
          element: <AdminNotification />, // Ensure Notifications component is correctly imported
        },
        {
          path: "club-home/:clubId", 
          element: <MemClubHomePage />, 
        },
      ],
    },
  ];
}