import * as z from "zod";
import { coordsSchema } from "../util/coords.js";

const StoryPanelData = z.object({
	id: z.string(),
	type: z.enum(["text", "image", "video", "quote"]),
	title: z.optional(z.string()),
	content: z.optional(z.string()),
	media: z.optional(z.string()),
	altText: z.optional(z.string()),
	caption: z.optional(z.string()),
	slug: z.optional(z.string()),
	duration: z.optional(z.number()),
	orderIndex: z.number(),
});

export type StoryPanelData = z.infer<typeof StoryPanelData>;

const StoryList = z.object({
	id: z.string(),
	name: z.string(),
	slug: z.optional(z.string()),
	thumbnail: z.optional(z.string()),
});

export type StoryList = z.infer<typeof StoryList>;

const Story = z.object({
	id: z.string(),
	title: z.string(),
	author: z.string(),
	subtitle: z.optional(z.string()),
	handle: z.optional(z.string()),
	publishedAt: z.date(),
	firstVisit: z.optional(z.string()),
	lastVisit: z.optional(z.string()),
	panels: z.array(StoryPanelData),
	thumbnail: z.optional(z.string()),
	thumbnailPanelId: z.optional(z.number()),
	rating: z.optional(z.number()),
	username: z.optional(z.string()),
	tags: z.optional(z.array(z.string())),
	address: z.optional(z.string()),
	description: z.optional(z.string()),
	geo: z.optional(coordsSchema),
});

export type Story = z.infer<typeof Story>;
