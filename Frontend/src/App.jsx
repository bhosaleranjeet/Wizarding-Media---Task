import React, { useState } from 'react';
import Popup from './popup';

function App() {
  const [showMenu, setShowMenu] = useState(false);
  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };
  const [showModal, setShowModal] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    date: '',
    time: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/formdata', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        throw new Error('Failed to submit form data');
      }
      console.log('Form data submitted successfully');
      // Reset form fields
      setFormData({
        name: '',
        email: '',
        date: '',
        time: '',
      });
      // Show success popup
      setShowSuccessPopup(true);
      // Close the modal after submission
      setShowModal(false);
    } catch (error) {
      console.error('Error submitting form data:', error);
      // Handle error (e.g., display error message to user)
    }
  };

  const handleCloseSuccessPopup = () => {
    setShowSuccessPopup(false);
  };
  
  return (
    <div className="min-h-screen w-full">
      <div className="flex md:flex-row flex-col justify-between md:px-20 px-5 md:h-[12vh] items-center py-2 shadow-lg flex-wrap">
        <div>
          <img src="logo.png" alt="" className="h-10" />
        </div>
        {/* Hamburger menu toggle button */}
        {/* Navigation menu */}
        <ul className={`md:flex ${showMenu ? 'block' : 'hidden'} md:space-x-10 md:flex-wrap flex flex-wrap space-x-5 items-center justify-center md:pt-0 pt-5`}>
          <li className="hover:cursor-pointer hover:text-yellow-500 text-slate-500">Home</li>
          <li className="hover:cursor-pointer hover:text-yellow-500 text-slate-500">Treatments</li>
          <li className="hover:cursor-pointer hover:text-yellow-500 text-slate-500">Skin & FAQ</li>
          <li className="hover:cursor-pointer hover:text-yellow-500 text-slate-500">Medical Clinic</li>
          <li className="hover:cursor-pointer hover:text-yellow-500 text-slate-500">Photo Gallery</li>
          <li className="hover:cursor-pointer hover:text-yellow-500 text-slate-500">Media</li>
          <li className="hover:cursor-pointer hover:text-yellow-500 text-slate-500">About Us</li>
          <li className="hover:cursor-pointer hover:text-yellow-500 text-slate-500">Contact</li>
        </ul>
        <div className="flex items-center space-x-1 md:py-5 py-2">
          <input type="text" className="border border-black px-2 py-1 rounded-md text-sm" placeholder="Search..." />
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="white" className="w-8 h-8 border p-1 rounded-md bg-slate-900">
            <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
          </svg>
          <button className="md:hidden" onClick={toggleMenu}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-8 h-8 border p-1 rounded-md bg-slate-900 text-white">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
          </svg>
        </button>
        </div>
      </div>
      <div className="flex flex-wrap">
        <div className="md:w-1/2 w-full h-[88vh] flex flex-col justify-center md:pl-20 px-5">
          <div>
            <h1 className="md:text-5xl text-3xl pb-5">BE <span className="text-yellow-500 font-semibold">HAIRFREE</span> WITH OUR<br />PAINFREE LEASERS</h1>
            <h2 className="bg-yellow-500 my-1 w-44 text-white px-5 font-semibold">NO THREADING</h2>
            <h2 className="bg-yellow-500 my-1 w-44 text-white px-5 font-semibold">NO BLEACHING</h2>
            <h2 className="bg-yellow-500 my-1 w-44 text-white px-5 font-semibold">NO WAXING</h2>
          </div>
          <div className="pt-5 space-x-5">
            <button className="bg-slate-900 px-5 py-2 rounded-md text-white font-semibold shadow-lg hover:scale-95 duration-100 hover:bg-slate-800" onClick={() => setShowModal(true)}>Book Appointment</button>
            <a href="login.jsx" className="text-slate-900 font-semibold border-l-2 px-5 py-2 border-slate-900 hover:text-yellow-500 duration-100">Learn More</a>
          </div>
          {showModal && (
            <div className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-50 flex items-center justify-center">
              <div className="bg-white p-8 rounded-md shadow-md md:w-1/3 w-3/4">
                <h2 className="text-lg font-semibold mb-4">Book an Appointment</h2>
                <form onSubmit={handleSubmit}>
                  <div className="mb-4">
                    <label className="block text-sm font-medium mb-1" htmlFor="name">Name</label>
                    <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} className="border border-gray-300 px-3 py-2 rounded-md w-full" required />
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium mb-1" htmlFor="email">Email</label>
                    <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} className="border border-gray-300 px-3 py-2 rounded-md w-full" required />
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium mb-1" htmlFor="date">Select Date</label>
                    <input type="date" id="date" name="date" value={formData.date} onChange={handleChange} className="border border-gray-300 px-3 py-2 rounded-md w-full" required />
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium mb-1" htmlFor="time">Select Time</label>
                    <input type="time" id="time" name="time" value={formData.time} onChange={handleChange} className="border border-gray-300 px-3 py-2 rounded-md w-full" required />
                  </div>
                  {/* Add similar input fields for email, date, time, and message */}
                  <div className="flex space-x-1 justify-between">
                    <button type="submit" className="bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-600 w-1/2 shadow-md">Submit</button>
                    <button type="button" onClick={() => setShowModal(false)} className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400 w-1/2 shadow-md">Cancel</button>
                  </div>
                </form>
              </div>
            </div>
          )}
          {showSuccessPopup && <Popup onClose={handleCloseSuccessPopup} />}
        </div>
        <div className="w-1/2 items-center justify-center px-20 hidden md:flex">
          <img src="bgimg.jpg" alt="" className="w-full shadow-lg border-2 border-white rounded-md" />
        </div>
      </div>
    </div>
  );
}

export default App;
