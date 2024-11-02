import React, { useState, useEffect, useCallback } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import MainLayout from "../layouts/Layout";
import Sidebar from "../components/Sidebar";
import Canvas from "../components/Canvas";
import Customizer from "../components/Customizer";
import { useHistory } from "../hooks/useHistory";
import componentsData from "../data/subComponents.json";

function Editor() {
  const [selectedComponent, setSelectedComponent] = useState(null);
  const { history, addToHistory, undo, redo, canUndo, canRedo } = useHistory();

  useEffect(() => {
    const savedState = JSON.parse(localStorage.getItem("canvasState")) || [];
    addToHistory(savedState);
  }, []);

  useEffect(() => {
    localStorage.setItem("canvasState", JSON.stringify(history));
    if (history.length > 0) {
      const latestComponent = history[history.length - 1];
      setSelectedComponent(latestComponent);
    } else {
      setSelectedComponent(null);
    }
  }, [history]);

  const addComponent = (component) => {
    const newComponent = {
      ...component,
      id: Date.now(),
      componentInfo: {
        ...component.componentInfo,
        value: component.componentInfo.value || "",
      },
    };
    const updatedComponents = [...history, newComponent];
    addToHistory(updatedComponents);
    setSelectedComponent(newComponent);
  };

  const updateComponent = useCallback(
    (updatedComponent) => {
      const updatedComponents = history.map((comp) =>
        comp.id === updatedComponent.id ? updatedComponent : comp
      );
      addToHistory(updatedComponents);
      setSelectedComponent(updatedComponent);
    },
    [history, addToHistory]
  );

  return (
    <DndProvider backend={HTML5Backend}>
      <MainLayout>
        <Sidebar components={componentsData} onAddComponent={addComponent} />
        <Canvas
          components={history}
          setSelectedComponent={setSelectedComponent}
          onAddComponent={addComponent}
          undo={undo}
          redo={redo}
          canUndo={canUndo}
          canRedo={canRedo}
        />
        <Customizer
          selectedComponent={selectedComponent}
          updateComponent={updateComponent}
        />
      </MainLayout>
    </DndProvider>
  );
}

export default Editor;
