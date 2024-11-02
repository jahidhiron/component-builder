import React from "react";
import { useDrag } from "react-dnd";

const SidebarComponent = ({ component, onAddComponent }) => {
  const [, drag] = useDrag(() => ({
    type: "COMPONENT",
    item: { component },
  }));

  return (
    <div
      ref={drag}
      onClick={() => onAddComponent(component)}
      className="sidebar-card p-4 mb-4 bg-white shadow-md rounded-lg border cursor-pointer"
    >
      <h3 className="font-semibold text-center">
        {component.componentInfo.label}
      </h3>
    </div>
  );
};

export default SidebarComponent;
