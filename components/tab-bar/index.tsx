import {
  DragBeginEvent,
  DragChangeEvent,
  DragEndEvent,
  SheetSize,
  SizeChangeEvent,
  TrueSheet,
  TrueSheetGrabber,
} from "@lodev09/react-native-true-sheet";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { PlatformPressable } from "@react-navigation/elements";
import { useLinkBuilder, useTheme } from "@react-navigation/native";
import { GlassView } from "expo-glass-effect";
import { SFSymbol, SymbolView } from "expo-symbols";
import React, { useCallback, useRef } from "react";
import { Dimensions, ScrollView, StyleSheet, Text, View } from "react-native";
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const { height: SCREEN_HEIGHT, width: SCREEN_WIDTH } = Dimensions.get("window");

export function CustomTabBar({
  state,
  descriptors,
  navigation,
}: BottomTabBarProps) {
  const { colors } = useTheme();
  const { buildHref } = useLinkBuilder();
  const insets = useSafeAreaInsets();
  const trueSheetRef = useRef<TrueSheet>(null);
  const scrollRef = useRef<ScrollView>(null);
  const sheetPosition = useSharedValue<number>(0);

  const sizes: SheetSize[] = ["10%", "50%", "100%"];

  const minSize = SCREEN_HEIGHT * 0.09;
  const maxSize = SCREEN_HEIGHT * 0.5;

  const onDragBegin = useCallback((event: DragBeginEvent) => {
    sheetPosition.value = withTiming(event.nativeEvent.value);
  }, []);

  const onDragChange = useCallback((event: DragChangeEvent) => {
    sheetPosition.value = withTiming(event.nativeEvent.value);
  }, []);

  const onDragEnd = useCallback((event: DragEndEvent) => {
    sheetPosition.value = withTiming(event.nativeEvent.value);
  }, []);
  const onSheetSizeChange = useCallback((event: SizeChangeEvent) => {
    sheetPosition.value = withTiming(event.nativeEvent.value);
  }, []);
  const animatedBorderWidthStyle = useAnimatedStyle(() => {
    const opacity = interpolate(
      sheetPosition.value,
      [minSize, maxSize],
      [0, 1],
      Extrapolation.CLAMP
    );

    return {
      opacity,
    };
  }, []);

  const animatedBottomTabsStyle = useAnimatedStyle(() => {
    const translateY = interpolate(
      sheetPosition.value,
      [minSize, minSize + (maxSize - minSize)],
      [0, -10],
      Extrapolation.CLAMP
    );

    return {
      transform: [
        {
          translateY,
        },
      ],
    };
  }, []);

  const renderTabButton = (route: any, index: number, isDuplicate = false) => {
    const { options } = descriptors[route.key];
    const label = options.tabBarLabel ?? options.title ?? route.name;
    const iconName = (options.tabBarIcon as any)?.name ?? "circle";
    const isFocused = state.index === index;

    const onPress = () => {
      const event = navigation.emit({
        type: "tabPress",
        target: route.key,
        canPreventDefault: true,
      });

      if (!isFocused && !event.defaultPrevented) {
        navigation.navigate(route.name, route.params);
      }
    };

    const onLongPress = () => {
      navigation.emit({
        type: "tabLongPress",
        target: route.key,
      });
    };

    return (
      <PlatformPressable
        key={`${route.key}-${isDuplicate ? "duplicate" : "original"}`}
        href={buildHref(route.name, route.params)}
        accessibilityState={isFocused ? { selected: true } : {}}
        onPress={onPress}
        onLongPress={onLongPress}
        style={[styles.tab]}
      >
        <SymbolView
          name={iconName}
          size={34}
          weight="semibold"
          tintColor={isFocused ? colors.primary : colors.text}
          style={styles.icon}
        />
        <Text
          style={[
            styles.label,
            { color: isFocused ? colors.primary : colors.text },
          ]}
        >
          {label}
        </Text>
      </PlatformPressable>
    );
  };

  return (
    <>
      <View>
        <TrueSheet
          ref={trueSheetRef}
          scrollRef={scrollRef as React.RefObject<ScrollView>}
          sizes={sizes}
          grabber={false}
          onSizeChange={onSheetSizeChange}
          keyboardMode="resize"
          dimmed={false}
          dismissible={false}
          dimmedIndex={0}
          onDragBegin={onDragBegin}
          onDragChange={onDragChange}
          onDragEnd={onDragEnd}
          initialIndex={0}
          initialIndexAnimated={true}
          blurTint="dark"
          FooterComponent={
            <>
              <Animated.View
                style={[
                  {
                    backgroundColor: "#484848",
                    height: 0.2,
                    width: SCREEN_WIDTH - 40,
                    bottom: 35,
                    alignSelf: "center",
                    opacity: 1,
                  },
                  animatedBorderWidthStyle,
                ]}
              />
              <Animated.View
                style={[
                  styles.container,
                  {
                    bottom: insets.bottom - 20,
                  },
                  animatedBottomTabsStyle,
                ]}
              >
                {state.routes.map((route, index) =>
                  renderTabButton(route, index)
                )}
              </Animated.View>
            </>
          }
        >
          <TrueSheetGrabber color={"#5C5C5C"} width={60} height={4.5} />

          <ScrollView
            showsVerticalScrollIndicator={false}
            bounces={true}
            contentContainerStyle={styles.scrollContent}
            ref={scrollRef}
            nestedScrollEnabled
          >
            <Animated.View
              style={[styles.sheetContent, animatedBorderWidthStyle]}
            >
              <View style={styles.header}>
                <View style={styles.headerTop}>
                  <View>
                    <Text style={styles.title}>Dashboard</Text>
                    <Text style={styles.subtitle}>Manage your items</Text>
                  </View>
                  <GlassView style={styles.headerAction} isInteractive>
                    <SymbolView
                      name="plus"
                      size={18}
                      weight="semibold"
                      tintColor="#FAFAFA"
                    />
                  </GlassView>
                </View>
              </View>

              <View style={styles.list}>
                {[
                  {
                    name: "AirPods Pro",
                    status: "Connected",
                    icon: "airpodspro",
                  },
                  {
                    name: "iPhone 14 Pro Max",
                    status: "Active",
                    icon: "iphone",
                  },
                  { name: "Apple Watch", status: "Nearby", icon: "applewatch" },
                  {
                    name: "MacBook Pro",
                    status: "Sleep",
                    icon: "laptopcomputer",
                  },
                ].map((item, index) => (
                  <View key={index} style={styles.item}>
                    <View style={styles.itemIconWrapper}>
                      <SymbolView
                        name={item.icon as SFSymbol}
                        size={20}
                        weight="regular"
                        tintColor="#FAFAFA"
                      />
                    </View>
                    <View style={styles.itemContent}>
                      <Text style={styles.itemName}>{item.name}</Text>
                      <View style={styles.statusContainer}>
                        <View
                          style={[
                            styles.statusDot,
                            item.status === "Connected" ||
                            item.status === "Active"
                              ? styles.statusDotActive
                              : item.status === "Nearby"
                              ? styles.statusDotNearby
                              : styles.statusDotInactive,
                          ]}
                        />
                        <Text style={styles.itemStatus}>{item.status}</Text>
                      </View>
                    </View>
                    <SymbolView
                      name="chevron.right"
                      size={14}
                      weight="medium"
                      tintColor="#52525B"
                    />
                  </View>
                ))}
              </View>

              <View style={{ height: 100 }} />
            </Animated.View>
          </ScrollView>
        </TrueSheet>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  tab: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  icon: {
    marginBottom: 2,
  },
  label: {
    fontSize: 12,
    fontWeight: "600",
  },
  scrollContent: {
    flexGrow: 1,
  },
  sheetContent: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 24,
  },
  header: {
    marginBottom: 28,
  },
  headerTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  headerAction: {
    width: 40,
    height: 40,
    borderRadius: 99,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#FAFAFA",
    marginBottom: 6,
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 14,
    color: "#71717A",
    fontWeight: "400",
  },
  list: {
    gap: 10,
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#27272A",
  },
  itemIconWrapper: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: "#18181B",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  itemContent: {
    flex: 1,
    gap: 4,
  },
  itemName: {
    fontSize: 15,
    fontWeight: "600",
    color: "#FAFAFA",
    letterSpacing: -0.2,
  },
  statusContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  statusDotActive: {
    backgroundColor: "#22C55E",
  },
  statusDotNearby: {
    backgroundColor: "#3B82F6",
  },
  statusDotInactive: {
    backgroundColor: "#71717A",
  },
  itemStatus: {
    fontSize: 13,
    color: "#71717A",
    fontWeight: "400",
  },
});
