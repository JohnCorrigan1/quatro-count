import {
  Text,
  View,
  StyleSheet,
  useColorScheme,
} from "react-native";
import React, {
  useContext,
  useEffect,
  useState,
} from "react";
import {
  useQuery,
  QueryClient,
} from "@tanstack/react-query";
import { Link } from "expo-router";
import { Pressable } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import Colors from "../constants/Colors";
import { useGroups } from "../app/lib/GroupContext";

export const GroupContainer = (props: any) => {
  const styles = StyleSheet.create({
    container: {
      display: "flex",
      height: "100%",
      width: "100%",
    },
  });

  const queryClient = new QueryClient();

  // useEffect(() => {
  //   const userGroups: any = queryClient.getQueryData([
  //     "currentUser",
  //   ]);
  //   // if (!userGroups) {
  //   // console.log("loading");
  //   // return;
  //   // }
  //   if (userGroups) setGroups(userGroups.groups);
  //   // setGroups(userGroups.groups);
  //   // console.log("ye", userGroups.groups);
  // }, [queryClient]);
  // const groups = useGroups();
  return (
    <View style={styles.container}>
      {props.groups?.map((group: any, index: any) => (
        <Group
          name={group.name}
          description={group.description}
          key={index}
        />
      ))}
    </View>
  );
};

type GroupProps = {
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
          <FontAwesome
            name="chevron-right"
            size={20}
            color={Colors[colorScheme ?? "light"].tint}
          />
        </View>
      </Pressable>
    </Link>
  );
};
