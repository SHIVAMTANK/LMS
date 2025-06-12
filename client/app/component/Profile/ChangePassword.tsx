import { styles } from "@/app/styles/style";
import { useEditPasswordMutation } from "@/redux/features/user/userApi";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

type Props = {};

const ChangePassword: React.FC<Props> = (props) => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [editPassword, { isSuccess, error }] = useEditPasswordMutation();
  const passwordChangeHandler = async (e: any) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      toast.error("Please fill all the fields");
    } else {
      await editPassword({ oldPassword, newPassword });
    }
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success("Password change successfully!");
    }
    if (error) {
      if ("data" in error) {
        const errorData = error as any;
        toast.error(errorData.data.message);
      }
    }
  }, [isSuccess, error]);

  return (
    <div className="w-full pl-7 px-2 md:px-5 md:pl-0">
      <h1 className="block text-[25px] md:text-[30px] font-Poppins text-center font-[500] text-black dark:text-[#fff] pb-2">
        Change Password
      </h1>
      <div className="w-full">
        <form
          onSubmit={passwordChangeHandler}
          className="flex flex-col items-center"
        >
          <div className="w-[100%] md:w-[60%] mt-5">
            <label className="block pb-2  text-black dark:text-[#fff]">
              Enter your old password
            </label>
            <input
              type="password"
              className={`${styles.input} !w-[95%] mb-4 md:mb-0  text-black dark:text-[#fff]`}
              required
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
            />
          </div>
          <div className="w-[100%] md:w-[60%] mt-5">
            <label className="block pb-2  text-black dark:text-[#fff]">
              Enter your New password
            </label>
            <input
              type="password"
              className={`${styles.input} !w-[95%] mb-4 md:mb-0  text-black dark:text-[#fff]`}
              required
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </div>
          <div className="w-[100%] md:w-[60%] mt-5">
            <label className="block pb-2  text-black dark:text-[#fff]">
             Confirm new password
            </label>
            <input
              type="password"
              className={`${styles.input} !w-[95%] mb-4 md:mb-0  text-black dark:text-[#fff]`}
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />

            <input
              type="submit"
              required
              className={`w-[95%] h-[40px] border border-[#37a39a] text-center dark:text-[#fff] text-black rounded-[3px] mt-8 cursor-pointer`}
              value="Update"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChangePassword;
