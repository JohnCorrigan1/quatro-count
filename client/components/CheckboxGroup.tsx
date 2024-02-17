import { View, Text, Pressable } from "react-native";
import { formStyles } from "@lib/staticStyles";
import Checkbox from "expo-checkbox";
import { PaidFor } from "@lib/types";
import { useEffect, useState } from "react";

type CheckboxGroupProps = {
  paidFor: PaidFor[];
  setPaidFor: (paidFor: PaidFor[]) => void;
  amount: string;
};

export const CheckboxGroup = (
  props: CheckboxGroupProps
) => {
  const [amountPer, setAmountPer] = useState(0.0);
  const updatePaidFor = (groupMemberId: number) => {
    const updated: PaidFor[] = props.paidFor!.map(
      (member: any) => {
        if (member.groupMemberId === groupMemberId) {
          return { ...member, included: !member.included };
        }
        return member;
      }
    );
    props.setPaidFor(updated);
  };

  useEffect(() => {
    if (props.paidFor) {
      setAmountPer(
        parseFloat(props.amount) /
          props.paidFor.filter((member) => member.included)
            .length
      );
    }
  }, [props.paidFor, props.amount]);

  return (
    <View style={formStyles.checkboxGroup}>
      {props.paidFor?.map((member) => (
        <Pressable
          key={member.groupMemberId}
          onPress={() =>
            updatePaidFor(member.groupMemberId)
          }>
          <View style={formStyles.checkbox}>
            <View
              style={{
                display: "flex",
                gap: 24,
                flexDirection: "row",
              }}>
              <Checkbox value={member.included} />
              <Text style={formStyles.label}>
                {member.username}
              </Text>
            </View>
            <View
              style={{
                width: "100%",
                paddingRight: 24,
              }}>
              <Text style={formStyles.label}>
                $
                {member.included
                  ? amountPer
                    ? amountPer
                    : "0"
                  : "0"}
              </Text>
            </View>
          </View>
        </Pressable>
      ))}
    </View>
  );
};
