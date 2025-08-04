import "./App.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Sign from "./pages/sign";
import Login from "./pages/login";
import Home from "./components/home";
import Not from "./pages/not";
import { useEffect } from "react";
import store from "./redux/store";
import { getUserAction } from "./redux/actions/userActions";
import { Provider } from "react-redux";
import ProtectRoute from "./components/protectRoute";

function App() {
  (() => store.dispatch(getUserAction()))();

  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <ProtectRoute>
          <Home />
        </ProtectRoute>
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
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  );
}

export default App;
