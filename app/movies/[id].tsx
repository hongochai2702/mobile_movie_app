import { icons } from "@/constants/icons";
import { useFetch } from "@/hooks/useFetch";
import { fetchMovieDetails } from "@/services/api";
import { router, useLocalSearchParams } from "expo-router";
import React from "react";
import {
	ActivityIndicator,
	Image,
	ScrollView,
	Text,
	TouchableOpacity,
	View,
} from "react-native";

interface MovieInfoProps {
	label: string;
	value?: string | number | null;
}
const MovieInfo: React.FC<MovieInfoProps> = ({ label, value }) => {
	return (
		<View className="flex-col items-start justify-center mt-5">
			<Text className="text-light-200 font-normal text-sm">{label}</Text>
			<Text className="text-light-100 font-bold text-sm mt-2">
				{value || "N/A"}
			</Text>
		</View>
	);
};

const MovieDetail = () => {
	const { id } = useLocalSearchParams();
	const { data: movie, loading } = useFetch<Movie>(() =>
		fetchMovieDetails(id as string)
	);

	if (loading) {
		return <ActivityIndicator size="large" color="#00ff00" />;
	}

	return (
		<View className="bg-primary flex-1">
			<ScrollView contentContainerStyle={{ paddingBottom: 80 }}>
				<View>
					<Image
						className="w-full h-[550px] object-stretch"
						resizeMode="stretch"
						source={{
							uri: `https://image.tmdb.org/t/p/w500/${movie?.poster_path}`,
						}}
					/>
				</View>
				<View className="flex-col items-start justify-center mt-5 px-5">
					<Text className="text-white font-bold text-xl">
						{movie?.title || "N/A"}
					</Text>
					<View className="flex-row items-center gap-x-1 mt-2">
						<Text className="text-sm text-light-200">
							{movie?.release_date?.split("-")?.[0]}
						</Text>
						<Text className="text-sm text-light-200">{movie?.runtime}m</Text>
					</View>
					<View className="flex-row items-center bg-dark-100 px-2 py-1 rounded-md gap-x-1 mt-2">
						<Image source={icons.star} className="size-4" />
						<Text className="text-white font-bold text-sm ">
							{Math.round(movie?.vote_average ?? 0)}/10
						</Text>
						<Text className="text-light-200 text-sm">
							({movie?.vote_count} votes)
						</Text>
					</View>
					<MovieInfo label="Overview" value={movie?.overview} />
					<MovieInfo
						label="Genres"
						value={movie?.genres?.map((item) => item.name).join(" - ") || "N/A"}
					/>
					<View className="flex-row justify-between w-1/2">
						<MovieInfo
							label="Budget"
							value={`$${(movie?.budget ?? 0) / 1_000_000} million`}
						/>
						<MovieInfo
							label="Revenue"
							value={`$${Math.round(movie?.revenue ?? 0) / 1_000_000}`}
						/>
					</View>
					<MovieInfo
						label="Production Companies"
						value={
							movie?.production_companies
								?.map((item) => item.name)
								.join(" - ") || "N/A"
						}
					/>
				</View>
			</ScrollView>
			<TouchableOpacity
				onPress={router.back}
				className="absolute bottom-5 left-0 right-0 mx-5 bg-darkAccent rounded-lg py-3.5 flex flex-row items-center justify-center z-50"
			>
				<Image
					source={icons.arrow}
					className="size-5 mr-1 mt-0.5 rotate-180"
					tintColor="#fff"
				/>
				<Text className="text-white font-semibold text-base">Go back</Text>
			</TouchableOpacity>
		</View>
	);
};

export default MovieDetail;
