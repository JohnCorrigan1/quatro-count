import { Text, View, StyleSheet } from "react-native";
import { Link } from "expo-router";
import { Pressable } from "react-native";

export const GroupContainer = () => {
  return (
    <View style={styles.container}>
      <Group
        name="name"
        description="this is a description"
      />
      <Group
        name="hackers"
        description="super chill hackers just hacking no cap"
      />
    </View>
  );
};

type GroupProps = {
  name: string;
  description: string;
};

const Group = (props: GroupProps) => {
  return (
    <Link href={`/${props.name}`} asChild>
      <Pressable>
        <View style={styles.group}>
          <View style={styles.text}>
            <Text style={styles.header}>{props.name}</Text>
            <Text style={styles.description}>
              {props.description}
            </Text>
          </View>
          <Text style={styles.header}>p</Text>
        </View>
      </Pressable>
    </Link>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    height: "100%",
    width: "100%",
  },
  header: {
    fontSize: 20,
    fontWeight: "500",
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
