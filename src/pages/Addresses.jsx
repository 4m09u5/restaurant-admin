import { useState, useEffect } from "react";
import { getRestaurantAddresses } from "../api/Api";
import AddressList from "../components/AddressList";
import EditModal from "../components/EditModal";

const Addresses = ({ token, restaurantId }) => {
  const [addresses, setAddresses] = useState([]);
  const [editingAddress, setEditingAddress] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchAddresses = async () => {
      const response = await getRestaurantAddresses(restaurantId, token);
      setAddresses(response.data);
    };
    fetchAddresses();
  }, [restaurantId, token]);

  const handleEdit = (address) => {
    setEditingAddress(address);
    setIsModalOpen(true);
  };

  const handleSave = (updatedAddress) => {
    // Здесь должен быть запрос для сохранения изменений
    setAddresses((prev) =>
      prev.map((addr) => (addr.id === updatedAddress.id ? updatedAddress : addr))
    );
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Адреса ресторана</h1>
      <AddressList addresses={addresses} onEdit={handleEdit} />
      <EditModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        data={editingAddress}
        onSave={handleSave}
        title="Редактировать адрес"
      />
    </div>
  );
};

export default Addresses;
