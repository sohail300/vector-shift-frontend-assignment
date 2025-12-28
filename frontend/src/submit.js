// submit.js

import { useState } from 'react';
import { useStore } from './store';
import { LuRocket, LuX } from 'react-icons/lu';

export const SubmitButton = () => {
    const nodes = useStore((state) => state.nodes);
    const edges = useStore((state) => state.edges);
    const [showDialog, setShowDialog] = useState(false);
    const [dialogContent, setDialogContent] = useState(null);

    const handleSubmit = async () => {
        // Prepare the pipeline data
        const pipelineData = {
            nodes: nodes.map(node => ({
                id: node.id,
                type: node.type,
                position: node.position,
                data: node.data
            })),
            edges: edges.map(edge => ({
                id: edge.id,
                source: edge.source,
                target: edge.target,
                sourceHandle: edge.sourceHandle,
                targetHandle: edge.targetHandle
            }))
        };

        try {
            const response = await fetch('http://localhost:8000/pipelines/parse', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(pipelineData)
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const result = await response.json();
            
            // Set dialog content and show dialog
            setDialogContent({
                type: 'success',
                result: result
            });
            setShowDialog(true);
        } catch (error) {
            console.error('Error submitting pipeline:', error);
            setDialogContent({
                type: 'error',
                error: error
            });
            setShowDialog(true);
        }
    };

    return (
        <>
            {/* Dialog Overlay */}
            {showDialog && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" onClick={() => setShowDialog(false)}>
                    <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4 overflow-hidden" onClick={(e) => e.stopPropagation()}>
                        {/* Dialog Header */}
                        <div className={`px-6 py-4 border-b flex items-center justify-between ${
                            dialogContent?.type === 'error' ? 'bg-red-50' : 'bg-green-50'
                        }`}>
                            <h2 className={`text-lg font-semibold ${
                                dialogContent?.type === 'error' ? 'text-red-800' : 'text-green-800'
                            }`}>
                                {dialogContent?.type === 'error' ? 'Error' : 'Pipeline Analysis'}
                            </h2>
                            <button 
                                onClick={() => setShowDialog(false)}
                                className="text-gray-500 hover:text-gray-700 transition-colors"
                            >
                                <LuX className="w-5 h-5" />
                            </button>
                        </div>
                        
                        {/* Dialog Content */}
                        <div className="px-6 py-5">
                            {dialogContent?.type === 'error' ? (
                                <div className="space-y-3">
                                    <p className="text-red-600 font-medium">Failed to submit pipeline</p>
                                    <p className="text-gray-600 text-sm">{dialogContent.error.message}</p>
                                    <p className="text-gray-500 text-xs mt-2">
                                        Make sure the backend server is running on http://localhost:8000
                                    </p>
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    <div className="space-y-2">
                                        <div className="flex items-center justify-between py-2 border-b border-gray-100">
                                            <span className="text-black text-sm">Number of Nodes</span>
                                            <span className="font-semibold text-black">{dialogContent?.result.num_nodes}</span>
                                        </div>
                                        <div className="flex items-center justify-between py-2 border-b border-gray-100">
                                            <span className="text-black text-sm">Number of Edges</span>
                                            <span className="font-semibold text-black">{dialogContent?.result.num_edges}</span>
                                        </div>
                                        <div className="flex items-center justify-between py-2 border-b border-gray-100">
                                            <span className="text-black text-sm">Is DAG</span>
                                            <span className={`font-semibold flex items-center gap-1 ${
                                                dialogContent?.result.is_dag ? 'text-green-600' : 'text-red-600'
                                            }`}>
                                                {dialogContent?.result.is_dag ? 'Yes' : 'No'}
                                            </span>
                                        </div>
                                    </div>
                                    
                                    <div className={`p-3 rounded-lg ${
                                        dialogContent?.result.is_dag ? 'bg-green-50' : 'bg-amber-50'
                                    }`}>
                                        <p className={`text-sm ${
                                            dialogContent?.result.is_dag ? 'text-green-700' : 'text-amber-700'
                                        }`}>
                                            {dialogContent?.result.is_dag 
                                                ? '🚀 Your pipeline is a valid Directed Acyclic Graph!' 
                                                : '⚠️ Warning: Your pipeline contains cycles and is not a DAG.'}
                                        </p>
                                    </div>
                                </div>
                            )}
                        </div>
                        
                        {/* Dialog Footer */}
                        <div className="px-6 py-4 bg-gray-50 border-t flex justify-end">
                            <button 
                                onClick={() => setShowDialog(false)}
                                className="px-5 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors font-medium text-sm"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
            
            {/* Submit Bar */}
            <div className="flex items-center justify-between px-6 py-4 bg-white border-t-[1.5px] border-gray-200 shadow-[0_-1px_3px_rgba(0,0,0,0.05)]">
                <div className="flex items-center gap-3 text-gray-500 text-[13px]">
                    <span className="flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_0_2px_rgba(16,185,129,0.2)]"></span>
                        <span><strong>{nodes.length}</strong> nodes</span>
                    </span>
                    <span className="text-gray-300">•</span>
                    <span className="flex items-center gap-1.5">
                        <span><strong>{edges.length}</strong> edges</span>
                    </span>
                </div>
                
                <button 
                    type="submit" 
                    onClick={handleSubmit}
                    className="px-7 py-3 text-sm font-semibold text-white bg-green-500 border-none rounded-[10px] cursor-pointer transition-all duration-200 flex items-center gap-2 tracking-wide hover:-translate-y-0.5"
                >
                    <span className="text-lg flex items-center"><LuRocket /></span>
                    <span>Submit</span>
                </button>
            </div>
        </>
    );
}
