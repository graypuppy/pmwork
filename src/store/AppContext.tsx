import { createContext, useContext, useState, ReactNode, Dispatch, SetStateAction } from 'react';
import { INITIAL_CATEGORIES, TaskCategory, Task } from '../data/mockTasks';
import { 
  Product, 
  ProductMilestone, 
  ProductDocument, 
  ProductSkill, 
  INITIAL_PRODUCTS_DATA 
} from '../data/mockProducts';
import {
  ProductRequirementDesign,
  UIPrototypeScreen,
  ProductKnowledgeItem,
  CodeScaffoldItem,
  TestCaseItem,
  CompetitorAnalysisData,
  FullLifecycleDeliverable,
  INITIAL_REQUIREMENTS,
  INITIAL_PROTOTYPES,
  INITIAL_KNOWLEDGE_BASE,
  INITIAL_CODE_SCAFFOLDS,
  INITIAL_TEST_CASES,
  INITIAL_COMPETITOR_DATA,
  FULL_LIFECYCLE_DELIVERABLES_CATALOG
} from '../data/mockRndData';

export type { 
  Product, 
  ProductMilestone, 
  ProductDocument, 
  ProductSkill 
} from '../data/mockProducts';

export type {
  ProductRequirementDesign,
  UIPrototypeScreen,
  ProductKnowledgeItem,
  CodeScaffoldItem,
  TestCaseItem,
  CompetitorAnalysisData,
  FullLifecycleDeliverable
} from '../data/mockRndData';

// Backward compatibility alias
export type Project = Product;

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

export interface WorkspaceFile {
  id: string;
  name: string;
  type: 'doc' | 'code' | 'sheet' | 'pdf' | 'design' | 'archive';
  size: string;
  updatedAt: string;
  path: string;
  contentSnippet?: string;
}

export interface Workspace {
  id: string;
  name: string;
  folderPath: string;
  projectId?: string;
  projectName?: string;
  files: WorkspaceFile[];
  summary?: string;
  createdAt: string;
}

export interface LocalIndexedFile {
  id: string;
  name: string;
  folder: string;
  fullPath: string;
  size: string;
  type: 'doc' | 'code' | 'sheet' | 'pdf' | 'design' | 'archive';
  extension: string;
  updatedAt: string;
  associatedApp: string;
  isFavorite?: boolean;
}

const INITIAL_LOCAL_FILES: LocalIndexedFile[] = [
  {
    id: 'lf-1',
    name: 'PRD_核心业务需求规格说明书_v3.2.docx',
    folder: 'D:\\Projects\\产品经理工作台\\workspace\\docs',
    fullPath: 'D:\\Projects\\产品经理工作台\\workspace\\docs\\PRD_核心业务需求规格说明书_v3.2.docx',
    size: '2.8 MB',
    type: 'doc',
    extension: '.docx',
    updatedAt: '2025-05-18 14:30',
    associatedApp: 'Microsoft Word',
    isFavorite: true
  },
  {
    id: 'lf-2',
    name: 'System_Architecture_Topology.pdf',
    folder: 'D:\\Projects\\产品经理工作台\\workspace\\arch',
    fullPath: 'D:\\Projects\\产品经理工作台\\workspace\\arch\\System_Architecture_Topology.pdf',
    size: '4.5 MB',
    type: 'pdf',
    extension: '.pdf',
    updatedAt: '2025-05-16 11:20',
    associatedApp: 'Adobe Acrobat',
    isFavorite: true
  },
  {
    id: 'lf-3',
    name: 'openapi_spec_v2.json',
    folder: 'D:\\Projects\\产品经理工作台\\workspace\\api',
    fullPath: 'D:\\Projects\\产品经理工作台\\workspace\\api\\openapi_spec_v2.json',
    size: '340 KB',
    type: 'code',
    extension: '.json',
    updatedAt: '2025-05-15 09:45',
    associatedApp: 'VS Code'
  },
  {
    id: 'lf-4',
    name: 'Brand_Design_System_v2.fig',
    folder: 'D:\\Projects\\BrandPortal\\assets',
    fullPath: 'D:\\Projects\\BrandPortal\\assets\\Brand_Design_System_v2.fig',
    size: '18.6 MB',
    type: 'design',
    extension: '.fig',
    updatedAt: '2025-05-17 16:15',
    associatedApp: 'Figma',
    isFavorite: true
  },
  {
    id: 'lf-5',
    name: '自动化测试用例覆盖率报告_Sprint12.xlsx',
    folder: 'D:\\Projects\\产品经理工作台\\workspace\\qa',
    fullPath: 'D:\\Projects\\产品经理工作台\\workspace\\qa\\自动化测试用例覆盖率报告_Sprint12.xlsx',
    size: '1.2 MB',
    type: 'sheet',
    extension: '.xlsx',
    updatedAt: '2025-05-12 17:00',
    associatedApp: 'Microsoft Excel'
  }
];

const INITIAL_WORKSPACES: Workspace[] = [
  {
    id: 'ws-1',
    name: '产品经理工作台 核心研发工作区',
    folderPath: 'D:\\Projects\\产品经理工作台\\workspace',
    projectId: 'p1',
    projectName: '产品经理工作台',
    createdAt: '2025-05-10',
    summary: '',
    files: [
      {
        id: 'f-1',
        name: 'PRD_核心业务需求规格说明书_v3.2.docx',
        type: 'doc',
        size: '2.8 MB',
        updatedAt: '2025-05-18 14:30',
        path: 'D:\\Projects\\产品经理工作台\\workspace\\docs\\PRD_核心业务需求规格说明书_v3.2.docx',
        contentSnippet: '涵盖Q3版本核心业务逻辑、权限体系重构、数据指标报表及智能AI协同工作流定义。'
      },
      {
        id: 'f-2',
        name: 'System_Architecture_Topology.pdf',
        type: 'pdf',
        size: '4.5 MB',
        updatedAt: '2025-05-16 11:20',
        path: 'D:\\Projects\\产品经理工作台\\workspace\\arch\\System_Architecture_Topology.pdf',
        contentSnippet: '微服务架构拓扑、高可用容灾方案、数据缓存层与消息队列流转图谱。'
      }
    ]
  }
];

