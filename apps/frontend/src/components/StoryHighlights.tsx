import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";

interface Highlight {
	id: string;
	title: string;
	thumbnail: string;
	panelIds: string[];
}

interface StoryHighlightsProps {
	highlights: Highlight[];
	onHighlightSelect: (highlight: Highlight) => void;
	selectedHighlightId?: string;
}

export const StoryHighlights = ({
	highlights,
	onHighlightSelect,
	selectedHighlightId,
}: StoryHighlightsProps) => {
	const [scrollPosition, setScrollPosition] = useState(0);

	const scrollLeft = () => {
		setScrollPosition((prev) => Math.max(0, prev - 200));
	};

	const scrollRight = () => {
		const maxScroll = Math.max(0, highlights.length * 80 - 300);
		setScrollPosition((prev) => Math.min(maxScroll, prev + 200));
	};

	if (!highlights || highlights.length === 0) return null;

	return (
		<div className="mb-6">
			<h3 className="mb-3 font-medium text-gray-700 text-sm">Highlights</h3>
			<div className="relative">
				{/* Left Arrow */}
				{scrollPosition > 0 && (
					<button
						onClick={scrollLeft}
						className="-translate-y-1/2 absolute top-1/2 left-0 z-10 rounded-full bg-white p-1 shadow-md transition-all duration-200 hover:bg-gray-50"
					>
						<ChevronLeft size={16} />
					</button>
				)}

				{/* Highlights Container */}
				<div className="overflow-hidden">
					<div
						className="flex gap-3 transition-transform duration-300 ease-out"
						style={{ transform: `translateX(-${scrollPosition}px)` }}
					>
						{highlights.map((highlight) => (
							<button
								key={highlight.id}
								onClick={() => onHighlightSelect(highlight)}
								className={`h-16 w-16 flex-shrink-0 overflow-hidden rounded-full border-2 transition-all duration-200 ${
									selectedHighlightId === highlight.id
										? "scale-105 border-blue-500"
										: "border-gray-200 hover:border-gray-300"
								}`}
							>
								<img
									src={highlight.thumbnail}
									alt={highlight.title}
									className="h-full w-full object-cover"
								/>
							</button>
						))}
					</div>
				</div>

				{/* Right Arrow */}
				{scrollPosition < highlights.length * 80 - 300 && (
					<button
						onClick={scrollRight}
						className="-translate-y-1/2 absolute top-1/2 right-0 z-10 rounded-full bg-white p-1 shadow-md transition-all duration-200 hover:bg-gray-50"
					>
						<ChevronRight size={16} />
					</button>
				)}
			</div>

			{/* Selected Highlight Title */}
			{selectedHighlightId && (
				<div className="mt-2 text-center">
					<span className="text-gray-600 text-xs">
						{highlights.find((h) => h.id === selectedHighlightId)?.title}
					</span>
				</div>
			)}
		</div>
	);
};
