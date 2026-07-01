// // page/HomePage.tsx
// import React from 'react';

// const HomePage: React.FC = () => {
//   const userName = localStorage.getItem('userName') || 'User';
//   const notificationsEnabled = localStorage.getItem('notificationsEnabled') === 'true';

//   return (
//     <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
//       <div className="bg-white rounded-2xl p-12 text-center max-w-[400px] shadow-[0_4px_20px_rgba(0,0,0,0.08)]">
//         <h1 className="text-3xl font-bold text-gray-900 mb-3">
//           Welcome, {userName}! 👋
//         </h1>
//         <p className="text-gray-500 text-base leading-relaxed">
//           You have successfully completed the login process.
//         </p>
//         {notificationsEnabled && (
//           <div className="mt-6 p-4 bg-blue-50 rounded-xl text-blue-600 text-sm">
//             ✅ Notifications enabled
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default HomePage;


// page/HomePage.tsx
import React from 'react';

const HomePage: React.FC = () => {
  const userName = localStorage.getItem('userName') || 'User';
  const notificationsEnabled = localStorage.getItem('notificationsEnabled') === 'true';

  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="bg-white rounded-2xl p-8 text-center w-full max-w-[400px] shadow-[0_4px_20px_rgba(0,0,0,0.08)]">
        <h1 className="text-3xl font-bold text-gray-900 mb-3">
          Welcome, {userName}! 👋
        </h1>
        <p className="text-gray-500 text-base leading-relaxed">
          You have successfully completed the login process.
        </p>
        {notificationsEnabled && (
          <div className="mt-6 p-4 bg-blue-50 rounded-xl text-blue-600 text-sm">
            ✅ Notifications enabled
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;