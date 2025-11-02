import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { ScreenLayout } from "../../components/layout/ScreenLayout";
import { Header } from "../../components/home/Header";
import { SearchInput } from "../../components/home/SearchInput";
import { Vspacer } from "../../components/Vspacer";
import { categories, recommendations } from "../../constants/data";
import { LabelText } from "../../components/LabelText";
import { colors } from "../../constants/colors";
import { globalStyles } from "../../constants/styles";
import { RecommendationsItem } from "../../components/home/RecommendationsItem";
import { ListingItem } from "../../components/home/ListingItem";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { LocationSheet } from "../../sheetModals/LocationSheet";
import { useDispatch } from "react-redux";
import { setLocation } from "../../storeServices/location/actions";
import DisclaimerModal from "../../modals/DisclaimerModal";
import { useNavigation } from "@react-navigation/native";
import { screenNames } from "../../navigation/routes";

const HomeScreen = () => {
  const [activeCategory, setActiveCategory] = useState("all");

  const [isModalVisible, setModalVisible] = useState(false);

  const locationSheetRef = useRef<BottomSheetModal>(null);
  const dispatch = useDispatch();

  const navigation = useNavigation();

  const onPressCategory = (str: string) => {
    // make api call here

    setActiveCategory(str);
  };

  const setNewLocation = (loc) => {
    dispatch(setLocation(loc));
    locationSheetRef.current?.dismiss();
  };

  useEffect(() => {
    setModalVisible(true);
  }, []);
  return (
    <ScreenLayout>
      <View style={{ flex: 1 }}>
        <ScrollView>
          {/* <Vspacer size={10} /> */}
          <Header onPressLocation={() => locationSheetRef.current?.present()} />
          <Vspacer size={10} />
          <Pressable
            style={{ paddingHorizontal: 20 }}
            onPress={() => navigation.navigate(screenNames.search)}
          >
            <SearchInput disabled onPressFilter={() => {}} />
          </Pressable>
          <Vspacer size={10} />

          <View>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ paddingHorizontal: 20, gap: 10 }}
            >
              {categories.map((item, index) => (
                <Pressable
                  onPress={() => onPressCategory(item.value)}
                  key={index}
                  style={{
                    backgroundColor:
                      activeCategory == item.value
                        ? colors.primary
                        : colors.card,
                    ...styles.catrgoryBox,
                  }}
                >
                  <LabelText
                    title={item.name}
                    style={{
                      color:
                        item.value == activeCategory
                          ? "#fff"
                          : colors.textSecondary,
                    }}
                  />
                </Pressable>
              ))}
            </ScrollView>
          </View>
          <Vspacer />
          <View>
            <View style={{ ...globalStyles.flexRowBtw, paddingHorizontal: 20 }}>
              <LabelText
                title="Recommendations"
                style={{ ...globalStyles.font16Semibold }}
              />
              <LabelText title="See All" style={{ color: colors.primary }} />
            </View>
            <Vspacer size={5} />
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ paddingHorizontal: 20, gap: 10 }}
            >
              {recommendations.slice(0, 5).map((item, index) => (
                <RecommendationsItem key={index} item={item} />
              ))}
            </ScrollView>
          </View>
          <Vspacer />
          <View>
            <View style={{ ...globalStyles.flexRowBtw, paddingHorizontal: 20 }}>
              <LabelText
                title="Nearby your location"
                style={{ ...globalStyles.font16Semibold }}
              />
              <LabelText title="See All" style={{ color: colors.primary }} />
            </View>
            <Vspacer size={5} />
            <View style={{ paddingHorizontal: 20, gap: 15 }}>
              {recommendations.slice(0, 3).map((item, index) => (
                <ListingItem key={index} item={item} />
              ))}
            </View>
          </View>
          <Vspacer />
        </ScrollView>
        <LocationSheet
          ref={locationSheetRef}
          onSelectLocation={(v) => {
            setNewLocation({ state: v.state, country: "Nigeria" });
          }}
        />
        <DisclaimerModal
          visible={isModalVisible}
          onClose={() => setModalVisible(false)}
        />
      </View>
    </ScreenLayout>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  catrgoryBox: {
    paddingHorizontal: 20,
    paddingVertical: 9,
    borderRadius: 50,
  },
});
