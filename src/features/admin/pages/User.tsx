import { useParams, useNavigate } from "react-router-dom";
import { AdminLayout } from "../../../layouts/admin";
import { UserDataProp } from "./Users";
import { useEffect, useState } from "react";
import { ArrowLeft, Mail, MapPin, Phone, Calendar, Home, Shield, Edit, Trash2, MessageSquare } from "lucide-react";
import { api } from "@/lib/axiosInstance";



const User = () => {
  const [user, setUser] = useState<UserDataProp | null>(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const navigate = useNavigate();

  // useEffect(() => {
  //   setLoading(true);
  //   if (id) {
  //     // Simulate API fetch delay
  //     setTimeout(() => {
  //       const foundUser = user?.find((users) => users.id === parseInt(id));
  //       setUser(foundUser || null);
  //       setLoading(false);
  //     }, 300);
  //   }
  // }, [id]);

  useEffect(() => {
    api.get(`/api/user/${id}`)
      .then((response) => {
        console.log(response.data);
        setUser(response.data);
        setLoading(false);
      }
      )
      .catch((error) => {
        console.error("Error fetching user:", error);
        setUser(null);
        setLoading(false);
      }
    );
  })

  if (loading) {
    return (
      <AdminLayout className="p-6 bg-gray-50">
        <div className="flex justify-center items-center h-full">
          <div className="animate-pulse">
            <div className="w-32 h-32 rounded-full bg-gray-200 mb-6 mx-auto"></div>
            <div className="h-6 bg-gray-200 rounded-md w-48 mb-4 mx-auto"></div>
            <div className="h-4 bg-gray-200 rounded-md w-32 mb-4 mx-auto"></div>
            <div className="h-4 bg-gray-200 rounded-md w-24 mx-auto"></div>
          </div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout className="p-6 bg-gray-50">
      {/* Back Navigation */}
      <button
        className="flex items-center gap-2 text-gray-600 hover:text-indigo-600 transition-colors mb-8 group"
        onClick={() => navigate("/admin/users")}
      >
        <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
        <span className="font-medium">Back to Users</span>
      </button>

      {user ? (
        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left column - User Profile Card */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden p-6 flex flex-col items-center lg:sticky lg:top-6 self-start">
           
            
            <h1 className="text-2xl font-bold text-gray-800 mb-1">{user.username}</h1>
            <p className="text-indigo-600 font-medium mb-4">{user.role}</p>
            
            <div className="flex items-center text-gray-500 mb-1">
              <Mail size={16} className="mr-2" />
              <span>user{user.id}@example.com</span>
            </div>
            
            <div className="flex items-center text-gray-500 mb-1">
              <Phone size={16} className="mr-2" />
              <span>+250 78 123 4567</span>
            </div>
            
            <div className="flex items-center text-gray-500">
              <MapPin size={16} className="mr-2" />
              <span>{user.email}</span>
            </div>
            
            <div className="w-full border-t border-gray-100 my-6"></div>
            
            <div className="flex gap-3">
              <button className="flex items-center justify-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 transition-colors rounded-lg text-white font-medium flex-1">
                <MessageSquare size={16} />
                <span>Message</span>
              </button>
              <button className="p-2 rounded-lg border border-gray-200 hover:bg-gray-50 text-gray-600 transition-colors">
                <Edit size={18} />
              </button>
              <button className="p-2 rounded-lg border border-gray-200 hover:bg-gray-50 text-gray-600 transition-colors">
                <Trash2 size={18} />
              </button>
            </div>
          </div>

          {/* Right column - User Details */}
          <div className="lg:col-span-2 space-y-8">
            {/* Property Details */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="p-6 border-b border-gray-100">
                <h2 className="text-xl font-semibold text-gray-800">Property Details</h2>
              </div>
              
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-gray-50 rounded-lg p-4 border border-gray-100">
                    <div className="flex items-start">
                      <div className="bg-indigo-100 rounded-md p-2 mr-4">
                        <Home className="text-indigo-600" size={20} />
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-gray-500">Plot Number</h3>
                        <p className="text-lg font-semibold text-gray-800">{user.status}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 rounded-lg p-4 border border-gray-100">
                    <div className="flex items-start">
                      <div className="bg-indigo-100 rounded-md p-2 mr-4">
                        <MapPin className="text-indigo-600" size={20} />
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-gray-500">Location</h3>
                        <p className="text-lg font-semibold text-gray-800">{user.status}</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6">
                  <div className="bg-gray-50 rounded-lg p-4 border border-gray-100">
                    <h3 className="text-sm font-medium text-gray-500 mb-2">Property Address</h3>
                    <p className="text-gray-800">KN 5 Ave, Kigali, Rwanda</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Account Information */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="p-6 border-b border-gray-100">
                <h2 className="text-xl font-semibold text-gray-800">Account Information</h2>
              </div>
              
              <div className="p-6 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-gray-100">
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Account ID</h3>
                    <p className="text-gray-800 font-mono bg-gray-100 px-2 py-1 rounded inline-block mt-1">#{user.id.toString().padStart(5, '0')}</p>
                  </div>
                  <div className="mt-2 sm:mt-0">
                    <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">Active</span>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="mr-4">
                    <Shield className="text-gray-400" size={20} />
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Access Level</h3>
                    <p className="text-gray-800">{user.role} - Standard permissions</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="mr-4">
                    <Calendar className="text-gray-400" size={20} />
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Member Since</h3>
                    <p className="text-gray-800">October 15, 2023</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Activity */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="p-6 border-b border-gray-100">
                <h2 className="text-xl font-semibold text-gray-800">Recent Activity</h2>
              </div>
              
              <div className="p-6">
                <div className="space-y-6">
                  {[1, 2, 3].map((item) => (
                    <div key={item} className="flex">
                      <div className="mr-4 relative">
                        <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center">
                          <Calendar className="text-indigo-600" size={16} />
                        </div>
                        {item !== 3 && <div className="absolute top-10 left-5 w-0.5 h-16 bg-gray-200"></div>}
                      </div>
                      <div>
                        <div className="text-sm font-medium">{item === 1 ? 'Logged in' : item === 2 ? 'Updated profile' : 'Made a payment'}</div>
                        <div className="text-xs text-gray-500">{item === 1 ? '2 hours ago' : item === 2 ? '1 day ago' : '1 week ago'}</div>
                        <div className="mt-2 text-sm text-gray-600">
                          {item === 1 
                            ? 'User logged in from Kigali, Rwanda' 
                            : item === 2 
                              ? 'Updated contact information and profile picture' 
                              : 'Made a payment of 15,000 RWF for utilities'}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden p-8 text-center max-w-md mx-auto">
          <div className="bg-gray-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
            <Shield className="text-gray-400" size={24} />
          </div>
          <h2 className="text-xl font-bold text-gray-800 mb-2">User Not Found</h2>
          <p className="text-gray-500 mb-6">The user you're looking for doesn't exist or has been removed.</p>
          <button 
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 transition-colors rounded-lg text-white font-medium"
            onClick={() => navigate("/admin/users")}
          >
            Return to Users List
          </button>
        </div>
      )}
    </AdminLayout>
  );
};

export default User;