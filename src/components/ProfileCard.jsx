import React, { useEffect, useState } from 'react';
import { Edit3, Save, X, User, Mail, Shield, MapPin, Phone, Calendar, Building, User2Icon } from 'lucide-react';
import { getUserProfileApi, updateUserProfileApi } from '../services/allApis';
import { useDispatch, useSelector } from 'react-redux';
import { updateProfile } from '../redux/slices/authSlice';
import { toast } from 'react-toastify';
import Navbar from './Navbar';

const ProfileCard = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({});
  const token = useSelector((state) => state.auth.token)
  const dispatch = useDispatch()
  const userRole = useSelector(state => state.auth.userRole)

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const header = {
          Authorization: `Bearer ${token}`
        }
        const res = await getUserProfileApi(header)
        setProfile(res.data)
        console.log('Profile Data :', res.data);

      } catch (error) {
        console.error('Failed to fetch profile', error)
      }
    }
    fetchProfile()
  }, [])

  const [editableFields, setEditableFields] = useState({
    name: profile.name,
    profilePic: profile.profilePic,
    bio: profile.bio
  });

  const handleEdit = () => {
    setIsEditing(true);
    setEditableFields({
      name: profile.name,
      profilePic: profile.profilePic,
      bio: profile.bio
    });
  };

  const handleSave = async () => {
    try {
      const header = {
        Authorization: `Bearer ${token}`
      }

      const data = {
        name: editableFields.name,
        bio: editableFields.bio,
        profilePic: editableFields.profilePic
      }

      const res = await updateUserProfileApi(header, data)

      const updatedUser = res.data.user

      toast.success("Profile updated succesfully")
      setProfile(updatedUser);

      dispatch(updateProfile({
        name: updatedUser.name,
        profilePic: updatedUser.profilePic
      }));

      setIsEditing(false);
    } catch (error) {
      toast.error('Profile Updation Failed !!')
      console.error('Failed to update profile:', error)
    }
  };

  const handleCancel = () => {
    setEditableFields({
      name: profile.name,
      profilePic: profilePic,
      bio: profile.bio
    });
    setIsEditing(false);
  };

  const handleFieldChange = (field, value) => {
    setEditableFields(prev => ({
      ...prev,
      [field]: value
    }));
  };

  if (!userRole) return <p>Loading profile...</p>;

  if (!profile) return <p>Loading...</p>

  return (
    <>
     {userRole === 'freelancer' && <Navbar/>}
      <div className="border overflow-hidden">
        {/* Header with gradient background */}
        <div className="h-32 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 relative">
          <div className="absolute inset-0 bg-black bg-opacity-20"></div>
          <div className="absolute top-4 right-4">
            {!isEditing ? (
              <button
                onClick={handleEdit}
                className="bg-white bg-opacity-90 hover:bg-opacity-100 text-gray-700 p-2 rounded-full shadow-lg transition-all duration-200 hover:shadow-xl"
              >
                <Edit3 size={18} />
              </button>
            ) : (
              <div className="flex gap-2">
                <button
                  onClick={handleSave}
                  className="bg-green-500 hover:bg-green-600 text-white p-2 rounded-full shadow-lg transition-all duration-200"
                >
                  <Save size={18} />
                </button>
                <button
                  onClick={handleCancel}
                  className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-full shadow-lg transition-all duration-200"
                >
                  <X size={18} />
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Profile content */}
        <div className="relative px-6 pb-6">
          {/* Profile picture */}
          <div className="flex justify-center -mt-16 mb-4">
            <div className="relative">
              <img
                src={profile.profilePic || "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcdn3.iconfinder.com%2Fdata%2Ficons%2Favatars-9%2F145%2FAvatar_Alien-512.png&f=1&nofb=1&ipt=e6632519e02e16783c71714cba795b84b70a6168ab84bdf385b9bd133aeb4f2a"}
                alt="Pfp"
                className="w-32 h-32 rounded-full border-4 border-white shadow-lg object-cover"
              />
              <div className="absolute bottom-2 right-2 w-6 h-6 bg-green-400 border-2 border-white rounded-full"></div>
            </div>
          </div>

          {/* Basic info - Non-editable */}
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-1">{profile.name}</h1>
            <p className="text-lg text-gray-600 mb-2 flex items-center justify-center gap-2">
              <Shield size={16} />
              {profile.role}
            </p>
            <p className="text-gray-500 flex items-center justify-center gap-2">
              <Mail size={16} />
              {profile.email}
            </p>
          </div>

          {/* Editable details */}
          <div className="space-y-2">
            {/* Name */}
            <div className="flex items-center gap-3">
              <User2Icon size={18} className="text-gray-400 flex-shrink-0" />
              {isEditing ? (
                <input
                  type="text"
                  value={editableFields.name}
                  onChange={(e) => handleFieldChange('name', e.target.value)}
                  className="flex-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder={profile.name}
                />
              ) : (
                <span className="text-gray-700">{profile.name}</span>
              )}
            </div>

            {/* ProfilePic */}
            <div className="flex items-center gap-3">
              <User2Icon size={18} className="text-gray-400 flex-shrink-0" />
              {isEditing ? (
                <input
                  type="text"
                  value={editableFields.profilePic}
                  onChange={(e) => handleFieldChange('profilePic', e.target.value)}
                  className="flex-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter you pfp url link"
                />
              ) : (
                <span className="text-gray-700">{profile.profilePic ? "Profile Picture Link Added" : "No profile picture added yet "}</span>
              )}
            </div>

            {/* Join Date */}
            <div className="flex items-center gap-3">
              <Calendar size={18} className="text-gray-400 flex-shrink-0" />
              <span className="text-gray-700">
                Joined {new Date(profile.createdAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </span>
            </div>
          </div>

          {/* Bio section */}
          <div className="mt-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <User size={18} />
              About
            </h3>
            {isEditing ? (
              <textarea
                value={editableFields.bio}
                onChange={(e) => handleFieldChange('bio', e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                rows="4"
                placeholder="Tell us about yourself..."
              />
            ) : (
              <p className="text-gray-600 leading-relaxed">{profile.bio ? profile.bio : "Bio not added yet"}</p>
            )}
          </div>

          {/* Save/Cancel buttons for mobile */}
          {isEditing && (
            <div className="flex gap-3 mt-6 sm:hidden">
              <button
                onClick={handleSave}
                className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg font-medium transition-colors duration-200"
              >
                Save Changes
              </button>
              <button
                onClick={handleCancel}
                className="flex-1 bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded-lg font-medium transition-colors duration-200"
              >
                Cancel
              </button>
            </div>
          )}
        </div>
      </div>
    </>

  );
};

export default ProfileCard;