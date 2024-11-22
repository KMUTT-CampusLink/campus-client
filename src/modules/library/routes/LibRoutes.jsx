import HomePage from "../Pages/HomePage";
import BookListPage from "../Pages/BookListPage";
import RequestPage from "../Pages/RequestPage";
import ContactPage from "../Pages/ContactPage";
import AnnouncementPage from "../Pages/AnnouncementPage";
import BookPage from "../Pages/BookPage";
import EventPage from "../Pages/EventPage";
import AnnouncePage from "../Pages/AnnouncePage";
import MyBookPage from "../Pages/MyBookPage";
import BrowseBookPage from "../Pages/BrowseBookPage";
import BookSearchPage from "../Pages/BookSearchPage";
import ViewallBookPage from "../Pages/ViewallBookPage";
import AuthRoute from "../../registration/middleware/AuthRoute";
import AllEventPage from "../Pages/AllEventPage";
import AdminPage from "../Pages/AdminPage";

export default function LibRoutes() {
  return [
    {
      path: "",
      element: <HomePage />,
    },
    {
      path: "/library/booklist",
      element: <BrowseBookPage />,
    },
    {
      path: "/library/mybook",
      element: (
        <AuthRoute>
          <MyBookPage />
        </AuthRoute>
      ),
    },
    {
      path: "/library/contact",
      element: <ContactPage />,
    },
    {
      path: "/library/announcement",
      element: <AnnouncementPage />,
    },
    {
      path: "/library/event",
      element: <AllEventPage />,
    },
    {
      path: "/library/book/:title",
      element: <BookPage />,
    },
    {
      path: "/library/event/:title",
      element: <EventPage />,
    },
    {
      path: "/library/announcement/:title",
      element: <AnnouncePage />,
    },
    {
      path: "/library/request/:title",
      element: (
        <AuthRoute>
          <RequestPage />
        </AuthRoute>
      ),
    },
    {
      path: "/library/search/:keyword",
      element: <BookSearchPage />,
    },
    {
      path: "/library/viewall/:category",
      element: <ViewallBookPage />,
    },
    {
      path: "/library/admin",
      element: <AdminPage />,
    },
  ];
}
