 import { useState, useEffect } 
 from 'react'; import type { Verse } 
 from '../types'; import { fetchVerses } 
 from '../api/api'; export const useVerses = () => 
    { const [verses, setVerses] = useState<Verse[]>([]); 
        const [loading, setLoading] = useState(true); 
        const [error, setError] = useState<string | null>(null);
        const loadVerses = async () => { try { setLoading(true); setError(null); 
        const data = await fetchVerses(); setVerses(data); } 
        catch (err) { setError(err instanceof Error ? err.message : 'Erro ao carregar versiculos'); } 
        finally { setLoading(false); } }; useEffect(() =>
             { loadVerses(); }, []); return { verses, loading, error, refetch: loadVerses }; };
