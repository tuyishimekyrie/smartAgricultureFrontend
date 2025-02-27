import { useParams, useNavigate } from "react-router-dom";
import { AdminLayout } from "../../../layouts/admin";
import { UserDataProp } from "./Users";
import { useEffect, useState } from "react";
import { RxArrowLeft } from "react-icons/rx";

const usersData: UserDataProp[] = Array(20)
  .fill(null)
  .map((_, index) => ({
    id: index + 1,
    name: `User ${index + 1}`,
    image: `https://i.pravatar.cc/150?img=${index + 1}`,
    location: "Kigali",
    plotNo: `12${index}`,
    role: "User",
  }));

const User = () => {
  const [filteredUsers, setFilteredUsers] = useState<UserDataProp[]>([]);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      const users = usersData.filter((user) => user.id === parseInt(id));
      setFilteredUsers(users);
    }
  }, [id]);

  return (
    <AdminLayout className="p-6 h-screen  bg-gray-100">
      <div
        className="bg-gray-100 py-4 px-10 flex items-center space-x-2 hover:text-blue-600"
        onClick={() => navigate("/admin/users")}
      >
        <RxArrowLeft />
        <p className="text-slate-500 hover:text-blue-600">Back To Sensors</p>
      </div>
      <div className=" flex justify-center">

      {filteredUsers.length > 0 ? (
        filteredUsers.map((user) => (
          <div
            key={user.id}
            className="bg-white shadow-lg rounded-lg p-6 w-80 text-center flex flex-col items-center"
          >
            <img
              src={user.image}
              alt={user.name}
              className="w-24 h-24 rounded-full border-4 border-blue-500"
            />
            <h2 className="text-xl font-semibold mt-4">{user.name}</h2>
            <p className="text-gray-600">{user.location}</p>
            <p className="text-sm text-gray-500">Plot No: {user.plotNo}</p>
            <span className="mt-2 inline-block bg-blue-500 text-white px-4 py-1 rounded-full text-sm">
              {user.role}
            </span>
          </div>
        ))
      ) : (
        <p className="text-gray-500 text-lg">User not found.</p>
      )}
      </div>
    </AdminLayout>
  );
};

export default User;
