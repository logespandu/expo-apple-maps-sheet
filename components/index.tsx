import type { RecentCardProps, SearchBarProps } from "@/typings/index";
import { Entypo } from "@expo/vector-icons";
import {
  DragBeginEvent,
  DragChangeEvent,
  SheetSize,
  TrueSheet,
} from "@lodev09/react-native-true-sheet";
import { GlassView } from "expo-glass-effect";
import { Image } from "expo-image";
import { SFSymbol, SymbolView } from "expo-symbols";
import React, { type RefObject, useCallback, useRef, useState } from "react";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import MapView from "react-native-maps";
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";

const AVATAR: string = `https://pbs.twimg.com/profile_images/1906923012651106304/O6ccYsNM_400x400.jpg`;

const SearchBar: React.FC<SearchBarProps> = ({
  placeholder = "Search...",
  onChangeText,
  value,
}) => {
  return (
    <View style={searchStyles.container}>
      <GlassView
        style={searchStyles.searchContainer}
        glassEffectStyle="regular"
        tintColor="rgba(118, 118, 128, 0.24)"
      >
        <View style={{ paddingLeft: 15 }}>
          <SymbolView name="magnifyingglass" tintColor={"#8E8E93"} size={20} />
        </View>
        <TextInput
          placeholder={placeholder}
          placeholderTextColor="#8E8E93"
          style={searchStyles.input}
          onChangeText={onChangeText}
          value={value}
        />
        <View style={{ paddingRight: 15 }}>
          <SymbolView name="mic" tintColor={"#8E8E93"} size={20} />
        </View>
      </GlassView>
      <View style={searchStyles.avatarContainer}>
        <View style={searchStyles.avatar}>
          <Image
            source={{
              uri: AVATAR,
            }}
            style={styles.avatar}
          />
        </View>
      </View>
    </View>
  );
};

const searchStyles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 8,
    left: 0,
    right: 0,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 5,
    gap: 12,
    backgroundColor: "transparent",
    zIndex: 100,
  },
  searchContainer: {
    flex: 1,
    borderRadius: 99,
    height: 45,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    overflow: "hidden",
  },
  input: {
    flex: 1,
    paddingHorizontal: 10,
    fontSize: 17,
    color: "#FFFFFF",
    height: "100%",
  },
  avatarContainer: {
    width: 52,
    height: 52,
    justifyContent: "center",
    alignItems: "center",
  },
  avatar: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: "rgba(118, 118, 128, 0.24)",
    justifyContent: "center",
    alignItems: "center",
  },
});
const RecentCard: React.FC<RecentCardProps> = ({
  icon,
  iconColor,
  iconBackground,
  title,
  subtitle,
  onPress,
}) => {
  return (
    <View style={recentCardStyles.wrapper}>
      <Pressable style={recentCardStyles.container} onPress={onPress}>
        <View
          style={[
            recentCardStyles.iconContainer,
            { backgroundColor: iconBackground },
          ]}
        >
          <SymbolView name={icon} size={24} tintColor={iconColor} />
        </View>
        <View style={recentCardStyles.textContainer}>
          <Text style={recentCardStyles.title}>{title}</Text>
          <Text style={recentCardStyles.subtitle}>{subtitle}</Text>
        </View>
        <Pressable style={recentCardStyles.moreButton}>
          <SymbolView name="ellipsis" size={20} tintColor="#8E8E93" />
        </Pressable>
      </Pressable>
    </View>
  );
};

const recentCardStyles = StyleSheet.create({
  wrapper: {
    backgroundColor: "rgba(58, 58, 60, 0.6)",
    borderRadius: 12,
    marginBottom: 8,
    overflow: "hidden",
  },
  container: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    gap: 12,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
  },
  textContainer: {
    flex: 1,
    gap: 2,
  },
  title: {
    color: "#FFFFFF",
    fontSize: 17,
    fontWeight: "600",
  },
  subtitle: {
    color: "#8E8E93",
    fontSize: 15,
  },
  moreButton: {
    padding: 4,
  },
});

interface GuideCardProps {
  emoji: string;
  title: string;
  subtitle: string;
  onPress?: () => void;
}

