
"use client";
import { useEffect, useState } from "react";

export function useEditProduct(product, onSubmit, onClose) {

    const [formData, setFormData] = useState({
        name: "",
        price: "",
        description: "",
        category: "",
    });

    useEffect(() => {
        if (product) {
            setFormData({
                name: product.name || "",
                price: product.price || "",
                description: product.description || "",
                category: product.category || "",
            });
        }
    }, [product]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === "description" && value.length > 101) return;

        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!product?.id) return;
        onSubmit(product.id, formData);
        onClose();
    };

    return { formData, handleChange, handleSubmit };
}
