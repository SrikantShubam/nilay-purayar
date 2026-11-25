import { defineConfig } from "tinacms";

const branch =
  process.env.TINA_BRANCH ||
  process.env.VERCEL_GIT_COMMIT_REF ||
  "main";

export default defineConfig({
  branch,
  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID || "",
  token: process.env.TINA_TOKEN || "",
  build: {
    outputFolder: "admin",
    publicFolder: "public",
  },

  // Repo-backed media. Uploads are committed to the repository rather than
  // sent to an external asset host, which is what the free Tina Cloud plan
  // supports. Files land in public/uploads and are served from /uploads.
  media: {
    tina: {
      mediaRoot: "uploads",
      publicFolder: "public",
    },
    // Images for page content, plus pdf so the CV can be uploaded here.
    // Individual fields can narrow this further, e.g. accept: "pdf".
    accept: ["image", "pdf"],
  },

  schema: {
    collections: [
      {
        name: "work",
        label: "Work Section",
        path: "content/work",
        format: "md",
        ui: { allowedActions: { create: false, delete: false } },
        fields: [
          {
            type: "object",
            name: "work",
            label: "Work Experience",
            list: true,
            ui: {
              itemProps: (item) => ({
                label:
                  item?.title && item?.company
                    ? `${item.title} — ${item.company}`
                    : "New Work Item",
              }),
              defaultItem: { title: "", company: "", description: "" },
            },
            fields: [
              { type: "string", name: "title", label: "Position Title", required: true },
              { type: "string", name: "company", label: "Company Name", required: true },
              {
                type: "string",
                name: "description",
                label: "Description",
                ui: { component: "textarea" },
              },
            ],
          },
        ],
      },
      {
        name: "projects",
        label: "Projects Section",
        path: "content/projects",
        format: "md",
        ui: { allowedActions: { create: false, delete: false } },
        fields: [
          {
            type: "object",
            name: "projects",
            label: "Projects",
            list: true,
            ui: {
              itemProps: (item) => ({
                label: item?.project_name
                  ? `${item.project_name}`
                  : "New Project",
              }),
              defaultItem: {
                project_name: "",
                short_description: "",
                domain: "",
                tools: "",
                overview: "",
                highlights: [],
              },
            },
            fields: [
              { type: "string", name: "project_name", label: "Project Name", required: true },
              {
                type: "string",
                name: "short_description",
                label: "Short Description",
                description: "One or two sentences shown on the card.",
                ui: { component: "textarea" },
              },
              { type: "string", name: "domain", label: "Domain" },
              {
                type: "string",
                name: "tools",
                label: "Tools",
                description: "Comma separated, e.g. Python, Pandas, Power BI.",
              },
              {
                type: "string",
                name: "role",
                label: "Role",
                description: "Optional. Only fill this in when your part of the project needs calling out.",
              },
              {
                type: "string",
                name: "overview",
                label: "Overview",
                ui: { component: "textarea" },
              },
              {
                type: "string",
                name: "highlights",
                label: "Highlights",
                list: true,
                ui: { component: "textarea" },
              },
              {
                type: "string",
                name: "outcome",
                label: "Outcome",
                description: "Optional.",
                ui: { component: "textarea" },
              },
            ],
          },
        ],
      },
    ],
  },
});
