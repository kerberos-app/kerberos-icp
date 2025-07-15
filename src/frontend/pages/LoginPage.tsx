import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import AnimatedBackground from '../components/AnimatedBackground';
import logo from '../assets/logo_transparent.png';
import dfinityLogo from '../assets/dfinity-logo.svg';

function LoginPage() {
  const { login, isAuthenticated, loading, principal } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      // Redirect to dashboard/vault when authenticated
      navigate('/vault');
    }
  }, [isAuthenticated, navigate]);

  const handleLogin = async () => {
    try {
      await login();
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  const formatPrincipal = (principal: string) => {
    if (principal.length <= 8) return principal;
    return `${principal.slice(0, 5)}...${principal.slice(-3)}`;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 relative overflow-hidden">
        <AnimatedBackground />
        <div className="relative z-10 flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#F15A24] mx-auto mb-4"></div>
            <p className="text-white text-lg">Initializing...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 relative overflow-hidden">
      <AnimatedBackground />
      
      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="mb-8 animate-fade-in">
            <img 
              src={logo} 
              alt="Kerberos Logo" 
              className="w-32 h-32 mx-auto mb-6 drop-shadow-2xl"
            />
          </div>
          <h1 className="text-4xl md:text-6xl font-semibold tracking-widest text-white drop-shadow-lg mb-2 animate-fade-in-up">
            Welcome to KERBEROS
          </h1>
          <div className="w-32 md:w-48 h-1 mx-auto mb-6 rounded-full bg-gradient-to-r from-[#F15A24] via-[#FBB03B] to-[#ED1E79] opacity-90 animate-fade-in-up"></div>
          <p className="text-lg text-gray-300 mb-8 animate-fade-in-up delay-300">
            Secure access to your decentralized password vault
          </p>
        </div>

        {/* Login Card */}
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50 max-w-md w-full animate-fade-in-up delay-500">
          <div className="text-center">
            <h2 className="text-2xl font-semibold text-white mb-6">
              Login with Internet Identity
            </h2>
            
            {isAuthenticated ? (
              <div className="space-y-4">
                <div className="flex items-center justify-center w-16 h-16 bg-green-500/20 rounded-full mx-auto mb-4">
                  <svg className="w-8 h-8 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <p className="text-green-400 font-medium mb-2">Successfully Authenticated!</p>
                <p className="text-gray-400 text-sm mb-4">
                  Principal: {principal ? formatPrincipal(principal) : 'Loading...'}
                </p>
                <p className="text-gray-300 text-sm">Redirecting to your vault...</p>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="flex items-center justify-center w-16 h-16 bg-[#F15A24]/20 rounded-full mx-auto mb-4">
                  <svg className="w-8 h-8 text-[#FBB03B]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
                  </svg>
                </div>
                
                <p className="text-gray-300 text-sm mb-6">
                  Internet Identity provides secure, anonymous authentication without passwords. 
                  Your identity is cryptographically secured and never stored on our servers.
                </p>
                
                <button
                  onClick={handleLogin}
                  disabled={loading}
                  className="w-full px-6 py-3 bg-gradient-to-r from-[#F15A24] to-[#ED1E79] text-white font-semibold rounded-xl hover:bg-gradient-to-l hover:from-[#F15A24] hover:to-[#ED1E79] transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-[#F15A24]/25 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <div className="flex items-center justify-center gap-2">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      Connecting...
                    </div>
                  ) : (
                    'Login with Internet Identity'
                  )}
                </button>
                
                <button
                  onClick={() => navigate('/')}
                  className="w-full px-6 py-3 bg-gray-700/50 text-gray-300 font-medium rounded-xl hover:bg-gray-700 transition-all duration-300"
                >
                  Back to Home
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Info Section */}
        <div className="text-center mt-8 animate-fade-in-up delay-700">
          <p className="text-gray-400 text-sm mb-2">
            Powered by Internet Computer's cryptographic authentication
          </p>
          <div className="flex items-center justify-center gap-2">
            <img src={dfinityLogo} alt="DFinity" className="w-4 h-2" />
            <span className="text-xs text-gray-500">Secured by vetKeys</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage; 