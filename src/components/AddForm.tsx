import { useState, type SyntheticEvent} from "react";

type Props = {onAdd: (title: string, category: string, tags: string[]) => void};
export default function AddForm({onAdd }: Props){
    const [title, setTitle] = useState("");
    const [category, setCategory] = useState("")
    const [tags, setTags] = useState("");

    const submit = (e: SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault();// stops from relading after sending shit submit
        if(!title.trim())  return;
        onAdd(
            title.trim(),
            category.trim() || "Other",
            tags.split(",").map(t => t.trim().toLowerCase()).filter(Boolean)
        );
        setTitle("")
        setTags("")

    };
    return(
        <form onSubmit={submit} className="add-form">
            <input  placeholder="Title" value={title} onChange={e =>setTitle(e.target.value)} />
            <input placeholder="Category" value={category} onChange={e => setCategory(e.target.value)}/>
            <input placeholder="tags, comma, separated" value={tags} onChange={e => setTags(e.target.value)}/>
            <button type="submit">Add</button>
        </form>
    )
}