import { useState, useRef, useEffect } from 'react';
import { Clock, Zap, Box, FileText, ChevronRight, Plus, Send, Paperclip, ChevronDown, Bot, Terminal, Folder, Cpu, Layers } from 'lucide-react';
import { useApp } from '../store/AppContext';

export function AgentWorkspaceView() {
  const { addTask, addEvent } = useApp();
  const [activeTab, setActiveTab] = useState<'recent' | 'scheduled'>('recent');
  
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<any[]>([]);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSubmit = () => {
    if (!input.trim()) return;
    const text = input.trim();
    setMessages(prev => [...prev, { role: 'user', text }]);
    setInput('');

    setTimeout(() => {
      if (text.includes('明天上午开会沟通需求') || text.includes('开会沟通需求')) {
        setMessages(prev => [...prev, { 
          role: 'ai', 
          text: '好的，我已经解析了您的指令，并执行了以下自动化操作：\n\n✅ 在任务管理中创建了高优先级任务【沟通需求】\n✅ 在日程表中预定了明天上午 10:00 的【沟通需求会议】' 
        }]);
        addTask({
          id: `PM-2025-00${Math.floor(Math.random() * 900) + 10}`,
          title: '沟通需求',
          priority: 'high',
          status: '未开始',
          description: 'AI 根据对话自动创建：与团队沟通确认最新的业务需求细节。',
          project: '产品经理工作台 2.0',
          assignee: 'graypuppy',
          assigneeAvatar: 'GP',
          deadline: '明天 12:00',
          aiSuggestions: ['建议提前准备会议大纲', '相关文件可能需要关联最新版 PRD']
        });
        addEvent({
          id: Date.now().toString(),
          title: '沟通需求会议',
          time: '10:00 - 11:30',
          date: 16,
          type: 'meeting',
          location: '会议室 3A'
        });
      } else {
        setMessages(prev => [...prev, { 
          role: 'ai', 
          text: `收到指令："${text}"。这是一个演示体验，您可以尝试输入：“明天上午开会沟通需求”，体验自动化创建任务和日程的功能。` 
        }]);
      }
    }, 1000);
  };

  const recentTasks = [
    { time: '5分钟前', title: 'BLCaptain 付费榜扫描选品', messageCount: 7, agent: 'mino' },
    { time: '5分钟前', title: '帮我安装 BLCaptain App Store Demand Min...', messageCount: 1, agent: 'mino' },
    { time: '6天前', title: '直接在reddit 上进行需求挖掘。', messageCount: 2, agent: 'Nova' },
    { time: '7月21日', title: '非遗手工制品跨境平台调研', messageCount: 4, agent: 'Nova' },
    { time: '7月21日', title: '非遗手工制品跨境平台调研', messageCount: 6, agent: 'Nova' },
  ];

  const agents = [
    { name: 'NOVA', path: 'C:\\Users\\10345\\...', icon: Zap, color: 'text-amber-600', bg: 'bg-amber-100' },
    { name: 'Obsidian', path: 'G:\\Documents\\N...', icon: Box, color: 'text-slate-600', bg: 'bg-slate-100' },
    { name: 'nova (微信)', path: 'C:\\Users\\10345\\...', icon: Zap, color: 'text-amber-600', bg: 'bg-amber-100' },
    { name: '合同审核', path: 'D:\\Projects\\Epoin...', icon: FileText, color: 'text-slate-600', bg: 'bg-slate-100' },
    { name: '文档审核', path: 'D:\\Projects\\Epoin...', icon: FileText, color: 'text-slate-600', bg: 'bg-slate-100' },
    { name: 'AI报销审查', path: 'D:\\Projects\\Epoin...', icon: Box, color: 'text-slate-600', bg: 'bg-slate-100' },
    { name: 'Novel', path: 'C:\\Users\\10345\\...', icon: Zap, color: 'text-amber-600', bg: 'bg-amber-100' },
  ];

  return (
    <div className="flex gap-6 h-[calc(100vh-140px)]">
      {/* Left Area: Chat */}
      <div className="flex-1 flex flex-col min-w-0 bg-gradient-to-br from-blue-50/30 via-white to-emerald-50/30 rounded-2xl border border-slate-100 shadow-sm relative overflow-hidden">
        {/* Header */}
        <div className="p-3 bg-white/80 backdrop-blur-sm border-b border-slate-100 flex items-center justify-between text-xs font-medium absolute top-0 left-0 right-0 z-10">
          <div className="flex items-center gap-4">
            <button className="flex items-center gap-1.5 hover:text-slate-900 transition-colors bg-white border border-slate-200 px-2 py-1 rounded shadow-sm">
              <Folder size={14} className="text-blue-500" />
              当前工作区
              <ChevronDown size={12} className="text-slate-400" />
            </button>
            <button className="flex items-center gap-1.5 hover:text-slate-900 transition-colors bg-white border border-slate-200 px-2 py-1 rounded shadow-sm">
              <Cpu size={14} className="text-blue-500" />
              DeepSeek Chat
              <ChevronDown size={12} className="text-slate-400" />
            </button>
          </div>
        </div>

        {/* Chat Area / Empty State */}
        <div className="flex-1 overflow-y-auto p-6 pt-16 flex flex-col">
          {messages.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center -mt-16">
              <h1 className="text-5xl font-black text-blue-100 tracking-tight mb-4 select-none">
                NovaAgents
              </h1>
              <p className="text-lg text-blue-600/80 font-medium select-none">
                一念既起，万事皆成
              </p>
            </div>
          ) : (
            <div className="space-y-6 flex-1 pb-10">
              {messages.map((msg, idx) => (
                <div key={idx} className={`flex gap-4 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${msg.role === 'user' ? 'bg-blue-600 text-white shadow-md' : 'bg-blue-50 text-blue-600 border border-blue-100'}`}>
                    {msg.role === 'user' ? <div className="text-xs font-bold">ME</div> : <Bot size={20} />}
                  </div>
                  <div className={`max-w-[75%] rounded-2xl p-4 text-sm leading-relaxed whitespace-pre-wrap ${
                    msg.role === 'user' 
                      ? 'bg-blue-600 text-white rounded-tr-sm shadow-md' 
                      : 'bg-slate-50 text-slate-700 rounded-tl-sm border border-slate-200 shadow-sm'
                  }`}>
                    {msg.text}
                  </div>
                </div>
              ))}
              <div ref={chatEndRef} />
            </div>
          )}
        </div>

        {/* Input Area */}
        <div className="p-6 bg-gradient-to-t from-white via-white to-transparent pt-10">
          <div className="max-w-3xl mx-auto bg-white rounded-2xl border-2 border-slate-200 focus-within:border-blue-500 focus-within:ring-4 focus-within:ring-blue-500/10 transition-all p-2 shadow-lg">
            <textarea
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSubmit();
                }
              }}
              placeholder="今天，想干点啥？ (例如: 明天上午开会沟通需求)..."
              className="w-full bg-transparent text-base text-slate-800 placeholder-slate-400 border-none focus:outline-none resize-none px-4 py-3 h-14"
            />
            <div className="flex justify-between items-center px-3 pb-2 pt-1">
              <div className="flex items-center gap-3">
                <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-100 transition-colors">
                  <Zap size={16} className="text-amber-500" /> NOVA <ChevronDown size={14} className="text-slate-400" />
                </button>
                <div className="w-px h-4 bg-slate-200"></div>
                <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-100 transition-colors">
                  <Plus size={16} className="text-blue-500" /> 
                </button>
                <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-100 transition-colors">
                  <Zap size={16} className="text-blue-500" /> 行动 <ChevronDown size={14} className="text-slate-400" />
                </button>
                <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-100 transition-colors">
                  <Layers size={16} className="text-blue-500" /> 工具
                </button>
              </div>
              <button 
                onClick={handleSubmit}
                disabled={!input.trim()}
                className={`p-2.5 rounded-xl transition-all shadow-sm flex items-center justify-center ${input.trim() ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-slate-100 text-slate-400 cursor-not-allowed'}`}
              >
                <Send size={18} className={input.trim() ? 'translate-x-px' : ''} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Right Area: Workspace */}
      <div className="w-[480px] shrink-0 flex flex-col gap-6 overflow-y-auto custom-scrollbar">
        {/* Tasks Section */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
          <div className="flex items-center gap-6 mb-6 border-b border-slate-100 pb-2">
            <button 
              onClick={() => setActiveTab('recent')}
              className={`pb-2 text-sm font-bold border-b-2 transition-colors ${activeTab === 'recent' ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-500 hover:text-slate-800'}`}
            >
              最近任务
            </button>
            <button 
              onClick={() => setActiveTab('scheduled')}
              className={`pb-2 text-sm font-bold border-b-2 transition-colors ${activeTab === 'scheduled' ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-500 hover:text-slate-800'}`}
            >
              定时任务
            </button>
          </div>

          <div className="space-y-4">
            {activeTab === 'recent' && recentTasks.map((task, idx) => (
              <div key={idx} className="flex items-center justify-between group cursor-pointer hover:bg-slate-50 p-2 -mx-2 rounded-lg transition-colors">
                <div className="flex items-center gap-4 min-w-0">
                  <div className="flex items-center gap-1.5 text-xs text-slate-400 shrink-0">
                    <Clock size={14} />
                    {task.time}
                  </div>
                  <div className="text-sm text-slate-700 truncate font-medium">
                    {task.title}
                  </div>
                  <div className="text-xs text-slate-400 shrink-0">
                    {task.messageCount} 条消息
                  </div>
                </div>
                <div className="flex items-center gap-1 text-xs text-blue-500 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Zap size={12} /> {task.agent}
                </div>
              </div>
            ))}
            {activeTab === 'scheduled' && (
              <div className="text-center text-sm text-slate-500 py-4">暂无定时任务</div>
            )}
          </div>
          
          <div className="mt-4 pt-4 border-t border-slate-100 text-center">
            <button className="text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center justify-center gap-1 w-full">
              查看全部 <ChevronRight size={16} />
            </button>
          </div>
        </div>

        {/* Agent Workspace Grid */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
          <div className="flex items-center justify-between mb-6">
             <h3 className="text-base font-bold text-slate-800 flex items-center gap-2">
                Agent 工作区
             </h3>
             <div className="flex items-center gap-4">
                <button className="text-sm text-blue-600 font-medium hover:text-blue-700">Logs</button>
                <button className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-500 text-white text-sm font-medium rounded-full hover:bg-blue-600 transition-colors">
                  <Plus size={16} /> 添加
                </button>
             </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {agents.map((agent, idx) => (
              <div key={idx} className="flex items-start gap-3 p-3 rounded-xl border border-slate-100 hover:border-blue-200 hover:shadow-sm transition-all cursor-pointer group">
                 <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${agent.bg} ${agent.color}`}>
                   <agent.icon size={20} />
                 </div>
                 <div className="min-w-0">
                    <div className="text-sm font-bold text-slate-700 truncate group-hover:text-blue-600 transition-colors">
                      {agent.name}
                    </div>
                    <div className="text-xs text-blue-500/80 truncate mt-0.5">
                      {agent.path}
                    </div>
                 </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
