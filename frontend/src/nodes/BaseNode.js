// BaseNode.js
// A flexible abstraction for creating different types of nodes

import { useState, useEffect } from 'react';
import { Handle, Position } from 'reactflow';

/**
 * BaseNode - A reusable node abstraction that handles common node functionality
 * 
 * @param {Object} config - Node configuration
 * @param {string} config.title - The node title displayed at the top
 * @param {Array} config.fields - Array of field definitions for the node
 * @param {Array} config.handles - Array of handle definitions
 * @param {Object} config.style - Custom style overrides for the node
 * @param {Function} config.onFieldChange - Callback when a field value changes
 */
export const BaseNode = ({ id, data, config }) => {
  const [fieldValues, setFieldValues] = useState({});

  // Initialize field values from data or defaults
  useEffect(() => {
    const initialValues = {};
    config.fields?.forEach(field => {
      initialValues[field.name] = data?.[field.name] || field.defaultValue || '';
    });
    setFieldValues(initialValues);
  }, []);

  const handleFieldChange = (fieldName, value) => {
    setFieldValues(prev => ({
      ...prev,
      [fieldName]: value
    }));
    
    if (config.onFieldChange) {
      config.onFieldChange(id, fieldName, value);
    }
  };

  const renderField = (field) => {
    const value = fieldValues[field.name] || '';
    
    const inputClasses = "px-3 py-2 border-[1.5px] border-gray-200 rounded-lg text-[13px] w-full bg-white text-gray-900 transition-all duration-200 outline-none focus:border-primary focus:ring-4 focus:ring-primary/10";
    
    switch (field.type) {
      case 'text':
        return (
          <input
            type="text"
            value={value}
            onChange={(e) => handleFieldChange(field.name, e.target.value)}
            placeholder={field.placeholder}
            className={inputClasses}
            style={field.style}
          />
        );
      
      case 'textarea':
        return (
          <textarea
            value={value}
            onChange={(e) => handleFieldChange(field.name, e.target.value)}
            placeholder={field.placeholder}
            rows={field.rows || 3}
            className={`${inputClasses} resize-y max-h-[400px] leading-relaxed`}
            style={field.style}
          />
        );
      
      case 'select':
        return (
          <select
            value={value}
            onChange={(e) => handleFieldChange(field.name, e.target.value)}
            className={`${inputClasses} cursor-pointer`}
            style={field.style}
          >
            {field.options?.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        );
      
      case 'number':
        return (
          <input
            type="number"
            value={value}
            onChange={(e) => handleFieldChange(field.name, e.target.value)}
            placeholder={field.placeholder}
            min={field.min}
            max={field.max}
            step={field.step}
            className={inputClasses}
            style={field.style}
          />
        );
      
      case 'checkbox':
        return (
          <input
            type="checkbox"
            checked={value}
            onChange={(e) => handleFieldChange(field.name, e.target.checked)}
            className="w-4 h-4 cursor-pointer"
            style={field.style}
          />
        );
      
      default:
        return null;
    }
  };

  // Convert config.style to className if needed
  const getNodeClassName = () => {
    const baseClasses = "min-w-[240px] bg-white border-[1.5px] border-gray-200 rounded-xl p-4 text-sm";
    return baseClasses;
  };

  return (
    <div className={`${getNodeClassName()} base-node`} style={config.style}>
      {/* Render input handles */}
      {config.handles?.filter(h => h.type === 'target').map((handle, idx) => (
        <Handle
          key={`${id}-${handle.id}`}
          type="target"
          position={handle.position || Position.Left}
          id={`${id}-${handle.id}`}
          className="!w-3 !h-3 !border-[3px] !border-white !bg-primary shadow-[0_0_0_1px_#e5e7eb]"
          style={{ top: handle.top, ...handle.style }}
          title={handle.label}
        />
      ))}

      {/* Node header */}
      <div className="mb-3.5 flex items-center justify-between gap-2">
        <div className="flex items-center gap-2 font-semibold text-gray-900 text-[15px]">
          {config.icon && (
            <span 
              className="flex items-center justify-center w-6 h-6 text-lg"
              style={{ color: config.iconColor || config.style?.borderColor || '#6366f1' }}
            >
              {config.icon}
            </span>
          )}
          <span>{config.title}</span>
        </div>
      </div>

      {/* Node description (optional) */}
      {config.description && (
        <div className="mb-3 text-xs text-gray-500 leading-relaxed px-3 py-2 bg-gray-50 rounded-lg border border-gray-100">
          {config.description}
        </div>
      )}

      {/* Render fields */}
      {config.fields?.map((field, idx) => (
        <div key={field.name} className={idx < config.fields.length - 1 ? 'mb-3' : ''}>
          {field.label && (
            <label className="block mb-1.5 text-xs font-semibold text-gray-700 tracking-wide">
              {field.label}
            </label>
          )}
          {renderField(field)}
        </div>
      ))}

      {/* Render output handles */}
      {config.handles?.filter(h => h.type === 'source').map((handle, idx) => (
        <Handle
          key={`${id}-${handle.id}`}
          type="source"
          position={handle.position || Position.Right}
          id={`${id}-${handle.id}`}
          className="!w-3 !h-3 !border-[3px] !border-white !bg-emerald-500 shadow-[0_0_0_1px_#e5e7eb]"
          style={{ top: handle.top, ...handle.style }}
          title={handle.label}
        />
      ))}
    </div>
  );
};


