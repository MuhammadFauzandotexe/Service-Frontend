import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../layout/Navbar";
import Swal from "sweetalert2";

const AttendanceRecordPage = () => {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAttendanceRecords = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8085/api/v1/attendance"
        );
        setRecords(response.data.data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchAttendanceRecords();
  }, []);

  const handleRowClickEdit = (rowData) => {
    console.log("Edit:", rowData);
  };

  const handleRowClickRemove = (rowData) => {
    console.log("Remove:", rowData);
  };

  const formatLateTime = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours} hours ${mins} minutes`;
  };

  if (loading) {
    return (
      <Navbar pageName="Attendance">
        <div className="text-center py-10">Loading...</div>
      </Navbar>
    );
  }

  if (error) {
    return (
      <Navbar pageName="Attendance">
        <div className="text-center py-10 text-red-500">
          An error occurred: {error.message}
        </div>
      </Navbar>
    );
  }

  return (
    <Navbar pageName="Attendance">
      <div className="relative overflow-x-auto rounded-md">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-2 py-1">
                Nama
              </th>
              <th scope="col" className="px-2 py-1">
                Jabatan
              </th>
              <th scope="col" className="px-2 py-1">
                Status
              </th>
              <th scope="col" className="px-2 py-1">
                Waktu Masuk
              </th>
              <th scope="col" className="px-2 py-1">
                Waktu Keluar
              </th>
              <th scope="col" className="px-2 py-1">
                Keterlambatan
              </th>
              <th scope="col" className="px-2 py-1">
                Aksi
              </th>
            </tr>
          </thead>
          <tbody>
            {records.map((record) => (
              <tr
                key={record.id}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
              >
                <th
                  scope="row"
                  className="px-2 py-1 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {record.employee.firstname} {record.employee.lastname}
                </th>
                <td className="px-2 py-1">{record.employee.jobTitle}</td>
                <td
                  className={`px-2 py-1 ${
                    record.attendanceStatus === "LATE"
                      ? "text-red-500"
                      : "text-green-500"
                  }`}
                >
                  {record.attendanceStatus}
                </td>
                <td className="px-2 py-1">
                  {new Date(record.timeTakeAttendance).toLocaleString()}
                </td>
                <td className="px-2 py-1">
                  {record.exitTime
                    ? new Date(record.exitTime).toLocaleString()
                    : "N/A"}
                </td>
                <td className="px-2 py-1">{formatLateTime(record.lateTime)}</td>
                <td className="px-2 py-1">
                  <button
                    type="button"
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-2 py-1 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 m-1"
                    onClick={() => handleRowClickEdit(record)}
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-2 py-1 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800 m-1"
                    onClick={() => handleRowClickRemove(record)}
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

export default AttendanceRecordPage;
