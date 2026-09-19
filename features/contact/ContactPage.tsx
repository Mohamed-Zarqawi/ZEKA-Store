"use client";

import emailjs from "@emailjs/browser";
import React, { useRef, useState } from "react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { MailIcon, MapPinIcon, PhoneIcon } from "@animateicons/react/lucide";

const ContactPage = () => {
  const formRef = useRef<HTMLFormElement | null>(null);
  const [buttonText, setButtonText] = useState("SUBMIT");
  const [isAlertOpen, setIsAlertOpen] = useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!formRef.current) return;

    setButtonText("SENDING...");

    const serviceID = "default_service";
    const templateID = "template_bp2hz3o";
    const publicKey = "AOq4bhkAry0qF8tdT";

    emailjs
      .sendForm(serviceID, templateID, formRef.current, publicKey)
      .then(() => {
        setButtonText("SUBMIT");
        setIsAlertOpen(true);
        formRef.current?.reset();
      })
      .catch((err) => {
        setButtonText("SUBMIT");
        alert("Error sending email: " + JSON.stringify(err));
      });
  };

  return (
    <div className="mx-4 md:mx-10">
      {/* body */}

      <div className="flex flex-col gap-6 md:h-[calc(100dvh-155px)] md:flex-wrap md:items-center md:justify-center md:gap-10 lg:max-h-[calc(100dvh-185px)]">
        <div className="border-primary flex flex-col justify-between gap-6 md:flex-row md:items-center md:rounded-3xl md:border md:bg-[#1a1a1a]/20 md:p-6">
          {/* Left */}

          <div className="flex w-full flex-col justify-start gap-8 py-10 md:pl-10">
            <div className="flex flex-col gap-2 md:gap-5">
              <div className="text-2xl md:text-4xl">
                GET IN <span className="text-primary">TOUCH</span>
              </div>

              <div className="text-muted-foreground text-sm md:text-lg">
                Have questions about our gear? Our experts are here to help!
              </div>
            </div>

            <div className="text-primary text-sm font-extrabold md:text-xl">
              CONTACT INFORMATION
            </div>
            <div className="flex flex-col gap-5">
              {/* 1 */}
              <div className="flex items-center gap-3 md:gap-4">
                <Button
                  variant={"outline"}
                  size="icon"
                  className="border-primary rounded-lg border"
                >
                  <PhoneIcon duration={1} className="text-primary size-5" />
                </Button>
                <div>+1 (555) 000-0000</div>
              </div>

              {/* 2 */}
              <div className="flex items-center gap-4">
                <Button
                  variant={"outline"}
                  size="icon"
                  className="border-primary rounded-lg border p-1.75"
                >
                  <MailIcon duration={1} className="text-primary size-5" />
                </Button>
                <div>support@zekastore.com</div>
              </div>

              {/* 3 */}
              <div className="flex items-center gap-4">
                <Button
                  variant={"outline"}
                  size="icon"
                  className="border-primary rounded-lg border p-1.75"
                >
                  <MapPinIcon duration={2} className="text-primary size-5" />
                </Button>
                <div>81 New Cairo, Cairo, Egypt</div>
              </div>
            </div>
          </div>

          {/* Right */}

          <form
            ref={formRef}
            onSubmit={handleSubmit}
            className="flex w-full flex-col gap-6 md:py-10 md:pr-10"
          >
            <div className="flex w-full flex-col gap-4">
              <Input
                type="text"
                name="name"
                isRequired={true}
                placeholder="Full Name"
                className="border-primary focus:ring-secondary w-full rounded-lg border bg-transparent px-4 py-3 text-white outline-none focus:ring-2"
                required
              />

              <Input
                type="email"
                name="email"
                isRequired={true}
                placeholder="Email Address"
                required
              />

              <Textarea
                name="message"
                isRequired={true}
                placeholder="How can we help you?"
                rows={4}
                required
              />
            </div>

            <Button
              type="submit"
              className="bg-primary hover:bg-secondary w-full rounded-lg px-4 py-8 text-center text-xl text-white transition-colors duration-300 hover:cursor-pointer"
            >
              {buttonText}
            </Button>

            <AlertDialog open={isAlertOpen} onOpenChange={setIsAlertOpen}>
              <AlertDialogContent className="border-primary flex flex-col gap-6 rounded-3xl border bg-[#1a1a1a]/90 p-6 backdrop-blur-md">
                <AlertDialogHeader className="flex w-full flex-col gap-4 text-center">
                  <AlertDialogTitle className="text-primary flex w-full flex-col text-center text-[16px] font-bold">
                    THANK YOU FOR CONTACTING US!
                  </AlertDialogTitle>

                  <AlertDialogDescription className="flex w-full flex-col items-center justify-center gap-3 text-center font-bold text-zinc-300">
                    We appreciate you reaching out and will get back to you as
                    soon as possible.
                  </AlertDialogDescription>
                </AlertDialogHeader>

                <AlertDialogFooter>
                  <AlertDialogAction
                    onClick={() => setIsAlertOpen(false)}
                    className="bg-primary hover:bg-secondary w-full rounded-lg px-5 py-6 text-center text-white transition-colors duration-300 hover:cursor-pointer"
                  >
                    CLOSE
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </form>
        </div>
      </div>
    </div>
  );
};
export default ContactPage;
