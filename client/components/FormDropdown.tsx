import RNPickerSelect from "react-native-picker-select";
import { StyleSheet, useColorScheme } from "react-native";

export const FormDropdown = (props: any) => {
  const colorScheme = useColorScheme();
  return (
    <RNPickerSelect
      placeholder={{}}
      value={props.value}
      onValueChange={(value) => props.setValue(value)}
      darkTheme={colorScheme === "dark"}
      style={{
        chevronContainer: { display: "none" },
        modalViewBottom: {
          backgroundColor: "white",
        },
        modalViewMiddle: { backgroundColor: "white" },
        modalViewMiddleDark: { backgroundColor: "gray" },
        modalViewBottomDark: {
          backgroundColor: "black",
        },
        inputIOS: {
          color: "white",
        },
        inputAndroid: { color: "white" },
      }}
      items={props.items}></RNPickerSelect>
  );
};
