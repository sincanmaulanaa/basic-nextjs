import { CheckIcon } from "@heroicons/react/solid";

export default function Banner({ type, value }) {
  return (
    <div className="bg-teal-600 fixed top-0 inset-x-0">
      <div className="max-w-7xl mx-auto py-3 px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between flex-wrap">
          <div className="w-0 flex-1 flex items-center">
            <span className="flex p-2 rounded-lg bg-teal-800">
              <CheckIcon className="h-6 w-6 text-white" />
            </span>
            <p className="ml-3 font-medium text-white truncate">
              <span className="md:hidden"> {value} </span>
              <span className="hidden md:inline"> {value} </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
