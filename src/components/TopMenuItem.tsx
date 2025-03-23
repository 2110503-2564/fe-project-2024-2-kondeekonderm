import Link from 'next/link'

export default function TopMenuItem({ label, link }: { label: string; link: string }) {
    return (
      <div className="ml-auto flex space-x-6 w-32 text-center text-gray-600 text-lg font-sans">
        <Link href={link}>{label}</Link>
      </div>
    );
  }