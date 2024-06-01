"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";
import { type Page, CompletePage } from "@/lib/db/schema/pages";
import Modal from "@/components/shared/Modal";

import { useOptimisticPages } from "@/app/(app)/pages/useOptimisticPages";
import { Button } from "@/components/ui/button";
import PageForm from "./PageForm";
import { PlusIcon } from "lucide-react";
import { CardBody, CardContainer, CardItem } from "../ui/3d-card";

type TOpenModal = (page?: Page) => void;

export default function PageList({
  pages,
   
}: {
  pages: CompletePage[];
   
}) {
  const { optimisticPages, addOptimisticPage } = useOptimisticPages(
    pages,
     
  );
  const [open, setOpen] = useState(false);
  const [activePage, setActivePage] = useState<Page | null>(null);
  const openModal = (page?: Page) => {
    setOpen(true);
    page ? setActivePage(page) : setActivePage(null);
  };
  const closeModal = () => setOpen(false);

  return (
    <div>
      <Modal
        open={open}
        setOpen={setOpen}
        title={activePage ? "Edit Page" : "Create Page"}
      >
        <PageForm
          page={activePage}
          addOptimistic={addOptimisticPage}
          openModal={openModal}
          closeModal={closeModal}
          
        />
      </Modal>
      <div className="absolute right-0 top-0 ">
        <Button onClick={() => openModal()} variant={"outline"}>
          +
        </Button>
      </div>
      {optimisticPages.length === 0 ? (
        <EmptyState openModal={openModal} />
      ) : (
        <ul className="flex-col justify-center mt-3">
          {optimisticPages.map((page) => (
            <Page
              page={page}
              key={page.id}
              openModal={openModal}
            />
          ))}
        </ul>
      )}
    </div>
  );
}

const Page = ({
  page,
  openModal,
}: {
  page: CompletePage;
  openModal: TOpenModal;
}) => {
  const optimistic = page.id === "optimistic";
  const deleting = page.id === "delete";
  const mutating = optimistic || deleting;
  const pathname = usePathname();
  const basePath = pathname.includes("pages")
    ? pathname
    : pathname + "/pages/";


  return (
      <Link className={`p-2 inline-block rounded-lg w-full`} href={ basePath + "/" + page.id }>
        {/* <div className="w-full">
          <div>{page.name}</div>
        </div> */}
        <CardContainer className="inter-var">
          <CardBody className="relative group/card dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] bg-secondary text-secondary-foreground hover:bg-secondary/80 dark:border-white/[0.2] border-black/[0.1] w-auto sm:w-[30rem] h-auto rounded-xl p-3 border  ">
            <CardItem
              translateZ="50" 
              className="text-xl text-black dark:text-white w-full flex justify-center items-center min-w-80"
            >
              {page.name}
            </CardItem>
          </CardBody>
        </CardContainer>
      </Link>
  );
};

const EmptyState = ({ openModal }: { openModal: TOpenModal }) => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        No pages
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by creating a new page.
      </p>
      <div className="mt-6">
        <Button onClick={() => openModal()}>
          <PlusIcon className="h-4" /> New Pages </Button>
      </div>
    </div>
  );
};
