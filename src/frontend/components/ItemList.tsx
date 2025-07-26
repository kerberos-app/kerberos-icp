import { VaultItem, CardData, LoginData } from '../types/vault';

interface ItemListProps {
  items: VaultItem[];
  selectedItem: VaultItem | null;
  onSelectItem: (item: VaultItem) => void;
}

function ItemList({ items, selectedItem, onSelectItem }: ItemListProps) {
  return (
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
          <span className="text-gray-500">{items.length} items</span>
        </div>
      </div>

      {/* Items List */}
      <div className="flex-1 overflow-y-auto">
        {items.length === 0 ? (
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
            {items.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  onSelectItem(item);
                }}
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
  );
}

export default ItemList; 