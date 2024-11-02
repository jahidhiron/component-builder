import React from "react";
import { useDrop } from "react-dnd";

const Canvas = ({
  components = [],
  setSelectedComponent,
  onAddComponent,
  undo,
  redo,
  canUndo,
  canRedo,
}) => {
  const [, drop] = useDrop({
    accept: "COMPONENT",
    drop: (item) => {
      onAddComponent(item.component);
    },
  });

  return (
    <div className="canvas-container flex-1 p-4 bg-gray-50 rounded-lg shadow-lg overflow-auto">
      <div className="actions flex justify-end mb-2">
        <button
          onClick={undo}
          disabled={!canUndo}
          className="mr-2 p-2 bg-gray-200 rounded disabled:opacity-50"
        >
          Undo
        </button>
        <button
          onClick={redo}
          disabled={!canRedo}
          className="p-2 bg-gray-200 rounded disabled:opacity-50"
        >
          Redo
        </button>
      </div>

      <div
        ref={drop}
        className="drop-area px-4 py-4 pb-[16rem] bg-gray-100 rounded-lg shadow-inner border-2 border-dashed border-blue-300 min-h-[300px]"
      >
        {components.length === 0 ? (
          <p className="text-center text-gray-500">Drag components here</p>
        ) : (
          components.map((component) => (
            <div
              key={component.id}
              onClick={() => setSelectedComponent(component)}
              className="canvas-card p-4 bg-white shadow-md rounded-md mb-4 cursor-pointer full-width-block"
            >
              {component.componentInfo.type === "button" ? (
                <a
                  href={component.componentInfo.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={component.componentInfo.attributes.style}
                  className="button-link"
                >
                  {component.componentInfo.value ||
                    component.componentInfo.label}
                </a>
              ) : component.componentInfo.type === "image" ? (
                <img
                  src={component.componentInfo.src}
                  alt={component.componentInfo.alt || "Image"}
                  style={{
                    ...component.componentInfo.attributes.style,
                    width: "100%",
                  }}
                />
              ) : (
                <div style={component.componentInfo.attributes.style}>
                  {component.componentInfo.value ||
                    component.componentInfo.label}
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Canvas;
