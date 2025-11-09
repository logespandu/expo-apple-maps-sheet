import { CustomTabBar } from "@/components/tab-bar";
import { Tabs } from "expo-router/tabs";

export default function RootLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        animation: "fade",
      }}
      tabBar={(props) => <CustomTabBar {...props} />}
    >
      <Tabs.Screen
        name="index"
        options={{
          tabBarLabel: "People",
          tabBarIcon: { name: "figure.2" },
        }}
      />
      <Tabs.Screen
        name="first"
        options={{
          tabBarLabel: "Device",
          tabBarIcon: { name: "macbook.and.iphone" },
        }}
      />
      <Tabs.Screen
        name="second"
        options={{
          tabBarLabel: "Itmes",
          tabBarIcon: { name: "circle.grid.2x2.fill" },
        }}
      />
      <Tabs.Screen
        name="fourth"
        options={{
          tabBarLabel: "Settings",
          tabBarIcon: { name: "location.fill" },
        }}
      />
    </Tabs>
  );
}
