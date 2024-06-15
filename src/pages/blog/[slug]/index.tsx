import Head from "next/head";
import SiteHeader from "@/src/components/blog/siteheader";
import SiteFooter from "@/src/components/blog/sitefooter";

import { loadSinglePostWithInsertViews  } from "@/src/modules/blog/blog.service";
import Date from "@/src/libs/date-formatter";
import { Rubik, Roboto_Slab } from 'next/font/google';

import type { InferGetServerSidePropsType, GetServerSideProps } from 'next'
 

// import { headers } from 'next/headers'


const rubik = Rubik({ subsets: ['latin'], display: 'swap' });
const roboto_slab = Roboto_Slab({ subsets: ['latin'], display: 'swap' });

console.log(roboto_slab);

// export async function getStaticProps({ params }) {

//     const id = params.id;

//     // const header = headers()
//     // const ip = (header.get('x-forwarded-for') ?? '127.0.0.1').split(',')[0]

//     const ip = ''
  
  
//     const data = await Promise.all([
//       loadSinglePostWithInsertViews(id, ip)
//     ]);
  
//     const postData = data[0];

//     return {
//         props: {
//             postData
//         },
//         notFound: false,
//     };
// }


export async function getServerSideProps({req, params}) {


    const id = params.slug;

    const forwarded = req.headers['x-forwarded-for'];

    const ip = typeof forwarded === 'string' ? forwarded.split(/, /)[0] : req.socket.remoteAddress;

    const postData = await loadSinglePostWithInsertViews(id, ip)
  
    console.log(postData)

    return {
        props: {
            postData
        },
        notFound: false,
    };
}


export default function Post({ postData, featuredImageUrl}) {

    return (
        <>
        <Head>
            
            <title key="title">{postData.node.title}</title>

            <style>
                {`
                    .post-content ul {
                        font-family: ${rubik.style.fontFamily}
                    }
                `}
            </style>
        </Head>
        <section className="bg-slate-700 bg-opacity-70 absolute w-full z-20">
            <SiteHeader className="header-single-post z-10 relative" />
        </section>
        <article className={`${rubik.className} font-light`}>
            <section className="hero-area h-[20vh] min-h-[18rem] bg-no-repeat bg-cover bg-center relative" style={{backgroundImage: featuredImageUrl}}>
                <div className="absolute inset-0 bg-slate-800 opacity-40"></div>

                <div className="container mx-auto h-full flex flex-col justify-center lg:max-w-4xl">
                    <h1 className={`${roboto_slab.className} text-6xl font-normal text-slate-100 relative z-10 py-8 mt-12`}>
                        {postData.node.title}</h1>

                    <div className="pb-4 text-slate-100 z-10">
                        Posted by {postData.node.author}, updated on <Date dateString={postData.node.created_at} />
                        <span className="py-2 float-right">{postData.node.views} views</span>
                    </div>

                    <div dangerouslySetInnerHTML={{ __html: postData.node.content.substring(0,120) }} className="relative z-10 text-left text-slate-200 text-2xl pl-4 border-l-4 border-lime-200"/>
                </div>
            </section>
            <section className="content-area py-8">
                <div dangerouslySetInnerHTML={{ __html: postData.node.content }} className="post-content container lg:max-w-4xl mx-auto"/>
            </section>
        </article>
        <div className="container mx-auto lg:max-w-4xl">

        </div>

        <div className="container mx-auto lg:max-w-4xl">

        </div>
        
        <SiteFooter />
        </>
    );
}