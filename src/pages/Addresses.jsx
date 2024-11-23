import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getRestaurantAddresses, updateAddress, updateWorkingHours } from "../api/Api";
import AddressList from "../components/AddressList";
import EditModal from "../components/EditModal";
import EditTimeModal from "../components/EditTimeModal";

const Addresses = ({ token }) => {
  const { restaurantId } = useParams()
  const [addresses, setAddresses] = useState([]);
  const [editingAddress, setEditingAddress] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTime, setEditingTime] = useState(null);
  const [isTimeModalOpen, setIsTimeModalOpen] = useState(false);

  useEffect(() => {
    const fetchAddresses = async () => {
      const response = await getRestaurantAddresses(restaurantId, token);
      setAddresses(response.data);
    };
    fetchAddresses();
  }, [restaurantId, token]);

  const handleEdit = (address) => {
    const copy = { ...address }
    delete copy['working_hours']
    setEditingAddress(copy);
    setIsModalOpen(true);
  };

  const handleSave = (updatedAddress) => {
    updateAddress(updatedAddress.id, token, updatedAddress)
    setAddresses((prev) =>
      prev.map((addr) => (addr.id === updatedAddress.id ? { ...addr, ...updatedAddress } : addr))
    );
  };

  const handleTimeEdit = (address) => {
    setEditingAddress(address)
    setEditingTime(address.working_hours);
    setIsTimeModalOpen(true);
  };

  const handleSaveTime = (working_hours) => {
    updateWorkingHours(editingAddress.id, token, working_hours)
    setAddresses((prev) =>
      prev.map((addr) => (addr.id === editingAddress.id ? { ...addr, working_hours } : addr))
    );
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Адреса ресторана</h1>
      <AddressList addresses={addresses} onEdit={handleEdit} onEditTime={handleTimeEdit} />
      <EditTimeModal
        isOpen={isTimeModalOpen}
        onClose={() => setIsTimeModalOpen(false)}
        data={editingTime}
        onSave={handleSaveTime}
        title="Редактировать время работы"
      />
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
