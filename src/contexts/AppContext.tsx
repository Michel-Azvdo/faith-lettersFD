import { createContext, useContext, useState } 
from "react"; import type { Missionary, Letter } 
from "../types"; import { useMissionaries, useLetters, useVerses } 
from "../hooks"; interface AppContextType { loading: boolean; missionaries: Missionary[];
     letters: Letter[];
      verses: ReturnType<typeof useVerses>['verses'];
       selectedMissionary: Missionary | null; setSelectedMissionary:
        (missionary: Missionary | null) => void; refetchMissionaries: () => void; refetchLetters:
         () => void; refetchVerses: () => void; } 
    const AppContext = createContext<AppContextType | undefined>(undefined);
    export const AppContextProvider = ({ children }: { children: React.ReactNode }) =>
         { const { missionaries, loading: missionariesLoading, refetch: refetchMissionaries }
    = useMissionaries(); const { letters, loading: lettersLoading, refetch: refetchLetters }
    = useLetters(); const { verses, loading: versesLoading, refetch: refetchVerses } 
    = useVerses(); const [selectedMissionary, setSelectedMissionary] 
    = useState<Missionary | null>(null); const loading 
    = missionariesLoading || lettersLoading || versesLoading; 
        return ( <AppContext.Provider 
            value={{ loading, missionaries, letters, verses, selectedMissionary, 
                setSelectedMissionary, refetchMissionaries, refetchLetters, refetchVerses, }}
                 > {children} </AppContext.Provider> ); };
     export const useAppContext = () =>
         { const context = useContext(AppContext); 
            if (!context) { throw new Error('useAppContext deve ser usado dentro de um AppContextProvider'); }
             return context; };