import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import IdentityModal from '../components/IdentityModal';
import Toast from '../components/Toast';
import VaultHeader from '../components/VaultHeader';
import VaultSidebar from '../components/VaultSidebar';
import ItemList from '../components/ItemList';
import dfinityLogo from '../assets/dfinity-logo.svg';
import { mockVaultItems, getFavoriteItems, getRecentItems } from '../data/mockData';
import { CardData, LoginData, VaultItem } from '../types/vault';

function VaultPage() {
  const { isAuthenticated, principal, logout, loading } = useAuth();
  const navigate = useNavigate();
  const [isIdentityModalOpen, setIsIdentityModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<VaultItem | null>(null);
  const [currentView, setCurrentView] = useState<'all' | 'favorites' | 'recent' | string>('all');
  const [showPassword, setShowPassword] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [showToast, setShowToast] = useState(false);
  
  // Get items based on current view
  const getDisplayItems = () => {
    switch (currentView) {
      case 'favorites':
        return getFavoriteItems();
      case 'recent':
        return getRecentItems();
      case 'all':
      default:
        return mockVaultItems;
    }
  };

  const copyToClipboard = async (text: string, fieldName: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setToastMessage(`${fieldName} copied to clipboard`);
      setShowToast(true);
    } catch (err) {
      console.error('Failed to copy text: ', err);
      setToastMessage('Failed to copy to clipboard');
      setShowToast(true);
    }
  };

  const openUrl = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  if (!loading && !isAuthenticated) {
    navigate('/login');
    return null;
  }

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };



  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#F15A24] mx-auto mb-4"></div>
          <p className="text-white text-lg">Loading your vault...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900">
      <VaultHeader
        principal={principal}
        onOpenIdentityModal={() => {
          setIsIdentityModalOpen(true);
        }}
        onLogout={handleLogout}
      />

      {/* Main Vault Layout */}
      <div className="flex h-[calc(100vh-80px)]">
        {/* Sidebar */}
        <VaultSidebar
          currentView={currentView}
          onViewChange={(view) => {
            setCurrentView(view);
          }}
        />

        {/* Main Content Area - 3 Column Layout */}
        <main className="flex-1 flex min-h-0">
          {/* Items List Panel */}
          <ItemList
            items={getDisplayItems()}
            selectedItem={selectedItem}
            onSelectItem={(item) => {
              setSelectedItem(item);
            }}
          />

          {/* Details Panel */}
          <div className="flex-1 flex flex-col">
            {selectedItem ? (
              /* Item Details */
              <div className="flex-1 overflow-y-auto">
                {/* Header */}
                <div className="p-6 border-b border-gray-700/50">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-lg bg-gray-700/50 flex items-center justify-center">
                        {selectedItem.type === 'login' && (
                          <svg className="w-6 h-6 text-[#FBB03B]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9v-9m0 9c-5 0-9-4-9-9m9 9c5 0 9-4 9-9m0 9v-9m0 9c-5 0-9-4-9-9" />
                          </svg>
                        )}
                        {selectedItem.type === 'card' && (
                          <svg className="w-6 h-6 text-[#29ABE2]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                          </svg>
                        )}
                        {selectedItem.type === 'note' && (
                          <svg className="w-6 h-6 text-[#ED1E79]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                        )}
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <h2 className="text-2xl font-bold text-white">{selectedItem.title}</h2>
                          {selectedItem.isFavorite && (
                            <svg className="w-5 h-5 text-[#FBB03B]" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"/>
                            </svg>
                          )}
                        </div>
                        <p className="text-gray-400 capitalize">{selectedItem.type}</p>
                      </div>
                    </div>
                    <button className="px-4 py-2 bg-[#F15A24]/20 text-[#F15A24] border border-[#F15A24]/30 rounded-lg hover:bg-[#F15A24]/30 transition-colors">
                      Edit
                    </button>
                  </div>
                  
                  <div className="text-sm text-gray-500">
                    Last used {new Date(selectedItem.lastUsed).toLocaleDateString()} • Created {new Date(selectedItem.createdAt).toLocaleDateString()}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 space-y-6">
                  {selectedItem.type === 'login' && (
                    <div className="space-y-4">
                                             {/* Username */}
                       <div>
                         <label className="block text-sm font-medium text-gray-400 mb-2">Username</label>
                         <div className="flex items-center gap-3 p-3 bg-gray-700/30 rounded-lg border border-gray-600/50">
                           <span className="flex-1 text-white font-mono">{(selectedItem.data as LoginData).username}</span>
                           <button 
                             onClick={() => copyToClipboard((selectedItem.data as LoginData).username, 'Username')}
                             className="p-1 text-gray-400 hover:text-white transition-colors" 
                             title="Copy username"
                           >
                             <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                             </svg>
                           </button>
                         </div>
                       </div>

                                             {/* Password */}
                       <div>
                         <label className="block text-sm font-medium text-gray-400 mb-2">Password</label>
                         <div className="flex items-center gap-3 p-3 bg-gray-700/30 rounded-lg border border-gray-600/50">
                           <span className="flex-1 text-white font-mono">
                             {showPassword ? (selectedItem.data as LoginData).password : '••••••••••••'}
                           </span>
                           <button 
                             onClick={() => setShowPassword(!showPassword)}
                             className="p-1 text-gray-400 hover:text-white transition-colors" 
                             title={showPassword ? "Hide password" : "Show password"}
                           >
                             {showPassword ? (
                               <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                               </svg>
                             ) : (
                               <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                               </svg>
                             )}
                           </button>
                           <button 
                             onClick={() => copyToClipboard((selectedItem.data as LoginData).password, 'Password')}
                             className="p-1 text-gray-400 hover:text-white transition-colors" 
                             title="Copy password"
                           >
                             <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                             </svg>
                           </button>
                         </div>
                       </div>

                                             {/* Website */}
                       <div>
                         <label className="block text-sm font-medium text-gray-400 mb-2">Website</label>
                         <div className="flex items-center gap-3 p-3 bg-gray-700/30 rounded-lg border border-gray-600/50">
                           <span className="flex-1 text-white">{(selectedItem.data as LoginData).url}</span>
                           <button 
                             onClick={() => openUrl((selectedItem.data as LoginData).url)}
                             className="p-1 text-gray-400 hover:text-white transition-colors" 
                             title="Open website"
                           >
                             <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                             </svg>
                           </button>
                           <button 
                             onClick={() => copyToClipboard((selectedItem.data as LoginData).url, 'URL')}
                             className="p-1 text-gray-400 hover:text-white transition-colors" 
                             title="Copy URL"
                           >
                             <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                             </svg>
                           </button>
                         </div>
                       </div>

                      {/* Notes */}
                      {(selectedItem.data as LoginData).notes && (
                        <div>
                          <label className="block text-sm font-medium text-gray-400 mb-2">Notes</label>
                          <div className="p-3 bg-gray-700/30 rounded-lg border border-gray-600/50">
                            <p className="text-white whitespace-pre-wrap">{(selectedItem.data as LoginData).notes}</p>
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {selectedItem.type === 'card' && (
                    <div className="space-y-4">
                                             {/* Cardholder Name */}
                       <div>
                         <label className="block text-sm font-medium text-gray-400 mb-2">Cardholder Name</label>
                         <div className="flex items-center gap-3 p-3 bg-gray-700/30 rounded-lg border border-gray-600/50">
                           <span className="flex-1 text-white">{(selectedItem.data as CardData).cardholderName}</span>
                           <button 
                             onClick={() => copyToClipboard((selectedItem.data as CardData).cardholderName, 'Cardholder name')}
                             className="p-1 text-gray-400 hover:text-white transition-colors" 
                             title="Copy name"
                           >
                             <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                             </svg>
                           </button>
                         </div>
                       </div>

                       {/* Card Number */}
                       <div>
                         <label className="block text-sm font-medium text-gray-400 mb-2">Card Number</label>
                         <div className="flex items-center gap-3 p-3 bg-gray-700/30 rounded-lg border border-gray-600/50">
                           <span className="flex-1 text-white font-mono">{(selectedItem.data as CardData).number}</span>
                           <button 
                             onClick={() => copyToClipboard((selectedItem.data as CardData).number, 'Card number')}
                             className="p-1 text-gray-400 hover:text-white transition-colors" 
                             title="Copy number"
                           >
                             <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                             </svg>
                           </button>
                         </div>
                       </div>

                      {/* Expiry & CVV */}
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-400 mb-2">Expiry</label>
                          <div className="flex items-center gap-3 p-3 bg-gray-700/30 rounded-lg border border-gray-600/50">
                            <span className="flex-1 text-white font-mono">{(selectedItem.data as CardData).expiryMonth}/{(selectedItem.data as CardData).expiryYear}</span>
                          </div>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-400 mb-2">CVV</label>
                          <div className="flex items-center gap-3 p-3 bg-gray-700/30 rounded-lg border border-gray-600/50">
                            <span className="flex-1 text-white font-mono">{(selectedItem.data as CardData).cvv}</span>
                                                         <button 
                               onClick={() => copyToClipboard((selectedItem.data as CardData).cvv, 'CVV')}
                               className="p-1 text-gray-400 hover:text-white transition-colors" 
                               title="Copy CVV"
                             >
                               <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                               </svg>
                             </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {selectedItem.type === 'note' && (
                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-2">Content</label>
                      <div className="p-4 bg-gray-700/30 rounded-lg border border-gray-600/50">
                        <pre className="text-white whitespace-pre-wrap font-mono text-sm">{(selectedItem.data as any).content}</pre>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              /* Empty State */
              <div className="flex-1 flex items-center justify-center">
                <div className="text-center max-w-md">
                  <div className="flex items-center justify-center w-20 h-20 bg-gray-700/30 rounded-full mx-auto mb-6">
                    <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4">Select an item</h3>
                  <p className="text-gray-400">
                    Choose an item from the list to view its details, or create your first password to get started.
                  </p>
                </div>
              </div>
            )}

            {/* Footer */}
            <div className="p-4 border-t border-gray-700/50">
              <div className="flex items-center justify-center gap-2 text-gray-500 text-sm">
                <span>Secured by Internet Identity & vetKeys</span>
                <img src={dfinityLogo} alt="DFinity" className="w-4 h-2" />
              </div>
              <p className="text-xs text-gray-600 text-center mt-1">#WCHL2025 - Team BlockCraft</p>
            </div>
          </div>
        </main>
       </div>

      {/* Identity Modal */}
      <IdentityModal 
        isOpen={isIdentityModalOpen} 
        onClose={() => setIsIdentityModalOpen(false)} 
      />

      {/* Toast Notification */}
      <Toast
        message={toastMessage}
        isVisible={showToast}
        onClose={() => setShowToast(false)}
      />
    </div>
  );
}

export default VaultPage; 