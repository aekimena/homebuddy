import { Pressable, StyleSheet, Text, View } from "react-native";
import React, { useRef } from "react";
import { ScreenLayout } from "../../components/layout/ScreenLayout";
import { screenHeight } from "../../constants/constants";
import { colors } from "../../constants/colors";
import { globalStyles } from "../../constants/styles";
import { LabelText } from "../../components/LabelText";
import Entypo from "@expo/vector-icons/Entypo";
import { Vspacer } from "../../components/Vspacer";
import { SearchInput } from "../../components/home/SearchInput";
import BottomSheet, {
  BottomSheetFlatList,
  BottomSheetModal,
} from "@gorhom/bottom-sheet";
import { recommendations } from "../../constants/data";
import { ListingItem } from "../../components/home/ListingItem";
import MapView from "react-native-maps";
import { useDispatch, useSelector } from "react-redux";
import { selectLocation } from "../../storeServices/location/locationReducer";
import { setLocation } from "../../storeServices/location/actions";
import { LocationSheet } from "../../sheetModals/LocationSheet";
import { FilterSheet } from "../../sheetModals/FilterSheet";

const SearchScreen = () => {
  const location = useSelector(selectLocation);

  const filterSheetRef = useRef<BottomSheetModal>(null);

  const locationSheetRef = useRef<BottomSheetModal>(null);
  const dispatch = useDispatch();

  const setNewLocation = (loc) => {
    dispatch(setLocation(loc));
    locationSheetRef.current?.dismiss();
  };
  return (
    <ScreenLayout translucent statusBarBackgroundColor="transparent">
      <View style={{ flex: 1 }}>
        <View
          style={{
            flex: 1,
            backgroundColor: colors.iconSecondary,
          }}
        >
          <MapView
            style={{ height: "100%", width: "100%" }}
            initialRegion={{
              latitude: 37.78825,
              longitude: -122.4324,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
          />

          <View style={styles.floatingBox}>
            <View style={styles.box}>
              <Pressable
                style={{ ...globalStyles.flexRow, gap: 5 }}
                onPress={() => locationSheetRef.current?.present()}
              >
                <LabelText
                  title={`${location?.state}, ${location?.country}`}
                  style={{ ...globalStyles.font14Semibold }}
                />
                <Entypo
                  name="chevron-small-down"
                  size={20}
                  color={colors.iconPrimary}
                />
              </Pressable>
              <Vspacer size={5} />
              <SearchInput
                onPressFilter={() => filterSheetRef.current?.present()}
              />
            </View>
          </View>
        </View>
        <BottomSheet
          snapPoints={["50%", "90%"]}
          index={0}
          enableDynamicSizing={false}
          enablePanDownToClose={false}
          backgroundStyle={{
            borderTopRightRadius: 20,
            borderTopLeftRadius: 20,
          }}
          handleIndicatorStyle={{
            width: 70,
            backgroundColor: colors.iconSecondary,
          }}
        >
          <BottomSheetFlatList
            data={recommendations}
            renderItem={({ item }) => <ListingItem item={item} />}
            contentContainerStyle={styles.flatlist}
            keyExtractor={(item) => item?.id}
          />
        </BottomSheet>
        <LocationSheet
          ref={locationSheetRef}
          onSelectLocation={(v) => {
            setNewLocation({ state: v.state, country: "Nigeria" });
          }}
        />
        <FilterSheet ref={filterSheetRef} />
      </View>
    </ScreenLayout>
  );
};

export default SearchScreen;

const styles = StyleSheet.create({
  floatingBox: {
    paddingHorizontal: 20,
    position: "absolute",
    top: 70,
    width: "100%",
  },
  box: {
    padding: 15,
    borderRadius: 10,
    backgroundColor: colors.white,
    elevation: 3,
    shadowColor: "#000",
  },
  flatlist: {
    paddingHorizontal: 20,
    gap: 20,
    paddingTop: 15,
    paddingBottom: 50,
  },
});
