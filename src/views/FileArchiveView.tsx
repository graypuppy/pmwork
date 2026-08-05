import { FileText, FileSpreadsheet, File as FileIcon, Download, MoreVertical, Search } from 'lucide-react';

export function FileArchiveView() {
  const files = [
    { name: '产品需求文档_v2.0.pdf', type: 'pdf', size: '2.4 MB', date: '2025-05-18', uploader: 'Brandon' },
    { name: '竞品分析报告_Q2.pptx', type: 'ppt', size: '5.1 MB', date: '2025-05-15', uploader: 'Alice' },
    { name: '用户调研数据_Raw.xlsx', type: 'excel', size: '1.2 MB', date: '2025-05-12', uploader: 'Zack' },
    { name: 'API接口定义说明.md', type: 'doc', size: '45 KB', date: '2025-05-10', uploader: 'Brandon' },
  ];

  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm flex flex-col h-full">
      <div className="p-5 border-b border-slate-100 flex justify-between items-center">
        <h2 className="text-lg font-bold text-slate-800">所有文件</h2>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
          <input type="text" placeholder="搜索文件..." className="pl-9 pr-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20" />
        </div>
      </div>
      <div className="flex-1 overflow-auto p-5">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="text-sm text-slate-400 border-b border-slate-100">
              <th className="pb-3 font-medium px-4">文件名</th>
              <th className="pb-3 font-medium px-4">大小</th>
              <th className="pb-3 font-medium px-4">上传者</th>
              <th className="pb-3 font-medium px-4">更新时间</th>
              <th className="pb-3 font-medium px-4 text-right">操作</th>
            </tr>
          </thead>
          <tbody>
            {files.map((f, i) => (
              <tr key={i} className="hover:bg-slate-50 group border-b border-slate-50 last:border-none">
                <td className="py-4 px-4 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-500 flex items-center justify-center">
                    {f.type === 'excel' ? <FileSpreadsheet size={20} /> : f.type === 'pdf' ? <FileText size={20} /> : <FileIcon size={20} />}
                  </div>
                  <span className="font-medium text-slate-700">{f.name}</span>
                </td>
                <td className="py-4 px-4 text-sm text-slate-500">{f.size}</td>
                <td className="py-4 px-4 text-sm text-slate-500">{f.uploader}</td>
                <td className="py-4 px-4 text-sm text-slate-500">{f.date}</td>
                <td className="py-4 px-4 text-right">
                  <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="p-2 text-slate-400 hover:text-blue-600 rounded"><Download size={16} /></button>
                    <button className="p-2 text-slate-400 hover:text-slate-700 rounded"><MoreVertical size={16} /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
