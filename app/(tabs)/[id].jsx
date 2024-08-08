import { Text } from "../../components/common/Text";
import {
  View,
  TouchableOpacity,
  Image,
  ScrollView,
  ImageBackground,
} from "react-native";
import React, { useEffect, useState } from "react";
import { FetchAnimeByAniwatchID, FetchAnimeByID } from "../../hooks/useApi";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { FontAwesome, FontAwesome6, Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import ReusableCarousel from "../../components/ReusableCarousel";

export default function Details() {
  const [data, setData] = useState(null);
  const [fullData, setFullData] = useState(null);
  const { id, title } = useLocalSearchParams();
  const router = useRouter();

  const MetaData = ["rating", "quality", "type"];

  useEffect(() => {
    const loadData = async () => {
      const Data = await FetchAnimeByAniwatchID(id);
      setFullData(Data);
      setData(Data.anime);
    };
    loadData();
  }, [id]);

  return (
    <ScrollView className="relative bg-[#eee]">
      <ImageBackground
        className="absolute w-full top-0 h-full"
        source={require("../../assets/images/body-background.png")}
      />
      <Stack.Screen
        options={{
          title: title.length > 30 ? title.substring(0, 30) + "..." : title,
          headerTitleStyle: {
            fontFamily: "Poppins700",
            fontSize: 16,
            color: "black",
          },
          headerTitleAlign: "center",
          headerStyle: {
            backgroundColor: "#eee",
            elevation: 0,
          },
          headerLeft: () => (
            <TouchableOpacity onPress={() => router.back()}>
              <FontAwesome name="chevron-left" size={20} color="black" />
            </TouchableOpacity>
          ),
          headerRight: () => (
            <TouchableOpacity onPress={() => router.push("")}>
              <FontAwesome6 name="ellipsis" size={25} color="black" />
            </TouchableOpacity>
          ),
        }}
      />
      {data && (
        <View className="relative flex-col gap-1 items-center">
          <View className="flex-1 flex-col items-center justify-between w-full mt-0 p-5">
            <View className="h-[450px] w-[320px] rounded-3xl border-8 border-indigo-400/20">
              <Image
                className="h-full w-full rounded-2xl"
                source={{ uri: data?.info?.poster }}
              />
            </View>
          </View>
          <View className="flex flex-col gap-3 w-[320] rounded-3xl bg-[#fff] border-8 border-indigo-400/20 box-content items-center p-5">
            <View className="flex flex-row items-center justify-between mr-1 gap-3">
              <Text
                style={{ fontSize: title.length > 12 ? 14 : 18, maxWidth: 140 }}
                weight="700"
              >
                {title}
              </Text>
              <View className="h-[70%] w-1 bg-zinc-700/30" />
              <View className="flex flex-row items-center gap-1">
                <Ionicons name="star" color={"indigo"} size={16} />
                <Text darkColor="indigo" weight="700" className="mt-1">
                  {data.moreInfo.malscore}
                </Text>
              </View>
            </View>
            <View className="flex flex-row gap-1 justify-center items-center">
              {data.moreInfo.genres.map(
                (genre, index) =>
                  index < 3 && (
                    <>
                      <Text key={genre} className="text-sm text-indigo-700">
                        {genre}
                      </Text>
                      {index < 2 && (
                        <View className="h-[5px] w-[5px] bg-indigo-700/20 rounded-[50]" />
                      )}
                    </>
                  )
              )}
            </View>
            <View className="relative flex flex-row justify-center items-center mt-2">
              <View className="flex flex-col items-center justify-center rounded-l-lg gap-1 h-[70] bg-[#eee] w-[45%]">
                <Text weight="700">{data.info.stats.episodes.sub}</Text>
                <Text>Episodes</Text>
              </View>
              <View className="absolute h-[30px] w-[2px] bg-indigo-700 rounded-[50]" />
              <View className="flex flex-col items-center justify-center gap-1 bg-[#eee] rounded-r-lg h-[70] w-[45%]">
                <Text weight="700">
                  {data.info.stats.duration.toString().slice(0, -1)} Min
                </Text>
                <Text>Per Ep</Text>
              </View>
            </View>
            <View className="flex flex-row gap-2 h-[30] justify-between">
              {MetaData.map((item) => (
                <View className="w-[28%] bg-[#eee] justify-center items-center rounded-md">
                  <Text weight="700">{data.info.stats[item]}</Text>
                </View>
              ))}
            </View>
            <View className="w-[90%]">
              <TouchableOpacity className="justify-center items-center w-full h-[45] bg-indigo-400 rounded-lg">
                <Text weight="600" darkColor="white">Watch Now!</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View className='flex flex-col gap-3 w-[320] rounded-3xl bg-[#fff] border-8 border-indigo-400/20 box-content items-center p-5' >
              <Text className='text-2xl' weight="700" >Recommendations</Text>
              <ReusableCarousel data={fullData?.recommendedAnimes} />
          </View>
        </View>
      )}
    </ScrollView>
  );
}
