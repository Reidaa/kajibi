import { Grid3X3, Loader2, Map } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { SearchBar } from "@/components/SearchBar";
import { Button } from "@/components/ui/button";
import { useLists } from "@/hooks/useLists";

const ListsPage = () => {
	const { data: lists, isLoading, error } = useLists();
	const [filtersOpen, setFiltersOpen] = useState(false);

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
	if (error) {
		return (
			<div className="flex min-h-screen items-center justify-center">
				<span>Erreur de chargement</span>
			</div>
		);
	}

	const q = new URLSearchParams(window.location.search).get("q") || "";
	const qn = q.toLowerCase();
	const filteredLists = (lists || []).filter(
		(l) =>
			(l.name || "").toLowerCase().includes(qn) ||
			(l.description || "").toLowerCase().includes(qn) ||
			(l.category || "").toLowerCase().includes(qn),
	);

	return (
		<div className="min-h-screen bg-background">
			{/* Header with centered search and right nav (desktop), stacked on mobile */}
			<div className="px-4 pt-4 md:px-6">
				<div className="hidden md:grid md:grid-cols-[1fr_auto_1fr] md:items-start md:gap-4">
					<div />
					<div className="w-full justify-self-center md:w-[540px] lg:w-[620px] xl:w-[720px]">
						<SearchBar
							showFilters={filtersOpen}
							onToggleFilters={() => setFiltersOpen((o) => !o)}
						/>
					</div>
					<div className="flex items-center justify-end gap-2">
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
				</div>
				<div className="flex flex-col gap-2 md:hidden">
					<div className="mx-auto w-full md:w-[720px]">
						<SearchBar
							showFilters={filtersOpen}
							onToggleFilters={() => setFiltersOpen((o) => !o)}
						/>
					</div>
					<div className="flex items-center justify-end gap-2">
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
				</div>
			</div>

			<div className="p-6">
				<h2 className="mb-6 font-bold text-2xl text-foreground">Listes</h2>
				<div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
					{filteredLists.map((l) => (
						<Link
							key={l.id}
							to={`/lists/${encodeURIComponent(l.slug || l.id)}`}
							className="group block"
						>
							<div className="relative aspect-[3/4] overflow-hidden rounded-xl shadow-lg">
								{l.thumbnail ? (
									<img
										src={l.thumbnail}
										alt={l.name}
										className="h-full w-full object-cover"
									/>
								) : (
									<div className="h-full w-full bg-gray-200" />
								)}
								<div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
								<div className="absolute right-0 bottom-0 left-0 p-4 text-white">
									<h3 className="mb-1 line-clamp-2 font-semibold text-lg">
										{l.name}
									</h3>
								</div>
							</div>
						</Link>
					))}
				</div>
			</div>
		</div>
	);
};

export default ListsPage;
