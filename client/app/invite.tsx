import { useEffect, useState } from "react";
import {
  useLocalSearchParams,
  useRouter,
} from "expo-router";
import { useUser } from "@clerk/clerk-expo";
import { View, Text } from "react-native";
import { basestyles } from "./lib/staticStyles";
import type { CurrentUser } from "./lib/types";
import {
  QueryClient,
  useQueryClient,
  useQuery,
} from "@tanstack/react-query";
import { Button } from "react-native-elements";

// type Invite = {
//   group_id: number;
//   invited_by_id: number;
// };

export default function InvitePage() {
  const { code } = useLocalSearchParams();
  const [inviteData, setInviteData] = useState<any>();
  const router = useRouter();
  const { user } = useUser();

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
  const getCurrentUser = async (): Promise<
    CurrentUser | undefined
  > => {
    const response = await fetch(
      `http://127.0.0.1:5000/api/users/${user?.id}`
    );
    if (response.ok) {
      // console.log(response.json());
      return response.json();
    } else {
      console.log("not ok");
      router.push("/createaccount");
    }
  };

  const { isLoading, isError, data } = useQuery({
    queryKey: ["currentUser"],
    queryFn: getCurrentUser,
    enabled: !!user,
    retry: false,
  });

  const acceptInvite = async () => {
    if (!data) return;
    await fetch(
      "http://127.0.0.1:5000/api/groups/invite/accept",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: data?.id,
          groupId: inviteData?.group_id,
          username: data?.username,
          currentGroups: data?.groups,
        }),
      }
    );
  };

  useEffect(() => {
    console.log("currentUser", data);
  }, [data]);

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
