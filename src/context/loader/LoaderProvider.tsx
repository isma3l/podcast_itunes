import { ReactNode, createContext, useMemo, useState } from "react";

type State = {
  loading: boolean;
};

type Context = {
  state: State;
  onLoadingChange: () => void;
};

export const LoaderContext = createContext<Context>({} as Context);

const LoaderDataProvider = ({ children }: { children: ReactNode }) => {
  const [state, setState] = useState<State>({} as State);

  const value = useMemo(() => {
    const onLoadingChange = () => {
      setState((prev) => ({ loading: !prev.loading }));
    };

    return {
      state,
      onLoadingChange,
    };
  }, [state]);

  return (
    <LoaderContext.Provider value={value}>{children}</LoaderContext.Provider>
  );
};

export default LoaderDataProvider;
