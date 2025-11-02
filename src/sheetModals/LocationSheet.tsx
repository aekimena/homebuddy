import { Pressable, StyleSheet, Text, View } from "react-native";
import React, { forwardRef, useRef, useState } from "react";
import { SheetLayout } from "../components/layout/SheetLayout";
import {
  BottomSheetFlatList,
  BottomSheetScrollView,
} from "@gorhom/bottom-sheet";
import { LabelText } from "../components/LabelText";
import { globalStyles } from "../constants/styles";
import { locations } from "../constants/data";
import { ScrollView } from "react-native";
import { screenWidth } from "../constants/constants";
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import Feather from "@expo/vector-icons/Feather";
import { colors } from "../constants/colors";

export const LocationSheet = forwardRef(
  (
    {
      onSelectLocation,
    }: { onSelectLocation: (v: { city: string; state: string }) => void },
    ref
  ) => {
    const scrollRef = useRef<ScrollView>(null);
    const [selectedState, setSelectedState] = useState<string | null>(null);
    const [selectedCity, setSelectedCity] = useState<string | null>(null);

    const progress = useSharedValue(0); // 0 = state page, 1 = city page

    const statePageStyle = useAnimatedStyle(() => ({
      transform: [{ translateX: withTiming(-progress.value * screenWidth) }],
      opacity: withTiming(interpolate(progress.value, [0, 1], [1, 0])),
    }));

    const cityPageStyle = useAnimatedStyle(() => ({
      transform: [
        { translateX: withTiming(screenWidth - progress.value * screenWidth) },
      ],
      opacity: withTiming(interpolate(progress.value, [0, 1], [0, 1])),
    }));

    const handleSelectState = (state: string) => {
      setSelectedState(state);
      onSelectLocation({ state, city: null });
      // progress.value = 1; // animate to next page
      // scrollRef.current?.scrollTo({ x: screenWidth, animated: true });
    };

    const handleSelectCity = (city: string) => {
      setSelectedCity(city);
      // console.log({ state: selectedState, city });
      onSelectLocation({ state: selectedState, city });
      // 👉 Do something with selected location
      // e.g. onLocationSelected({ state: selectedState, city });
    };

    const handleGoBack = () => {
      progress.value = 0; // back to states
    };
    return (
      <SheetLayout snapPoints={["70%"]} ref={ref}>
        <BottomSheetScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          ref={scrollRef}
          pagingEnabled
          scrollEnabled={false}
        >
          {/* --- Page 1: States --- */}
          <Animated.View style={[styles.page, statePageStyle]}>
            <Text
              style={{
                ...globalStyles.font20Semibold,
                color: colors.black,
              }}
            >
              Select State
            </Text>
            <BottomSheetFlatList
              data={locations}
              keyExtractor={(item) => item.state}
              renderItem={({ item }) => (
                <Pressable
                  style={styles.stateItem}
                  onPress={() => handleSelectState(item.state)}
                >
                  <View style={styles.iconContainer}>
                    <Feather
                      name="map-pin"
                      size={16}
                      color={colors.iconPrimary}
                    />
                  </View>

                  <LabelText
                    title={item.state}
                    style={{ ...globalStyles.font16Medium }}
                  />
                </Pressable>
              )}
            />
          </Animated.View>
          {/* --- Page 2: Cities --- */}

          {/* <Animated.View style={[styles.page, cityPageStyle]}>
            <View style={{ ...globalStyles.flexRow, gap: 10 }}>
              <Pressable onPress={handleGoBack}>
                <Feather
                  name="chevron-left"
                  size={24}
                  color={colors.iconPrimary}
                />
              </Pressable>
              <Text
                style={{
                  ...globalStyles.font20Semibold,
                  color: colors.black,
                }}
              >
                Select City {selectedState ? `in ${selectedState}` : ""}
              </Text>
            </View>
            {selectedState && (
              <BottomSheetFlatList
                data={
                  locations.find((l) => l.state === selectedState)?.cities || []
                }
                keyExtractor={(item) => item}
                renderItem={({ item }) => (
                  <Pressable
                    style={{ padding: 20, paddingVertical: 15, width: "100%" }}
                    onPress={() => handleSelectCity(item)}
                  >
                    <LabelText
                      title={item}
                      style={{ ...globalStyles.font16Medium }}
                    />
                  </Pressable>
                )}
              />
            )}
          </Animated.View> */}
        </BottomSheetScrollView>
      </SheetLayout>
    );
  }
);

const styles = StyleSheet.create({
  page: {
    width: screenWidth,
    padding: 20,
    position: "absolute",
    top: 0,
    bottom: 0,
  },
  stateItem: {
    padding: 20,
    paddingVertical: 15,
    width: "100%",
    ...globalStyles.flexRow,
    gap: 10,
  },
  iconContainer: {
    height: 40,
    width: 40,
    borderRadius: 10,
    backgroundColor: colors.card,
    ...globalStyles.allCenter,
  },
});
