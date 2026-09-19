import Image from "next/image";
import Link from "next/link";

const CategoryCard = () => {
  return (
    <Link href="/category/gym">
      <div className="group relative h-150 w-100 overflow-hidden rounded-3xl border border-zinc-700">
        {/* image */}
        <Image
          src="/images/basketball.jpeg"
          alt="Basketball equipment"
          fill
          sizes="400px"
          className="h-full w-full object-cover object-left blur-[2px] transition-transform duration-600 group-hover:scale-107 group-hover:cursor-pointer"
        />

        {/* dark overlay */}
        <div className="absolute inset-0 bg-black/40"></div>

        {/* text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <h2 className="text-primary text-3xl">GYM & FITNESS</h2>
        </div>
        <div className="absolute inset-0 mb-5 flex flex-col items-center justify-end">
          <h3 className="text-sm">80 PRODUCTS</h3>
        </div>
      </div>
    </Link>
  );
};

export default CategoryCard;
