type PostGalleryTitleProps = {
  current: number;
  total: number;
};

// Removed unused topics array

export default function PostGalleryTitle({
  current,
  total,
}: PostGalleryTitleProps) {
  return (
    <div className="flex flex-row items-center justify-between font-sans mt-10 mb-5 mx-20">
      <div className="text-2xl font-bold">Market Insights</div>
      <div className="text-muted-foreground">
        {current} of {total} topics
      </div>
    </div>
  );
}
