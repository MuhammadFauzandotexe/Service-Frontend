import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AttendanceRecordPage from "./assets/page/AttendanceRecordPage";
import AccountManagementPage from "./assets/page/AccountmanagementPage";
import LoginPage from "./assets/page/LoginPage";
import AddUserPage from "./assets/page/AddUserPage";

function App() {
  return (
    <>
      <>
        <Router>
          <Routes>
            <Route path="/*" element={<LoginPage />} />
            <Route path="/attendance" element={<AttendanceRecordPage />} />
            <Route path="/add-user" element={<AddUserPage />} />
            <Route
              path="/account-management"
              element={<AccountManagementPage />}
            />
          </Routes>
        </Router>
      </>
    </>
  );
}

export default App;