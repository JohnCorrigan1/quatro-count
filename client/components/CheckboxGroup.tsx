import { View, Text, Pressable } from "react-native";
import { formStyles } from "../app/lib/staticStyles";
import Checkbox from "expo-checkbox";
import { PaidFor } from "../app/lib/types";

type CheckboxGroupProps = {
  paidFor: PaidFor[];
  setPaidFor: (paidFor: PaidFor[]) => void;
  amount: string;
};

export const CheckboxGroup = (
  props: CheckboxGroupProps
) => {
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
  return (
    <View style={formStyles.checkboxGroup}>
      {props.paidFor?.map((member) => (
        <Pressable
          key={member.groupMemberId}
          onPress={() =>
            updatePaidFor(member.groupMemberId)
          }>
          <View style={formStyles.checkbox}>
            <View>
              <Text style={formStyles.label}>
                {member.username}
              </Text>
              <Checkbox value={member.included} />
            </View>
            <Text style={formStyles.label}>
              $
              {0
                ? props.amount == "0"
                : (
                    parseFloat(props.amount) /
                    props.paidFor.length
                  ).toFixed(2)}
            </Text>
          </View>
        </Pressable>
      ))}
    </View>
  );
};
