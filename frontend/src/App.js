import { Route, Routes } from "react-router-dom";
import AddPostPage from "./pages/AddPost";
import LoginPage from "./pages/Login";
import RegisterPage from "./pages/Register";
import AccessDenied from "./pages/AccessDenied";
import { AlertProvider } from "./context/alert";
import "./App.css";
import ProtectedRoute from "./pages/ProtectedRoute";
import { Navbar } from "react-bootstrap";
import HomePage from "./pages/Home";

function App() {
    return (
        <>
            <AlertProvider>
                <Routes>
                    <Route path="/" element={<LoginPage />} />
                    <Route path="/home" element={<HomePage />} />
                    <Route path="/add" element={<AddPostPage />} />
                    <Route path="/register" element={<RegisterPage />} />
                    <Route path="/main" element={
                      <ProtectedRoute 
                        errorPage={<AccessDenied/>}
                        targetPage={<HomePage/>}
                      />
                    } />
                </Routes>
            </AlertProvider>
        </>
    );
}
export default App;