const GuideCard: React.FC<GuideCardProps> = ({
  emoji,
  title,
  subtitle,
  onPress,
}) => {
  return (
    <Pressable style={guideCardStyles.container} onPress={onPress}>
      <View style={guideCardStyles.emojiContainer}>
        <Text style={guideCardStyles.emoji}>{emoji}</Text>
      </View>
      <Text style={guideCardStyles.title}>{title}</Text>
      <Text style={guideCardStyles.subtitle}>{subtitle}</Text>
    </Pressable>
  );
};

const guideCardStyles = StyleSheet.create({
  container: {
    backgroundColor: "rgba(58, 58, 60, 0.6)",
    borderRadius: 12,
    padding: 16,
    alignItems: "center",
    width: 160,
    gap: 8,
  },
  emojiContainer: {
    width: 80,
    height: 80,
    backgroundColor: "rgba(58, 58, 60, 0.8)",
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
  },
  emoji: {
    fontSize: 48,
  },
  title: {
    color: "#FFFFFF",
    fontSize: 17,
    fontWeight: "600",
  },
  subtitle: {
    color: "#8E8E93",
    fontSize: 15,
  },
});

const PlaceCard: React.FC<{
  icon: SFSymbol;
  title: string;
  subtitle?: string;
  onPress?: () => void;
}> = ({ icon, title, subtitle, onPress }) => (
  <Pressable style={placeStyles.container} onPress={onPress}>
    <GlassView style={placeStyles.iconWrapper} isInteractive>
      <SymbolView name={icon} size={40} tintColor="#0A84FF" />
    </GlassView>
    <View style={placeStyles.textWrapper}>
      <Text style={placeStyles.title}>{title}</Text>
      {subtitle && <Text style={placeStyles.subtitle}>{subtitle}</Text>}
    </View>
  </Pressable>
);
const placeStyles = StyleSheet.create({
  container: {
    alignItems: "center",
    gap: 4,
  },
  iconWrapper: {
    width: 80,
    height: 80,
    borderRadius: 95,
    backgroundColor: "rgba(10,132,255,0.15)",
    justifyContent: "center",
    alignItems: "center",
  },
  textWrapper: {
    alignItems: "center",
  },
  title: {
    color: "#fff",
    fontSize: 17,
    fontWeight: "600",
  },
  subtitle: {
    color: "#0A84FF",
    fontSize: 15,
  },
});

interface ActionButtonProps {
  icon: SFSymbol;
  title: string;
  onPress?: () => void;
}

export const ActionButton: React.FC<ActionButtonProps> = ({
  icon,
  title,
  onPress,
}) => {
  return (
    <Pressable style={actionButtonStyles.container} onPress={onPress}>
      <View style={actionButtonStyles.iconContainer}>
        <SymbolView name={icon} size={20} tintColor="#0A84FF" />
      </View>

      <Text style={actionButtonStyles.title}>{title}</Text>
    </Pressable>
  );
};

const actionButtonStyles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(10, 132, 255, 0.15)",
    paddingVertical: 14,
    borderRadius: 99,
    marginBottom: 8,
    position: "relative",
  },
  iconContainer: {
    position: "absolute",
    left: 20,
  },
  title: {
    color: "#0A84FF",
    fontSize: 17,
    fontWeight: "600",
    textAlign: "center",
  },
});

