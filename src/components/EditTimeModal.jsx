import { useState, useEffect } from "react";

const EditTimeModal = ({ isOpen, onClose, data, onSave, title }) => {
  const [formData, setFormData] = useState([]);

  useEffect(() => {
    setFormData(data || []);
  }, [data]);

  const handleChange = (index, e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === "checkbox" ? checked : value;
    setFormData((prev) =>
      prev.map((item, i) =>
        i === index ? { ...item, [name]: newValue } : item
      )
    );
  };

  const handleSave = () => {
    onSave(formData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">{title}</h2>
        <div className="max-h-96 overflow-y-auto">
          {formData.map((item, index) => (
            <div key={index} className="mb-4">
              <label className="block text-sm font-medium mb-1">
                День недели {item.day_of_the_week}
              </label>
              <div className="flex items-center mb-2">
                <input
                  type="checkbox"
                  name="closed"
                  checked={item.closed}
                  onChange={(e) => handleChange(index, e)}
                  className="mr-2"
                />
                <span>Закрыто</span>
              </div>
              <label className="block text-sm font-medium mb-1">Время начала</label>
              <input
                name="start_time"
                value={item.start_time}
                onChange={(e) => handleChange(index, e)}
                className="w-full border rounded p-2 mb-2"
              />
              <label className="block text-sm font-medium mb-1">Время окончания</label>
              <input
                name="end_time"
                value={item.end_time}
                onChange={(e) => handleChange(index, e)}
                className="w-full border rounded p-2"
              />
            </div>
          ))}
        </div>
        <div className="mt-4 flex justify-end space-x-2">
          <button onClick={onClose} className="px-4 py-2 bg-gray-500 text-white rounded">
            Отмена
          </button>
          <button onClick={handleSave} className="px-4 py-2 bg-blue-500 text-white rounded">
            Сохранить
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditTimeModal;
