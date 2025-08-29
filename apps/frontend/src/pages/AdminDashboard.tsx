import { ExternalLink } from "lucide-react";
import { useState } from "react";
import { ArticleEditor } from "@/components/admin/ArticleEditor";
import { ArticlesList } from "@/components/admin/ArticlesList";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAdminStories } from "@/hooks/useAdminStories";
import { STRAPI_URL } from "@/integrations/strapi/client";

const AdminDashboard = () => {
	const [editingArticleId, setEditingArticleId] = useState<string | null>(null);
	const { data: articles = [] } = useAdminStories();
	const openStrapiDashboard = () =>
		window.open(`${STRAPI_URL}/admin`, "_blank");

	if (editingArticleId !== null) {
		return (
			<div className="min-h-screen bg-gray-50">
				<div className="mx-auto max-w-4xl p-6">
					<ArticleEditor
						articleId={editingArticleId || null}
						onBack={() => setEditingArticleId(null)}
					/>
				</div>
			</div>
		);
	}

	return (
		<div className="min-h-screen bg-gray-50">
			<div className="mx-auto max-w-4xl p-6">
				{/* Header */}
				<div className="mb-8 flex items-center justify-between">
					<div>
						<h1 className="mb-2 font-bold text-3xl text-gray-900">
							Content Management
						</h1>
						<p className="text-gray-600">
							Manage your stories and content through Strapi CMS
						</p>
						<p className="text-gray-500 text-sm">{articles.length} articles</p>
					</div>
					<Button
						onClick={() => setEditingArticleId("")}
						className="flex items-center gap-2"
					>
						Create Article
					</Button>
				</div>

				{/* Articles List */}
				<ArticlesList onEditArticle={setEditingArticleId} />

				{/* Strapi Dashboard Link */}
				<Card className="mt-6">
					<CardHeader>
						<CardTitle className="flex items-center gap-2">
							<ExternalLink size={20} />
							Strapi CMS Dashboard
						</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="space-y-4">
							<p className="text-gray-600">
								Access your Strapi dashboard to create and manage stories,
								upload media, and configure content.
							</p>
							<Button
								onClick={openStrapiDashboard}
								className="flex items-center gap-2"
							>
								<ExternalLink size={16} />
								Open Strapi Dashboard
							</Button>
							<div className="mt-6 rounded-lg bg-blue-50 p-4">
								<h3 className="mb-2 font-semibold text-blue-900">
									Setup Instructions:
								</h3>
								<ol className="list-inside list-decimal space-y-1 text-blue-800 text-sm">
									<li>
										Install Strapi:{" "}
										<code className="rounded bg-blue-100 px-1">
											npx create-strapi-app@latest my-strapi-project
										</code>
									</li>
									<li>
										Configure the database connection to match your current
										schema
									</li>
									<li>Create content types for Stories and Story Panels</li>
									<li>Update the URL above to match your Strapi instance</li>
								</ol>
							</div>
						</div>
					</CardContent>
				</Card>

				{/* Database Schema Info */}
				<Card className="mt-6">
					<CardHeader>
						<CardTitle>Database Schema</CardTitle>
					</CardHeader>
					<CardContent>
						<p className="mb-4 text-gray-600">
							Your current database is already compatible with Strapi. The
							existing tables (stories, story_panels) follow Strapi conventions
							and can be easily integrated.
						</p>
						<div className="grid grid-cols-1 gap-4 md:grid-cols-2">
							<div className="rounded bg-gray-50 p-3">
								<h4 className="font-medium">Stories Table</h4>
								<p className="text-gray-600 text-sm">
									Contains story metadata, location, and publishing info
								</p>
							</div>
							<div className="rounded bg-gray-50 p-3">
								<h4 className="font-medium">Story Panels Table</h4>
								<p className="text-gray-600 text-sm">
									Contains individual story panels with content and media
								</p>
							</div>
						</div>
					</CardContent>
				</Card>
			</div>
		</div>
	);
};

export default AdminDashboard;
