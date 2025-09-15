import { FaArrowTrendUp } from "react-icons/fa6";
import { MdOutlineLightMode } from "react-icons/md";

export default function Navbar(){
    return(
      <div className="sticky top-0 flex flex-row md:flex-row justify-around bg-background/30 backdrop-blur-md h-18 md:h-16 pt-2 md:pt-2 font-sans">
        <div className="flex flex-row">
            <div className="flex justify-center items-center mx-4 bg-blue-400 w-8 h-8 rounded text-background">
                <FaArrowTrendUp size={14}/>
            </div>
            <div className="flex flex-col">
                <div className="text-sm font-bold text-blue-400">SentioPulse</div>
            <div className="text-muted-foreground text-xs">Market Sentiment Aggregation</div>
            </div>
        </div>
        <div className="flex justify-center items-center pb-4 md:pb-4">
            <MdOutlineLightMode />
        </div>
      </div>
    )
}