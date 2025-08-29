import { X } from "lucide-react";

interface ProgressBarProps {
	totalPanels: number;
	currentPanel: number;
	// 0..1 progress for the current panel
	currentProgress?: number;
	storyTitle: string;
	author: string;
	uploaderName?: string;
	dateText?: string;
	avatarUrl?: string;
	onClose?: () => void;
}

export const ProgressBar = ({
	totalPanels,
	currentPanel,
	currentProgress = 0,
	storyTitle,
	author,
	uploaderName,
	dateText,
	avatarUrl,
	onClose,
}: ProgressBarProps) => {
	const name = uploaderName || author;
	const dateLabel = dateText || new Date().toLocaleDateString();
	return (
		<div className="w-full">
			{/* Progress segments */}
			<div className="mb-3 flex gap-1">
				{Array.from({ length: totalPanels }, (_, index) => {
					const isPast = index < currentPanel;
					const isCurrent = index === currentPanel;
					const baseColor = "#ffffff4d"; // half-transparent white background
					const fillWidth = isPast
						? "100%"
						: isCurrent
							? `${Math.max(0, Math.min(100, currentProgress * 100))}%`
							: "0%";
					return (
						<div
							key={index}
							className="h-1 flex-1 overflow-hidden rounded-full"
							style={{ backgroundColor: baseColor }}
						>
							<div
								className="h-full"
								style={{
									width: fillWidth,
									backgroundColor: "#ffffffff",
									transition: "width 120ms linear",
								}}
							/>
						</div>
					);
				})}
			</div>

			{/* Story info header */}
			<div className="flex items-center justify-between text-sm text-white">
				<div className="flex items-center gap-3">
					{avatarUrl ? (
						<img
							src={avatarUrl}
							alt={name}
							className="h-8 w-8 rounded-full object-cover"
						/>
					) : (
						<div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-r from-purple-500 to-pink-500 font-bold text-xs">
							{name.charAt(0)}
						</div>
					)}
					<div>
						<p className="font-medium">{name}</p>
						<p className="text-xs opacity-75">{dateLabel}</p>
					</div>
				</div>
				<div className="flex items-center gap-2">
					<p className="min-w-[60px] text-right text-xs opacity-75">
						{currentPanel + 1} / {totalPanels}
					</p>
					{onClose && (
						<button
							onClick={onClose}
							aria-label="Fermer"
							className="flex h-10 w-10 items-center justify-center rounded-full bg-black/30 transition hover:bg-black/50"
						>
							<X size={22} />
						</button>
					)}
				</div>
			</div>
		</div>
	);
};
