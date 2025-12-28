// ui.js
// Displays the drag-and-drop UI
// --------------------------------------------------

import { useState, useRef, useCallback } from 'react';
import ReactFlow, { Controls, Background, MiniMap } from 'reactflow';
import { useStore } from './store';
import { shallow } from 'zustand/shallow';
import { InputNode } from './nodes/inputNode';
import { LLMNode } from './nodes/llmNode';
import { OutputNode } from './nodes/outputNode';
import { TextNode } from './nodes/textNode';
import { TransformNode } from './nodes/transformNode';
import { ConditionalNode } from './nodes/conditionalNode';
import { APINode } from './nodes/apiNode';
import { DatabaseNode } from './nodes/databaseNode';
import { DelayNode } from './nodes/delayNode';

import 'reactflow/dist/style.css';

const gridSize = 20;
const proOptions = { hideAttribution: true };
const nodeTypes = {
  customInput: InputNode,
  llm: LLMNode,
  customOutput: OutputNode,
  text: TextNode,
  transform: TransformNode,
  conditional: ConditionalNode,
  api: APINode,
  database: DatabaseNode,
  delay: DelayNode,
};

const selector = (state) => ({
  nodes: state.nodes,
  edges: state.edges,
  getNodeID: state.getNodeID,
  addNode: state.addNode,
  onNodesChange: state.onNodesChange,
  onEdgesChange: state.onEdgesChange,
  onConnect: state.onConnect,
});

export const PipelineUI = () => {
    const reactFlowWrapper = useRef(null);
    const [reactFlowInstance, setReactFlowInstance] = useState(null);
    const {
      nodes,
      edges,
      getNodeID,
      addNode,
      onNodesChange,
      onEdgesChange,
      onConnect
    } = useStore(selector, shallow);

    const getInitNodeData = (nodeID, type) => {
      let nodeData = { id: nodeID, nodeType: `${type}` };
      return nodeData;
    }

    const onDrop = useCallback(
        (event) => {
          event.preventDefault();
    
          const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
          if (event?.dataTransfer?.getData('application/reactflow')) {
            const appData = JSON.parse(event.dataTransfer.getData('application/reactflow'));
            const type = appData?.nodeType;
      
            // check if the dropped element is valid
            if (typeof type === 'undefined' || !type) {
              return;
            }
      
            const position = reactFlowInstance.project({
              x: event.clientX - reactFlowBounds.left,
              y: event.clientY - reactFlowBounds.top,
            });

            const nodeID = getNodeID(type);
            const newNode = {
              id: nodeID,
              type,
              position,
              data: getInitNodeData(nodeID, type),
            };
      
            addNode(newNode);
          }
        },
        [reactFlowInstance]
    );

    const onDragOver = useCallback((event) => {
        event.preventDefault();
        event.dataTransfer.dropEffect = 'move';
    }, []);

    return (
        <>
        <div ref={reactFlowWrapper} style={{width: '100%', height: '100%'}}>
            <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                onDrop={onDrop}
                onDragOver={onDragOver}
                onInit={setReactFlowInstance}
                nodeTypes={nodeTypes}
                proOptions={proOptions}
                snapGrid={[gridSize, gridSize]}
                connectionLineType='smoothstep'
                defaultEdgeOptions={{
                    animated: true,
                    type: 'smoothstep',
                    style: { 
                        stroke: '#6366f1', 
                        strokeWidth: 2.5,
                    }
                }}
                className="bg-transparent"
            >
                <Background 
                    color="#171616" 
                    gap={gridSize}
                    variant="dots"
                />
                <Controls 
                    style={{
                        button: {
                            background: 'white',
                            border: '1px solid #e5e7eb',
                            borderRadius: '6px'
                        }
                    }}
                />
                <MiniMap 
                    position="bottom-left"
                    style={{
                        left: 32,
                        bottom: 0
                    }}
                    nodeColor={(node) => {
                        switch (node.type) {
                            case 'customInput': return '#10b981';
                            case 'customOutput': return '#3b82f6';
                            case 'llm': return '#8b5cf6';
                            case 'text': return '#f59e0b';
                            case 'transform': return '#06b6d4';
                            case 'conditional': return '#ec4899';
                            case 'api': return '#14b8a6';
                            case 'database': return '#f97316';
                            case 'delay': return '#84cc16';
                            default: return '#6b7280';
                        }
                    }}
                    maskColor="rgba(0, 0, 0, 0.03)"
                    className="!bg-white !border-[1.5px] !border-gray-200 !rounded-xl shadow-[0_4px_12px_rgba(0,0,0,0.08)]"
                />
            </ReactFlow>
        </div>
        </>
    )
}
