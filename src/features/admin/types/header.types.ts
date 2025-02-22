export interface UserProfile {
    name: string;
    greeting?: string;
    avatarUrl: string;
  }
  export interface HeaderProps {
    title?: string;
    profile: UserProfile;
    onSettingsClick?: () => void;
    onNotificationsClick?: () => void;
    onProfileClick?: () => void;
    notificationCount?: number;
  }  