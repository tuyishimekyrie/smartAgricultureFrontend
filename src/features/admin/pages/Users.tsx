import { useEffect, useState, useCallback, useMemo } from "react";
import { AdminLayout } from "../../../layouts/admin";
import PaginationButton from "../components/PaginationButton";
import SearchBar from "../components/SearchBar";
import { usePagination } from "../hooks/usePagination";
import { useSearch } from "../hooks/useSearch";
import { ChevronLeft, ChevronRight, Filter, Users as UsersIcon, AlertCircle, RefreshCw } from "lucide-react";
import UserActions from "../components/UserActions";
import { api } from "@/lib/axiosInstance";
import { toast, Toaster } from "sonner";

export interface UserDataProp {
  id: number;
  username: string;
  email: string;
  status: string;
  role: string;
}

interface UsersState {
  users: UserDataProp[];
  loading: boolean;
  error: string | null;
}

// Custom hook for users data management
const useUsers = () => {
  const [state, setState] = useState<UsersState>({
    users: [],
    loading: true,
    error: null
  });

  const fetchUsers = useCallback(async () => {
    try {
      setState(prev => ({ ...prev, loading: true, error: null }));
      const response = await api.get("api/user/all");
      setState(prev => ({ 
        ...prev, 
        users: response.data, 
        loading: false 
      }));
      toast.success("Users fetched successfully!");
    } catch (error) {
      console.error("Error fetching users:", error);
      const errorMessage = error instanceof Error ? error.message : "Failed to fetch users";
      setState(prev => ({ 
        ...prev, 
        loading: false, 
        error: errorMessage 
      }));
      toast.error("Failed to fetch users");
    }
  }, []);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  return { ...state, refetch: fetchUsers };
};

// Loading skeleton component
const UserRowSkeleton = ({ index }: { index: number }) => (
  <tr key={`skeleton-${index}`} className="animate-pulse">
    <td className="px-6 py-4 whitespace-nowrap">
      <div className="flex items-center">
        <div className="flex-shrink-0 h-10 w-10 bg-gray-200 rounded-full"></div>
        <div className="ml-4">
          <div className="h-4 bg-gray-200 rounded w-24"></div>
        </div>
      </div>
    </td>
    <td className="px-6 py-4 whitespace-nowrap">
      <div className="h-4 bg-gray-200 rounded w-12"></div>
    </td>
    <td className="px-6 py-4 whitespace-nowrap">
      <div className="h-4 bg-gray-200 rounded w-32"></div>
    </td>
    <td className="px-6 py-4 whitespace-nowrap">
      <div className="h-4 bg-gray-200 rounded w-16"></div>
    </td>
    <td className="px-6 py-4 whitespace-nowrap">
      <div className="h-5 bg-gray-200 rounded-full w-20"></div>
    </td>
    <td className="px-6 py-4 whitespace-nowrap text-right">
      <div className="h-8 bg-gray-200 rounded w-24 ml-auto"></div>
    </td>
  </tr>
);

// Error message component
const ErrorMessage = ({ error, onRetry }: { error: string; onRetry: () => void }) => (
  <tr>
    <td colSpan={6} className="px-6 py-12">
      <div className="flex flex-col items-center justify-center text-center">
        <AlertCircle className="w-12 h-12 text-red-500 mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">Error Loading Users</h3>
        <p className="text-gray-500 mb-4">{error}</p>
        <button
          onClick={onRetry}
          className="inline-flex items-center px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
        >
          <RefreshCw className="w-4 h-4 mr-2" />
          Try Again
        </button>
      </div>
    </td>
  </tr>
);

// Empty state component
const EmptyState = ({ isFiltered }: { isFiltered: boolean }) => (
  <tr>
    <td colSpan={6} className="px-6 py-12">
      <div className="flex flex-col items-center justify-center text-center">
        <UsersIcon className="w-16 h-16 text-gray-300 mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          {isFiltered ? "No users match your search" : "No users found"}
        </h3>
        <p className="text-gray-500">
          {isFiltered 
            ? "Try adjusting your search criteria" 
            : "No users have been registered yet."
          }
        </p>
      </div>
    </td>
  </tr>
);

