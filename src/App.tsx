import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ComponentsPage } from "./pages/ComponentsPage";
import { Layouts } from "./pages/Layouts";
import { TablePage } from "./pages/Table";
import "./globals.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ComponentsPage />} />
        <Route path="/layouts" element={<Layouts />} />
        <Route path="/tables" element={<TablePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
