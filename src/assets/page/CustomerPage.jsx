import { useEffect, useState } from "react";
import axios from "axios";
import CustomerNavbar from "../layout/CustomerNavbar";

const CustomerPage = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserInfo = async () => {
      const token = localStorage.getItem("jwt");
      if (!token) {
        setError("User not authenticated");
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(
          "http://localhost:8085/api/v1/user-info",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setUserInfo(response.data);
      } catch (err) {
        setError("Failed to fetch user info");
        if (error.response && error.response.status === 401) {
          console.log("Unauthorized! Redirecting to login...");
          localStorage.removeItem("jwt");
          navigate("/login");
        } else {
          console.error("Gagal mengambil data:", error);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchUserInfo();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div>
      <CustomerNavbar pageName="Profile" />
      <div className="max-w-lg mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
        <h2 className="text-2xl font-semibold mb-4">User Profile</h2>
        {userInfo && (
          <div>
            <p>
              <strong>Username:</strong> {userInfo.username}
            </p>
            <p>
              <strong>Email:</strong> {userInfo.email}
            </p>
            <p>
              <strong>Address:</strong> {userInfo.address}
            </p>
            <p>
              <strong>Water Grid Status:</strong>{" "}
              {userInfo.statusWaterGrid ? "Active" : "Inactive"}
            </p>
            <p>
              <strong>Total Current Usage:</strong> {userInfo.totalCurrentUsage}{" "}
              liters
            </p>
            <p>
              <strong>Usage This Month:</strong>{" "}
              {userInfo.currentUsageThisMonth} liters
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomerPage;
