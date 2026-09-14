import ProfileLeftBar from "@/features/profile/components/ProfileLeftBar";

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="mx-4 mt-6 md:mx-10 md:mb-10">
      <div className="flex items-start gap-10 md:mt-15">
        <ProfileLeftBar />
        <div className="flex w-full flex-1 flex-col">{children}</div>
      </div>
    </div>
  );
}
