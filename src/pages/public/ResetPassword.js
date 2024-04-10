import React, { useState } from "react";
import { Button } from "../../components";
import { useParams } from "react-router-dom";
import { apiResetPassword } from "../../apis";
import { toast } from "react-toastify";
const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const handleResetPassword = async () => {
    const response = await apiResetPassword({ password, token });
    console.log(response);
    if (response.success) {
      toast.success(response.mes, { theme: "colored" });
    } else {
      toast.info(response.mes, { theme: "colored", hideProgressBar: true });
    }
  };
  const { token } = useParams();
  console.log(token);
  return (
    <div className="absolute animate-slide-right top-0 left-0 bottom-0 right-0 bg-white flex items-center flex-col py-8 z-50 ">
      <div className="text-[35px] font-semibold">
        <h3>FORGOT YOUR PASSWORD</h3>
      </div>
      <div className="flex flex-col gap-4 mt-28">
        <label htmlFor="password">Enter your password</label>
        <input
          type="password"
          id="password"
          placeholder="Please enter your new password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-[800px] pb-2  border-b outline-none placeholder:text-sm"
        />
        <div className="flex items-center justify-end mt-4 w-full gap-4">
          <Button name="Submit" handleOnclick={handleResetPassword} />
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
