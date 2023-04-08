import { ReactNode, createContext, useMemo, useState } from "react";

type State = {
  loading: boolean;
};

type Context = {
  state: State;
  hideLoading: () => void;
  showLoading: () => void;
};

// TODO: could be improved by using useReducer and separating action from state
export const LoaderContext = createContext<Context>({} as Context);

const LoaderDataProvider = ({ children }: { children: ReactNode }) => {
  const [state, setState] = useState<State>({} as State);

  const value = useMemo(() => {
    const hideLoading = () => setState({ loading: false });

    const showLoading = () => setState({ loading: true });

    return {
      state,
      showLoading,
      hideLoading,
    };
  }, [state]);

  return (
    <LoaderContext.Provider value={value}>{children}</LoaderContext.Provider>
  );
};

export default LoaderDataProvider;
