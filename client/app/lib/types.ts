export type GroupMetaData = {
  id: number;
  name: string;
  description: string;
};

export type Group = {
  id: number;
  name: string;
  description: string;
  members: GroupMember[];
  expenses: Expense[];
};

export type CurrentUser = {
  id: number;
  username: string;
  groups: GroupMetaData[];
};

export type Expense = {
  id?: number;
  groupId: number;
  amount: number;
  name: string;
  description: string;
  paid_by: number;
  paid_for: number[];
  createdAt: string;
};

export type GroupMember = {
  groupMemberId: number;
  userId: number;
  username: string;
  groupId: number;
  currentBalance: number;
};

export type PaidFor = {
  username: string;
  groupMemberId: number;
  included: boolean;
};

export type PaidByMap = {
  label: string;
  value: number;
};
