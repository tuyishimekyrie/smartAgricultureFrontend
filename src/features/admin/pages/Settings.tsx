import {  useState } from "react";
import { AdminLayout } from "../../../layouts/admin";
import profile from "../../../assets/profile.jpg";
import { Camera, Save, User, Mail, Phone, AtSign, X, Check } from "lucide-react";

// Define a proper type for user data
interface UserData {
  firstname: string;
  lastname: string;
  username: string;
  email: string;
  phone: string;
  role: string;
}

const Settings = () => {
  // Default user data (Can be replaced with actual user data from an API)
  const defaultUser: UserData = {
    firstname: "Kyrie",
    lastname: "Irving",
    username: "kyrie23",
    email: "kyrie@example.com",
    phone: "123456789",
    role: "User",
  };

  const [user, setUser] = useState<UserData>(defaultUser);
  const [isEdited, setIsEdited] = useState(false);
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, [e.target.name]: e.target.value });
    setIsEdited(true);
    setSuccessMessage("");
  };

  // Handle form submission (e.g., API request)
  const handleSave = () => {
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      console.log("Updated User Data:", user);
      setIsEdited(false);
      setLoading(false);
      setSuccessMessage("Profile updated successfully!");
      
      // Clear success message after 3 seconds
      setTimeout(() => {
        setSuccessMessage("");
      }, 3000);
    }, 800);
  };

  // Cancel changes
  const handleCancel = () => {
    setUser(defaultUser);
    setIsEdited(false);
  };

    return (
    <AdminLayout className="p-6 bg-gray-100 min-h-screen">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Account Settings</h1>
        
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          {/* Header with background */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-400 h-32 flex items-center px-6">
            <h2 className="text-xl font-semibold text-white">My Profile</h2>
          </div>
          
          <div className="flex flex-col md:flex-row">
            {/* Left Column - Profile Picture and Status */}
            <div className="w-full md:w-1/3 p-6 border-b md:border-b-0 md:border-r border-gray-200">
              <div className="flex flex-col items-center">
                <div className="relative group">
                  <img
                    src={profile}
                    alt="Profile"
                    className="w-32 h-32 rounded-full border-4 border-white shadow-md object-cover"
                  />
                  <div className="absolute inset-0 rounded-full bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                    <Camera className="text-white" size={24} />
                  </div>
                </div>
                
                <h3 className="text-xl font-semibold mt-4">{user.firstname} {user.lastname}</h3>
                <p className="text-gray-500">@{user.username}</p>
                
                <div className="mt-4 bg-blue-50 text-blue-700 px-4 py-2 rounded-full text-sm font-medium inline-flex items-center">
                  <User size={16} className="mr-1" />
                  {user.role}
                </div>
                
                <div className="mt-6 space-y-3 w-full">
                  <div className="flex items-center text-gray-600">
                    <Mail size={16} className="mr-2" />
                    <span className="text-sm truncate">{user.email}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Phone size={16} className="mr-2" />
                    <span className="text-sm">{user.phone}</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Right Column - Form */}
            <div className="w-full md:w-2/3 p-6">
              <h3 className="text-lg font-medium text-gray-800 mb-4">Edit Profile Information</h3>
              
              {/* Success message */}
              {successMessage && (
                <div className="bg-green-50 border-l-4 border-green-500 text-green-700 p-4 mb-4 flex items-center">
                  <Check size={18} className="mr-2" />
                  {successMessage}
                </div>
              )}
              
              <form className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="firstname" className="block text-gray-600 text-sm font-medium mb-1">
                      First Name
                    </label>
                    <input
                      type="text"
                      name="firstname"
                      id="firstname"
                      value={user.firstname}
                      onChange={handleChange}
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-300 focus:border-blue-500 outline-none transition"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="lastname" className="block text-gray-600 text-sm font-medium mb-1">
                      Last Name
                    </label>
                    <input
                      type="text"
                      name="lastname"
                      id="lastname"
                      value={user.lastname}
                      onChange={handleChange}
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-300 focus:border-blue-500 outline-none transition"
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="username" className="block text-gray-600 text-sm font-medium mb-1">
                    Username
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <AtSign size={16} className="text-gray-400" />
                    </div>
                    <input
                      type="text"
                      name="username"
                      id="username"
                      value={user.username}
                      onChange={handleChange}
                      className="w-full pl-10 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-300 focus:border-blue-500 outline-none transition"
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-gray-600 text-sm font-medium mb-1">
                    Email Address
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Mail size={16} className="text-gray-400" />
                    </div>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      value={user.email}
                      onChange={handleChange}
                      className="w-full pl-10 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-300 focus:border-blue-500 outline-none transition"
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="phone" className="block text-gray-600 text-sm font-medium mb-1">
                    Phone Number
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Phone size={16} className="text-gray-400" />
                    </div>
                    <input
                      type="tel"
                      name="phone"
                      id="phone"
                      value={user.phone}
                      onChange={handleChange}
                      className="w-full pl-10 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-300 focus:border-blue-500 outline-none transition"
                    />
                  </div>
                </div>
                
                {/* Action Buttons */}
                <div className="flex justify-end space-x-3 pt-4 mt-6 border-t border-gray-100">
                  {isEdited && (
                    <button
                      type="button"
                      onClick={handleCancel}
                      className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition flex items-center"
                    >
                      <X size={16} className="mr-1" />
                      Cancel
                    </button>
                  )}
                  
                  <button
                    type="button"
                    onClick={handleSave}
                    disabled={!isEdited || loading}
                    className={`px-4 py-2 rounded-md flex items-center transition ${
                      isEdited
                        ? "bg-blue-600 text-white hover:bg-blue-700"
                        : "bg-gray-300 text-gray-500 cursor-not-allowed"
                    }`}
                  >
                    {loading ? (
                      <span className="flex items-center">
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Saving...
                      </span>
                    ) : (
                      <>
                        <Save size={16} className="mr-1" />
                        Save Changes
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default Settings;