// transformNode.js
// A node for transforming/processing text data

import { BaseNode } from './BaseNode';
import { Position } from 'reactflow';
import { LuRefreshCw } from 'react-icons/lu';

export const TransformNode = ({ id, data }) => {
  const config = {
    title: 'Transform',
    icon: <LuRefreshCw />,
    iconColor: '#06b6d4',
    description: 'Transform and process data',
    fields: [
      {
        name: 'operation',
        label: 'Operation',
        type: 'select',
        defaultValue: 'uppercase',
        options: [
          { value: 'uppercase', label: 'Uppercase' },
          { value: 'lowercase', label: 'Lowercase' },
          { value: 'trim', label: 'Trim' },
          { value: 'reverse', label: 'Reverse' },
          { value: 'length', label: 'Get Length' }
        ]
      }
    ],
    handles: [
      {
        type: 'target',
        position: Position.Left,
        id: 'input',
        label: 'Input'
      },
      {
        type: 'source',
        position: Position.Right,
        id: 'output',
        label: 'Output'
      }
    ],
    style: {
      borderColor: '#06b6d4',
      background: 'linear-gradient(135deg, #ecfeff 0%, #ffffff 100%)'
    }
  };

  return <BaseNode id={id} data={data} config={config} />;
};


