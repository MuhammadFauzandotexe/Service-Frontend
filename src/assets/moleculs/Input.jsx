import React from "react";

const Input = (props) => {
  return (
    <>
      <label
        className="text-gray-700      text-sm font-bold"
        htmlFor={props.id}
      >
        {props.inputName}
      </label>
      <input
        className="w-full h-10 px-5 border-gray-300 outline mt-4 rounded"
        id={props.id}
        name={props.name}
        type="text"
        placeholder={props.placeholder}
        value={props.value}
        onChange={props.onChange}
        required
      />
    </>
  );
};

Input.defaultProps = {
  name: "customerName",
  placeholder: "Masukkan Nama Perusahaan",
};

export default Input;
