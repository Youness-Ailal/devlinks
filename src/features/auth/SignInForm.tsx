// @ts-ignore
import Button from "@/components/Button";
import Input from "@/components/Input";
import { useForm } from "react-hook-form";
import { LogingCreds, useSignIn } from "./useSignIn";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

function SignInForm() {
  const { signin, status } = useSignIn();
  const isLoading = status === "pending";
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "itsyounessaylal@gmail.com",
      password: "demo1234",
    },
  });

  function onSubmit(values: LogingCreds) {
    signin({ email: values.email, password: values.password });
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
          required: "Email field is required",
          pattern: {
            // eslint-disable-next-line no-useless-escape
            value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g,
            message: "Enter a valid email",
          },
        })}
      />
      <div className="flex flex-col">
        <Input
          disabled={isLoading}
          className="!border-2"
          placeholder="your password"
          direction="y"
          id="password"
          type="password"
          label="Password"
          errorPosition="top-right"
          error={errors?.password?.message.toString()}
          {...register("password", {
            required: "Password field is required",
            minLength: {
              value: 6,
              message: "Must be 6 charachters",
            },
          })}
        />
        <Link
          to="/reset-password"
          className="text-base text-gray-500 mt-1 ml-auto  hover:underline">
          Forgot password?
        </Link>
      </div>
      <Button
        isLoading={isLoading}
        disabled={isLoading}
        className="!text-lg !mt-8">
        Sign in
      </Button>
    </motion.form>
  );
}

export default SignInForm;
