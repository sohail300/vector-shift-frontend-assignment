// apiNode.js
// A node for making API calls

import { BaseNode } from './BaseNode';
import { Position } from 'reactflow';
import { LuGlobe } from 'react-icons/lu';

export const APINode = ({ id, data }) => {
  const config = {
    title: 'API Call',
    icon: <LuGlobe />,
    iconColor: '#14b8a6',
    description: 'Make HTTP requests',
    fields: [
      {
        name: 'method',
        label: 'Method',
        type: 'select',
        defaultValue: 'GET',
        options: [
          { value: 'GET', label: 'GET' },
          { value: 'POST', label: 'POST' },
          { value: 'PUT', label: 'PUT' },
          { value: 'DELETE', label: 'DELETE' }
        ]
      },
      {
        name: 'url',
        label: 'URL',
        type: 'text',
        placeholder: 'https://api.example.com/endpoint'
      }
    ],
    handles: [
      {
        type: 'target',
        position: Position.Left,
        id: 'body',
        top: '40%',
        label: 'Body'
      },
      {
        type: 'target',
        position: Position.Left,
        id: 'headers',
        top: '70%',
        label: 'Headers'
      },
      {
        type: 'source',
        position: Position.Right,
        id: 'response',
        label: 'Response'
      }
    ],
    style: {
      borderColor: '#14b8a6',
      background: 'linear-gradient(135deg, #f0fdfa 0%, #ffffff 100%)'
    }
  };

  return <BaseNode id={id} data={data} config={config} />;
};


