import React, { useState } from 'react';
import { 
  Shield, Map, Server, AlertTriangle, Monitor, 
  Sun, Moon, CheckCircle2, XCircle, ChevronLeft, ChevronRight, Image as ImageIcon, X 
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppProvider';
import { MOCK_ROOMS, MOCK_DEVICES, MOCK_ALARMS_LIST } from '../mock/data';

export default function Admin() {
  const { user, isDark, toggleTheme } = useAppContext();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('rooms');
  const [devicePage, setDevicePage] = useState(1);
  const [alarmPage, setAlarmPage] = useState(1);
  const [selectedImageModal, setSelectedImageModal] = useState<any>(null);

  const ITEMS_PER_PAGE = 10;
  const paginatedDevices = MOCK_DEVICES.slice((devicePage - 1) * ITEMS_PER_PAGE, devicePage * ITEMS_PER_PAGE);
  const totalDevicePages = Math.ceil(MOCK_DEVICES.length / ITEMS_PER_PAGE);

  const paginatedAlarms = MOCK_ALARMS_LIST.slice((alarmPage - 1) * ITEMS_PER_PAGE, alarmPage * ITEMS_PER_PAGE);
  const totalAlarmPages = Math.ceil(MOCK_ALARMS_LIST.length / ITEMS_PER_PAGE);

  return (
    <div className="flex-1 flex h-screen overflow-hidden bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
      {/* Sidebar */}
      <div className="w-64 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 flex flex-col shrink-0 z-10">
        <div className="h-16 flex items-center justify-center border-b border-slate-200 dark:border-slate-800">
          <Shield className="w-6 h-6 text-blue-600 mr-2" />
          <span className="font-bold text-lg tracking-wider dark:text-blue-400">隐卫管理后台</span>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          <button onClick={() => setActiveTab('rooms')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${activeTab === 'rooms' ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'}`}>
            <Map className="w-5 h-5" /> 房间管理
          </button>
          <button onClick={() => setActiveTab('devices')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${activeTab === 'devices' ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'}`}>
            <Server className="w-5 h-5" /> 设备管理
          </button>
          <button onClick={() => setActiveTab('alarms')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${activeTab === 'alarms' ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'}`}>
            <AlertTriangle className="w-5 h-5" /> 告警大厅
          </button>
        </nav>
        <div className="p-4 border-t border-slate-200 dark:border-slate-800 space-y-2">
          <button onClick={() => navigate('/dashboard')} className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-lg text-sm hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">
            <Monitor className="w-4 h-4" /> 返回大屏
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden relative">
        <header className="h-16 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between px-8 shrink-0">
          <h2 className="text-lg font-semibold dark:text-slate-200">
            {activeTab === 'rooms' && '房间管理 (Room Management)'}
            {activeTab === 'devices' && '设备管理 (Device Management)'}
            {activeTab === 'alarms' && '告警大厅 (Alarm Management)'}
          </h2>
          <div className="flex items-center gap-4">
            <button onClick={toggleTheme} className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
              {isDark ? <Sun className="w-5 h-5 text-slate-300" /> : <Moon className="w-5 h-5 text-slate-600" />}
            </button>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-sm shadow-md">
                {user?.username.charAt(0).toUpperCase()}
              </div>
            </div>
          </div>
        </header>

        <div className="flex-1 p-8 overflow-y-auto">
          <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden flex flex-col h-full">
            
            {/* Table Toolbar */}
            <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center shrink-0">
              <div className="flex gap-2">
                <input type="text" placeholder="输入关键字搜索..." className="px-3 py-1.5 text-sm rounded-md border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 dark:text-white focus:outline-none focus:ring-1 focus:ring-blue-500 w-64 transition-colors" />
                <button className="px-4 py-1.5 text-sm bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-md hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">查询</button>
              </div>
              {activeTab !== 'alarms' && (
                <button className="px-4 py-1.5 text-sm bg-blue-600 hover:bg-blue-700 text-white rounded-md shadow-sm transition-colors">+ 新增</button>
              )}
            </div>

            {/* Table Content */}
            <div className="flex-1 overflow-auto">
              <table className="w-full text-sm text-left text-slate-600 dark:text-slate-400">
                <thead className="text-xs uppercase bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-700 sticky top-0 z-10">
                  {activeTab === 'rooms' && (
                    <tr>
                      <th className="px-6 py-4">房间ID</th>
                      <th className="px-6 py-4">房间名称</th>
                      <th className="px-6 py-4">涉密等级</th>
                      <th className="px-6 py-4">尺寸 (长×宽)</th>
                      <th className="px-6 py-4">绑定设备数</th>
                      <th className="px-6 py-4">操作</th>
                    </tr>
                  )}
                  {activeTab === 'devices' && (
                    <tr>
                      <th className="px-6 py-4">设备SN</th>
                      <th className="px-6 py-4">设备类型</th>
                      <th className="px-6 py-4">归属房间</th>
                      <th className="px-6 py-4">坐标 (X, Y)</th>
                      <th className="px-6 py-4">状态</th>
                      <th className="px-6 py-4">操作</th>
                    </tr>
                  )}
                  {activeTab === 'alarms' && (
                    <tr>
                      <th className="px-6 py-4">告警流水号</th>
                      <th className="px-6 py-4">发生时间</th>
                      <th className="px-6 py-4">告警类型</th>
                      <th className="px-6 py-4">置信度</th>
                      <th className="px-6 py-4">设备 / 房间</th>
                      <th className="px-6 py-4">处理状态</th>
                      <th className="px-6 py-4">操作</th>
                    </tr>
                  )}
                </thead>
                <tbody>
                  {activeTab === 'rooms' && MOCK_ROOMS.map((room, idx) => (
                    <tr key={idx} className="border-b border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                      <td className="px-6 py-4 font-medium dark:text-slate-300">{room.id}</td>
                      <td className="px-6 py-4">{room.name}</td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-1 rounded text-xs font-bold ${room.level === '绝密' ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400' : 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400'}`}>
                          {room.level}
                        </span>
                      </td>
                      <td className="px-6 py-4">{room.length}m × {room.width}m</td>
                      <td className="px-6 py-4">{room.devices} 台</td>
                      <td className="px-6 py-4 text-blue-600 dark:text-blue-400 cursor-pointer hover:underline">编辑 | 绑定设备</td>
                    </tr>
                  ))}

                  {activeTab === 'devices' && paginatedDevices.map((dev, idx) => (
                    <tr key={idx} className="border-b border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                      <td className="px-6 py-4 font-medium dark:text-slate-300">{dev.sn}</td>
                      <td className="px-6 py-4">{dev.type}</td>
                      <td className="px-6 py-4">{dev.room}</td>
                      <td className="px-6 py-4">({dev.x}, {dev.y})</td>
                      <td className="px-6 py-4">
                        {dev.status === 1 
                          ? <span className="flex items-center gap-1 text-green-600 dark:text-green-400"><CheckCircle2 className="w-4 h-4"/> 在线</span>
                          : <span className="flex items-center gap-1 text-slate-500"><XCircle className="w-4 h-4"/> 离线</span>
                        }
                      </td>
                      <td className="px-6 py-4 text-blue-600 dark:text-blue-400 cursor-pointer hover:underline">配置 | 重启</td>
                    </tr>
                  ))}

                  {activeTab === 'alarms' && paginatedAlarms.map((alarm, idx) => (
                    <tr key={idx} className="border-b border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                      <td className="px-6 py-4 font-medium dark:text-slate-300">{alarm.id}</td>
                      <td className="px-6 py-4">{alarm.time}</td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-1 rounded text-xs ${alarm.type === 2 ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400' : 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400'}`}>
                          {alarm.typeName}
                        </span>
                      </td>
                      <td className="px-6 py-4">{(Number(alarm.confidence) * 100).toFixed(0)}%</td>
                      <td className="px-6 py-4">{alarm.device} <br/><span className="text-xs text-slate-400">{alarm.room}</span></td>
                      <td className="px-6 py-4">
                        {alarm.status === 0 && <span className="text-red-500 flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>待处理</span>}
                        {alarm.status === 1 && <span className="text-green-600 dark:text-green-400">已确认违规</span>}
                        {alarm.status === 2 && <span className="text-slate-500">已标记误报</span>}
                      </td>
                      <td className="px-6 py-4">
                        <button 
                          onClick={() => setSelectedImageModal(alarm)}
                          className="flex items-center gap-1 text-blue-600 dark:text-blue-400 hover:underline"
                        >
                          <ImageIcon className="w-4 h-4" /> 查看图片
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            {(activeTab === 'devices' || activeTab === 'alarms') && (
              <div className="p-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between shrink-0 bg-slate-50 dark:bg-slate-900">
                <span className="text-sm text-slate-500">
                  共 {activeTab === 'devices' ? MOCK_DEVICES.length : MOCK_ALARMS_LIST.length} 条记录
                </span>
                <div className="flex items-center gap-2">
                  <button 
                    onClick={() => activeTab === 'devices' ? setDevicePage(Math.max(1, devicePage - 1)) : setAlarmPage(Math.max(1, alarmPage - 1))}
                    disabled={(activeTab === 'devices' ? devicePage : alarmPage) === 1}
                    className="p-1.5 rounded border border-slate-300 dark:border-slate-700 disabled:opacity-50 hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors"
                  >
                    <ChevronLeft className="w-4 h-4 text-slate-600 dark:text-slate-400" />
                  </button>
                  <span className="text-sm px-2 dark:text-slate-300">
                    {activeTab === 'devices' ? devicePage : alarmPage} / {activeTab === 'devices' ? totalDevicePages : totalAlarmPages}
                  </span>
                  <button 
                    onClick={() => activeTab === 'devices' ? setDevicePage(Math.min(totalDevicePages, devicePage + 1)) : setAlarmPage(Math.min(totalAlarmPages, alarmPage + 1))}
                    disabled={(activeTab === 'devices' ? devicePage : alarmPage) === (activeTab === 'devices' ? totalDevicePages : totalAlarmPages)}
                    className="p-1.5 rounded border border-slate-300 dark:border-slate-700 disabled:opacity-50 hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors"
                  >
                    <ChevronRight className="w-4 h-4 text-slate-600 dark:text-slate-400" />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Image Modal */}
        {selectedImageModal && (
          <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
            <div className="bg-white dark:bg-slate-900 rounded-xl shadow-2xl border border-slate-200 dark:border-slate-700 w-[600px] overflow-hidden flex flex-col">
              <div className="p-4 border-b border-slate-200 dark:border-slate-700 flex justify-between items-center bg-slate-50 dark:bg-slate-800/50">
                <h3 className="font-semibold flex items-center gap-2 dark:text-slate-200">
                  <ImageIcon className="w-5 h-5 text-blue-500" /> 告警证据预览
                </h3>
                <button onClick={() => setSelectedImageModal(null)} className="text-slate-500 hover:text-red-500 transition-colors">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="p-6 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <div className="text-sm text-slate-500 text-center">DVS 动态视觉轮廓</div>
                    <div className="h-48 bg-slate-200 dark:bg-slate-800 rounded-lg flex items-center justify-center relative overflow-hidden border border-slate-300 dark:border-slate-700">
                      <div className="absolute inset-0 backdrop-blur-md bg-white/5"></div>
                      <div className="w-12 h-12 flex items-center justify-center bg-slate-300 dark:bg-slate-700 rounded-full opacity-50 z-10"><span className="text-xs">DVS</span></div>
                      <span className="absolute bottom-2 right-2 text-xs text-slate-500 z-10">脱敏处理</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="text-sm text-slate-500 text-center">红外热力特征</div>
                    <div className="h-48 bg-gradient-to-br from-orange-900 to-purple-900 rounded-lg flex items-center justify-center relative overflow-hidden border border-slate-300 dark:border-slate-700">
                      <div className="absolute inset-0 backdrop-blur-sm"></div>
                      <div className="w-12 h-12 flex items-center justify-center bg-orange-800/50 rounded-full opacity-50 z-10"><span className="text-xs text-orange-200">IR</span></div>
                      <span className="absolute bottom-2 right-2 text-xs text-orange-300 z-10">热力映射</span>
                    </div>
                  </div>
                </div>
                <div className="bg-slate-50 dark:bg-slate-800 p-4 rounded-lg text-sm grid grid-cols-2 gap-4 border border-slate-100 dark:border-slate-700">
                  <div className="dark:text-slate-300"><span className="text-slate-500">流水号：</span> {selectedImageModal.id}</div>
                  <div className="dark:text-slate-300"><span className="text-slate-500">告警类型：</span> <span className="text-red-500 font-medium">{selectedImageModal.typeName}</span></div>
                  <div className="dark:text-slate-300"><span className="text-slate-500">发生时间：</span> {selectedImageModal.time}</div>
                  <div className="dark:text-slate-300"><span className="text-slate-500">置信度：</span> {(Number(selectedImageModal.confidence) * 100).toFixed(0)}%</div>
                </div>
              </div>
              <div className="p-4 border-t border-slate-200 dark:border-slate-700 flex justify-end gap-3 bg-slate-50 dark:bg-slate-800/50">
                <button onClick={() => setSelectedImageModal(null)} className="px-4 py-2 text-sm bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 rounded hover:bg-slate-300 dark:hover:bg-slate-600 transition-colors">关闭</button>
                <button className="px-4 py-2 text-sm bg-red-600 text-white rounded hover:bg-red-700 transition-colors">标记为真实违规</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}