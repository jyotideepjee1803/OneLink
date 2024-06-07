"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { PlusIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { type PageLink, CompletePageLink } from "@/lib/db/schema/pageLinks";
import { type Page, type PageId } from "@/lib/db/schema/pages";
import { useOptimisticPageLinks } from "@/app/(app)/page-links/useOptimisticPageLinks";

import Modal from "@/components/shared/Modal";
import { Button } from "@/components/ui/button";
import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card";

import PageLinkForm from "./PageLinkForm";

type TOpenModal = (pageLink?: PageLink) => void;

export default function PageLinkList({
  pageLinks,
  pages,
  pageId,
  className, 
}: {
  pageLinks: PageLink[];
  pages: Page[];
  pageId?: PageId;
  className? : string;
}) {
  const { optimisticPageLinks, addOptimisticPageLink } = useOptimisticPageLinks(
    pageLinks,
    pages 
  );
  const [open, setOpen] = useState(false);
  const [activePageLink, setActivePageLink] = useState<PageLink | null>(null);
  const openModal = (pageLink?: PageLink) => {
    setOpen(true);
    pageLink ? setActivePageLink(pageLink) : setActivePageLink(null);
  };
  const closeModal = () => setOpen(false);

  return (
    <div className={className}>
      <Modal
        open={open}
        setOpen={setOpen}
        title={activePageLink ? "Edit PageLink" : "Create Page Link"}
      >
        <PageLinkForm
          pageLink={activePageLink}
          addOptimistic={addOptimisticPageLink}
          openModal={openModal}
          closeModal={closeModal}
          pages={pages}
          pageId={pageId}
        />
      </Modal>
      <div className="absolute right-0 top-0 ">
        <Button onClick={() => openModal()}>
          +
        </Button>
      </div>
      {optimisticPageLinks.length === 0 ? (
        <EmptyState openModal={openModal} />
      ) : (
        <ul>
          {optimisticPageLinks.map((pageLink) => (
            <PageLink
              pageLink={pageLink}
              key={pageLink.id}
              openModal={openModal}
            />
          ))}
        </ul>
      )}
    </div>
  );
}

const PageLink = ({
  pageLink,
  openModal,
}: {
  pageLink: PageLink;
  openModal: TOpenModal;
}) => {
  const optimistic = pageLink.id === "optimistic";
  const deleting = pageLink.id === "delete";
  const mutating = optimistic || deleting;
  const pathname = usePathname();
  const basePath = pathname.includes("page-links")
    ? pathname
    : pathname + "/page-links/";


  return (
    <Link className={cn("p-2 inline-block rounded-lg w-full",
    mutating ? "opacity-0 animate-pulse" : "",
    deleting ? "text-destructive" : "",)} 
    style={{
      pointerEvents: mutating||deleting ? "none" : "auto",
    }}
    aria-disabled={mutating || deleting} 
    href={ basePath + "/" + pageLink.id }
    >
    <CardContainer className="inter-var min-w-[300px]">
      <CardBody className="relative group/card dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] bg-secondary text-secondary-foreground hover:bg-secondary/80 dark:border-white/[0.2] border-black/[0.1] w-auto sm:w-[30rem] h-auto rounded-lg p-3 border flex justify-center items-center">
        <CardItem
          translateZ="50" 
          className="text-xl text-black dark:text-white w-full flex justify-center items-center min-w-80"
        >
            {pageLink.title}
        </CardItem> 
      </CardBody>
    </CardContainer>
  </Link>
  );
};

const EmptyState = ({ openModal }: { openModal: TOpenModal }) => {
  return (
    <div className="text-center mb-5">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        No page links
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by creating a new page link.
      </p>
      <div className="mt-6">
        <Button onClick={() => openModal()}>
          <PlusIcon className="h-4" /> New Page Links </Button>
      </div>
    </div>
  );
};
