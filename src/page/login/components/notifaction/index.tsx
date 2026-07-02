import React from 'react';

interface NotificationAccessProps {
  onSuccess: () => void;
  goToStep?: (step: number) => void;
}

const NotificationAccess: React.FC<NotificationAccessProps> = ({ onSuccess, goToStep }) => {
  const handleEnable = () => {
    localStorage.setItem('notificationsEnabled', 'true');
    onSuccess();
  };

  const handleRemindLater = () => {
    localStorage.setItem('notificationsEnabled', 'false');
    onSuccess();
  };

  return (
    <div className="fixed inset-0 w-full h-full overflow-hidden bg-[#000000]">
      <div className="w-full h-full flex flex-col items-center justify-center px-3">
        <div className="flex-1 flex flex-col justify-center items-center w-full max-w-md mx-auto">
          <div className="mb-8">
            <img src="../../public/notification.png" alt="" />
          </div>

          <h2 className="text-4xl font-bold text-white mb-3 text-center">
            Don't miss a beat
          </h2>
          <p className="text-md text-[#EAEAEA99] leading-relaxed text-center">
            Get notified about spending, security, wealth,<br />
            market movements, discounts and deals
          </p>

          <div className="flex flex-col items-center justify-center gap-3 mt-8 w-full">
            <button
              onClick={handleEnable}
              className="w-[65%] py-3.5 cursor-pointer rounded-3xl text-sm font-semibold bg-white text-black hover:bg-blue-700 transition-colors"
            >
              Enable Notification
            </button>
            <button
              onClick={handleRemindLater}
              className="w-full py-3 text-sm text-[#EAEAEA66] hover:text-white transition-colors bg-transparent border-none cursor-pointer"
            >
              remind me later
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationAccess;