import { MapPin, Star } from "lucide-react";

interface Restaurant {
	id: string;
	name: string;
	cuisine: string;
	rating: number;
	distance: string;
	image: string;
	priceRange: string;
}

interface RestaurantCardsProps {
	restaurants?: Restaurant[];
}

export const RestaurantCards = ({ restaurants }: RestaurantCardsProps) => {
	// Mock data - in real app, this would come from props or API
	const mockRestaurants: Restaurant[] = [
		{
			id: "1",
			name: "Le Petit Bistro",
			cuisine: "French",
			rating: 4.8,
			distance: "0.2 km",
			image: "photo-1514933651103-005eec06c04b",
			priceRange: "€€€",
		},
		{
			id: "2",
			name: "Sushi Zen",
			cuisine: "Japanese",
			rating: 4.6,
			distance: "0.4 km",
			image: "photo-1579584425555-c3ce17fd4351",
			priceRange: "€€€€",
		},
		{
			id: "3",
			name: "Trattoria Roma",
			cuisine: "Italian",
			rating: 4.5,
			distance: "0.6 km",
			image: "photo-1555396273-367ea4eb4db5",
			priceRange: "€€",
		},
		{
			id: "4",
			name: "The Garden Café",
			cuisine: "Mediterranean",
			rating: 4.3,
			distance: "0.8 km",
			image: "photo-1517248135467-4c7edcad34c4",
			priceRange: "€€",
		},
	];

	const displayRestaurants = restaurants || mockRestaurants;

	return (
		<div className="h-full">
			<h3 className="mb-4 font-semibold text-gray-900 text-xl">
				Nearby Restaurants
			</h3>
			<div className="max-h-[calc(100vh-120px)] space-y-4 overflow-y-auto">
				{displayRestaurants.map((restaurant) => (
					<div
						key={restaurant.id}
						className="cursor-pointer rounded-lg border border-gray-200 bg-white p-4 transition-shadow duration-200 hover:shadow-md"
					>
						<div className="flex gap-3">
							<img
								src={`https://images.unsplash.com/${restaurant.image}?ixlib=rb-4.0.3&auto=format&fit=crop&w=80&h=80&q=80`}
								alt={restaurant.name}
								className="h-16 w-16 rounded-lg object-cover"
							/>
							<div className="flex-1">
								<h4 className="font-semibold text-gray-900 text-sm">
									{restaurant.name}
								</h4>
								<p className="mb-1 text-gray-600 text-xs">
									{restaurant.cuisine}
								</p>
								<div className="mb-1 flex items-center gap-2">
									<div className="flex items-center gap-1">
										<Star size={12} className="fill-current text-yellow-500" />
										<span className="text-gray-700 text-xs">
											{restaurant.rating}
										</span>
									</div>
									<span className="text-gray-500 text-xs">•</span>
									<span className="text-gray-600 text-xs">
										{restaurant.priceRange}
									</span>
								</div>
								<div className="flex items-center gap-1">
									<MapPin size={12} className="text-gray-400" />
									<span className="text-gray-600 text-xs">
										{restaurant.distance}
									</span>
								</div>
							</div>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};
