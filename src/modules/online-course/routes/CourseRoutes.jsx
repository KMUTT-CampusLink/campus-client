const Test = () => {
  return <h1>Online Courses</h1>;
};

export default function CourseRoutes() {
  return [
    {
      path: "",
      element: <Test />,
    },
  ];
}
