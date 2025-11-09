import type { SFSymbol } from "expo-symbols";

export interface SearchBarProps {
  placeholder?: string;
  onChangeText?: (text: string) => void;
  value?: string;
  onFocus?: () => void;
  onBlur?: () => void;
}

export interface RecentCardProps {
  icon: SFSymbol;
  iconColor: string;
  iconBackground: string;
  title: string;
  subtitle: string;
  onPress?: () => void;
}
export interface RecentCardProps {
  icon: SFSymbol;
  iconColor: string;
  iconBackground: string;
  title: string;
  subtitle: string;
  onPress?: () => void;
}

export interface QuickActionProps {
  title: string;
  subtitle?: string;
  onPress?: () => void;
}

export interface RecentCardProps {
  icon: SFSymbol;
  iconColor: string;
  iconBackground: string;
  title: string;
  subtitle: string;
  onPress?: () => void;
}
