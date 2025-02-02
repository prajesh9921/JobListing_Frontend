import { Route, Routes, Navigate } from "react-router-dom";
import LoginPage from "./pages/Login/login";
import RegisterPage from "./pages/Register/register";
import MainPage from "./pages/Main/mainPage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import JobDetails from "./pages/JobDetails/jobDetails";
import JobDefinePage from "./pages/AddJob/addJob";
import ProtectedRoute from "./components/ProtectedRoute/protectedRoute";

function App() {
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        draggable
        pauseOnHover
        theme="dark"
      />
      <Routes>
        <Route path="/" element={<Navigate to="/mainPage" />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/mainPage" element={<MainPage />} />
        <Route path="/jobDetails/:jobid" element={<ProtectedRoute Component={JobDetails}/>} />
        <Route path="/job-add-page" element={<ProtectedRoute Component={JobDefinePage}/>} />
      </Routes>
    </>
  );
}

export default App;
