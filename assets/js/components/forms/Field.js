import React, { Component } from 'react' 

const Field = ({ 
  name,
  label,
  value,
  onChange,
  placeholder="",
  type="text",
  error=""
}) => (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <input 
      value={value}
      onChange={onChange}
      className={"form-control" + (error && " is-invalid")}
      type={type}
      placeholder={placeholder || label}
      name={name}
      id={name}
      />
      {error && <p className="invalid-feedback">{error}</p>}
  </div>
);

export default Field;
