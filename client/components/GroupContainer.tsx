import {
  Text,
  View,
  StyleSheet,
  useColorScheme,
  ScrollView,
} from "react-native";
import { useRouter } from "expo-router";
import { Pressable } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import Colors from "@constants/Colors";
import { useQueryClient } from "@tanstack/react-query";

export const GroupContainer = (props: any) => {
  const styles = StyleSheet.create({
    container: {
      display: "flex",
      height: "100%",
      width: "100%",
    },
  });

  return (
    <ScrollView style={styles.container}>
      {props.groups?.map((group: GroupProps) => (
        <Group
          id={group.id}
          name={group.name}
          description={group.description}
          key={group.id}
        />
      ))}
    </ScrollView>
  );
};

type GroupProps = {
  id: number;
  name: string;
  description: string;
};

const Group = (props: GroupProps) => {
  const colorScheme = useColorScheme();

  const styles = StyleSheet.create({
    header: {
      fontSize: 20,
      fontWeight: "500",
      color: Colors[colorScheme ?? "light"].text,
    },
    group: {
      padding: 30,
      width: "100%",
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      borderBottomColor: "black",
      borderBottomWidth: 1,
    },
    text: {
      display: "flex",
      flexDirection: "column",
      gap: 5,
    },
    description: {
      fontSize: 14,
      color: "grey",
    },
  });
  const queryClient = useQueryClient();
  const router = useRouter();
  const navigateToGroup = () => {
    queryClient.setQueryData(["groupParams"], {
      name: props.name.replace(" ", "").toLowerCase(),
      gid: props.id,
    });
    router.push("/group");
  };

  return (
    <Pressable onPress={navigateToGroup}>
      <View style={styles.group}>
        <View style={styles.text}>
          <Text style={styles.header}>{props.name}</Text>
          <Text style={styles.description}>
            {props.description}
          </Text>
        </View>
        <FontAwesome
          name="chevron-right"
          size={20}
          color={Colors[colorScheme ?? "light"].text}
        />
      </View>
    </Pressable>
  );
};
