import { StatusBar } from "expo-status-bar";
import { Platform, Pressable, StyleSheet } from "react-native";
import { useState } from "react";
import { Text, View } from "../components/Themed";
import { TextInput } from "react-native-gesture-handler";
import { GroupsProvider } from "./lib/GroupContext";
import { useRouter } from "expo-router";
import Checkbox from "expo-checkbox";
import RNPickerSelect from "react-native-picker-select";
import { FontAwesome } from "@expo/vector-icons";

export default function ModalScreen() {
  return (
    <GroupsProvider>
      <View>
        {/* Use a light status bar on iOS to account for the black space above the modal */}
        <ExpenseForm />
        <StatusBar style={Platform.OS === "ios" ? "light" : "auto"} />
      </View>
    </GroupsProvider>
  );
}

const ExpenseForm = () => {
  const [title, setTitle] = useState("");
  const [paidFor, setPaidFor] = useState([]);
  const [paidBy, setPaidBy] = useState("Juicer");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  const router = useRouter();

  function back() {
    router.push({
      pathname: "/",
      params: { title, description },
    });
  }
  return (
    <View style={styles.form}>
      <Text style={styles.label}>Expense Label:</Text>
      <TextInput
        value={title}
        inputMode="text"
        onChange={(e) => setTitle(e.nativeEvent.text)}
        style={styles.input}
      />
      <Text style={styles.label}>Amount:</Text>
      <TextInput
        inputMode="numeric"
        value={amount}
        onChange={(e) => setAmount(e.nativeEvent.text)}
        style={styles.input}
      />
      <Text style={styles.label}>Paid By:</Text>
      <View style={styles.input}>
        <RNPickerSelect
          value={paidBy}
          onValueChange={(value) => setPaidBy(value)}
          items={[
            { label: "Item 1", value: "item1" },
            {
              label: "Juicer",
              value: "Juicer",
            },
            { label: "Item 2", value: "item2" },
          ]}
          pickerProps={{
            accessibilityLabel: "select who paid for the expense",
          }}
        >
          <View style={styles.dropdown}>
            <Text style={styles.label}>{paidBy}</Text>
            <FontAwesome name="chevron-down" size={14} color="black" />
          </View>
        </RNPickerSelect>
      </View>
      <Text style={styles.label}>Category (optional):</Text>
      <View style={styles.input}>
        <RNPickerSelect
          value={category}
          onValueChange={(value) => setCategory(value)}
          items={[
            { label: "Groceries", value: "Groceries" },
            {
              label: "Juice",
              value: "Juice",
            },
            { label: "other", value: "other" },
          ]}
          pickerProps={{
            accessibilityLabel: "Select the expense category.",
          }}
        >
          <View style={styles.dropdown}>
            <Text style={styles.label}>{category}</Text>
            <FontAwesome name="chevron-down" size={14} color="black" />
          </View>
        </RNPickerSelect>
      </View>
      <Text style={styles.label}>Paid For:</Text>
      <Checkbox value={isChecked} onValueChange={setIsChecked} />
      <Pressable>
        <Text style={styles.label} onPress={back}>
          Add
        </Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  dropdown: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
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
