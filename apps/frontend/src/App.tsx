import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import AdminDashboard from "./pages/AdminDashboard";
import Gallery from "./pages/Gallery";
import Index from "./pages/Index";
import ListDetail from "./pages/ListDetail";
import Lists from "./pages/Lists";
import MapView from "./pages/MapView";
import NotFound from "./pages/NotFound";
import Story from "./pages/Story";

const queryClient = new QueryClient();

const App = () => (
	<QueryClientProvider client={queryClient}>
		<TooltipProvider>
			<Toaster />
			<Sonner />
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<Navigate to="/map" replace />} />
					<Route path="/map" element={<MapView />} />
					<Route path="/gallery" element={<Gallery />} />
					<Route path="/lists" element={<Lists />} />
					<Route path="/lists/:slug" element={<ListDetail />} />
					<Route path="/story/:slug" element={<Story />} />
					<Route path="/admin" element={<AdminDashboard />} />
					{/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
					<Route path="*" element={<NotFound />} />
				</Routes>
			</BrowserRouter>
		</TooltipProvider>
	</QueryClientProvider>
);

export default App;
