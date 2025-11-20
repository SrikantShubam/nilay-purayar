// import { defineConfig } from "tinacms";

// export default defineConfig({
//   branch: "main",
//   clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID || "",
//   token: process.env.TINA_TOKEN || "",
//   build: {
//     outputFolder: "admin",
//     publicFolder: "public",
//   },
 
//   schema: {
//     collections: [
//       {
//         name: "work",
//         label: "Work Section",
//         path: "content/work",
//         format: "md",
//         // We only want a single file in this folder; no new docs:
//         ui: { allowedActions: { create: false, delete: false } },
//         fields: [
//           {
//             type: "object",
//             name: "work",
//             label: "Work Experience",
//             list: true, // <-- THIS enables add/remove multiple items
//             ui: {
//               itemProps: (item) => ({
//                 label: item?.title && item?.company
//                   ? `${item.title} — ${item.company}`
//                   : "New Work Item",
//               }),
//               defaultItem: {
//                 title: "",
//                 company: "",
//                 description: "",
//               },
//             },
//             fields: [
//               { type: "string", name: "title", label: "Position Title", required: true },
//               { type: "string", name: "company", label: "Company Name", required: true },
//               // Use a multiline textarea (keeps it simple inside MD frontmatter)
//               { type: "string", name: "description", label: "Description", ui: { component: "textarea" } },
//             ],
//           },
//         ],
//       },
//     ],
//   },
// });












import { defineConfig } from "tinacms";

export default defineConfig({
  branch: "main",
  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID || "",
  token: process.env.TINA_TOKEN || "",
  build: { outputFolder: "admin", publicFolder: "public" },

  schema: {
    collections: [
      /* WORK (unchanged) */
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
              { type: "string", name: "description", label: "Description", ui: { component: "textarea" } },
            ],
          },
        ],
      },

      /* PROJECTS (underscore names) */
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
                label: item?.project_name ? `${item.project_name}` : "New Project",
              }),
              defaultItem: {
                project_name: "",
                short_description: "",
                long_description: "",
              },
            },
            fields: [
              { type: "string", name: "project_name", label: "Project Name", required: true },
              { type: "string", name: "short_description", label: "Short Description", ui: { component: "textarea" } },
              { type: "string", name: "long_description", label: "Long Description", ui: { component: "textarea" } },
            ],
          },
        ],
      },
    ],
  },
});