const App: React.FC = (): React.ReactElement => {
  const trueSheetRef = useRef<TrueSheet>(null);
  const scrollRef: RefObject<ScrollView | null> = useRef<ScrollView>(null);
  const [searchText, setSearchText] = useState<string>("");

  const sheetPosition = useSharedValue(0);

  const sizes: SheetSize[] = ["9%", "50%", "100%"];

  const onDragBegin = useCallback((event: DragBeginEvent) => {
    const index = event.nativeEvent.index;
    const value = event.nativeEvent.value;
  }, []);

  const onDragChange = useCallback((event: DragChangeEvent) => {
    const index = event.nativeEvent.index;
    const value = event.nativeEvent.value;
    console.log(value, index);

    sheetPosition.value = value;
  }, []);

  const contentAnimatedStyle = useAnimatedStyle(() => {
    const opacity = interpolate(
      sheetPosition.value,
      [50, 200],
      [0, 1],
      Extrapolation.CLAMP
    );

    return {
      opacity,
    };
  });

  return (
    <React.Fragment>
      <MapView
        showsTraffic={true}
        showsUserLocation={true}
        style={{
          flex: 1,
          width: "100%",
          height: "100%",
        }}
        showsCompass={true}
        showsIndoors={true}
        showsScale={true}
        initialRegion={{
          latitude: 37.7749,
          longitude: -122.4194,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      />
      <TrueSheet
        scrollRef={scrollRef as RefObject<ScrollView>}
        onDragBegin={onDragBegin}
        ref={trueSheetRef}
        grabber={false}
        onDragChange={onDragChange}
        keyboardMode={"resize"}
        dimmed={false}
        dismissible={false}
        dimmedIndex={0}
        initialIndex={0}
        initialIndexAnimated={true}
        sizes={sizes}
        blurTint="systemThickMaterialDark"
      >
        <View style={styles.grabberContainer}>
          <View style={styles.grabber} />
        </View>
        <SearchBar
          placeholder="Search Maps"
          value={searchText}
          onChangeText={setSearchText}
        />

        <Animated.View style={contentAnimatedStyle}>
          <ScrollView
            ref={scrollRef}
            nestedScrollEnabled
            style={styles.scrollContent}
            contentContainerStyle={styles.scrollContentContainer}
            showsVerticalScrollIndicator={false}
          >
            <View style={[styles.sectionHeader, { marginTop: 24 }]}>
              <Text style={styles.sectionTitle}>Places</Text>

              <Entypo name="chevron-right" size={25} color="#8E8E93" />
            </View>
            <View style={styles.quickActionsContainer}>
              <PlaceCard icon="house.fill" title="Home" subtitle="Add" />
              <PlaceCard icon="plus" title="Add" />
            </View>

            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>Recents</Text>

                <Entypo name="chevron-right" size={25} color="#8E8E93" />
              </View>

              <View style={styles.recentsContainer}>
                <RecentCard
                  icon="building.2.fill"
                  iconColor="#FFFFFF"
                  iconBackground="#AF8E6D"
                  title="Golden Gate Bridge"
                  subtitle="San Francisco, CA"
                />
                <RecentCard
                  icon="ferry.fill"
                  iconColor="#FFFFFF"
                  iconBackground="#5AC8FA"
                  title="Fisherman's Wharf"
                  subtitle="Beach St & The Embarcadero"
                />
                <RecentCard
                  icon="tram.fill"
                  iconColor="#FFFFFF"
                  iconBackground="#FF9500"
                  title="Union Square"
                  subtitle="Downtown San Francisco"
                />
              </View>
            </View>

            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>Your Guides</Text>
                <Entypo name="chevron-right" size={25} color="#8E8E93" />
              </View>

              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.guidesContainer}
              >
                <GuideCard emoji="⭐" title="Favorites" subtitle="0 places" />
                <GuideCard emoji="🍽️" title="Restaurants" subtitle="5 places" />
                <GuideCard
                  emoji="☕"
                  title="Coffee Spots"
                  subtitle="3 places"
                />
              </ScrollView>
            </View>

            <View style={styles.actionsContainer}>
              <ActionButton icon="location.fill" title="Share My Location" />
              <ActionButton icon="mappin" title="Mark My Location" />
              <ActionButton icon="info.bubble" title="Report an Issue" />
            </View>
          </ScrollView>
        </Animated.View>
      </TrueSheet>
    </React.Fragment>
  );
};

export default App;

const styles = StyleSheet.create({
  grabberContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  grabber: {
    backgroundColor: "rgb(106, 106, 106)",
    width: 50,
    height: 4.2,
    borderRadius: 99,
    position: "absolute",
    top: 5,
  },
  scrollContent: {
    paddingHorizontal: 16,
  },
  scrollContentContainer: {
    paddingTop: 75,
    paddingBottom: 40,
  },
  quickActionsContainer: {
    flexDirection: "row",
    paddingVertical: 12,
    gap: 20,
  },
  section: {
    marginTop: 24,
    gap: 12,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 4,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: "#FFFFFF",
  },
  recentsContainer: {
    gap: 0,
  },
  guidesContainer: {
    gap: 12,
    paddingHorizontal: 4,
  },
  actionsContainer: {
    marginTop: 32,
    gap: 0,
  },
  avatar: {
    width: 50,
    height: 50,
    alignSelf: "center",
    borderRadius: 99,
  },
});
