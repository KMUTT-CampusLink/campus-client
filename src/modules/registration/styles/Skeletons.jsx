import NavBar from "../components/NavBarComponents/NavBar";
import { containerDivStyles, mainStyles } from "./styles";

export const LoadingSkeleton = () => {
  return (
    <div className={containerDivStyles}>
      <NavBar />
      <main className={mainStyles}>Loading...</main>
    </div>
  );
};

export const ErrorSkeleton = () => {
  return (
    <div className={containerDivStyles}>
      <NavBar />
      <main className={mainStyles}>Error Fetching Data...</main>
    </div>
  );
};

export const SInfoLoadingSkeleton = () => (
  <div className="ml-6 animate-pulse">
    <div className="w-3/4 h-4 bg-gray-200 rounded"></div>
    <p className="w-3/4 h-10 mt-4 text-sm text-center text-gray-500 bg-gray-200 rounded">
      Loading Student Data
    </p>
  </div>
);

export const CardErrorSkeleton = ({ data }) => (
  <div className="px-4 py-1 mt-2 text-white bg-red-500 rounded">
    <p>Error Loading {data} Data.</p>
  </div>
);

export const GradeCardLoadingSkeleton = () => (
  <div className="max-w-md mx-auto bg-white border border-gray-200 rounded-lg shadow-lg animate-pulse">
    <div className="flex items-center p-4 text-white bg-gray-200 rounded-t-lg justify-evenly">
      <div className="flex flex-col items-center justify-center text-center">
        <div className="w-12 h-4 mb-2 bg-gray-300 rounded"></div>
        <div className="w-8 h-5 mb-2 bg-gray-300 rounded"></div>
        <div className="w-12 h-4 bg-gray-300 rounded"></div>
      </div>
      <div className="h-12 mx-4"></div>
      <div className="flex flex-col items-center justify-center text-center">
        <div className="w-12 h-4 mb-2 bg-gray-300 rounded"></div>
        <div className="w-8 h-5 mb-2 bg-gray-300 rounded"></div>
        <div className="w-12 h-4 bg-gray-300 rounded"></div>
      </div>
    </div>

    <div className="p-4">
      <div className="flex items-center justify-between py-3">
        <div className="flex flex-col items-start">
          <div className="w-24 h-3 mb-1 bg-gray-300 rounded"></div>
          <div className="h-4 mb-1 bg-gray-300 rounded w-36"></div>
          <div className="w-16 h-3 bg-gray-300 rounded"></div>
        </div>
        <div className="w-5 h-5 bg-gray-300 rounded"></div>
      </div>
    </div>
  </div>
);
