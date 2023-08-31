import { useNavigation } from "@react-navigation/native";
import AnimatedLottieView from "lottie-react-native";
import React, { useEffect, useLayoutEffect } from "react";
import { Image, ScrollView, View } from "react-native";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import {
	ActivityIndicator,
	Button,
	Divider,
	SegmentedButtons,
	Text
} from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { getPlacesData } from "../api";
import ItemCard from "../components/ItemCard";

const Discover = () => {
	const navigation = useNavigation();
	const [value, setValue] = React.useState("restaurants");
	const [isLoading, setIsLoading] = React.useState(false);
	const [mainData, setMainData] = React.useState([]);
	const [bl_lat, setBl_lat] = React.useState(null);
	const [bl_lng, setBl_lng] = React.useState(null);
	const [tr_lat, setTr_lat] = React.useState(null);
	const [tr_lng, setTr_lng] = React.useState(null);

	useLayoutEffect(() => {
		navigation.setOptions({
			headerShown: false
		});
	}, []);

	useEffect(() => {
		setIsLoading(true);
		getPlacesData(bl_lat, bl_lng, tr_lat, tr_lng, value).then((data) => {
			setMainData(data);
			setInterval(() => {
				setIsLoading(false);
			}, 2000);
		});
	}, [bl_lat, bl_lng, tr_lat, tr_lng, value]);

	return (
		<SafeAreaView className="flex-1 relative">
			<View className="flex-row items-center justify-between px-8 my-5">
				<View>
					<Text className="text-[36px] font-bold">Discover</Text>
					<Text className="text-[22px]">Mother nature today</Text>
				</View>

				<View className="w-12 h-12 bg-gray-400 rounded-full items-center justify-center shadow-lg shadow-black/90">
					<AnimatedLottieView
						autoPlay
						loop
						source={require("../assets/male-avatar.json")}
						style={{
							height: 70,
							width: 70,
							elevation: 5
						}}
					/>
				</View>
			</View>

			<View className="flex-row items-center my-4 bg-white mx-4 rounded-xl py-1 px-4 shadow-lg shadow-black/70">
				<GooglePlacesAutocomplete
					GooglePlacesDetailsQuery={{ fields: "geometry" }}
					placeholder="Search"
					fetchDetails={true}
					onPress={(data, details = null) => {
						// 'details' is provided when fetchDetails = true
						console.log(details?.geometry?.viewport);
						setBl_lat(details?.geometry.viewport?.southwest?.lat);
						setBl_lng(details?.geometry?.viewport?.southwest?.lng);
						setTr_lat(details?.geometry?.viewport?.northeast?.lat);
						setTr_lng(details?.geometry?.viewport?.northeast?.lng);
					}}
					query={{
						key: process.env.EXPO_PUBLIC_GoogleAPI,
						language: "en"
					}}
				/>
			</View>

			<Divider
				horizontalInset
				bold
			/>

			{/* Menu Container */}
			{isLoading ? (
				<View className="flex-1 items-center justify-center">
					<ActivityIndicator
						size={"large"}
						color={"#00b294"}
					/>
				</View>
			) : (
				<ScrollView>
					<View className="flex-row items-center justify-center px-5 mt-3">
						<SegmentedButtons
							value={value}
							multiSelect={true}
							onValueChange={setValue}
							density="regular"
							buttons={[
								{
									value: "restaurants",
									label: "Restaurants",
									icon: "food",
									showSelectedCheck: true
								},
								{
									value: "hotels",
									label: "Hotels",
									icon: "bed",
									showSelectedCheck: true
								},
								{
									value: "attractions",
									label: "Attractions",
									icon: "drama-masks",
									showSelectedCheck: true
								}
							]}
						/>
					</View>

					<View className="flex-row justify-between items-center px-4 mt-8">
						<Text className="text-[25px] font-bold">Top Picks</Text>
						<View
							style={{
								height: 2,
								backgroundColor: "#808080",
								width: 100
							}}></View>
						<Button
							mode="contained-tonal"
							icon={"arrow-right"}
							rippleColor={"#00b294"}
							contentStyle={{ flexDirection: "row-reverse" }}
							style={{ width: 130 }}
							onPress={() => console.log("Exploring")}>
							Explore
						</Button>
					</View>

					{/* Cards Place */}
					<View className="px-4 mt-8 flex-row items-center justify-evenly flex-wrap">
						{mainData?.length > 0 ? (
							<>
								{mainData?.map((data, i) => (
									<ItemCard
										key={i}
										imageSrc={
											data?.photo?.images?.medium?.url
												? data?.photo?.images?.medium?.url
												: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fthenounproject.com%2Fbrowse%2Ficons%2Fterm%2Fno-image%2F&psig=AOvVaw0i944ZfuEk973yzWBh7shL&ust=1693469255195000&source=images&cd=vfe&opi=89978449&ved=0CBAQjRxqFwoTCJjw2-H2g4EDFQAAAAAdAAAAABAE"
										}
										title={data?.name}
										location={data?.location_string}
										data={data}
									/>
								))}
							</>
						) : (
							<>
								<View className="w-full h-full items-center justify-center">
									<Image
										source={require("../assets/Error-bro.png")}
										className="w-[300] h-[300] object-cover"
									/>
								</View>
							</>
						)}
					</View>
				</ScrollView>
			)}
		</SafeAreaView>
	);
};

export default Discover;
