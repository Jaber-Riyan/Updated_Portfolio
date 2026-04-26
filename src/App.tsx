import { Provider } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { store } from "./store/store";
import PortfolioPage from "./pages/PortfolioPage";
import ProjectsPage from "./pages/ProjectsPage";
import BlogsPage from "./pages/BlogsPage";
import ProjectDetailPage from "./pages/ProjectDetailPage";
import BlogDetailPage from "./pages/BlogDetailPage";
import ManagePage from "./pages/ManagePage";

export default function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<PortfolioPage />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/blogs" element={<BlogsPage />} />
          <Route path="/project/:id" element={<ProjectDetailPage />} />
          <Route path="/blog/:id" element={<BlogDetailPage />} />
          <Route path="/manage" element={<ManagePage />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}
