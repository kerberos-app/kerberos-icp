import { useNavigate } from 'react-router-dom';
import logo from './assets/logo_transparent.png';
import dfinityLogo from './assets/dfinity-logo.svg';
import AnimatedBackground from './components/AnimatedBackground';

function App() {
  const navigate = useNavigate();

  const handleEnterVault = () => {
    void navigate('/login');
  };

  return (
          <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 relative overflow-hidden">
        <AnimatedBackground />

        {/* Main Content */}
        <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4">
          {/* Logo and Title */}
          <div className="text-center mb-12">
            <div className="mb-8 animate-fade-in">
              <img 
                src={logo} 
                alt="Kerberos Logo" 
                className="w-64 h-64 md:w-80 md:h-80 mx-auto mb-6 drop-shadow-2xl"
              />
            </div>
            <h1 className="text-5xl md:text-7xl font-semibold tracking-widest text-white drop-shadow-lg mb-2 animate-fade-in-up">
              KERBEROS
            </h1>
            <div className="w-40 md:w-64 h-2 mx-auto mb-6 rounded-full bg-gradient-to-r from-[#F15A24] via-[#FBB03B] to-[#ED1E79] opacity-90 animate-fade-in-up"></div>
            <p className="text-xl md:text-2xl text-gray-300 mb-8 animate-fade-in-up delay-300">
              Passwords. Protected. Permanently.
            </p>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto animate-fade-in-up delay-500">
              The decentralized password manager built on the Internet Computer.
            </p>

            <div className="flex justify-center animate-fade-in-up delay-700 mt-8">
              <button
                onClick={handleEnterVault}
                className="px-8 py-4 bg-gradient-to-r from-[#F15A24] to-[#ED1E79] text-white font-semibold rounded-xl hover:bg-gradient-to-l hover:from-[#F15A24] hover:to-[#ED1E79] transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-[#F15A24]/25"
              >
                Enter the Vault
              </button>
            </div>
          </div>

          {/* Three Pillars */}
          <div className="grid md:grid-cols-3 gap-8 mb-12 max-w-4xl w-full animate-fade-in-up delay-700">
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50 hover:border-purple-500/50 transition-all duration-300 hover:transform hover:scale-105">
              <div className="w-12 h-12 bg-[#F15A24]/20 rounded-xl flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-[#FBB03B]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Security</h3>
              <p className="text-gray-400">End-to-end encryption with client-side decryption. Your secrets stay yours.</p>
            </div>

            <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50 hover:border-blue-500/50 transition-all duration-300 hover:transform hover:scale-105">
              <div className="w-12 h-12 bg-[#ED1E79]/20 rounded-xl flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-[#522785]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Privacy</h3>
              <p className="text-gray-400">Internet Identity integration with zero data collection or tracking.</p>
            </div>

            <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50 hover:border-green-500/50 transition-all duration-300 hover:transform hover:scale-105">
              <div className="w-12 h-12 bg-[#29ABE2]/20 rounded-xl flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-[#29ABE2]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9v-9m0-9v9m0-9c-5 0-9 4-9 9s4 9 9 9" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Decentralization</h3>
              <p className="text-gray-400">Stored on ICP canisters with zero infrastructure dependencies.</p>
            </div>
          </div>



          {/* Footer */}
          <div className="absolute bottom-8 text-center text-gray-500 text-sm">
            <div className="flex items-center justify-center gap-2 mb-2">
              <span>Built on the Internet Computer</span>
              <img src={dfinityLogo} alt="DFinity" className="w-6 h-3" />
            </div>
            <p className="mb-2">Powered by vetKeys</p>
            <p className="text-xs text-gray-600">#WCHL2025 - Team BlockCraft</p>
          </div>
        </div>
    </div>
  );
}

export default App;
