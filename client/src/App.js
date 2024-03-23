import { createBrowserRouter, RouterProvider } from "react-router-dom";

import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";
import Error from "./pages/Error";

const router = createBrowserRouter([
  { path: "/", element: <LoginPage /> },
  { path: "/dashboard", element: <DashboardPage />, errorElement: <Error /> },
  { path: "*", element: <Error /> },
]);

function App() {
  return (
    <RouterProvider router={router}>
      <div>
        <LoginPage />
      </div>
    </RouterProvider>
  );
}

export default App;
