import { FC } from 'react';
import { BiNotification } from 'react-icons/bi';
import { CiSettings } from 'react-icons/ci';
import { HeaderProps } from '../../types/header.types';
import { ProfileSection } from './ProfileSection';
import { IconButton } from './IconButton';

export const Header: FC<HeaderProps> = ({
  title = 'Dashboard',
  profile,
  onSettingsClick,
  onNotificationsClick,
  onProfileClick,
  notificationCount = 0,
}) => {
  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-800">{title}</h1>
        
        <div className="flex items-center space-x-4">
          <IconButton
            icon={<CiSettings className="w-6 h-6" />}
            onClick={onSettingsClick}
          />
          
          <IconButton
            icon={<BiNotification className="w-6 h-6" />}
            badge={notificationCount}
            onClick={onNotificationsClick}
          />
          
          <div className="h-6 w-px bg-gray-200" />
          
          <ProfileSection
            profile={profile}
            onClick={onProfileClick}
          />
        </div>
      </div>
    </header>
  );
};