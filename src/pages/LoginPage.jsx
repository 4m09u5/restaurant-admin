import { useNavigate } from "react-router-dom";
import { login } from "../api/Api";
import LoginForm from "../components/LoginForm";
import { useEffect } from "react";

const LoginPage = ({ token, setToken }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
        navigate("/dashboard")
    }
  }, [token]);

  const handleLogin = async (token) => {
    try {
      setToken(token);
      navigate("/dashboard");
    } catch (error) {
      console.error("Ошибка входа:", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <LoginForm onLogin={handleLogin} />
    </div>
  );
};

export default LoginPage;
