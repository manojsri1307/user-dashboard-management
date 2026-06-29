import { useEffect, useMemo, useState } from "react";
import {
  getUsers,
  addUser,
  updateUser,
  deleteUser,
} from "./api/userService";
import { formatUsers } from "./utils/helpers";

import SearchBar from "./components/SearchBar";
import Pagination from "./components/Pagination";
import UserTable from "./components/UserTable";
import UserForm from "./components/UserForm";
import './styles/modal.css'


function App() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [search, setSearch] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");

  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  const [isOpen, setIsOpen] = useState(false);
  const [editUser, setEditUser] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);

      const data = await getUsers();

      setUsers(formatUsers(data));

      setError("");
    } catch (err) {
      setError("Unable to fetch users.");
    } finally {
      setLoading(false);
    }
  };

  const filteredUsers = useMemo(() => {
    return users.filter((user) =>
      `${user.firstName} ${user.lastName} ${user.email} ${user.department}`
        .toLowerCase()
        .includes(search.toLowerCase())
    );
  }, [users, search]);

  const processedUsers = useMemo(() => {
    const sorted = [...filteredUsers];

    sorted.sort((a, b) => {
      const nameA = `${a.firstName} ${a.lastName}`;
      const nameB = `${b.firstName} ${b.lastName}`;

      return sortOrder === "asc"
        ? nameA.localeCompare(nameB)
        : nameB.localeCompare(nameA);
    });

    const start = (currentPage - 1) * pageSize;

    return sorted.slice(start, start + pageSize);
  }, [filteredUsers, sortOrder, currentPage, pageSize]);

  const handleSaveUser = async (user) => {
    try {
      if (editUser) {
        await updateUser(editUser.id, user);

        setUsers((prev) =>
          prev.map((u) =>
            u.id === editUser.id
              ? { ...user, id: editUser.id }
              : u
          )
        );
      } else {
        const response = await addUser(user);

        setUsers((prev) => [
          ...prev,
          {
            ...response.data,
            id: prev.length + 1,
          },
        ]);
      }

      setIsOpen(false);
      setEditUser(null);
    } catch (err) {
      alert("Something went wrong!");
    }
  };

  const handleEdit = (user) => {
    setEditUser(user);
    setIsOpen(true);
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this user?"
    );

    if (!confirmDelete) return;

    try {
      await deleteUser(id);

      setUsers((prev) => prev.filter((user) => user.id !== id));
    } catch (err) {
      alert("Delete failed");
    }
  };

  if (loading) {
    return <h2>Loading...</h2>;
  }

  if (error) {
    return <h2>{error}</h2>;
  }

  return (
    <div className="container">
      <h1>User Management Dashboard</h1>

      <button
        onClick={() => {
          setEditUser(null);
          setIsOpen(true);
        }}
        style={{
          marginBottom: "20px",
          padding: "10px 18px",
        }}
         className="add-btn"
      >
        Add User
      </button>

      <SearchBar
        search={search}
        setSearch={setSearch}
      />

      <div style={{ margin: "20px 0" }}>
        <button
          onClick={() =>
            setSortOrder(
              sortOrder === "asc" ? "desc" : "asc"
            )
          }
           className="sort-btn"
        >
          Sort {sortOrder === "asc" ? "▲" : "▼"}
        </button>
      </div>

      <UserTable
        users={processedUsers}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <Pagination
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        pageSize={pageSize}
        setPageSize={setPageSize}
        totalUsers={filteredUsers.length}
      />

      <UserForm
        isOpen={isOpen}
        onClose={() => {
          setIsOpen(false);
          setEditUser(null);
        }}
        onSubmit={handleSaveUser}
        editUser={editUser}
      />
    </div>
  );
}

export default App;