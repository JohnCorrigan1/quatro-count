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
  paidBy: number;
  paidFor: number[];
  createdAt: string;
};

export type GroupMember = {
  groupMemberId: number;
  userId: number;
  username: string;
  groupId: number;
  currentBalance: number;
};
