import { createAlert } from "../../utils/createAlert";
import { useForm } from "react-hook-form";
import FormInput from "../../components/form/FormInput";
import Buttons from "../../components/form/Buttons";
import { useNavigate } from "react-router";
import { loginSchema } from "../../utils/validators";
import { zodResolver } from "@hookform/resolvers/zod";
import { actionLogin } from "../../api/auth";

function Login() {
  const navigate = useNavigate();
  
  const { register, handleSubmit, formState: { isSubmitting, errors } } = useForm({
    resolver: zodResolver(loginSchema)
  });

  const hdlSubmit = async (value) => {
    try {
      // เพิ่ม delay simulation
      await new Promise((resolve) => setTimeout(resolve, 3000));
      
      const res = await actionLogin(value);
      const role = res.data.payload.role;
      roleRedirect(role);
      createAlert("success", "Login Success");
    } catch (error) {
      createAlert("info", error.response?.data?.message);
      console.log(error.response?.data?.message);
    }
  };

  const roleRedirect = (role) => {
    if (role === "ADMIN") {
      navigate('/admin');
    } else {
      navigate('/user');
    }
  };

  return (
    <div className="flex w-full h-full justify-end">
      <div className="w-64 border p-4 rounded-md">
        <h1 className="text-xl font-bold text-center">Login</h1>
        
        <form onSubmit={handleSubmit(hdlSubmit)}>
          <div className="flex flex-col gap-2 py-4">
            <FormInput
              register={register}
              name="email"
              type="email"
              errors={errors}
            />
            <FormInput
              register={register}
              name="password"
              type="password"
              errors={errors}
            />
          </div>

          <div className="flex justify-center">
            <Buttons isSubmitting={isSubmitting} label="Login" />
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
