import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useRef } from "react";
import { ScreenLayout } from "../../components/layout/ScreenLayout";
import { screenHeight } from "../../constants/constants";
import { recommendations } from "../../constants/data";
import { globalStyles } from "../../constants/styles";
import Entypo from "@expo/vector-icons/Entypo";
import Fontisto from "@expo/vector-icons/Fontisto";
import { Vspacer } from "../../components/Vspacer";
import { LabelText } from "../../components/LabelText";
import { colors } from "../../constants/colors";
import AntDesign from "@expo/vector-icons/AntDesign";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import Feather from "@expo/vector-icons/Feather";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { BottomSheetModal } from "@gorhom/bottom-sheet";

const ListingDetails = () => {
  const data = recommendations[0]; // dummy

  const insets = useSafeAreaInsets();

  const moreImages = [
    "https://www.goldcoastprivateapartments.com.au/wp-content/uploads/2023/05/Modern-3-Bedroom-Apartment-jpg-1020x680.webp",
    "https://propscout.co.ke/storage/properties/files/modern-3-bedroom-apartment-plus-dsq-to-let-in-kilimani-s8l1o.jpg",
    "https://bestinvest.com.tr/wp-content/uploads/2024/01/DSC_7459.jpg",
    "https://bestinvest.com.tr/wp-content/uploads/2024/01/DSC_7459.jpg",
  ]; // dummy

  const listingAgent = {
    name: "Michael Angelo",
    image: "https://randomuser.me/api/portraits/men/11.jpg",
  };
  return (
    <ScreenLayout translucent>
      <View style={{ flex: 1 }}>
        <ScrollView>
          <View style={{ height: screenHeight * 0.45 }}>
            <Image
              source={{ uri: data.image }}
              style={{ width: "100%", height: "100%" }}
            />
            <View style={styles.header}>
              <Pressable style={styles.headerIconContainer}>
                <Entypo name="chevron-thin-left" size={16} color={"#fff"} />
              </Pressable>
              <Pressable style={styles.headerIconContainer}>
                <Fontisto name="heart-alt" size={16} color={"#fff"} />
              </Pressable>
            </View>
          </View>
          {/*  */}
          <Vspacer size={10} />
          <View
            style={{ paddingHorizontal: 20, gap: 10, ...globalStyles.flexRow }}
          >
            {moreImages.map((item, index) => (
              <Pressable key={index} style={{ height: 70, flex: 1 }}>
                <Image
                  source={{ uri: item }}
                  style={{ height: "100%", width: "100%", borderRadius: 10 }}
                />
              </Pressable>
            ))}
          </View>

          <Vspacer size={10} />
          <View style={{ paddingHorizontal: 20 }}>
            <View style={{ ...globalStyles.flexRowBtw }}>
              <LabelText
                title={data.category}
                style={{ color: colors.primary }}
              />

              <View style={styles.rating}>
                <AntDesign name="star" size={12} color={colors.amber} />
                <LabelText
                  title={data.rating.toString() + " (365 reviews)"}
                  style={{ color: colors.textSecondary }}
                />
              </View>
            </View>
            <Vspacer size={10} />
            <View style={{ gap: 10 }}>
              <LabelText
                title={data.title}
                style={{ ...globalStyles.font18SemiBold }}
              />
              <LabelText
                title={data.location}
                style={{ color: colors.textSecondary }}
              />
              <View style={{ ...globalStyles.flexRow, gap: 15 }}>
                <View style={{ ...globalStyles.flexRow, gap: 5 }}>
                  <View style={styles.infoIconContainer}>
                    <Ionicons
                      name="bed-outline"
                      size={18}
                      color={colors.iconPrimary}
                    />
                  </View>
                  <LabelText title={`${data.bedrooms} Beds`} />
                </View>
                <View style={{ ...globalStyles.flexRow, gap: 5 }}>
                  <View style={styles.infoIconContainer}>
                    <MaterialCommunityIcons
                      name="bathtub-outline"
                      size={16}
                      color={colors.iconPrimary}
                    />
                  </View>
                  <LabelText title={`${data.bathrooms} Bath`} />
                </View>
                <View style={{ ...globalStyles.flexRow, gap: 5 }}>
                  <View style={styles.infoIconContainer}>
                    <Feather
                      name="square"
                      size={16}
                      color={colors.iconPrimary}
                    />
                  </View>
                  <LabelText title={`${data.area}`} />
                </View>
              </View>
            </View>
            <View style={styles.separator} />
            <View>
              <LabelText
                title="Listing Agent"
                style={{ ...globalStyles.font14Semibold, fontSize: 15 }}
              />
              <Vspacer size={10} />
              <View style={{ ...globalStyles.flexRow, gap: 10 }}>
                <View style={{ flex: 1, ...globalStyles.flexRow, gap: 10 }}>
                  <Image
                    source={{
                      uri: "https://randomuser.me/api/portraits/men/11.jpg",
                    }}
                    style={{ height: 50, width: 50, borderRadius: 50 }}
                  />
                  <View>
                    <LabelText
                      title={listingAgent.name}
                      style={{ ...globalStyles.font14Semibold, fontSize: 15 }}
                    />
                    <LabelText
                      title="Partner"
                      style={{ color: colors.textSecondary }}
                    />
                  </View>
                </View>
                <View style={{ ...globalStyles.flexRow, gap: 10 }}>
                  <Pressable style={styles.listingAgentIconContainer}>
                    <Ionicons name="chatbox" size={20} color={colors.primary} />
                  </Pressable>
                  <Pressable style={styles.listingAgentIconContainer}>
                    <AntDesign name="phone" size={20} color={colors.primary} />
                  </Pressable>
                </View>
              </View>
            </View>
            <Vspacer size={10} />
            <View style={{ gap: 3 }}>
              <LabelText
                title="Overview"
                style={{ ...globalStyles.font14Semibold, fontSize: 15 }}
              />

              <LabelText
                title={
                  "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Vero, officiis hic. Asperiores minus tenetur eligendi?"
                }
                style={{ color: colors.textSecondary }}
              />
            </View>
          </View>
          <Vspacer size={50} />
        </ScrollView>
        <View style={{ ...styles.footer, paddingBottom: insets.bottom }}>
          <View style={{ flex: 2 }}>
            <LabelText
              title="Price"
              style={{
                ...globalStyles.font12Medium,
                color: colors.textSecondary,
              }}
            />
            <Vspacer size={2} />
            <Text
              style={{
                ...globalStyles.font20Semibold,

                color: colors.textPrimary,
              }}
            >
              ₦{data.price.toLocaleString()}{" "}
              <Text
                style={{
                  ...globalStyles.font12Medium,
                  color: colors.textSecondary,
                }}
              >
                /month
              </Text>
            </Text>
          </View>
          <Pressable style={styles.footerButton}>
            <LabelText
              title="Book Now"
              style={{ color: "#fff", ...globalStyles.font14Semibold }}
            />
          </Pressable>
        </View>
      </View>
    </ScreenLayout>
  );
};

