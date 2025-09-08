
import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import CareersPage from "./pages/CareersPage";
import JobDetailPage from "./pages/JobDetailPage";

export default function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Navigate to="/careers" replace />} />
        <Route path="/careers" element={<CareersPage />} />
        <Route path="/careers/:jobId" element={<JobDetailPage />} />
      </Routes>
    </>
  );
}