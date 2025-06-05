import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FiHome, FiUsers } from "react-icons/fi";
import ModuleHeader from "../../../components/ui/ModuleHeader";
import DataTable from "../../../components/ui/DataTable/DataTable";
import { Column, Row } from "../../../components/ui/DataTable/types";
import { groupModuleServices } from "./services/groupModule.services";
import toast from "react-hot-toast";
import strings from "../../../global/constants/StringConstants";
import urls from "../../../global/constants/UrlConstants";
import { tabTitle } from "../../../utils/tab-title";

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

const GroupModules: React.FC = () => {
  const navigate = useNavigate();
  tabTitle(strings.GROUPS);
  const [groupModules, setGroupModules] = useState<Row[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalRows, setTotalRows] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const columns: Column[] = [
    { field: "groupMasterId", headerName: "Group ID", width: 120 },
    {
      field: "groupType",
      headerName: "Group Type",
      width: 180,
      renderCell: (params) => (
        <span className="px-2 py-1 rounded text-xs font-medium bg-blue-100 text-blue-800">
          {params.value}
        </span>
      ),
    },
    { field: "stateName", headerName: "State Name", width: 150 },
    { field: "cityName", headerName: "City Name", width: 130 },
    {
      field: "remark",
      headerName: "Remark",
      width: 200,
      renderCell: (params) => (
        <div className="truncate" title={params.value}>
          {params.value}
        </div>
      ),
    },
    { field: "contactNo", headerName: "Contact No", width: 150 },
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
    { label: strings.GROUP_MODULES, isActive: true, icon: FiUsers },
  ];

  useEffect(() => {
    loadGroupModules();
  }, []);

  const loadGroupModules = async (
    search: string = "",
    page: number = currentPage,
    limit: number = pageSize
  ) => {
    setLoading(true);
    try {
      const result: PaginatedResponse<Row> = search
        ? await groupModuleServices.search(search, page, limit)
        : await groupModuleServices.getAll(page, limit);

      setGroupModules(result.data);
      setTotalRows(result.total);
      setTotalPages(result.totalPages);
      setCurrentPage(result.page);
    } catch (error: any) {
      console.error("Error loading group modules:", error);
      toast.error(error.message || "Failed to fetch group modules");
    } finally {
      setLoading(false);
    }
  };

  const handleAddGroupModule = () => {
    navigate(urls.addGroupViewPath);
  };

  // Handle edit click from DataTable
  const handleEditGroupModule = (id: string | number) => {
    const selectedGroupModule = groupModules.find(
      (groupModule) => groupModule.id === id
    );
    navigate(`${urls.editGroupViewPath}/${id}`, {
      state: { groupModuleData: selectedGroupModule },
    });
  };

  const handleDeleteGroupModule = async (
    id: string | number,
    deletedRow: Row,
    rows: Row[]
  ) => {
    try {
      const result = await groupModuleServices.inactivate(id);
      toast.success(result.message);
      await loadGroupModules(searchValue, currentPage, pageSize); // Reload current page
    } catch (error: any) {
      console.error("Error inactivating group module:", error);
      toast.error(error.message);
      // Revert the rows on error
      setGroupModules(rows);
    }
  };

  const handleSearch = (searchText: string) => {
    console.log({ searchText });
    setSearchValue(searchText);
    setCurrentPage(1); // Reset to first page on search
    loadGroupModules(searchText, 1, pageSize);
  };

  // Pagination handlers
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    loadGroupModules(searchValue, page, pageSize);
  };

  const handlePageSizeChange = (size: number) => {
    setPageSize(size);
    setCurrentPage(1); // Reset to first page
    loadGroupModules(searchValue, 1, size);
  };

  return (
    <div className="min-h-screen bg-theme-secondary">
      <ModuleHeader
        title={strings.GROUP_MODULES}
        breadcrumbs={breadcrumbs}
        showAddButton
        addButtonText={strings.ADD_GROUP_MODULE}
        onAddClick={handleAddGroupModule}
      />

      <div className="p-6">
        <DataTable
          columns={columns}
          rows={groupModules}
          loading={loading}
          onSearch={handleSearch}
          onDeleteRow={handleDeleteGroupModule}
          onEditClick={handleEditGroupModule}
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
            modulePath: urls.groupModuleViewPath,
            filename: "group-modules",
          }}
        />
      </div>
    </div>
  );
};

export default GroupModules;
