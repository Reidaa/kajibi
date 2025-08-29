import { Edit, Eye, MapPin } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useAdminStories } from "@/hooks/useAdminStories";
import type { Story } from "@/types/story";

interface ArticlesListProps {
	onEditArticle: (articleId: string) => void;
}

export const ArticlesList = ({ onEditArticle }: ArticlesListProps) => {
	const { data: articles = [], isLoading } = useAdminStories();

	if (isLoading) {
		return <div>Loading...</div>;
	}

	return (
		<div className="grid gap-4">
			{articles.map((article: Story) => (
				<Card key={article.id} className="transition-shadow hover:shadow-md">
					<CardContent className="p-6">
						<div className="flex gap-4">
							{/* Thumbnail */}
							<div className="flex-shrink-0">
								{article.thumbnail && (
									<img
										src={article.thumbnail}
										alt={article.title}
										className="h-20 w-20 rounded-lg object-cover"
									/>
								)}
							</div>

							{/* Content */}
							<div className="flex-1 space-y-2">
								<div className="flex items-start justify-between">
									<div>
										<h3 className="font-semibold text-gray-900 text-lg">
											{article.title}
										</h3>
										<p className="text-gray-600 text-sm">{article.handle}</p>
									</div>

									<div className="flex gap-2">
										<Button
											variant="outline"
											size="sm"
											onClick={() => onEditArticle(article.id)}
											className="flex items-center gap-1"
										>
											<Edit size={14} />
											Edit
										</Button>
									</div>
								</div>

								{article.address && (
									<div className="flex items-center text-gray-500 text-sm">
										<MapPin size={14} className="mr-1" />
										{article.address}
									</div>
								)}

								<p className="line-clamp-2 text-gray-700 text-sm">
									{article.description}
								</p>

								<div className="flex items-center justify-between">
									<div className="flex flex-wrap gap-1">
										{article.tags?.slice(0, 3).map((tag) => (
											<Badge key={tag} variant="secondary" className="text-xs">
												#{tag}
											</Badge>
										))}
									</div>

									<div className="flex items-center gap-4 text-gray-500 text-xs">
										<span className="flex items-center gap-1">
											<Eye size={12} />
											{article.panels.length} panels
										</span>
										<span>
											{new Date(article.publishedAt).toLocaleDateString()}
										</span>
									</div>
								</div>
							</div>
						</div>
					</CardContent>
				</Card>
			))}
		</div>
	);
};
