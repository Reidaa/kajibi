import { Loader2, Star } from "lucide-react";
import { useStories } from "@/hooks/useStories";
import type { Story } from "@/types/story";

export const LatestArticlesGallery = ({
	onSelect,
	stories: inputStories,
}: {
	onSelect?: (story: Story) => void;
	stories?: Story[];
}) => {
	const { data: fetchedStories, isLoading, error } = useStories();
	const stories = inputStories ?? fetchedStories;

	if (isLoading) {
		return (
			<div className="flex items-center justify-center p-8">
				<Loader2 className="animate-spin" size={24} />
				<span className="ml-2">Loading articles...</span>
			</div>
		);
	}

	if (error || !stories || stories.length === 0) {
		return (
			<div className="p-8 text-center">
				<p className="text-muted-foreground">No articles available</p>
			</div>
		);
	}

	// Sort stories by published date (most recent first)
	const sortedStories = [...stories].sort(
		(a, b) =>
			new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
	);

	const formatDate = (dateString: string) => {
		return new Date(dateString).toLocaleDateString("en-US", {
			month: "short",
			day: "numeric",
			year: "numeric",
		});
	};

	const renderStars = (rating: number) => {
		const fullStars = Math.floor(rating);
		const hasHalfStar = rating % 1 >= 0.5;
		const stars = [];

		for (let i = 0; i < 5; i++) {
			if (i < fullStars) {
				stars.push(
					<Star
						key={i}
						size={12}
						className="fill-yellow-400 text-yellow-400"
					/>,
				);
			} else if (i === fullStars && hasHalfStar) {
				stars.push(
					<div key={i} className="relative">
						<Star size={12} className="text-gray-300" />
						<div className="absolute inset-0 w-1/2 overflow-hidden">
							<Star size={12} className="fill-yellow-400 text-yellow-400" />
						</div>
					</div>,
				);
			} else {
				stars.push(<Star key={i} size={12} className="text-gray-300" />);
			}
		}

		return stars;
	};

	return (
		<div className="p-6">
			<h2 className="mb-6 font-bold text-2xl text-foreground">
				Latest Articles
			</h2>
			<div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
				{sortedStories.map((story) => {
					const rating = story.rating;
					return (
						<div
							key={story.id}
							className="group relative cursor-pointer transition-transform duration-200 hover:scale-105"
							onClick={() => onSelect && onSelect(story)}
						>
							<div className="relative aspect-[3/4] overflow-hidden rounded-xl shadow-lg">
								{/* Thumbnail Image */}
								<img
									src={story.thumbnail}
									alt={story.title}
									className="h-full w-full object-cover"
								/>

								{/* Gradient Overlay */}
								<div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

								{/* Content Overlay */}
								<div className="absolute right-0 bottom-0 left-0 p-4 text-white">
									<h3 className="mb-1 line-clamp-2 font-semibold text-lg">
										{story.title}
									</h3>

									<div className="mb-2 flex items-center justify-between">
										<span className="text-gray-200 text-sm">
											{formatDate(story.lastVisit || story.publishedAt)}
										</span>
										{typeof rating === "number" && !Number.isNaN(rating) && (
											<div className="flex items-center gap-1">
												{renderStars(rating)}
												<span className="ml-1 text-gray-200 text-sm">
													{rating.toFixed(1)}
												</span>
											</div>
										)}
									</div>

									{/* Author hidden for now; use formatAuthor(story.username) when needed */}
								</div>
							</div>
						</div>
					);
				})}
			</div>
		</div>
	);
};
