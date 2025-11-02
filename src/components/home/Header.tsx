import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { globalStyles } from "../../constants/styles";
import { LabelText } from "../LabelText";
import Entypo from "@expo/vector-icons/Entypo";
import { colors } from "../../constants/colors";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Fontisto from "@expo/vector-icons/Fontisto";
import { Vspacer } from "../Vspacer";
import { useSelector } from "react-redux";
import { selectLocation } from "../../storeServices/location/locationReducer";

export const Header = ({
  onPressLocation,
}: {
  onPressLocation: () => void;
}) => {
  const location = useSelector(selectLocation);
  return (
    <View style={styles.container}>
      <Pressable style={{ flex: 1 }} onPress={onPressLocation}>
        <View style={{ ...globalStyles.flexRow, gap: 3 }}>
          <LabelText
            title="Location"
            style={{
              ...globalStyles.font12Medium,
              color: colors.textSecondary,
              fontSize: 10.5,
            }}
          />
          <Entypo
            name="chevron-small-down"
            size={20}
            color={colors.iconSecondary}
          />
        </View>
        <Vspacer size={2} />
        <View style={{ ...globalStyles.flexRow, gap: 5 }}>
          <MaterialIcons name="location-pin" size={20} color={colors.primary} />
          <LabelText
            title={`${location?.state}, ${location?.country}`}
            style={{ ...globalStyles.font16Semibold }}
          />
        </View>
      </Pressable>
      <Pressable style={styles.iconContainer}>
        <Fontisto name="bell" size={18} color={colors.iconPrimary} />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  iconContainer: {
    height: 50,
    width: 50,
    borderRadius: 50,
    backgroundColor: colors.card,
    ...globalStyles.allCenter,
  },
  container: {
    ...globalStyles.flexRow,
    gap: 15,
    paddingTop: 15,
    paddingHorizontal: 20,
  },
});
