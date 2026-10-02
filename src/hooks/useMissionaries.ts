import { useState, useEffect } 
from 'react'; import type { Missionary } 
from '../types'; import { fetchMissionaries } 
from '../api/api'; export const useMissionaries = () => 
    { const [missionaries, setMissionaries] = useState<Missionary[]>([]); 
        const [loading, setLoading] = useState(true); const [error, setError] = useState<string | null>(null); 
        const loadMissionaries = async () => { try { setLoading(true); setError(null); 
        const data = await fetchMissionaries(); setMissionaries(data); } 
        catch (err) { setError(err instanceof Error ? err.message : 'Erro ao carregar missionarios'); } 
        finally { setLoading(false); } }; useEffect(() => { loadMissionaries(); }, []); 
        return { missionaries, loading, error, refetch: loadMissionaries }; };