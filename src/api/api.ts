 import type { Letter, Missionary, Verse } 
from "../types"; const API_URL = "http://localhost:3000";
export const fetchMissionaries = async (): Promise<Missionary[]> =>  
    { try { const response = await fetch(`${API_URL}/missionaries`); if (!response.ok) 
    { throw new Error("Falha ao buscar missionarios"); } 
return await response.json(); } catch (error) 
{ console.error("Erro ao buscar missionarios:", error); 
    return []; } }; export const fetchLetters = async ():
    Promise<Letter[]> => { try { const response = await fetch(`${API_URL}/letters`); 
    if (!response.ok) { throw new Error("Falha ao buscar cartas"); } return await response.json(); } 
catch (error) { console.error("Erro ao buscar cartas:", error); return []; } }; 
export const fetchVerses = async (): Promise<Verse[]> => { try { const response = 
    await fetch(`${API_URL}/verses`); if (!response.ok) { throw new Error("Falha ao buscar versiculos"); } 
    return await response.json(); } 
    catch (error) { console.error("Erro ao buscar versiculos:", error); return []; } }; 
    export const saveLetterToAPI = async (letter: Letter): Promise<Letter> => 
        { try { const response = await fetch(`${API_URL}/letters`, 
{ method: "POST", headers: { "Content-Type": "application/json", }, 
body: JSON.stringify(letter), }); 
if (!response.ok) { throw new Error("Falha ao salvar carta"); }
 return await response.json(); } catch (error) { console.error("Erro ao salvar carta:", error); 
    throw error; } };