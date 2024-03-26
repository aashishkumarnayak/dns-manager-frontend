import React, { useState } from 'react';
import axios from 'axios';

const BulkUploadForm = () => {
  const [file, setFile] = useState(null);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append('file', file);

    try {
      const token = localStorage.getItem('token');
      await axios.post('http://localhost:5000/api/dns/bulk-upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `${token}`,
        },
      });

      // Handle successful upload
      console.log('Bulk upload successful');
    } catch (error) {
      // Handle upload error
      console.error('Error uploading file:', error);
    }
  };

  return (
    <div className="flex justify-center mt-8">
      <div className="bg-white rounded-lg p-4 shadow-md">
        <div className="text-center mb-4">
          <p className="text-gray-700">Upload CSV/JSON file for bulk upload</p>
        </div>
        <div className="mb-4">
          <label htmlFor="fileInput" className="block text-center text-blue-500 cursor-pointer">
            Choose File
          </label>
          <input id="fileInput" type="file" className="hidden" onChange={handleFileChange} />
          {file && <p className="text-center text-gray-500 mt-2">{file.name}</p>}
        </div>
        <button
          onClick={handleUpload}
          className={`w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:ring-2 focus:ring-green-500 ${
            !file ? 'cursor-not-allowed opacity-100' : ''
          }`}
          disabled={!file}
        >
          Upload
        </button>
      </div>
    </div>
  );
};

export default BulkUploadForm;
