import React from "react";
import { Draggable } from "react-beautiful-dnd";

const DraggableItem = ({
  item,
  index,
  column,
  selectedItems,
  toggleSelection,
}) => {
  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
        toggleSelection(item.id, column);
      }}
    >
      <Draggable draggableId={item.id.toString()} index={index}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            className={`transition duration-200 my-12 rounded-lg border text-xs border-white/5 bg-white/5 p-8 px-12 ${
              snapshot.isDragging
                ? "bg-white/10 text-white font-bold"
                : "text-white/50"
            } ${selectedItems.includes(item.id) ? "bg-white/20" : ""}`}
            style={{
              // userSelect: "none",
              ...provided.draggableProps.style,
            }}
          >
            {item.content}
          </div>
        )}
      </Draggable>
    </div>
  );
};

export default React.memo(DraggableItem);
