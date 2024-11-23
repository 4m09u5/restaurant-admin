import { useState } from "react";
import { login } from "../api/Api";
import Cookies from "js-cookie";

const LoginForm = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await login(email, password); // Вызов функции из API
      const token = response.data.token;

      // Сохранение токена в cookies
      Cookies.set("token", token, { expires: 7 });
      onLogin(token);
    } catch (error) {
      console.error("Ошибка авторизации:", error.response?.data || error.message);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto p-4 bg-white shadow-md rounded"
    >
      <h1 className="text-2xl font-bold mb-4">Вход</h1>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border rounded p-2"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Пароль</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border rounded p-2"
        />
      </div>
      <button
        type="submit"
        className="w-full bg-blue-500 text-white py-2 rounded"
      >
        Войти
      </button>
    </form>
  );
};

export default LoginForm;
