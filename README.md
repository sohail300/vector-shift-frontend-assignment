# VectorShift Frontend Technical Assessment

A professional implementation of a visual pipeline builder with drag-and-drop nodes, dynamic text handling, backend integration, and DAG validation.

---

## What's Been Built

This project successfully implements all four parts of the technical assessment:

### ✅ Part 1: Node Abstraction System

- **BaseNode Component**: Reusable abstraction for all node types
- **60% Code Reduction**: From ~50 lines to ~25 lines per node
- **5 New Node Types**: Transform, Conditional, API, Database, Delay
- **Easy Extension**: Create new nodes in 5 minutes vs 30 minutes

### ✅ Part 2: Professional UI Design

- **Modern Design System**: Purple gradients, color-coded nodes
- **Smooth Animations**: Hover effects, transitions throughout
- **Enhanced ReactFlow**: Custom minimap, styled controls, animated edges
- **Responsive Layout**: Full-height flexbox design

### ✅ Part 3: Smart Text Node

- **Dynamic Sizing**: Width and height adjust to content
- **Variable Detection**: Recognizes `{{variableName}}` syntax
- **Auto-Generate Handles**: Creates input handles for each variable
- **Real-Time Updates**: Changes reflect immediately

### ✅ Part 4: Full-Stack Integration

- **Frontend Integration**: Submit button sends pipeline to backend
- **Backend API**: FastAPI with Pydantic models
- **DAG Validation**: DFS-based cycle detection algorithm
- **User Feedback**: Beautiful alert displays analysis results

---

## Quick Start

### Prerequisites

- Node.js (v14+)
- Python (v3.8+)
- npm or yarn

### Installation & Running

**1. Install Dependencies**

```bash
# Frontend
cd frontend
npm install

# Backend
cd backend
python -m venv .venv

# Activate virtual environment
# Windows:
.venv\Scripts\activate
# macOS/Linux:
source .venv/bin/activate

pip install -r requirements.txt
```

**2. Start Backend Server**

```bash
cd backend
uvicorn main:app --reload
```

Backend runs on: `http://localhost:8000`

**3. Start Frontend Server** (in new terminal)

```bash
cd frontend
npm start
```

Frontend runs on: `http://localhost:3000`

**4. Test the Application**

- Drag nodes from toolbar onto canvas
- Connect nodes by dragging from output (right) to input (left) handles
- Try Text node with `{{variables}}`
- Click "Submit Pipeline" to see DAG analysis

---

## Features Showcase

### Node Abstraction Pattern

**Before:**

```javascript
// ~50 lines of repetitive code per node
export const MyNode = ({ id, data }) => {
  const [field1, setField1] = useState(...);
  const [field2, setField2] = useState(...);
  // ... lots of repetitive code
  return <div>...</div>;
};
```

**After:**

```javascript
// ~25 lines of clean configuration
export const MyNode = ({ id, data }) => {
  const config = {
    title: 'My Node',
    fields: [...],
    handles: [...]
  };
  return <BaseNode id={id} data={data} config={config} />;
};
```

### Text Node with Variable Detection

```
User types: "Hello {{name}}, you scored {{points}} points!"

Result:
![Text Node](/text_node.png)
```

### DAG Validation

```
Input → LLM → Output  ✅ Valid DAG
Alert: "3 nodes, 2 edges, is_dag: true"

Node1 → Node2 → Node3 → Node1  Contains Cycle
Alert: "3 nodes, 3 edges, is_dag: false"
```

---

## Available Node Types

| Node Type   | Color  |
| ----------- | ------ |
| Input       | Green  |
| Output      | Blue   |
| LLM         | Purple |
| Text        | Amber  |
| Transform   | Cyan   |
| Conditional | Pink   |
| API         | Teal   |
| Database    | Orange |
| Delay       | Lime   |

---

## Adding Your Own Node

It's incredibly easy! Follow this template:

```javascript
// 1. Create: frontend/src/nodes/myNode.js
import { BaseNode } from "./BaseNode";
import { Position } from "reactflow";

export const MyCustomNode = ({ id, data }) => {
  const config = {
    title: "My Custom Node",
    description: "What my node does",
    fields: [
      {
        name: "myField",
        label: "My Field",
        type: "text",
        placeholder: "Enter value",
      },
    ],
    handles: [
      { type: "target", position: Position.Left, id: "input" },
      { type: "source", position: Position.Right, id: "output" },
    ],
    style: {
      borderColor: "#3b82f6",
      background: "linear-gradient(135deg, #dbeafe 0%, #ffffff 100%)",
    },
  };
  return <BaseNode id={id} data={data} config={config} />;
};

// 2. Register in ui.js:
import { MyCustomNode } from "./nodes/myNode";
// Add to nodeTypes: myCustom: MyCustomNode

// 3. Add to toolbar.js:
<DraggableNode type="myCustom" label="My Node" />;

// Done!
```

---

## API Documentation

### Backend Endpoint

**POST /pipelines/parse**

Request Body:

```json
{
  "nodes": [
    {
      "id": "node-1",
      "type": "customInput",
      "position": { "x": 0, "y": 0 },
      "data": {}
    }
  ],
  "edges": [
    {
      "id": "edge-1",
      "source": "node-1",
      "target": "node-2",
      "sourceHandle": "node-1-value",
      "targetHandle": "node-2-input"
    }
  ]
}
```

Response:

```json
{
  "num_nodes": 1,
  "num_edges": 1,
  "is_dag": true
}
```

**DAG Algorithm**:

- Builds adjacency list from edges
- Uses depth-first search with recursion stack
- Detects back edges (cycles) efficiently
- O(V + E) time complexity
- Handles disconnected components correctly

---

## State Management

- Uses Zustand for lightweight global state
- Stores nodes and edges in a centralized store
- ReactFlow integration for drag-and-drop functionality

---
