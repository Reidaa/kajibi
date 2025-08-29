import * as z from "zod";

export const coordsSchema = z
	.union([
		z
			.object({
				lat: z.union([
					z.literal(90).meta({ description: "the North pole" }),
					z.literal(-90).meta({ description: "the South pole" }),
				]),
				lng: z
					.undefined()
					.meta({ description: "longitude must be undefined at the poles" }),
			})
			.meta({ description: "a point at the North or South pole" }),
		z
			.object({
				lat: z.number().gt(-90).lt(90).meta({
					description:
						"a measure of distance North (positive) or South (negative) of the Equator (zero degrees)",
				}),
				lng: z.number().gt(-180).lte(180).meta({
					description:
						"a measure of distance East (positive) or West (negative) of the Prime Meridian (zero degrees)",
				}),
			})
			.meta({ description: "a non-polar point on the globe" }),
	])
	.meta({
		description:
			"a pair of numbers that uniquely identify a point on the globe",
	});
