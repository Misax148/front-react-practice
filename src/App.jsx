import React from "react";
import { BrowserRouter } from "react-router-dom";
import Navbar from "./components/common/Navbar";
import AppRoutes from "./routes/AppRoutes";
import MainLayout from "./components/layout/MainLayout";

function App() {
  return (
    <BrowserRouter>
      <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Navbar /> {/* Navbar es un componente independiente, no debe envolver otros componentes */}
        <MainLayout>
          <AppRoutes />
        </MainLayout>
      </div>
    </BrowserRouter>
  );
}

export default App;
