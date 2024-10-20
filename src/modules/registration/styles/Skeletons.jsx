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
    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
    <p className="text-gray-500 mt-4 text-sm h-10 text-center bg-gray-200 rounded w-3/4">
      Loading Student Data
    </p>
  </div>
);

export const CardErrorSkeleton = ({ data }) => (
  <div className="mt-2 bg-red-500 text-white py-1 px-4 rounded">
    <p>Error Loading {data} Data.</p>
  </div>
);

export const GradeCardLoadingSkeleton = () => (
  <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg border border-gray-200 animate-pulse">
    <div className="bg-gray-200 text-white rounded-t-lg p-4 flex justify-evenly items-center">
      <div className="flex flex-col items-center justify-center text-center">
        <div className="h-4 w-12 bg-gray-300 rounded mb-2"></div>
        <div className="h-5 w-8 bg-gray-300 rounded mb-2"></div>
        <div className="h-4 w-12 bg-gray-300 rounded"></div>
      </div>
      <div className="h-12 mx-4"></div>
      <div className="flex flex-col items-center justify-center text-center">
        <div className="h-4 w-12 bg-gray-300 rounded mb-2"></div>
        <div className="h-5 w-8 bg-gray-300 rounded mb-2"></div>
        <div className="h-4 w-12 bg-gray-300 rounded"></div>
      </div>
    </div>

    <div className="p-4">
      <div className="py-3 flex justify-between items-center">
        <div className="flex flex-col items-start">
          <div className="h-3 w-24 bg-gray-300 rounded mb-1"></div>
          <div className="h-4 w-36 bg-gray-300 rounded mb-1"></div>
          <div className="h-3 w-16 bg-gray-300 rounded"></div>
        </div>
        <div className="h-5 w-5 bg-gray-300 rounded"></div>
      </div>
    </div>
  </div>
);
