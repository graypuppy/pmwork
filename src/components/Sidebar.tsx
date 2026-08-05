import { Briefcase, Bot } from 'lucide-react';
import { ElementType } from 'react';

interface MenuItem {
  id: string;
  icon: ElementType;
  label: string;
  isNew?: boolean;
}

interface SidebarProps {
  activeTab: string;
  onTabChange: (id: string) => void;
  menuItems: MenuItem[];
}

export function Sidebar({ activeTab, onTabChange, menuItems }: SidebarProps) {
  return (
    <aside className="w-64 bg-white border-r border-slate-100 flex flex-col h-full shrink-0">
      <div className="p-6 flex items-center gap-3">
        <div className="bg-blue-600 text-white p-1.5 rounded-lg">
          <Briefcase size={20} />
        </div>
        <span className="font-bold text-xl tracking-tight text-slate-800">WenXiBuddy</span>
      </div>

      <nav className="flex-1 px-4 py-2 space-y-1 overflow-y-auto">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onTabChange(item.id)}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
              activeTab === item.id
                ? 'bg-blue-50 text-blue-600'
                : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
            }`}
          >
            <item.icon size={18} className={activeTab === item.id ? 'text-blue-600' : 'text-slate-400'} />
            {item.label}
            {item.isNew && <span className="ml-auto bg-blue-100 text-blue-600 text-xs px-2 py-0.5 rounded-full">新</span>}
          </button>
        ))}

        <div className="mt-8 mb-2 px-3 text-xs font-semibold text-slate-400 uppercase tracking-wider">
          我的工作区
        </div>
        <button className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium text-slate-600 hover:bg-slate-50">
          <Bot size={18} className="text-slate-400" />
          产品研发中心
        </button>
      </nav>

      <div className="p-4 border-t border-slate-100">
        <div className="flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-slate-50 cursor-pointer transition-colors">
          <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold text-sm">
            BR
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-slate-800 truncate">Brandon</p>
            <p className="text-xs text-slate-500 truncate">产品经理</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
