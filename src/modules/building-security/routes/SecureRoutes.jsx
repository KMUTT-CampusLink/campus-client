const Test = () => {
  return <h1>Building and Security</h1>;
};

export default function SecureRoutes() {
  return [
    {
      path: "",
      element: <Test />,
    },
  ];
}
