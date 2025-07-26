import UserActions from './UserActions';

interface VaultHeaderProps {
  principal: string | null;
  onOpenIdentityModal: () => void;
  onLogout: () => Promise<void>;
}

function VaultHeader({ principal, onOpenIdentityModal, onLogout }: VaultHeaderProps) {
  return (
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
          <UserActions
            principal={principal}
            onOpenIdentityModal={onOpenIdentityModal}
            onLogout={onLogout}
          />
        </div>
      </div>
    </header>
  );
}

export default VaultHeader; 