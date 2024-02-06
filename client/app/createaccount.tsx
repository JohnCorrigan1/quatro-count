import { useState } from "react";
import { StyleSheet } from "react-native";
import { Text, View } from "../components/Themed";
import { TextInput } from "react-native-gesture-handler";
import { formStyles } from "./lib/staticStyles";
import { Button } from "react-native-elements";
import { useUser } from "@clerk/clerk-expo";
import { useRouter } from "expo-router";

export default function CreateAccountScreen() {
  const router = useRouter();
  const { user } = useUser();
  const [username, setUsername] = useState("");

  const createUser = async () => {
    if (username.length === 0 || !user) {
      return;
    }
    const response = await fetch(
      "http://127.0.0.1:5000/api/users",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          clerk_id: user.id,
          username: username,
        }),
      }
    );
    if (response.ok) {
      console.log("User created");
      router.replace("/");
    }
  };
  return (
    <View style={styles.container}>
      {/* <SignIn /> */}
      {/* <Text style={styles.title}>Account page</Text> */}
      <Text style={formStyles.label}>
        Set a Display Username:
      </Text>
      <TextInput
        onChange={(e) => setUsername(e.nativeEvent.text)}
        style={formStyles.input}
        inputMode="text"
        placeholder="Username"
      />
      <Button title="Save" onPress={createUser} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
