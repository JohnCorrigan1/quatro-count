import { useState, useEffect } from "react";
import { useRouter } from "expo-router";
import {
  useQueryClient,
  useMutation,
} from "@tanstack/react-query";
import { formStyles } from "@lib/staticStyles";
import { View, Text } from "react-native";
import {
  type PaidByMap,
  type PaidFor,
  type Group,
  type CurrentUser,
} from "@lib/types";
import { CheckboxGroup } from "@components/CheckboxGroup";
import { FormDropdown } from "@components/FormDropdown";
import { Button } from "react-native-elements";
import { TxtInput } from "./TxtInput";
import { apiUrl } from "@app/lib/api";

export const ExpenseForm = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  const groupData = queryClient.getQueryData<Group>([
    "groupData",
  ]);

  const currentUser = queryClient.getQueryData<CurrentUser>(
    ["currentUser"]
  );
  const [buttonDisabled, setButtonDisabled] =
    useState(false);
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
    return await fetch(`${apiUrl}expenses`, {
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
    }).then((res) => res.json());
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
    setButtonDisabled(true);
    mutation.mutate();
  }
  return (
    <View style={formStyles.form}>
      <Text style={formStyles.label}>Expense:</Text>
      <TxtInput value={title} setValue={setTitle} />
      <Text style={formStyles.label}>Amount:</Text>
      <TxtInput
        placeholder="$0.00"
        value={amount}
        setValue={setAmount}
        keyboardType="numeric"
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
      <Button
        title="Add"
        onPress={back}
        disabled={buttonDisabled}
      />
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
