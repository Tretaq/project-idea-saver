export type Project = {
    id: string;
    title: string;
    category: string;
    tags: string[];
    done: boolean;
}
export type Filter = "all" | "todo" | "done"
