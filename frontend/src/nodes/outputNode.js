// outputNode.js

import { BaseNode } from './BaseNode';
import { Position } from 'reactflow';
import { LuUpload } from 'react-icons/lu';

export const OutputNode = ({ id, data }) => {
  const config = {
    title: 'Output',
    icon: <LuUpload />,
    iconColor: '#3b82f6',
    fields: [
      {
        name: 'outputName',
        label: 'Name',
        type: 'text',
        defaultValue: id.replace('customOutput-', 'output_'),
        placeholder: 'Enter output name'
      },
      {
        name: 'outputType',
        label: 'Type',
        type: 'select',
        defaultValue: 'Text',
        options: [
          { value: 'Text', label: 'Text' },
          { value: 'Image', label: 'Image' }
        ]
      }
    ],
    handles: [
      {
        type: 'target',
        position: Position.Left,
        id: 'value',
        label: 'Input'
      }
    ],
    style: {
      borderColor: '#3b82f6',
      background: 'linear-gradient(135deg, #eff6ff 0%, #ffffff 100%)'
    }
  };

  return <BaseNode id={id} data={data} config={config} />;
};
