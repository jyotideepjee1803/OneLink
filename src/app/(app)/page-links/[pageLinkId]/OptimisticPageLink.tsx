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
      {/* <Modal open={open} setOpen={setOpen} title="Edit Page link">
        <PageLinkForm
          pageLink={optimisticPageLink}
          pages={pages}
          pageId={pageId}
          closeModal={closeModal}
          openModal={openModal}
          addOptimistic={updatePageLink}
        />
      </Modal>
      <div className="flex justify-between items-end mb-4">
        <h1 className="font-semibold text-2xl">{optimisticPageLink.title}</h1>
        <Button className="" onClick={() => setOpen(true)}>
          Edit
        </Button>
      </div>
      <pre
        className={cn(
          "bg-secondary p-4 rounded-lg break-all text-wrap",
          optimisticPageLink.id === "optimistic" ? "animate-pulse" : "",
        )}
      >
        {optimisticPageLink.icon && 
          <div className="mb-2">
            <Image src={optimisticPageLink.icon} alt="icon" height={40} width={40}/>
          </div>
        }
        <div className="mb-2">
          <strong>Title:</strong> {optimisticPageLink.title}
        </div>
        <div className="mb-2">
          <strong>URL:</strong> {optimisticPageLink.url}
        </div>
      </pre> */}
      <PageLinkForm
        pageLink={optimisticPageLink}
        pages={pages}
        pageId={pageId}
        closeModal={closeModal}
        openModal={openModal}
        addOptimistic={updatePageLink}
      />
    </div>
  );
}
