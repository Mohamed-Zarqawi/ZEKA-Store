import { Button } from "@/components/ui/button";
import { Field, FieldLabel } from "@/components/ui/field";
import AddressCard from "@/features/profile/pages/addresses/components/AddressCard";
import OrderCard from "@/features/profile/pages/orders/components/OrderCard";
import ProductCard from "@/features/shop/components/ProductCard";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useGetUserAdmin } from "./hooks/useUser";

interface ViewProps {
  userId: string;
}

const ViewUserPage = ({ userId }: ViewProps) => {
  const { data: user, isLoading: isProductLoading } = useGetUserAdmin(userId);
  const router = useRouter();
  const name = user?.first_name + " " + user?.last_name;

  const code = user?.phoneCode;
  const number = user?.phoneNumber;
  const fullNumber = code && number ? `+${code}-${number}` : "-";

  const state = user?.is_blocked;
  const isAvailable = state == false;

  console.log(user);
  if (isProductLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <Loader2 className="text-primary h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    user && (
      <div>
        <div className="flex items-center justify-between">
          <div className="text-primary text-3xl">{name}</div>
          <Button
            variant={"outline"}
            onClick={() => {
              router.push(`/admin/users/${user.id}/edit`);
            }}
          >
            Edit Mode
          </Button>
        </div>
        {/* System Data */}
        <div className="border-primary mt-10 flex h-fit w-full flex-col rounded-3xl border bg-[#1a1a1a]/20 px-8 py-8 backdrop-blur-md">
          <div className="text-lg">System Data</div>
          <div className="mt-5 flex flex-wrap gap-6">
            <Field>
              <FieldLabel className="text-primary text-sm">ID</FieldLabel>
              <div className="text-muted-foreground">{user?.id}</div>
            </Field>

            <Field>
              <FieldLabel className="text-primary text-sm">Login at</FieldLabel>
              <div className="text-muted-foreground">{user?.created_at}</div>
            </Field>

            <Field>
              <FieldLabel className="text-primary text-sm">Role</FieldLabel>
              <div className="text-muted-foreground capitalize">
                {user?.role}
              </div>
            </Field>

            <Field>
              <FieldLabel className="text-primary text-sm">State</FieldLabel>
              <div className="text-muted-foreground">
                {isAvailable ? `Active` : "Deleted"}
              </div>
            </Field>
          </div>
        </div>

        {/* Personal Data */}
        <div className="border-primary mt-6 flex h-fit w-full flex-col rounded-3xl border bg-[#1a1a1a]/20 px-8 py-8 backdrop-blur-md">
          <div className="text-lg">Personal Data</div>
          <div className="mt-5 flex flex-wrap gap-6">
            <Field>
              <FieldLabel className="text-primary text-sm">
                First Name
              </FieldLabel>
              <div className="text-muted-foreground">{user?.first_name}</div>
            </Field>

            <Field>
              <FieldLabel className="text-primary text-sm">
                Last Name
              </FieldLabel>
              <div className="text-muted-foreground">{user?.last_name}</div>
            </Field>

            <Field>
              <FieldLabel className="text-primary text-sm">Gender </FieldLabel>
              <div className="text-muted-foreground capitalize">
                {user?.gender || "-"}
              </div>
            </Field>
          </div>
        </div>

        {/* Contact Data */}
        <div className="border-primary mt-6 flex h-fit w-full flex-col rounded-3xl border bg-[#1a1a1a]/20 px-8 py-8 backdrop-blur-md">
          <div className="text-lg">Contact Data</div>
          <div className="mt-5 flex flex-wrap gap-6">
            <Field>
              <FieldLabel className="text-primary text-sm">Email</FieldLabel>
              <div className="text-muted-foreground">{user?.email}</div>
            </Field>

            <Field>
              <FieldLabel className="text-primary text-sm">
                Phone Number
              </FieldLabel>
              <div className="text-muted-foreground">{fullNumber}</div>
            </Field>

            <Field>
              <FieldLabel className="text-primary text-sm">
                Addresses
              </FieldLabel>
              <div className="mt-1 grid w-full grid-cols-1 gap-4 md:grid-cols-2">
                {user?.addresses?.map((Address, i) => {
                  console.log(Address);
                  return (
                    <AddressCard key={i} address={Address} isAdmin={true} />
                  );
                })}
                {user?.addresses?.length == 0 && "-"}
              </div>
            </Field>
          </div>
        </div>

        {/* Activity Metrics */}
        <div className="border-primary mt-6 flex h-fit w-full flex-col rounded-3xl border bg-[#1a1a1a]/20 px-8 py-8 backdrop-blur-md">
          <div className="text-lg">User Activity</div>
          <div className="mt-5 flex flex-wrap gap-6">
            <Field>
              <FieldLabel className="text-primary text-sm">Orders</FieldLabel>
              <div className="text-muted-foreground mt-1 flex flex-col gap-4">
                {user?.orders?.map((order) => (
                  <OrderCard key={order.id} order={order} isAdmin={true} />
                ))}
                {user?.orders?.length == 0 && "-"}
              </div>
            </Field>

            <Field>
              <FieldLabel className="text-primary text-sm">
                Favorites
              </FieldLabel>
              <div className="mt-2 grid w-full grid-cols-2 gap-3 md:grid-cols-[repeat(auto-fill,minmax(240px,1fr))] lg:gap-6">
                {user.favorite_items.map((favorite, i) => (
                  <ProductCard
                    key={favorite.id}
                    product={favorite.product}
                    isAdmin={true}
                  />
                ))}
                {user.favorite_items?.length == 0 && "-"}
              </div>
            </Field>
          </div>
        </div>
      </div>
    )
  );
};

export default ViewUserPage;
