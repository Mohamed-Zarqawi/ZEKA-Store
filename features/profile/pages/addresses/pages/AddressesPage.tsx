"use client";

import { Button } from "@/components/ui/button";

import { useGetCurrentUser } from "@/features/auth/pages/hooks/useAuth";

import { useRouter } from "next/navigation";
import AddressCard from "../components/AddressCard";
import AddressesPageSkeleton from "../components/AddressesPageSkilton";
import { useGetAddresses } from "../hooks/useAddresses";
import { Plus } from "lucide-react";

const AddressesPage = () => {
  const router = useRouter();
  const { data: currentUser, isLoading: isCurrentUserLoading } =
    useGetCurrentUser();
  const { data: addresses = [], isLoading: isAddressesLoading } =
    useGetAddresses(currentUser?.id);

  if (isCurrentUserLoading || !currentUser || isAddressesLoading) {
    return <AddressesPageSkeleton />;
  }

  return (
    <div>
      <div className="text-primary text-2xl md:text-3xl">ADDRESSES</div>
      <div className="text-muted-foreground mt-2 text-xs">
        Manage your saved addresses for fast and easy checkout across our
        marketplaces
      </div>
      {/* contact information */}
      {addresses.length == 0 ? (
        <div className="border-primary mt-6 flex h-fit w-full flex-col rounded-3xl border bg-[#1a1a1a]/20 px-6 py-6 md:mt-10 md:px-8 md:py-10">
          <div className="text-base">You don't add any addresses.</div>
          <Button
            onClick={() => {
              router.push("addresses/add");
            }}
          >
            Add Here
          </Button>
        </div>
      ) : (
        <div className="border-primary mt-6 flex h-fit w-full flex-col rounded-3xl border bg-[#1a1a1a]/20 px-6 py-6 md:mt-10 md:px-8 md:py-10">
          <div className="mb-5 flex items-center justify-between">
            <div className="text-base">Saved Addresses</div>
            <Button
              onClick={() => {
                router.push("addresses/add");
              }}
              className="hidden md:block"
            >
              Add New
            </Button>
          </div>
          <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-2">
            <Button
              size={"sm"}
              variant={"none"}
              onClick={() => {
                router.push("addresses/add");
              }}
              className="border-primary flex h-11 items-center justify-center border-dashed md:hidden"
            >
              <Plus />
              Add New
            </Button>

            {addresses.map((Address, i) => {
              console.log(Address);
              return <AddressCard key={i} address={Address} />;
            })}
          </div>
        </div>
      )}
    </div>
  );
};
export default AddressesPage;
