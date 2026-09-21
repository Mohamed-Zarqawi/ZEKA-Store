import SelectInput from "@/components/myComponents/SelectInput";
import {
  Field,
  FieldContent,
  FieldGroup,
  FieldLabel,
  FieldTitle,
} from "@/components/ui/field";
import { Switch } from "@/components/ui/switch";
import { IconBrandWhatsapp } from "@tabler/icons-react";
import { Mail, MessageCircleMore } from "lucide-react";

const NotificationPage = () => {
  return (
    <div>
      <div className="text-primary text-2xl md:text-3xl">NOTIFICATIONS</div>
      <div className="mt-10">
        <div className="border-primary mt-5 flex h-fit w-full flex-col rounded-3xl border bg-[#1a1a1a]/20 px-6 py-6 md:mt-10 md:px-8 md:py-10">
          <div className="text-base">Receive Communications In</div>
          <div className="mt-5 flex flex-col gap-2">
            <div className="text-primary text-sm">Language</div>

            <SelectInput
              placeholder="Select Language"
              options={["English", "Arabic"]}
            />
          </div>
        </div>

        {/* ------------------- */}
        <div className="border-primary mt-5 flex h-fit w-full flex-col rounded-3xl border bg-[#1a1a1a]/20 px-6 py-6 md:mt-10 md:px-8 md:py-10">
          <div className="text-base">Marketing Preferences</div>
          <div className="mt-5 flex flex-col gap-2">
            <FieldGroup className="w-full">
              <div className="flex flex-col gap-3 md:flex-row">
                <FieldLabel
                  htmlFor="switch-email"
                  className="flex justify-center"
                >
                  <Field className="flex items-center justify-between">
                    <FieldContent>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Mail size={20} />
                          <FieldTitle className="text-base">Email</FieldTitle>
                        </div>
                        <Switch
                          id="switch-email"
                          className="border-border border"
                        />
                      </div>
                    </FieldContent>
                  </Field>
                </FieldLabel>

                <FieldLabel
                  htmlFor="switch-sms"
                  className="flex justify-center"
                >
                  <Field
                    orientation="horizontal"
                    className="flex items-center justify-between"
                  >
                    <FieldContent>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <MessageCircleMore size={20} />
                          <FieldTitle className="text-base">SMS</FieldTitle>
                        </div>
                        <Switch id="switch-email" />
                      </div>
                    </FieldContent>
                  </Field>
                </FieldLabel>

                <FieldLabel
                  htmlFor="switch-whatsapp"
                  className="flex justify-center"
                >
                  <Field
                    orientation="horizontal"
                    className="flex items-center justify-between"
                  >
                    <FieldContent>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <IconBrandWhatsapp size={23} />
                          <FieldTitle className="text-base">
                            Whatsapp
                          </FieldTitle>
                        </div>
                        <Switch id="switch-email" />
                      </div>
                    </FieldContent>
                  </Field>
                </FieldLabel>
              </div>
            </FieldGroup>

            <div className="mt-2 text-xs text-zinc-500">
              Opting out halts promotional messages, but you’ll still receive
              important service updates.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default NotificationPage;
