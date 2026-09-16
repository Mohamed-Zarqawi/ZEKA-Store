import { Button } from "@/components/ui/button";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Switch } from "@/components/ui/switch";
import { IconTrash } from "@tabler/icons-react";
import { Plus } from "lucide-react";

const PaymentsPage = () => {
  return (
    <div>
      <div className="text-primary text-3xl">PAYMENTS</div>

      <div className="border-primary mt-6 flex h-fit w-full flex-col rounded-3xl border bg-[#1a1a1a]/20 px-6 py-6 md:mt-10 md:px-8 md:py-10">
        <div className="flex flex-col justify-between gap-8 md:flex-row">
          <div className="border-primary h-fit w-full overflow-hidden rounded-3xl border border-dashed hover:cursor-pointer">
            <div className="flex flex-row items-center justify-center overflow-hidden rounded-3xl px-4 py-19 text-black md:flex-col md:px-21.5 md:py-21.5">
              <Plus className="mr-2 text-white md:size-20" />
              <div className="text-sm text-white md:text-base">
                Add New Payment
              </div>
            </div>
          </div>

          <div className="border-primary h-fit w-full overflow-hidden rounded-3xl border">
            <div className="mt-[-2] flex flex-col gap-10 overflow-hidden rounded-3xl bg-[#F3F4F8] p-6 text-black md:gap-20">
              <div className="text-base">Mohamed Zarqawi</div>

              <div className="flex flex-col gap-1">
                <div className="items-centers flex justify-between">
                  <div className="text-xs">Card number</div>
                  <div className="text-xs">Exp.date</div>
                </div>

                <div className="flex items-center justify-between text-black">
                  <div className="text-base">
                    <span className="text-zinc-400">XXXX-XXXX-XXXX-</span>
                    3821
                  </div>
                  <div className="text-base">05/29</div>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between gap-2 px-6 pt-4 pb-4 md:pt-6 md:pb-6">
              <div>
                <FieldGroup className="w-full max-w-40">
                  <Field orientation="horizontal">
                    <div className="flex justify-between gap-2">
                      <FieldLabel
                        htmlFor="switch-size-default"
                        className="text-xs"
                      >
                        Default
                      </FieldLabel>
                      {/* <Switch id="switch-size-default" size="default" /> */}
                    </div>
                  </Field>
                </FieldGroup>
              </div>

              <div className="flex items-center">
                <Button variant={"destructive"} className="gap-2">
                  <IconTrash size={20} />
                  Delete
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default PaymentsPage;