// Role badge component
const RoleBadge = ({ role }: { role: string }) => {
  const getRoleColor = (role: string) => {
    const normalizedRole = role.toLowerCase();
    switch (normalizedRole) {
      case 'admin':
        return 'bg-red-100 text-red-800';
      case 'user':
        return 'bg-green-100 text-green-800';
      case 'moderator':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getRoleColor(role)}`}>
      {role}
    </span>
  );
};

// User avatar component
const UserAvatar = ({ username }: { username: string }) => {
  const initials = username
    .split(' ')
    .map(name => name.charAt(0))
    .join('')
    .toUpperCase()
    .slice(0, 2);

  return (
    <div className="flex-shrink-0 h-10 w-10 bg-gray-500 rounded-full flex items-center justify-center">
      <span className="text-sm font-medium text-white">{initials}</span>
    </div>
  );
};

// Individual user row component
const UserRow = ({ user }: { user: UserDataProp }) => (
  <tr key={user.id} className="hover:bg-gray-50 transition-colors">
    <td className="px-6 py-4 whitespace-nowrap">
      <div className="flex items-center">
        <UserAvatar username={user.username} />
        <div className="ml-4">
          <div className="text-sm font-medium text-gray-900">
            {user.username}
          </div>
        </div>
      </div>
    </td>
    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
      #{user.id}
    </td>
    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
      {user.email}
    </td>
    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
      {user.status}
    </td>
    <td className="px-6 py-4 whitespace-nowrap">
      <RoleBadge role={user.role} />
    </td>
    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
      <UserActions userId={user.id} />
    </td>
  </tr>
);

// Main Users component
const Users = () => {
  const { users, loading, error, refetch } = useUsers();
  const itemsPerPage = 5;
  
  // Search functionality
  const { searchQuery, setSearchQuery, filteredItems } = useSearch(users, ['username', 'email', 'role']);
  
  // Memoize filtered users to prevent unnecessary recalculations
  const filteredUsersList = useMemo(() => filteredItems(), [filteredItems]);
  
  // Pagination
  const pagination = usePagination(filteredUsersList, itemsPerPage);
  const currentUsers = pagination.getCurrentItems();

  // Reset pagination when search changes
  useEffect(() => {
    pagination.setCurrentPage(1);
  }, [searchQuery, pagination.setCurrentPage,pagination]);

  // Handler for search with debouncing would be better, but keeping simple for now
  const handleSearchChange = useCallback((query: string) => {
    setSearchQuery(query);
  }, [setSearchQuery]);

  const renderTableContent = () => {
    if (loading) {
      return Array.from({ length: itemsPerPage }, (_, index) => (
        <UserRowSkeleton key={index} index={index} />
      ));
    }

    if (error) {
      return <ErrorMessage error={error} onRetry={refetch} />;
    }

    if (currentUsers.length === 0) {
      return <EmptyState isFiltered={searchQuery.length > 0} />;
    }

    return currentUsers.map((user) => (
      <UserRow key={user.id} user={user} />
    ));
  };

  return (
    <AdminLayout className="p-4">
      <Toaster position="top-right" />
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
          <div>
            <h1 className="text-xl font-semibold text-gray-800">Users</h1>
            <p className="text-sm text-gray-500 mt-1">
              Manage user accounts and permissions
            </p>
          </div>
          <div className="flex items-center gap-4">
            <button 
              className="flex items-center gap-2 px-3 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
              onClick={() => {/* TODO: Implement filter functionality */}}
            >
              <Filter size={16} />
              <span>Filter</span>
            </button>
            <button
              onClick={refetch}
              disabled={loading}
              className="flex items-center gap-2 px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors disabled:opacity-50"
              aria-label="Refresh users list"
            >
              <RefreshCw size={16} className={loading ? "animate-spin" : ""} />
              <span>Refresh</span>
            </button>
            <SearchBar onSearch={handleSearchChange} />
          </div>
        </div>

        {/* Stats bar */}
        <div className="px-6 py-3 bg-gray-50 border-b border-gray-200">
          <div className="flex items-center justify-between text-sm text-gray-600">
            <span>
              {loading ? "Loading..." : `${filteredUsersList.length} user${filteredUsersList.length !== 1 ? 's' : ''} found`}
            </span>
            {searchQuery && (
              <span>
                Searching for: <span className="font-medium">"{searchQuery}"</span>
              </span>
            )}
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  User
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Role
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {renderTableContent()}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {!loading && !error && filteredUsersList.length > 0 && (
          <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
            <div className="text-sm text-gray-500">
              Showing <span className="font-medium">{currentUsers.length}</span>{" "}
              of <span className="font-medium">{filteredUsersList.length}</span>{" "}
              users
            </div>

            <div className="flex items-center space-x-2">
              <PaginationButton 
                onClick={pagination.prevPage} 
                disabled={pagination.currentPage === 1}
              >
                <ChevronLeft size={16} />
                <span className="sr-only">Previous</span>
              </PaginationButton>

              <div className="px-4 py-1 text-sm">
                Page <span className="font-medium">{pagination.currentPage}</span> of{" "}
                <span className="font-medium">{pagination.totalPages}</span>
              </div>

              <PaginationButton
                onClick={pagination.nextPage}
                disabled={pagination.currentPage === pagination.totalPages}
              >
                <ChevronRight size={16} />
                <span className="sr-only">Next</span>
              </PaginationButton>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default Users;