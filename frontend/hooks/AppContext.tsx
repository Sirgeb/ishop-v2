import { createContext, useContext } from "react";
import { MeQuery, useMeQuery } from "../generated";

export type IAppCtx = {
  userData: {
    loading: boolean;
    data: MeQuery | undefined;
  }
}

const AppCtx = createContext<IAppCtx | null>(null);;

const AppContext = ({ children }: any) => {
  const { data, loading } = useMeQuery();

  let userData: IAppCtx["userData"] = { data, loading };

  return (
    <AppCtx.Provider value={{
      userData
    }}>
      {children}
    </AppCtx.Provider>
  )
}

export const useUserData = () => {
  const data = useContext(AppCtx);
  return data && data.userData;
};

export default AppContext;
