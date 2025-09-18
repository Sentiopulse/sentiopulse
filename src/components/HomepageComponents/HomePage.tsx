import PostsGallery from "./PostGallery";
import BullishMarketCard from "./BullishMarketCard";
import PostSearch from "./PostSearch";
import PostFilter from "./PostFilter";
import PostGalleryTitle from "./PostGalleryTitle";

export default function HomePage() {
  return (
    <div>
      <div className="flex flex-row justify-center space-x-3">
      <PostSearch/>
      <PostFilter/>
      </div>
      <BullishMarketCard />
      <PostGalleryTitle current={2} total={2}/>
      <PostsGallery/>
    </div>
  );
}
