import { useEffect } from "react";
import { AdminLayout } from "../../../layouts/admin";
import PaginationButton from "../components/PaginationButton";
import SearchBar from "../components/SearchBar";
import { usePagination } from "../hooks/usePagination";
import { useSearch } from "../hooks/useSearch";
import { ChevronLeft, ChevronRight, Filter } from "lucide-react";
import UserActions from "../components/UserActions";

export interface UserDataProp {
  id: number;
  name: string;
  image: string;
  location: string;
  plotNo: string;
  role: string;
}
const usersData: UserDataProp[] = Array(12)
  .fill(null)
  .map((_, index) => ({
    id: index + 1,
    name: "Kyrie Irving",
    image: "https://i.pravatar.cc/150?img=" + (index + 1),
    location: "Kigali",
    plotNo: "123",
    role: "User",
  }));
const Users = () => {
    const itemsPerPage = 5;
    const { searchQuery, setSearchQuery, filteredItems } = useSearch(usersData, ['name', 'location', 'role']);
    
    // Get filtered items first
    const filteredUsersList = filteredItems();
    
    // Then paginate the filtered items
    const pagination = usePagination(filteredUsersList, itemsPerPage);
    const currentUsers = pagination.getCurrentItems();
    
    // Reset to first page when search query changes
    useEffect(() => {
      pagination.setCurrentPage(1);
    }, [searchQuery]);
    

  return (
    <AdminLayout className="p-4">
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
          <h1 className="text-xl font-semibold text-gray-800">Users</h1>
          <div className="flex items-center gap-4">
            <button className="flex items-center gap-2 px-3 py-2 border border-gray-300 rounded-md hover:bg-gray-50">
              <Filter size={16} />
              <span>Filter</span>
            </button>
            <SearchBar onSearch={setSearchQuery} />
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
                  Location
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Plot No
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
              {currentUsers.length > 0 ? (
                currentUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                          <img
                            className="h-10 w-10 rounded-full object-cover"
                            src={user.image}
                            alt=""
                          />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {user.name}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      #{user.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {user.location}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {user.plotNo}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                        {user.role}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <UserActions userId={user.id} />
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={6}
                    className="px-6 py-4 text-center text-sm text-gray-500"
                  >
                    No users found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
          <div className="text-sm text-gray-500">
            Showing <span className="font-medium">{currentUsers.length}</span>{" "}
            of <span className="font-medium">{filteredItems().length}</span>{" "}
            users
          </div>

          <div className="flex items-center space-x-2">
            <PaginationButton onClick={pagination.prevPage} disabled={pagination.currentPage === 1}>
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
      </div>
    </AdminLayout>
  );
};

export default Users;
