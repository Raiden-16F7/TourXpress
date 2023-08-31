import { useNavigation } from "@react-navigation/native";
import {
	Entypo,
	MaterialIcons,
	FontAwesome5,
	FontAwesome
} from "@expo/vector-icons";
import React, { useLayoutEffect } from "react";
import { Image, ScrollView, TouchableOpacity, View } from "react-native";
import { Button, Divider, IconButton, Surface, Text } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

const ItemScreen = ({ route }) => {
	const navigation = useNavigation();

	const data = route?.params?.param;

	useLayoutEffect(() => {
		navigation.setOptions({ headerShown: false });
	}, []);

	return (
		<ScrollView className="flex-1 px-4 py-6">
			<SafeAreaView className="flex-1 relative">
				{/* Image Section */}
				<View className="relative bg-white rounded-2xl shadow-lg shadow-black/80">
					<Image
						source={{
							uri: data?.photo?.images?.large?.url
								? data?.photo?.images?.large?.url
								: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fthenounproject.com%2Fbrowse%2Ficons%2Fterm%2Fno-image%2F&psig=AOvVaw0i944ZfuEk973yzWBh7shL&ust=1693469255195000&source=images&cd=vfe&opi=89978449&ved=0CBAQjRxqFwoTCJjw2-H2g4EDFQAAAAAdAAAAABAE"
						}}
						className="w-full h-72 object-cover rounded-2xl"
					/>

					{/* Image Buttons */}
					<View className="absolute flex-row inset-x-0 top-5 justify-between px-6">
						<IconButton
							icon={"arrow-left"}
							mode="contained"
							size={30}
							onPress={() => navigation.goBack()}
							className="-ml-1 "
						/>
						<IconButton
							icon={"heart"}
							mode="contained"
							containerColor="#fab6be"
							iconColor="#fc3d53"
							size={30}
							onPress={console.log("Yamate kudasi")}
						/>
					</View>

					{/* Price Section */}
					<View className="absolute flex-row bottom-5 justify-items-between">
						<View
							className="px-2 justify-center items-center py-1 rounded-md bg-yellow-100 h-9 w-[150] self-start -ml-10 -my-4 shadow-lg shadow-black/70"
							style={{ transform: [{ rotate: "-90deg" }] }}>
							<Text>{data?.open_now_text}</Text>
						</View>
						<Surface
							elevation={4}
							className="rounded-2xl w-[250] px-2 py-1 justify-end self-end items-end flex mr-4">
							<View className="flex-row space-x-2 items-center">
								<Text className="text-[13px] font-bold text-black-100">
									{data?.price_level}
								</Text>
								<Text className="text-[22px] font-bold text-black-100">
									{data?.price}
								</Text>
							</View>
						</Surface>
					</View>
				</View>

				<Divider
					horizontalInset
					bold
				/>

				{/* Title Section */}
				<View className="mt-6">
					<Text className="text-[#00b294] text-[24px] font-bold">
						{data?.name}
					</Text>
					<View className="flex-row items-center space-x-2 mt-2">
						<Entypo
							name="location"
							size={30}
							color="#00b294"
						/>
						<Text>{data?.location_string}</Text>
					</View>
				</View>

				<Divider
					className="mt-4"
					horizontalInset
					bold
				/>

				{/* Features Section */}
				<View className="mt-2 flex-row items-center justify-between">
					{data?.rating && (
						<View className="flex-row items-center space-x-2 rounded-2xl">
							<View className="w-12 h-12 rounded-2xl bg-red-100 items-center justify-center shadow-md shadow-black/50">
								<Entypo
									name="star"
									size={24}
									color={"#d58574"}
								/>
							</View>
							<View>
								<Text className="text-[#515151]">{data?.rating}</Text>
								<Text className="text-[#515151]">Ratings</Text>
							</View>
						</View>
					)}

					{data?.price_level && (
						<View className="flex-row items-center space-x-2">
							<View className="w-12 h-12 rounded-2xl bg-red-100 items-center justify-center shadow-md shadow-black/50">
								<MaterialIcons
									name="attach-money"
									size={24}
									color={"black"}
								/>
							</View>
							<View>
								<Text className="text-[#515151]">{data?.price_level}</Text>
								<Text className="text-[#515151]">Price Level</Text>
							</View>
						</View>
					)}

					{data?.bearing && (
						<View className="flex-row items-center space-x-2">
							<View className="w-12 h-12 rounded-2xl bg-red-100 items-center justify-center shadow-md shadow-black/50">
								<FontAwesome5
									name="map-signs"
									size={24}
									color={"black"}
								/>
							</View>
							<View>
								<Text className="text-[#515151] capitalize">
									{data?.bearing}
								</Text>
								<Text className="text-[#515151]">Bearing</Text>
							</View>
						</View>
					)}
				</View>
				{data?.description && (
					<Text className="mt-4 tracking-wide text-[16px] font-semibold text-[#97A6AF]">
						{data?.description}
					</Text>
				)}

				{data?.cuisine && (
					<View className="flex-row gap-2 items-center justify-start flex-wrap mt-4">
						{data?.cuisine.map((n) => (
							<TouchableOpacity
								key={n.key}
								className="px-2 py-1 rounded-md bg-emerald-100">
								<Text>{n.name}</Text>
							</TouchableOpacity>
						))}
					</View>
				)}

				<View className="space-y-2 mt-4 bg-gray-100 rounded-2xl px-4 py-2">
					{data?.phone && (
						<View className="items-center flex-row space-x-6">
							<FontAwesome
								name="phone"
								size={24}
								color={"#00b294"}
							/>
							<Text className="text-lg">{data?.phone}</Text>
						</View>
					)}
					{data?.email && (
						<View className="items-center flex-row space-x-6">
							<FontAwesome
								name="envelope"
								size={24}
								color={"#00b294"}
							/>
							<Text className="text-lg">{data?.email}</Text>
						</View>
					)}
					{data?.address && (
						<View className="items-center flex-row space-x-6">
							<FontAwesome
								name="map-pin"
								size={24}
								color={"#00b294"}
							/>
							<Text className="text-lg">{data?.address}</Text>
						</View>
					)}
					<Button
						className="mt-3 mb-3"
						mode="contained"
						onPress={() => console.log("Booked")}>
						Book Now
					</Button>
				</View>

				<View className="h-[100]"></View>
			</SafeAreaView>
		</ScrollView>
	);
};

export default ItemScreen;