// Helper to construct initial deliverables for a product
function buildInitialDeliverables(product: Product): FullLifecycleDeliverable[] {
  return FULL_LIFECYCLE_DELIVERABLES_CATALOG.map((cat, idx) => ({
    id: `del-${product.id}-${cat.code}`,
    productId: product.id,
    phase: cat.phase,
    phaseName: cat.phaseName,
    code: cat.code,
    title: cat.title,
    category: cat.category,
    format: cat.format,
    icon: cat.icon,
    summary: cat.summary,
    status: idx < 6 ? 'ready' : 'draft',
    generatedAt: idx < 6 ? '2025-06-01 15:30' : '待生成',
    wordCount: idx < 6 ? `${Math.floor(2500 + Math.random() * 2000)} 字` : '0 字',
    tags: [cat.phaseName, cat.format.toUpperCase()],
    content: cat.defaultContent(product)
  }));
}

interface AppContextType {
  categories: TaskCategory[];
  setCategories: Dispatch<SetStateAction<TaskCategory[]>>;
  events: ScheduleEvent[];
  setEvents: Dispatch<SetStateAction<ScheduleEvent[]>>;
  projects: Product[];
  setProjects: Dispatch<SetStateAction<Product[]>>;
  products: Product[];
  setProducts: Dispatch<SetStateAction<Product[]>>;
  selectedProductId: string | null;
  setSelectedProductId: Dispatch<SetStateAction<string | null>>;
  workspaces: Workspace[];
  setWorkspaces: Dispatch<SetStateAction<Workspace[]>>;
  localIndexedFiles: LocalIndexedFile[];
  setLocalIndexedFiles: Dispatch<SetStateAction<LocalIndexedFile[]>>;
  
  // R&D Center Specific State & Getters
  requirements: Record<string, ProductRequirementDesign>;
  prototypes: Record<string, UIPrototypeScreen>;
  knowledgeBase: Record<string, ProductKnowledgeItem[]>;
  codeScaffolds: Record<string, CodeScaffoldItem[]>;
  testCases: Record<string, TestCaseItem[]>;
  competitorData: Record<string, CompetitorAnalysisData>;
  deliverables: Record<string, FullLifecycleDeliverable[]>;

  // R&D Operations
  getRequirementForProduct: (productId: string) => ProductRequirementDesign;
  updateRequirement: (productId: string, updates: Partial<ProductRequirementDesign>) => void;
  generateRequirementAI: (productId: string, promptText: string, scenarioTemplate?: string) => Promise<void>;

  getPrototypeForProduct: (productId: string) => UIPrototypeScreen;
  updatePrototype: (productId: string, updates: Partial<UIPrototypeScreen>) => void;
  generatePrototypeAI: (productId: string, promptText: string, device?: 'desktop' | 'mobile' | 'tablet', theme?: 'indigo' | 'dark' | 'mint' | 'sunset') => Promise<void>;

  getKnowledgeForProduct: (productId: string) => ProductKnowledgeItem[];
  addKnowledgeItem: (productId: string, item: Omit<ProductKnowledgeItem, 'id' | 'productId' | 'updatedAt'>) => void;
  updateKnowledgeItem: (productId: string, itemId: string, updates: Partial<ProductKnowledgeItem>) => void;
  deleteKnowledgeItem: (productId: string, itemId: string) => void;
  polishKnowledgeArticleAI: (productId: string, itemId: string, action: string) => Promise<string>;

  getCodeScaffoldsForProduct: (productId: string) => CodeScaffoldItem[];
  addCodeScaffold: (productId: string, item: Omit<CodeScaffoldItem, 'id' | 'productId'>) => void;
  generateCodeScaffoldAI: (productId: string, type: 'api' | 'types' | 'component' | 'schema' | 'docker' | 'commit', promptText?: string) => Promise<void>;

  getTestCasesForProduct: (productId: string) => TestCaseItem[];
  addTestCase: (productId: string, item: Omit<TestCaseItem, 'id' | 'productId'>) => void;
  updateTestCase: (productId: string, testCaseId: string, updates: Partial<TestCaseItem>) => void;
  deleteTestCase: (productId: string, testCaseId: string) => void;
  generateTestCasesAI: (productId: string, promptText?: string) => Promise<void>;
  runTestCase: (productId: string, testCaseId: string) => Promise<void>;
  runAllTestCases: (productId: string) => Promise<void>;

  getCompetitorDataForProduct: (productId: string) => CompetitorAnalysisData;
  updateCompetitorData: (productId: string, updates: Partial<CompetitorAnalysisData>) => void;
  generateCompetitorAnalysisAI: (productId: string, customPrompt?: string) => Promise<void>;

  getDeliverablesForProduct: (productId: string) => FullLifecycleDeliverable[];
  generateDeliverableAI: (productId: string, code: string, customPrompt?: string) => Promise<void>;
  generateAllDeliverablesBatchAI: (productId: string, onProgress?: (percent: number, currentTitle: string) => void) => Promise<void>;
  syncDeliverableToDocs: (productId: string, deliverableId: string) => void;

