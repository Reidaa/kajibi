import { Volume2, VolumeX } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import type { StoryPanelData } from "@/types/story";

interface StoryPanelProps {
	panel: StoryPanelData;
	onVideoMeta?: (durationSec: number) => void;
	onVideoTime?: (currentSec: number, durationSec: number) => void;
	onVideoEnded?: () => void;
}

export const StoryPanel = ({
	panel,
	onVideoMeta,
	onVideoTime,
	onVideoEnded,
}: StoryPanelProps) => {
	const [muted, setMuted] = useState(true);
	const videoRef = useRef<HTMLVideoElement | null>(null);

	useEffect(() => {
		// Reset mute when media changes
		setMuted(true);
		if (videoRef.current) {
			videoRef.current.muted = true;
		}
		// Attempt autoplay muted on mount/change
		if (videoRef.current) {
			videoRef.current.play().catch(() => {
				// Autoplay might be blocked until user interacts
			});
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [panel.media]);

	const toggleMute = (e: React.MouseEvent) => {
		e.stopPropagation();
		const v = videoRef.current;
		if (!v) return;
		const next = !muted;
		setMuted(next);
		v.muted = next;
		if (!next) {
			// Ensure playback resumes with audio after a user gesture
			v.play().catch(() => {});
		}
	};

	const renderContent = () => {
		switch (panel.type) {
			case "text":
				return (
					<div className="flex h-full flex-col items-center justify-center bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 p-8">
						<div className="max-w-2xl text-center">
							<h2 className="mb-6 font-bold text-4xl text-white leading-tight md:text-6xl">
								{panel.title}
							</h2>
							{panel.content && (
								<p className="text-lg text-white/90 leading-relaxed md:text-xl">
									{panel.content}
								</p>
							)}
						</div>
					</div>
				);

			case "image":
				return (
					<div className="relative h-full">
						{panel.media && (
							<img
								src={panel.media}
								alt={panel.title || "Story image"}
								className="h-full w-full object-cover"
							/>
						)}
						<div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
						{(panel.title || panel.content) && (
							<div className="absolute right-0 bottom-0 left-0 p-8">
								{panel.title && (
									<h2 className="mb-4 font-bold text-3xl text-white md:text-4xl">
										{panel.title}
									</h2>
								)}
								{panel.content && (
									<p className="text-lg text-white/90 leading-relaxed">
										{panel.content}
									</p>
								)}
							</div>
						)}
					</div>
				);

			case "video":
				return (
					<div className="relative h-full">
						{panel.media && (
							<video
								src={panel.media}
								className="h-full w-full object-cover"
								ref={videoRef}
								autoPlay
								muted={muted}
								preload="auto"
								playsInline
								onLoadedMetadata={(e) => {
									const v = e.currentTarget;
									if (v && isFinite(v.duration) && v.duration > 0) {
										onVideoMeta?.(v.duration);
									}
								}}
								onTimeUpdate={(e) => {
									const v = e.currentTarget;
									if (v && isFinite(v.duration) && v.duration > 0) {
										onVideoTime?.(v.currentTime, v.duration);
									}
								}}
								onEnded={() => onVideoEnded?.()}
							/>
						)}
						{/* Mute/Unmute toggle */}
						<button
							onClick={toggleMute}
							className="absolute top-32 left-4 z-30 rounded-full bg-black/40 p-2 text-white transition hover:bg-black/60"
							aria-label={muted ? "Unmute video" : "Mute video"}
						>
							{muted ? <VolumeX size={18} /> : <Volume2 size={18} />}
						</button>
						<div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
						{(panel.title || panel.content) && (
							<div className="absolute right-0 bottom-0 left-0 p-8">
								{panel.title && (
									<h2 className="mb-4 font-bold text-3xl text-white md:text-4xl">
										{panel.title}
									</h2>
								)}
								{panel.content && (
									<p className="text-lg text-white/90 leading-relaxed">
										{panel.content}
									</p>
								)}
							</div>
						)}
					</div>
				);

			case "quote":
				return (
					<div className="flex h-full flex-col items-center justify-center bg-gradient-to-br from-slate-900 via-gray-900 to-zinc-900 p-8">
						<div className="max-w-3xl text-center">
							<div className="mb-4 text-6xl text-white/20 md:text-8xl">"</div>
							<blockquote className="mb-8 font-light text-2xl text-white italic leading-relaxed md:text-4xl">
								{panel.content}
							</blockquote>
							{panel.title && (
								<cite className="font-medium text-lg text-white/80 not-italic">
									— {panel.title}
								</cite>
							)}
						</div>
					</div>
				);

			default:
				return (
					<div className="flex h-full items-center justify-center bg-gray-900">
						<p className="text-white">Unsupported panel type</p>
					</div>
				);
		}
	};

	return <div className="h-full w-full animate-fade-in">{renderContent()}</div>;
};
