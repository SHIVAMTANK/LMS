import React, { useEffect, useState } from "react";
import { Camera } from "lucide-react";
import Image from "next/image";
import {
  useEditProfileMutation,
  useUpdateAvatarMutation,
} from "@/redux/features/user/userApi";
import { useLoadUserQuery } from "@/redux/features/auth/authApi";
import toast from "react-hot-toast";
import Email from "next-auth/providers/email";

type Props = {
  avatar: string | null;
  user: any;
};

const ProfileInfo: React.FC<Props> = ({ user, avatar }) => {
  const [name, setName] = useState(user && user.name);

  const [updateAvatar, { isSuccess, error }] = useUpdateAvatarMutation();

  const [loadUser, setLoadUser] = useState(false);

  const {} = useLoadUserQuery(undefined, {
    skip: loadUser ? false : true,
  });

  const [editProfile, { isSuccess: success, error: updateError }] =
    useEditProfileMutation();

  const imageHandler = async (e: any) => {
    const file = e.target.files[0];

    const fileReader = new FileReader();

    fileReader.onload = () => {
      if (fileReader.readyState == 2) {
        const avatar = fileReader.result;
        updateAvatar({
          avatar,
        });
      }
    };
    fileReader.readAsDataURL(e.target.files[0]);
  };

  useEffect(() => {
    if (isSuccess || success) {
      setLoadUser(true);
    }
    if (error || updateError) {
      console.log(error);
    }

    if (success) {
      toast.success("Profile updated successfully!");
    }
  }, [isSuccess, error, success, updateError]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (name !== "") {
      await editProfile({
        name: name,
      });
    }
  };

  return (
    <div className="w-full space-y-8">
      {/* Avatar Section */}
      <div className="flex justify-center">
        <div className="relative group">
          <div className="w-32 h-32 rounded-full border-4 border-primary/20 overflow-hidden bg-muted shadow-lg">
            {user?.avatar?.url || avatar ? (
              <Image
                src={user?.avatar?.url || avatar}
                alt="Profile Avatar"
                className="w-full h-full object-cover"
                width={128}
                height={128}
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-primary/20 to-primary/40 flex items-center justify-center">
                <span className="text-3xl font-bold text-primary">
                  {user?.name?.charAt(0)?.toUpperCase() || "U"}
                </span>
              </div>
            )}
          </div>

          <input
            type="file"
            id="avatar"
            className="hidden"
            onChange={imageHandler}
            accept="image/png,image/jpg,image/jpeg,image/webp"
          />

          <label htmlFor="avatar">
            <div className="absolute bottom-2 right-2 w-10 h-10 bg-primary hover:bg-primary/90 rounded-full flex items-center justify-center cursor-pointer shadow-lg transition-all duration-200 hover:scale-105">
              <Camera size={20} className="text-primary-foreground" />
            </div>
          </label>
        </div>
      </div>

      {/* Form Section */}
      <div className="w-full max-w-2xl mx-auto">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Full Name Field */}
            <div className="space-y-2">
              <label
                htmlFor="fullName"
                className="text-sm font-medium text-foreground"
              >
                Full Name
              </label>
              <input
                id="fullName"
                type="text"
                className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                required
                value={name || ""}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your full name"
              />
            </div>

            {/* Email Field */}
            <div className="space-y-2">
              <label
                htmlFor="email"
                className="text-sm font-medium text-foreground"
              >
                Email Address
              </label>
              <input
                id="email"
                type="email"
                readOnly
                className="w-full px-4 py-3 bg-muted border border-border rounded-lg text-muted-foreground cursor-not-allowed"
                value={user?.email || ""}
                placeholder="your.email@example.com"
              />
              <p className="text-xs text-muted-foreground">
                Email cannot be changed
              </p>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-center pt-4">
            <button
              type="submit"
              className="w-full md:w-auto px-8 py-3 bg-primary hover:bg-primary/90 text-primary-foreground font-medium rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:ring-offset-2 shadow-lg hover:shadow-xl transform hover:scale-[1.02]"
            >
              Update Profile
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfileInfo;
