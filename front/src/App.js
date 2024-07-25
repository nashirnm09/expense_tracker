import "./App.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Sign from "./pages/sign";
import Login from "./pages/login";
import Home from "./components/home";
import Not from "./pages/not";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <>
          <Home />
        </>
      ),
    },
    {
      path: "login",
      element: (
        <>
          <Login />
        </>
      ),
    },
    {
      path: "sign",
      element: <Sign />,
    },
    {
      path: "*",
      element: <Not />,
    },
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
