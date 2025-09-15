import PostPage from "@/components/PostComponents/PostPage";
import PostsList from "@/components/PostComponents/PostsList";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <PostPage />
      </main>
    </div>
  );
}
