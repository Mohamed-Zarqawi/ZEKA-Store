"use client";

import { Button } from "@/components/ui/button";
import { useLogout } from "@/features/auth/pages/hooks/useAuth";
import Image from "next/image";
import { useRouter } from "next/navigation";

const CreateUserPage = () => {
  const router = useRouter();
  const logout = useLogout();
  const handleLogout = () => {
    logout();
    router.push("/signup");
  };
  return (
    <div className="flex min-h-[calc(100dvh-155px)] flex-col justify-center lg:min-h-[calc(100dvh-185px)]">
      <div className="flex flex-col items-center gap-2 md:gap-4">
        <div className="text-primary text-center text-2xl md:text-3xl">
          <Image src="/images/images-1.jpg" alt="" width={300} height={300} />
        </div>

        <div className="text-center text-base md:text-3xl">
          Go and signup bro!
        </div>

        <Button variant={"default"} size={"lg"} onClick={handleLogout}>
          SIGN UP
        </Button>
      </div>
    </div>
  );
};

export default CreateUserPage;
