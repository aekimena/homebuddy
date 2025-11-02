import {
  KeyboardType,
  StyleSheet,
  Text,
  TextInput,
  View,
  ViewStyle,
} from "react-native";
import React, { JSX } from "react";
import { globalStyles } from "../constants/styles";
import { useTheme } from "@rneui/themed";
import { LabelText } from "./LabelText";
import { Vspacer } from "./Vspacer";

export const CustomInput = ({
  placeholder,
  label,
  onChangeText,
  leftIcon,
  isError,
  errorMessage,
  style,
  keyboardType,
  multiLine,
  maxLength,
}: {
  placeholder?: string;
  label?: string;
  onChangeText: (v: string) => void;
  leftIcon?: JSX.Element;
  isError?: boolean;
  errorMessage?: string;
  style?: ViewStyle;
  keyboardType?: KeyboardType;
  multiLine?: boolean;
  maxLength?: number;
}) => {
  const { theme } = useTheme();
  return (
    <View>
      {label && (
        <>
          <LabelText title={label} style={{ color: theme.colors.grey1 }} />
          <Vspacer size={2} />
        </>
      )}

      <View
        style={{
          ...styles.container,
          ...globalStyles.flexRow,

          backgroundColor: theme.colors.white,

          ...style,
          // ...(multiLine ? { minHeight: 100, height: "auto" } : {}),

          height: multiLine ? 100 : 50,
          // paddingTop: multiLine ? 10 : 0,
        }}
      >
        {leftIcon && leftIcon}
        <View style={{ flex: 1 }}>
          <TextInput
            onChangeText={onChangeText}
            style={{
              height: "100%",
              backgroundColor: "transparent",
              ...globalStyles.font14Medium,
              color: theme.colors.black,
              textAlignVertical: multiLine ? "top" : "center",
            }}
            placeholder={placeholder}
            placeholderTextColor={theme.colors.grey3}
            multiline={multiLine}
            maxLength={maxLength || undefined}
            keyboardType={keyboardType || "default"}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...globalStyles.flexRow,
    gap: 5,

    borderRadius: 50,
    height: 50,
    width: "100%",
    paddingHorizontal: 15,
  },
});
