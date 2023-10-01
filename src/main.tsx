import React from 'react'
import ReactDOM from 'react-dom/client'
import Home from './Home.tsx'
import About from './pages/About.tsx'
import Projects from './pages/Projects.tsx'
import Setup from "./pages/Setup.tsx";
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />
  },
  {
    path: "about",
    element: <About />
  },
  {
    path: "projects",
    element: <Projects />
  },
  {
    path: "setup",
    element: <Setup />
  }
]);

const rootElement = document.getElementById('root');

if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  );
} else {
  console.error("Element with id 'root' not found.");
}