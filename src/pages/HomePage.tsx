import React, { useState } from 'react';
import { Header } from '../components/Header';
import { Sidebar } from '../components/Sidebar';
import { EmailCollection } from '../components/EmailCollection';
import { SenderGroups } from '../components/SenderGroups';
import { EmailFilters } from '../components/EmailFilters';
import { EmailTimeGroups } from '../components/EmailTimeGroups';
import { GmailStatus } from '../components/GmailStatus';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { AuthPrompt } from '../components/AuthPrompt';
import { useGmail } from '../hooks/useGmail';

export function HomePage() {
  const [view, setView] = useState<'grid' | 'list'>('list');
  const { 
    emails, 
    isLoading, 
    error, 
    isAuthenticated, 
    signIn,
    useMockData,
    useMockDataInstead 
  } = useGmail();

  if (isLoading) {
    return (
      <div className="h-screen">
        <Header />
        <div className="flex items-center justify-center h-[calc(100vh-48px)]">
          <LoadingSpinner />
        </div>
      </div>
    );
  }

  if (!isAuthenticated && !useMockData) {
    return (
      <div className="h-screen">
        <Header />
        <AuthPrompt onSignIn={signIn} />
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <div className="flex-1 flex flex-col">
          <div className="p-4 border-b bg-white flex justify-between items-center">
            <h1 className="font-semibold">
              {useMockData ? 'Demo Inbox' : 'Inbox'}
            </h1>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setView('grid')}
                className={`p-2 rounded ${view === 'grid' ? 'bg-brand-lighter text-brand' : 'text-gray-600 hover:bg-gray-100'}`}
              >
                Grid
              </button>
              <button
                onClick={() => setView('list')}
                className={`p-2 rounded ${view === 'list' ? 'bg-brand-lighter text-brand' : 'text-gray-600 hover:bg-gray-100'}`}
              >
                List
              </button>
            </div>
          </div>
          <div className="flex-1 overflow-auto">
            {view === 'grid' ? (
              <EmailCollection emails={emails} />
            ) : (
              <EmailTimeGroups 
                emails={emails}
                onSelectEmail={(email) => console.log('Selected:', email)}
              />
            )}
          </div>
        </div>
        <div className="w-72 border-l bg-white">
          <SenderGroups emails={emails} />
        </div>
      </div>
      {error && !useMockData && (
        <GmailStatus error={error} onUseMockData={useMockDataInstead} />
      )}
    </div>
  );
}