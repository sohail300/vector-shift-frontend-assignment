// draggableNode.js

export const DraggableNode = ({ type, label, icon, iconColor = '#6366f1' }) => {
    const onDragStart = (event, nodeType) => {
      const appData = { nodeType }
      event.target.style.cursor = 'grabbing';
      event.dataTransfer.setData('application/reactflow', JSON.stringify(appData));
      event.dataTransfer.effectAllowed = 'move';
    };
  
    return (
      <div
        className={`${type} cursor-grab w-[88px] h-[88px] flex items-center justify-center flex-col gap-2 bg-white rounded-lg border-[1.5px] border-gray-200 shadow-md transition-all duration-200 font-medium text-[13px] hover:-translate-y-1 hover:scale-[1.02] hover:shadow-[0_10px_20px_-5px_rgba(99,102,241,0.3)] hover:border-primary`}
        onDragStart={(event) => onDragStart(event, type)}
        onDragEnd={(event) => (event.target.style.cursor = 'grab')}
        draggable
      >
          {icon && (
            <span 
              className="text-[24px] leading-none flex items-center justify-center"
              style={{ color: iconColor }}
            >
              {icon}
            </span>
          )}
          <span className="text-gray-900 text-center leading-tight">
            {label}
          </span>
      </div>
    );
  };
  