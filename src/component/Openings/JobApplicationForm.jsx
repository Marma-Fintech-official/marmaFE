import React, { useState } from 'react';
import './Openings.css';
import { X } from 'lucide-react';
import Swal from 'sweetalert2';
import axios from 'axios';

export default function JobApplicationForm(props) {
  const [isOpen, setIsOpen] = useState(false);
  const [file, setFile] = useState(null);
  const [dragActive, setDragActive] = useState(false);


  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile && (droppedFile.type === 'application/pdf' || droppedFile.type === 'application/msword' || droppedFile.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document')) {
      if (droppedFile.size <= 10 * 1024 * 1024) {
        setFile(droppedFile);
      } else {
        alert('File size should not exceed 10MB');
      }
    } else {
      alert('Please upload a PDF or Word document');
    }
  };

  const handleFileInput = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.size <= 10 * 1024 * 1024) {
      setFile(selectedFile);
    } else {
      alert('File size should not exceed 10MB');
    }
  };

  const [formData, setFormData] = useState({
    name: '',
    applyingDesignation: props?.Job,
    email: '',
    experience: '',
    noticeperiod: '',
    currentsalary: '',
    expectedsalary: '',
    Portfoliolink: '',
    resume: '',
    department: props?.jobCategory
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0]; if (selectedFile) {
      setFile(selectedFile);
      setFormData({
        ...formData, resume: selectedFile
      });
    }
  };

  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const data = new FormData();
    data.append('name', formData.name);
    data.append('applyingDesignation', formData.applyingDesignation);
    data.append('email', formData.email);
    data.append('experience', formData.experience);
    data.append('noticeperiod', formData.noticeperiod);
    data.append('currentsalary', formData.currentsalary);
    data.append('expectedsalary', formData.expectedsalary);
    data.append('department', formData?.department);
    if (formData.Portfoliolink) {
      data.append('Portfoliolink', formData.Portfoliolink);
    }
    data.append('resume', formData.resume);

    try {
      const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}apply`, data);

      if (response.status === 200 || response.status === 201) {
        // Success alert
        Swal.fire({
          icon: 'success',
          title: 'Success!',
          text: 'Application submitted successfully!',
          background: '#000', // Black background
          color: '#fff',       // White text
        });

        // Clear the form
        setFormData({
          name: '',
          applyingDesignation: props?.Job,
          email: '',
          experience: '',
          noticeperiod: '',
          currentsalary: '',
          expectedsalary: '',
          Portfoliolink: '',
          resume: '',
          department: "",
        });
        props?.onClose();
      } else {
        throw new Error('Failed to submit application');
      }
    } catch (error) {
      console.error('Error submitting application:', error);

      // Error alert
      Swal.fire({
        icon: 'error',
        title: 'Submission Failed!',
        text: 'Failed to submit application. Please try again later.',
        background: '#000',
        color: '#fff',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    props?.onClose();
  };


  return (
    <div className="">
      <div className="fixed inset-0 bg-black bg-opacity-70 backdrop-blur-sm flex items-center justify-center p-6">
        <div className="apply-section text-white rounded-lg p-6 w-full max-w-lg md:max-w-xl relative">
          <button
            onClick={handleClose}
            className="absolute right-4 top-4 text-white hover:text-white"
          >
            <X />
          </button>
          <h2 className="text-2xl md:text-3xl font-bold mb-6">Apply for Jobs</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div
              className={`relative border border-dashed rounded-lg p-6 transition-colors
                ${dragActive ? 'border-blue-500' : 'border-gray-300'}
                hover:border-blue-500`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              <input
                type="file"
                id="resume"
                className="absolute bg-black inset-0 w-full h-full opacity-0 cursor-pointer"
                accept=".pdf,.doc,.docx"
                onChange={handleFileChange}
              />
              <div className="text-center">
                <div className="text-sm md:text-lg text-gray-600 mb-2">Upload Resume</div>
                {file ? (
                  <div className="text-sm font-medium">{file.name}</div>
                ) : (
                  <div className="text-xs md:text-md text-gray-50">
                    Drag and drop or click to upload (PDF or Word, max 10MB)
                  </div>
                )}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 md:grid-cols-2">
              <div>
                <label htmlFor="name" className="block text-sm md:text-base font-medium text-white">Name*</label>
                <input
                  value={formData.name}
                  name="name"
                  id="name"
                  type="text"
                  required
                  className="mt-1 block w-full pl-3 border py-1 border-gray-400 rounded-md bg-black text-white"
                  placeholder="Enter full name"
                  onChange={handleChange}
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm md:text-base font-medium text-white">Email*</label>
                <input
                  value={formData.email}
                  name="email"
                  id="email"
                  type="email"
                  required
                  className="mt-1 pl-3 block w-full border py-1 border-gray-400 rounded-md bg-black shadow-sm text-white"
                  placeholder="Enter email"
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 md:grid-cols-2">
              <div>
                <label htmlFor="experience" className="block text-sm md:text-base font-medium text-white">Experience*</label>
                <select
                  id="experience"
                  name="experience"
                  value={formData.experience}
                  required
                  className="mt-1 p-1 block w-full py-1 rounded-md border border-gray-400 bg-black text-sm text-white"
                  onChange={handleChange}
                >
                  <option value="">Select Experience</option>
                  <option value="0-2">0-2 years</option>
                  <option value="2-5">2-5 years</option>
                  <option value="5+">5+ years</option>
                </select>
              </div>
              <div>
                <label htmlFor="noticeperiod" className="block text-sm md:text-base font-medium text-white">Notice Period*</label>
                <input
                  value={formData.noticeperiod}
                  name="noticeperiod"
                  id="noticeperiod"
                  type="text"
                  required
                  className="mt-1 pl-2 p-0.5 block w-full  rounded-md border border-gray-400 bg-black text-white"
                  placeholder="Notice Period"
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 md:grid-cols-2">
              <div>
                <label htmlFor="currentsalary" className="block text-sm md:text-base font-medium text-white">Current Salary*</label>
                <input
                  value={formData.currentsalary}
                  name="currentsalary"
                  id="currentsalary"
                  type="text"
                  required
                  placeholder="In LPA"
                  className="mt-1 block pl-3 w-full py-1 rounded-md border border-gray-400 bg-black text-white"
                  onChange={handleChange}
                />
              </div>
              <div>
                <label htmlFor="expectedsalary" className="block text-sm md:text-base font-medium text-white">Expected Salary*</label>
                <input
                  value={formData.expectedsalary}
                  name="expectedsalary"
                  id="expectedsalary"
                  type="text"
                  required
                  placeholder="In LPA"
                  className="mt-1 block pl-3 w-full py-1 rounded-md border border-gray-400 bg-black text-white"
                  onChange={handleChange}
                />
              </div>
            </div>

            <div>
              <label htmlFor="Portfoliolink" className="block text-sm md:text-base font-medium text-white">Portfolio or LinkedIn URL (Optional)</label>
              <input
                value={formData.Portfoliolink}
                name="Portfoliolink"
                type="url"
                className="mt-1 block text-center w-full py-1 rounded-md border border-gray-400 bg-black text-white"
                placeholder="Enter URL"
                onChange={handleChange}
              />
            </div>

            <div className="flex justify-center">
              <button type="submit" className="bg-black text-white  border px-12 py-2 rounded-md" disabled={isLoading}>
                {isLoading ? 'Submitting...' : 'Apply'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
