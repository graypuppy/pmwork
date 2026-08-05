/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { LayoutDashboard, CheckSquare, FolderArchive, Calendar, LineChart, BookOpen, Settings, Bot } from 'lucide-react';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { TaskManagementView } from './views/TaskManagementView';
import { ProjectOverviewView } from './views/ProjectOverviewView';
import { FileArchiveView } from './views/FileArchiveView';
import { ScheduleView } from './views/ScheduleView';
import { SmartAnalysisView } from './views/SmartAnalysisView';
import { KnowledgeBaseView } from './views/KnowledgeBaseView';
import { SettingsView } from './views/SettingsView';
import { AgentWorkspaceView } from './views/AgentWorkspaceView';
import { AppProvider } from './store/AppContext';

export const MENU_ITEMS = [
  { id: 'agent', icon: Bot, label: 'Agent 工作区', subtitle: '智能问答 · 任务自动化 · 工具集成' },
  { id: 'tasks', icon: CheckSquare, label: '任务管理', subtitle: '高效流转 · 智能协同 · 结果驱动', isNew: true },
  { id: 'overview', icon: LayoutDashboard, label: '项目总览', subtitle: '全局视角 · 进度把控 · 风险预警' },
  { id: 'files', icon: FolderArchive, label: '文件归档', subtitle: '知识沉淀 · 版本控制 · 快捷检索' },
  { id: 'schedule', icon: Calendar, label: '日程管理', subtitle: '时间规划 · 会议安排 · 提醒通知' },
  { id: 'analysis', icon: LineChart, label: '智能分析', subtitle: '数据洞察 · 趋势预测 · 效能度量' },
  { id: 'knowledge', icon: BookOpen, label: '知识库', subtitle: '经验总结 · 最佳实践 · 团队财富' },
  { id: 'settings', icon: Settings, label: '设置中心', subtitle: '系统配置 · 权限管理 · 个性化' },
];

export default function App() {
  const [activeTab, setActiveTab] = useState('agent');
  const currentItem = MENU_ITEMS.find(item => item.id === activeTab) || MENU_ITEMS[0];

  const renderContent = () => {
    switch (activeTab) {
      case 'agent':
        return <AgentWorkspaceView />;
      case 'tasks':
        return <TaskManagementView />;
      case 'overview':
        return <ProjectOverviewView />;
      case 'files':
        return <FileArchiveView />;
      case 'schedule':
        return <ScheduleView />;
      case 'analysis':
        return <SmartAnalysisView />;
      case 'knowledge':
        return <KnowledgeBaseView />;
      case 'settings':
        return <SettingsView />;
      default:
        return null;
    }
  };

  return (
    <AppProvider>
      <div className="flex h-screen bg-[#F4F7FC] overflow-hidden font-sans text-slate-800 selection:bg-blue-100">
      <Sidebar activeTab={activeTab} onTabChange={setActiveTab} menuItems={MENU_ITEMS} />
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <Header title={currentItem.label} subtitle={currentItem.subtitle} />
        <main className="flex-1 overflow-auto p-8 pt-0 space-y-6">
          {renderContent()}
        </main>
      </div>
      </div>
    </AppProvider>
  );
}
