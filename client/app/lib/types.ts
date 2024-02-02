export type GroupMetaData = {
  id: number;
  name: string;
  description: string;
};

export type CurrentUser = {
  id: number;
  username: string;
  groups: GroupMetaData[];
};
