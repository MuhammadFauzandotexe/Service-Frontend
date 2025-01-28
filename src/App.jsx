import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AttendanceRecordPage from "./assets/page/AttendanceRecordPage";
import AccountManagementPage from "./assets/page/AccountmanagementPage";
import LoginPage from "./assets/page/LoginPage";
import AddUserPage from "./assets/page/AddUserPage";
import ReportGenerator from "./assets/page/ReportGenerator";
import CustomerNavbar from "./assets/layout/CustomerNavbar";
import CustomerPage from "./assets/page/CustomerPage";
import BillPage from "./assets/page/Billpage";

function App() {
  return (
    <>
      <>
        <Router>
          <Routes>
            <Route path="/*" element={<LoginPage />} />
            <Route path="/attendance" element={<AttendanceRecordPage />} />
            <Route path="/add-user" element={<AddUserPage />} />
            <Route path="/report" element={<ReportGenerator />} />
            <Route
              path="/account-management"
              element={<AccountManagementPage />}
            />
            <Route path="/user" element={<CustomerPage />} />
            <Route path="/bill" element={<BillPage />} />
          </Routes>
        </Router>
      </>
    </>
  );
}

export default App;
