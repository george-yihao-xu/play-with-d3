export interface Project {
    id: number;
    name: string;
    constructionType: string;
}   

export const projects: Project[] = [
    {
        id: 1,
        name: "Project 1",
        constructionType: "Residential",
    },
    {
        id: 2,
        name: "Project 2",
        constructionType: "Commercial",
    },
    {
        id: 3,
        name: "Project 3",
        constructionType: "Industrial",
    },
    {
        id: 4,
        name: "Project 4",
        constructionType: "Residential",
    },
    {
        id: 5,
        name: "Project 5",
        constructionType: "Commercial",
    },
];

export default projects;
