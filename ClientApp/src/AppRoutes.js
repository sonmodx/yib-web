import Home from "./pages/home/Home";
import Carry from "./pages/carry-deposit/carry/Carry";
import Deposit from "./pages/carry-deposit/deposit/Deposit";
import About from "./pages/about/About";
import Auth from "./pages/auth/Auth";

const AppRoutes = [
  {
    path: "/main",
    element: <Home />,
  },
  {
    path: "/carry",
    element: <Carry />,
  },
  {
    path: "/deposit",
    element: <Deposit />,
  },
  {
    path: "/about",
    element: <About />,
  },
  {
    path: "/auth",
    element: <Auth />,
  },
];

export default AppRoutes;
