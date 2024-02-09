import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Link, Tabs, useNavigation } from "expo-router";
import {
  Pressable,
  useColorScheme,
  View,
} from "react-native";
import Colors from "../../constants/Colors";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>["name"];
  color: string;
}) {
  return (
    <FontAwesome
      size={28}
      style={{ marginBottom: -3 }}
      {...props}
    />
  );
}

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const groupParams = useQueryClient().getQueryData([
    "groupParams",
  ]);

  const parentLayout = useNavigation("");

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor:
          Colors[colorScheme ?? "light"].tint,
      }}>
      <Tabs.Screen
        name="index"
        initialParams={groupParams ?? {}}
        options={{
          title: "Expenses",
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="dollar" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="balances"
        initialParams={groupParams ?? {}}
        options={{
          title: "Balances",
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="money" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        initialParams={groupParams ?? {}}
        options={{
          title: "Settings",
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="cog" color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
