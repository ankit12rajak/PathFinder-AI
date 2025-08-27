import { useEffect, useState, useRef } from "react";
import { Building, MapPin, Star, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import DashboardLayout from "@/components/DashboardLayout";
import { motion, AnimatePresence } from "framer-motion";

const trends = [
	{
		title: "Engineering Demand",
		data: [
			{ field: "Computer Science", demand: "Very High", growth: "+12%", top: "IIT Bombay", avg: "₹22 LPA" },
			{ field: "Mechanical", demand: "Moderate", growth: "+5%", top: "IIT Delhi", avg: "₹12 LPA" },
		],
	},
	{
		title: "Medical Trends",
		data: [
			{ field: "MBBS", demand: "High", growth: "+8%", top: "AIIMS Delhi", avg: "₹15 LPA" },
			{ field: "Dentistry", demand: "Stable", growth: "+2%", top: "Maulana Azad", avg: "₹8 LPA" },
		],
	},
	{
		title: "Management Placements",
		data: [
			{ field: "MBA", demand: "Very High", growth: "+15%", top: "IIM Ahmedabad", avg: "₹28 LPA" },
			{ field: "BBA", demand: "Growing", growth: "+7%", top: "NMIMS Mumbai", avg: "₹6 LPA" },
		],
	},
];

const CollegeInsights = () => {
	const [selectedFilter, setSelectedFilter] = useState("all");
	const [searchTerm, setSearchTerm] = useState("");
	const [colleges, setColleges] = useState<any[]>([]);
	const [searchResults, setSearchResults] = useState<any[]>([]);
	const [showDropdown, setShowDropdown] = useState(false);
	const searchRef = useRef<HTMLInputElement>(null);

	useEffect(() => {
		fetch("http://localhost:3001/api/colleges/top")
			.then((res) => res.json())
			.then((data) => setColleges(data));
	}, []);

	// Search API call with debounce
	useEffect(() => {
		if (!searchTerm) {
			setSearchResults([]);
			setShowDropdown(false);
			return;
		}
		const timer = setTimeout(() => {
			fetch(`http://localhost:3001/api/colleges/search?q=${encodeURIComponent(searchTerm)}`)
				.then((res) => res.json())
				.then((data) => {
					setSearchResults(data);
					setShowDropdown(true);
				});
		}, 300);
		return () => clearTimeout(timer);
	}, [searchTerm]);

	// Handle dropdown selection
	const handleSelectCollege = (college: any) => {
		setColleges([college]);
		setSearchTerm(college.name);
		setShowDropdown(false);
	};

	// Filter logic
	const filteredColleges = colleges.filter((college) => {
		const matchesSearch =
			college.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
			(college.location && college.location.toLowerCase().includes(searchTerm.toLowerCase()));
		if (selectedFilter === "all") return matchesSearch;
		if (selectedFilter === "engineering")
			return (
				matchesSearch &&
				college.courses?.some((course) => course.includes("Computer") || course.includes("Electrical") || course.includes("Mechanical"))
			);
		if (selectedFilter === "medical") return matchesSearch && college.courses?.some((course) => course.includes("MBBS") || course.includes("MD"));
		if (selectedFilter === "management") return matchesSearch && college.courses?.some((course) => course.includes("MBA"));
		if (selectedFilter === "law") return matchesSearch && college.courses?.some((course) => course.includes("LLB") || course.includes("LLM"));
		return matchesSearch;
	});

	return (
		<DashboardLayout
			title="College Insights Hub"
			description="Comprehensive college analysis, trends, and placement insights"
		>
			<div className="p-6 space-y-8">
				{/* Search and Filters */}
				<div className="flex flex-col md:flex-row gap-4 relative">
					<div className="flex-1 relative">
						<Input
							ref={searchRef}
							placeholder="Search colleges by name or location..."
							value={searchTerm}
							onChange={(e) => {
								setSearchTerm(e.target.value);
								setShowDropdown(true);
							}}
							className="w-full"
							autoComplete="off"
							onFocus={() => searchResults.length > 0 && setShowDropdown(true)}
							onBlur={() => setTimeout(() => setShowDropdown(false), 200)}
						/>
						{/* Animated Dropdown */}
						<AnimatePresence>
							{showDropdown && searchResults.length > 0 && (
								<motion.ul
									initial={{ opacity: 0, y: 10 }}
									animate={{ opacity: 1, y: 0 }}
									exit={{ opacity: 0, y: 10 }}
									transition={{ duration: 0.2 }}
									className="absolute z-10 w-full bg-white/70 backdrop-blur-md border rounded-lg shadow-lg mt-2 max-h-64 overflow-auto"
								>
									{searchResults.map((college, idx) => (
										<li
											key={college.id || idx}
											className="px-4 py-2 cursor-pointer hover:bg-blue-50 text-black"
											onMouseDown={() => handleSelectCollege(college)}
										>
											<span className="font-medium">{college.name}</span>
											<span className="text-xs text-muted-foreground ml-2">{college.location}</span>
										</li>
									))}
								</motion.ul>
							)}
						</AnimatePresence>
					</div>
					<Select value={selectedFilter} onValueChange={setSelectedFilter}>
						<SelectTrigger className="w-full md:w-48">
							<SelectValue placeholder="Filter by stream" />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="all">All Streams</SelectItem>
							<SelectItem value="engineering">Engineering</SelectItem>
							<SelectItem value="medical">Medical</SelectItem>
							<SelectItem value="management">Management</SelectItem>
							<SelectItem value="law">Law</SelectItem>
						</SelectContent>
					</Select>
				</div>

				<Tabs defaultValue="colleges" className="space-y-6">
					<TabsList className="grid w-full grid-cols-3">
						<TabsTrigger value="colleges">Top Colleges</TabsTrigger>
						<TabsTrigger value="trends">Market Trends</TabsTrigger>
						<TabsTrigger value="analytics">Analytics</TabsTrigger>
					</TabsList>

					<TabsContent value="colleges" className="space-y-6">
						<div className="grid gap-6">
							{filteredColleges.map((college) => (
								<motion.div
									key={college.id}
									initial={{ opacity: 0, y: 20 }}
									animate={{ opacity: 1, y: 0 }}
									exit={{ opacity: 0, y: 20 }}
									transition={{ duration: 0.3 }}
								>
									<Card className="hover:shadow-lg transition-shadow">
										<CardHeader>
											<div className="flex items-start justify-between">
												<div>
													<CardTitle className="flex items-center gap-2">
														<Building className="w-5 h-5" />
														{college.name}
														<Badge variant="secondary">#{college.ranking}</Badge>
													</CardTitle>
													<CardDescription className="flex items-center gap-2 mt-1">
														<MapPin className="w-4 h-4" />
														{college.location} • {college.type}
													</CardDescription>
												</div>
												<div className="flex items-center gap-1">
													<Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
													<span className="font-semibold">{college.rating}</span>
												</div>
											</div>
										</CardHeader>
										<CardContent>
											<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
												<div className="space-y-1">
													<div className="text-sm text-muted-foreground">Annual Fees</div>
													<div className="font-semibold">{college.fees}</div>
												</div>
												<div className="space-y-1">
													<div className="text-sm text-muted-foreground">Avg Package</div>
													<div className="font-semibold text-green-600">{college.averagePlacement}</div>
												</div>
												<div className="space-y-1">
													<div className="text-sm text-muted-foreground">Highest Package</div>
													<div className="font-semibold text-blue-600">{college.highestPlacement}</div>
												</div>
												<div className="space-y-1">
													<div className="text-sm text-muted-foreground">Placement Rate</div>
													<div className="flex items-center gap-2">
														<Progress value={college.placementRate} className="flex-1" />
														<span className="text-sm font-semibold">{college.placementRate}%</span>
													</div>
												</div>
											</div>

											<div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
												<div className="text-center">
													<div className="text-sm text-muted-foreground">Infrastructure</div>
													<div className="font-semibold">{college.infrastructure}/5</div>
												</div>
												<div className="text-center">
													<div className="text-sm text-muted-foreground">Faculty</div>
													<div className="font-semibold">{college.faculty}/5</div>
												</div>
												<div className="text-center">
													<div className="text-sm text-muted-foreground">Placements</div>
													<div className="font-semibold">{college.placements}/5</div>
												</div>
												<div className="text-center">
													<div className="text-sm text-muted-foreground">Campus Life</div>
													<div className="font-semibold">{college.campusLife}/5</div>
												</div>
											</div>

											<div className="space-y-3">
												<div>
													<div className="text-sm font-medium mb-1">Popular Courses</div>
													<div className="flex flex-wrap gap-1">
														{college.courses?.map((course: string, idx: number) => (
															<Badge key={idx} variant="outline">
																{course}
															</Badge>
														))}
													</div>
												</div>
												<div>
													<div className="text-sm font-medium mb-1">Top Recruiters</div>
													<div className="flex flex-wrap gap-1">
														{college.topRecruiters?.slice(0, 4).map((recruiter: string, idx: number) => (
															<Badge key={idx} variant="secondary">
																{recruiter}
															</Badge>
														))}
													</div>
												</div>
											</div>

											<div className="flex gap-2 mt-4">
												<Button
													variant="outline"
													size="sm"
													onClick={() => window.open(college.website, "_blank")}
												>
													View Details
												</Button>
												<Button
													variant="outline"
													size="sm"
													onClick={() => window.open(college.applyLink, "_blank")}
												>
													Apply Now
												</Button>
												<Button variant="outline" size="sm">
													Compare
												</Button>
											</div>
										</CardContent>
									</Card>
								</motion.div>
							))}
						</div>
					</TabsContent>

					<TabsContent value="trends" className="space-y-6">
						<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
							{trends.map((trend, index) => (
								<Card key={index}>
									<CardHeader>
										<CardTitle className="flex items-center gap-2">
											<TrendingUp className="w-5 h-5" />
											{trend.title}
										</CardTitle>
									</CardHeader>
									<CardContent>
										<div className="space-y-3">
											{trend.data.map((item, idx) => (
												<div key={idx} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
													<div>
														<div className="font-medium">{item.field}</div>
														{item.demand && (
															<div className="text-sm text-muted-foreground">Demand: {item.demand}</div>
														)}
														{item.avg && (
															<div className="text-sm text-muted-foreground">Average: {item.avg}</div>
														)}
													</div>
													<div className="text-right">
														{item.growth && <div className="font-semibold text-green-600">{item.growth}</div>}
														{item.top && <div className="text-sm font-medium text-blue-600">{item.top}</div>}
													</div>
												</div>
											))}
										</div>
									</CardContent>
								</Card>
							))}
						</div>
					</TabsContent>

					<TabsContent value="analytics" className="space-y-6">
						<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
							<Card>
								<CardHeader>
									<CardTitle className="text-lg">Placement Success Rate</CardTitle>
								</CardHeader>
								<CardContent>
									<div className="text-3xl font-bold text-green-600 mb-2">94.2%</div>
									<div className="text-sm text-muted-foreground">Average across top 100 colleges</div>
								</CardContent>
							</Card>

							<Card>
								<CardHeader>
									<CardTitle className="text-lg">Average Package Growth</CardTitle>
								</CardHeader>
								<CardContent>
									<div className="text-3xl font-bold text-blue-600 mb-2">+18.5%</div>
									<div className="text-sm text-muted-foreground">Year-over-year increase</div>
								</CardContent>
							</Card>

							<Card>
								<CardHeader>
									<CardTitle className="text-lg">Top Hiring Sectors</CardTitle>
								</CardHeader>
								<CardContent>
									<div className="space-y-2">
										<div className="flex justify-between">
											<span className="text-sm">Technology</span>
											<span className="text-sm font-semibold">42%</span>
										</div>
										<div className="flex justify-between">
											<span className="text-sm">Consulting</span>
											<span className="text-sm font-semibold">28%</span>
										</div>
										<div className="flex justify-between">
											<span className="text-sm">Finance</span>
											<span className="text-sm font-semibold">18%</span>
										</div>
									</div>
								</CardContent>
							</Card>
						</div>
					</TabsContent>
				</Tabs>
			</div>
		</DashboardLayout>
	);
};

export default CollegeInsights;
