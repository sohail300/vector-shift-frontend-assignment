// databaseNode.js
// A node for database operations

import { BaseNode } from './BaseNode';
import { Position } from 'reactflow';
import { LuDatabase } from 'react-icons/lu';

export const DatabaseNode = ({ id, data }) => {
  const config = {
    title: 'Database',
    icon: <LuDatabase />,
    iconColor: '#f97316',
    description: 'Store and retrieve data',
    fields: [
      {
        name: 'operation',
        label: 'Operation',
        type: 'select',
        defaultValue: 'read',
        options: [
          { value: 'read', label: 'Read' },
          { value: 'write', label: 'Write' },
          { value: 'update', label: 'Update' },
          { value: 'delete', label: 'Delete' }
        ]
      },
      {
        name: 'table',
        label: 'Table/Collection',
        type: 'text',
        placeholder: 'Enter table name'
      },
      {
        name: 'key',
        label: 'Key',
        type: 'text',
        placeholder: 'Primary key or ID'
      }
    ],
    handles: [
      {
        type: 'target',
        position: Position.Left,
        id: 'data',
        label: 'Data'
      },
      {
        type: 'source',
        position: Position.Right,
        id: 'result',
        label: 'Result'
      }
    ],
    style: {
      borderColor: '#f97316',
      background: 'linear-gradient(135deg, #fff7ed 0%, #ffffff 100%)'
    }
  };

  return <BaseNode id={id} data={data} config={config} />;
};


