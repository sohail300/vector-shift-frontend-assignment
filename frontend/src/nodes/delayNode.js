// delayNode.js
// A node for adding delays/timers

import { BaseNode } from './BaseNode';
import { Position } from 'reactflow';
import { LuClock } from 'react-icons/lu';

export const DelayNode = ({ id, data }) => {
  const config = {
    title: 'Delay',
    icon: <LuClock />,
    iconColor: '#84cc16',
    description: 'Add time delay',
    fields: [
      {
        name: 'duration',
        label: 'Duration',
        type: 'number',
        defaultValue: 1000,
        placeholder: 'Milliseconds',
        min: 0,
        step: 100
      },
      {
        name: 'unit',
        label: 'Unit',
        type: 'select',
        defaultValue: 'ms',
        options: [
          { value: 'ms', label: 'Milliseconds' },
          { value: 's', label: 'Seconds' },
          { value: 'm', label: 'Minutes' }
        ]
      },
      {
        name: 'blocking',
        label: 'Blocking',
        type: 'checkbox',
        defaultValue: true
      }
    ],
    handles: [
      {
        type: 'target',
        position: Position.Left,
        id: 'trigger',
        label: 'Trigger'
      },
      {
        type: 'source',
        position: Position.Right,
        id: 'output',
        label: 'Output'
      }
    ],
    style: {
      borderColor: '#84cc16',
      background: 'linear-gradient(135deg, #f7fee7 0%, #ffffff 100%)'
    }
  };

  return <BaseNode id={id} data={data} config={config} />;
};


