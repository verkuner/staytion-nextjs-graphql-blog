# staytion-nextjs-graphql-blog
Implement blog using latest version of nextjs, hasura/graphql-request, postgresql

Vercel hosting web site : https://staytion-nextjs-graphql-blog.vercel.app/

Fly hoting web site (docker): https://staytion-nextjs-graphql-blog.fly.dev/

*The folder structure of NextJS fullstack project clean architect*
![](/public/nextjs-fullstack-clear-architect.png)

The current implement for blog uses Page Router, and it will migrate to App Router which is recommended by nextJS new version.
The data layer of using graphql-request is at /src/modules, which has the concept of domain interface and service implementation.
The shared layer includes /src/components, /src/libs, /src/hooks.
The ui page is in folder /src/pages.

The pricingAlgo implementation is in /src/libs/pricing-algo.ts file 

The Database Trigger scripts is added at Hasura postgresql instance.

That is all, Cheers!

