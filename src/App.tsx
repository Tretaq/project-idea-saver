import {useEffect, useMemo, useState} from 'react';
import type {Project , Filter} from './types'
import {loadProjects, saveProjects} from './storage'
import AddForm from './components/AddForm';
import ProjectCard from './components/ProjectCard';
import './App.css'

export default function App(){
          const [projects, setProjects] = useState<Project[]>(loadProjects());
          const [query, setQuery] = useState<string>("");
          const [filter,setFilter] = useState<Filter>("all");
          const [activeTag, setActiveTag] = useState<string | null>(null);

          useEffect(() => {saveProjects(projects)}, [projects]);// zapisuje do local storage jak się zmieni projects :< WHY
          const add = (title: string , category: string, tags: string[]) => 
          {
            setProjects(p => [...p, {id: crypto.randomUUID(), title, category, tags, done:false}])
          }
          const toggle = (id: string) => {
            setProjects(p => p.map(x => (x.id === id? {...x, done: !x.done} : x)))
          }
          const remove = (id:string) => setProjects(p => p.filter(x => x.id !== id));

            const visible = useMemo(() => {
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
                if(Array.isArray(data) && data.every(p => p.id && p.title)) setProjects(data);
                else alert("Invalid file");
              } catch {
                alert("Invalid file");
              }
            };
            return(
              <div className="app">
                <h1>Project Saver</h1>
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
                <div className='toolbar'>
                  <button onClick={exportJson}>Export JSON</button>
                  

                </div>


              </div>
            )
            

          
            
        }



// TO DO read and save project form jason with tags like game itp 
// be able to add and delete projects  also search bar 
// each project is a cat picture XD 

// left side is what to chose from so like hard medium easy 
// and also is it game os or smth else 
// right is the section with all projects also 