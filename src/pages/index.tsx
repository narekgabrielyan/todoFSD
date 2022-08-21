import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";

const TestPage = React.lazy(() => import("./test"));

export const Routing = () => {
  return (
    <Routes>
      <Route path="/" element={<TestPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};
