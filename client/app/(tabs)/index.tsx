import type { CurrentUser } from "../lib/types";
import { basestyles } from "../lib/staticStyles";
import { GroupContainer } from "../../components/GroupContainer";
import { View, Text } from "../../components/Themed";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { AddGroupButton } from "../../components/AddGroupButton";
import { Redirect, useRouter } from "expo-router";
import { useUser } from "@clerk/clerk-expo";

export default function TabOneScreen() {
  const { isLoaded, isSignedIn, user } = useUser();
  const [groups, setGroups] = useState<any>([]);
  const router = useRouter();

  const getCurrentUser = async (): Promise<
    CurrentUser | undefined
  > => {
    const response = await fetch(
      `http://127.0.0.1:5000/api/users/${user?.id}`
    );
    if (response.ok) {
      return response.json();
    } else {
      router.push("/createaccount");
    }
  };

  const { isLoading, isError, data } = useQuery({
    queryKey: ["currentUser"],
    queryFn: getCurrentUser,
    enabled: !!user,
    retry: false,
  });

  useEffect(() => {
    if (isLoading) return;
    setGroups(data?.groups);
    console.log("user", user?.id);
  }, [data, user]);

  if (!isSignedIn && isLoaded) {
    return <Redirect href="/login" />;
  }

  return (
    <View style={basestyles.container}>
      {data?.groups.length === 0 ? (
        <Text style={basestyles.title}>
          You have no friends...
        </Text>
      ) : (
        <GroupContainer groups={groups} />
      )}
      <AddGroupButton />
    </View>
  );
}
