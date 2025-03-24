import Link from 'next/link'

export default function TopMenuItem({ label, link }: { label: string; link: string }) {
    return (
      <div className="ml-auto flex space-x-6 w-32 text-center text-gray-500 text-md font-sans px-2 hover:text-black">
        <Link href={link}>{label}</Link>
      </div>
    );
  }