import { useAuth } from '../contexts/AuthContext';
import dfinityLogo from '../assets/dfinity-logo.svg';

interface IdentityModalProps {
  isOpen: boolean;
  onClose: () => void;
}

function IdentityModal({ isOpen, onClose }: IdentityModalProps) {
  const { principal } = useAuth();

  const formatPrincipal = (principal: string) => {
    if (principal.length <= 16) return principal;
    return `${principal.slice(0, 8)}...${principal.slice(-8)}`;
  };

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
    } catch (error) {
      console.error('Failed to copy:', error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative bg-gray-800 rounded-2xl p-8 border border-gray-700 max-w-md w-full">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-2xl font-semibold text-white">Internet Identity</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Identity Info */}
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-12 h-12 bg-[#F15A24]/20 rounded-full">
              <svg className="w-6 h-6 text-[#FBB03B]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <div className="flex-1">
              <p className="text-white font-medium">Authenticated and secured</p>
              <div className="flex items-center gap-2 mt-1">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-green-400 text-sm font-medium">Connected</span>
              </div>
            </div>
          </div>

          {/* Principal Information */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">
                Principal ID
              </label>
              <div className="flex items-center gap-3 p-4 bg-gray-900/50 rounded-lg border border-gray-700/50">
                <code className="text-gray-200 text-sm font-mono flex-1 break-all">
                  {principal || 'Loading...'}
                </code>
                <button
                  onClick={() => principal && copyToClipboard(principal)}
                  className="px-3 py-1 text-xs bg-[#F15A24]/20 text-[#FBB03B] rounded hover:bg-[#F15A24]/30 transition-colors"
                  title="Copy to clipboard"
                >
                  Copy
                </button>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  Short Principal
                </label>
                <div className="p-3 bg-gray-900/50 rounded-lg border border-gray-700/50">
                  <code className="text-gray-200 text-sm font-mono">
                    {principal ? formatPrincipal(principal) : 'Loading...'}
                  </code>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  Auth Method
                </label>
                <div className="p-3 bg-gray-900/50 rounded-lg border border-gray-700/50">
                  <span className="text-gray-200 text-sm">Internet Identity</span>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="text-center pt-4 border-t border-gray-700">
            <div className="flex items-center justify-center gap-2 text-gray-500 text-sm">
              <span>Built on the Internet Computer</span>
              <img src={dfinityLogo} alt="DFinity" className="w-4 h-2" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default IdentityModal; 