import { useEffect, useState } from "react";
import { useLocalSearchParams } from "expo-router";
import { View, Text } from "react-native";
import { basestyles } from "./lib/staticStyles";

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
    // if (!code) return;
    // console.log("code", code);
    // console.log("invite", getInviteData());
    // setInviteData(getInviteData());
    console.log("inviteData", inviteData);
  }, [code, inviteData]);

  return (
    <View style={basestyles.container}>
      <Text style={basestyles.title}>Invite Page</Text>
      <Text>Group Id: {inviteData?.group_id}</Text>
      <Text>Invited By: {inviteData?.invited_by_id}</Text>
      <Text>{code}</Text>
    </View>
  );
}
