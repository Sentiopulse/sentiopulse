import { IoMdTrendingUp } from "react-icons/io";
import { MdOutlineLightMode } from "react-icons/md";

export default function Navbar() {
  return (
    <div className="sticky top-0 bg-transparent backdrop-blur-md w-full h-[80px] border-b-2 px-10 py-4 font-sans">
      <div className="flex flex-row items-center justify-between">
        <div className="flex flex-row gap-4">
          <div className="flex items-center">
            <div className="flex justify-center items-center bg-blue-500 h-10 w-10 text-background font-bold rounded-lg">
              <IoMdTrendingUp size={26} />
            </div>
          </div>
          <div className="flex flex-col">
            <div className="text-2xl font-semibold text-blue-500">
              SentioPulse
            </div>
            <div className="text-muted-foreground text-sm">
              Market Sentiment Aggregation
            </div>
          </div>
        </div>
        <div className="flex justify-center items-center h-10 w-10 hover:bg-blue-500 hover:text-background hover:rounded-lg">
          <MdOutlineLightMode size={20}/>
        </div>
      </div>
    </div>
  );
}
