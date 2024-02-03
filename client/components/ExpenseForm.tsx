import { useState, useEffect } from "react";
import { useRouter } from "expo-router";
import {
  useQueryClient,
  useMutation,
} from "@tanstack/react-query";
import { formStyles } from "../app/lib/staticStyles";
import { View, Text, Pressable } from "react-native";
import {
  type PaidByMap,
  type PaidFor,
  type Group,
  type CurrentUser,
} from "../app/lib/types";
import { TextInput } from "react-native-gesture-handler";
import { CheckboxGroup } from "../components/CheckboxGroup";
import { FormDropdown } from "../components/FormDropdown";

export const ExpenseForm = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  const groupData = queryClient.getQueryData<Group>([
    "groupData",
  ]);

  const currentUser = queryClient.getQueryData<CurrentUser>(
    ["currentUser"]
  );

  const [title, setTitle] = useState("");
  const [paidFor, setPaidFor] = useState<PaidFor[] | null>(
    null
  );
  const [paidBy, setPaidBy] = useState<number | null>(null);
  const [paidByMap, setPaidByMap] = useState<
    PaidByMap[] | null
  >(null);
  const [amount, setAmount] = useState("0");
  const [description, setDescription] = useState(
    "description this is"
  );
  const [category, setCategory] = useState("Groceries");

  const postExpense = async () => {
    return await fetch(
      "http://127.0.0.1:5000/api/expenses",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          amount,
          description,
          category,
          paidBy,
          paidFor: paidFor
            ?.filter((member) => member.included)
            .map((member) => member.groupMemberId),
          groupId: groupData?.id,
        }),
      }
    ).then((res) => res.json());
  };

  const mutation = useMutation({
    mutationFn: postExpense,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["groupData"],
      });
      router.back();
    },
  });

  useEffect(() => {
    if (!groupData || !currentUser) return;

    setPaidByMap(
      groupData.members.map((member) => {
        return {
          label: member.username,
          value: member.groupMemberId,
        };
      })
    );

    setPaidFor(
      groupData.members.map((member) => {
        return {
          username: member.username,
          groupMemberId: member.groupMemberId,
          included: true,
        };
      })
    );

    const currentGroupMember = groupData?.members.find(
      (member) => member.userId === currentUser?.id
    );

    setPaidBy(currentGroupMember!.groupMemberId);
  }, [groupData, currentUser]);

  function back() {
    mutation.mutate();
  }
  return (
    <View style={formStyles.form}>
      <Text style={formStyles.label}>Expense:</Text>
      <TextInput
        value={title}
        inputMode="text"
        onChange={(e) => setTitle(e.nativeEvent.text)}
        style={formStyles.input}
      />
      <Text style={formStyles.label}>Amount:</Text>
      <TextInput
        placeholder="$0.00"
        inputMode="decimal"
        value={amount == "0" ? "" : amount}
        onChange={(e) => setAmount(e.nativeEvent.text)}
        style={formStyles.input}
      />
      <Text style={formStyles.label}>Paid By:</Text>
      {paidByMap && paidBy ? (
        <View style={formStyles.input}>
          <FormDropdown
            value={paidBy}
            setValue={setPaidBy}
            items={paidByMap}
          />
        </View>
      ) : (
        ""
      )}
      <Text style={formStyles.label}>
        Category (optional):
      </Text>
      <View style={formStyles.input}>
        <FormDropdown
          value={category}
          setValue={setCategory}
          items={categories}
        />
      </View>
      <Text style={formStyles.label}>Paid For:</Text>
      {paidFor ? (
        <CheckboxGroup
          paidFor={paidFor}
          setPaidFor={setPaidFor}
          amount={amount}
        />
      ) : (
        ""
      )}
      <Pressable>
        <Text style={formStyles.label} onPress={back}>
          Add
        </Text>
      </Pressable>
    </View>
  );
};

const categories = [
  { label: "Groceries", value: "Groceries" },
  {
    label: "Juice",
    value: "Juice",
  },
  { label: "other", value: "other" },
];
