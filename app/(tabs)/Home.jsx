import { Text } from "../../components/common/Text";
import {
  ImageBackground,
  Pressable,
  View,
  Image,
  TextInput,
  Dimensions,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import { FontAwesome6 } from "@expo/vector-icons";
import { FetchAniwatchHomePage } from "../../hooks/useApi";
import Carousel from "react-native-reanimated-carousel";
import { Link } from "expo-router";

const HomeScreen = () => {
  const [data, setData] = useState(null);
  const width = Dimensions.get("window").width;

  useEffect(() => {
    const loadData = async () => {
      const data = await FetchAniwatchHomePage();
      setData(data);
    };
    loadData();
  }, []);

  const MetaData = [
    { Emoji: "😍", Title: "Romance" },
    { Emoji: "😁", Title: "Comedy" },
    { Emoji: "😱", Title: "Horror" },
    { Emoji: "😚", Title: "Drama" },
  ];

  return (
    <View className="relative flex-1 bg-[#fff] py-10">
      <ImageBackground
        className="absolute inset-0 w-full h-full items-center justify-center"
        source={require("../../assets/images/body-background.png")}
        style={{ resizeMode: "cover" }}
      />
      <View className="relative flex-1 flex-col gap-5 p-5">
        <View className="flex flex-row justify-between items-center mt-5">
          <View className="flex flex-col gap-1">
            <Text weight="500">Welcome Ryan 👋</Text>
            <Text weight="700">Let's Relax and Watch a Anime !</Text>
          </View>
          <View>
            <Image
              className="rounded-full w-[50px] h-[50px]"
              source={require("../../assets/images/react-logo.png")}
            />
          </View>
        </View>
        <View className="relative mt-3 flex justify-center gap-5">
          <TextInput
            className="bg-slate-500/30 rounded-full h-[60px] pl-16 text-white"
            style={{ fontFamily: "Poppins600" }}
            placeholder="Search"
            placeholderTextColor={"grey"}
          />
          <FontAwesome6
            className="absolute left-5"
            size={24}
            name="magnifying-glass"
            color="white"
          />
        </View>
        <View>
          <View className="flex flex-row items-center justify-between mt-3 px-2">
            <Text className="text-xl" weight="600">
              Category
            </Text>
            <Text className="text-lg" weight="600" style={{ color: "orange" }}>
              See All{" "}
              <FontAwesome6 color="rgba(255,187,58,255)" name="chevron-right" />
            </Text>
          </View>
          <View className="flex flex-col gap-2 mt-5">
            <View className="flex flex-row items-center justify-between px-4">
              {MetaData.map((data) => (
                <View key={data.Emoji} className="flex flex-col gap-2">
                  <View className="flex items-center justify-center rounded-2xl h-[60px] w-[60px] bg-zinc-700/30">
                    <Text className="text-2xl">{data.Emoji}</Text>
                  </View>
                  <Text className="text-center">{data.Title}</Text>
                </View>
              ))}
            </View>
          </View>
        </View>
        <Text className="text-xl ml-2 mt-5" weight="600">
          Showing This Month
        </Text>
        {data && (
          <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            <Carousel
              loop
              width={width - 50}
              height={400}
              autoPlay={true}
              data={data.topAiringAnimes}
              scrollAnimationDuration={1000}
              mode="parallax"
              snapEnabled={true}
              renderItem={({ item }) => (
                <View
                  style={{
                    flex: 1,
                    justifyContent: "center",
                    borderRadius: 12,
                    marginHorizontal: 20,
                    position: "relative",
                  }}
                >
                  <Link
                    href={{
                      pathname: `/[id]`,
                      params: { id: item.id, title: item.name },
                    }}
                    asChild
                  >
                    <Pressable>
                      <Text
                        className="absolute top-2 right-4 text-2xl rounded-xl p-3 px-6 bg-[#eee]"
                        weight="700"
                      >
                        {item.type}
                      </Text>
                      <Image
                        style={{ height: 450 }}
                        className="w-full rounded-3xl -z-50"
                        source={{ uri: item.poster }}
                      />
                    </Pressable>
                  </Link>
                </View>
              )}
            />
          </View>
        )}
      </View>
    </View>
  );
};

export default HomeScreen;
