import { View, Image, Dimensions } from "react-native";
import React from "react";
import { FlashList } from "@shopify/flash-list";
import { Text } from "./common/Text";

const { width } = Dimensions.get("window");

const CarouselItem = ({ data }) => (
  <View className="flex-grow flex-col items-center justify-center gap-2" style={{ width }}>
    <Image
      className="h-[250px] w-[170px] rounded-2xl self-center border-4 border-indigo-400/20"
      source={{ uri: data.poster }}
    />
    <Text weight='600'>{data.name}</Text>
  </View>
);

const ReusableCarousel = ({ data }) => {
  return (
    <View className="h-[320px]">
      <FlashList
        data={data}
        horizontal
        renderItem={({ item }) => <CarouselItem data={item} />}
        estimatedItemSize={width}
        snapToAlignment="center"
        snapToInterval={width}
        decelerationRate="normal"
        pagingEnabled={true}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

export default ReusableCarousel;
