import { VaultItem, CardData, LoginData } from '../types/vault';
import LoginDetails from './LoginDetails';
import CardDetails from './CardDetails';
import NoteDetails from './NoteDetails';
import dfinityLogo from '../assets/dfinity-logo.svg';

interface ItemDetailsPanelProps {
  selectedItem: VaultItem | null;
  onCopy: (text: string, fieldName: string) => void;
  onOpenUrl: (url: string) => void;
}

function ItemDetailsPanel({ selectedItem, onCopy, onOpenUrl }: ItemDetailsPanelProps) {
  if (!selectedItem) {
    /* Empty State */
    return (
      <div className="flex-1 flex flex-col">
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

        {/* Footer */}
        <div className="p-4 border-t border-gray-700/50">
          <div className="flex items-center justify-center gap-2 text-gray-500 text-sm">
            <span>Secured by Internet Identity & vetKeys</span>
            <img src={dfinityLogo} alt="DFinity" className="w-4 h-2" />
          </div>
          <p className="text-xs text-gray-600 text-center mt-1">#WCHL2025 - Team BlockCraft</p>
        </div>
      </div>
    );
  }

  /* Item Details */
  return (
    <div className="flex-1 flex flex-col">
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
            <LoginDetails
              data={selectedItem.data as LoginData}
              onCopy={onCopy}
              onOpenUrl={onOpenUrl}
            />
          )}

          {selectedItem.type === 'card' && (
            <CardDetails
              data={selectedItem.data as CardData}
              onCopy={onCopy}
            />
          )}

          {selectedItem.type === 'note' && (
            <NoteDetails
              content={(selectedItem.data as any).content}
            />
          )}
        </div>
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-gray-700/50">
        <div className="flex items-center justify-center gap-2 text-gray-500 text-sm">
          <span>Secured by Internet Identity & vetKeys</span>
          <img src={dfinityLogo} alt="DFinity" className="w-4 h-2" />
        </div>
        <p className="text-xs text-gray-600 text-center mt-1">#WCHL2025 - Team BlockCraft</p>
      </div>
    </div>
  );
}

export default ItemDetailsPanel; 