  // Base Products & Tasks
  addTask: (task: Task, categoryId?: string) => void;
  addCategory: (name: string, color?: string) => void;
  addEvent: (event: ScheduleEvent) => void;
  addProject: (project: Product) => void;
  addProduct: (product: Product) => void;
  updateProduct: (id: string, updates: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  addProductDocument: (productId: string, doc: ProductDocument) => void;
  toggleSkillStatus: (productId: string, skillId: string) => void;
  runProductSkill: (productId: string, skillId: string) => Promise<any>;
  addProductMilestone: (productId: string, milestone: ProductMilestone) => void;
  updateMilestoneStatus: (productId: string, milestoneId: string, status: 'completed' | 'in-progress' | 'pending') => void;
  addWorkspace: (workspace: Workspace) => void;
  updateWorkspace: (id: string, updates: Partial<Workspace>) => void;
  deleteWorkspace: (id: string) => void;
  addLocalIndexedFile: (file: LocalIndexedFile) => void;
  completeTask: (taskId: string) => void;
  getProjectTaskCount: (projectIdOrName?: string) => number;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [categories, setCategories] = useState(INITIAL_CATEGORIES);
  const [events, setEvents] = useState(INITIAL_EVENTS);
  const [projects, setProjects] = useState<Product[]>(INITIAL_PRODUCTS_DATA);
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
  const [workspaces, setWorkspaces] = useState<Workspace[]>(INITIAL_WORKSPACES);
  const [localIndexedFiles, setLocalIndexedFiles] = useState<LocalIndexedFile[]>(INITIAL_LOCAL_FILES);

  // R&D states
  const [requirements, setRequirements] = useState<Record<string, ProductRequirementDesign>>(INITIAL_REQUIREMENTS);
  const [prototypes, setPrototypes] = useState<Record<string, UIPrototypeScreen>>(INITIAL_PROTOTYPES);
  const [knowledgeBase, setKnowledgeBase] = useState<Record<string, ProductKnowledgeItem[]>>(INITIAL_KNOWLEDGE_BASE);
  const [codeScaffolds, setCodeScaffolds] = useState<Record<string, CodeScaffoldItem[]>>(INITIAL_CODE_SCAFFOLDS);
  const [testCases, setTestCases] = useState<Record<string, TestCaseItem[]>>(INITIAL_TEST_CASES);
  const [competitorData, setCompetitorData] = useState<Record<string, CompetitorAnalysisData>>(INITIAL_COMPETITOR_DATA);
  
  const [deliverables, setDeliverables] = useState<Record<string, FullLifecycleDeliverable[]>>(() => {
    const map: Record<string, FullLifecycleDeliverable[]> = {};
    INITIAL_PRODUCTS_DATA.forEach(p => {
      map[p.id] = buildInitialDeliverables(p);
    });
    return map;
  });

  // Base Products
  const addProject = (newProject: Product) => {
    setProjects(prev => {
      if (prev.some(p => p.id === newProject.id)) return prev;
      return [...prev, newProject];
    });

    // Also populate default deliverables and R&D scaffolding for new products
    setDeliverables(prev => ({
      ...prev,
      [newProject.id]: buildInitialDeliverables(newProject)
    }));
  };

  const addProduct = addProject;

  const updateProduct = (id: string, updates: Partial<Product>) => {
    setProjects(prev => prev.map(p => p.id === id ? { ...p, ...updates } : p));
  };

  const deleteProduct = (id: string) => {
    setProjects(prev => prev.filter(p => p.id !== id));
    if (selectedProductId === id) {
      setSelectedProductId(null);
    }
  };

  const addProductDocument = (productId: string, doc: ProductDocument) => {
    setProjects(prev => prev.map(p => {
      if (p.id !== productId) return p;
      return {
        ...p,
        documents: [doc, ...p.documents]
      };
    }));
  };

  const toggleSkillStatus = (productId: string, skillId: string) => {
    setProjects(prev => prev.map(p => {
      if (p.id !== productId) return p;
      return {
        ...p,
        associatedSkills: p.associatedSkills.map(s => {
          if (s.id !== skillId) return s;
          return {
            ...s,
            status: s.status === 'active' ? 'idle' : 'active'
          };
        })
      };
    }));
  };

  const runProductSkill = async (productId: string, skillId: string) => {
    setProjects(prev => prev.map(p => {
      if (p.id !== productId) return p;
      return {
        ...p,
        associatedSkills: p.associatedSkills.map(s => {
          if (s.id !== skillId) return s;
          return { ...s, status: 'running' };
        })
      };
    }));

    await new Promise(resolve => setTimeout(resolve, 1400));

    setProjects(prev => prev.map(p => {
      if (p.id !== productId) return p;
      return {
        ...p,
        associatedSkills: p.associatedSkills.map(s => {
          if (s.id !== skillId) return s;
          return {
            ...s,
            status: 'active',
            invocations: s.invocations + 1,
            lastInvoked: '刚刚'
          };
        })
      };
    }));

    return { success: true, timestamp: new Date().toLocaleTimeString() };
  };

  const addProductMilestone = (productId: string, milestone: ProductMilestone) => {
    setProjects(prev => prev.map(p => {
      if (p.id !== productId) return p;
      return {
        ...p,
        milestones: [...p.milestones, milestone]
      };
    }));
  };

  const updateMilestoneStatus = (productId: string, milestoneId: string, status: 'completed' | 'in-progress' | 'pending') => {
    setProjects(prev => prev.map(p => {
      if (p.id !== productId) return p;
      return {
        ...p,
        milestones: p.milestones.map((m, idx) => {
          const mId = m.id || `m-${idx}`;
          if (mId === milestoneId || m.title === milestoneId) {
            return { ...m, status };
          }
          return m;
        })
      };
    }));
  };

  // R&D Helper Getters & Actions
  const getRequirementForProduct = (productId: string): ProductRequirementDesign => {
    if (requirements[productId]) return requirements[productId];
    const prod = projects.find(p => p.id === productId) || projects[0];
    return {
      id: `req-${productId}-1`,
      productId,
      title: `${prod.name} 需求规格说明与业务流转设计 (PRD)`,
      version: prod.version || 'v1.0.0',
      updatedAt: '刚刚',
      status: '草稿',
      author: prod.owner,
      businessGoal: prod.positioning || prod.description,
      targetAudience: prod.targetAudience || ['互联网企业产研团队'],
      coreSummary: prod.description || '全自动需求分析与设计方案。',
      userStories: prod.featureMatrix?.map((f, i) => ({
        id: `US-${100 + i}`,
        epic: f.module || 'Core',
        role: '终端用户 / 业务管理人员',
        feature: f.name,
        benefit: f.desc,
        priority: f.priority || 'P0',
        acceptanceCriteria: [
          `Given 用户触发 ${f.name} 流程, When 输入合法参数, Then 得到预期业务响应并更新看板状态。`
        ]
      })) || [],
      useCases: [
        {
          id: 'UC-01',
          title: `${prod.name} 核心操作流转`,
          actor: '产品经理 / 研发负责人',
          preCondition: '系统已完成初始化配置',
          mainFlow: [
            '1. 用户登录系统并进入操作中枢；',
            '2. 选定目标模块并发起业务调度；',
            '3. 系统完成校验并产出目标交付物。'
          ],
          altFlow: ['2a. 若缺少关键依赖，系统提供一键补充提示。'],
          postCondition: '数据持久化入库，更新项目燃尽进度。'
        }
      ],
      boundaryChecks: [
        {
          scenario: '网络波动或超时',
          riskLevel: 'medium',
          impact: '请求失败',
          handlingStrategy: '自动重试与本地优雅降级。'
        }
      ],
      flowchartNodes: [
        { id: '1', label: '1. 需求意图输入', type: 'start', desc: '自然语言输入' },
        { id: '2', label: '2. 智能结构化拆解', type: 'agent', desc: 'AI 解析' },
        { id: '3', label: '3. 交付物矩阵推导', type: 'end', desc: 'PRD/用例/代码' }
      ],
      prdMarkdown: `# 【${prod.name}】产品需求规格说明书\n\n## 1. 业务目标\n${prod.description}\n\n## 2. 核心功能\n${prod.featureMatrix?.map(f => `- **${f.name}**：${f.desc}`).join('\n') || ''}`
    };
  };

  const updateRequirement = (productId: string, updates: Partial<ProductRequirementDesign>) => {
    setRequirements(prev => ({
      ...prev,
      [productId]: {
        ...getRequirementForProduct(productId),
        ...updates,
        updatedAt: '刚刚'
      }
    }));
  };

  const generateRequirementAI = async (productId: string, promptText: string, scenarioTemplate?: string) => {
    const prod = projects.find(p => p.id === productId) || projects[0];
    
    // Simulate smart progressive generation
    await new Promise(r => setTimeout(r, 1200));

    const generatedTitle = promptText ? `【${prod.name}】${promptText.slice(0, 20)}... 需求规格书` : `${prod.name} 智能需求设计方案 (v${prod.version})`;

    const newReq: ProductRequirementDesign = {
      id: `req-${productId}-${Date.now()}`,
      productId,
      title: generatedTitle,
      version: `${prod.version}-rev`,
      updatedAt: '刚刚',
      status: '已评审',
      author: prod.owner,
      businessGoal: promptText || prod.positioning,
      targetAudience: prod.targetAudience,
      coreSummary: `由 AI 需求引擎围绕【${scenarioTemplate || '全场景业务'}】自动推导的结构化 PRD 与用户故事。`,
      userStories: [
        {
          id: `US-${Date.now().toString().slice(-4)}`,
          epic: scenarioTemplate || '核心智能工程',
          role: '产研负责人 / PM',
          feature: promptText || '全生命周期成果物一键矩阵生成',
          benefit: '打通需求、架构、代码与测试链路，缩短 60% 交付周期',
          priority: 'P0',
          acceptanceCriteria: [
            'Given 用户提交业务需求描述, When 触发全流程生成, Then 产出格式合规且满足验收标准的完整 PRD 与时序图。',
            'Given 识别到未覆盖的边界异常, When 进行自检, Then 标出漏洞并提供自动修复建议。'
          ]
        },
        ...getRequirementForProduct(productId).userStories
      ],
      useCases: [
        {
          id: `UC-${Date.now().toString().slice(-3)}`,
          title: `全自动化端到端闭环场景 (${scenarioTemplate || '主流程'})`,
          actor: '产品经理 / 研发团队',
          preCondition: '已完成产品档案关联与工作区挂载',
          mainFlow: [
            '1. 用户输入业务构想或选择标准模板；',
            '2. AI 智能引擎执行意图识别与业务逻辑闭环自检；',
            '3. 自动生成 PRD 规格、高保真原型代码与测试用例集；',
            '4. 团队完成在线评审并一键归档至产品文档中心。'
          ],
          altFlow: ['2a. 发现逻辑矛盾时给出 2 种调和选项。'],
          postCondition: '生成结果入库，自动派发研发任务看板。'
        }
      ],
      boundaryChecks: [
        {
          scenario: '高并发瞬时流量激增',
          riskLevel: 'high',
          impact: '服务响应延迟上升',
          handlingStrategy: '采用分流队列与客户端乐观更新。'
        },
        {
          scenario: '断网与离线操作',
          riskLevel: 'medium',
          impact: '无法即时同步云端',
          handlingStrategy: '本地缓存优先，网络恢复后增量合并。'
        }
      ],
      flowchartNodes: [
        { id: '1', label: '1. 需求意图输入', type: 'start', desc: '自然语言' },
        { id: '2', label: '2. 业务拆解与时序推导', type: 'agent', desc: '多 Agent 协同' },
        { id: '3', label: '3. 逻辑漏洞自检', type: 'decision', desc: '规则合规' },
        { id: '4', label: '4. 全成果物交付', type: 'end', desc: 'PRD/原型/用例' }
      ],
      prdMarkdown: `# ${generatedTitle}\n\n## 1. 业务目标与价值\n${promptText || prod.description}\n\n## 2. 核心用户故事\n- **角色**：产品经理与研发团队\n- **诉求**：自动化完成产品全生命周期成果物输出\n\n## 3. 非功能性约束\n- 响应耗时 <= 800ms\n- 覆盖率 100%`
    };

    setRequirements(prev => ({ ...prev, [productId]: newReq }));
  };

  // Prototype
  const getPrototypeForProduct = (productId: string): UIPrototypeScreen => {
    if (prototypes[productId]) return prototypes[productId];
    const prod = projects.find(p => p.id === productId) || projects[0];
    return {
      id: `proto-${productId}-1`,
      title: `${prod.name} 核心交互原型`,
      device: 'desktop',
      theme: 'indigo',
      route: '/app/dashboard',
      description: `针对 ${prod.name} 的高保真交互体验沙箱。`,
      sections: [
        {
          title: '核心数据概览',
          type: 'stats',
          data: [
            { label: '活跃用户', value: prod.metrics?.dau || '1.2k', change: '+12%', color: 'text-indigo-600' },
            { label: '系统健康度', value: prod.health === 'healthy' ? '98.5%' : '88.0%', change: '运行稳定', color: 'text-emerald-600' },
            { label: '已就绪交付物', value: '18 份', change: '全套就绪', color: 'text-blue-600' }
          ]
        },
        {
          title: '智能交互与任务看板',
          type: 'kanban',
          data: prod.featureMatrix?.slice(0, 3) || []
        }
      ],
      designTokens: {
        primaryColor: '#4F46E5',
        fontFamily: 'Plus Jakarta Sans, system-ui, sans-serif',
        borderRadius: '16px',
        spacingScale: '4px / 8px / 16px / 24px / 32px'
      },
      reactCode: `export function ${prod.name.replace(/[^a-zA-Z0-9]/g, '')}Prototype() {\n  return <div className="p-6 bg-slate-900 text-white rounded-2xl">【${prod.name}】实时原型运行就绪</div>;\n}`
    };
  };

  const updatePrototype = (productId: string, updates: Partial<UIPrototypeScreen>) => {
    setPrototypes(prev => ({
      ...prev,
      [productId]: {
        ...getPrototypeForProduct(productId),
        ...updates
      }
    }));
  };

  const generatePrototypeAI = async (productId: string, promptText: string, device: 'desktop' | 'mobile' | 'tablet' = 'desktop', theme: 'indigo' | 'dark' | 'mint' | 'sunset' = 'indigo') => {
    await new Promise(r => setTimeout(r, 1200));
    const prod = projects.find(p => p.id === productId) || projects[0];

    const newProto: UIPrototypeScreen = {
      id: `proto-${productId}-${Date.now()}`,
      title: promptText ? `【${prod.name}】${promptText}` : `${prod.name} AI 交互原型设计`,
      device,
      theme,
      route: '/app/interactive-sandbox',
      description: promptText || `基于 ${prod.name} 核心需求自动生成的多端响应式交互原型。`,
      sections: [
        {
          title: '实时业务指标大屏',
          type: 'stats',
          data: [
            { label: '核心业务流转率', value: '96.8%', change: '+8.4%', color: 'text-indigo-600' },
            { label: '端到端响应耗时', value: '145ms', change: '极速', color: 'text-emerald-600' },
            { label: '测试用例通过率', value: '100%', change: '全部通过', color: 'text-blue-600' }
          ]
        },
        {
          title: '交互操作流',
          type: 'chat',
          data: [
            { sender: 'PM', text: promptText || '生成全套高保真交互组件', isUser: true },
            { sender: 'AI Design Agent', text: '✅ 已为您根据 Design Tokens 规范构建多端响应式页面与组件代码。', isUser: false }
          ]
        }
      ],
      designTokens: {
        primaryColor: theme === 'mint' ? '#10B981' : theme === 'sunset' ? '#F97316' : theme === 'dark' ? '#38BDF8' : '#4F46E5',
        fontFamily: 'Plus Jakarta Sans, system-ui, sans-serif',
        borderRadius: '16px',
        spacingScale: '4px / 8px / 16px / 24px / 32px'
      },
      reactCode: `import React from 'react';\n\nexport function GeneratedView() {\n  return (\n    <div className="p-6 bg-slate-900 text-white rounded-2xl shadow-xl">\n      <h2 className="text-lg font-bold mb-2">${prod.name} - ${promptText || 'AI 界面原型'}</h2>\n      <p className="text-xs text-slate-400">设备: ${device} | 主题: ${theme}</p>\n    </div>\n  );\n}`
    };

    setPrototypes(prev => ({ ...prev, [productId]: newProto }));
  };

  // Knowledge Base
  const getKnowledgeForProduct = (productId: string): ProductKnowledgeItem[] => {
    return knowledgeBase[productId] || INITIAL_KNOWLEDGE_BASE.p1 || [];
  };

  const addKnowledgeItem = (productId: string, item: Omit<ProductKnowledgeItem, 'id' | 'productId' | 'updatedAt'>) => {
    const newItem: ProductKnowledgeItem = {
      ...item,
      id: `kb-${productId}-${Date.now()}`,
      productId,
      updatedAt: '刚刚'
    };
    setKnowledgeBase(prev => ({
      ...prev,
      [productId]: [newItem, ...(prev[productId] || [])]
    }));
  };

  const updateKnowledgeItem = (productId: string, itemId: string, updates: Partial<ProductKnowledgeItem>) => {
    setKnowledgeBase(prev => ({
      ...prev,
      [productId]: (prev[productId] || []).map(k => k.id === itemId ? { ...k, ...updates, updatedAt: '刚刚' } : k)
    }));
  };

  const deleteKnowledgeItem = (productId: string, itemId: string) => {
    setKnowledgeBase(prev => ({
      ...prev,
      [productId]: (prev[productId] || []).filter(k => k.id !== itemId)
    }));
  };

  const polishKnowledgeArticleAI = async (productId: string, itemId: string, action: string): Promise<string> => {
    const currentList = knowledgeBase[productId] || [];
    const target = currentList.find(k => k.id === itemId);
    if (!target) return '';

    try {
      const resp = await fetch('/api/rnd/polish-knowledge-article', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: target.title,
          content: target.content,
          action
        })
      });
      const data = await resp.json();
      if (data.content) {
        updateKnowledgeItem(productId, itemId, { content: data.content });
        return data.content;
      }
    } catch (e) {
      console.warn('Fallback local polish:', e);
    }

    // Local polish fallback
    const polished = `${target.content}\n\n### 📌 AI 自动补充与沉淀 (${action})\n- **关键要点**：已自动规范化术语与排版格式；\n- **最佳实践**：建议在团队周会与新成员入职时作为标准参考。`;
    updateKnowledgeItem(productId, itemId, { content: polished });
    return polished;
  };

  // Code Scaffolds
  const getCodeScaffoldsForProduct = (productId: string): CodeScaffoldItem[] => {
    return codeScaffolds[productId] || INITIAL_CODE_SCAFFOLDS.p1 || [];
  };

  const addCodeScaffold = (productId: string, item: Omit<CodeScaffoldItem, 'id' | 'productId'>) => {
    const newItem: CodeScaffoldItem = {
      ...item,
      id: `scaff-${productId}-${Date.now()}`,
      productId
    };
    setCodeScaffolds(prev => ({
      ...prev,
      [productId]: [newItem, ...(prev[productId] || [])]
    }));
  };

  const generateCodeScaffoldAI = async (productId: string, type: 'api' | 'types' | 'component' | 'schema' | 'docker' | 'commit', promptText?: string) => {
    await new Promise(r => setTimeout(r, 1000));
    const prod = projects.find(p => p.id === productId) || projects[0];

    const filenames = {
      api: 'src/api/routes.ts',
      types: 'src/types/schema.ts',
      component: 'src/components/CoreFeature.tsx',
      schema: 'db/migrations/schema.sql',
      docker: 'Dockerfile',
      commit: 'git-commit-msg.txt'
    };

    const newScaffold: CodeScaffoldItem = {
      id: `scaff-${productId}-${Date.now()}`,
      productId,
      name: `${prod.name} ${type.toUpperCase()} 自动工程代码`,
      type,
      language: type === 'schema' ? 'sql' : type === 'api' || type === 'types' || type === 'component' ? 'typescript' : 'text',
      filename: filenames[type],
      description: promptText || `由 AI 架构引擎针对 ${prod.name} 自动生成的工程代码规范。`,
      code: type === 'schema'
        ? `-- ${prod.name} 自动建表 DDL\nCREATE TABLE tbl_${prod.id}_core (\n  id VARCHAR(64) PRIMARY KEY,\n  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP\n);`
        : `// ${prod.name} ${type} 契约代码\nexport interface ${prod.name.replace(/[^a-zA-Z0-9]/g, '')}Payload {\n  id: string;\n  status: 'active' | 'pending';\n}`
    };

    addCodeScaffold(productId, newScaffold);
  };

  // Test Cases
  const getTestCasesForProduct = (productId: string): TestCaseItem[] => {
    return testCases[productId] || INITIAL_TEST_CASES.p1 || [];
  };

  const addTestCase = (productId: string, item: Omit<TestCaseItem, 'id' | 'productId'>) => {
    const newItem: TestCaseItem = {
      ...item,
      id: `TC-${Date.now().toString().slice(-4)}`,
      productId
    };
    setTestCases(prev => ({
      ...prev,
      [productId]: [newItem, ...(prev[productId] || [])]
    }));
  };

  const updateTestCase = (productId: string, testCaseId: string, updates: Partial<TestCaseItem>) => {
    setTestCases(prev => ({
      ...prev,
      [productId]: (prev[productId] || []).map(t => t.id === testCaseId ? { ...t, ...updates } : t)
    }));
  };

  const deleteTestCase = (productId: string, testCaseId: string) => {
    setTestCases(prev => ({
      ...prev,
      [productId]: (prev[productId] || []).filter(t => t.id !== testCaseId)
    }));
  };

  const generateTestCasesAI = async (productId: string, promptText?: string) => {
    await new Promise(r => setTimeout(r, 1200));
    const prod = projects.find(p => p.id === productId) || projects[0];

    const generatedCases: TestCaseItem[] = [
      {
        id: `TC-${Math.floor(100 + Math.random() * 900)}`,
        productId,
        module: '全自动生成引擎',
        title: promptText ? `验证【${promptText}】正向流转` : `验证 ${prod.name} 全流程成果物秒级推导`,
        type: '功能测试',
        priority: 'P0',
        preconditions: '已选定当前产品并进入成果物中心',
        steps: ['1. 点击一键生成按钮;', '2. 检查生成的 Markdown 及 JSON 完整性;'],
        expectedResult: '各阶段成果物格式严谨无缺失，用时 <= 3s。',
        status: 'passed',
        automated: true
      },
      {
        id: `TC-${Math.floor(100 + Math.random() * 900)}`,
        productId,
        module: '边界容错',
        title: `验证高并发请求下的速率限制与断点恢复`,
        type: '边界条件',
        priority: 'P1',
        preconditions: '模拟网络抖动或连续点击',
        steps: ['1. 连续快速触发生成请求;', '2. 检查 UI 防抖与后端锁机制;'],
        expectedResult: '系统有效防抖，无重复冗余任务入库。',
        status: 'passed',
        automated: true
      }
    ];

    setTestCases(prev => ({
      ...prev,
      [productId]: [...generatedCases, ...(prev[productId] || [])]
    }));
  };

  const runTestCase = async (productId: string, testCaseId: string) => {
    updateTestCase(productId, testCaseId, { status: 'pending' });
    await new Promise(r => setTimeout(r, 600));
    updateTestCase(productId, testCaseId, { status: 'passed' });
  };

  const runAllTestCases = async (productId: string) => {
    const list = getTestCasesForProduct(productId);
    for (const t of list) {
      updateTestCase(productId, t.id, { status: 'pending' });
    }
    await new Promise(r => setTimeout(r, 1200));
    for (const t of list) {
      updateTestCase(productId, t.id, { status: 'passed' });
    }
  };

  // Competitor Analysis
  const getCompetitorDataForProduct = (productId: string): CompetitorAnalysisData => {
    if (competitorData[productId]) return competitorData[productId];
    const prod = projects.find(p => p.id === productId) || projects[0];
    return {
      productId,
      productName: prod.name,
      updatedAt: '刚刚',
      radarData: INITIAL_COMPETITOR_DATA.p1.radarData,
      competitors: INITIAL_COMPETITOR_DATA.p1.competitors,
      swot: INITIAL_COMPETITOR_DATA.p1.swot,
      differentiationStrategy: `### 🎯 【${prod.name}】核心破局与差异化定位\n以“AI全自动产研成果物闭环”为突破口，实现从需求到代码和测试用例的全流程自动化。`,
      gapAnalysis: INITIAL_COMPETITOR_DATA.p1.gapAnalysis
    };
  };

  const updateCompetitorData = (productId: string, updates: Partial<CompetitorAnalysisData>) => {
    setCompetitorData(prev => ({
      ...prev,
      [productId]: {
        ...getCompetitorDataForProduct(productId),
        ...updates,
        updatedAt: '刚刚'
      }
    }));
  };

  const generateCompetitorAnalysisAI = async (productId: string, customPrompt?: string) => {
    await new Promise(r => setTimeout(r, 1400));
    const prod = projects.find(p => p.id === productId) || projects[0];

    const updated: CompetitorAnalysisData = {
      productId,
      productName: prod.name,
      updatedAt: '刚刚',
      radarData: [
        { dimension: 'AI 全自动工程化', ourProduct: 96, compA: 65, compB: 50, compC: 45 },
        { dimension: '多 Agent 协同深度', ourProduct: 94, compA: 72, compB: 68, compC: 50 },
        { dimension: '本地资产与文件深度绑定', ourProduct: 92, compA: 45, compB: 35, compC: 82 },
        { dimension: '全流程成果物一键矩阵', ourProduct: 99, compA: 58, compB: 48, compC: 38 },
        { dimension: '产研全链路协同 (PRD->Code->QA)', ourProduct: 95, compA: 68, compB: 88, compC: 52 },
        { dimension: '轻量化易用性与响应速度', ourProduct: 90, compA: 88, compB: 72, compC: 78 },
      ],
      competitors: INITIAL_COMPETITOR_DATA.p1.competitors,
      swot: {
        strengths: [
          `【${prod.name} 闭环交付优势】首创涵盖设计、开发、测试与运营全流程成果物的一键智能矩阵；`,
          '【本地资产深度整合】无缝融合本地工作区与多 Agent 技能中枢。'
        ],
        weaknesses: [
          '品牌知名度仍需通过行业头部标杆案例加速拓展。'
        ],
        opportunities: [
          '全球数字化产研团队对“全自动交付物生成”的刚性爆发需求。'
        ],
        threats: [
          '海外巨头快速在现有通用文档产品中集成轻量 AI 插件。'
        ]
      },
      differentiationStrategy: `### 🎯 【${prod.name}】差异化竞争新打法 (${customPrompt || '全维度强化'})\n1. 专注高复杂度产研交付物痛点，一键生成 18 项工业级交付资产；\n2. 构建代码-文档-用例双向活态更新机制。`,
      gapAnalysis: INITIAL_COMPETITOR_DATA.p1.gapAnalysis
    };

    setCompetitorData(prev => ({ ...prev, [productId]: updated }));
  };

  // Full-Lifecycle Deliverables
  const getDeliverablesForProduct = (productId: string): FullLifecycleDeliverable[] => {
    if (deliverables[productId]) return deliverables[productId];
    const prod = projects.find(p => p.id === productId) || projects[0];
    const list = buildInitialDeliverables(prod);
    setDeliverables(prev => ({ ...prev, [productId]: list }));
    return list;
  };

  const generateDeliverableAI = async (productId: string, code: string, customPrompt?: string) => {
    const list = getDeliverablesForProduct(productId);
    const prod = projects.find(p => p.id === productId) || projects[0];
    const target = list.find(d => d.code === code);
    if (!target) return;

    // Set status to generating
    setDeliverables(prev => ({
      ...prev,
      [productId]: prev[productId].map(d => d.code === code ? { ...d, status: 'generating' } : d)
    }));

    try {
      const resp = await fetch('/api/rnd/generate-deliverable', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          product: prod,
          code,
          deliverableTitle: target.title,
          customPrompt
        })
      });
      const data = await resp.json();
      if (data.content) {
        setDeliverables(prev => ({
          ...prev,
          [productId]: prev[productId].map(d => d.code === code ? {
            ...d,
            status: 'ready',
            content: data.content,
            generatedAt: '刚刚',
            wordCount: `${data.content.length} 字`
          } : d)
        }));
        return;
      }
    } catch (err) {
      console.warn('API error, using local generator:', err);
    }

    // Local fallback generation
    await new Promise(r => setTimeout(r, 800));
    setDeliverables(prev => ({
      ...prev,
      [productId]: prev[productId].map(d => d.code === code ? {
        ...d,
        status: 'ready',
        generatedAt: '刚刚',
        wordCount: `${Math.floor(2800 + Math.random() * 1500)} 字`
      } : d)
    }));
  };

  const generateAllDeliverablesBatchAI = async (productId: string, onProgress?: (percent: number, currentTitle: string) => void) => {
    const list = getDeliverablesForProduct(productId);
    const total = list.length;

    for (let i = 0; i < total; i++) {
      const item = list[i];
      if (onProgress) {
        onProgress(Math.round(((i + 1) / total) * 100), item.title);
      }

      setDeliverables(prev => ({
        ...prev,
        [productId]: prev[productId].map((d, idx) => idx === i ? { ...d, status: 'generating' } : d)
      }));

      await new Promise(r => setTimeout(r, 200));

      setDeliverables(prev => ({
        ...prev,
        [productId]: prev[productId].map((d, idx) => idx === i ? {
          ...d,
          status: 'ready',
          generatedAt: '刚刚',
          wordCount: `${Math.floor(2500 + Math.random() * 2000)} 字`
        } : d)
      }));
    }
  };

  const syncDeliverableToDocs = (productId: string, deliverableId: string) => {
    const list = getDeliverablesForProduct(productId);
    const target = list.find(d => d.id === deliverableId || d.code === deliverableId);
    if (!target) return;

    const newDoc: ProductDocument = {
      id: `doc-${Date.now()}`,
      title: `${target.title}.md`,
      category: target.phase === 'requirement' ? 'PRD需求' : target.phase === 'dev' ? '架构设计' : target.phase === 'design' ? 'API规范' : '发版规划',
      version: 'v1.0.0',
      author: 'AI 成果物工厂',
      updatedAt: '刚刚',
      wordCount: target.wordCount || '3,500 字',
      summary: target.summary,
      content: target.content
    };

    addProductDocument(productId, newDoc);
  };

  // Workspace & Task Management
  const addWorkspace = (newWorkspace: Workspace) => {
    setWorkspaces(prev => {
      if (prev.some(w => w.id === newWorkspace.id)) return prev;
      return [newWorkspace, ...prev];
    });
  };

  const updateWorkspace = (id: string, updates: Partial<Workspace>) => {
    setWorkspaces(prev => prev.map(w => w.id === id ? { ...w, ...updates } : w));
  };

  const deleteWorkspace = (id: string) => {
    setWorkspaces(prev => prev.filter(w => w.id !== id));
  };

  const addLocalIndexedFile = (file: LocalIndexedFile) => {
    setLocalIndexedFiles(prev => [file, ...prev]);
  };

  const getProjectTaskCount = (projectIdOrName?: string) => {
    if (!projectIdOrName) return 0;
    let count = 0;
    const proj = projects.find(p => p.id === projectIdOrName || p.name === projectIdOrName);
    const targetName = proj ? proj.name : projectIdOrName;
    const targetId = proj ? proj.id : projectIdOrName;

    categories.forEach(cat => {
      cat.tasks.forEach(task => {
        if (task.project === targetName || task.project === targetId || cat.name === targetName) {
          count++;
        }
      });
    });
    return count > 0 ? count : (proj ? (proj.id === 'p1' ? 6 : 3) : 2);
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
    <AppContext.Provider value={{ 
      categories, 
      setCategories, 
      events, 
      setEvents, 
      projects, 
      setProjects, 
      products: projects,
      setProducts: setProjects,
      selectedProductId,
      setSelectedProductId,
      addProduct,
      updateProduct,
      deleteProduct,
      addProductDocument,
      toggleSkillStatus,
      runProductSkill,
      addProductMilestone,
      updateMilestoneStatus,
      workspaces,
      setWorkspaces,
      localIndexedFiles,
      setLocalIndexedFiles,
      addCategory, 
      addTask, 
      addEvent, 
      addProject, 
      addWorkspace,
      updateWorkspace,
      deleteWorkspace,
      addLocalIndexedFile,
      completeTask,
      getProjectTaskCount,

      // R&D specific
      requirements,
      prototypes,
      knowledgeBase,
      codeScaffolds,
      testCases,
      competitorData,
      deliverables,

      getRequirementForProduct,
      updateRequirement,
      generateRequirementAI,

      getPrototypeForProduct,
      updatePrototype,
      generatePrototypeAI,

      getKnowledgeForProduct,
      addKnowledgeItem,
      updateKnowledgeItem,
      deleteKnowledgeItem,
      polishKnowledgeArticleAI,

      getCodeScaffoldsForProduct,
      addCodeScaffold,
      generateCodeScaffoldAI,

      getTestCasesForProduct,
      addTestCase,
      updateTestCase,
      deleteTestCase,
      generateTestCasesAI,
      runTestCase,
      runAllTestCases,

      getCompetitorDataForProduct,
      updateCompetitorData,
      generateCompetitorAnalysisAI,

      getDeliverablesForProduct,
      generateDeliverableAI,
      generateAllDeliverablesBatchAI,
      syncDeliverableToDocs
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}
