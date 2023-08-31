import axios from "axios";

export const getPlacesData = async (bl_lat, bl_lng, tr_lat, tr_lng, value) => {
	try {
		const {
			data: { data }
		} = await axios.get(
			`https://travel-advisor.p.rapidapi.com/${value}/list-in-boundary`,
			{
				params: {
					bl_latitude: bl_lat ? bl_lat : "34.5776326",
					tr_latitude: tr_lat ? tr_lat : "36.4408483",
					bl_longitude: bl_lng ? bl_lng : "138.2991098",
					tr_longitude: tr_lng ? tr_lng : "141.2405144",
					restaurant_tagcategory_standalone: "10591",
					restaurant_tagcategory: "10591",
					limit: "30",
					currency: "PKR",
					open_now: "true",
					lunit: "km",
					lang: "en_US"
				},
				headers: {
					"X-RapidAPI-Key": process.env.EXPO_PUBLIC_RapidAPI,
					"X-RapidAPI-Host": "travel-advisor.p.rapidapi.com"
				}
			}
		);
		return data;
	} catch (error) {
		return null;
	}
};
