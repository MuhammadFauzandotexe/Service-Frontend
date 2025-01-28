import { useEffect, useState } from "react";
import axios from "axios";
import CustomerNavbar from "../layout/CustomerNavbar";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const BillPage = () => {
  const [bills, setBills] = useState([]);
  const jwt = localStorage.getItem("jwt");
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:8085/api/v1/user-info/bills", {
        headers: { Authorization: `Bearer ${jwt}` },
      })
      .then((response) => setBills(response.data))
      .catch((error) => {
        if (error.response && error.response.status === 401) {
          console.log("Unauthorized! Redirecting to login...");
          localStorage.removeItem("jwt");
          navigate("/login");
        } else {
          console.error("Gagal mengambil data:", error);
        }
      });
  }, [jwt]);

  const handlePayment = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to proceed with the payment?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, pay now!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .get(`http://localhost:8085/api/v1/user-info/initalize/${id}`, {
            headers: { Authorization: `Bearer ${jwt}` },
          })
          .then((response) => {
            console.log("API Response:", response.data);
            window.location.href = response.data.redirect_url;
            Swal.fire("Success", "Payment initialized successfully", "success");
          })
          .catch((error) => {
            console.error("Error initializing payment:", error);
            Swal.fire("Error", "Failed to initialize payment", "error");
          });
      }
    });
  };

  return (
    <CustomerNavbar pageName="Bill">
      <div className="relative overflow-x-auto rounded-md">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-2 py-1">
                No
              </th>
              <th scope="col" className="px-2 py-1">
                Year-Month
              </th>
              <th scope="col" className="px-2 py-1">
                Status
              </th>
              <th scope="col" className="px-2 py-1">
                Amount
              </th>
              <th scope="col" className="px-2 py-1">
                Description
              </th>
              <th scope="col" className="px-2 py-1">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {bills.map((bill, index) => (
              <tr
                key={bill.id}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
              >
                <td className="px-2 py-1">{index + 1}</td>
                <td className="px-2 py-1">
                  {bill.year}-{bill.month}
                </td>
                <td className="px-2 py-1">{bill.status}</td>
                <td className="px-2 py-1">{bill.amount}</td>
                <td className="px-2 py-1">{bill.description}</td>
                <td className="px-2 py-1">
                  <button
                    onClick={() => handlePayment(bill.id)}
                    className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-700"
                  >
                    Pay
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </CustomerNavbar>
  );
};

export default BillPage;
