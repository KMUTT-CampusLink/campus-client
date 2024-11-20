import ChatPage from "../pages/ChatPage";
import AuthRoute from '../../registration/middleware/AuthRoute';

export default function BotRoutes() {
  return [
    {
      path: "",
      element: <AuthRoute> <ChatPage /> </AuthRoute>,
    },
  ];
}
