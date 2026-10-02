import React, { useState, type SyntheticEvent} from "react";

type Props = {onAdd: (title: string, category: string, tags: string[]) => void};
export default function AddForm({onAdd }: Props){
    const [title, setTitle] = useState("");
    const [category, setCategory] = useState("Practical")
    const [tags, setTags] = useState("");
    const submit = (e: SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault();// stops from relading after sending shit submit
        if(!title.trim())  return;
        onAdd(
            title.trim(),
            category.trim() || "Other",
            tags.split(",").map(t => t.trim())
        )

    }
}