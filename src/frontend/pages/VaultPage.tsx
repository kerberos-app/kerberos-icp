import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import IdentityModal from '../components/IdentityModal';
import Toast from '../components/Toast';
import VaultHeader from '../components/VaultHeader';
import VaultSidebar from '../components/VaultSidebar';
import ItemList from '../components/ItemList';
import ItemDetailsPanel from '../components/ItemDetailsPanel';
import { mockVaultItems, getFavoriteItems, getRecentItems } from '../data/mockData';
import { VaultItem } from '../types/vault';

function VaultPage() {
  const { isAuthenticated, principal, logout, loading } = useAuth();
  const navigate = useNavigate();
  const [isIdentityModalOpen, setIsIdentityModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<VaultItem | null>(null);
  const [currentView, setCurrentView] = useState<'all' | 'favorites' | 'recent' | string>('all');
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
          <ItemDetailsPanel
            selectedItem={selectedItem}
            onCopy={copyToClipboard}
            onOpenUrl={openUrl}
          />
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