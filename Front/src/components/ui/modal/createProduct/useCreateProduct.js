"use client";
import { useState } from "react";

export function useCreateProduct(onSubmit, onClose) {
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    description: "",
    category: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "description" && value.length > 100) return; 
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCategoryChange = (value) => {
    setFormData((prev) => ({ ...prev, category: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData({ name: "", price: "", description: "", category: "" });
    onClose();
  };

  return { formData, handleChange, handleCategoryChange, handleSubmit };
}
