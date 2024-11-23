const RestaurantList = ({ restaurants, onEdit, onAddresses }) => (
    <div className="grid grid-cols-1 gap-4">
      {restaurants.map((restaurant) => (
        <div key={restaurant.id} className="p-4 bg-white shadow-md rounded">
          <h2 className="text-xl font-bold">{restaurant.name}</h2>
          <p className="text-sm text-gray-500">{restaurant.description}</p>
          <div className="mt-4 flex space-x-2">
            <button
              onClick={() => onEdit(restaurant)}
              className="px-4 py-2 bg-yellow-500 text-white rounded"
            >
              ✏️ Редактировать
            </button>
            <button
              onClick={() => onAddresses(restaurant.id)}
              className="px-4 py-2 bg-blue-500 text-white rounded"
            >
              📍 Адреса
            </button>
          </div>
        </div>
      ))}
    </div>
  );
  
  export default RestaurantList;
  