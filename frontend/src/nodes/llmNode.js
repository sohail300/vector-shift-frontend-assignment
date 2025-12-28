// llmNode.js

import { BaseNode } from './BaseNode';
import { Position } from 'reactflow';
import { LuBrain } from 'react-icons/lu';

export const LLMNode = ({ id, data }) => {
  const config = {
    title: 'LLM',
    icon: <LuBrain />,
    iconColor: '#8b5cf6',
    description: 'Large Language Model',
    fields: [
      {
        name: 'model',
        label: 'Model',
        type: 'select',
        defaultValue: 'GPT-3.5',
        options: [
          { value: 'GPT-3.5', label: 'GPT-3.5' },
          { value: 'GPT-4', label: 'GPT-4' },
          { value: 'Claude', label: 'Claude' },
          { value: 'Llama', label: 'Llama' }
        ]
      }
    ],
    handles: [
      {
        type: 'target',
        position: Position.Left,
        id: 'system',
        top: '33%',
        label: 'System'
      },
      {
        type: 'target',
        position: Position.Left,
        id: 'prompt',
        top: '66%',
        label: 'Prompt'
      },
      {
        type: 'source',
        position: Position.Right,
        id: 'response',
        label: 'Response'
      }
    ],
    style: {
      borderColor: '#8b5cf6',
      background: 'linear-gradient(135deg, #f5f3ff 0%, #ffffff 100%)'
    }
  };

  return <BaseNode id={id} data={data} config={config} />;
};
