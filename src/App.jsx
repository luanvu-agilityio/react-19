import { useState } from 'react';
import ECommerceApp from './components/ECommercialApp';
import { Toaster } from 'sonner';
import RegistrationApp from './components/RegistrationApp';

import ChatRoomApp from './components/ChatRoom';
import { currentUser, room } from './mock';

export default function App() {
  const [activeDemo, setActiveDemo] = useState('ecommerce');

  const demos = [
    {
      id: 'ecommerce',
      label: 'E-Commerce (useActionState)',
      component: ECommerceApp,
    },
    {
      id: 'registration-form',
      label: 'Registration Form',
      component: RegistrationApp,
    },
    {
      id: 'chat-room',
      label: 'Chat Room',
      component: ChatRoomApp,
    },
  ];

  const handleClick = (demoId) => {
    setActiveDemo(demoId);
  };

  const ActiveComponent =
    demos.find((demo) => demo.id === activeDemo)?.component || ECommerceApp;

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <h1 className="text-xl font-bold text-gray-900">
              React 19 Features
            </h1>

            <div className="flex space-x-1">
              {demos.map((demo) => (
                <button
                  key={demo.id}
                  onClick={() => handleClick(demo.id)}
                  className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                    activeDemo === demo.id
                      ? 'bg-blue-100 text-blue-700'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                  }`}
                >
                  {demo.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </nav>

      <main className="container mx-auto px-4 py-8">
        <Toaster />
        {activeDemo === 'chat-room' ? (
          <ChatRoomApp room={room} currentUser={currentUser} />
        ) : (
          <ActiveComponent />
        )}
      </main>
    </div>
  );
}
