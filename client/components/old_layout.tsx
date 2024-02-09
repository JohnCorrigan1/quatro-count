import { Stack, Navigator, Slot } from "expo-router";
import { useColorScheme, Pressable } from "react-native";
import Colors from "../constants/Colors";
import { FontAwesome } from "@expo/vector-icons";
import { Link } from "expo-router";
import GroupPage from "../app/group";
import GroupSettingsPage from "../app/settings";

export default function GroupLayout() {
  //   const colorScheme = useColorScheme();

  // return <Stack></Stack>;
  return <Stack></Stack>;
  //   return (
  //     <>
  //     {
  //     // <Stack>
  //       /* <Stack.Screen
  //         name="[gid]"
  //         // component={GroupPage}
  //         options={{
  //           title: "Group",
  //           headerRight: () => (
  //             <Link
  //               //@ts-ignore
  //               href={{
  //                 pathname: "/groups/18/settings",
  //                 // params: { gid: route.params?.gid },
  //               }}>
  //               <Pressable>
  //                 {({ pressed }) => (
  //                   <FontAwesome
  //                     name="cog"
  //                     size={25}
  //                     color={
  //                       Colors[colorScheme ?? "light"].text
  //                     }
  //                     style={{
  //                       marginRight: 15,
  //                       opacity: pressed ? 0.5 : 1,
  //                     }}
  //                   />
  //                 )}
  //               </Pressable>
  //             </Link>
  //           ),
  //         }}
  //       />
  //       <Stack.Screen
  //         name="settings"
  //         // component={GroupSettingsPage}
  //         options={{
  //           title: "settings",
  //         }}
  //       /> */}
  //     // </Stack>
  //     </>
  //   );
  // }
}
