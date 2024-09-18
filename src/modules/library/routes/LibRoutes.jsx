const Test = () => {
  return <h1>Library</h1>;
};

export default function LibRoutes() {
  return [
    {
      path: "",
      element: <Test />,
    },
  ];
}
