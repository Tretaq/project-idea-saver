import type { Project } from "../types";

type Props = {
    project: Project;
    onToggle: (id: string) => void;
    onDelete:(id: string) => void;
    onTagClick: (tag: string) => void;

};

export default function ProjectCard({project , onToggle, onDelete, onTagClick }: Props){
    return(
    <div className={`card ${project.done ? "done" : ""}`}>
        <div className="card-head">
        <input type="checkbox" checked={project.done} onChange={() => onToggle(project.id)} />
        <h3>{project.title}</h3>
        <button onClick={() => confirm("Delete?") && onDelete(project.id)}>X</button>
        </div>
        {/* where is the red yellow blue purpleeeeee */}
        <small>{project.category}</small>
        <div className="tags">
            {project.tags.map(t => {
                const whatisit = t.toLowerCase();
            if(whatisit == "easy"){
                return(<span key={t} className="tag, bg-green-100 , rounded-4xl" onClick={() => onTagClick(t)}>#{t}</span>)
            } else if(whatisit == "medium"){
                return(<span key={t} className="tag, bg-yellow-100 , rounded-2xl" onClick={() => onTagClick(t)}>#{t}</span>)
            }else if(whatisit == "difficult"){
                return(<span key={t} className="tag, bg-red-100 , rounded-2xl" onClick={() => onTagClick(t)}>#{t}</span>)
            }else if(whatisit == "fuck you"){
                return(<span key={t} className="tag, bg-purple-100 , rounded-2xl" onClick={() => onTagClick(t)}>#{t}</span>)
            }
            else{
                return(<span key={t} className="tag, bg-gray-200 , rounded-xs" onClick={() => onTagClick(t)}>#{t}</span>)
            }
            })}
        </div>
        {project.note && <p className="text-sm opacity-70">{project.note}</p>}

    </div>
    );
}