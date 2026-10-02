import seed from "./seed.json"
import type { Project } from "./types"

const KEY = "projects";

export function loadProjects(): Project[]{
    try{
        const raw = localStorage.getItem(KEY)
        return raw ? JSON.parse(raw) : (seed as Project[]); // ummm jeżeli w przęglądarce już jest  KEY to wczytaj tą z przeglądarki a jak nie to z pliku seed.json
        
    } catch {
        return seed as Project[];
    }
    
}
export function saveProjects(projects: Project[]){
    localStorage.setItem(KEY, JSON.stringify(projects));
}