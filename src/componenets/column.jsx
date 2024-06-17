import React from "react";
import DraggableItem from "./draggable-item";

const Column = ({ selectedItems, toggleSelection, column, items }) => {
  return (
    <div className="">
      <h2 className="text-center mb-4 font-bold text-sm">{column.title}</h2>
      {items.map((item, index) => (
        <DraggableItem
          key={item.id}
          item={item}
          index={index}
          selectedItems={selectedItems}
          toggleSelection={toggleSelection}
          column={column}
        />
      ))}
    </div>
  );
};

export default React.memo(Column);
