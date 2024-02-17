import { useColorScheme, StyleSheet } from "react-native";
import { TextInput } from "react-native-gesture-handler";
type TxtInputProps = {
  placeholder?: string;
  value: string;
  setValue: (text: string) => void;
  keyboardType?: "numeric" | "default";
  styles?: any;
};

export const TxtInput = (props: TxtInputProps) => {
  const colorScheme = useColorScheme();
  const styles = StyleSheet.create({
    txtInput: {
      height: 40,
      margin: 12,
      borderWidth: 1,
      borderColor:
        colorScheme === "dark" ? "white" : "black",
      width: "80%",
      padding: 10,
      color: colorScheme === "dark" ? "white" : "black",
      borderRadius: 5,
    },
    ...props.styles,
  });

  return (
    <TextInput
      style={[styles.txtInput, props.styles]}
      placeholder={props.placeholder}
      value={props.value}
      onChangeText={(text) => props.setValue(text)}
      keyboardType={props.keyboardType}
    />
  );
};
