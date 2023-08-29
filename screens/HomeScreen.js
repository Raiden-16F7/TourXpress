import { View, Text } from 'react-native'
import React, { useLayoutEffect } from 'react'
import { useNavigation } from '@react-navigation/native'
import { SafeAreaView } from 'react-native-safe-area-context';
import LottieView from 'lottie-react-native';
import { FAB } from 'react-native-paper';
import * as Animatable from 'react-native-animatable';

const HomeScreen = () => {
    const navigation = useNavigation();
  
    useLayoutEffect(()=>{
        navigation.setOptions({
            headerShown: false,
        })
    },[])
  return (
    <SafeAreaView className="flex-1 relative">

      {/*First Section */}
        <View className="flex-row px-6 mt-8 items-center space-x-2">
          <View className="w-16 h-16 bg-neutral-950 rounded-full items-center justify-center">
            <Text className="text-white text-2xl font-semibold">Go</Text>
          </View>
          <Text className="text-3xl font-semibold">Travel</Text>
        </View>

      {/**Second Section */}
      <View className="px-6 mt-8 space-y-6">
        <Text className="text-[30px]">Enjoy Your Trips with </Text>
      <Text style={{fontFamily:'Barkhi', fontSize:34, color:"#00b294",textAlign:'left',alignSelf:'flex-start'}}>TOURXPRESS</Text>
        <Text style={{textAlign:'justify'}}>
        Welcome to TourXpress - Get ready to embark on a seamless and immersive travel experience, where every destination is just a tap away. Let's turn your travel dreams into reality!"
      </Text>
      </View>

      
        
      {/**Circle Section */}
      <View className="w-[320px] h-[320px] bg-[#00b294] rounded-full absolute bottom-36 -right-36"></View>
      <View className="w-[340px] h-[340px] bg-[#000] rounded-full absolute -bottom-28 -left-36"></View>

{/**Lottie animation */}
      <View className="flex-1 items-center" >
      <LottieView
        source={require("../assets/animation_lluzn7c8.json")}
        autoPlay
        loop={false}
        style={{
          width: 350,
          height: 350,
        }} />
        </View>

      {/**Button */}
      <Animatable.View animation={"pulse"} easing={"ease-in-out"} iterationCount={"infinite"} className=" items-end my-12 mr-8">
      <FAB
          mode='elevated'
          className="bg-[#6df0da]"
          size='medium'
          color='#000'
          variant='primary'
          rippleColor={'#00b294'}
        icon={"plus"} 
        onPress={()=>navigation.navigate("Discover")}
        label='Explore'
        />
        </Animatable.View>
    </SafeAreaView>
  )
}

export default HomeScreen