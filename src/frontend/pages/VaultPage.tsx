import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import IdentityModal from '../components/IdentityModal';
import dfinityLogo from '../assets/dfinity-logo.svg';

function VaultPage() {
  const { isAuthenticated, principal, logout, loading } = useAuth();
  const navigate = useNavigate();
  const [isIdentityModalOpen, setIsIdentityModalOpen] = useState(false);

  // Redirect to login if not authenticated
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
      {/* Dark Website-like Header */}
      <header className="bg-gray-800/50 backdrop-blur-sm border-b border-gray-700/50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo and Navigation */}
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
              
              {/* Navigation Menu */}
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
                {/* User Icon - opens identity modal */}
                <button
                  onClick={() => setIsIdentityModalOpen(true)}
                  className="p-2 text-gray-400 hover:text-white hover:bg-gray-700/50 rounded-lg transition-all duration-200"
                  title="View Identity Details"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </button>

                {/* Logout Icon */}
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

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Welcome Section */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-white mb-4">
            Welcome to Your Vault
          </h2>
          <div className="w-32 h-1 mx-auto rounded-full bg-gradient-to-r from-[#F15A24] via-[#FBB03B] to-[#ED1E79] mb-6"></div>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Your decentralized password manager, secured by Internet Identity
          </p>
        </div>

        {/* Password Manager Section */}
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50">
          <div className="text-center">
            <div className="flex items-center justify-center w-16 h-16 bg-[#F15A24]/20 rounded-full mx-auto mb-6">
              <svg className="w-8 h-8 text-[#FBB03B]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">Password Vault</h3>
            <p className="text-gray-300 mb-8 max-w-md mx-auto">
              Your encrypted password storage will appear here. Start by adding your first password to begin securing your digital life.
            </p>
            <button className="px-8 py-3 bg-gradient-to-r from-[#F15A24] to-[#ED1E79] text-white font-semibold rounded-xl hover:shadow-lg transition-all duration-300 transform hover:scale-105">
              Add First Password
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-12 py-8 border-t border-gray-700/50">
          <div className="flex items-center justify-center gap-2 text-gray-500 text-sm mb-2">
            <span>Secured by Internet Identity & vetKeys</span>
            <img src={dfinityLogo} alt="DFinity" className="w-4 h-2" />
          </div>
          <p className="text-xs text-gray-600">#WCHL2025 - Team BlockCraft</p>
        </div>
      </main>

      {/* Identity Modal */}
      <IdentityModal 
        isOpen={isIdentityModalOpen} 
        onClose={() => setIsIdentityModalOpen(false)} 
      />
    </div>
  );
}

export default VaultPage; 