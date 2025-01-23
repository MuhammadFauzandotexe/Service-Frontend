import React, { useState } from "react";
import Navbar from "../layout/Navbar";
import axios from "axios";
import Swal from "sweetalert2";

const ReportGenerator = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isLoading, setIsLoading] = useState(false);

  const handleDateChange = (event) => {
    setSelectedDate(new Date(event.target.value));
  };

  const downloadFile = async (url, filename, loadingText) => {
    setIsLoading(true);
    Swal.fire({
      title: loadingText,
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });
    try {
      const response = await axios.get(url, { responseType: "blob" });
      const blob = new Blob([response.data], {
        type: response.headers["content-type"],
      });
      const href = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = href;
      link.setAttribute("download", filename);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(href); // Revoke URL setelah selesai
      Swal.close();
    } catch (error) {
      console.error("Error generating report:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text:
          "Terjadi kesalahan saat membuat laporan: " +
          (error.response?.data?.message || error.message),
      });
    } finally {
      setIsLoading(false);
    }
  };

  const generateReportEmployee = async () => {
    await downloadFile(
      "http://localhost:8085/api/v1/file/employee",
      "employee_data.txt",
      "Memproses Data Karyawan..."
    );
  };

  const generateReportAttendance = async () => {
    const formattedDate = selectedDate.toISOString().split("T")[0];
    const year = formattedDate.split("-")[0];
    const month = formattedDate.split("-")[1];
    const day = formattedDate.split("-")[2];
    console.log(year);
    console.log(month);
    console.log(day);
    await downloadFile(
      `http://localhost:8085/api/v1/file/attendance?year=${year}&month=${month}&day=${day}`,
      `$attendance{year}${month}${day}.txt`,
      "Memproses Data Kehadiran..."
    );
  };

  return (
    <>
      <Navbar pageName="Generate Daily/Monthly Report" />
      <div
        className="relative overflow-x-auto mr-10 px-10 ml-60"
        style={{ width: "40%", height: "40vh" }}
      >
        <div className="flex flex-col justify-between rounded-md shadow bg-white p-6 mt-4">
          {" "}
          {/* Improved container styling */}
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-gray-800">Laporan Harian</h2>
            <div className="flex items-center">
              <label htmlFor="date" className="mr-2 text-gray-700">
                Tanggal:
              </label>
              <input
                type="date"
                id="date"
                className="border border-gray-300 rounded px-2 py-1"
                value={selectedDate.toISOString().split("T")[0]}
                onChange={handleDateChange}
              />
            </div>
          </div>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50 self-end" // Align button to right
            onClick={generateReportAttendance}
            disabled={!selectedDate}
          >
            Generate Report
          </button>
        </div>
      </div>
      <div
        className="relative overflow-x-auto mr-10 px-10 ml-60"
        style={{ width: "40%", height: "40vh" }}
      >
        <div className="flex flex-col justify-between rounded-md shadow bg-white p-6 mt-4">
          {" "}
          {/* Improved container styling */}
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-gray-800">Data Karyawan</h2>
          </div>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50 self-end" // Align button to right
            onClick={generateReportEmployee}
            disabled={!selectedDate}
          >
            Generate Report
          </button>
        </div>
      </div>
    </>
  );
};

export default ReportGenerator;
