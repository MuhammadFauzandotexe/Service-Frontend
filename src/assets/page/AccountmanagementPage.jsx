import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../layout/Navbar";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const AccountManagementPage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingUser, setEditingUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8085/api/v1/employee",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("jwt")}`,
              "Content-Type": "application/json",
            },
          }
        );
        setUsers(response.data.data);
        setLoading(false);
      } catch (error) {
        if (error.response && error.response.status === 401) {
          console.log("Unauthorized! Redirecting to login...");
          localStorage.removeItem("jwt");
          navigate("/login");
        } else {
          console.error("Gagal mengambil data:", error);
        }
      }
    };

    fetchUsers();
  }, []);

  const handleRowClickEdit = (rowData) => {
    Swal.fire({
      title: "User Information",
      html: `
        <p><strong>Employee Id:</strong> ${rowData.employeeId}</p>
        <p><strong>Firstname:</strong> ${rowData.firstname}</p>
        <p><strong>Lastname:</strong> ${rowData.lastname}</p>
        <p><strong>Email:</strong> ${rowData.email}</p>
        <p><strong>Division:</strong> ${rowData.division}</p>
        <p><strong>Job Title:</strong> ${rowData.jobTitle}</p>
      `,
      icon: "info",
      confirmButtonText: "Close",
    });
  };

  const handleRowClickRemove = async (rowData) => {
    try {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      });

      if (result.isConfirmed) {
        await axios.delete(
          `http://localhost:8085/api/v1/employee/${rowData.id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("jwt")}`,
              "Content-Type": "application/json",
            },
          }
        );
        setUsers(users.filter((user) => user.id !== rowData.id));
        Swal.fire("Deleted!", "The user has been deleted.", "success");
      }
    } catch (error) {
      Swal.fire("Failed!", "There was an error deleting the user.", "error");
    }
  };

  const handleEditClick = (user) => {
    setEditingUser(user);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditingUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleEditSave = async () => {
    try {
      await axios.put(
        `http://localhost:8085/api/v1/employee/${editingUser.id}`,
        editingUser,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("jwt")}`,
            "Content-Type": "application/json",
          },
        }
      );
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.id === editingUser.id ? editingUser : user
        )
      );
      setEditingUser(null);
      Swal.fire("Success!", "User details have been updated.", "success");
    } catch (error) {
      Swal.fire("Failed!", "There was an error updating the user.", "error");
    }
  };

  const handleEditCancel = () => {
    setEditingUser(null);
  };

  if (loading) {
    return (
      <Navbar pageName="Account Management">
        <div className="text-center py-10">Loading...</div>
      </Navbar>
    );
  }

  if (error) {
    return (
      <Navbar pageName="Account Management">
        <div className="text-center py-10 text-red-500">
          An error occurred: {error.message}
        </div>
      </Navbar>
    );
  }

  return (
    <Navbar pageName="Account Management">
      <div className="relative overflow-x-auto rounded-md">
        {editingUser && (
          <div className="mb-6 p-8 bg-white rounded-md shadow-md">
            <h2 className="text-lg font-semibold mb-4">Edit User</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Firstname
                </label>
                <input
                  type="text"
                  name="firstname"
                  value={editingUser.firstname}
                  onChange={handleEditChange}
                  className="mt-2 block w-full h-12 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-m"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Lastname
                </label>
                <input
                  type="text"
                  name="lastname"
                  value={editingUser.lastname}
                  onChange={handleEditChange}
                  className="mt-1 block w-full h-10 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-m"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={editingUser.email}
                  onChange={handleEditChange}
                  className="mt-1 block w-full h-10 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-m"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Division
                </label>
                <input
                  type="text"
                  name="division"
                  value={editingUser.division}
                  onChange={handleEditChange}
                  className="mt-1 block w-full h-10 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-m"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Job Title
                </label>
                <input
                  type="text"
                  name="jobTitle"
                  value={editingUser.jobTitle}
                  onChange={handleEditChange}
                  className="mt-1 block w-full h-10 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-m"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Employee ID
                </label>
                <input
                  type="text"
                  name="jobTitle"
                  readOnly
                  value={editingUser.employeeId}
                  onChange={handleEditChange}
                  className="mt-1 block w-full h-10 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-m"
                />
              </div>
            </div>
            <div className="mt-4 flex justify-end">
              <button
                type="button"
                className="text-white bg-green-600 hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-green-500 dark:hover:bg-green-600 dark:focus:ring-green-800 mr-2"
                onClick={handleEditSave}
              >
                Save
              </button>
              <button
                type="button"
                className="text-white bg-gray-600 hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-gray-500 dark:hover:bg-gray-600 dark:focus:ring-gray-800"
                onClick={handleEditCancel}
              >
                Cancel
              </button>
            </div>
          </div>
        )}
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-2 py-1">
                Firstname
              </th>
              <th scope="col" className="px-2 py-1">
                Lastname
              </th>
              <th scope="col" className="px-2 py-1">
                Email
              </th>
              <th scope="col" className="px-2 py-1">
                Division
              </th>
              <th scope="col" className="px-2 py-1">
                Job title
              </th>
              <th scope="col" className="px-2 py-1">
                Aksi
              </th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr
                key={user.id}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
                onClick={() => handleRowClickEdit(user)}
              >
                <td className="px-2 py-1">{user.firstname}</td>
                <td className="px-2 py-1">{user.lastname}</td>
                <td className="px-2 py-1">{user.email}</td>
                <td className="px-2 py-1">{user.division}</td>
                <td className="px-2 py-1">{user.jobTitle}</td>
                <td className="px-2 py-1">
                  <button
                    type="button"
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-2 py-1 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 m-1"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleEditClick(user);
                    }}
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-2 py-1 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800 m-1"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRowClickRemove(user);
                    }}
                  >
                    Hapus
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Navbar>
  );
};

export default AccountManagementPage;
