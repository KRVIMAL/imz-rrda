import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FiHome, FiUsers } from "react-icons/fi";
import ModuleHeader from "../../../components/ui/ModuleHeader";
import DataTable from "../../../components/ui/DataTable/DataTable";
import { Column, Row } from "../../../components/ui/DataTable/types";
import { groupMasterServices } from "./services/groupMaster.services";
import urls from "../../../global/constants/UrlConstants";
import strings from "../../../global/constants/StringConstants";

import toast from "react-hot-toast";

// Add interface for paginated response
interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
}

const GroupMasters: React.FC = () => {
  const navigate = useNavigate();
  const [groupMasters, setGroupMasters] = useState<Row[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalRows, setTotalRows] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const columns: Column[] = [
    { field: "groupId", headerName: "Group ID", width: 120 },
    { field: "groupName", headerName: "Group Name", width: 150 },
    {
      field: "groupType",
      headerName: "Group Type",
      width: 150,
      renderCell: (params) => (
        <span className="px-2 py-1 rounded text-xs font-medium bg-blue-100 text-blue-800">
          {params.value}
        </span>
      ),
    },
    {
      field: "imeiDisplay",
      headerName: "Assets/IMEI",
      width: 200,
      renderCell: (params) => (
        <div className="truncate" title={params.value}>
          {params.value}
        </div>
      ),
    },
    { field: "stateName", headerName: "State Name", width: 130 },
    { field: "cityName", headerName: "City Name", width: 130 },
    {
      field: "remark",
      headerName: "Remark",
      width: 150,
      renderCell: (params) => (
        <div className="truncate" title={params.value}>
          {params.value}
        </div>
      ),
    },
    { field: "contactNo", headerName: "Contact No", width: 130 },
    {
      field: "status",
      headerName: "Status",
      width: 100,
      renderCell: (params) => (
        <span
          className={`px-2 py-1 rounded-full text-xs font-medium ${
            params.value === "active"
              ? "bg-success-100 text-success-800"
              : "bg-gray-100 text-gray-800"
          }`}
        >
          {params.value === "active" ? "Active" : "Inactive"}
        </span>
      ),
    },
    { field: "createdTime", headerName: "Created", width: 120, type: "date" },
    { field: "updatedTime", headerName: "Updated", width: 120, type: "date" },
    {
      field: "inactiveTime",
      headerName: "Inactive Time",
      width: 120,
      type: "date",
    },
  ];

  const breadcrumbs = [
    { label: strings.HOME, href: "/", icon: FiHome },
    { label: strings.GROUP_MASTERS, isActive: true, icon: FiUsers },
  ];

  useEffect(() => {
    loadGroupMasters();
  }, []);

  const loadGroupMasters = async (
    search: string = "",
    page: number = currentPage,
    limit: number = pageSize
  ) => {
    setLoading(true);
    try {
      const result: PaginatedResponse<Row> = search
        ? await groupMasterServices.search(search, page, limit)
        : await groupMasterServices.getAll(page, limit);

      setGroupMasters(result.data);
      setTotalRows(result.total);
      setTotalPages(result.totalPages);
      setCurrentPage(result.page);
    } catch (error: any) {
      console.error("Error loading group masters:", error);
      toast.error(error.message || "Failed to fetch group masters");
    } finally {
      setLoading(false);
    }
  };

  const handleAddGroupMaster = () => {
    navigate(urls.addGroupModuleViewPath);
  };

  // Handle edit click from DataTable
  const handleEditGroupMaster = (id: string | number) => {
    const selectedGroupMaster = groupMasters.find(
      (groupMaster) => groupMaster.id === id
    );
    navigate(`${urls.editGroupModuleViewPath}/${id}`, {
      state: { groupMasterData: selectedGroupMaster },
    });
  };

  const handleDeleteGroupMaster = async (
    id: string | number,
    deletedRow: Row,
    rows: Row[]
  ) => {
    try {
      const result = await groupMasterServices.inactivate(id);
      toast.success(result.message);
      await loadGroupMasters(searchValue, currentPage, pageSize); // Reload current page
    } catch (error: any) {
      console.error("Error inactivating group master:", error);
      toast.error(error.message);
      // Revert the rows on error
      setGroupMasters(rows);
    }
  };

  const handleSearch = (searchText: string) => {
    console.log({ searchText });
    setSearchValue(searchText);
    setCurrentPage(1); // Reset to first page on search
    loadGroupMasters(searchText, 1, pageSize);
  };

  // Pagination handlers
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    loadGroupMasters(searchValue, page, pageSize);
  };

  const handlePageSizeChange = (size: number) => {
    setPageSize(size);
    setCurrentPage(1); // Reset to first page
    loadGroupMasters(searchValue, 1, size);
  };

  return (
    <div className="min-h-screen bg-theme-secondary">
      <ModuleHeader
        title={strings.GROUP_MASTERS}
        breadcrumbs={breadcrumbs}
        showAddButton
        addButtonText={strings.ADD_GROUP_MASTER}
        onAddClick={handleAddGroupMaster}
      />

      <div className="p-6">
        <DataTable
          columns={columns}
          rows={groupMasters}
          loading={loading}
          onSearch={handleSearch}
          onDeleteRow={handleDeleteGroupMaster}
          onEditClick={handleEditGroupMaster}
          pageSize={pageSize}
          pageSizeOptions={[5, 10, 25, 50]}
          // Server-side pagination props
          currentPage={currentPage}
          totalPages={totalPages}
          totalRows={totalRows}
          onPageChange={handlePageChange}
          onPageSizeChange={handlePageSizeChange}
          disableClientSidePagination={true}
          exportConfig={{
            modulePath: urls.groupsViewPath,
            filename: "group-masters",
          }}
        />
      </div>
    </div>
  );
};

export default GroupMasters;
