import popToast from "../utils/popToast";

const HomePage = () => {
  return (
    <div className="mt-8 ml-8">
      <button onClick={() => popToast("He/she clicked", "default")}>
        Click Me
      </button>
    </div>
  );
};

export default HomePage;
