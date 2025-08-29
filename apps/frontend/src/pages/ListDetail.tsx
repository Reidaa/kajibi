import { Grid3X3, Loader2, Map } from "lucide-react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { LatestArticlesGallery } from "@/components/LatestArticlesGallery";
import { TwoPanelStoryViewer } from "@/components/TwoPanelStoryViewer";
import { Button } from "@/components/ui/button";
import { useList } from "@/hooks/useList";
import { useStories } from "@/hooks/useStories";
import type { Story } from "@/types/story";

const ListDetailPage = () => {
	const { slug } = useParams<{ slug: string }>();
	const navigate = useNavigate();
	const { data: list, isLoading, error } = useList(slug || "");
	const { data: stories } = useStories();

	if (isLoading) {
		return (
			<div className="flex min-h-screen items-center justify-center">
				<div className="flex items-center gap-2">
					<Loader2 className="animate-spin" size={20} />
					<span>Chargement…</span>
				</div>
			</div>
		);
	}
	if (error || !list) {
		return (
			<div className="flex min-h-screen items-center justify-center">
				<span>Erreur de chargement</span>
			</div>
		);
	}

	// Build combined media panels: first all media from each article, then list-level media
	const articleStories = (stories || []).filter((s) =>
		(list.articles || []).some((a) =>
			a.slug ? a.slug === s.handle : a.id === s.id,
		),
	);
	const articleMedias: Array<{ url: string; type: "image" | "video" }> = [];
	for (const a of list.articles || []) {
		for (const s of articleStories) {
			if ((s.handle && a.slug && s.handle === a.slug) || s.id === a.id) {
				for (const p of s.panels) {
					if (p.media)
						articleMedias.push({
							url: p.media,
							type: p.type === "video" ? "video" : "image",
						});
				}
			}
		}
	}
	const listMedias = list.media || [];
	const combined = [...articleMedias, ...listMedias];

	// Decide rendering mode
	const showViewer = combined.length > 0;

	// Super Story for viewer
	const superStory: Story | null = showViewer
		? ({
				id: `list-${list.slug || list.id}`,
				title: list.name,
				author: "",
				handle: list.slug,
				publishedAt: new Date().toISOString(),
				description: list.description,
				panels: combined.map((m, i) => ({
					id: `p-${i}`,
					type: m.type,
					media: m.url,
					orderIndex: i,
				})),
				thumbnail: combined[0]?.url || undefined,
			} as Story)
		: null;

	return (
		<div className="min-h-screen bg-background">
			<div className="flex justify-end gap-2 p-4">
				<Link to="/gallery">
					<Button variant="outline" className="border-white/20 bg-white/10">
						<Grid3X3 size={16} className="mr-2" />
						Galerie
					</Button>
				</Link>
				<Link to="/map">
					<Button variant="outline" className="border-white/20 bg-white/10">
						<Map size={16} className="mr-2" />
						Carte
					</Button>
				</Link>
			</div>

			<div className="p-6">
				<h1 className="mb-2 font-bold text-2xl">{list.name}</h1>
				{list.description && (
					<p className="mb-6 max-w-2xl text-muted-foreground">
						{list.description}
					</p>
				)}

				{showViewer && superStory ? (
					<div className="fixed inset-0 z-50 bg-black">
						<TwoPanelStoryViewer
							initialStoryId={superStory.id}
							stories={[superStory]}
							onClose={() => navigate(-1)}
						/>
					</div>
				) : (
					<div>
						<h2 className="mb-4 font-semibold text-xl">Articles</h2>
						<div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
							{articleStories.map((story) => (
								<div
									key={story.id}
									className="group relative cursor-pointer transition-transform duration-200 hover:scale-105"
									onClick={() =>
										navigate(
											`/story/${encodeURIComponent(story.handle || story.id)}`,
										)
									}
								>
									<div className="relative aspect-[3/4] overflow-hidden rounded-xl shadow-lg">
										{story.thumbnail && (
											<img
												src={story.thumbnail}
												alt={story.title}
												className="h-full w-full object-cover"
											/>
										)}
										<div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
										<div className="absolute right-0 bottom-0 left-0 p-4 text-white">
											<h3 className="mb-1 line-clamp-2 font-semibold text-lg">
												{story.title}
											</h3>
										</div>
									</div>
								</div>
							))}
						</div>
					</div>
				)}
			</div>
		</div>
	);
};

export default ListDetailPage;
