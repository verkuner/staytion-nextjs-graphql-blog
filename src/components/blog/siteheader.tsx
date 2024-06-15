import Link from "next/link";
import Image from "next/image";

export default function SiteHeader({ className }) {
    return (
        <header className={`${className} container mx-auto lg:max-w-4xl flex items-center justify-between`}>
            <div className="logo-area">
                <Link href="/" className="flex justify-center">
                    <Image src="https://gostaytion.com/staytion_logo.svg" alt="Staytion" width="112" height="20" />
                </Link>
            </div>
            <nav className="text-slate-100">
                <ul className="flex justify-center [&>li>a]:px-3 [&>li>a]:py-2 [&>li>a:hover]:text-yellow-400 [&>li>a]:transition text-xl">
                    <li>
                        <Link href="/">Home</Link>
                    </li>
                    <li>
                        <Link href="/blog">Blog(cursor based)</Link>
                    </li>
                    <li>
                        <Link href="/dashboard/post">Blog(page based)</Link>
                    </li>
                    <li>
                        <Link href="/dashboard">Dashboard</Link>
                    </li>
                </ul>
            </nav>
        </header>
    );
}