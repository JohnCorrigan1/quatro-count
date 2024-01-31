import {
  StyleSheet,
  Pressable,
  useColorScheme,
} from "react-native";
import { GroupContainer } from "../../components/GroupContainer";
import { View } from "../../components/Themed";
import { FontAwesome } from "@expo/vector-icons";
import { Link } from "expo-router";
import Colors from "../../constants/Colors";
import { useEffect } from "react";
import { useGroupDispatch } from "../lib/GroupContext";
import { useLocalSearchParams } from "expo-router";
import {
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

export default function TabOneScreen() {
  const queryClient = useQueryClient();

  const getCurrentUser = async () => {
    return await fetch(
      "http://127.0.0.1:5000/api/users/1"
    ).then((res) => res.json());
  };

  const { isLoading, isError, data } = useQuery({
    queryKey: ["currentUser"],
    queryFn: getCurrentUser,
  });

  useEffect(() => {
    if (isLoading) {
      console.log("loading...");
      return;
    }
    if (isError) {
      console.log("error...");
      return;
    }
    console.log(data);
  }, [data]);

  const colorScheme = useColorScheme();

  const groupStyles = StyleSheet.create({
    addGroup: {
      display: "flex",
      position: "absolute",
      bottom: 50,
      right: 30,
      borderRadius: 50,
      height: 60,
      width: 60,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: Colors[colorScheme ?? "light"].tint,
    },
  });

  //get params from router from another page
  const dispatch = useGroupDispatch();
  const params = useLocalSearchParams();
  const { name, description } = params;
  useEffect(() => {
    if (!name || !description) return;
    if (name == "" || description == "") return;
    dispatch({
      type: "add",
      payload: {
        name,
        description,
      },
    });
  }, [params]);

  return (
    <View style={styles.container}>
      <GroupContainer />
      <Link
        style={groupStyles.addGroup}
        href="/newgroup"
        asChild>
        <Pressable>
          {({ pressed }) => (
            <FontAwesome
              name="plus"
              size={32}
              color={Colors[colorScheme ?? "light"].text}
            />
          )}
        </Pressable>
      </Link>
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
  icon: {
    color: "white",
    backgroundColor: "blue",
  },
});
