// inputNode.js

import { BaseNode } from './BaseNode';
import { Position } from 'reactflow';
import { LuDownload } from 'react-icons/lu';

export const InputNode = ({ id, data }) => {
  const config = {
    title: 'Input',
    icon: <LuDownload />,
    iconColor: '#10b981',
    fields: [
      {
        name: 'inputName',
        label: 'Name',
        type: 'text',
        defaultValue: id.replace('customInput-', 'input_'),
        placeholder: 'Enter input name'
      },
      {
        name: 'inputType',
        label: 'Type',
        type: 'select',
        defaultValue: 'Text',
        options: [
          { value: 'Text', label: 'Text' },
          { value: 'File', label: 'File' }
        ]
      }
    ],
    handles: [
      {
        type: 'source',
        position: Position.Right,
        id: 'value',
        label: 'Output'
      }
    ],
    style: {
      borderColor: '#10b981',
      background: 'linear-gradient(135deg, #f0fdf4 0%, #ffffff 100%)'
    }
  };

  return <BaseNode id={id} data={data} config={config} />;
};
