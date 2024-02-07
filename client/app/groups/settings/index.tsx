import {
  Stack,
  useLocalSearchParams,
  Link,
  useNavigation,
} from "expo-router";
import { useState } from "react";
import {
  View,
  Text,
  Pressable,
  useColorScheme,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import Colors from "../../../constants/Colors";
import { basestyles } from "../../lib/staticStyles";
import { Button } from "react-native-elements";
import { useUser } from "@clerk/clerk-expo";

export default function GroupSettingsPage() {
  const [inviteLink, setInviteLink] = useState("");
  const { user } = useUser();
  const { gid } = useLocalSearchParams();
  console.log("gid", gid);
  const colorScheme = useColorScheme();
  const parentLayout = useNavigation(`/groups`);

  const getInviteLink = async () => {
    console.log("user", user?.id, gid);
    const link = await fetch(
      "http://127.0.0.1:5000/api/groups/invite",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          clerk_id: user?.id,
          groupId: gid,
        }),
      }
    );
    console.log(link);
    const data = await link.json();
    console.log(data);
    setInviteLink(data.link);
  };

  return (
    <>
      <Stack.Screen
        options={{
          title: "settings",
        }}
      />
      <View style={basestyles.container}>
        <Text style={basestyles.title}>Group Settings</Text>
        <Text style={basestyles.title}>{gid}</Text>
        <Button
          title="Invite someone"
          onPress={getInviteLink}
        />
        <Text style={basestyles.title}>
          Invite link: {inviteLink}
        </Text>
      </View>
    </>
  );
}
