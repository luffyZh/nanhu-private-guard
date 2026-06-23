import React, { useState } from 'react';
import { Shield } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppProvider';

export default function Login() {
  const { setUser } = useAppContext();
  const navigate = useNavigate();
  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('admin');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setUser({ username, role: username === 'admin' ? 'admin' : 'user' });
    navigate('/dashboard');
  };

  return (
    <div className="flex-1 flex items-center justify-center min-h-screen bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] dark:bg-slate-950 transition-colors duration-300">
      <div className="w-96 p-8 bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-blue-900/50">
        <div className="flex flex-col items-center mb-8">
          <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mb-4 shadow-lg shadow-blue-500/30">
            <Shield className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold tracking-wider text-slate-800 dark:text-blue-400">隐卫 YINWEI</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">基于涉密场景的隐私防控系统</p>
        </div>
        
        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2 dark:text-slate-300">账号</label>
            <input 
              type="text" 
              className="w-full px-4 py-2 rounded-lg bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white transition-colors"
              value={username} onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2 dark:text-slate-300">密码</label>
            <input 
              type="password" 
              className="w-full px-4 py-2 rounded-lg bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white transition-colors"
              value={password} onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit" className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors shadow-lg shadow-blue-500/30">
            安全登录
          </button>
        </form>
      </div>
    </div>
  );
}