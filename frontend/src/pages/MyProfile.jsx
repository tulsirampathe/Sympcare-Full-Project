import React, { useContext, useState } from 'react'
import { motion } from "framer-motion";
import { AppContext } from '../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import { assets } from '../assets/assets'
import { FaUser, FaPhone, FaMapMarkerAlt, FaVenusMars, FaBirthdayCake, FaSave, FaEdit, FaEnvelope } from 'react-icons/fa'

const MyProfile = () => {
    const [isEdit, setIsEdit] = useState(false)
    const [image, setImage] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const { token, backendUrl, userData, setUserData, loadUserProfileData } = useContext(AppContext)

    // Function to update user profile data using API
    const updateUserProfileData = async () => {
        if (isLoading) {
            toast.info("Please wait, update already in progress...");
            return; // stop another API call
        }

        setIsLoading(true);
        const toastId = toast.loading("Updating your profile...");

        try {
            const formData = new FormData();
            formData.append('name', userData.name)
            formData.append('phone', userData.phone)
            formData.append('address', JSON.stringify(userData.address))
            formData.append('gender', userData.gender)
            formData.append('dob', userData.dob)
            image && formData.append('image', image)

            const { data } = await axios.post(backendUrl + '/api/user/update-profile', formData, { headers: { token } })

            if (data.success) {
                toast.update(toastId, {
                    render: data.message,
                    type: "success",
                    isLoading: false,
                    autoClose: 2000
                });
                await loadUserProfileData()
                setIsEdit(false)
                setImage(false)
            } else {
                toast.update(toastId, {
                    render: data.message,
                    type: "error",
                    isLoading: false,
                    autoClose: 2000
                });
            }
        } catch (error) {
            console.error(error)
            toast.update(toastId, {
                render: error.message || "Something went wrong",
                type: "error",
                isLoading: false,
                autoClose: 2000
            });
        } finally {
            setIsLoading(false);
        }
    }

    const formatDate = (dateString) => {
        if (!dateString) return 'Not set';
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        });
    }

    return userData ? (
        <section className="px-6 py-8 max-w-6xl mx-auto">
            {/* Header Section */}
            <motion.div
                className="text-center mb-12"
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
            >
                <div className="inline-flex items-center mb-4 space-x-3">
                    <div className="w-12 h-1 bg-primary rounded-full"></div>
                    <h3 className="text-lg font-semibold text-primary">My Profile</h3>
                    <div className="w-12 h-1 bg-primary rounded-full"></div>
                </div>
                <h2 className="text-4xl font-bold text-gray-900 mb-4">
                    Personal <span className="text-primary">Information</span>
                </h2>
                <p className="text-gray-600 max-w-2xl mx-auto text-lg">
                    Manage your personal details and contact information
                </p>
            </motion.div>

            {/* Profile Card */}
            <motion.div
                className="bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
            >
                <div className="p-8">
                    {/* Profile Header with Image */}
                    <div className="flex flex-col md:flex-row items-center gap-8 mb-12">
                        <motion.div
                            className="relative"
                            whileHover={{ scale: 1.05 }}
                            transition={{ type: "spring", stiffness: 300 }}
                        >
                            {isEdit ? (
                                <label htmlFor='image' className="cursor-pointer">
                                    <div className='relative group'>
                                        <img 
                                            className='w-32 h-32 rounded-full object-cover border-4 border-primary/20 shadow-lg' 
                                            src={image ? URL.createObjectURL(image) : userData.image} 
                                            alt="Profile" 
                                        />
                                        <div className='absolute inset-0 bg-black/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300'>
                                            <img className='w-8' src={assets.upload_icon} alt="Upload" />
                                        </div>
                                    </div>
                                    <input onChange={(e) => setImage(e.target.files[0])} type="file" id="image" hidden accept="image/*" />
                                </label>
                            ) : (
                                <img 
                                    className='w-32 h-32 rounded-full object-cover border-4 border-primary/20 shadow-lg' 
                                    src={userData.image} 
                                    alt="Profile" 
                                />
                            )}
                        </motion.div>

                        <div className="flex-1 text-center md:text-left">
                            {isEdit ? (
                                <input 
                                    className='bg-gray-50 text-3xl font-bold text-center md:text-left w-full py-2 px-4 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all'
                                    type="text" 
                                    onChange={(e) => setUserData(prev => ({ ...prev, name: e.target.value }))} 
                                    value={userData.name} 
                                />
                            ) : (
                                <h1 className='font-bold text-3xl text-gray-900 mb-2'>{userData.name}</h1>
                            )}
                            <p className="text-gray-500 text-lg">Patient</p>
                        </div>
                    </div>

                    {/* Combined Information Section - Single Row */}
                    <motion.div
                        className="grid grid-cols-1 xl:grid-cols-2 gap-8"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                    >
                        {/* Contact Information */}
                        <div className="space-y-6">
                            <div className="flex items-center gap-3 mb-2">
                                <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                                    <FaEnvelope className="text-blue-600 text-sm" />
                                </div>
                                <h3 className='text-xl font-semibold text-gray-800'>CONTACT INFORMATION</h3>
                            </div>

                            <div className='space-y-4'>
                                {/* Email */}
                                <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl">
                                    <FaEnvelope className="text-gray-400 mt-1 flex-shrink-0" />
                                    <div className="flex-1">
                                        <p className='font-medium text-gray-500 text-sm'>Email Address</p>
                                        <p className='text-blue-600 font-medium'>{userData.email}</p>
                                    </div>
                                </div>

                                {/* Phone */}
                                <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl">
                                    <FaPhone className="text-gray-400 mt-1 flex-shrink-0" />
                                    <div className="flex-1">
                                        <p className='font-medium text-gray-500 text-sm'>Phone Number</p>
                                        {isEdit ? (
                                            <input 
                                                className='bg-white w-full py-2 px-3 rounded-lg border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all'
                                                type="text" 
                                                onChange={(e) => setUserData(prev => ({ ...prev, phone: e.target.value }))} 
                                                value={userData.phone} 
                                            />
                                        ) : (
                                            <p className='text-blue-600 font-medium'>{userData.phone}</p>
                                        )}
                                    </div>
                                </div>

                                {/* Address */}
                                <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl">
                                    <FaMapMarkerAlt className="text-gray-400 mt-1 flex-shrink-0" />
                                    <div className="flex-1">
                                        <p className='font-medium text-gray-500 text-sm'>Address</p>
                                        {isEdit ? (
                                            <div className="space-y-2">
                                                <input 
                                                    className='bg-white w-full py-2 px-3 rounded-lg border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all'
                                                    type="text" 
                                                    placeholder="Address Line 1"
                                                    onChange={(e) => setUserData(prev => ({ ...prev, address: { ...prev.address, line1: e.target.value } }))} 
                                                    value={userData.address.line1} 
                                                />
                                                <input 
                                                    className='bg-white w-full py-2 px-3 rounded-lg border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all'
                                                    type="text" 
                                                    placeholder="Address Line 2"
                                                    onChange={(e) => setUserData(prev => ({ ...prev, address: { ...prev.address, line2: e.target.value } }))} 
                                                    value={userData.address.line2} 
                                                />
                                            </div>
                                        ) : (
                                            <p className='text-gray-700'>
                                                {userData.address.line1} 
                                                {userData.address.line2 && (
                                                    <>
                                                        <br />
                                                        {userData.address.line2}
                                                    </>
                                                )}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Basic Information */}
                        <div className="space-y-6">
                            <div className="flex items-center gap-3 mb-2">
                                <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                                    <FaUser className="text-green-600 text-sm" />
                                </div>
                                <h3 className='text-xl font-semibold text-gray-800'>BASIC INFORMATION</h3>
                            </div>

                            <div className='space-y-4'>
                                {/* Gender */}
                                <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl">
                                    <FaVenusMars className="text-gray-400 mt-1 flex-shrink-0" />
                                    <div className="flex-1">
                                        <p className='font-medium text-gray-500 text-sm'>Gender</p>
                                        {isEdit ? (
                                            <select 
                                                className='bg-white w-full py-2 px-3 rounded-lg border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all'
                                                onChange={(e) => setUserData(prev => ({ ...prev, gender: e.target.value }))} 
                                                value={userData.gender}
                                            >
                                                <option value="Not Selected">Select Gender</option>
                                                <option value="Male">Male</option>
                                                <option value="Female">Female</option>
                                                <option value="Other">Other</option>
                                            </select>
                                        ) : (
                                            <p className='text-gray-700'>{userData.gender}</p>
                                        )}
                                    </div>
                                </div>

                                {/* Date of Birth */}
                                <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl">
                                    <FaBirthdayCake className="text-gray-400 mt-1 flex-shrink-0" />
                                    <div className="flex-1">
                                        <p className='font-medium text-gray-500 text-sm'>Date of Birth</p>
                                        {isEdit ? (
                                            <input 
                                                className='bg-white w-full py-2 px-3 rounded-lg border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all'
                                                type='date' 
                                                onChange={(e) => setUserData(prev => ({ ...prev, dob: e.target.value }))} 
                                                value={userData.dob} 
                                            />
                                        ) : (
                                            <p className='text-gray-700'>{formatDate(userData.dob)}</p>
                                        )}
                                    </div>
                                </div>

                                {/* Additional Space */}
                                <div className="p-4 bg-gray-50/50 rounded-xl border border-dashed border-gray-300">
                                    <p className="text-gray-500 text-sm text-center">
                                        Additional information can be added here
                                    </p>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Action Buttons */}
                    <motion.div 
                        className="flex gap-4 mt-12 pt-8 border-t border-gray-200"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4 }}
                    >
                        {isEdit ? (
                            <>
                                <motion.button 
                                    onClick={updateUserProfileData}
                                    disabled={isLoading}
                                    className={`flex items-center gap-3 px-8 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all 
                                        ${isLoading ? 'bg-gray-400 cursor-not-allowed text-white' : 'bg-primary text-white hover:bg-primary/90'}`}
                                    whileHover={!isLoading ? { scale: 1.05 } : {}}
                                    whileTap={!isLoading ? { scale: 0.95 } : {}}
                                >
                                    <FaSave className="text-sm" />
                                    {isLoading ? 'Saving...' : 'Save Changes'}
                                </motion.button>
                                <motion.button 
                                    onClick={() => {
                                        setIsEdit(false)
                                        setImage(false)
                                        loadUserProfileData()
                                    }}
                                    className="border border-gray-300 text-gray-700 px-8 py-3 rounded-xl font-semibold hover:bg-gray-50 transition-all"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    Cancel
                                </motion.button>
                            </>
                        ) : (
                            <motion.button 
                                onClick={() => setIsEdit(true)}
                                className="flex items-center gap-3 border border-primary text-primary px-8 py-3 rounded-xl font-semibold hover:bg-primary hover:text-white transition-all"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <FaEdit className="text-sm" />
                                Edit Profile
                            </motion.button>
                        )}
                    </motion.div>
                </div>
            </motion.div>
        </section>
    ) : null
}

export default MyProfile
