import { useState } from 'react';
import { LoginData } from '../types/vault';

interface LoginDetailsProps {
  data: LoginData;
  onCopy: (text: string, fieldName: string) => void;
  onOpenUrl: (url: string) => void;
}

function LoginDetails({ data, onCopy, onOpenUrl }: LoginDetailsProps) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="space-y-4">
      {/* Username */}
      <div>
        <label className="block text-sm font-medium text-gray-400 mb-2">Username</label>
        <div className="flex items-center gap-3 p-3 bg-gray-700/30 rounded-lg border border-gray-600/50">
          <span className="flex-1 text-white font-mono">{data.username}</span>
          <button 
            onClick={() => {
              void onCopy(data.username, 'Username');
            }}
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
            {showPassword ? data.password : '••••••••••••'}
          </span>
          <button 
            onClick={() => {
              setShowPassword(!showPassword);
            }}
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
            onClick={() => {
              void onCopy(data.password, 'Password');
            }}
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
          <span className="flex-1 text-white">{data.url}</span>
          <button 
            onClick={() => {
              onOpenUrl(data.url);
            }}
            className="p-1 text-gray-400 hover:text-white transition-colors" 
            title="Open website"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </button>
          <button 
            onClick={() => {
              void onCopy(data.url, 'URL');
            }}
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
      {data.notes && (
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-2">Notes</label>
          <div className="p-3 bg-gray-700/30 rounded-lg border border-gray-600/50">
            <p className="text-white whitespace-pre-wrap">{data.notes}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default LoginDetails; 