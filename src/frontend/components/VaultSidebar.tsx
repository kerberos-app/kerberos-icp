import { mockVaultItems, getFavoriteItems } from '../data/mockData';

interface VaultSidebarProps {
  currentView: string;
  onViewChange: (view: string) => void;
}

function VaultSidebar({ currentView, onViewChange }: VaultSidebarProps) {
  return (
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
            onClick={() => {
              onViewChange('all');
            }}
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
            onClick={() => {
              onViewChange('favorites');
            }}
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
            onClick={() => {
              onViewChange('recent');
            }}
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
  );
}

export default VaultSidebar; 