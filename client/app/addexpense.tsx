import { StatusBar } from "expo-status-bar";
import {
  Platform,
  Pressable,
  StyleSheet,
} from "react-native";
import { useState } from "react";
import { Text, View } from "../components/Themed";
import { TextInput } from "react-native-gesture-handler";
import { useRouter } from "expo-router";
import Checkbox from "expo-checkbox";
import { useQueryClient } from "@tanstack/react-query";
import { FormDropdown } from "../components/FormDropdown";

export default function ModalScreen() {
  return (
    <View>
      <ExpenseForm />
      <StatusBar
        style={Platform.OS === "ios" ? "light" : "auto"}
      />
    </View>
  );
}

const ExpenseForm = () => {
  const queryClient = useQueryClient();
  const groupMembers = [
    { name: "Juicer", included: true },
    { name: "Juicer2", included: true },
    { name: "Juicer3", included: true },
  ];
  const [title, setTitle] = useState("");
  const [paidFor, setPaidFor] = useState(groupMembers);
  const [paidBy, setPaidBy] = useState("Juicer");
  const [amount, setAmount] = useState("0");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const router = useRouter();

  const updatePaidFor = (e: any) => {
    const updated = paidFor.map((member) => {
      if (member.name === e) {
        return { ...member, included: !member.included };
      }
      return member;
    });
    setPaidFor(updated);
    console.log(e);
  };

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
        placeholder="$0.00"
        inputMode="decimal"
        value={amount == "0" ? "" : amount}
        onChange={(e) => setAmount(e.nativeEvent.text)}
        style={styles.input}
      />
      <Text style={styles.label}>Paid By:</Text>
      <View style={styles.input}>
        <FormDropdown
          value={paidBy}
          setValue={setPaidBy}
          items={members}
        />
      </View>
      <Text style={styles.label}>Category (optional):</Text>
      <View style={styles.input}>
        <FormDropdown
          value={category}
          setValue={setCategory}
          items={categories}
        />
      </View>
      <Text style={styles.label}>Paid For:</Text>
      <View style={styles.checkboxGroup}>
        {paidFor.map((member) => (
          <View
            onTouchEnd={() => updatePaidFor(member.name)}
            key={member.name}
            style={styles.checkbox}>
            <View>
              <Text style={styles.label}>
                {member.name}
              </Text>
              <Checkbox value={member.included} />
            </View>
            <Text style={styles.label}>
              $
              {0
                ? amount == "0"
                : (
                    parseFloat(amount) / paidFor.length
                  ).toFixed(2)}
            </Text>
          </View>
        ))}
      </View>
      <Pressable>
        <Text style={styles.label} onPress={back}>
          Add
        </Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  checkboxGroup: {
    display: "flex",
    flexDirection: "column",
  },
  checkbox: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderWidth: 1,
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

const members = [
  { label: "Item 1", value: "item1" },
  {
    label: "Juicer",
    value: "Juicer",
  },
  { label: "Item 2", value: "item2" },
];

const categories = [
  { label: "Groceries", value: "Groceries" },
  {
    label: "Juice",
    value: "Juice",
  },
  { label: "other", value: "other" },
];