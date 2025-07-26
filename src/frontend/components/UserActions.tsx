interface UserActionsProps {
  principal: string | null;
  onOpenIdentityModal: () => void;
  onLogout: () => Promise<void>;
}

function UserActions({ principal, onOpenIdentityModal, onLogout }: UserActionsProps) {
  const formatPrincipal = (principal: string) => {
    if (principal.length <= 16) return principal;
    return `${principal.slice(0, 5)}...${principal.slice(-3)}`;
  };

  return (
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
          onClick={() => {
            onOpenIdentityModal();
          }}
          className="p-2 text-gray-400 hover:text-white hover:bg-gray-700/50 rounded-lg transition-all duration-200"
          title="View Identity Details"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
        </button>

        <button
          onClick={() => {
            void onLogout();
          }}
          className="p-2 text-gray-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-all duration-200"
          title="Logout"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
        </button>
      </div>
    </div>
  );
}

export default UserActions; 