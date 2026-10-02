import { useState, useEffect }
from 'react'; import type { Letter }
from '../types'; import { fetchLetters, saveLetterToAPI } 
from '../api/api'; export const useLetters = () =>
 { const [letters, setLetters] = useState<Letter[]>([]); 
const [loading, setLoading] = useState(true); 
const [error, setError] = useState<string | null>(null);
const [saving, setSaving] = useState(false); 
const loadLetters = async () => 
{ try { setLoading(true); setError(null); 
const data = await fetchLetters(); setLetters(data); } 
catch (err) { setError(err instanceof Error ? err.message : 'Erro ao carregar cartas'); } 
finally { setLoading(false); } }; 
const saveLetter = async (letter: Letter) => { try { setSaving(true); setError(null); 
const savedLetter = await saveLetterToAPI(letter); setLetters(prev => [...prev, savedLetter]); 
return savedLetter; } catch (err) { setError(err instanceof Error ? err.message : 'Erro ao salvar carta'); throw err; } 
finally { setSaving(false); } }; useEffect(() => { loadLetters(); }, []); 
return { letters, loading, error, saving, saveLetter, refetch: loadLetters }; };