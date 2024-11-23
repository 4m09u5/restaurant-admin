import { useState, useEffect } from "react";

const EditModal = ({ isOpen, onClose, data, onSave, title }) => {
  const [formData, setFormData] = useState({});

  useEffect(() => {
    setFormData(data || {});
  }, [data]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
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
        {Object.keys(formData).map((key) => (
          <div key={key} className="mb-4">
            <label className="block text-sm font-medium mb-1 capitalize">
              {key.replace("_", " ")}
            </label>
            <input
              name={key}
              value={formData[key] || ""}
              onChange={handleChange}
              className="w-full border rounded p-2"
            />
          </div>
        ))}
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

export default EditModal;
