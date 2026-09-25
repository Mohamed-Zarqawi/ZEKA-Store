const QrcodePage = () => {
  return (
    <div className="md:gap-10` flex flex-col">
      <div className="text-primary text-2xl md:text-3xl">QR Code</div>{" "}
      <div className="text-muted-foreground mt-2 text-xs">
        Use the ZEKA QR code to log in to your account on another device:
      </div>
      <div className="border-primary mt-6 flex h-fit w-full flex-col rounded-3xl border bg-[#1a1a1a]/20 px-6 py-6 md:mt-10 md:px-8 md:py-10">
        <div className="flex h-full w-full items-center justify-center">
          {/* <img src="/images/qrcode.png" className="aspect-square" /> */}
        </div>
      </div>
    </div>
  );
};
export default QrcodePage;
