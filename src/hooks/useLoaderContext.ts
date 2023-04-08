import { LoaderContext } from "@/context";
import { useContext } from "react";

export const useLoaderContext = () => {
  const context = useContext(LoaderContext);

  if (context === undefined) {
    throw new Error(
      "The useLoaderContext hook must be used within a LoaderContext.Provider"
    );
  }
  return context;
};
