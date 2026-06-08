import React, { useMemo } from 'react';
import {
  ComposedChart,
  AreaChart,
  BarChart,
  Line,
  Area,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';

const rawData = [
  { year: '2564', natProc: 0, natJour: 1, intProc: 0, intJour: 2, total: 3, ratio: 0.43, ratioStr: '0.43 : 1' },
  { year: '2565', natProc: 0, natJour: 2, intProc: 0, intJour: 2, total: 4, ratio: 0.50, ratioStr: '0.50 : 1' },
  { year: '2566', natProc: 2, natJour: 1, intProc: 2, intJour: 3, total: 8, ratio: 1.00, ratioStr: '1.00 : 1' },
  { year: '2567', natProc: 1, natJour: 1, intProc: 1, intJour: 3, total: 6, ratio: 0.75, ratioStr: '0.75 : 1' },
  { year: '2568', natProc: 0, natJour: 1, intProc: 1, intJour: 4, total: 6, ratio: 0.75, ratioStr: '0.75 : 1' },
];

const TEACHERS_COUNT = 8;

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white/95 border border-black/10 shadow-sm rounded-md p-3">
        <p className="text-[#2C2C2A] font-medium mb-2">ปีการศึกษา {label}</p>
        {payload.map((entry: any, index: number) => (
          <p key={index} className="text-[#5F5E5A] text-xs mb-1">
            <span
              className="inline-block w-3 h-3 mr-2 rounded-sm align-middle"
              style={{ backgroundColor: entry.color }}
            ></span>
            {entry.name}: {entry.value} ผลงาน
          </p>
        ))}
      </div>
    );
  }
  return null;
};

const RatioTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white/95 border border-black/10 shadow-sm rounded-md p-3">
        <p className="text-[#2C2C2A] font-medium mb-2">ปีการศึกษา {label}</p>
        <p className="text-[#5F5E5A] text-xs mb-1">
          <span
            className="inline-block w-3 h-3 mr-2 rounded-sm align-middle"
            style={{ backgroundColor: payload[0].color }}
          ></span>
          อัตราส่วน: {payload[0].value.toFixed(2)} : 1
        </p>
      </div>
    );
  }
  return null;
};

