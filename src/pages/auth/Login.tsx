import React, { useState } from 'react';
import { supabase } from '../../services/supabase';

const Login: React.FC<{ onLogin?: (role: string) => void }> = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('article');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const { data, error: dbError } = await supabase
        .from('users')
        .select('*')
        .eq('email', email)
        .eq('password', password)
        .eq('role', role)
        .eq('is_active', true)
        .single();

      if (dbError || !data) {
        setError('Invalid email or password for the selected role.');
      } else {
        localStorage.setItem('ams_user', JSON.stringify(data));
        if (onLogin) onLogin(data.role);
      }
    } catch (err) {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex" style={{ background: 'linear-gradient(135deg, #0f1f35 0%, #1e3a5f 50%, #162d4a 100%)' }}>
      <div className="hidden lg:flex lg:w-1/2 flex-col justify-center items-center p-12 relative">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-64 h-64 rounded-full border-2 border-yellow-400"></div>
          <div className="absolute bottom-20 right-20 w-48 h-48 rounded-full border-2 border-yellow-400"></div>
          <div className="absolute top-1/2 left-1/2 w-32 h-32 rounded-full border border-yellow-400"></div>
        </div>
        <div className="relative z-10 text-center">
          <div className="mb-8">
            <div className="w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6" style={{ background: 'linear-gradient(135deg, #d4a017, #f5c842)' }}>
              <span className="text-3xl font-bold text-white">D&L</span>
            </div>
            <h1 className="text-4xl font-bold text-white mb-2">Dayal & Lohia</h1>
            <p className="text-yellow-400 text-lg font-medium">Chartered Accountants</p>
            <div className="w-16 h-1 bg-yellow-400 mx-auto mt-4 rounded"></div>
          </div>
          <div className="mt-12 space-y-4">
            {['ICAI Compliant Articleship Management', 'Automated Leave & Stipend Calculations', 'Real-time Comp-Off & Attendance Tracking', 'Secure Document Management'].map((item) => (
              <div key={item} className="flex items-center space-x-3 text-gray-300">
                <div className="w-8 h-8 rounded-full bg-yellow-500 bg-opacity-20 flex items-center justify-center">
                  <span className="text-yellow-400 text-sm">✓</span>
                </div>
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <div className="lg:hidden text-center mb-8">
            <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{ background: 'linear-gradient(135deg, #d4a017, #f5c842)' }}>
              <span className="text-xl font-bold text-white">D&L</span>
            </div>
            <h1 className="text-2xl font-bold text-white">Dayal & Lohia</h1>
            <p className="text-yellow-400">Chartered Accountants</p>
          </div>

          <div className="bg-white rounded-2xl shadow-2xl p-8">
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-800">Welcome Back</h2>
              <p className="text-gray-500 mt-1">Sign in to AMS Portal</p>
            </div>

            <form onSubmit={handleLogin} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Login As</label>
                <div className="grid grid-cols-4 gap-2">
                  {['article', 'senior', 'partner', 'admin'].map((r) => (
                    <button
                      key={r}
                      type="button"
                      onClick={() => { setRole(r); setError(''); }}
                      className={`py-2 px-3 rounded-lg text-sm font-medium capitalize transition-all ${role === r ? 'text-white shadow-md' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                      style={role === r ? { background: 'linear-gradient(135deg, #1e3a5f, #162d4a)' } : {}}
                    >
                      {r === 'article' ? 'Article' : r === 'senior' ? 'Senior' : r === 'partner' ? 'Partner' : 'Admin'}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:border-transparent transition-all"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:border-transparent transition-all pr-12"
                    required
                  />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600">
                    {showPassword ? '🙈' : '👁️'}
                  </button>
                </div>
              </div>

              <div className="flex justify-end">
                <button type="button" className="text-sm font-medium" style={{ color: '#1e3a5f' }}>Forgot Password?</button>
              </div>

              {error && (
                <div className="bg-red-50 border border-red-200 text-red-600 text-sm px-4 py-3 rounded-lg flex items-center space-x-2">
                  <span>⚠️</span><span>{error}</span>
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 rounded-lg text-white font-semibold text-lg transition-all transform hover:scale-105 shadow-lg disabled:opacity-70 disabled:cursor-not-allowed"
                style={{ background: 'linear-gradient(135deg, #1e3a5f, #162d4a)' }}
              >
                {loading ? (
                  <span className="flex items-center justify-center space-x-2">
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 22 6.477 22 12h-4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span>Signing In...</span>
                  </span>
                ) : 'Sign In to AMS'}
              </button>
            </form>

            <div className="mt-6 pt-6 border-t border-gray-100 text-center">
              <p className="text-xs text-gray-400">Articleship Management System v1.0</p>
              <p className="text-xs text-gray-400 mt-1">© 2026 Dayal & Lohia, Chartered Accountants</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;