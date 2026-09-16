"use client";

import { Button } from "@/components/ui/button";
import { FieldLabel } from "@/components/ui/field";
import { Skeleton } from "@/components/ui/skeleton";

const ProfilePageSkeleton = () => {
  return (
    <div className="w-full">
      {/* Title Skeleton */}
      <div className="text-primary text-3xl">PROFILE</div>

      {/* Contact Information Card */}
      <div className="border-primary mt-10 flex h-fit w-full flex-col rounded-3xl border bg-[#1a1a1a]/20 px-8 py-10 backdrop-blur-md">
        <div className="text-base">Contact Information</div>
        <div className="mt-5 flex flex-wrap gap-4">
          <div className="flex w-100 flex-col gap-2">
            <FieldLabel htmlFor="name" className="text-primary text-sm">
              Email
            </FieldLabel>
            <Skeleton className="h-13 w-full rounded-lg px-4 py-3" />
          </div>
        </div>
      </div>

      {/* Personal Information Card */}
      <div className="border-primary mt-6 flex h-fit w-full flex-col rounded-3xl border bg-[#1a1a1a]/20 px-8 py-10 backdrop-blur-md">
        <div className="text-base">Personal Information</div>

        <div className="mt-5 flex flex-col gap-4">
          {/* First Name & Last Name */}
          <div className="flex gap-4">
            <div className="flex w-100 flex-col gap-2">
              <FieldLabel htmlFor="name" className="text-primary text-sm">
                First Name
              </FieldLabel>
              <Skeleton className="h-13 w-full rounded-lg px-4 py-3" />
            </div>

            <div className="flex w-100 flex-col gap-2">
              <FieldLabel htmlFor="name" className="text-primary text-sm">
                Last Name
              </FieldLabel>
              <Skeleton className="h-13 w-full rounded-lg px-4 py-3" />
            </div>
          </div>

          {/* Birthday & Gender */}
          <div className="flex items-center gap-4">
            {/* Birthday Field */}
            <div className="flex w-100 flex-col gap-2">
              <FieldLabel htmlFor="date" className="text-primary text-sm">
                Birthday
              </FieldLabel>
              <Skeleton className="h-13 w-100 rounded-lg" />
            </div>

            {/* Gender Field */}
            <div className="flex flex-col justify-center gap-3">
              <div className="text-primary text-sm">Gender</div>

              <div className="flex gap-2">
                <Skeleton className="h-13 w-35 rounded-lg" />
                <Skeleton className="h-13 w-35 rounded-lg" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Submit Button Skeleton */}
      <div className="mt-6 flex justify-end gap-3">
        <Button
          type="submit"
          disabled={true}
          variant="default"
          className="rounded-lg p-6 text-base outline-none hover:cursor-pointer"
        >
          Update Profile
        </Button>
      </div>
    </div>
  );
};

export default ProfilePageSkeleton;
