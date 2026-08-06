/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { Layers, CheckSquare, FolderArchive, Calendar, BookOpen, Settings, Bot, Cpu } from 'lucide-react';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { TaskManagementView } from './views/TaskManagementView';
import { ProductManagementView } from './views/ProductManagementView';
import { RndCenterView } from './views/RndCenterView';
import { FileArchiveView } from './views/FileArchiveView';
import { ScheduleView } from './views/ScheduleView';
import { KnowledgeBaseView } from './views/KnowledgeBaseView';
import { SettingsView } from './views/SettingsView';
import { AgentWorkspaceView } from './views/AgentWorkspaceView';
import { AppProvider, useApp } from './store/AppContext';

export const MENU_ITEMS = [
  { id: 'agent', icon: Bot, label: 'Agent 工作区', subtitle: '智能问答 · 任务自动化 · 工具集成' },
  { id: 'tasks', icon: CheckSquare, label: '任务管理', subtitle: '高效流转 · 智能协同 · 结果驱动', isNew: true },
  { id: 'product-management', icon: Layers, label: '产品管理', subtitle: '全生命周期总览 · 阶段管控 · 文档中心 · 指标监控' },
  { id: 'schedule', icon: Calendar, label: '日常管理', subtitle: '时间规划 · 会议安排 · 事项提醒' },
  { id: 'files', icon: FolderArchive, label: '文件归档', subtitle: '工作区管理 · 本地文件索引 · AI 资产总结' },
  { id: 'knowledge', icon: BookOpen, label: '知识库', subtitle: '经验总结 · 最佳实践 · 团队财富' },
  { id: 'settings', icon: Settings, label: '设置中心', subtitle: '系统配置 · 权限管理 · 个性化' },
];

function MainLayout() {
  const [activeTab, setActiveTab] = useState('agent');
  const { setSelectedProductId } = useApp();

  const getHeaderInfo = () => {
    if (activeTab === 'rnd-center') {
      return {
        label: '产品研发中心',
        subtitle: 'AI 成果物生成 · 需求推导 · 交互原型 · 代码脚手架 · 测试准入'
      };
    }
    const currentItem = MENU_ITEMS.find(item => item.id === activeTab) || MENU_ITEMS[0];
    return {
      label: currentItem.label,
      subtitle: currentItem.subtitle
    };
  };

  const headerInfo = getHeaderInfo();

  const handleNavigateToRnd = (productId: string) => {
    if (productId) {
      setSelectedProductId(productId);
    }
    setActiveTab('rnd-center');
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'agent':
        return <AgentWorkspaceView />;
      case 'tasks':
        return <TaskManagementView />;
      case 'product-management':
        return <ProductManagementView onNavigateToRnd={handleNavigateToRnd} />;
      case 'rnd-center':
        return <RndCenterView onNavigateTab={setActiveTab} />;
      case 'schedule':
        return <ScheduleView />;
      case 'files':
        return <FileArchiveView />;
      case 'knowledge':
        return <KnowledgeBaseView />;
      case 'settings':
        return <SettingsView />;
      default:
        return null;
    }
  };

  return (
    <div className="flex h-screen bg-[#F4F7FC] overflow-hidden font-sans text-slate-800 selection:bg-blue-100">
      <Sidebar activeTab={activeTab} onTabChange={setActiveTab} menuItems={MENU_ITEMS} />
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <Header title={headerInfo.label} subtitle={headerInfo.subtitle} />
        <main className="flex-1 overflow-auto p-8 pt-0 space-y-6">
          {renderContent()}
        </main>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <MainLayout />
    </AppProvider>
  );
}
