const AddressList = ({ addresses, onEdit }) => (
    <div className="grid grid-cols-1 gap-4">
      {addresses.map((address) => (
        <div key={address.id} className="p-4 bg-white shadow-md rounded">
          <h2 className="text-xl font-bold">{address.comment}</h2>
          <p className="text-sm text-gray-500">
            Координаты: {address.latitude}, {address.longitude}
          </p>
          <div className="mt-2">
            <h3 className="font-bold text-sm mb-2">Рабочие часы:</h3>
            {address.working_hours.map((hours) => (
              <p key={hours.id} className="text-sm">
                {`День ${hours.day_of_the_week}: ${
                  hours.closed ? "Закрыто" : `${hours.start_time} - ${hours.end_time}`
                }`}
              </p>
            ))}
          </div>
          <button
            onClick={() => onEdit(address)}
            className="mt-4 px-4 py-2 bg-yellow-500 text-white rounded"
          >
            ✏️ Редактировать
          </button>
        </div>
      ))}
    </div>
  );
  
  export default AddressList;
  