import { StatusBar } from "expo-status-bar";
import { Platform, Pressable, StyleSheet } from "react-native";
import { useState } from "react";
import { Text, View } from "../components/Themed";
import { TextInput } from "react-native-gesture-handler";
import { GroupsProvider } from "./lib/GroupContext";
import { useRouter } from "expo-router";

export default function ModalScreen() {
  return (
    <GroupsProvider>
      <View>
        {/* Use a light status bar on iOS to account for the black space above the modal */}
        <GroupForm />
        <StatusBar style={Platform.OS === "ios" ? "light" : "auto"} />
      </View>
    </GroupsProvider>
  );
}

const GroupForm = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const router = useRouter();

  function back() {
    router.push({
      pathname: "/",
      params: { name, description },
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
