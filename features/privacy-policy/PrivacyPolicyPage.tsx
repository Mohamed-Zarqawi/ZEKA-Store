"use client";

import { Field, FieldLabel } from "@/components/ui/field";

const PrivacyPolicyPage = () => {
  return (
    <div className="mx-10">
      {/* body */}

      <div className="flex flex-col">
        <div className="mt-15 flex items-center justify-between">
          {/* text */}

          <div className="ml-20 flex flex-col gap-15">
            <div className="flex flex-col gap-10">
              <div className="text-primary flex items-center justify-between gap-3 text-4xl">
                PRIVACY POLICY
                <span className="text-muted-foreground text-xs">
                  (Last updated: 07 May 2026)
                </span>
              </div>
              <div className="flex flex-col gap-10">
                <div className="text-lg">
                  Welcome to <span className="text-primary"> ZEKA STORE</span>{" "}
                  We respect your privacy and are committed to protecting your
                  personal data. This Privacy Policy explains how we collect,
                  use, and safeguard your information when you visit or make a
                  purchase from our store.
                </div>

                <div className="flex flex-col gap-7">
                  <Field>
                    <FieldLabel className="text-primary mb-2 text-xl">
                      1. Information We Collect
                    </FieldLabel>
                    <div className="text-muted-foreground flex flex-col gap-2 leading-relaxed">
                      <p>
                        We collect personal information to provide you with the
                        best possible shopping experience, including:
                      </p>
                      <ul className="mt-1 flex list-disc flex-col gap-1.5 pl-5">
                        <li>
                          <strong className="text-foreground">
                            Account & Identity Data:
                          </strong>{" "}
                          Full name, email address, and phone number.
                        </li>
                        <li>
                          <strong className="text-foreground">
                            Shipping & Delivery Data:
                          </strong>{" "}
                          Shipping address and postal code required to deliver
                          your sports gear right to your doorstep.
                        </li>
                        <li>
                          <strong className="text-foreground">
                            Payment Information:
                          </strong>{" "}
                          Payments are processed through secure, encrypted
                          payment gateways. We do not store your credit card
                          details on our servers.
                        </li>
                        <li>
                          <strong className="text-foreground">
                            Technical & Usage Data:
                          </strong>{" "}
                          IP address, browser type, device information, and
                          pages visited to improve site functionality and
                          performance.
                        </li>
                      </ul>
                    </div>
                  </Field>

                  <Field>
                    <FieldLabel className="text-primary mb-2 text-xl">
                      2. How We Use Your Information
                    </FieldLabel>
                    <div className="text-muted-foreground flex flex-col gap-2 leading-relaxed">
                      <p>
                        We use the information we collect for the following
                        purposes:
                      </p>
                      <ul className="mt-1 flex list-disc flex-col gap-1.5 pl-5">
                        <li>
                          Processing and fulfilling your orders for sports gear
                          and products.
                        </li>
                        <li>
                          Sending order updates, tracking information, and
                          customer support communications.
                        </li>
                        <li>
                          Informing you when out-of-stock items become available
                          (if you opted into stock notifications).
                        </li>
                        <li>
                          Sending promotional offers, new collection arrivals,
                          and discounts (you can unsubscribe at any time).
                        </li>
                      </ul>
                    </div>
                  </Field>

                  <Field>
                    <FieldLabel className="text-primary mb-2 text-xl">
                      3. Data Sharing & Third Parties
                    </FieldLabel>
                    <div className="text-muted-foreground flex flex-col gap-2 leading-relaxed">
                      <p>
                        We do not sell, rent, or trade your personal data to
                        third parties. We only share necessary information with
                        trusted partners to complete your transactions:
                      </p>
                      <ul className="mt-1 flex list-disc flex-col gap-1.5 pl-5">
                        <li>
                          <strong className="text-foreground">
                            Shipping & Logistics Providers:
                          </strong>{" "}
                          To deliver your items.
                        </li>
                        <li>
                          <strong className="text-foreground">
                            Payment Processors:
                          </strong>{" "}
                          To securely handle payment transactions.
                        </li>
                      </ul>
                    </div>
                  </Field>

                  <Field>
                    <FieldLabel className="text-primary mb-2 text-xl">
                      4. Data Security
                    </FieldLabel>
                    <div className="text-muted-foreground leading-relaxed">
                      We implement industry-standard security measures,
                      including SSL encryption, to ensure your personal data is
                      protected against unauthorized access, alteration, or
                      disclosure.
                    </div>
                  </Field>

                  <Field>
                    <FieldLabel className="text-primary mb-2 text-xl">
                      5. Cookies
                    </FieldLabel>
                    <div className="text-muted-foreground leading-relaxed">
                      We use cookies to enhance your browsing experience,
                      remember items in your shopping cart, and understand how
                      you interact with our website.
                    </div>
                  </Field>

                  <Field>
                    <FieldLabel className="text-primary mb-2 text-xl">
                      6. Your Rights
                    </FieldLabel>
                    <div className="text-muted-foreground flex flex-col gap-2 leading-relaxed">
                      <p>You have the right to:</p>
                      <ul className="mt-1 flex list-disc flex-col gap-1.5 pl-5">
                        <li>
                          Access, update, or correct your personal data through
                          your profile settings.
                        </li>
                        <li>
                          Request the deletion of your account and personal
                          information from our system.
                        </li>
                        <li>
                          Opt out of receiving marketing emails at any time.
                        </li>
                      </ul>
                    </div>
                  </Field>

                  <Field>
                    <FieldLabel className="text-primary mb-2 text-xl">
                      7. Contact Us
                    </FieldLabel>
                    <div className="text-muted-foreground flex flex-col gap-1 leading-relaxed">
                      <p>
                        If you have any questions or concerns regarding this
                        Privacy Policy, please contact us at:
                      </p>
                      <div className="mt-2 flex flex-col gap-1">
                        <div>
                          <strong className="text-foreground">Email:</strong>{" "}
                          support@zekastore.com
                        </div>
                        <div>
                          <strong className="text-foreground">
                            Phone/WhatsApp:
                          </strong>{" "}
                          +1 (555) 000-0000
                        </div>
                      </div>
                    </div>
                  </Field>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicyPage;
