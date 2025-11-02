import { FlatList, StyleSheet, Text, View } from "react-native";
import React from "react";
import { ScreenLayout } from "../../components/layout/ScreenLayout";
import { LeftCenterHeader } from "../../components/LeftCenterHeader";
import { recommendations } from "../../constants/data";
import { WishlistItem } from "../../components/wishlist/WishlistItem";

const Wishlist = () => {
  return (
    <ScreenLayout>
      <View style={{ flex: 1 }}>
        <LeftCenterHeader title="Wishlist" />
        <FlatList
          data={recommendations}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <WishlistItem item={item} />}
          contentContainerStyle={{
            paddingHorizontal: 20,
            gap: 20,
            paddingTop: 15,
          }}
        />
      </View>
    </ScreenLayout>
  );
};

export default Wishlist;

const styles = StyleSheet.create({});
