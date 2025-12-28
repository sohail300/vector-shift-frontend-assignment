// textNode.js

import { useState, useMemo } from 'react';
import { Handle, Position } from 'reactflow';
import { LuFileText } from 'react-icons/lu';

export const TextNode = ({ id, data }) => {
  const [currText, setCurrText] = useState(data?.text || '{{input}}');

  // Extract variable names from text (looking for {{varName}} pattern)
  const variables = useMemo(() => {
    const regex = /\{\{\s*([a-zA-Z_$][a-zA-Z0-9_$]*)\s*\}\}/g;
    const matches = [];
    let match;
    while ((match = regex.exec(currText)) !== null) {
      if (!matches.includes(match[1])) {
        matches.push(match[1]);
      }
    }
    return matches;
  }, [currText]);

  const handleTextChange = (e) => {
    setCurrText(e.target.value);
  };

  // Calculate dynamic dimensions based on text content
  const textLength = currText.length;
  const lineCount = currText.split('\n').length;
  
  const dynamicWidth = Math.max(220, Math.min(500, 220 + textLength * 2));
  const dynamicHeight = Math.max(100, 80 + lineCount * 20 + variables.length * 8);

  return (
    <div 
      className="border-[1.5px] border-amber-500 rounded-xl p-4 text-sm bg-gradient-to-br from-amber-50 to-white"
      style={{
        minWidth: dynamicWidth,
        minHeight: dynamicHeight,
      }}
    >
      {/* Dynamic variable handles on the left */}
      {variables.map((varName, idx) => (
        <Handle
          key={`${varName}`}
          type="target"
          position={Position.Left}
          id={varName}
          className="!w-3 !h-3 !border-[3px] !border-white !bg-amber-500 shadow-[0_0_0_1px_#e5e7eb]"
          style={{
            top: `${((idx + 1) * 100) / (variables.length + 1)}%`,
          }}
          title={varName}
        />
      ))}

      {/* Node header */}
      <div className="mb-3.5 flex items-center justify-between">
        <div className="font-semibold text-gray-900 text-[15px] flex items-center gap-2">
          <span className="flex items-center justify-center w-6 h-6 text-lg text-[#f59e0b]">
            <LuFileText />
          </span>
          <span>Text</span>
        </div>
      </div>

      {/* Text input */}
      <div>
        <label className="block mb-1.5 text-xs font-semibold text-gray-700 tracking-wide">
          Text
        </label>
        <textarea
          value={currText}
          onChange={handleTextChange}
          placeholder="Enter text with {{variables}}"
          rows={Math.max(3, lineCount)}
          className="px-3 py-2 border-[1.5px] border-gray-200 rounded-lg text-[13px] w-full bg-white text-gray-900 transition-all duration-200 outline-none resize-y max-h-[600px] leading-relaxed focus:border-amber-500 focus:ring-4 focus:ring-amber-500/10"
        />
      </div>

      {/* Variables info */}
      {variables.length > 0 && (
        <div className="mt-2.5 text-[11px] text-gray-500 px-3 py-2 bg-orange-50 rounded-lg border border-orange-200 leading-relaxed">
          <span className="font-semibold text-orange-900">Variables:</span> {variables.join(', ')}
        </div>
      )}

      {/* Output handle */}
      <Handle
        type="source"
        position={Position.Right}
        id="output"
        className="!w-3 !h-3 !border-[3px] !border-white !bg-emerald-500 shadow-[0_0_0_1px_#e5e7eb]"
        title="Output"
      />
    </div>
  );
};
