import { SymbolView, type SFSymbol } from "expo-symbols";
import React, { type FC } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  type ScrollViewProps,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface Device {
  name: string;
  status: string;
  battery: number | null;
  icon: SFSymbol;
}

interface StatCardProps {
  number: string;
  label: string;
}

interface DeviceRowProps extends Device {}

interface PrimaryDeviceCardProps {
  name: string;
  battery: number;
  status: string;
}

const FirstScreen: FC = () => {
  const devices: Device[] = [
    {
      name: "iPhone 14 Pro Max",
      status: "Active",
      battery: 64,
      icon: "iphone",
    },
    {
      name: "Apple Watch Ultra",
      status: "Active",
      battery: 52,
      icon: "applewatch",
    },
    {
      name: 'MacBook Pro 16"',
      status: "Connected",
      battery: 78,
      icon: "laptopcomputer",
    },
    { name: "iPad Pro", status: "Standby", battery: 91, icon: "ipad" },
    { name: "HomePod", status: "Ready", battery: null, icon: "homepod" },
  ];

  return (
    <SafeAreaView style={styles.container} edges={["top", "bottom"]}>
      <ScrollView
        contentContainerStyle={
          styles.contentContainer as ScrollViewProps["contentContainerStyle"]
        }
        showsVerticalScrollIndicator={false}
        bounces
      >
        <View style={styles.header}>
          <View>
            <Text style={styles.subtitle}>Overview</Text>
            <Text style={styles.title}>My Devices</Text>
          </View>
          <View style={styles.addButton}>
            <SymbolView
              name="plus"
              size={20}
              weight="semibold"
              tintColor="#FAFAFA"
            />
          </View>
        </View>

        <View style={styles.statsContainer}>
          <StatCard number="12" label="Total Devices" />
          <StatCard number="8" label="Connected" />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Primary</Text>
          <PrimaryDeviceCard
            name="AirPods Pro"
            status="Connected"
            battery={87}
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>All Devices</Text>
          <View style={styles.devicesList}>
            {devices.map((device, index) => (
              <DeviceRow key={index} {...device} />
            ))}
          </View>
        </View>

        <View style={{ height: 60 }} />
      </ScrollView>
    </SafeAreaView>
  );
};

const StatCard: FC<StatCardProps> = ({ number, label }) => (
  <View style={styles.statCard}>
    <Text style={styles.statNumber}>{number}</Text>
    <Text style={styles.statLabel}>{label}</Text>
  </View>
);

const PrimaryDeviceCard: FC<PrimaryDeviceCardProps> = ({
  name,
  status,
  battery,
}) => (
  <View style={styles.primaryCard}>
    <View style={styles.primaryIcon}>
      <SymbolView
        name="airpodspro"
        size={32}
        weight="regular"
        tintColor="#FAFAFA"
      />
    </View>
    <View style={styles.primaryInfo}>
      <Text style={styles.primaryName}>{name}</Text>
      <View style={styles.primaryMeta}>
        <View style={styles.statusDot} />
        <Text style={styles.primaryStatus}>{status}</Text>
      </View>
    </View>
    <View style={styles.batteryBadge}>
      <Text style={styles.batteryText}>{battery}%</Text>
    </View>
  </View>
);

const DeviceRow: FC<DeviceRowProps> = ({ name, status, battery, icon }) => (
  <View style={styles.deviceRow}>
    <View style={styles.deviceIcon}>
      <SymbolView name={icon} size={20} weight="regular" tintColor="#E5E5E5" />
    </View>
    <View style={styles.deviceDetails}>
      <Text style={styles.deviceName}>{name}</Text>
      <Text style={styles.deviceStatus}>{status}</Text>
    </View>
    {battery !== null ? (
      <Text style={styles.deviceBattery}>{battery}%</Text>
    ) : (
      <SymbolView
        name="chevron.right"
        size={14}
        weight="medium"
        tintColor="#666666"
      />
    )}
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
  },
  contentContainer: {
    paddingBottom: 60,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 32,
  },
  subtitle: {
    fontSize: 14,
    color: "#8A8A8A",
    fontWeight: "500",
    marginBottom: 4,
  },
  title: {
    fontSize: 32,
    fontWeight: "700",
    color: "#FFFFFF",
    letterSpacing: -0.5,
  },
  addButton: {
    width: 44,
    height: 44,
    borderRadius: 99,
    backgroundColor: "#1E1E1E",
    alignItems: "center",
    justifyContent: "center",
  },
  statsContainer: {
    flexDirection: "row",
    paddingHorizontal: 24,
    gap: 12,
    marginBottom: 32,
  },
  statCard: {
    flex: 1,
    backgroundColor: "#1A1A1A",
    borderRadius: 16,
    padding: 20,
  },
  statNumber: {
    fontSize: 32,
    fontWeight: "700",
    color: "#FFFFFF",
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 13,
    color: "#8A8A8A",
    fontWeight: "500",
  },
  section: {
    paddingHorizontal: 24,
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#FFFFFF",
    marginBottom: 16,
    letterSpacing: -0.3,
  },
  primaryCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1A1A1A",
    borderRadius: 20,
    padding: 20,
  },
  primaryIcon: {
    width: 60,
    height: 60,
    borderRadius: 16,
    backgroundColor: "#252525",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 16,
  },
  primaryInfo: {
    flex: 1,
  },
  primaryName: {
    fontSize: 18,
    fontWeight: "600",
    color: "#FFFFFF",
    marginBottom: 6,
  },
  primaryMeta: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#10B981",
  },
  primaryStatus: {
    fontSize: 14,
    color: "#8A8A8A",
    fontWeight: "500",
  },
  batteryBadge: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 10,
    backgroundColor: "#252525",
  },
  batteryText: {
    fontSize: 15,
    fontWeight: "600",
    color: "#FFFFFF",
  },
  devicesList: {
    gap: 8,
  },
  deviceRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1A1A1A",
    borderRadius: 14,
    padding: 16,
  },
  deviceIcon: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: "#252525",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 14,
  },
  deviceDetails: {
    flex: 1,
  },
  deviceName: {
    fontSize: 15,
    fontWeight: "600",
    color: "#FFFFFF",
    marginBottom: 3,
  },
  deviceStatus: {
    fontSize: 13,
    color: "#8A8A8A",
    fontWeight: "400",
  },
  deviceBattery: {
    fontSize: 15,
    fontWeight: "600",
    color: "#A1A1A1",
  },
});

export default FirstScreen;
