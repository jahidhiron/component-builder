import React from "react";

const Customizer = ({ selectedComponent, updateComponent }) => {
  if (!selectedComponent) {
    return (
      <div className="customizer p-4 bg-white shadow-md w-1/4">
        <h2 className="font-bold text-xl mb-4">Customizer</h2>
        <p className="text-gray-500">Select a component to customize it</p>
      </div>
    );
  }

  const handleStyleChange = (key, value) => {
    const updatedComponent = {
      ...selectedComponent,
      componentInfo: {
        ...selectedComponent.componentInfo,
        attributes: {
          ...selectedComponent.componentInfo.attributes,
          style: {
            ...selectedComponent.componentInfo.attributes.style,
            [key]: value,
          },
        },
      },
    };
    updateComponent(updatedComponent);
  };

  const handleContentChange = (value) => {
    const updatedComponent = {
      ...selectedComponent,
      componentInfo: {
        ...selectedComponent.componentInfo,
        value: value,
      },
    };
    updateComponent(updatedComponent);
  };

  const handleLinkChange = (url) => {
    const updatedComponent = {
      ...selectedComponent,
      componentInfo: {
        ...selectedComponent.componentInfo,
        link: url,
      },
    };
    updateComponent(updatedComponent);
  };

  const handleImageSrcChange = (url) => {
    const updatedComponent = {
      ...selectedComponent,
      componentInfo: {
        ...selectedComponent.componentInfo,
        src: url,
      },
    };
    updateComponent(updatedComponent);
  };

  return (
    <div className="customizer p-4 bg-white shadow-md w-1/4">
      <h2 className="font-bold text-xl mb-4">Customizer</h2>
      <label className="block mb-2">Text Content</label>
      <input
        type="text"
        value={selectedComponent.componentInfo.value || ""}
        onChange={(e) => handleContentChange(e.target.value)}
        className="w-full p-2 border border-gray-300 rounded-md mb-4"
      />
      <label className="block mb-2">Font Size (px)</label>
      <input
        type="number"
        value={parseInt(
          selectedComponent.componentInfo.attributes.style.fontSize || 16,
          10
        )}
        onChange={(e) => handleStyleChange("fontSize", `${e.target.value}px`)}
        className="w-full p-2 border border-gray-300 rounded-md mb-4"
      />
      <label className="block mb-2">Font Family</label>
      <select
        value={
          selectedComponent.componentInfo.attributes.style.fontFamily || "Arial"
        }
        onChange={(e) => handleStyleChange("fontFamily", e.target.value)}
        className="w-full p-2 border border-gray-300 rounded-md mb-4"
      >
        <option value="Arial">Arial</option>
        <option value="Helvetica">Helvetica</option>
        <option value="Times New Roman">Times New Roman</option>
        <option value="Courier New">Courier New</option>
        <option value="Georgia">Georgia</option>
      </select>
      <label className="block mb-2">Font Color</label>
      <input
        type="color"
        value={
          selectedComponent.componentInfo.attributes.style.color || "#000000"
        }
        onChange={(e) => handleStyleChange("color", e.target.value)}
        className="w-full p-2 border border-gray-300 rounded-md mb-4"
      />
      <label className="block mb-2">Background Color</label>
      <input
        type="color"
        value={
          selectedComponent.componentInfo.attributes.style.backgroundColor || ""
        }
        onChange={(e) => handleStyleChange("backgroundColor", e.target.value)}
        className="w-full p-2 border border-gray-300 rounded-md mb-4"
      />
      <label className="block mb-2">Text Alignment</label>
      <select
        value={
          selectedComponent.componentInfo.attributes.style.textAlign || "left"
        }
        onChange={(e) => handleStyleChange("textAlign", e.target.value)}
        className="w-full p-2 border border-gray-300 rounded-md mb-4"
      >
        <option value="left">Left</option>
        <option value="center">Center</option>
        <option value="right">Right</option>
      </select>
      {selectedComponent.componentInfo.type === "button" && (
        <div>
          <label className="block mb-2">Button Link</label>
          <input
            type="text"
            value={selectedComponent.componentInfo.link || ""}
            onChange={(e) => handleLinkChange(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md mb-4"
            placeholder="Enter URL"
          />
        </div>
      )}
      {selectedComponent.componentInfo.type === "image" && (
        <div>
          <label className="block mb-2">Image URL</label>
          <input
            type="text"
            value={selectedComponent.componentInfo.src || ""}
            onChange={(e) => handleImageSrcChange(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md mb-4"
            placeholder="Enter Image URL"
          />
        </div>
      )}
    </div>
  );
};

export default Customizer;
