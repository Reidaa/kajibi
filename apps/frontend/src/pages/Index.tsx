import { Grid3X3, Loader2, Map, Settings } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { LatestArticlesGallery } from "@/components/LatestArticlesGallery";
import { TwoPanelStoryViewer } from "@/components/TwoPanelStoryViewer";
import { Button } from "@/components/ui/button";
import { useStories } from "@/hooks/useStories";

const Index = () => {
	const { data: stories, isLoading, error } = useStories();
	const [viewMode, setViewMode] = useState<"story" | "gallery">("story");

	if (isLoading) {
		return (
			<div className="flex min-h-screen items-center justify-center bg-black">
				<div className="flex items-center gap-2 text-white">
					<Loader2 className="animate-spin" size={24} />
					<span>Loading stories...</span>
				</div>
			</div>
		);
	}

	if (error) {
		return (
			<div className="flex min-h-screen items-center justify-center bg-black">
				<div className="text-center text-white">
					<h2 className="mb-2 text-xl">Error loading stories</h2>
					<p className="text-gray-400">Please try refreshing the page</p>
				</div>
			</div>
		);
	}

	if (!stories || stories.length === 0) {
		return (
			<div className="flex min-h-screen items-center justify-center bg-black">
				<div className="text-center text-white">
					<h2 className="mb-2 text-xl">No stories found</h2>
					<p className="text-gray-400">Check back later for new content</p>
				</div>
			</div>
		);
	}

	return (
		<div className="min-h-screen bg-background">
			{/* Navigation Header */}
			<div className="absolute top-4 right-4 z-50 flex gap-2">
				<Button
					variant={viewMode === "gallery" ? "default" : "outline"}
					onClick={() => setViewMode("gallery")}
					className={
						viewMode === "story"
							? "border-white/20 bg-white/10 text-white hover:bg-white/20"
							: ""
					}
				>
					<Grid3X3 size={16} className="mr-2" />
					Gallery
				</Button>
				<Link to="/map">
					<Button
						variant="outline"
						className="border-white/20 bg-white/10 text-white hover:bg-white/20"
					>
						<Map size={16} className="mr-2" />
						Map View
					</Button>
				</Link>
				<Link to="/admin">
					<Button
						variant="outline"
						className="border-white/20 bg-white/10 text-white hover:bg-white/20"
					>
						<Settings size={16} className="mr-2" />
						Admin
					</Button>
				</Link>
			</div>

			{viewMode === "gallery" ? (
				<LatestArticlesGallery />
			) : (
				<div className="bg-black">
					<TwoPanelStoryViewer stories={stories} />
				</div>
			)}
		</div>
	);
};

export default Index;
