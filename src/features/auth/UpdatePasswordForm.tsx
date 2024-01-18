// @ts-ignore
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import supabase from "@/services/supabase";
import { useNavigate } from "react-router-dom";
import { useUpdatePassword } from "./useUpdatePassword";
import toast from "react-hot-toast";
import { motion } from "framer-motion";

function UpdatePasswordForm() {
  const { update, status } = useUpdatePassword();
  const isLoading = status === "pending";
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm();

  function onSubmit(values: { password: string; repeatPassword: string }) {
    if (!values?.password) return;
    update(values.password);
  }

  useEffect(() => {
    supabase.auth.onAuthStateChange(async (event, session) => {
      if (!session) {
        navigate("/signin");
        toast.error("Invalid session!");
      }
    });
  }, [navigate]);

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
        placeholder="your new password"
        direction="y"
        type="password"
        id="password"
        label="Password"
        errorPosition="top-right"
        error={errors?.password?.message.toString()}
        {...register("password", {
          required: "Password field is required",
          minLength: {
            value: 6,
            message: "Must be 6 charachters long",
          },
        })}
      />
      <Input
        disabled={isLoading}
        className="!border-2"
        placeholder="repeat your new password"
        direction="y"
        type="password"
        id="repeatPassword"
        label="Repeat Password"
        errorPosition="top-right"
        error={errors?.repeatPassword?.message.toString()}
        {...register("repeatPassword", {
          validate: value =>
            value === getValues().password || "Password must match!",
        })}
      />
      <Button disabled={isLoading} className="!text-lg !mt-8">
        Update Password
      </Button>
    </motion.form>
  );
}

export default UpdatePasswordForm;
