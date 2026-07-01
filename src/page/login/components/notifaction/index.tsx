import React from 'react';

interface NotificationAccessProps {
  onSuccess: () => void;
}

const NotificationAccess: React.FC<NotificationAccessProps> = ({ onSuccess }) => {
  const handleEnable = () => {
    localStorage.setItem('notificationsEnabled', 'true');
    onSuccess();
  };

  const handleRemindLater = () => {
    localStorage.setItem('notificationsEnabled', 'false');
    onSuccess();
  };

  return (
    <div className="w-full px-4 text-center">
      <div className="my-4">
        <svg className="mx-auto" width="80" height="80" viewBox="0 0 80 80" fill="none">
          <circle cx="40" cy="40" r="40" fill="#f0f7ff"/>
          <path d="M40 20C32.268 20 26 26.268 26 34V44L22 48H58L54 44V34C54 26.268 47.732 20 40 20Z" stroke="#0057ff" strokeWidth="3" strokeLinejoin="round"/>
          <path d="M34 56C34 56 36 60 40 60C44 60 46 56 46 56" stroke="#0057ff" strokeWidth="3" strokeLinecap="round"/>
          <circle cx="40" cy="34" r="3" fill="#0057ff"/>
          <circle cx="32" cy="38" r="3" fill="#0057ff"/>
          <circle cx="48" cy="38" r="3" fill="#0057ff"/>
        </svg>
      </div>

      <h2 className="text-xl font-bold text-gray-900 mb-2">Don't miss a beat</h2>
      <p className="text-sm text-gray-500 leading-relaxed mb-8">
        Get notified about spending, security, wealth,<br />
        market movements, discounts and deals
      </p>

      <div className="flex flex-col gap-3">
        <button
          onClick={handleEnable}
          className="w-full py-3.5 rounded-xl text-sm font-semibold bg-blue-600 text-white hover:bg-blue-700 transition-colors"
        >
          Enable Notification
        </button>
        <button
          onClick={handleRemindLater}
          className="w-full py-3 text-sm text-gray-500 hover:text-gray-900 transition-colors bg-transparent border-none cursor-pointer"
        >
          remind me later
        </button>
      </div>
    </div>
  );
};

export default NotificationAccess;