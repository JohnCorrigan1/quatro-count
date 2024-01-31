import {
  createContext,
  useContext,
  useReducer,
} from "react";

export type Group = {
  name: string;
  description: string;
};

const GroupsContext = createContext<Group[]>([]);

const GroupDispatchContext = createContext<any>(null);

export function GroupsProvider({ children }: any) {
  const [groups, dispatch] = useReducer(
    groupReducer,
    initialGroups
  );

  return (
    <GroupsContext.Provider value={groups}>
      <GroupDispatchContext.Provider value={dispatch}>
        {children}
      </GroupDispatchContext.Provider>
    </GroupsContext.Provider>
  );
}

export const useGroups = () => useContext(GroupsContext);

export function useGroupDispatch() {
  return useContext(GroupDispatchContext);
}

type Action =
  | {
      type: "add";
      payload: Group;
    }
  | {
      type: "remove";
      payload: Group;
    };

const groupReducer = (state: Group[], action: Action) => {
  switch (action.type) {
    case "add":
      console.log(state);
      return [...state, action.payload];
    case "remove":
      return state.filter(
        (group) => group.name !== action.payload.name
      );
    default:
      return state;
  }
};

const initialGroups: Group[] = [
  {
    name: "Group 1",
    description: "This is the first group",
  },
  {
    name: "Group 2",
    description: "This is the second group",
  },
  {
    name: "Group 3",
    description: "This is the third group",
  },
  {
    name: "Group 4",
    description: "This is the fourth group",
  },
];
