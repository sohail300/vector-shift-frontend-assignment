// toolbar.js

import { DraggableNode } from './draggableNode';
import { LuDownload, LuUpload, LuBrain, LuFileText, LuRefreshCw, LuGitBranch, LuGlobe, LuDatabase, LuClock } from 'react-icons/lu';

export const PipelineToolbar = () => {

    return (
        <div className="px-6 py-3 bg-[#eeeeee] border-b-[1.5px] border-gray-200 shadow-2xl">
            <div className="flex items-center justify-between mb-2">
                <div className="text-center flex flex-col items-center justify-center w-full">
                    <h2 className="mb-1 text-gray-900 text-2xl font-bold tracking-tight">
                        Visual Pipeline Builder
                    </h2>
                    <p className="m-0 text-gray-500 text-[13px] font-normal">
                        Drag and drop nodes to create your workflow
                    </p>
                </div>
            </div>
            
            <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Nodes
                </span>
                <div className="flex-1 h-px bg-gray-200"></div>
            </div>
            
            <div className="grid grid-cols-[repeat(auto-fill,minmax(96px,1fr))] gap-0">
                <DraggableNode type='customInput' label='Input' icon={<LuDownload />} iconColor='#10b981' />
                <DraggableNode type='llm' label='LLM' icon={<LuBrain />} iconColor='#8b5cf6' />
                <DraggableNode type='customOutput' label='Output' icon={<LuUpload />} iconColor='#3b82f6' />
                <DraggableNode type='text' label='Text' icon={<LuFileText />} iconColor='#f59e0b' />
                <DraggableNode type='transform' label='Transform' icon={<LuRefreshCw />} iconColor='#06b6d4' />
                <DraggableNode type='conditional' label='Conditional' icon={<LuGitBranch />} iconColor='#ec4899' />
                <DraggableNode type='api' label='API Call' icon={<LuGlobe />} iconColor='#14b8a6' />
                <DraggableNode type='database' label='Database' icon={<LuDatabase />} iconColor='#f97316' />
                <DraggableNode type='delay' label='Delay' icon={<LuClock />} iconColor='#84cc16' />
            </div>
        </div>
    );
};
