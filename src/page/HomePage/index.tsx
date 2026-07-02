import React from 'react';

const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#000000] font-sans">
      {/* Main Container - مطابق تصویر با حاشیه و سایه */}
      <div className="max-w-md mx-auto bg-white min-h-screen shadow-lg relative">
        
        {/* Header - نوار بالا با ساعت 9:41 و آیکون‌ها */}
        <div className="flex justify-between items-center px-5 pt-3 pb-2">
          <span className="text-sm font-semibold text-gray-800">9:41</span>
          <div className="flex items-center gap-1.5">
            {/* آیکون سیگنال (دمو) */}
            <div className="w-4 h-4 flex items-center justify-center">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 text-gray-700">
                <path d="M18.36 6.64a9 9 0 0 1 0 12.72" />
                <path d="M14.12 10.88a5 5 0 0 1 0 7.24" />
                <path d="M9.88 15.12a1.5 1.5 0 0 1 0-2.24" />
              </svg>
            </div>
            {/* آیکون وای‌فای (دمو) */}
            <div className="w-4 h-4 flex items-center justify-center">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 text-gray-700">
                <path d="M5 12.55a10.94 10.94 0 0 1 14.08 0" />
                <path d="M1.42 9a16 16 0 0 1 21.16 0" />
                <path d="M8.53 16.11a6 6 0 0 1 6.94 0" />
                <path d="M12 20h.01" />
              </svg>
            </div>
            {/* آیکون باتری (دمو) */}
            <div className="flex items-center gap-0.5">
              <div className="w-6 h-3 border border-gray-600 rounded-sm flex items-center px-0.5 relative">
                <div className="w-4 h-2 bg-green-500 rounded-sm"></div>
              </div>
              <div className="w-0.5 h-1.5 bg-gray-600 rounded-r"></div>
            </div>
          </div>
        </div>

        {/* بخش مبلغ 0.00 $ */}
        <div className="px-5 mt-1">
          <div className="flex items-center gap-2">
            <span className="text-3xl font-bold text-gray-900">$0.00</span>
            <span className="text-xs text-gray-400 font-medium">USD</span>
          </div>
        </div>

        {/* پیام Add new card to see... */}
        <div className="px-5 mt-1">
          <p className="text-sm text-gray-500 leading-5">
            Add new card to see all your pending and upcoming due and amazing rewards
          </p>
        </div>

        {/* No due found + Add new card دکمه */}
        <div className="px-5 mt-3 flex items-center gap-4">
          <span className="text-sm font-medium text-gray-800">No due found</span>
          <button className="text-sm font-semibold text-blue-600 bg-blue-50 px-4 py-1.5 rounded-full border border-blue-200 hover:bg-blue-100 transition">
            Add new card
          </button>
        </div>

        {/* کارت آبی Refer 3 friends... */}
        <div className="mx-5 mt-4 bg-blue-600 rounded-2xl px-4 py-3.5 flex items-center justify-between shadow-md">
          <div className="flex items-center gap-2.5">
            {/* آیکون جایزه/هدیه (دمو) */}
            <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
              <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                <polyline points="20 12 20 22 4 22 4 12" />
                <rect x="2" y="7" width="20" height="5" rx="1" />
                <line x1="12" y1="22" x2="12" y2="7" />
                <path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z" />
                <path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z" />
              </svg>
            </div>
            <div>
              <p className="text-white text-sm font-semibold">Refer 3 friends and get your ₹250 voucher</p>
              <p className="text-blue-100 text-xs">Refer app to your 3 friends and get voucher t&C apply</p>
            </div>
          </div>
          {/* فلش کوچک سمت راست */}
          <div className="text-white">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
              <path d="M5 12h14" />
              <path d="M12 5l7 7-7 7" />
            </svg>
          </div>
        </div>

        {/* خط جداکننده PERSONALISED */}
        <div className="relative flex items-center px-5 mt-6">
          <div className="flex-grow border-t border-gray-200"></div>
          <span className="mx-3 text-xs font-semibold text-gray-400 tracking-wider">PERSONALISED</span>
          <div className="flex-grow border-t border-gray-200"></div>
        </div>

        {/* کارت 100% waiver on processing fee! */}
        <div className="mx-5 mt-4 bg-white rounded-xl border border-gray-200 shadow-sm p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {/* آیکون درصد/تخفیف (دمو) */}
            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
              <svg viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                <circle cx="12" cy="12" r="10" />
                <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
                <line x1="12" y1="17" x2="12.01" y2="17" />
              </svg>
            </div>
            <div>
              <p className="text-sm font-bold text-gray-800">100% waiver on processing fee!</p>
              <p className="text-xs text-gray-500">Pay bill using CheQ and recieve discount</p>
            </div>
          </div>
          <button className="text-sm font-semibold text-blue-600 bg-blue-50 px-4 py-1.5 rounded-full border border-blue-200 hover:bg-blue-100 transition">
            Make Payments &gt;
          </button>
        </div>

        {/* فضای خالی پایین برای حفظ نسبت */}
        <div className="h-8"></div>

      </div>
    </div>
  );
};

export default HomePage;