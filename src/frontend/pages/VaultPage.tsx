import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import IdentityModal from '../components/IdentityModal';
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

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
    } catch (err) {
      console.error('Failed to copy text: ', err);
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

  const formatPrincipal = (principal: string) => {
    if (principal.length <= 16) return principal;
    return `${principal.slice(0, 5)}...${principal.slice(-3)}`;
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
      <header className="bg-gray-800/50 backdrop-blur-sm border-b border-gray-700/50">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-8">
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-br from-[#F15A24] to-[#ED1E79] rounded-lg">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <div>
                  <h1 className="text-xl font-bold text-white">Kerberos</h1>
                  <p className="text-sm text-gray-400">Password Vault</p>
                </div>
              </div>
              
              <nav className="hidden md:flex items-center gap-6">
                <button className="text-white font-medium px-3 py-2 rounded-lg bg-[#F15A24]/20 border border-[#F15A24]/30">
                  Vault
                </button>
                <button className="text-gray-400 hover:text-white transition-colors px-3 py-2 rounded-lg hover:bg-gray-700/50">
                  Settings
                </button>
                <button className="text-gray-400 hover:text-white transition-colors px-3 py-2 rounded-lg hover:bg-gray-700/50">
                  Security
                </button>
              </nav>
            </div>

            {/* User Info and Actions */}
            <div className="flex items-center gap-4">
              {/* Connection Status */}
              <div className="flex items-center gap-3 px-3 py-2 bg-gray-700/50 rounded-lg border border-gray-600/50">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium text-gray-300">Connected</span>
                </div>
                <div className="h-4 w-px bg-gray-600"></div>
                <code className="text-sm text-gray-300 font-mono">
                  {principal ? formatPrincipal(principal) : 'Loading...'}
                </code>
              </div>

              {/* User Actions */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsIdentityModalOpen(true)}
                  className="p-2 text-gray-400 hover:text-white hover:bg-gray-700/50 rounded-lg transition-all duration-200"
                  title="View Identity Details"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </button>

                <button
                  onClick={handleLogout}
                  className="p-2 text-gray-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-all duration-200"
                  title="Logout"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Vault Layout */}
      <div className="flex h-[calc(100vh-80px)]">
        {/* Sidebar */}
        <aside className="w-64 bg-gray-800/30 backdrop-blur-sm border-r border-gray-700/50 flex flex-col">
          {/* Sidebar Header */}
          <div className="p-4 border-b border-gray-700/50">
            <button className="w-full flex items-center gap-3 px-3 py-2 bg-gradient-to-r from-[#F15A24] to-[#ED1E79] text-white font-semibold rounded-lg hover:shadow-lg transition-all duration-200">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              Add Item
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 overflow-y-auto">
            {/* Quick Access */}
            <div className="space-y-2 mb-6">
              {/* All Items */}
              <button 
                onClick={() => setCurrentView('all')}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                  currentView === 'all' ? 'text-white bg-gray-700/50' : 'text-gray-400 hover:bg-gray-700/30 hover:text-white'
                }`}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
                <span className="font-medium">All Items</span>
                <span className="ml-auto text-xs text-gray-400 bg-gray-700/50 px-2 py-1 rounded-full">{mockVaultItems.length}</span>
              </button>

              <button 
                onClick={() => setCurrentView('favorites')}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                  currentView === 'favorites' ? 'text-white bg-gray-700/50' : 'text-gray-400 hover:bg-gray-700/30 hover:text-white'
                }`}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                </svg>
                <span className="font-medium">Favorites</span>
                <span className="ml-auto text-xs text-gray-500 bg-gray-700/30 px-2 py-1 rounded-full">{getFavoriteItems().length}</span>
              </button>

              {/* Recently Used */}
              <button 
                onClick={() => setCurrentView('recent')}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                  currentView === 'recent' ? 'text-white bg-gray-700/50' : 'text-gray-400 hover:bg-gray-700/30 hover:text-white'
                }`}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="font-medium">Recently Used</span>
              </button>
            </div>

            {/* Spaces Section */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Spaces</h3>
                <button className="p-1 text-gray-400 hover:text-white rounded transition-colors" title="Add Space">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                </button>
              </div>

              <div className="space-y-1">
                <button className="w-full flex items-center gap-3 px-3 py-2 text-gray-300 rounded-lg hover:bg-gray-700/30 hover:text-white transition-colors group">
                  <div className="w-6 h-6 bg-gradient-to-br from-[#F15A24] to-[#FBB03B] rounded-md flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <span className="font-medium flex-1 text-left">Personal</span>
                  <span className="text-xs text-gray-500 bg-gray-700/30 px-2 py-1 rounded-full group-hover:text-gray-400">0</span>
                </button>

                <button className="w-full flex items-center gap-3 px-3 py-2 text-gray-300 rounded-lg hover:bg-gray-700/30 hover:text-white transition-colors group">
                  <div className="w-6 h-6 bg-gradient-to-br from-[#522785] to-[#29ABE2] rounded-md flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0H8m8 0v6l-3-3H5a2 2 0 00-2 2v6a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2z" />
                    </svg>
                  </div>
                  <span className="font-medium flex-1 text-left">Work</span>
                  <span className="text-xs text-gray-500 bg-gray-700/30 px-2 py-1 rounded-full group-hover:text-gray-400">0</span>
                </button>

                <button className="w-full flex items-center gap-3 px-3 py-2 text-gray-300 rounded-lg hover:bg-gray-700/30 hover:text-white transition-colors group">
                  <div className="w-6 h-6 bg-gradient-to-br from-[#ED1E79] to-[#FBB03B] rounded-md flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                    </svg>
                  </div>
                  <span className="font-medium flex-1 text-left">Family</span>
                  <span className="text-xs text-gray-500 bg-gray-700/30 px-2 py-1 rounded-full group-hover:text-gray-400">0</span>
                </button>
              </div>
            </div>
          </nav>


        </aside>

        {/* Main Content Area - 3 Column Layout */}
        <main className="flex-1 flex min-h-0">
          {/* Items List Panel */}
          <div className="w-80 bg-gray-800/20 backdrop-blur-sm border-r border-gray-700/50 flex flex-col">
            {/* Search & Toolbar */}
            <div className="p-4 border-b border-gray-700/50">
              <div className="relative mb-4">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <input
                  type="text"
                  placeholder="Search vault..."
                  className="w-full pl-10 pr-10 py-2 bg-gray-700/50 border border-gray-600/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#F15A24]/50 focus:border-[#F15A24]/50"
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                  <button className="text-gray-400 hover:text-white transition-colors" title="Advanced Search">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4" />
                    </svg>
                  </button>
                </div>
              </div>
              
              {/* Sort & Filter Info */}
              <div className="flex items-center justify-between text-xs">
                <button className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12" />
                  </svg>
                  <span>Name A→Z</span>
                </button>
                <span className="text-gray-500">{getDisplayItems().length} items</span>
              </div>
            </div>

            {/* Items List */}
            <div className="flex-1 overflow-y-auto">
              {getDisplayItems().length === 0 ? (
                /* Empty State */
                <div className="p-8 text-center">
                  <div className="w-12 h-12 bg-gray-700/50 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </div>
                  <h4 className="text-lg font-semibold text-white mb-2">No items yet</h4>
                  <p className="text-sm text-gray-400 mb-4">Start by adding your first password</p>
                  <button className="px-4 py-2 bg-gradient-to-r from-[#F15A24] to-[#ED1E79] text-white text-sm font-medium rounded-lg hover:shadow-lg transition-all duration-200">
                    Add Item
                  </button>
                </div>
              ) : (
                /* Items List */
                <div className="p-2">
                  {getDisplayItems().map((item) => (
                    <button
                      key={item.id}
                      onClick={() => setSelectedItem(item)}
                      className={`w-full p-3 rounded-lg mb-2 text-left transition-all duration-200 hover:bg-gray-700/30 ${
                        selectedItem?.id === item.id ? 'bg-[#F15A24]/10 border border-[#F15A24]/30' : 'hover:bg-gray-700/30'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        {/* Item Icon */}
                        <div className="w-10 h-10 rounded-lg bg-gray-700/50 flex items-center justify-center flex-shrink-0">
                          {item.type === 'login' && (
                            <svg className="w-5 h-5 text-[#FBB03B]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9v-9m0 9c-5 0-9-4-9-9m9 9c5 0 9-4 9-9m0 9v-9m0 9c-5 0-9-4-9-9" />
                            </svg>
                          )}
                          {item.type === 'card' && (
                            <svg className="w-5 h-5 text-[#29ABE2]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                            </svg>
                          )}
                          {item.type === 'note' && (
                            <svg className="w-5 h-5 text-[#ED1E79]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                          )}
                        </div>

                        {/* Item Info */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="font-medium text-white truncate">{item.title}</h4>
                            {item.isFavorite && (
                              <svg className="w-4 h-4 text-[#FBB03B] flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"/>
                              </svg>
                            )}
                          </div>
                          <div className="flex items-center justify-between">
                            <p className="text-sm text-gray-400 truncate">
                              {item.type === 'login' && (item.data as LoginData).username}
                              {item.type === 'card' && (item.data as CardData).cardholderName}
                              {item.type === 'note' && 'Secure note'}
                            </p>
                            <span className="text-xs text-gray-500 flex-shrink-0 ml-2">
                              {new Date(item.lastUsed).toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

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
                             onClick={() => copyToClipboard((selectedItem.data as LoginData).username)}
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
                             onClick={() => copyToClipboard((selectedItem.data as LoginData).password)}
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
                             onClick={() => copyToClipboard((selectedItem.data as LoginData).url)}
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
                             onClick={() => copyToClipboard((selectedItem.data as CardData).cardholderName)}
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
                             onClick={() => copyToClipboard((selectedItem.data as CardData).number)}
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
                               onClick={() => copyToClipboard((selectedItem.data as CardData).cvv)}
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
    </div>
  );
}

export default VaultPage; 