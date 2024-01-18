// @ts-ignore
import Button from "@/components/Button";
import Input from "@/components/Input";
import { useForm } from "react-hook-form";
import { useSignUp, type SignUpCreds } from "./useSignup";
import { motion } from "framer-motion";

function SignUpForm() {
  const { signUp, status } = useSignUp();
  const isLoading = status === "pending";
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  function onSubmit(values: SignUpCreds) {
    if (!values.email || !values.password) return;
    signUp({ email: values.email, password: values.password });
  }
  return (
    <motion.form
      initial={{ x: -5, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.2 }}
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6">
      <Input
        disabled={isLoading}
        className="!border-2"
        placeholder="email@example.com"
        direction="y"
        id="email"
        label="Email address"
        errorPosition="top-right"
        error={errors?.email?.message.toString()}
        {...register("email", {
          required: "email field is required",
        })}
      />
      <div>
        <Input
          disabled={isLoading}
          className="!border-2"
          placeholder="your password"
          direction="y"
          id="password"
          label="Password"
          type="password"
          errorPosition="top-right"
          error={errors?.password?.message.toString()}
          {...register("password", {
            required: "password field is required",
          })}
        />
        <p className="text-base text-gray-500 mt-1">
          Must be 6 charachters long
        </p>
      </div>
      <Button
        isLoading={isLoading}
        disabled={isLoading}
        className="!text-lg !mt-8">
        Create account
      </Button>
    </motion.form>
  );
}

export default SignUpForm;
