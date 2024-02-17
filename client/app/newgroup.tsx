import type { CurrentUser } from "@lib/types";
import { formStyles } from "@lib/staticStyles";
import { StatusBar } from "expo-status-bar";
import { Platform } from "react-native";
import {
  useQueryClient,
  useMutation,
} from "@tanstack/react-query";
import { useState } from "react";
import { Text, View } from "@components/Themed";
import { TextInput } from "react-native-gesture-handler";
import { useRouter } from "expo-router";
import { Button } from "react-native-elements";
import { apiUrl } from "@lib/api";

export default function ModalScreen() {
  return (
    <View>
      {/* Use a light status bar on iOS to account for the black space above the modal */}
      <GroupForm />
      <StatusBar
        style={Platform.OS === "ios" ? "light" : "auto"}
      />
    </View>
  );
}

const GroupForm = () => {
  const queryClient = useQueryClient();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [buttonDisabled, setButtonDisabled] =
    useState(false);

  const postGroup = async () => {
    const currentUser: CurrentUser | undefined =
      await queryClient.getQueryData(["currentUser"]);
    console.log("before post group", currentUser);

    return await fetch(`${apiUrl}groups`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        description,
        userId: currentUser?.id,
        username: currentUser?.username,
        currentGroups: currentUser?.groups.map(
          (group) => group.id
        ),
      }),
    }).then((res) => res.json());
  };

  const mutation = useMutation({
    mutationFn: postGroup,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["currentUser"],
      });
      router.back();
    },
  });

  const router = useRouter();

  function back() {
    mutation.mutate();
  }
  return (
    <View style={formStyles.form}>
      <Text style={formStyles.label}>Group Name:</Text>
      <TextInput
        value={name}
        onChange={(e) => setName(e.nativeEvent.text)}
        style={formStyles.input}
      />
      <Text style={formStyles.label}>Description:</Text>
      <TextInput
        value={description}
        onChange={(e) => setDescription(e.nativeEvent.text)}
        style={formStyles.input}
      />
      <Button
        title="Add"
        onPress={back}
        disabled={buttonDisabled}
      />
    </View>
  );
};
