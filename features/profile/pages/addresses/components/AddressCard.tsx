import { Button } from "@/components/ui/button";
import { AddressType } from "@/types/profile/address";
import { IconTrash } from "@tabler/icons-react";
import { Edit, Pin } from "lucide-react";
import { useRouter } from "next/navigation";
import { useDeleteAddress, useUpdateAddress } from "../hooks/useAddresses";

const AddressCard = ({ address }: { address: AddressType }) => {
  const router = useRouter();
  const { mutate: handleDelete, isPending: isDeleting } = useDeleteAddress();

  const { mutateAsync: handleUpdateAddress, isPending: isAddressUpdating } =
    useUpdateAddress();
  const handleSetDefault = (addressId: string) => {
    handleUpdateAddress({
      action: "pin",
      addressId: String(addressId),
      addressData: { isDefault: true },
    });
  };
  return (
    <div className="bg-card border-border w-full rounded-md border px-4 py-3 md:py-5">
      <div className="text-primary flex flex-col gap-3">
        <div className="my-auto flex items-center justify-between md:mb-1.5">
          <div className="capitalize">{address.title}</div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="icon-sm"
              disabled={isDeleting}
              isPending={isDeleting}
              onClick={() => {
                handleDelete(address.id);
              }}
              className="border-border cursor-pointer border p-2"
            >
              <IconTrash className="text-destructive h-4 w-4 hover:cursor-pointer" />
            </Button>

            <Button
              variant="outline"
              size="icon-sm"
              className="border-border cursor-pointer border p-2"
              onClick={() => {
                router.push(`addresses/${address.id}/edit`);
              }}
              disabled={isDeleting}
            >
              <Edit className="h-4 w-4" />
            </Button>

            {address.isDefault ? (
              <Button
                variant={"outline"}
                size={"sm"}
                disabled={address.isDefault}
                className="border-border! cursor-pointer border p-2"
              >
                Default
              </Button>
            ) : (
              <Button
                variant="outline"
                size={"icon-sm"}
                isPending={isAddressUpdating}
                onClick={() => {
                  handleSetDefault(address.id);
                }}
                className="border-border cursor-pointer border p-2"
              >
                <Pin className="h-4 w-4 hover:cursor-pointer" />
              </Button>
            )}
          </div>
        </div>
        <div className="bg-primary mb-4 h-px w-full md:mb-4" />
      </div>
      <div className="text-muted-foreground flex flex-col gap-2 text-sm md:gap-3">
        <div className="text-primary">{address.name}</div>
        <div>{address.addressLine}</div>
        <div>{address.addressDetails}</div>
        <div>
          {address.country} - {address.city}
        </div>
        <div>
          <span className="text-foreground">Phone Number :</span>{" "}
          <br className="block md:hidden" />+{address.phoneCode}-{address.phone}
        </div>
      </div>
    </div>
  );
};

export default AddressCard;
