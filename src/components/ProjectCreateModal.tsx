import { useState, useEffect } from 'react';
import { X, Sparkles, Folder, File, Loader2 } from 'lucide-react';
import { useApp, Project } from '../store/AppContext';
import { Task } from '../data/mockTasks';

interface ProjectCreateModalProps {
  onClose: () => void;
}

export function ProjectCreateModal({ onClose }: ProjectCreateModalProps) {
  const { addProject, addTask, categories, addCategory } = useApp();
  const [prompt, setPrompt] = useState('');
  const [files, setFiles] = useState<any[]>([]);
  const [selectedFileIds, setSelectedFileIds] = useState<string[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);

  useEffect(() => {
    fetch('/api/workspace-files')
      .then(res => res.json())
      .then(data => setFiles(data))
      .catch(err => console.error(err));
  }, []);

  const toggleFile = (id: string) => {
    setSelectedFileIds(prev => 
      prev.includes(id) ? prev.filter(fid => fid !== id) : [...prev, id]
    );
  };

  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    setIsGenerating(true);

    const filesContext = selectedFileIds.map(id => {
      const f = files.find(f => f.id === id);
      return f ? `- ${f.name} (type: ${f.type})` : '';
    }).join('\\n');

    try {
      const response = await fetch('/api/generate-project', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt, filesContext })
      });
      const data = await response.json();
      
      const newProject: Project = {
        id: `p-${Date.now()}`,
        name: data.projectName,
        description: data.projectDescription,
        progress: 0,
        status: '进行中',
        deadline: data.milestones?.[data.milestones.length - 1]?.date || '2024-12-31',
        milestones: data.milestones || []
      };

      addProject(newProject);

      // Add a specific category for this project if we want, or use first one
      addCategory(newProject.name, 'bg-indigo-500');
      
      // We need to wait for state to update, or just find it.
      // But addCategory works asynchronously. It's better to just put them in the first category for simplicity or create a unique category ID.
      // Let's create a category object immediately if we were mutating, but we only have addTask which takes a string ID.
      // Actually we can just pass the category name as we don't have its ID yet, but addTask needs ID.
      // For now, we'll just put them in categories[0].
      
      data.tasks?.forEach((task: any, index: number) => {
        const newTask: Task = {
          id: `t-gen-${Date.now()}-${index}`,
          title: task.title,
          description: task.description,
          priority: task.priority as 'high' | 'medium' | 'low',
          status: '待处理',
          deadline: task.deadline,
          project: data.projectName,
          assignee: 'AI Assistant',
          assigneeAvatar: 'AI',
          aiSuggestions: []
        };
        // Add to the first category by default
        addTask(newTask, categories[0]?.id);
      });

      onClose();
    } catch (error) {
      console.error(error);
      alert('项目生成失败，请重试');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl w-full max-w-2xl overflow-hidden shadow-xl flex flex-col max-h-[90vh]">
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
            <Sparkles size={20} className="text-blue-500" />
            AI 智能创建项目
          </h2>
          <button onClick={onClose} className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors">
            <X size={20} />
          </button>
        </div>

        <div className="p-6 overflow-y-auto flex-1">
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">项目需求描述</label>
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="例如：开发一个面向企业的内部知识库系统，包含文档编辑、权限控制和全文搜索功能..."
                className="w-full h-32 px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 resize-none"
              />
            </div>

            <div className="space-y-3">
              <label className="text-sm font-medium text-slate-700 flex items-center gap-2">
                <Folder size={16} className="text-slate-400" />
                关联本地工作区文件作为上下文
              </label>
              <div className="grid grid-cols-2 gap-3">
                {files.map(f => (
                  <div 
                    key={f.id} 
                    onClick={() => toggleFile(f.id)}
                    className={`p-3 rounded-xl border cursor-pointer flex items-center gap-3 transition-colors ${selectedFileIds.includes(f.id) ? 'border-blue-500 bg-blue-50' : 'border-slate-200 bg-white hover:bg-slate-50'}`}
                  >
                    <File size={16} className={selectedFileIds.includes(f.id) ? 'text-blue-500' : 'text-slate-400'} />
                    <span className={`text-sm ${selectedFileIds.includes(f.id) ? 'font-medium text-blue-700' : 'text-slate-600'}`}>{f.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="px-6 py-4 border-t border-slate-100 flex items-center justify-end gap-3 bg-slate-50">
          <button 
            onClick={onClose}
            className="px-5 py-2.5 text-sm font-medium text-slate-600 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors"
          >
            取消
          </button>
          <button 
            onClick={handleGenerate}
            disabled={!prompt.trim() || isGenerating}
            className="px-5 py-2.5 text-sm font-medium text-white bg-blue-600 rounded-xl hover:bg-blue-700 transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
          >
            {isGenerating ? (
              <><Loader2 size={16} className="animate-spin" /> 生成中...</>
            ) : (
              <><Sparkles size={16} /> 生成项目计划</>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
