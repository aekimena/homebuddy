import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import React, { forwardRef, useCallback, useState } from "react";
import { SheetLayout } from "../components/layout/SheetLayout";
import { BottomSheetScrollView, BottomSheetView } from "@gorhom/bottom-sheet";
import { globalStyles } from "../constants/styles";
import { LabelText } from "../components/LabelText";
import AntDesign from "@expo/vector-icons/AntDesign";
import { colors } from "../constants/colors";
import { Vspacer } from "../components/Vspacer";
import { screenWidth } from "../constants/constants";
import { categories } from "../constants/data";
import { ScrollView } from "react-native-gesture-handler";
import RangeSlider from "rn-range-slider";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const Thumb = () => <View style={styles.thumb} />;
const Rail = () => <View style={styles.rail} />;
const RailSelected = () => <View style={styles.railSelected} />;
const Label = ({ text }: { text: string }) => (
  <View style={styles.label}>
    <Text style={styles.labelText}>{text}</Text>
  </View>
);
const Notch = () => <View style={styles.notch} />;

export const FilterSheet = forwardRef(({}: {}, ref) => {
  const [activeTab, setActiveTab] = useState(1);
  const [activeCategory, setActiveCategory] = useState("all");

  const MIN_PRICE = 300000;
  const MAX_PRICE = 10000000;

  const [priceRangeInput, setPriceRangeInput] = useState({
    min: MIN_PRICE,
    max: MAX_PRICE,
  });

  const [low, setLow] = useState(MIN_PRICE);
  const [high, setHigh] = useState(MAX_PRICE);

  const insets = useSafeAreaInsets();

  const handleValueChange = (lowValue: number, highValue: number) => {
    setLow(lowValue);
    setHigh(highValue);
  };

  return (
    <SheetLayout
      snapPoints={["100%"]}
      ref={ref}
      enableContentPanningGesture={false}
      enableHandlePanningGesture={false}
      enableOverDrag={false}
      enablePanDownToClose={false}
    >
      <View style={{ flex: 1 }}>
        <View style={styles.header}>
          <LabelText
            title="Filter"
            style={{ ...globalStyles.font16Semibold }}
          />
          <Pressable
            style={{ position: "absolute", right: 20 }}
            onPress={() => ref.current?.dismiss()}
          >
            <AntDesign name="close" size={20} color={colors.textPrimary} />
          </Pressable>
        </View>
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          keyboardVerticalOffset={
            Platform.OS === "ios" ? 90 : StatusBar.currentHeight || 20
          }
        >
          <BottomSheetScrollView keyboardShouldPersistTaps="always">
            {/* <Vspacer size={15} /> */}
            <View style={{ paddingHorizontal: 20, width: screenWidth }}>
              <Vspacer size={10} />
              <View style={styles.tabsContainer}>
                <Pressable
                  onPress={() => setActiveTab(1)}
                  style={{
                    ...styles.tab,
                    backgroundColor: activeTab == 1 ? "#fff" : "transparent",
                  }}
                >
                  <LabelText
                    title="Buy"
                    style={{
                      ...globalStyles.font14Semibold,
                      color:
                        activeTab == 1
                          ? colors.textPrimary
                          : colors.textSecondary,
                    }}
                  />
                </Pressable>
                <Pressable
                  onPress={() => setActiveTab(2)}
                  style={{
                    ...styles.tab,
                    backgroundColor: activeTab == 2 ? "#fff" : "transparent",
                  }}
                >
                  <LabelText
                    title="Sell"
                    style={{
                      ...globalStyles.font14Semibold,
                      color:
                        activeTab == 2
                          ? colors.textPrimary
                          : colors.textSecondary,
                    }}
                  />
                </Pressable>
                <Pressable
                  onPress={() => setActiveTab(3)}
                  style={{
                    ...styles.tab,
                    backgroundColor: activeTab == 3 ? "#fff" : "transparent",
                  }}
                >
                  <LabelText
                    title="Rent"
                    style={{
                      ...globalStyles.font14Semibold,
                      color:
                        activeTab == 3
                          ? colors.textPrimary
                          : colors.textSecondary,
                    }}
                  />
                </Pressable>
              </View>
              <Vspacer />
              <View>
                <ScrollView
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={{ gap: 10 }}
                >
                  {categories.map((item, index) => (
                    <Pressable
                      onPress={() => setActiveCategory(item.value)}
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
              <View pointerEvents="box-none">
                <View style={{ ...globalStyles.flexRowBtw }}>
                  <LabelText
                    title="Price"
                    style={{ ...globalStyles.font16Semibold, fontSize: 15 }}
                  />
                  <LabelText
                    title={`₦${low} - ₦${high}`}
                    style={{ ...globalStyles.font16Semibold }}
                  />
                </View>
                <Vspacer size={10} />
                <RangeSlider
                  min={MIN_PRICE}
                  max={MAX_PRICE}
                  step={10000}
                  floatingLabel
                  low={low}
                  high={high}
                  renderThumb={Thumb}
                  renderRail={Rail}
                  renderRailSelected={RailSelected}
                  renderLabel={(value) => <Label text={`${value}`} />}
                  renderNotch={Notch}
                  onValueChanged={handleValueChange}
                />
              </View>
              <Vspacer />
              <View>
                <LabelText
                  title="Area (sqft)"
                  style={{ ...globalStyles.font16Semibold, fontSize: 15 }}
                />
                <Vspacer size={5} />
                <View style={{ ...globalStyles.flexRow, gap: 15 }}>
                  <TextInput
                    style={styles.textinput}
                    placeholder="Min"
                    placeholderTextColor={colors.textSecondary}
                    keyboardType="number-pad"
                  />
                  <TextInput
                    style={styles.textinput}
                    placeholder="Max"
                    placeholderTextColor={colors.textSecondary}
                    keyboardType="number-pad"
                  />
                </View>
              </View>
              <Vspacer />
              <View>
                <LabelText
                  title="Plot (sqft)"
                  style={{ ...globalStyles.font16Semibold, fontSize: 15 }}
                />
                <Vspacer size={5} />
                <View style={{ ...globalStyles.flexRow, gap: 15 }}>
                  <TextInput
                    style={styles.textinput}
                    placeholder="Min"
                    placeholderTextColor={colors.textSecondary}
                    keyboardType="number-pad"
                  />
                  <TextInput
                    style={styles.textinput}
                    placeholder="Max"
                    placeholderTextColor={colors.textSecondary}
                    keyboardType="number-pad"
                  />
                </View>
              </View>
            </View>
            <Vspacer size={30} />
            <View style={{ ...styles.footer }}>
              <Pressable
                onPress={() => ref.current?.dismiss()}
                style={styles.footerBtn}
              >
                <LabelText
                  title="Apply Filter"
                  style={{ color: "#fff", ...globalStyles.font14Semibold }}
                />
              </Pressable>
            </View>
          </BottomSheetScrollView>
        </KeyboardAvoidingView>
      </View>
    </SheetLayout>
  );
});

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: 20,
    ...globalStyles.flexRowCenter,
    paddingVertical: 20,
    borderBottomWidth: 0.5,
    borderColor: colors.border,
  },
  tabsContainer: {
    height: 50,
    width: "100%",
    borderRadius: 10,
    backgroundColor: colors.card,
    ...globalStyles.flexRow,
    padding: 5,
  },
  tab: {
    flex: 1,
    height: "100%",
    backgroundColor: "#fff",
    ...globalStyles.allCenter,
    borderRadius: 10,
  },
  catrgoryBox: {
    paddingHorizontal: 20,
    paddingVertical: 9,
    borderRadius: 50,
  },
  markerStyle: {
    height: 20,
    width: 20,
    borderRadius: 20,
  },
  trackStyle: {
    height: 5,
    borderRadius: 5,
  },
  box: {
    paddingHorizontal: 20,
    paddingVertical: 7.5,
    borderRadius: 50,
  },
  container: {
    padding: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 10,
  },
  rail: {
    flex: 1,
    height: 4,
    borderRadius: 2,
    backgroundColor: "#ccc",
  },
  railSelected: {
    height: 4,
    backgroundColor: colors.primary,
    borderRadius: 2,
  },
  thumb: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: colors.primary,
    borderWidth: 2,
    borderColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
  },
  label: {
    alignItems: "center",
    padding: 4,
    backgroundColor: colors.primary,
    borderRadius: 4,
  },
  labelText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "600",
  },
  notch: {
    width: 8,
    height: 8,
    backgroundColor: colors.primary,
    transform: [{ rotate: "45deg" }],
  },
  valueContainer: {
    marginTop: 16,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  value: {
    fontSize: 16,
    fontWeight: "600",
  },
  textinput: {
    height: 50,
    flex: 1,
    borderRadius: 10,
    paddingHorizontal: 15,
    backgroundColor: colors.card,
    ...globalStyles.font14Medium,
    color: colors.textPrimary,
  },
  footer: {
    paddingHorizontal: 20,
    width: "100%",
  },
  footerBtn: {
    width: "100%",
    height: 50,
    borderRadius: 10,
    backgroundColor: colors.primary,
    ...globalStyles.allCenter,
  },
});
