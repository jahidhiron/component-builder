# Component Template Builder

A **Drag-and-Drop Component Template Builder** built with React, featuring a customizable, reusable, and flexible architecture. This application allows users to construct component templates by dragging components onto a canvas, modifying them via a customizer, and saving the current state for easy access after a page refresh.

## Table of Contents

- [Features](#features)
- [Technologies](#technologies)
- [Getting Started](#getting-started)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Future Improvements](#future-improvements)
- [License](#license)

## Features

1. **Sidebar with Component Preview**  
   A sidebar displays a list of available components, which users can drag onto the central canvas. Components have properties and subcomponents that render accordingly on the canvas.

2. **Right-Side Customizer**  
   Allows users to select and customize each component. Options include:

   - Text content
   - Font size, font family, color
   - Background color
   - Component-specific options, such as links for buttons and alignment for text

3. **Undo/Redo Functionality**  
   A history stack enables easy undoing and redoing of recent changes.

4. **Reusable, Flexible Code Structure**  
   Designed for flexibility and scalability, the architecture supports new component types without additional modifications.

5. **Multiple Component Instances**  
   Users can add multiple instances of any component, maintaining proper positioning within the canvas.

6. **State Persistence**  
   The application saves the canvas state to `localStorage` to restore the last-used state after a page refresh.

## Technologies

- **React** with **Vite** - Fast and modern frontend development framework.
- **react-dnd** - Drag-and-drop library for React, enabling draggable and droppable components.
- **Tailwind CSS** - Utility-first CSS framework for styling.

## Getting Started

### Prerequisites

Ensure you have the following installed:

- [Node.js](https://nodejs.org/) (version 14 or above)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

### Installation

1. Clone the repository:

   ```bash
   git clone git@github.com:jahidhiron/component-builder.git
   cd component-builder
   ```

2. Install dependencies:

   ```bash
   npm install
   # or
   yarn install
   ```

3. Start the development server:

   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. Open your browser and go to `http://localhost:5173`.

## Usage

1. **Drag Components**  
   Select components from the sidebar and drag them onto the canvas.

2. **Customize Components**  
   Click on a component in the canvas to open the customizer panel, where you can modify various properties.

3. **Undo/Redo Changes**  
   Use the Undo and Redo buttons at the top of the canvas to navigate through the changes.

4. **State Persistence**  
   The canvas state is automatically saved in `localStorage` and will persist even after a page refresh.

## Project Structure

```plaintext
src
├── components
│   ├── Canvas.jsx             # Canvas for displaying components
│   ├── Customizer.jsx         # Customizer panel for editing components
│   ├── Sidebar.jsx            # Sidebar with component previews
│   ├── SidebarComponent.jsx   # Single sidebar item (draggable component)
│   └── index.js               # Barrel file for components
├── hooks
│   └── useHistory.js          # Custom hook for undo/redo history management
├── layouts
│   └── MainLayout.jsx         # Layout for main editor structure
├── pages
│   └── Editor.jsx             # Main editor page containing Sidebar, Canvas, Customizer
├── App.jsx                    # Root application component
├── index.css                  # Global styles (Tailwind)
└── data
    ├── Component.json         # Primary component data
    └── subComponents.json     # Data for each subcomponent
```

## Future Improvements

1. **Enhanced Component Library**  
   Add more predefined components to the sidebar for diverse component layouts.

2. **Save and Load Templates**  
   Allow users to save and load custom templates from local or cloud storage.

3. **Responsive Design Support**  
   Optimize for responsive components to improve readability on different screen sizes.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
