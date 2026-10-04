export type Project = {
    id: string;
    title: string;
    category: string;
    tags: string[];
    done: boolean;
    note?: string;
}
export type Filter = "all" | "todo" | "done"
