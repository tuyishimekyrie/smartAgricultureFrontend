import { FC } from 'react';
import { UserProfile } from '../../types/header.types';

interface ProfileSectionProps {
  profile: UserProfile;
  onClick?: () => void;
}

export const ProfileSection: FC<ProfileSectionProps> = ({ profile, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-100 transition-colors"
    >
      <img
        src={profile.avatarUrl}
        alt={`${profile.name}'s profile`}
        className="w-10 h-10 rounded-full object-cover border-2 border-gray-200"
      />
      <div className="flex flex-col items-start">
        <span className="text-gray-500 text-sm">{profile.greeting || 'Welcome'}</span>
        <span className="font-semibold text-gray-700">{profile.name}</span>
      </div>
    </button>
  );
};