import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ComponentsPage } from "./pages/ComponentsPage";
import { Layouts } from "./pages/Layouts";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ComponentsPage />} />
        <Route path="/layouts" element={<Layouts />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
