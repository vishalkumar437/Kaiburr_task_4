// pages/update.tsx
"use client"
import axios from 'axios';
import { useState } from 'react';

const UpdateServer = ({fetch}:any) => {
    const [formData, setFormData] = useState({
        id:"",
        name: "",
        language: "",
        framework: "",
      });
      const handleChange = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
      ) => {
        setFormData((form) => ({
            ...form,
            [event.target.name]: event.target.value,
          }));
      };
  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    const data = {
        name:formData.name,
        language:formData.language,
        framework:formData.framework
    }
    try {
      const response = await axios.put(`${process.env.NEXT_PUBLIC_API_LINK}/updateServers/${formData.id}`,data);
      fetch();
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white border rounded shadow">
      <h1 className="text-2xl text-center mb-2 ">Update Server</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
      <div>
          <label className="block mb-2 font-bold">ID:*</label>
          <input
            type="text"
            name='id'
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
      <div>
          <label className="block mb-2 font-bold">Name:</label>
          <input
            type="text"
            name="name"
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label className="block mb-2 font-bold">Language:</label>
          <input
            type="text"
            name="language"
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label className="block mb-2 font-bold">Framework:</label>
          <input
            type="text"
            name="framework"
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>
        <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">
          Submit
        </button>
      </form>
    </div>
  );
};

export default UpdateServer;
