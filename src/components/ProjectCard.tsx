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
            {project.tags.map(t => (
                
            <span key={t} className="tag" onClick={() => onTagClick(t)}>#{t}</span>
        ))}
        </div>
    </div>
    );
}