import React, { useState } from "react";
import Input from "../moleculs/Input";
import Navbar from "../layout/Navbar";
import axios from "axios";
import Swal from "sweetalert2";

const AddUserPage = () => {
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    division: "",
    jobTitle: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:8085/api/v1/employee",
        formData
      );
      console.log("Form data:", formData);
      console.log("Response data:", response.data);

      Swal.fire({
        icon: "success",
        title: "User Added",
        text: "User has been added successfully!",
        confirmButtonText: "OK",
      });

      setFormData({
        firstname: "",
        lastname: "",
        email: "",
        division: "",
        jobTitle: "",
      });
    } catch (error) {
      console.error("Error adding user:", error);
      Swal.fire({
        icon: "error",
        title: "Failed to Add User",
        text: "An error occurred while adding the user. Please try again later.",
        confirmButtonText: "OK",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Navbar>
      <form onSubmit={handleSubmit} className="p-4 bg-white rounded shadow-md">
        <Input
          id="firstname"
          name="firstname"
          inputName="First Name"
          placeholder="Masukkan Nama Depan"
          value={formData.firstname}
          onChange={handleChange}
        />
        <Input
          id="lastname"
          name="lastname"
          inputName="Last Name"
          placeholder="Masukkan Nama Belakang"
          value={formData.lastname}
          onChange={handleChange}
        />
        <Input
          id="email"
          name="email"
          inputName="Email"
          placeholder="Masukkan Email"
          value={formData.email}
          onChange={handleChange}
          type="email"
        />
        <Input
          id="division"
          name="division"
          inputName="Division"
          placeholder="Masukkan Divisi"
          value={formData.division}
          onChange={handleChange}
        />
        <Input
          id="jobTitle"
          name="jobTitle"
          inputName="Job Title"
          placeholder="Masukkan Jabatan"
          value={formData.jobTitle}
          onChange={handleChange}
        />
        <button
          type="submit"
          className={`mt-4 bg-blue-500 text-white py-2 px-4 rounded ${
            isLoading ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={isLoading}
        >
          {isLoading ? "Submitting..." : "Submit"}
        </button>
      </form>
    </Navbar>
  );
};

export default AddUserPage;
