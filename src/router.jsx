import { createBrowserRouter } from "react-router";
import App from "./App";
import MainLayout from "./layouts/MainLayout";
import Home from "./pages/Home";
import PokemonDetail from "./pages/PokemonDetail";
import Favorites from "./pages/Favorites";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: App,
    children: [
      {
        Component: MainLayout,
        children: [
          {
            index: true,
            Component: Home,
          },
          {
            path: "pokemon/:name",
            Component: PokemonDetail,
          },
          {
            path: "favorites",
            Component: Favorites,
          },
        ],
      },
    ],
  },
]);