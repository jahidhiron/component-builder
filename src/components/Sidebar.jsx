import React from "react";
import SidebarComponent from "./SidebarComponent";

const Sidebar = ({ components, onAddComponent }) => (
  <div className="sidebar p-4 bg-gray-100 w-1/4 h-full">
    <h2 className="text-xl font-bold mb-4">Components</h2>
    {components.map((component) => (
      <SidebarComponent
        key={component.pk}
        component={component}
        onAddComponent={onAddComponent}
      />
    ))}
  </div>
);

export default Sidebar;
