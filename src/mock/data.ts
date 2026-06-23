export const MOCK_ROOMS = [
  { id: 'R001', name: '保密会议室A', level: '机密', length: 10, width: 8, devices: 3 },
  { id: 'R002', name: '研发封闭室B', level: '绝密', length: 15, width: 10, devices: 5 },
  { id: 'R003', name: '机房核心区', level: '绝密', length: 8, width: 6, devices: 2 },
  { id: 'R004', name: '档案阅览室', level: '机密', length: 12, width: 8, devices: 4 },
  { id: 'R005', name: '临时洽谈室', level: '秘密', length: 5, width: 5, devices: 1 },
];

export const MOCK_DEVICES = [
  { sn: 'DEV-8801', room: '保密会议室A', x: 0.5, y: 0.5, status: 1, type: '伪装式', corner: 'top-left', alarmType: 'stealth' }, // detecting stealth
  { sn: 'DEV-8802', room: '保密会议室A', x: 9.5, y: 0.5, status: 1, type: '伪装式', corner: 'top-right', alarmType: 'none' }, // normal
  { sn: 'DEV-8803', room: '保密会议室A', x: 0.5, y: 7.5, status: 1, type: '伪装式', corner: 'bottom-left', alarmType: 'phone' }, // detecting phone
  { sn: 'DEV-8804', room: '保密会议室A', x: 9.5, y: 7.5, status: 1, type: '伪装式', corner: 'bottom-right', alarmType: 'none' }, // normal
  ...Array.from({ length: 8 }, (_, i) => ({
    sn: `DEV-88${(i + 5).toString().padStart(2, '0')}`,
    room: MOCK_ROOMS[(i + 1) % 5].name,
    x: (Math.random() * 8 + 1).toFixed(1),
    y: (Math.random() * 6 + 1).toFixed(1),
    status: Math.random() > 0.2 ? 1 : 0,
    type: i % 2 === 0 ? '便携式' : '伪装式'
  }))
];

export const MOCK_TARGETS = [
  { id: 'T001', type: 'person', x: 3, y: 4 }, 
  { id: 'T002', type: 'person', x: 7, y: 2 },
  { id: 'T003', type: 'person', x: 5, y: 6 }
];

export const MOCK_ALARMS_LIST = Array.from({ length: 28 }, (_, i) => {
  const isStealth = i % 3 === 0;
  return {
    id: `ALM-20260622-${(i + 1).toString().padStart(3, '0')}`,
    time: `14:${(59 - i).toString().padStart(2, '0')}:${Math.floor(Math.random() * 60).toString().padStart(2, '0')}`,
    type: isStealth ? 2 : 1,
    typeName: isStealth ? '手持手机偷拍' : '携带手机',
    confidence: (Math.random() * 0.25 + 0.75).toFixed(2),
    device: `DEV-88${(i % 12 + 1).toString().padStart(2, '0')}`,
    room: MOCK_ROOMS[i % 5].name,
    status: i < 3 ? 0 : (i % 5 === 0 ? 2 : 1) // 0:待处理, 1:已确认, 2:误报
  };
});

export const CHART_DATA = [
  { time: '08:00', alarms: 0 }, { time: '10:00', alarms: 2 },
  { time: '12:00', alarms: 1 }, { time: '14:00', alarms: 4 },
  { time: '16:00', alarms: 0 }, { time: '18:00', alarms: 0 },
];