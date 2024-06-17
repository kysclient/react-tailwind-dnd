import React, { useState, useCallback, useEffect } from "react";
import ReactDOM from "react-dom/client";
import { DragDropContext } from "react-beautiful-dnd";
import DroppableArea from "./componenets/droppable-area";
import "./styles/global.scss";
import reactLogo from "./assets/react.svg";

const initialData = {
  columns: {
    "column-1": { id: "column-1", title: "TypeScript", itemIds: [0, 1, 2, 3] },
    "column-2": { id: "column-2", title: "React.js", itemIds: [4, 5, 6, 7] },
    "column-3": { id: "column-3", title: "Next.js", itemIds: [8, 9] },
    "column-4": { id: "column-4", title: "React Native", itemIds: [10, 11] },
  },
  items: Array.from({ length: 12 }, (v, k) => ({
    id: k,
    content: `draggable_item - ${k}`,
  })),
  columnOrder: ["column-1", "column-2", "column-3", "column-4"],
};

function App() {
  const [items, setItems] = useState(initialData);
  const [isDraggingToThirdColumn, setIsDraggingToThirdColumn] = useState(false);
  const [selectedItemIds, setSelectedItemIds] = useState([]);

  const toggleSelection = useCallback(
    (itemId, column) => {
      setSelectedItemIds((prevSelected) => {
        if (prevSelected.includes(itemId)) {
          return prevSelected.filter((id) => id !== itemId);
        } else {
          if (column.itemIds.some((id) => prevSelected.includes(id))) {
            return [...prevSelected, itemId];
          } else {
            return [itemId];
          }
        }
      });
    },
    [selectedItemIds]
  );

  const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
  };

  const onDragEnd = useCallback(
    (result) => {
      const { destination, source, draggableId } = result;
      setIsDraggingToThirdColumn(false);

      if (!destination) return;

      if (
        source.droppableId === "column-1" &&
        destination.droppableId === "column-3"
      ) {
        return;
      }

      if (source.droppableId === destination.droppableId) {
        const column = items.columns[source.droppableId];
        const newItems = reorder(
          column.itemIds,
          source.index,
          destination.index
        );
        const newColumn = {
          ...column,
          itemIds: newItems,
        };

        setItems((prevData) => ({
          ...prevData,
          columns: {
            ...prevData.columns,
            [newColumn.id]: newColumn,
          },
        }));
      } else {
        const startColumn = items.columns[source.droppableId];
        const endColumn = items.columns[destination.droppableId];

        if (selectedItemIds.length > 1) {
          let startItems = Array.from(startColumn.itemIds);
          let endItems = Array.from(endColumn.itemIds);

          selectedItemIds.forEach((id) => {
            const index = startItems.indexOf(id);
            if (index !== -1) {
              startItems.splice(index, 1);
            }
          });

          const insertIndex = destination.index;
          selectedItemIds.reverse().forEach((id) => {
            endItems.splice(insertIndex, 0, id);
          });

          const newStartColumn = {
            ...startColumn,
            itemIds: startItems,
          };

          const newEndColumn = {
            ...endColumn,
            itemIds: endItems,
          };

          setItems((prevData) => ({
            ...prevData,
            columns: {
              ...prevData.columns,
              [newStartColumn.id]: newStartColumn,
              [newEndColumn.id]: newEndColumn,
            },
          }));
          setSelectedItemIds([]);
        } else {
          const startItems = Array.from(startColumn.itemIds);
          const endItems = Array.from(endColumn.itemIds);

          startItems.splice(source.index, 1);
          endItems.splice(destination.index, 0, parseInt(draggableId, 10));

          const newStartColumn = {
            ...startColumn,
            itemIds: startItems,
          };

          const newEndColumn = {
            ...endColumn,
            itemIds: endItems,
          };

          setItems((prevData) => ({
            ...prevData,
            columns: {
              ...prevData.columns,
              [newStartColumn.id]: newStartColumn,
              [newEndColumn.id]: newEndColumn,
            },
          }));
        }
      }
    },
    [items, isDraggingToThirdColumn, selectedItemIds]
  );

  const onDragUpdate = useCallback(
    (update) => {
      const { destination, source } = update;

      if (destination) {
        const columnId = destination.droppableId;

        if (columnId === "column-3" && source.droppableId === "column-1") {
          setIsDraggingToThirdColumn(true);
        } else {
          setIsDraggingToThirdColumn(false);
        }
      }
    },
    [isDraggingToThirdColumn]
  );

  return (
    <div className="w-full bg-black text-white flex justify-center items-center overflow-hidden min-h-screen max-h-screen bg-gradient-to-tl from-black via-zinc-600/20 to-black gap-4 relative">
      <a
        className="py-4 absolute top-10 left-10"
        href="https://react.dev"
        target="_blank"
      >
        <img src={reactLogo} className="logo react" alt="React logo" />
      </a>

      <DragDropContext onDragUpdate={onDragUpdate} onDragEnd={onDragEnd}>
        {items.columnOrder.map((columnId) => {
          const column = items.columns[columnId];
          const data = column.itemIds.map((itemId) =>
            items.items.find((item) => item.id === itemId)
          );
          return (
            <DroppableArea
              key={column.id}
              column={column}
              items={data}
              isDraggingToThirdColumn={isDraggingToThirdColumn}
              selectedItems={selectedItemIds}
              toggleSelection={toggleSelection}
            />
          );
        })}
      </DragDropContext>
      <div className="w-full h-[1px] border z-[1] border-white/[7.5%] absolute top-[50%] left-[50%] transform translate-x-[-50%] translate-y-[-50%]"></div>
      <div className="w-full h-[1px] border z-[1] border-white/[7.5%] absolute top-[50%] left-[50%] transform translate-x-[-50%] translate-y-[-50%] rotate-90"></div>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
