import Link from "next/link";

export default function SiteFooter() {
    return (
        <>
        <footer id="site-footer" className="bg-slate-200">
            <div className="flex justify-between items-center container mx-auto lg:max-w-5xl">
                <div className="py-3">&copy; 2024 Staytion</div>
                <ul className="flex [&>li>a]:px-2">
                    <li>
                        <Link href="/">About</Link> 
                    </li>
                    <li>
                        <Link href="/">Privacy Policy</Link>
                    </li>
                    <li>
                        <Link href="/">Sample Page</Link>
                    </li>
                </ul>
            </div>
            
        </footer>
        </>
    )
}