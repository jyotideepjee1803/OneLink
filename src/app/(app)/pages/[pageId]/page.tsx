import { Suspense } from "react";
import { notFound } from "next/navigation";

import { getPageByIdWithPageLinks } from "@/lib/api/pages/queries";
import OptimisticPage from "./OptimisticPage";
import { checkAuth } from "@/lib/auth/utils";
import PageLinkList from "@/components/pageLinks/PageLinkList";
import PageButtonList from "@/components/social_icons/PageButtonList";

import { BackButton } from "@/components/shared/BackButton";
import Loading from "@/app/loading";

import TogglePublic from "./_components/TogglePublic";
import { getUserSubscriptionPlan } from "@/lib/stripe/subscription";

export const revalidate = 0;

export default async function PagePage({
  params,
}: {
  params: { pageId: string };
}) {
  return (
    <main className="overflow-auto">
      <Page id={params.pageId} />
    </main>
  );
}

const Page = async ({ id }: { id: string }) => {
  await checkAuth();

  const { page, pageLinks, pageButtons} = await getPageByIdWithPageLinks(id);
  const { isSubscribed } = await getUserSubscriptionPlan();

  if (!page) notFound();
  return (
    <Suspense fallback={<Loading />}>
      <div className="">
      <div className="relative">
        <BackButton currentResource="pages" />
        <OptimisticPage page={page} subscribed = {Boolean(isSubscribed)}/>
      </div>
      <TogglePublic page={page} isSubscribed={Boolean(isSubscribed)} />
      <div className="relative mt-8 mx-4 mb-4">
        <h3 className="text-xl font-medium mb-4">
          Page Links
        </h3>
        <PageLinkList pages={[]} pageId={page.id} pageLinks={pageLinks}/>
      </div>
      <hr className=""/>
      <div className="relative mt-8 mx-4 mb-4">
          <h3 className="text-xl font-medium mb-4">
            Page Buttons
          </h3>
          <PageButtonList pages={[]} pageId={page.id} pageButtons={pageButtons}/>
      </div>
      </div>
    </Suspense>
  );
};
