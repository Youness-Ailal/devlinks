// @ts-ignore
import Button from "@/components/Button";
import Input from "@/components/Input";
import { useForm } from "react-hook-form";
import { useForgetPass } from "./useForgetPass";
import { motion } from "framer-motion";
function PasswordRecoverForm() {
  const { sendReset, isLoading } = useForgetPass();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  function onSubmit(values: { email: string }) {
    sendReset(values.email);
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
      <Button
        isLoading={isLoading}
        disabled={isLoading}
        className="!text-lg !mt-8">
        Restore Password
      </Button>
    </motion.form>
  );
}

export default PasswordRecoverForm;
