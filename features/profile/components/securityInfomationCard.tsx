import { Button } from "@/components/ui/button";
import {
  useForgotPassword,
  useGetCurrentUser,
} from "@/features/auth/pages/hooks/useAuth";
import { forgotPasswordSchema } from "@/types/auth/forgotPassword";
import { useFormik } from "formik";
import { useEffect, useState } from "react";

const TIMER_KEY = "reset_password_cooldown_expiry";
const COOLDOWN_DURATION = 60;

const SecurityInformationCard = () => {
  const { data: currentUser } = useGetCurrentUser();
  const { mutateAsync: handleForgotPassword, isPending: isEmailSending } =
    useForgotPassword();

  const [cooldown, setCooldown] = useState<number>(0);

  useEffect(() => {
    const savedExpiry = localStorage.getItem(TIMER_KEY);
    if (savedExpiry) {
      const remainingTime = Math.ceil(
        (parseInt(savedExpiry, 10) - Date.now()) / 1000,
      );
      if (remainingTime > 0) {
        setCooldown(remainingTime);
      } else {
        localStorage.removeItem(TIMER_KEY);
      }
    }
  }, []);

  useEffect(() => {
    if (cooldown <= 0) return;

    const timer = setInterval(() => {
      setCooldown((prev) => {
        if (prev <= 1) {
          localStorage.removeItem(TIMER_KEY);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [cooldown]);

  // 3. بدء الـ Cooldown وحفظ وقت الانتهاء المستقبلي
  const startCooldown = () => {
    const expiryTime = Date.now() + COOLDOWN_DURATION * 1000;
    localStorage.setItem(TIMER_KEY, expiryTime.toString());
    setCooldown(COOLDOWN_DURATION);
  };

  type ForgotPasswordValues = {
    email: string;
  };

  const { handleSubmit } = useFormik<ForgotPasswordValues>({
    enableReinitialize: true,
    initialValues: {
      email: String(currentUser?.email || ""),
    },
    validationSchema: forgotPasswordSchema,
    onSubmit: async (values) => {
      await handleForgotPassword(values);
      startCooldown();
    },
  });

  return (
    <form onSubmit={handleSubmit}>
      <div className="border-primary mt-6 flex h-fit w-full flex-col rounded-3xl border bg-[#1a1a1a]/20 px-6 py-6 md:mt-10 md:flex-row md:items-center md:justify-between md:px-8 md:py-10">
        <div className="flex flex-col gap-1 md:gap-2">
          <div className="text-primary text-base md:text-xl">
            Reset Password
          </div>
          <div className="text-muted-foreground text-xs">
            We will send a reset link to your email address
          </div>
        </div>

        <Button
          type="submit"
          variant="default"
          isPending={isEmailSending}
          pendingText="Sending reset link"
          disabled={isEmailSending || cooldown > 0}
          className="mt-3 w-full rounded-lg p-6 text-base md:mt-0 md:w-auto md:justify-start"
        >
          {cooldown > 0 ? `Resend link in ${cooldown}s` : "Send Reset Link"}
        </Button>
      </div>
    </form>
  );
};

export default SecurityInformationCard;
