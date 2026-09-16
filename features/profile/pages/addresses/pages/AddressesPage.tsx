"use client";

import { Button } from "@/components/ui/button";

import { useGetCurrentUser } from "@/features/auth/pages/hooks/useAuth";

import { useRouter } from "next/navigation";
import AddressCard from "../components/AddressCard";
import AddressesPageSkeleton from "../components/AddressesPageSkilton";
import { useGetAddresses } from "../hooks/useAddresses";

const AddressesPage = () => {
  const router = useRouter();
  const { data: currentUser, isLoading: isCurrentUserLoading } =
    useGetCurrentUser();
  const { data: addresses = [], isLoading: isAddressesLoading } =
    useGetAddresses(currentUser?.id);

  if (isCurrentUserLoading || !currentUser || isAddressesLoading) {
    return <AddressesPageSkeleton />;
  }

  // if (addresses.length == 0) {
  //   return <div>You don't add any addresses , add here.</div>;
  // }
  return (
    <div>
      <div className="text-primary text-3xl">ADDRESSES</div>

      {/* contact information */}
      {addresses.length == 0 ? (
        <div className="border-primary mt-10 flex h-fit w-full flex-col items-center justify-center gap-4 rounded-3xl border bg-[#1a1a1a]/20 px-8 py-10 backdrop-blur-md">
          <div className="text-md">You don't add any addresses.</div>
          <Button
            onClick={() => {
              router.push("addresses/add");
            }}
          >
            Add Here
          </Button>
        </div>
      ) : (
        <div className="border-primary mt-10 flex h-fit w-full flex-col rounded-3xl border bg-[#1a1a1a]/20 px-8 py-10 backdrop-blur-md">
          <div className="flex justify-between">
            <div className="text-md mb-10">Saved Addresses</div>
            <Button
              onClick={() => {
                router.push("addresses/add");
              }}
            >
              Add New
            </Button>
          </div>
          <div className="grid w-full grid-cols-2 gap-4">
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
