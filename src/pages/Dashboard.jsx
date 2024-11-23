import { useState, useEffect } from "react";
import { getOwnedRestaurants, updateRestaurant, logout } from "../api/Api";
import RestaurantList from "../components/RestaurantList";
import { useNavigate } from "react-router-dom";
import EditModal from "../components/EditModal";
import Cookies from "js-cookie";

const Dashboard = ({ token, setToken }) => {
  const [restaurants, setRestaurants] = useState([]);
  const [editingRestaurant, setEditingRestaurant] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(null);

  const handleLogout = async () => {
    try {
      await logout(token);
      Cookies.remove("token");
      setToken("");
      navigate("/");
    } catch (error) {
      console.error("Ошибка при выходе:", error.response?.data || error.message);
    }
  };

  const navigate = useNavigate();

  useEffect(() => {
    if (token == "") {
      navigate("/")
      return;
    }

    console.log(`token: ${token}`)

    const fetchRestaurants = async () => {
      const response = await getOwnedRestaurants(token);
      setRestaurants(response.data);
    };

    fetchRestaurants();
  }, [token, navigate]);

  const handleEdit = (restaurant) => {
    setEditingRestaurant(restaurant);
    setIsModalOpen(true);
  };

  const handleSaveRestaurant = (updatedRestaurant) => {
    // Здесь будет API-запрос для сохранения изменений
    updateRestaurant(token, updatedRestaurant)
    setRestaurants((prev) =>
      prev.map((rest) => (rest.id === updatedRestaurant.id ? updatedRestaurant : rest))
    );
  };


  const handleAddresses = (restaurantId) => {
    navigate(`/restaurant/${restaurantId}/addresses`);
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Ваши рестораны</h1>
        <div className="flex space-x-4">
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-600 rounded hover:bg-red-500"
          >
            Выйти
          </button>
        </div>
      </div>
      <RestaurantList
        restaurants={restaurants}
        onEdit={handleEdit}
        onAddresses={handleAddresses}
      />
      <EditModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        data={editingRestaurant}
        onSave={handleSaveRestaurant}
        title="Редактировать ресторан" />

    </div>
  );
};

export default Dashboard;
