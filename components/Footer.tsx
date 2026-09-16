import Link from "next/link";

const Footer = () => {
  return (
    <footer className="border-t-border mt-10 hidden w-full flex-col items-center justify-between gap-2 border border-x-0 border-b-0 bg-[#1a1a1a] px-25 py-6 md:flex md:flex-row">
      <div className="text-primary text-xs font-normal!">
        <span className="font-serif">&copy;</span> {new Date().getFullYear()}{" "}
        ZEKA. All rights reserved
      </div>
      <div className="text-primary flex gap-6 text-xs">
        <Link href={"/aboutUs"} className="hover:cursor-pointer">
          About Us
        </Link>
        <Link href={"/contact"} className="hover:cursor-pointer">
          Contact
        </Link>

        <Link href={"/privacy-policy"} className="hover:cursor-pointer">
          Privacy policy
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
