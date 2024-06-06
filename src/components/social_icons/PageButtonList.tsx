"use client";

import { useOptimistic, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { OptimisticAction, cn } from "@/lib/utils";
import { type PageButton, } from "@/lib/db/schema/pageButtons";
import Modal from "@/components/shared/Modal";
import { type Page, type PageId } from "@/lib/db/schema/pages";
import { useOptimisticPageButtons } from "./useOptimisticPageButton";
import { Button } from "@/components/ui/button";
import PageButtonForm from "./ButtonForm";
import { ChevronRight, PlusIcon } from "lucide-react";
import { CardBody, CardContainer, CardItem } from "../ui/3d-card";
import { FaGithub, FaInstagram, FaLinkedinIn, FaSnapchat, FaTwitter, FaXTwitter } from "react-icons/fa6";
import { LiaTelegramPlane } from "react-icons/lia";

type TOpenModal = (pageButton?: PageButton) => void;
type TAddOptimistic = (action: OptimisticAction<PageButton>) => void;

export default function PageButtonList({
  pageButtons,
  pages,
  pageId 
}: {
  pageButtons: PageButton[];
  pages: Page[];
  pageId?: PageId 
}) {
  const { optimisticPageButtons, addOptimisticPageButton } = useOptimisticPageButtons(
    pageButtons,
    pages 
  );
  const [open, setOpen] = useState(false);
  
  const [activePageButton, setActivePageButton] = useState<PageButton | null>(null);
  const openModal = (pageButton?: PageButton) => {
    setOpen(true);
    pageButton ? setActivePageButton(pageButton) : setActivePageButton(null);
  };
  const closeModal = () => setOpen(false);

  const [openCreate, setOpenCreate] = useState(false);
  const [buttonTitle, setButtonTitle] = useState("");
  const openCreateModal = (pageButton?: PageButton) => {
    setOpenCreate(true);
    pageButton ? setActivePageButton(pageButton) : setActivePageButton(null);
  };
  const closeCreateModal = () => setOpenCreate(false);

  const SocialButtons = [
    {title : 'LinkedIn', icon : <FaLinkedinIn/>},
    {title : 'Github', icon : <FaGithub/>},
    {title : 'Instagram', icon : <FaInstagram/>},
    {title : 'Telegram', icon : <LiaTelegramPlane/>},
    {title : 'Snapchat', icon : <FaSnapchat/>},
    {title : 'Twitter', icon : <FaXTwitter/>},
  ]

  const filteredSocialButtons = SocialButtons.filter(socialButton =>
    !pageButtons.map(pageButton => pageButton.title).includes(socialButton.title)
  );

  return (
    <div>
      <Modal
        open={openCreate}
        setOpen={setOpenCreate}
        title={"Create Page Button"}
      >
        <PageButtonForm
          pageButton={activePageButton}
          addOptimistic={addOptimisticPageButton}
          openModal={openCreateModal}
          closeCreateModal={closeCreateModal}
          closeModal={closeModal}
          pages={pages}
          title={buttonTitle}
          pageId={pageId}
        />
      </Modal>

      <Modal
        open={open}
        setOpen={setOpen}
        title={activePageButton ? "Edit Page Button" : "Create Page Button"}
      >
        <div>
          <div className="overflow-y-scroll">
            {
              filteredSocialButtons.map((item, index)=>{
                return(
                  <div 
                  key={index} 
                  className="flex items-center justify-between p-3 dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] h-10 text-secondary-foreground hover:bg-secondary dark:border-white/[0.2] border-black/[0.1] rounded-lg m-2"
                  onClick={()=>{
                    setButtonTitle(item.title);
                    openCreateModal();
                  }}
                  >
                      <div className="flex items-center">
                        <div className="mr-3">{item.icon}</div>
                        <div>{item.title}</div>
                      </div>
                      <div><ChevronRight className="h-5 w-5"/></div>
                  </div>
                )
              })
            }

          </div>
        </div>
      </Modal>

      <div className="absolute right-0 top-0 ">
        <Button onClick={() => openModal()} variant={"outline"}>
          +
        </Button>
      </div>
      {optimisticPageButtons.length === 0 ? (
        <EmptyState openModal={openModal} />
      ) : (
        <ul>
          {optimisticPageButtons.map((pageButton) => {
            return (
            <PageButton
              pageButton={pageButton}
              key={pageButton.id}
              openModal={openModal}
              pages={pages}
              pageId={pageId}
            />
            )
          })}
        </ul>
      )}
    </div>
  );
}

const PageButton = ({
  pageButton,
  openModal,
  pages,
  pageId
}: {
  pageButton: PageButton;
  openModal: TOpenModal;
  pages: Page[];
  pageId?: PageId 
}) => {

  const [editOpen, setEditOpen] = useState(false);
  const openEditModal = (pageButton?: PageButton) => {
    setEditOpen(true);
  };
  const closeEditModal = () => setEditOpen(false);

  const [optimisticPageButton, setOptimisticPageButton] = useOptimistic(pageButton);
  const updatePageButton: TAddOptimistic = (input) =>
    setOptimisticPageButton({ ...input.data });

  const optimistic = pageButton.id === "optimistic";
  const deleting = pageButton.id === "delete";
  const mutating = optimistic || deleting;

  return (
    
    <div className={cn("p-2 inline-block rounded-lg w-full",
    mutating ? "opacity-0 animate-pulse" : "",
    deleting ? "text-destructive" : "",)} 
    style={{
      pointerEvents: mutating||deleting ? "none" : "auto",
      cursor : 'pointer'
    }}
    aria-disabled={mutating || deleting} 
    onClick={() => openEditModal()}
    >
      <Modal
        open={editOpen}
        setOpen={setEditOpen}
        title={"Edit"}
      >
        <PageButtonForm
          pageButton={optimisticPageButton}
          addOptimistic={updatePageButton}
          openModal={openEditModal}
          closeModal={closeEditModal}
          pages={pages}
          title={optimisticPageButton.title}
          pageId={pageId}
        />
      </Modal>
      <CardContainer className="inter-var">
        <CardBody className="relative group/card dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] bg-secondary text-secondary-foreground hover:bg-secondary/80 dark:border-white/[0.2] border-black/[0.1] w-auto sm:w-[30rem] h-auto rounded-lg p-3 border flex justify-center items-center">
          <CardItem
              translateZ="50" 
              className="text-md text-black dark:text-white w-full flex justify-center items-center"
            >
              {pageButton.title}
          </CardItem> 
        </CardBody>
      </CardContainer>
  </div>
  );
};

const EmptyState = ({ openModal }: { openModal: TOpenModal }) => {
  return (
    <div className="text-center mb-5">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        No page buttons
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by creating a new page button.
      </p>
      <div className="mt-6">
        <Button onClick={() => openModal()}>
          <PlusIcon className="h-4" /> New Page Buttons </Button>
      </div>
    </div>
  );
};
