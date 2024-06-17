import React, { useEffect } from "react";
import { Droppable } from "react-beautiful-dnd";
import Column from "./column";

const DroppableArea = ({
  column,
  items,
  isDraggingToThirdColumn,
  selectedItems,
  toggleSelection,
}) => {
  return (
    <Droppable droppableId={column.id}>
      {(provided, snapshot) => (
        <div className="relative z-[10]">
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className={`transition duration-200 rounded-xl  text-white min-h-[300px] p-4 ${
              snapshot.isDraggingOver
                ? isDraggingToThirdColumn && column.id === "column-3"
                  ? "bg-red-600/50 cursor-not-allowed"
                  : "bg-white/[6%]"
                : "bg-white/5"
            } `}
          >
            {!items.length ? (
              <div className="font-italic px-12 h-full  text-white/50 flex justify-center items-center">
                No data
              </div>
            ) : (
              <>
                <Column
                  selectedItems={selectedItems}
                  toggleSelection={toggleSelection}
                  column={column}
                  items={items}
                />
                {provided.placeholder}
              </>
            )}
          </div>
          <div className="absolute inset-[35%] rounded-full bg-white/15 blur-2xl" />
        </div>
      )}
    </Droppable>
  );
};

export default DroppableArea;
