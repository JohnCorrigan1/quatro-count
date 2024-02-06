import { View } from "../../components/Themed";
import { basestyles } from "../lib/staticStyles";
import { AccountPage } from "../../components/AccountPage";

export default function AccountScreen() {
  return (
    <View style={basestyles.container}>
      <AccountPage />
    </View>
  );
}
