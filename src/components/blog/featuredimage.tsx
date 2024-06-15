import Image from "next/image";
import Link from "next/link";

type imgType = {
    src: string,
    width: number,
    height: number
}

export default function FeaturedImage({ post }) {
    let img : imgType;

    const defaultFeaturedImage = "/blog-default.png";
    const defaultWidth = 199;
    const defaultHeight = 67;

    if(post.featuredImage) {
        let size = post.featuredImage.node.mediaDetails.sizes[0];
        img = {
            src: size.sourceUrl,
            width: size.width,
            height: size.height
        }
    }
    else {
        img = {
            src: defaultFeaturedImage,
            width: defaultWidth,
            height: defaultHeight
        }
    }

    return (
        <Link href={`/blog/${post.node.slug}`}>
            <Image src={img.src} width={img.width} height={img.height} alt={post.title} className="justify-center object-cover rounded-xl"/>
        </Link>
    )
}