import { icons } from "@/constants/icons";
import { Link } from "expo-router";
import React, { FC } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";

type MovieCardProps = Movie & {};
const MovieCard: FC<MovieCardProps> = ({
	id,
	poster_path,
	title,
	vote_average,
	release_date,
}) => {
	return (
		<Link href={`/movies/${id}`} asChild>
			<TouchableOpacity className="w-[30%]">
				<Image
					resizeMode="cover"
					className="w-full h-52 rounded-lg"
					source={{
						uri: poster_path
							? `https://image.tmdb.org/t/p/w500${poster_path}`
							: "https://placehold.co/600x400/1a1a1a/ffffff.png",
					}}
				/>
				<Text className="text-sm text-white font-bold mt-2" numberOfLines={1}>
					{title}
				</Text>
				<View className="flex-row items-center justify-start gap-x-1">
					<Image className="size-4" source={icons.star} />
					<Text className="text-white text-xs font-bold">
						{Math.round(vote_average / 2)}
					</Text>
				</View>
				<View className="flex-row justify-between items-center">
					<Text className="text-xs text-light-300 font-medium mt-1">
						{release_date?.split("-")[0]}
					</Text>
					{/* <Text className="text-xs font-medium text-light-300 uppercase">
						Movie
					</Text> */}
				</View>
			</TouchableOpacity>
		</Link>
	);
};

export default MovieCard;
