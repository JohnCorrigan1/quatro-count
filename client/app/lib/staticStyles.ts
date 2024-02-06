import { StyleSheet } from "react-native";

export const formStyles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },

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
    borderColor: "white",
    padding: 10,
    color: "white",
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
    color: "white",
  },
});

export const basestyles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
  icon: {
    color: "white",
    backgroundColor: "blue",
  },
});
