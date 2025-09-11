import { useLocalSearchParams } from "expo-router";
import React from "react";
import { Text, View } from "react-native";

const MovieDetail = () => {
	const { id } = useLocalSearchParams();
	return (
		<View>
			<Text>MovieDetail {id}</Text>
		</View>
	);
};

export default MovieDetail;
