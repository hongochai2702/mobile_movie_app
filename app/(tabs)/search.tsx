import MovieCard from "@/components/MovieCard";
import SearchBar from "@/components/SearchBar";
import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import { useFetch } from "@/hooks/useFetch";
import { fetchMovies } from "@/services/api";
import { updateSearchCount } from "@/services/appwrite";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, Image, Text, View } from "react-native";

const Search = () => {
	const [searchQuery, setSearchQuery] = useState<string>("");
	const router = useRouter();
	const {
		data: movies = [],
		loading,
		error,
		refetch: reFetchMovies,
		reset,
	} = useFetch(() => fetchMovies({ query: searchQuery }), false);

	useEffect(() => {
		const delayDebounceFn = setTimeout(
			async () => (searchQuery.trim() ? await reFetchMovies() : reset()),
			500
		);

		return () => clearTimeout(delayDebounceFn);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [searchQuery]);

	useEffect(() => {
		if (movies && movies?.length > 0 && movies[0]) {
			updateSearchCount(searchQuery, movies[0]);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [movies]);

	return (
		<View className="flex-1 bg-primary">
			<Image
				source={images.bg}
				className="absolute flex-1 w-full z-0"
				resizeMode="cover"
			/>
			<FlatList
				data={movies}
				renderItem={({ item }) => <MovieCard {...item} />}
				keyExtractor={(item) => item.id.toString()}
				numColumns={3}
				className="px-5"
				columnWrapperStyle={{
					justifyContent: "center",
					gap: 16,
					marginVertical: 16,
				}}
				contentContainerStyle={{ paddingBottom: 100 }}
				ListHeaderComponent={
					<>
						<View className="w-full flex-row justify-center mt-20 items-center">
							<Image source={icons.logo} className="w-12 h-10" />
						</View>

						{/* Search bar */}
						<View className="my-5">
							<SearchBar
								placeholder="Search movies..."
								value={searchQuery}
								onChangeText={setSearchQuery}
							/>
						</View>
						{loading && (
							<ActivityIndicator
								size="large"
								color="#0000ff"
								className="my-3"
							/>
						)}

						{error && (
							<Text className="text-red-500 px-5 my-3">
								Error: {error.message}
							</Text>
						)}

						{!loading && !error && searchQuery.trim() && movies?.length > 0 && (
							<Text className="text-xl text-white font-bold">
								Search Results for{` `}
								<Text className="text-darkAccent">{searchQuery}</Text>
							</Text>
						)}
					</>
				}
				ListEmptyComponent={
					!loading && !error ? (
						<View className="mt-10 px-5">
							<Text className="text-center text-gray-500">
								{searchQuery.trim() ? "No movies found" : "Search for a movie"}
							</Text>
						</View>
					) : null
				}
			/>
		</View>
	);
};

export default Search;
