import { X } from "lucide-react";
import type { Story } from "@/types/story";

interface StoryGalleryOverlayProps {
	story: Story;
	currentPanelIndex: number;
	onPanelSelect: (index: number) => void;
	onClose: () => void;
}

export const StoryGalleryOverlay = ({
	story,
	currentPanelIndex,
	onPanelSelect,
	onClose,
}: StoryGalleryOverlayProps) => {
	return (
		<div className="absolute inset-0 z-50 bg-black/90 backdrop-blur-sm">
			{/* Header */}
			<div className="flex items-center justify-between p-4 text-white">
				<h3 className="font-semibold text-lg">Story Gallery</h3>
				<button
					onClick={onClose}
					className="rounded-full p-2 transition-colors hover:bg-white/20"
				>
					<X size={20} />
				</button>
			</div>

			{/* Gallery Grid */}
			<div className="grid max-h-[calc(100vh-80px)] grid-cols-2 gap-3 overflow-y-auto p-4 md:grid-cols-3">
				{story.panels.map((panel, index) => (
					<button
						key={panel.id}
						onClick={() => onPanelSelect(index)}
						className={`relative aspect-[9/16] overflow-hidden rounded-lg transition-all duration-200 ${
							index === currentPanelIndex
								? "scale-105 ring-2 ring-white"
								: "hover:scale-105 hover:ring-1 hover:ring-white/50"
						}`}
					>
						{panel.type === "image" && panel.media ? (
							<img
								src={panel.media}
								alt={panel.title || `Panel ${index + 1}`}
								className="h-full w-full object-cover"
							/>
						) : (
							<div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500">
								<div className="p-2 text-center">
									<p className="line-clamp-3 font-medium text-white text-xs">
										{panel.title || panel.content || `Panel ${index + 1}`}
									</p>
								</div>
							</div>
						)}

						{/* Panel Number */}
						<div className="absolute top-2 right-2 rounded-full bg-black/60 px-2 py-1 text-white text-xs">
							{index + 1}
						</div>

						{/* Current Indicator */}
						{index === currentPanelIndex && (
							<div className="absolute inset-0 flex items-center justify-center bg-white/20">
								<div className="flex h-8 w-8 items-center justify-center rounded-full bg-white">
									<div className="h-3 w-3 rounded-full bg-blue-500" />
								</div>
							</div>
						)}
					</button>
				))}
			</div>
		</div>
	);
};