export default ListingDetails;

const styles = StyleSheet.create({
  headerIconContainer: {
    height: 45,
    width: 45,
    borderRadius: 50,
    backgroundColor: "rgba(0,0,0,0.2)",
    ...globalStyles.allCenter,
  },
  header: {
    position: "absolute",
    width: "100%",
    top: 40,
    ...globalStyles.flexRowBtw,
    paddingHorizontal: 20,
  },
  rating: {
    ...globalStyles.flexRow,
    gap: 3,
  },
  infoIconContainer: {
    height: 30,
    width: 30,
    backgroundColor: colors.card,
    borderRadius: 10,
    ...globalStyles.allCenter,
  },
  separator: {
    marginVertical: 20,
    width: "100%",
    height: 0.5,
    backgroundColor: colors.border,
  },
  listingAgentIconContainer: {
    height: 40,
    width: 40,
    borderRadius: 40,
    backgroundColor: colors.card,
    ...globalStyles.allCenter,
  },
  footer: {
    paddingHorizontal: 20,
    borderTopWidth: 0.5,
    borderColor: colors.border,
    paddingTop: 15,

    ...globalStyles.flexRow,
    gap: 15,
  },
  footerButton: {
    flex: 1,
    height: 45,
    borderRadius: 10,
    backgroundColor: colors.primary,
    ...globalStyles.allCenter,
  },
});
