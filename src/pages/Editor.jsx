import React, { useState, useEffect, useCallback, useRef } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import MainLayout from "../layouts/Layout";
import Sidebar from "../components/Sidebar";
import Canvas from "../components/Canvas";
import Customizer from "../components/Customizer";
import { useHistory } from "../hooks/useHistory";
import componentsData from "../data/subComponents.json";

function Editor() {
  const [selectedComponentId, setSelectedComponentId] = useState(null);
  const { history, addToHistory, undo, redo, canUndo, canRedo } = useHistory();

  const prevHistoryRef = useRef(history);

  useEffect(() => {
    const savedState = JSON.parse(localStorage.getItem("canvasState")) || [];
    addToHistory(savedState);
  }, []);

  useEffect(() => {
    localStorage.setItem("canvasState", JSON.stringify(history));

    const prevHistory = prevHistoryRef.current;
    if (prevHistory !== history) {
      const modifiedComponent = findModifiedComponent(prevHistory, history);
      if (modifiedComponent) {
        setSelectedComponentId(modifiedComponent.id);
      }
    }

    prevHistoryRef.current = history;
  }, [history]);

  const findModifiedComponent = (prevHistory, currentHistory) => {
    for (let i = 0; i < currentHistory.length; i++) {
      const prevComponent = prevHistory[i];
      const currentComponent = currentHistory[i];

      if (
        !prevComponent ||
        JSON.stringify(prevComponent) !== JSON.stringify(currentComponent)
      ) {
        return currentComponent;
      }
    }
    return null;
  };

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
    setSelectedComponentId(newComponent.id);
  };

  const updateComponent = useCallback(
    (updatedComponent) => {
      const updatedComponents = history.map((comp) =>
        comp.id === updatedComponent.id ? updatedComponent : comp
      );
      addToHistory(updatedComponents);
      setSelectedComponentId(updatedComponent.id);
    },
    [history, addToHistory]
  );

  const handleUndo = () => {
    undo();
  };

  const handleRedo = () => {
    redo();
  };

  const selectedComponent =
    history.find((comp) => comp.id === selectedComponentId) || null;

  return (
    <DndProvider backend={HTML5Backend}>
      <MainLayout>
        <Sidebar components={componentsData} onAddComponent={addComponent} />
        <Canvas
          components={history}
          setSelectedComponent={(component) =>
            setSelectedComponentId(component.id)
          }
          onAddComponent={addComponent}
          undo={handleUndo}
          redo={handleRedo}
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
