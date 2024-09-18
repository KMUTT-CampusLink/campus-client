const Test = () => {
  return <h1>Online Exams</h1>;
};

export default function ExamRoutes() {
  return [
    {
      path: "",
      element: <Test />,
    },
  ];
}
