import { createContext, useContext, useState, ReactNode, Dispatch, SetStateAction } from 'react';
import { INITIAL_CATEGORIES, TaskCategory, Task } from '../data/mockTasks';

export interface ScheduleEvent {
  id: string;
  title: string;
  time: string;
  date: number;
  type: string;
  location: string;
}

const INITIAL_EVENTS: ScheduleEvent[] = [
  { id: '1', title: '需求评审会', time: '10:00 - 11:30', date: 15, type: 'meeting', location: '会议室 3A' },
  { id: '2', title: '设计走查', time: '14:00 - 15:00', date: 15, type: 'review', location: '线上会议' },
  { id: '3', title: '团队周报对齐', time: '17:00 - 18:00', date: 15, type: 'sync', location: 'Tencent Meeting' },
];

export interface ProjectMilestone {
  title: string;
  date: string;
  status: 'pending' | 'in-progress' | 'completed';
}

export interface Project {
  id: string;
  name: string;
  description: string;
  progress: number;
  status: string;
  deadline?: string;
  milestones: ProjectMilestone[];
}

const INITIAL_PROJECTS: Project[] = [
  {
    id: 'p1',
    name: 'Q3 产品线迭代规划',
    description: '包含核心功能的迭代与新架构迁移。',
    progress: 75,
    status: '进行中',
    deadline: '2024-09-30',
    milestones: [
      { title: '需求冻结', date: '2024-08-01', status: 'completed' },
      { title: 'UI/UX 设计', date: '2024-08-15', status: 'completed' },
      { title: '核心开发', date: '2024-09-01', status: 'in-progress' },
      { title: '内部测试', date: '2024-09-15', status: 'pending' },
      { title: '正式发布', date: '2024-09-30', status: 'pending' },
    ]
  },
  {
    id: 'p2',
    name: '品牌官网视觉升级',
    description: '全新的品牌视觉体验设计与前端实现。',
    progress: 30,
    status: '进行中',
    deadline: '2024-10-15',
    milestones: [
      { title: '设计概念', date: '2024-08-10', status: 'completed' },
      { title: '页面开发', date: '2024-09-10', status: 'in-progress' },
      { title: '上线', date: '2024-10-15', status: 'pending' },
    ]
  },
];

interface AppContextType {
  categories: TaskCategory[];
  setCategories: Dispatch<SetStateAction<TaskCategory[]>>;
  events: ScheduleEvent[];
  setEvents: Dispatch<SetStateAction<ScheduleEvent[]>>;
  projects: Project[];
  setProjects: Dispatch<SetStateAction<Project[]>>;
  addTask: (task: Task, categoryId?: string) => void;
  addCategory: (name: string, color?: string) => void;
  addEvent: (event: ScheduleEvent) => void;
  addProject: (project: Project) => void;
  completeTask: (taskId: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [categories, setCategories] = useState(INITIAL_CATEGORIES);
  const [events, setEvents] = useState(INITIAL_EVENTS);
  const [projects, setProjects] = useState<Project[]>(INITIAL_PROJECTS);

  const addProject = (newProject: Project) => {
    setProjects(prev => {
      if (prev.some(p => p.id === newProject.id)) return prev;
      return [...prev, newProject];
    });
  };

  const addCategory = (name: string, color: string = 'bg-blue-500') => {
    setCategories(prev => {
      if (prev.some(c => c.name === name)) return prev;
      return [...prev, {
        id: `cat-${Date.now()}`,
        name,
        color,
        tasks: []
      }];
    });
  };

  const addTask = (newTask: Task, categoryId?: string) => {
    setCategories(prev => {
      // Check if task already exists to prevent duplicate keys
      if (prev.some(cat => cat.tasks.some(t => t.id === newTask.id))) return prev;
      
      const newCats = [...prev];
      const targetIndex = categoryId ? newCats.findIndex(c => c.id === categoryId) : 0;
      const finalIndex = targetIndex >= 0 ? targetIndex : 0;
      
      newCats[finalIndex] = { ...newCats[finalIndex], tasks: [newTask, ...newCats[finalIndex].tasks] };
      return newCats;
    });
  };

  const addEvent = (newEvent: ScheduleEvent) => {
    setEvents(prev => {
      if (prev.some(e => e.id === newEvent.id)) return prev;
      return [...prev, newEvent].sort((a, b) => a.date - b.date);
    });
  };

  const completeTask = (taskId: string) => {
    setCategories(prev => prev.map(cat => ({
      ...cat,
      tasks: cat.tasks.map(task => 
        task.id === taskId ? { ...task, status: '已完成' } : task
      )
    })));
  };

  return (
    <AppContext.Provider value={{ categories, setCategories, events, setEvents, projects, setProjects, addCategory, addTask, addEvent, addProject, completeTask }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}
