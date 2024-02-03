import { StatusBar } from "expo-status-bar";
import {
  Platform,
  Pressable,
  StyleSheet,
} from "react-native";
import {
  type Group,
  type Expense,
  CurrentUser,
} from "./lib/types";
import { useState, useEffect } from "react";
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

  type PaidBy = {
    username: string;
    groupMemberId: number;
  };

  type PaidFor = {
    username: string;
    groupMemberId: number;
    included: boolean;
  };

  const [title, setTitle] = useState("");
  const [paidFor, setPaidFor] = useState<any>(null);
  const [paidBy, setPaidBy] = useState<any>(null);
  const [paidByMap, setPaidByMap] = useState<any>(null);
  const [amount, setAmount] = useState("0");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const router = useRouter();
  const groupData = queryClient.getQueryData<Group>([
    "groupData",
  ]);

  const currentUser = queryClient.getQueryData<CurrentUser>(
    ["currentUser"]
  );
  useEffect(() => {
    if (!groupData) return;
    if (!currentUser) return;
    console.log("groiupData", groupData);
    console.log("currentuser", currentUser);

    const members = groupData.members.map((member) => {
      return {
        username: member.username,
        groupMemberId: 1,
        included: true,
      };
    });
    const dudes = groupData.members.map((member) => {
      return {
        label: member.username,
        value: member.username,
      };
    });

    setPaidByMap(dudes);

    setPaidFor(members);

    const currentGroupMember = groupData?.members.find(
      (member) => member.userId === currentUser?.id
    );
    console.log("currentGroupMember", currentGroupMember);

    setPaidBy({
      username: currentGroupMember!.username,
      groupMemberId: currentGroupMember!.groupMemberId,
    });
    console.log("paidfor", paidFor);
  }, [groupData, currentUser]);

  const updatePaidFor = (groupMemberId: number) => {
    const updated = paidFor?.map((member: any) => {
      if (member.groupMemberId === groupMemberId) {
        return { ...member, included: !member.included };
      }
      return member;
    });
    if (updated) setPaidFor(updated);
  };

  function back() {
    router.push({
      pathname: "/",
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
      {paidFor && paidBy ? (
        <View style={styles.input}>
          <FormDropdown
            // label="Paid By"
            // value={paidBy.username}
            setValue={setPaidBy}
            items={paidFor?.map((member: any) => {
              return {
                label: member!.username,
                // value: member.groupMemberId,
                value: member!.username,
                // label: "g shit",
                // value: member.groupMemberId,
                // key: member.groupMemberId,
                // color: null,
              };
            })}
          />
        </View>
      ) : (
        ""
      )}
      <Text style={styles.label}>Category (optional):</Text>
      <View style={styles.input}>
        {/* <FormDropdown
          value={category}
          setValue={setCategory}
          items={categories.map((category) => {
            return {
              label: category,
              value: category,
              key: category,
            };
          })}
        /> */}
      </View>
      <Text style={styles.label}>Paid For:</Text>
      <View style={styles.checkboxGroup}>
        {/* {paidFor?.map((member) => (
          <View
            onTouchEnd={() =>
              updatePaidFor(member.groupMemberId)
            }
            key={member.groupMemberId}
            style={styles.checkbox}>
            <View>
              <Text style={styles.label}>
                {member.username}
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
        ))} */}
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
