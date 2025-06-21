import { useEffect, useState } from "react";
import { AdminLayout } from "../../../layouts/admin";
import profile from "../../../assets/profile.jpg";
import { Camera, Save, User, Mail, Phone, AtSign, X, Check, AlertCircle } from "lucide-react";
import { api } from "@/lib/axiosInstance";
import { jwtDecode } from "jwt-decode";


const getToken = (key: string): string | null => {
  try {
    return localStorage.getItem(key);
  } catch (error) {
    console.error("Error accessing localStorage:", error);
    return null;
  }
};


interface JWTPayload {
  email: string;
  exp?: number;
  iat?: number;
}


interface UserData {
  id?: number;
  firstname: string;
  lastname: string;
  username: string;
  email: string;
  phone: string;
  role: string;
}


interface ApiResponse {
  status: string;
  message: string;
  data: {
    id: number;
    firstname: string;
    lastname: string;
    username: string;
    email: string;
    phone: string;
    role: string;
  };
}


interface ErrorState {
  message: string;
  field?: string;
}

const Settings = () => {

  const defaultUser: UserData = {
    firstname: "",
    lastname: "",
    username: "",
    email: "",
    phone: "",
    role: "USER",
  };

  const [user, setUser] = useState<UserData>(defaultUser);
  const [originalUser, setOriginalUser] = useState<UserData>(defaultUser);
  const [isEdited, setIsEdited] = useState(false);
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [successMessage, setSuccessMessage] = useState("");
  const [error, setError] = useState<ErrorState | null>(null);


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    setUser(prev => ({ ...prev, [name]: value }));
    setIsEdited(true);
    setSuccessMessage("");
    setError(null);
    

    if (name === 'email' && value && !isValidEmail(value)) {
      setError({ message: "Please enter a valid email address", field: name });
    }
  };


  const isValidEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };


  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setInitialLoading(true);
        setError(null);
        

        const token = getToken("token");
        
        if (!token) {
          console.warn("No authentication token found");
          setError({ message: "Authentication required. Please log in again." });
          setInitialLoading(false);
          return;
        }


        let decodedToken: JWTPayload;
        try {
          decodedToken = jwtDecode<JWTPayload>(token);
          console.log("Decoded email from token:", decodedToken.email);
          

          if (decodedToken.exp && Date.now() >= decodedToken.exp * 1000) {
            throw new Error("Token has expired");
          }
          
        } catch (jwtError) {
          console.error("Error decoding JWT:", jwtError);
          setError({ message: "Invalid authentication token. Please log in again." });
          setInitialLoading(false);
          return;
        }

        if (!decodedToken.email) {
          console.warn("No email found in JWT token");
          setError({ message: "Invalid token format. Please log in again." });
          setInitialLoading(false);
          return;
        }


        const response = await api.get<ApiResponse>(`api/user?email=${encodeURIComponent(decodedToken.email)}`);
        
        if (response.data.status === 'success') {
          const userData: UserData = {
            id: response.data.data.id,
            firstname: response.data.data.firstname,
            lastname: response.data.data.lastname,
            username: response.data.data.username,
            email: response.data.data.email,
            phone: response.data.data.phone,
            role: response.data.data.role,
          };
          
          setUser(userData);
          setOriginalUser(userData);
          console.log("User data fetched successfully:", userData);
          setError(null);
        } else {
          console.error("Failed to fetch user data:", response);
          throw new Error(response.data.message || "Failed to fetch user data");
        }
        
      } catch (error) {
        console.error("Error fetching user data:", error);
        

        if (error instanceof Error) {
          if (error.message.includes("token") || error.message.includes("authentication")) {
            setError({ message: error.message });
            // Optionally redirect to login page
            // window.location.href = '/login';
          } else {
            setError({ message: error.message });
          }
        } else {
          setError({ message: "Failed to load user data" });
        }
      } finally {
        setInitialLoading(false);
      }
    };

    fetchUserData();
  }, []);

  // Enhanced save handler with proper API integration
  const handleSave = async () => {
    if (!isEdited || loading) return;
    
    // Validate required fields
    if (!user.firstname.trim() || !user.lastname.trim() || !user.email.trim()) {
      setError({ message: "Please fill in all required fields" });
      return;
    }

    if (!isValidEmail(user.email)) {
      setError({ message: "Please enter a valid email address", field: "email" });
      return;
    }

    setLoading(true);
    setError(null);
    
    try {
      // API call to update user data
      const response = await api.put(`api/user/${user.id}`, {
        firstname: user.firstname.trim(),
        lastname: user.lastname.trim(),
        username: user.username.trim(),
        email: user.email.trim(),
        phone: user.phone.trim(),
      });

      if (response.data.status === 'success') {
        setOriginalUser(user);
        setIsEdited(false);
        setSuccessMessage("Profile updated successfully!");
        
        // Update localStorage if needed
        const currentUserData = localStorage.getItem("user");
        if (currentUserData) {
          const parsedData = JSON.parse(currentUserData);
          const updatedData = { ...parsedData, email: user.email };
          localStorage.setItem("user", JSON.stringify(updatedData));
        }
        
        // Clear success message after 3 seconds
        setTimeout(() => {
          setSuccessMessage("");
        }, 3000);
      } else {
        throw new Error(response.data.message || "Failed to update profile");
      }
      
    } catch (error) {
      console.error("Error updating user data:", error);
      setError({ 
        message: error instanceof Error ? error.message : "Failed to update profile" 
      });
    } finally {
      setLoading(false);
    }
  };

  // Cancel changes and revert to original data
  const handleCancel = () => {
    setUser(originalUser);
    setIsEdited(false);
    setError(null);
    setSuccessMessage("");
  };

  // Show loading state during initial data fetch
  if (initialLoading) {
    return (
      <AdminLayout className="p-6 bg-gray-100 min-h-screen">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white shadow-lg rounded-lg p-8">
            <div className="flex items-center justify-center">
              <svg className="animate-spin h-8 w-8 text-blue-600 mr-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <span className="text-gray-600">Loading user data...</span>
            </div>
          </div>
        </div>
      </AdminLayout>
    );
  }

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
                
                <h3 className="text-xl font-semibold mt-4">
                  {user.firstname || user.lastname ? `${user.firstname} ${user.lastname}` : 'User Name'}
                </h3>
                <p className="text-gray-500">@{user.username || 'username'}</p>
                
                <div className="mt-4 bg-blue-50 text-blue-700 px-4 py-2 rounded-full text-sm font-medium inline-flex items-center">
                  <User size={16} className="mr-1" />
                  {user.role}
                </div>
                
                <div className="mt-6 space-y-3 w-full">
                  <div className="flex items-center text-gray-600">
                    <Mail size={16} className="mr-2 flex-shrink-0" />
                    <span className="text-sm truncate">{user.email || 'No email'}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Phone size={16} className="mr-2 flex-shrink-0" />
                    <span className="text-sm">{user.phone || 'No phone'}</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Right Column - Form */}
            <div className="w-full md:w-2/3 p-6">
              <h3 className="text-lg font-medium text-gray-800 mb-4">Edit Profile Information</h3>
              
              {/* Error message */}
              {error && (
                <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-4 mb-4 flex items-center">
                  <AlertCircle size={18} className="mr-2 flex-shrink-0" />
                  <span>{error.message}</span>
                </div>
              )}
              
              {/* Success message */}
              {successMessage && (
                <div className="bg-green-50 border-l-4 border-green-500 text-green-700 p-4 mb-4 flex items-center">
                  <Check size={18} className="mr-2" />
                  {successMessage}
                </div>
              )}
              
              <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="firstname" className="block text-gray-600 text-sm font-medium mb-1">
                      First Name *
                    </label>
                    <input
                      type="text"
                      name="firstname"
                      id="firstname"
                      value={user.firstname}
                      onChange={handleChange}
                      className={`w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-300 focus:border-blue-500 outline-none transition ${
                        error?.field === 'firstname' ? 'border-red-500' : 'border-gray-300'
                      }`}
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="lastname" className="block text-gray-600 text-sm font-medium mb-1">
                      Last Name *
                    </label>
                    <input
                      type="text"
                      name="lastname"
                      id="lastname"
                      value={user.lastname}
                      onChange={handleChange}
                      className={`w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-300 focus:border-blue-500 outline-none transition ${
                        error?.field === 'lastname' ? 'border-red-500' : 'border-gray-300'
                      }`}
                      required
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
                      className={`w-full pl-10 p-2 border rounded-md focus:ring-2 focus:ring-blue-300 focus:border-blue-500 outline-none transition ${
                        error?.field === 'username' ? 'border-red-500' : 'border-gray-300'
                      }`}
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-gray-600 text-sm font-medium mb-1">
                    Email Address *
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
                      className={`w-full pl-10 p-2 border rounded-md focus:ring-2 focus:ring-blue-300 focus:border-blue-500 outline-none transition ${
                        error?.field === 'email' ? 'border-red-500' : 'border-gray-300'
                      }`}
                      required
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
                      className={`w-full pl-10 p-2 border rounded-md focus:ring-2 focus:ring-blue-300 focus:border-blue-500 outline-none transition ${
                        error?.field === 'phone' ? 'border-red-500' : 'border-gray-300'
                      }`}
                    />
                  </div>
                </div>
                
                {/* Action Buttons */}
                <div className="flex justify-end space-x-3 pt-4 mt-6 border-t border-gray-100">
                  {isEdited && (
                    <button
                      type="button"
                      onClick={handleCancel}
                      disabled={loading}
                      className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition flex items-center disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <X size={16} className="mr-1" />
                      Cancel
                    </button>
                  )}
                  
                  <button
                    type="button"
                    onClick={handleSave}
                    disabled={!isEdited || loading || !!error}
                    className={`px-4 py-2 rounded-md flex items-center transition ${
                      isEdited && !error
                        ? "bg-blue-600 text-white hover:bg-blue-700 disabled:bg-blue-400"
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