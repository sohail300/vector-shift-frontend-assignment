// conditionalNode.js
// A node for conditional logic

import { BaseNode } from './BaseNode';
import { Position } from 'reactflow';
import { LuGitBranch } from 'react-icons/lu';

export const ConditionalNode = ({ id, data }) => {
  const config = {
    title: 'Conditional',
    icon: <LuGitBranch />,
    iconColor: '#ec4899',
    description: 'Branch based on condition',
    fields: [
      {
        name: 'condition',
        label: 'Condition',
        type: 'select',
        defaultValue: 'equals',
        options: [
          { value: 'equals', label: 'Equals' },
          { value: 'not_equals', label: 'Not Equals' },
          { value: 'contains', label: 'Contains' },
          { value: 'greater_than', label: 'Greater Than' },
          { value: 'less_than', label: 'Less Than' }
        ]
      },
      {
        name: 'value',
        label: 'Compare Value',
        type: 'text',
        placeholder: 'Enter value to compare'
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
        id: 'true',
        top: '35%',
        label: 'True'
      },
      {
        type: 'source',
        position: Position.Right,
        id: 'false',
        top: '65%',
        label: 'False'
      }
    ],
    style: {
      borderColor: '#ec4899',
      background: 'linear-gradient(135deg, #fdf2f8 0%, #ffffff 100%)'
    }
  };

  return <BaseNode id={id} data={data} config={config} />;
};


