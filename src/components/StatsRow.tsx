import { ClipboardList, Activity, CheckCircle2, AlertCircle, ArrowUpRight, ArrowDownRight } from 'lucide-react';

export function StatsRow() {
  const stats = [
    {
      label: "今日待办",
      value: "12",
      trend: "+20%",
      isPositive: true,
      icon: ClipboardList,
      color: "text-blue-600",
      bgColor: "bg-blue-100",
      subLabel: "项任务"
    },
    {
      label: "进行中",
      value: "28",
      trend: "+8%",
      isPositive: true,
      icon: Activity,
      color: "text-indigo-600",
      bgColor: "bg-indigo-100",
      subLabel: "项任务"
    },
    {
      label: "已完成",
      value: "56",
      trend: "+15%",
      isPositive: true,
      icon: CheckCircle2,
      color: "text-emerald-600",
      bgColor: "bg-emerald-100",
      subLabel: "项任务"
    },
    {
      label: "逾期任务",
      value: "3",
      trend: "-40%",
      isPositive: true, // Down is good for overdue
      icon: AlertCircle,
      color: "text-rose-600",
      bgColor: "bg-rose-100",
      subLabel: "项任务"
    }
  ];

  return (
    <div className="grid grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <div key={index} className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm flex items-center justify-between group hover:shadow-md transition-shadow">
          <div>
            <p className="text-sm font-medium text-slate-500 mb-1">{stat.label}</p>
            <div className="flex items-baseline gap-2">
              <h3 className="text-3xl font-bold text-slate-800">{stat.value}</h3>
              <span className="text-sm text-slate-500">{stat.subLabel}</span>
            </div>
            <div className={`flex items-center gap-1 mt-2 text-xs font-medium ${stat.isPositive ? 'text-emerald-600' : 'text-rose-600'}`}>
              {stat.isPositive ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
              <span>{stat.trend}</span>
              <span className="text-slate-400 ml-1 font-normal">较昨日</span>
            </div>
          </div>
          <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${stat.bgColor} ${stat.color} group-hover:scale-110 transition-transform duration-300`}>
            <stat.icon size={24} strokeWidth={2} />
          </div>
        </div>
      ))}
    </div>
  );
}
