import React, { useState } from 'react';
import { 
  Shield, Map, Activity, LayoutGrid, AlertTriangle, 
  Camera, Smartphone, Sun, Moon, Settings, LogOut 
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppProvider';
import { MOCK_ROOMS, MOCK_DEVICES, MOCK_TARGETS, MOCK_ALARMS_LIST, CHART_DATA } from '../mock/data';
import monitorIcon from '../assets/monitor.svg';

export default function Dashboard() {
  const { user, isDark, toggleTheme } = useAppContext();
  const navigate = useNavigate();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const mockRoom = MOCK_ROOMS[0];

  return (
    <div className="flex-1 flex flex-col h-screen overflow-hidden bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
      {/* Header */}
      <header className="h-16 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex items-center justify-between px-6 shrink-0 z-50">
        <div className="flex items-center gap-3">
          <Shield className="w-6 h-6 text-blue-600 dark:text-blue-400" />
          <h1 className="text-xl font-bold tracking-widest dark:text-blue-400">隐卫·实时监控大屏</h1>
          <span className="ml-4 px-2 py-1 text-xs rounded bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
            纯内网部署模式
          </span>
        </div>
        
        <div className="flex items-center gap-6">
          <button onClick={toggleTheme} className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
            {isDark ? <Sun className="w-5 h-5 text-slate-300" /> : <Moon className="w-5 h-5 text-slate-600" />}
          </button>
          
          <div className="h-6 w-px bg-slate-300 dark:bg-slate-700"></div>
          
          {/* User Menu */}
          <div className="relative">
            <button 
              onClick={() => setShowUserMenu(!showUserMenu)} 
              className="flex items-center gap-2 hover:opacity-80 transition-opacity"
            >
              <div className="w-8 h-8 rounded-full bg-blue-600 dark:bg-blue-500 text-white flex items-center justify-center font-bold text-sm shadow-md">
                {user?.username.charAt(0).toUpperCase()}
              </div>
              <span className="font-medium text-sm dark:text-slate-200">{user?.username}</span>
            </button>

            {showUserMenu && (
              <div className="absolute right-0 mt-3 w-48 bg-white dark:bg-slate-800 rounded-lg shadow-xl border border-slate-200 dark:border-slate-700 overflow-hidden">
                {user?.role === 'admin' && (
                  <button 
                    onClick={() => { navigate('/admin'); setShowUserMenu(false); }} 
                    className="w-full text-left px-4 py-3 flex items-center gap-3 text-sm hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors dark:text-slate-200"
                  >
                    <Settings className="w-4 h-4 text-slate-500 dark:text-slate-400" /> 进入管理系统
                  </button>
                )}
                <div className="h-px bg-slate-200 dark:bg-slate-700 w-full"></div>
                <button 
                  onClick={() => navigate('/login')} 
                  className="w-full text-left px-4 py-3 flex items-center gap-3 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                >
                  <LogOut className="w-4 h-4" /> 退出登录
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 grid grid-cols-12 gap-4 p-4 overflow-hidden">
        {/* Left Panel: Stats */}
        <div className="col-span-3 flex flex-col gap-4 overflow-y-auto">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-sm">
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2 dark:text-slate-200">
              <Map className="w-5 h-5 text-blue-500" /> 房间信息
            </h2>
            <div className="space-y-4 text-sm">
              <div className="flex justify-between items-center"><span className="text-slate-500">当前房间</span><span className="font-medium text-base dark:text-slate-200">{mockRoom.name}</span></div>
              <div className="flex justify-between items-center"><span className="text-slate-500">涉密等级</span><span className="px-2 py-1 bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400 rounded text-xs font-bold">{mockRoom.level}</span></div>
              <div className="flex justify-between items-center"><span className="text-slate-500">空间尺寸</span><span className="dark:text-slate-300">{mockRoom.length}m × {mockRoom.width}m</span></div>
              <div className="flex justify-between items-center"><span className="text-slate-500">部署设备</span><span className="dark:text-slate-300">{mockRoom.devices} 台</span></div>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-sm flex-1 min-h-[250px]">
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2 dark:text-slate-200">
              <Activity className="w-5 h-5 text-blue-500" /> 今日告警趋势
            </h2>
            <div className="h-48 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={CHART_DATA}>
                  <CartesianGrid strokeDasharray="3 3" stroke={isDark ? '#334155' : '#e2e8f0'} />
                  <XAxis dataKey="time" stroke={isDark ? '#94a3b8' : '#64748b'} fontSize={12} />
                  <YAxis stroke={isDark ? '#94a3b8' : '#64748b'} fontSize={12} />
                  <Tooltip contentStyle={{ backgroundColor: isDark ? '#0f172a' : '#fff', border: isDark ? '1px solid #1e293b' : '1px solid #e2e8f0', borderRadius: '8px' }} />
                  <Line type="monotone" dataKey="alarms" stroke="#3b82f6" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 6 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Center Panel: 2D Radar Grid */}
        <div className="col-span-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-sm flex flex-col relative overflow-hidden">
          <div className="flex justify-between items-center mb-4 z-10">
            <h2 className="text-lg font-semibold flex items-center gap-2 dark:text-slate-200">
              <LayoutGrid className="w-5 h-5 text-cyan-500" /> 实时空间态势 (2D雷达)
            </h2>
            <div className="flex gap-4 text-xs dark:text-slate-300">
              <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-full bg-green-500"></span> 正常</span>
              <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-full bg-red-500 animate-pulse"></span> 告警</span>
              <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-full bg-slate-500"></span> 离线</span>
            </div>
          </div>
          
          <div className="flex-1 bg-slate-50 dark:bg-slate-950 rounded-lg border border-slate-200 dark:border-slate-800 relative flex items-center justify-center overflow-hidden">
            <svg width="100%" height="100%" className="absolute inset-0 opacity-50">
              <defs>
                <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke={isDark ? '#1e293b' : '#cbd5e1'} strokeWidth="1"/>
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)" />
            </svg>

            <div 
              className="relative border-2 border-cyan-500/50 bg-cyan-500/5 shadow-[0_0_30px_rgba(6,182,212,0.1)]"
              style={{ width: '80%', aspectRatio: `${mockRoom.length} / ${mockRoom.width}` }}
            >
              {/* Dimensions Labels */}
              <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-xs font-medium text-slate-500 dark:text-slate-400">
                长 {mockRoom.length}m
              </div>
              <div className="absolute -right-12 top-1/2 -translate-y-1/2 text-xs font-medium text-slate-500 dark:text-slate-400 [writing-mode:vertical-lr]">
                宽 {mockRoom.width}m
              </div>

              {/* Monitors and Scanning Animation */}
              {MOCK_DEVICES.filter(d => d.corner).map((dev, idx) => {
                const leftPercent = (Number(dev.x) / mockRoom.length) * 100;
                const topPercent = (Number(dev.y) / mockRoom.width) * 100;
                
                let scanColorClass = 'border-green-400/50 bg-green-400/10';
                let statusText = '正常侦测中';
                if (dev.alarmType === 'stealth') {
                  scanColorClass = 'border-red-500/60 bg-red-500/20';
                  statusText = '发现偷拍异常！';
                } else if (dev.alarmType === 'phone') {
                  scanColorClass = 'border-orange-500/60 bg-orange-500/20';
                  statusText = '发现携带手机异常！';
                }

                return (
                  <div 
                    key={`monitor-${idx}`}
                    className="absolute transform -translate-x-1/2 -translate-y-1/2 z-20 flex flex-col items-center group cursor-pointer"
                    style={{ left: `${leftPercent}%`, top: `${topPercent}%` }}
                  >
                    {/* Scanning Circle */}
                    <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 aspect-square rounded-full border-2 ${scanColorClass} animate-scan-expand pointer-events-none z-0`}></div>
                    
                    <div className="w-10 h-10 bg-white dark:bg-slate-800 rounded-full shadow-md flex items-center justify-center border border-slate-200 dark:border-slate-700 z-10 relative">
                      <img src={monitorIcon} alt="Monitor" className="w-6 h-6 opacity-80 dark:invert" />
                    </div>
                    <div className="mt-1 px-1.5 py-0.5 bg-slate-800/80 backdrop-blur text-white text-[10px] rounded shadow-sm z-10 whitespace-nowrap">
                      {dev.sn}
                    </div>

                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block w-36 bg-slate-800 text-white text-xs rounded p-2 z-30 shadow-lg">
                      <div className="font-bold border-b border-slate-600 pb-1 mb-1">{dev.sn}</div>
                      <div className={dev.alarmType !== 'none' ? (dev.alarmType === 'stealth' ? 'text-red-400' : 'text-orange-400') : 'text-green-400'}>状态: {statusText}</div>
                      <div>坐标: ({dev.x}m, {dev.y}m)</div>
                    </div>
                  </div>
                );
              })}

              {/* Detected Targets (People) */}
              {MOCK_TARGETS.map((target, idx) => {
                const leftPercent = (Number(target.x) / mockRoom.length) * 100;
                const topPercent = (Number(target.y) / mockRoom.width) * 100;

                return (
                  <div 
                    key={`target-${idx}`}
                    className="absolute transform -translate-x-1/2 -translate-y-1/2 z-30"
                    style={{ left: `${leftPercent}%`, top: `${topPercent}%` }}
                  >
                    <div className="relative w-3 h-3 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.8)] border border-white dark:border-slate-900"></div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Panel: Alarms */}
        <div className="col-span-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-sm flex flex-col overflow-hidden">
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2 text-red-500">
            <AlertTriangle className="w-5 h-5" /> 实时告警流
          </h2>
          <div className="flex-1 overflow-y-auto space-y-4 pr-2 custom-scrollbar">
            {MOCK_ALARMS_LIST.slice(0, 5).map((alarm, idx) => (
              <div key={idx} className={`p-3 rounded-lg border ${alarm.status === 0 ? 'border-red-500/50 bg-red-50 dark:bg-red-950/20' : 'border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50'}`}>
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <span className={`px-2 py-0.5 rounded text-xs font-bold ${alarm.type === 2 ? 'bg-red-500 text-white' : 'bg-orange-500 text-white'}`}>
                      {alarm.typeName}
                    </span>
                    <div className="text-xs text-slate-500 dark:text-slate-400 mt-1.5">{alarm.time} | {alarm.device}</div>
                  </div>
                  {alarm.status === 0 && <span className="flex h-2.5 w-2.5 rounded-full bg-red-500 animate-pulse mt-1"></span>}
                </div>
                
                <div className="grid grid-cols-2 gap-2 mb-3">
                  <div className="relative h-20 bg-slate-200 dark:bg-slate-800 rounded overflow-hidden flex items-center justify-center border border-slate-300 dark:border-slate-700">
                    <div className="absolute inset-0 backdrop-blur-md bg-white/10"></div>
                    <Camera className="w-6 h-6 text-slate-400 z-10" />
                    <span className="absolute bottom-1 left-1 text-[10px] text-slate-500 z-10 font-medium">DVS 轮廓</span>
                  </div>
                  <div className="relative h-20 bg-gradient-to-br from-orange-900 to-purple-900 rounded overflow-hidden flex items-center justify-center border border-slate-300 dark:border-slate-700">
                    <div className="absolute inset-0 backdrop-blur-sm"></div>
                    <Smartphone className="w-6 h-6 text-orange-400 z-10" />
                    <span className="absolute bottom-1 left-1 text-[10px] text-orange-300 z-10 font-medium">红外热力</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-xs">
                  <span className="text-slate-600 dark:text-slate-400">置信度</span>
                  <div className="flex-1 h-1.5 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                    <div 
                      className={`h-full ${Number(alarm.confidence) > 0.9 ? 'bg-red-500' : 'bg-orange-500'}`} 
                      style={{ width: `${Number(alarm.confidence) * 100}%` }}
                    ></div>
                  </div>
                  <span className="font-mono dark:text-slate-300">{(Number(alarm.confidence) * 100).toFixed(0)}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}