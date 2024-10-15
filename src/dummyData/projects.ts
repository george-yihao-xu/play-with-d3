export interface Project {
  id: number;
  name: string;
  constructionType: string;
  gsf: number;
  gsfChanges: {
    date: number;
    value: number;
  }[];
}

export const projects: Project[] = [
  {
    id: 1,
    name: "Project 1",
    constructionType: "Residential",
    gsf: 1000,
    gsfChanges: [
      // missing 2021, but will be filled with 0
      {
        date: 2023,
        value: 1200,
      },
    ],
  },
  {
    id: 2,
    name: "Project 2",
    constructionType: "Commercial",
    gsf: 1000,
    gsfChanges: [
      {
        date: 2021,
        value: 250,
      },
      {
        date: 2022,
        value: 1100,
      },
      {
        date: 2023,
        value: 1100,
      },
    ],
  },
  {
    id: 3,
    name: "Project 3",
    constructionType: "Industrial",
    gsf: 1000,
    gsfChanges: [
      {
        date: 2021,
        value: 100,
      },
      {
        date: 2022,
        value: 1200,
      },
      {
        date: 2023,
        value: 1300,
      },
    ],
  },
  {
    id: 4,
    name: "Project 4",
    constructionType: "Residential",
    gsf: 1000,
    gsfChanges: [
      {
        date: 2021,
        value: 100,
      },
      // missing 2022, but will be filled with 2021 data
      {
        date: 2023,
        value: 1100,
      },
    ],
  },
  {
    id: 5,
    name: "Project 5",
    constructionType: "Commercial",
    gsf: 1000,
    gsfChanges: [
      {
        date: 2021,
        value: 250,
      },
      {
        date: 2022,
        value: 1200,
      },
      {
        date: 2023,
        value: 1500,
      },
    ],
  },
];

export default projects;
