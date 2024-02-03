import RNPickerSelect from "react-native-picker-select";
import { Text, View, StyleSheet } from "react-native";
import { FontAwesome } from "@expo/vector-icons";

export const FormDropdown = (props: any) => {
  return (
    <RNPickerSelect
      placeholder={{}}
      value={props.value}
      onValueChange={(value) => props.setValue(value)}
      items={props.items}>
      <View style={styles.dropdown}>
        <Text style={styles.label}>{props.value}</Text>
        <FontAwesome
          name="chevron-down"
          size={14}
          color="black"
        />
      </View>
    </RNPickerSelect>
  );
};

const styles = StyleSheet.create({
  dropdown: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    textAlign: "left",
    width: "80%",
  },
});
