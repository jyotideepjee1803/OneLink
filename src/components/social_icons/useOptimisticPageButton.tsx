import { useOptimistic } from "react";

import { type Page } from "@/lib/db/schema/pages";
import { type PageButton } from "@/lib/db/schema/pageButtons";
import { OptimisticAction } from "@/lib/utils";

export type TAddOptimistic = (action: OptimisticAction<PageButton>) => void;

export const useOptimisticPageButtons = (
  pageButtons: PageButton[],
  pages: Page[]
) => {
  const [optimisticPageButtons, addOptimisticPageButton] = useOptimistic(
    pageButtons,
    (
      currentState: PageButton[],
      action: OptimisticAction<PageButton>,
    ): PageButton[] => {
      const { data } = action;

      const optimisticPage = pages.find(
        (page) => page.id === data.pageId,
      )!;

      const optimisticPageButton = {
        ...data,
        page: optimisticPage,
        id: "optimistic",
      };

      switch (action.action) {
        case "create":
          return currentState.length === 0
            ? [optimisticPageButton]
            : [...currentState, optimisticPageButton];
        case "update":
          return currentState.map((item) =>
            item.id === data.id ? { ...item, ...optimisticPageButton } : item,
          );
        case "delete":
          return currentState.map((item) =>
            item.id === data.id ? { ...item, id: "delete" } : item,
          );
        default:
          return currentState;
      }
    },
  );

  return { addOptimisticPageButton, optimisticPageButtons };
};
