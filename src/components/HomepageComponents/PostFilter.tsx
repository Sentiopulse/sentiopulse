import { CiFilter } from "react-icons/ci";

export default function PostFilter() {
  return (
    <div className="h-10 w-20 flex flex-row gap-2 border rounded-md px-2 bg-violet-50 hover:bg-blue-500 hover:text-background">
      <div className="flex justify-center items-center">
        <CiFilter size={17} style={{ strokeWidth: 1 }} />
      </div>
      <div className="flex justify-center items-center text-md font-semibold">
        Filter
      </div>
    </div>
  );
}
