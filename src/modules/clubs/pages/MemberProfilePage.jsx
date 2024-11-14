import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Link, useParams } from 'react-router-dom';
import { axiosInstance } from '../../../utils/axiosInstance';

const schema = z.object({
  name: z.string().nonempty({ message: "Name is required" }),
  phoneNumber: z.string().nonempty({ message: "Phone Number is required" }),
  lineID: z.string().nonempty({ message: "Line ID is required" }),
});

function ProfileForm() {
  const { memberId } = useParams(); // Get memberId from URL params
  const [memberData, setMemberData] = useState({
    name: '',
    phoneNumber: '',
    lineID: '',
    joinedClubs: [],
    profileImage: '', // Optional: You may want to fetch this from the backend if available
  });

  const { register, handleSubmit, setValue, formState: { errors } } = useForm({
    resolver: zodResolver(schema),
    defaultValues: memberData,
  });

  useEffect(() => {
    const fetchMemberData = async () => {
      try {
        const response = await axiosInstance.get(`/clubs/member/${memberId}/clubs`);

        setMemberData({
          name: response.data.name || 'N/A',
          phoneNumber: response.data.phoneNumber || 'N/A',
          lineID: response.data.lineID || 'N/A',
          joinedClubs: response.data.joinedClubs || [],
          profileImage: response.data.profileImage || '', // Optional: profile image URL
        });

        setValue('name', response.data.name || 'N/A');
        setValue('phoneNumber', response.data.phoneNumber || 'N/A');
        setValue('lineID', response.data.lineID || 'N/A');
      } catch (error) {
        console.error("Error fetching member data:", error);
      }
    };

    fetchMemberData();
  }, [memberId, setValue]);

  const onSubmit = async (data) => {
    try {
      const response = await axiosInstance.put(`/clubs/member/${memberId}/lineID`, { lineID: data.lineID });
      console.log('Response:', response.lineID);
      alert('Line ID updated successfully.');
    }catch (error) {
      console.error("Error updating Line ID:", error); 
      alert('Failed to update Line ID.');
    }
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
        <div className="flex flex-col items-center w-full md:w-1/3 space-y-4">
          <div 
            className="w-40 h-40 bg-gray-200 border border-gray-300 rounded-full flex items-center justify-center overflow-hidden"
            style={{ backgroundImage: memberData.profileImage ? `url(${memberData.profileImage})` : 'none', backgroundSize: 'cover' }}
          >
            {!memberData.profileImage && <span className="text-gray-400">No Profile Photo</span>}
          </div>
          <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" id="profileImageInput" />
          <label htmlFor="profileImageInput" className="bg-orange-500 text-white p-2 rounded-md cursor-pointer hover:bg-orange-600 transition-all duration-200">
            Update Profile Pic
          </label>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="flex-1 flex flex-col space-y-4 w-full md:w-2/3">
          <div className="flex flex-col">
            <label className="font-medium">Name</label>
            <input {...register('name')} className={`border p-2 w-full rounded-md shadow-sm ${errors.name ? 'border-red-500' : 'border-gray-300'}`} readOnly />
            {errors.name && <p className="text-red-500">{errors.name.message}</p>}
          </div>
          <div className="flex flex-col">
            <label className="font-medium">Phone Number</label>
            <input {...register('phoneNumber')} className={`border p-2 w-full rounded-md shadow-sm ${errors.phoneNumber ? 'border-red-500' : 'border-gray-300'}`} readOnly />
            {errors.phoneNumber && <p className="text-red-500">{errors.phoneNumber.message}</p>}
          </div>
          <div className="flex flex-col">
            <label className="font-medium">Line ID</label>
            <input {...register('lineID')} className={`border p-2 w-full rounded-md shadow-sm ${errors.lineID ? 'border-red-500' : 'border-gray-300'}`} />
            {errors.lineID && <p className="text-red-500">{errors.lineID.message}</p>}
          </div>
          <div className="flex flex-col">
            <label className="font-medium">Joined Clubs</label>
            <div className="border border-gray-300 p-4 rounded-lg">
              {memberData.joinedClubs && memberData.joinedClubs.length > 0 ? (
                <ul className="space-y-2">
                  {memberData.joinedClubs.map((club, index) => (
                    <li key={index} className="p-2 bg-gray-100 rounded-md">
                      {club.clubName}
                      {club.isAdmin && <span className="ml-2 text-xs text-blue-500">(Admin)</span>}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-500">No joined clubs available.</p>
              )}
            </div>
          </div>
          <div className="text-center">
              <button type="submit" className="bg-blue-500 text-white p-2 rounded mt-4 hover:bg-blue-600 transition-all duration-200">
                Save Changes
              </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ProfileForm;