import { Stack, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import {
  View,
  Text,
  useColorScheme,
  Share,
  Platform,
} from "react-native";
import { basestyles } from "@lib/staticStyles";
import { Button } from "react-native-elements";
import { useUser } from "@clerk/clerk-expo";
import { apiUrl } from "@lib/api";

export default function GroupSettingsPage() {
  const [inviteLink, setInviteLink] = useState("");
  const { user } = useUser();
  const { name, gid } = useLocalSearchParams();
  const colorScheme = useColorScheme();

  const getInviteLink = async () => {
    const link = await fetch(`${apiUrl}groups/invite`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        clerk_id: user?.id,
        groupId: gid,
      }),
    });
    const data = await link.json();
    setInviteLink(data.link);
  };

  const shareInviteLink = async () => {
    await getInviteLink();
    if (Platform.OS !== "web") {
      await Share.share({
        message: `Join my group on focount bitch`,
        url: inviteLink,
      });
    }
  };

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <View style={basestyles.container}>
        <Text style={basestyles.title}>Group Settings</Text>
        <Text style={basestyles.title}>{gid}</Text>
        <Button
          title="Invite someone"
          onPress={shareInviteLink}
        />
        <Text style={basestyles.title}>
          Invite link: {inviteLink}
        </Text>
      </View>
    </>
  );
}
