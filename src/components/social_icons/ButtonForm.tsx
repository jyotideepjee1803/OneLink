import { z } from "zod";

import { useRef, useState, useTransition } from "react";
import { useFormStatus } from "react-dom";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { useValidatedForm } from "@/lib/hooks/useValidatedForm";
import { type Action, cn } from "@/lib/utils";
import { type TAddOptimistic } from "@/app/(app)/page-links/useOptimisticPageLinks";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useBackPath } from "@/components/shared/BackButton";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { type PageButton, insertPageButtonParams } from "@/lib/db/schema/pageButtons";
import { createPageButtonAction, deletePageButtonAction, updatePageButtonAction } from "@/lib/actions/pageButtons";
import { type Page, type PageId } from "@/lib/db/schema/pages";

const PageButtonForm = ({
  pages,
  pageId,
  pageButton,
  openModal,
  closeModal,
  closeCreateModal,
  addOptimistic,
  title,
  byline,
  postSuccess,
}: {
  pageButton?: PageButton | null;
  pages: Page[];
  pageId?: PageId
  openModal?: (pageLink?: PageButton) => void;
  closeModal?: () => void;
  closeCreateModal? : ()=>void;
  addOptimistic?: TAddOptimistic;
  postSuccess?: () => void;
  title: string;
  byline?:string;
}) => {
  
  const { errors, hasErrors, setErrors, handleChange } =
    useValidatedForm<PageButton>(insertPageButtonParams);
  const editing = !!pageButton?.id;
  console.log(editing);
  
  const [isDeleting, setIsDeleting] = useState(false);
  const [pending, startMutation] = useTransition();

  const router = useRouter();
  const backpath = useBackPath("page-links");


  const onSuccess = (
    action: Action,
    data?: { error: string; values: PageButton },
  ) => {
    const failed = Boolean(data?.error);
    if (failed) {
      openModal && openModal(data?.values);
      toast.error(`Failed to ${action}`, {
        description: data?.error ?? "Error",
      });
    } else {
      router.refresh();
      postSuccess && postSuccess();
      toast.success(`PageButton ${action}d!`);
    }
  };

  const handleSubmit = async (data: FormData) => {
    setErrors(null);

    const payload = Object.fromEntries(data.entries());
    const pageButtonParsed = await insertPageButtonParams.safeParseAsync({ pageId, ...payload, title});
    if (!pageButtonParsed.success) {
      setErrors(pageButtonParsed?.error.flatten().fieldErrors);
      return;
    }

    closeModal && closeModal();
    closeCreateModal && closeCreateModal();
    const values = pageButtonParsed.data;
    const pendingPageLink: PageButton = {
      updatedAt: pageButton?.updatedAt ?? new Date(),
      createdAt: pageButton?.createdAt ?? new Date(),
      id: pageButton?.id ?? "",
      ...values,
    };
    try {
      startMutation(async () => {
        addOptimistic && addOptimistic({
          data: pendingPageLink,
          action: editing ? "update" : "create",
        });

        const error = editing
          ? await updatePageButtonAction({ ...values, id: pageButton.id })
          : await createPageButtonAction(values);

        const errorFormatted = {
          error: error ?? "Error",
          values: pendingPageLink 
        };
        onSuccess(
          editing ? "update" : "create",
          error ? errorFormatted : undefined,
        );
      });
    } catch (e) {
      if (e instanceof z.ZodError) {
        setErrors(e.flatten().fieldErrors);
      }
    }
  };

  return (
    <form action={handleSubmit} onChange={handleChange} className={"space-y-8"}>
      {/* Schema fields start */}
        <div>
        <Label
          className={cn(
            "mb-2 inline-block",
            errors?.url ? "text-destructive" : "",
          )}
        >
          Url
        </Label>
        <Input
          type="text"
          name="url"
          className={cn(errors?.url ? "ring ring-destructive" : "")}
          defaultValue={pageButton?.url ?? ""}
        />
        {errors?.url ? (
          <p className="text-xs text-destructive mt-2">{errors.url[0]}</p>
        ) : (
          <>
          {(byline && byline !== undefined) && <p className="text-xs mt-2">{`Example : ${byline}`}</p>}
          </>
        )}
      </div>
      
      {pageId ? null : <div>
        <Label
          className={cn(
            "mb-2 inline-block",
            errors?.pageId ? "text-destructive" : "",
          )}
        >
          Page
        </Label>
        <Select defaultValue={pageButton?.pageId} name="pageId">
          <SelectTrigger
            className={cn(errors?.pageId ? "ring ring-destructive" : "")}
          >
            <SelectValue placeholder="Select a page" />
          </SelectTrigger>
          <SelectContent>
          {pages?.map((page) => (
            <SelectItem key={page.id} value={page.id.toString()}>
              {page.id}{/* TODO: Replace with a field from the page model */}
            </SelectItem>
           ))}
          </SelectContent>
        </Select>
        {errors?.pageId ? (
          <p className="text-xs text-destructive mt-2">{errors.pageId[0]}</p>
        ) : (
          <div className="h-6"/>
        )}
      </div> }
      {/* Schema fields end */}

      {/* Save Button */}
      <SaveButton errors={hasErrors} editing={editing} />

      {/* Delete Button */}
      {editing ? (
        <Button
          type="button"
          disabled={isDeleting || pending || hasErrors}
          variant={"destructive"}
          onClick={() => {
            setIsDeleting(true);
            closeModal && closeModal();
            closeCreateModal && closeCreateModal();
            startMutation(async () => {
              addOptimistic && addOptimistic({ action: "delete", data: pageButton });
              const error = await deletePageButtonAction(pageButton.id);
              setIsDeleting(false);
              const errorFormatted = {
                error: error ?? "Error",
                values: pageButton,
              };

              onSuccess("delete", error ? errorFormatted : undefined);
            });
          }}
        >
          Delet{isDeleting ? "ing..." : "e"}
        </Button>
      ) : null}
    </form>
  );
};

export default PageButtonForm;

const SaveButton = ({
  editing,
  errors,
}: {
  editing: Boolean;
  errors: boolean;
}) => {
  const { pending } = useFormStatus();
  const isCreating = pending && editing === false;
  const isUpdating = pending && editing === true;
  return (
    <Button
      type="submit"
      className="mr-2"
      disabled={isCreating || isUpdating || errors}
      aria-disabled={isCreating || isUpdating || errors}
    >
      {editing
        ? `Sav${isUpdating ? "ing..." : "e"}`
        : `Creat${isCreating ? "ing..." : "e"}`}
    </Button>
  );
};