export default function App() {
  const stats = useMemo(() => {
    let totalNat = 0;
    let totalInt = 0;
    let overallTotal = 0;
    let totalNatProc = 0;
    let totalNatJour = 0;
    let totalIntProc = 0;
    let totalIntJour = 0;

    rawData.forEach(d => {
      totalNatProc += d.natProc;
      totalNatJour += d.natJour;
      totalIntProc += d.intProc;
      totalIntJour += d.intJour;
      
      const nat = d.natProc + d.natJour;
      const int = d.intProc + d.intJour;
      totalNat += nat;
      totalInt += int;
      overallTotal += d.total;
    });

    const avg = (overallTotal / rawData.length).toFixed(1);

    return {
      totalNat,
      totalInt,
      overallTotal,
      avg,
      totalNatProc,
      totalNatJour,
      totalIntProc,
      totalIntJour
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#FDFDFD] text-[#1E293B] font-sans p-6 md:p-8 lg:p-12">
      <div className="max-w-6xl mx-auto">
        
        {/* Header Section */}
        <header className="mb-8 border-b border-gray-200 pb-6">
          <h2 className="sr-only">กราฟเปรียบเทียบผลงานวิชาการของอาจารย์ในหลักสูตร ปีการศึกษา 2564–2568</h2>
          <p className="text-sm text-gray-500 mb-1">จำนวนอาจารย์ในหลักสูตรทั้งหมด {TEACHERS_COUNT} คน</p>
          <h1 className="text-2xl font-semibold text-gray-900">สรุปผลงานวิชาการของอาจารย์ในหลักสูตร ปีการศึกษา 2564–2568</h1>
        </header>

        {/* Summary Metric Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-gray-50 border border-gray-100 rounded-xl p-5 shadow-sm">
            <p className="text-sm text-gray-500 mb-1 font-medium">รวมทุกปี</p>
            <p className="text-3xl font-semibold text-gray-900">{stats.overallTotal}</p>
            <p className="text-xs text-gray-400 mt-1">ผลงานทั้งหมด</p>
          </div>
          <div className="bg-blue-50/50 border border-blue-100/50 rounded-xl p-5 shadow-sm">
            <p className="text-sm text-gray-500 mb-1 font-medium">ระดับชาติ (รวม)</p>
            <p className="text-3xl font-semibold text-[#185FA5]">{stats.totalNat}</p>
            <p className="text-xs text-gray-400 mt-1">Proceedings + วารสาร</p>
          </div>
          <div className="bg-emerald-50/50 border border-emerald-100/50 rounded-xl p-5 shadow-sm">
            <p className="text-sm text-gray-500 mb-1 font-medium">ระดับนานาชาติ (รวม)</p>
            <p className="text-3xl font-semibold text-[#1D9E75]">{stats.totalInt}</p>
            <p className="text-xs text-gray-400 mt-1">Proceedings + วารสาร</p>
          </div>
          <div className="bg-amber-50/50 border border-amber-100/50 rounded-xl p-5 shadow-sm">
            <p className="text-sm text-gray-500 mb-1 font-medium">ค่าเฉลี่ย/ปี</p>
            <p className="text-3xl font-semibold text-[#BA7517]">{stats.avg}</p>
            <p className="text-xs text-gray-400 mt-1">ผลงานต่อปี</p>
          </div>
        </div>

        {/* Custom Legend */}
        <div className="flex flex-wrap items-center gap-4 lg:gap-6 mb-6 text-sm text-gray-600">
          <span className="font-semibold text-gray-900">ตัวอย่างกราฟ:</span>
          
          <span className="flex items-center gap-2">
            <span className="relative flex items-center justify-center w-8 h-4">
              <span className="absolute w-full h-[2px] bg-[#185FA5]"></span>
              <span className="absolute w-2.5 h-2.5 rounded-full bg-[#185FA5] border-2 border-white ring-1 ring-[#185FA5]"></span>
            </span>
            ระดับชาติ – Proceedings
          </span>

          <span className="flex items-center gap-2">
            <span className="relative flex items-center justify-center w-8 h-4">
              <span className="absolute w-full h-[2px] border-b-2 border-dashed border-[#378ADD]"></span>
              <span className="absolute w-2.5 h-2.5 bg-[#378ADD] border-2 border-white ring-1 ring-[#378ADD] rotate-45"></span>
            </span>
            ระดับชาติ – วารสาร
          </span>

          <span className="flex items-center gap-2">
            <span className="relative flex items-center justify-center w-8 h-4">
              <span className="absolute w-full h-[2px] bg-[#1D9E75]"></span>
              <span className="absolute w-0 h-0 border-l-[5px] border-r-[5px] border-b-[9px] border-l-transparent border-r-transparent border-b-[#1D9E75]"></span>
            </span>
            ระดับนานาชาติ – Proceedings
          </span>

          <span className="flex items-center gap-2">
            <span className="relative flex items-center justify-center w-8 h-4">
              <span className="absolute w-full h-[2px] bg-[#0F6E56]"></span>
              <span className="absolute w-2.5 h-2.5 border-2 border-[#0F6E56] bg-white"></span>
            </span>
            ระดับนานาชาติ – วารสาร
          </span>

          <span className="flex items-center gap-2">
            <span className="relative flex items-center justify-center w-8 h-4">
              <span className="absolute w-full h-[2px] bg-orange-600/30 border-b-2 border-dashed border-[#D85A30]"></span>
              <span className="absolute w-8 h-full bg-orange-600/5"></span>
            </span>
            รวมทุกประเภทต่อปี
          </span>
        </div>

        {/* Main Line Chart */}
        <div className="bg-white border text-black border-gray-200 rounded-xl p-6 shadow-sm mb-12 h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={rawData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
              <XAxis 
                dataKey="year" 
                tick={{ fill: '#888780', fontSize: 12 }}
                tickFormatter={(value) => `ปี ${value}`}
                axisLine={false}
                tickLine={false}
                dy={10}
              />
              <YAxis
                domain={[0, 9]}
                tickCount={10}
                tick={{ fill: '#888780', fontSize: 12 }}
                tickFormatter={(value) => `${value} ผลงาน`}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip content={<CustomTooltip />} />
              
              <Area 
                type="monotone" 
                dataKey="total" 
                name="รวมทุกประเภทต่อปี" 
                fill="rgba(216,90,48,0.08)" 
                stroke="#D85A30" 
                strokeDasharray="4 2"
                strokeWidth={3}
                activeDot={false}
              />
              <Line 
                type="monotone" 
                dataKey="natProc" 
                name="ระดับชาติ – Proceedings" 
                stroke="#185FA5" 
                strokeWidth={2.5} 
                dot={{ r: 5, fill: '#185FA5', stroke: '#fff', strokeWidth: 2 }} 
                activeDot={{ r: 7 }} 
              />
              <Line 
                type="monotone" 
                dataKey="natJour" 
                name="ระดับชาติ – วารสาร" 
                stroke="#378ADD" 
                strokeDasharray="6 3" 
                strokeWidth={2.5} 
                dot={{ r: 5, fill: '#378ADD', stroke: '#fff', strokeWidth: 2 }} 
                activeDot={{ r: 7 }} 
              />
              <Line 
                type="monotone" 
                dataKey="intProc" 
                name="ระดับนานาชาติ – Proceedings" 
                stroke="#1D9E75" 
                strokeWidth={2.5} 
                dot={{ r: 5, fill: '#1D9E75', stroke: '#fff', strokeWidth: 2 }} 
                activeDot={{ r: 7 }} 
              />
              <Line 
                type="monotone" 
                dataKey="intJour" 
                name="ระดับนานาชาติ – วารสาร" 
                stroke="#0F6E56" 
                strokeWidth={2.5} 
                dot={{ r: 5, fill: '#fff', stroke: '#0F6E56', strokeWidth: 2 }} 
                activeDot={{ r: 7, fill: '#0F6E56' }} 
              />
            </ComposedChart>
          </ResponsiveContainer>
        </div>

        {/* Secondary Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Bar Chart Section */}
          <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
            <h3 className="text-sm font-semibold text-gray-900 mb-6">ผลงานรวมต่อปี (รายประเภท)</h3>
            <div className="h-[240px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={rawData} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                  <XAxis 
                    dataKey="year" 
                    tick={{ fill: '#888780', fontSize: 11 }}
                    axisLine={false}
                    tickLine={false}
                    dy={10}
                  />
                  <YAxis 
                    domain={[0, 9]} 
                    tickCount={6}
                    tick={{ fill: '#888780', fontSize: 11 }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <Tooltip content={<CustomTooltip />} cursor={{fill: 'transparent'}} />
                  <Bar dataKey="natProc" name="ระดับชาติ – Proceedings" stackId="a" fill="#185FA5" radius={[0, 0, 0, 0]} />
                  <Bar dataKey="natJour" name="ระดับชาติ – วารสาร" stackId="a" fill="#85B7EB" radius={[0, 0, 0, 0]} />
                  <Bar dataKey="intProc" name="ระดับนานาชาติ – Proceedings" stackId="a" fill="#1D9E75" radius={[0, 0, 0, 0]} />
                  <Bar dataKey="intJour" name="ระดับนานาชาติ – วารสาร" stackId="a" fill="#9FE1CB" radius={[2, 2, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Ratio Chart Section */}
          <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
            <h3 className="text-sm font-semibold text-gray-900 mb-6">อัตราส่วนผลงาน : อาจารย์และนักวิจัย</h3>
            <div className="h-[240px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={rawData} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                  <XAxis 
                    dataKey="year" 
                    tick={{ fill: '#888780', fontSize: 11 }}
                    axisLine={false}
                    tickLine={false}
                    dy={10}
                  />
                  <YAxis 
                    domain={[0, 1.2]} 
                    tickCount={7}
                    tick={{ fill: '#888780', fontSize: 11 }}
                    tickFormatter={(v) => v.toFixed(2)}
                    axisLine={false}
                    tickLine={false}
                  />
                  <Tooltip content={<RatioTooltip />} />
                  <Area 
                    type="monotone" 
                    dataKey="ratio" 
                    name="อัตราส่วน"
                    stroke="#BA7517" 
                    strokeWidth={2.5}
                    fill="rgba(186,117,23,0.10)" 
                    dot={{ r: 5, fill: '#BA7517', stroke: '#fff', strokeWidth: 2 }}
                    activeDot={{ r: 7 }}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Data Table Section */}
        <div className="mb-8">
          <h3 className="text-sm font-semibold text-gray-900 mb-4">ตารางข้อมูลรายปี</h3>
          <div className="bg-white border border-gray-200 rounded-xl overflow-x-auto shadow-sm">
            <table className="w-full text-sm text-left">
              <thead className="bg-gray-50/80 border-b border-gray-200 text-xs">
                <tr>
                  <th className="px-6 py-4 font-semibold text-gray-600">ปีการศึกษา</th>
                  <th className="px-4 py-4 text-center font-semibold text-[#185FA5]">ชาติ Proc.</th>
                  <th className="px-4 py-4 text-center font-semibold text-[#185FA5]">ชาติ วารสาร</th>
                  <th className="px-4 py-4 text-center font-semibold text-[#1D9E75]">นานาชาติ Proc.</th>
                  <th className="px-4 py-4 text-center font-semibold text-[#1D9E75]">นานาชาติ วารสาร</th>
                  <th className="px-4 py-4 text-center font-semibold text-[#D85A30]">รวม</th>
                  <th className="px-6 py-4 text-center font-semibold text-gray-600">จำนวน : อ./นักวิจัย</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {rawData.map((row, i) => (
                  <tr key={row.year} className={`hover:bg-gray-50/50 transition-colors ${i % 2 === 0 ? 'bg-white' : 'bg-gray-50/30'}`}>
                    <td className="px-6 py-3.5 font-medium text-gray-900">{row.year}</td>
                    <td className="px-4 py-3.5 text-center text-[#185FA5]">{row.natProc === 0 ? '–' : row.natProc}</td>
                    <td className="px-4 py-3.5 text-center text-[#185FA5]">{row.natJour}</td>
                    <td className="px-4 py-3.5 text-center text-[#1D9E75]">{row.intProc === 0 ? '–' : row.intProc}</td>
                    <td className="px-4 py-3.5 text-center text-[#1D9E75]">{row.intJour}</td>
                    <td className="px-4 py-3.5 text-center font-medium text-[#D85A30]">{row.total}</td>
                    <td className="px-6 py-3.5 text-center text-gray-500">{row.ratioStr}</td>
                  </tr>
                ))}
              </tbody>
              <tfoot className="bg-gray-50 border-t-2 border-gray-200/80">
                <tr>
                  <td className="px-6 py-4 font-semibold text-gray-900">รวมทั้งหมด</td>
                  <td className="px-4 py-4 text-center font-semibold text-[#185FA5]">{stats.totalNatProc}</td>
                  <td className="px-4 py-4 text-center font-semibold text-[#185FA5]">{stats.totalNatJour}</td>
                  <td className="px-4 py-4 text-center font-semibold text-[#1D9E75]">{stats.totalIntProc}</td>
                  <td className="px-4 py-4 text-center font-semibold text-[#1D9E75]">{stats.totalIntJour}</td>
                  <td className="px-4 py-4 text-center font-semibold text-[#D85A30]">{stats.overallTotal}</td>
                  <td className="px-6 py-4 text-center font-medium text-gray-400">–</td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
}
