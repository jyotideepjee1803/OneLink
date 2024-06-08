/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { notFound } from "next/navigation";
import Image from "next/image";
import { MoreVerticalIcon } from "lucide-react";

import { getPageBySlugWithPageLinksButtons } from "@/lib/api/pages/queries";
import { type PageLink} from "@/lib/db/schema/pageLinks";
import { PageButton } from "@/lib/db/schema/pageButtons";

import { iconMapping } from "@/components/socials";

export default async function SharedPage({
  params,
}: {
  params: { slug: string };
}) {
 
  const { page, pageLinks, pageButtons } = await getPageBySlugWithPageLinksButtons(params.slug);
 
  if (!page) notFound();
  if (!page.public) 
    return (
      <main>
         <div className="flex flex-col justify-center items-center space-y-4 mt-5 pt-10">
            <p className="max-w-[640px] text-neutral-500 md:text-xl dark:text-neutral-400 text-center">
              {"This page is not public. If you're the creator make sure\n you click the Make Public Button before sharing"}
            </p>
        </div>
      </main>
    );

  return (
    <main>
      <div className={`flex h-screen flex-col items-center justify-center px-4 py-8 text-center`} style={{background:page.bgColor}}>
        <header className="mb-10">
          <div className="flex justify-center">
            <div className="rounded-full bg-gray-300 flex content-center justify-center">
              {
                page.icon && <Image src={page.icon} alt="user-image" width={96} height={96} className="rounded-full aspect-square object-cover"/>
              }
            </div>
          </div>
          <h1 className="mt-4 text-2xl font-bold text-white">{`@${page.slug}`}</h1>
          <p className="text-white">{page.description}</p>
        </header>
        <nav className="flex flex-row justify-start mb-5">
          {pageButtons.map((b: PageButton)=>{
            const icon = iconMapping[b.title];
            return(
              <Link key={b.id} href={b.url}>
                <div className="mx-4 hover:animate-custom-bounce rounded-full p-2">
                  {icon}
                </div>
              </Link>
            )
          })}
        </nav>
        <nav className="flex w-full max-w-md flex-1 flex-col gap-4 mt-4">
          {pageLinks.map((l:PageLink) => {
            return (
              <Link key={l.id} href={l.url}>
                <div className={`gap-4 border border-gray-300 rounded-full p-3 flex items-center text-white hover:text-blue-900 hover:bg-gray-50 hover:shadow-md`}>
                  <div className="flex-shrink-0 rounded-full w-[40px] h-[40px] overflow-hidden">
                    {l.icon ? (
                      <Image src={l.icon} height={40} width={40} alt="icon" className="w-full h-full object-cover rounded-full" />
                    ) : (
                      <div className="h-10 w-10" />
                    )}
                  </div>

                  <div className="flex-grow text-center">{l.title}</div>

                  <div className="flex-shrink-0"><MoreVerticalIcon className="h-5 w-5"/></div>
                </div>
              </Link>
            )
          })}
        </nav>
      </div>
    </main>
  );
}
