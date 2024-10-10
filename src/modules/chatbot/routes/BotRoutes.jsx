import ChatPage from "../pages/ChatPage";

export default function BotRoutes() {
  return [
    {
      path: "",
      element: <ChatPage />,
    },
  ];
}
