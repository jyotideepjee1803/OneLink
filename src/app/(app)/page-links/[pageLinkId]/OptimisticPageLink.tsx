"use client";

import { useOptimistic, useState } from "react";
import { TAddOptimistic } from "@/app/(app)/page-links/useOptimisticPageLinks";
import { type PageLink } from "@/lib/db/schema/pageLinks";
import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import Modal from "@/components/shared/Modal";
import PageLinkForm from "@/components/pageLinks/PageLinkForm";
import { type Page, type PageId } from "@/lib/db/schema/pages";
import Image from "next/image";

export default function OptimisticPageLink({ 
  pageLink,
  pages,
  pageId 
}: { 
  pageLink: PageLink; 
  
  pages: Page[];
  pageId?: PageId
}) {
  const [open, setOpen] = useState(true);
  const openModal = (_?: PageLink) => {
    setOpen(true);
  };
  const closeModal = () => setOpen(false);
  const [optimisticPageLink, setOptimisticPageLink] = useOptimistic(pageLink);
  const updatePageLink: TAddOptimistic = (input) =>
    setOptimisticPageLink({ ...input.data });

  return (
    <div className="m-4 p-5 flex justify-center">
      <div className="w-3/6 min-w-max">
      <PageLinkForm
        pageLink={optimisticPageLink}
        pages={pages}
        pageId={pageId}
        closeModal={closeModal}
        openModal={openModal}
        addOptimistic={updatePageLink}
      />
      </div>
    </div>
  );
}
