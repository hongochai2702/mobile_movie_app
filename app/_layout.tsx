import { Stack } from "expo-router";
import { Fragment } from "react";
import { StatusBar } from "react-native";
import "./globals.css";

export default function RootLayout() {
	return (
		<Fragment>
			<StatusBar hidden />
			<Stack>
				<Stack.Screen name="(tabs)" options={{ headerShown: false }} />
				<Stack.Screen name="movies/[id]" options={{ headerShown: false }} />
			</Stack>
		</Fragment>
	);
}
