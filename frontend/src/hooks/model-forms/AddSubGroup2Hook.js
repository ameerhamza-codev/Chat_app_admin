import { useState } from "react";
import { addSubGroup2 } from "../../api/groupsApi";

const useSubGroup2Form = () => {
  const [formData, setFormData] = useState({
    mainGroupCode: "",
    subGroup1Code: "",
    name: "",
    code: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async () => {
    try {
      console.log("Form Data Submitted:", formData); // Debug log
      if (!formData.mainGroupCode || !formData.subGroup1Code || !formData.name || !formData.code) {
        alert("All fields are required!"); // Validation check
        return;
      }
      const response = await addSubGroup2(formData);
      console.log("Sub Group 2 added successfully:", response);
      alert("Sub Group 2 added successfully!");
    } catch (error) {
      console.error("Form submission failed", error.response?.data || error.message);
    }
  };

  return {
    formData,
    setFormData,
    handleChange,
    handleSubmit,
  };
};

export default useSubGroup2Form;
