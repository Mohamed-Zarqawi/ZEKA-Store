"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

import { Trash2Icon } from "lucide-react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogMedia,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Spinner } from "@/components/ui/spinner";
import { useDeleteAccount } from "@/features/auth/pages/hooks/useAuth";
import SecurityInfomationCard from "@/features/profile/components/securityInfomationCard";

const SecuritySettingsPage = () => {
  const router = useRouter();
  const { mutate: deleteAccount, isPending: isDeletingAccount } =
    useDeleteAccount();

  const handleDelete = () => {
    deleteAccount();
  };

  return (
    <div>
      <div className="text-primary text-2xl md:text-3xl">SECURITY SETTINGS</div>
      <div className="mt-10">
        <SecurityInfomationCard />

        <div className="border-primary mt-6 flex h-fit w-full flex-col items-center justify-between rounded-3xl border bg-[#1a1a1a]/20 px-6 py-6 md:mt-10 md:flex-row md:px-8 md:py-10">
          <div className="flex flex-col gap-2">
            <div className="text-primary text-base md:text-xl">
              Account Deletion
            </div>
            <div className="text-muted-foreground text-xs">
              We are sad to see you go, but hope to see you again!
            </div>
          </div>

          {/* ------------- */}

          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button
                variant="destructive"
                className="mt-3 hidden w-full rounded-lg p-6 text-base md:mt-0 md:flex md:w-auto md:justify-start"
              >
                Delete Account
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent size="md" className="hidden md:block">
              <AlertDialogHeader>
                <AlertDialogMedia className="bg-destructive/10 dark:bg-destructive/20 text-destructive dark:text-destructive">
                  <Trash2Icon />
                </AlertDialogMedia>
                <div className="flex flex-col gap-3">
                  <AlertDialogTitle>Delete Your Account?</AlertDialogTitle>
                  <AlertDialogDescription>
                    <span className="text-destructive">
                      Deleting your account
                    </span>{" "}
                    is permanent. All your profile information, orders,
                    favorites items, and account data will be removed and cannot
                    be restored.
                  </AlertDialogDescription>
                </div>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel variant="outline">Cancel</AlertDialogCancel>
                <AlertDialogAction
                  variant="destructive"
                  onClick={handleDelete}
                  disabled={isDeletingAccount}
                >
                  {isDeletingAccount ? (
                    <span className="flex items-center gap-2">
                      <Spinner data-icon="inline-start" />
                      Deleting...
                    </span>
                  ) : (
                    "Delete"
                  )}
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>

          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button
                variant="destructive"
                className="mt-3 flex w-full rounded-lg p-6 text-base md:mt-0 md:hidden md:w-auto md:justify-start"
              >
                Delete Account
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogMedia className="bg-destructive/10 dark:bg-destructive/20 text-destructive dark:text-destructive">
                  <Trash2Icon />
                </AlertDialogMedia>
                <div className="flex flex-col gap-3">
                  <AlertDialogTitle>Delete Your Account?</AlertDialogTitle>
                  <AlertDialogDescription>
                    <span className="text-destructive">
                      Deleting your account
                    </span>{" "}
                    is permanent. All your profile information, orders,
                    favorites items, and account data will be removed and cannot
                    be restored.
                  </AlertDialogDescription>
                </div>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel variant="outline">Cancel</AlertDialogCancel>
                <AlertDialogAction
                  variant="destructive"
                  onClick={handleDelete}
                  disabled={isDeletingAccount}
                >
                  {isDeletingAccount ? (
                    <span className="flex items-center gap-2">
                      <Spinner data-icon="inline-start" />
                      Deleting...
                    </span>
                  ) : (
                    "Delete"
                  )}
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>
    </div>
  );
};
export default SecuritySettingsPage;
