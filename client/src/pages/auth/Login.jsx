import { createAlert } from "../../utils/createAlert";
import { useForm } from "react-hook-form";
import FormInput from "../../components/form/FormInput";
import Buttons from "../../components/form/Buttons";
import { useNavigate } from "react-router";
// Validator
import { loginSchema } from "../../utils/validators";
import { zodResolver } from "@hookform/resolvers/zod";
import { actionLogin } from "../../api/auth";
import useAuthStore from "../../store/auth-store";
// rfce
function Login() {
  // Javascript
  // Zustand
  const actionLoginWithZustand = useAuthStore(
    (state) => state.actionLoginWithZustand
  );
  // console.log(test.token)

  const navigate = useNavigate();
  const { register, handleSubmit, formState, reset } = useForm({
    resolver: zodResolver(loginSchema),
  });
  const { isSubmitting, errors } = formState;

  console.log(errors);
  const hdlSubmit = async (value) => {
    const res = await actionLoginWithZustand(value);
    if (res.success) {
      roleRedirect(res.role);
      reset();
      createAlert("success", "Welcome, back");
    } else {
      createAlert("info", "Something Wrong!!!");
    }
  };

  const roleRedirect = (role) => {
    if (role === "ADMIN") {
      navigate("/admin");
    } else {
      navigate("/user");
    }
  };

  return (
    <div className="flex w-full h-full justify-end">
      <div className="w-64 border p-4 rounded-md">
        <h1 className="text-xl font-bold text-center">Login</h1>

        {/* Form */}
        <form onSubmit={handleSubmit(hdlSubmit)}>
          <div className="flex flex-col gap-2 py-4">
            <FormInput register={register} name="email" errors={errors} />

            <FormInput
              register={register}
              name="password"
              errors={errors}
              type="password"
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
