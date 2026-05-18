import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";

const Navbar = () => {

  const navigate = useNavigate();

  const { logout } = useAuthStore();

  const handleLogout = () => {

    logout();

    navigate("/login");

  };

  return (
    <div className="bg-black text-white shadow px-6 py-4 flex justify-between items-center">

      <h1 className="text-2xl font-bold">
        Smart Leads Dashboard
      </h1>

      <button
        onClick={handleLogout}
        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
      >
        Logout
      </button>

    </div>
  );
};

export default Navbar;