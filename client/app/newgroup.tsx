import type { CurrentUser } from "./lib/types";
import { StatusBar } from "expo-status-bar";
import {
  Platform,
  Pressable,
  StyleSheet,
} from "react-native";
import {
  useQueryClient,
  useMutation,
} from "@tanstack/react-query";
import { useState } from "react";
import { Text, View } from "../components/Themed";
import { TextInput } from "react-native-gesture-handler";
import { useRouter } from "expo-router";

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

  const postGroup = async () => {
    const currentUser: CurrentUser | undefined =
      await queryClient.getQueryData(["currentUser"]);

    return await fetch("http://127.0.0.1:5000/api/groups", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        description,
        userId: currentUser?.id,
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
    },
  });

  const router = useRouter();

  function back() {
    mutation.mutate();
    router.push({
      pathname: "/",
    });
  }
  return (
    <View style={styles.form}>
      <Text style={styles.label}>Group Name:</Text>
      <TextInput
        value={name}
        onChange={(e) => setName(e.nativeEvent.text)}
        style={styles.input}
      />
      <Text style={styles.label}>Description:</Text>
      <TextInput
        value={description}
        onChange={(e) => setDescription(e.nativeEvent.text)}
        style={styles.input}
      />
      <Pressable>
        <Text style={styles.label} onPress={back}>
          Add
        </Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
  input: {
    height: 40,
    width: "80%",
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  form: {
    width: "100%",
    height: "100%",
    padding: 20,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    textAlign: "left",
    width: "80%",
  },
});
