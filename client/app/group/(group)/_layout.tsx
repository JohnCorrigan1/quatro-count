import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Stack, Tabs, useNavigation } from "expo-router";
import { useColorScheme } from "react-native";
import Colors from "../../../constants/Colors";
import { useQueryClient } from "@tanstack/react-query";

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
        // headerShown: false,
        title: "Group",
        headerTitle: "Grouper",
        tabBarActiveTintColor:
          Colors[colorScheme ?? "light"].tint,
      }}>
      <Tabs.Screen
        name="expenses"
        initialParams={groupParams ?? {}}
        options={{
          // headerShown: false,
          headerTitle: "Expenses",
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
          headerTitle: "Balances",
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
