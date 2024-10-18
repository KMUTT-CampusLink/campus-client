import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Link } from 'react-router-dom';

const schema = z.object({
  name: z.string().nonempty({ message: "Name is required" }),
  phoneNumber: z.string().nonempty({ message: "Phone Number is required" }),
  lineID: z.string().nonempty({ message: "Line ID is required" }),
});

function ProfileForm() {
  // Mock data representing the member's information
  const [memberData, setMemberData] = useState({
    name: 'John Doe',
    phoneNumber: '123-456-7890',
    lineID: 'johndoe123',
    joinedClubs: ['Music Club', 'Robotics Club'],
    profileImage: 'https://www.shutterstock.com/image-photo/lion-king-forest-260nw-2482067871.jpg' // Example profile image
  });

  const { register, handleSubmit, setValue, formState: { errors } } = useForm({
    resolver: zodResolver(schema),
    defaultValues: memberData,
  });

  useEffect(() => {
    // Pre-fill the form fields with the member's data
    setValue('name', memberData.name);
    setValue('phoneNumber', memberData.phoneNumber);
    setValue('lineID', memberData.lineID);
  }, [memberData, setValue]);

  const onSubmit = (data) => {
    // Handle the form submission to update profile
    console.log('Updated data:', data);
  };

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setMemberData({ ...memberData, profileImage: URL.createObjectURL(file) });
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6 text-center">User Profile</h1>

      <div className="flex flex-col md:flex-row space-x-0 md:space-x-6 md:space-y-0 space-y-4">
        {/* Profile Photo Upload Section (on top) */}
        <div className="flex flex-col items-center w-full md:w-1/3 space-y-4">
          {/* Profile Picture Placeholder or Uploaded Image */}
          <div 
            className="w-40 h-40 bg-gray-200 border border-gray-300 rounded-full flex items-center justify-center overflow-hidden"
            style={{ backgroundImage: memberData.profileImage ? `url(${memberData.profileImage})` : 'none', backgroundSize: 'cover' }}
          >
            {!memberData.profileImage && <span className="text-gray-400">No Profile Photo</span>}
          </div>

          {/* Upload Button */}
          <input 
            type="file" 
            accept="image/*" 
            onChange={handleImageChange} 
            className="hidden" 
            id="profileImageInput"
          />
          <label 
            htmlFor="profileImageInput" 
            className="bg-orange-500 text-white p-2 rounded-md cursor-pointer hover:bg-orange-600 transition-all duration-200"
          >
            Update Profile Pic
          </label>
        </div>

        {/* Form Section (below the profile picture) */}
        <form onSubmit={handleSubmit(onSubmit)} className="flex-1 flex flex-col space-y-4 w-full md:w-2/3">
          {/* Name Field */}
          <div className="flex flex-col">
            <label className="font-medium">Name</label>
            <input 
              {...register('name')} 
              className={`border p-2 w-full rounded-md shadow-sm ${errors.name ? 'border-red-500' : 'border-gray-300'}`} 
            />
            {errors.name && <p className="text-red-500">{errors.name.message}</p>}
          </div>

          {/* Phone Number Field */}
          <div className="flex flex-col">
            <label className="font-medium">Phone Number</label>
            <input 
              {...register('phoneNumber')} 
              className={`border p-2 w-full rounded-md shadow-sm ${errors.phoneNumber ? 'border-red-500' : 'border-gray-300'}`} 
            />
            {errors.phoneNumber && <p className="text-red-500">{errors.phoneNumber.message}</p>}
          </div>

          {/* Line ID Field */}
          <div className="flex flex-col">
            <label className="font-medium">Line ID</label>
            <input 
              {...register('lineID')} 
              className={`border p-2 w-full rounded-md shadow-sm ${errors.lineID ? 'border-red-500' : 'border-gray-300'}`} 
            />
            {errors.lineID && <p className="text-red-500">{errors.lineID.message}</p>}
          </div>

          {/* Joined Clubs */}
          <div className="flex flex-col">
            <label className="font-medium">Joined Clubs</label>
            <div className="border border-gray-300 p-4 rounded-lg">
              <ul className="space-y-2">
                {memberData.joinedClubs.map((club, index) => (
                  <li key={index} className="p-2 bg-gray-100 rounded-md">{club}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* Submit Button */}
          <div className="text-center">
            <Link to="/clubs" className="inline-block">
              <button type="submit" className="bg-blue-500 text-white p-2 rounded mt-4 hover:bg-blue-600 transition-all duration-200">
                Save Changes
              </button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ProfileForm;

