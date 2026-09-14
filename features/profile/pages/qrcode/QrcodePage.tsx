const QrcodePage = () => {
  return (
    <div className="md:gap-10` flex flex-col gap-5">
      <div className="text-primary text-2xl md:text-3xl">QR Code</div>{" "}
      <div className="text-sm md:text-base">
        Use the ZEKA QR code to log in to your account on another device:
      </div>
      <div className="border-primary flex h-fit w-full flex-col rounded-3xl border bg-[#1a1a1a]/20 px-8 py-10 backdrop-blur-md">
        <div className="flex h-full w-full items-center justify-center">
          <img src="/images/qrcode.png" className="aspect-square" />
        </div>
      </div>
    </div>
  );
};
export default QrcodePage;
