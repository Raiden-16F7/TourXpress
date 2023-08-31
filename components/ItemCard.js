import { Entypo } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Text, View } from "react-native";
import { Card, TouchableRipple } from "react-native-paper";

const ItemCard = ({ imageSrc, title, location, data }) => {
	const navigation = useNavigation();
	return (
		<TouchableRipple
			onPress={() => console.log("Pressed")}
			rippleColor="rgba(0, 0, 0, .32)">
			<Card
				className="space-y-2 my-5 w-[182]"
				mode="outlined"
				onPress={() => navigation.navigate("ItemScreen", { param: data })}>
				<Card.Cover
					source={{ uri: imageSrc }}
					style={{ height: 170, width: 182, resizeMode: "contain" }}
				/>
				<Card.Title
					title={title?.length > 14 ? `${title.slice(0, 14)}..` : title}
				/>
				<Card.Content>
					<View className="flex-row items-center space-x-1">
						<Entypo
							name="location"
							size={20}
							color="#00b294"
						/>
						<Text variant="titleLarge">
							{location?.length > 18 ? `${title.slice(0, 18)}..` : location}
						</Text>
					</View>
				</Card.Content>
			</Card>
		</TouchableRipple>
	);
};

export default ItemCard;
