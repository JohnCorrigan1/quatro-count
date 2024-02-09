import { Stack, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { View, Text, useColorScheme } from "react-native";
import { basestyles } from "../lib/staticStyles";
import { Button } from "react-native-elements";
import { useUser } from "@clerk/clerk-expo";
import { useQuery } from "@tanstack/react-query";

export default function GroupSettingsPage() {
  const [inviteLink, setInviteLink] = useState("");
  const { user } = useUser();
  const { name, gid } = useLocalSearchParams();
  const colorScheme = useColorScheme();

  // const groupParams = useQuery({
  //   queryKey: ["groupParams"],
  //   queryFn: () => {
  //     console.log("name", name, "gid", gid);
  //     return { name, gid };
  //   },
  // });

  // const parentLayout = useNavigation(`/group`);

  const getInviteLink = async () => {
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
