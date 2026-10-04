import {useEffect, useMemo, useState} from 'react';
import type {Project , Filter} from './types'
import {loadProjects, saveProjects} from './storage'
import AddForm from './components/AddForm';
import ProjectCard from './components/ProjectCard';
import './App.css'
import SettingsModal from './components/SettingsModal';
import seed from "./seed.json";
import { Settings } from 'lucide-react'
// TODO add dark mode and some colors make a seperate section and icon for json 
// TODO like the click on tag works shoud add some basic or not even basic tags so u can scan true them 
export default function App(){
          const [projects, setProjects] = useState<Project[]>(loadProjects());
          const [query, setQuery] = useState<string>("");
          const [filter,setFilter] = useState<Filter>("all");
          const [activeTag, setActiveTag] = useState<string | null>(null);
          const [showSettings, setShowSettings] = useState(false);

          useEffect(() => {saveProjects(projects)}, [projects]);// zapisuje do local storage jak się zmieni projects :< WHY

          const add = (title: string , category: string, tags: string[]) => 
          {
            setProjects(p => [...p, {id: crypto.randomUUID(), title, category, tags, done:false}])
          }
          const toggle = (id: string) => {
            setProjects(p => p.map(x => (x.id === id? {...x, done: !x.done} : x)))
          }
          const remove = (id:string) => setProjects(p => p.filter(x => x.id !== id));
          
          const clearDone = () => setProjects(p => p.map(x => ({...x, done:false})));
          // ...x kopiuje wszystkie dotychczasowe wartości 
          const resetDeafaults = () => setProjects(seed as Project[])

          const visible = useMemo(() => { // use memo is for saving components so they dont render a second time 
            const q = query.toLowerCase();
            return projects.filter(p =>
              (filter === "all" || (filter === "done") === p.done) &&
              (!activeTag || p.tags.includes(activeTag)) &&
              (p.title + " " + p.category + " " + p.tags.join(" ")).toLowerCase().includes(q)
            );
          }, [projects, query, filter, activeTag]);
          const exportJson = () => {
              const blob = new Blob([JSON.stringify(projects, null, 2)], {type: "application/json"});
              const a = document.createElement("a");
              a.href = URL.createObjectURL(blob);
              a.download = "projects.json";
              a.click();
              URL.revokeObjectURL(a.href);
            };
            const importJson = async (file: File) => {
              try{
                const data = JSON.parse(await file.text());
                if(Array.isArray(data) && data.every(p => p.id && p.title)){
                    setProjects(data);
                    setShowSettings(false);
                }
                else alert("Invalid file");
              } catch {
                alert("Invalid file");
              }
            };
          return(
            <div className="app">
              <div className='flex justify-between w-full'>
              <h1>Project Idea Saver</h1>
              <div className=''>
                <button onClick={() => setShowSettings(true)}><Settings /></button>
              </div>
              {showSettings && (
                <SettingsModal
                onClose={() => setShowSettings(false)}
                onExport={exportJson}
                onImport={importJson}
                onReset={resetDeafaults}
                onClearDone={clearDone}
                
                />
              )}
              </div>
              <AddForm onAdd={add} />
              <div className="toolbar">
                <input placeholder='Search...' value={query} onChange={e => setQuery(e.target.value)} />
                {(["all","todo","done"] as Filter[]).map(f => (
                  <button key={f} className={filter === f ? "active" : ""} onClick={() => setFilter(f)}>
                    {f}
                  </button>
                ))}
                {activeTag && <button onClick={() => setActiveTag(null)}>#{activeTag} X</button>}
              </div>
              
              
              <div className='grid'>
                {visible.map(p => (
                    <ProjectCard key={p.id} project={p} onToggle={toggle} onDelete={remove} onTagClick={setActiveTag} />
                ))}
                {visible.length === 0 && <p>No projects found.</p>}
              </div>
              {/* <div className='flex flex-col text-sm/8' >
                <button onClick={exportJson} className='inline-flex  items-center gap-1'>Export<FileBraces /></button> 
                <label htmlFor="inputbut" className='inline-flex  items-center gap-1'>Upload <FileBraces/></label><input className='hidden' id='inputbut' type="file" accept='.json' onChange={e => e.target.files?.[0] && importJson(e.target.files[0])} />
              </div> */}
              
            </div>
            )
            

          
            
        }



// TO DO read and save project form jason with tags like game itp 
// be able to add and delete projects  also search bar 
// each project is a cat picture XD 

// left side is what to chose from so like hard medium easy 
// and also is it game os or smth else 
// right is the section with all projects also 