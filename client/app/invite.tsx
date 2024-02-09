import { useEffect, useState } from "react";
import { useLocalSearchParams } from "expo-router";
import { View, Text } from "react-native";
import { basestyles } from "./lib/staticStyles";
import {
  QueryClient,
  useQueryClient,
} from "@tanstack/react-query";
import { Button } from "react-native-elements";

// type Invite = {
//   group_id: number;
//   invited_by_id: number;
// };

export default function InvitePage() {
  const { code } = useLocalSearchParams();
  const [inviteData, setInviteData] = useState<any>();

  const getInviteData = async () => {
    const data = await fetch(
      `http://127.0.0.1:5000/api/groups/invite/${code}`
    ).then((res) => res.json());
    setInviteData(data);
  };

  useEffect(() => {
    getInviteData();
  }, []);

  const queryClient = useQueryClient();
  const currentUser: any = queryClient.getQueryData([
    "currentUser",
  ]);

  const acceptInvite = async () => {
    if (!currentUser) return;
    await fetch(
      "http://127.0.0.1:5000/api/groups/invite/accept",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: currentUser?.id,
          groupId: inviteData?.group_id,
          username: currentUser?.username,
          groups: currentUser?.groups,
        }),
      }
    );
  };

  useEffect(() => {
    console.log("currentUser", currentUser);
  }, [currentUser]);

  console.log("currentUser", currentUser);

  // useEffect(() => {
  // if (!code) return;
  // console.log("code", code);
  // console.log("invite", getInviteData());
  // setInviteData(getInviteData());
  // console.log("inviteData", inviteData);
  // }, [code, inviteData]);

  return (
    <View style={basestyles.container}>
      <Text style={basestyles.title}>Invite Page</Text>
      <Text style={basestyles.title}>
        Group Id: {inviteData?.group_id}
      </Text>
      <Text style={basestyles.title}>
        Invited By: {inviteData?.invited_by_id}
      </Text>
      <Text style={basestyles.title}>{code}</Text>
      <Button onPress={acceptInvite} title="Accept" />
    </View>
  );
}
