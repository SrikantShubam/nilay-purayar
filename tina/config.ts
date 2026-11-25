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
        name: "settings",
        label: "Site Settings",
        path: "content/settings",
        format: "md",
        ui: { allowedActions: { create: false, delete: false } },
        fields: [
          {
            type: "object",
            name: "seo",
            label: "SEO and sharing",
            fields: [
              {
                type: "string",
                name: "site_url",
                label: "Site URL",
                description:
                  "Used for the canonical link and share previews. Falls back to the Vercel address if this is not a valid https URL.",
              },
              { type: "string", name: "title", label: "Browser tab title" },
              { type: "string", name: "site_name", label: "Site name" },
              {
                type: "string",
                name: "description",
                label: "Search description",
                ui: { component: "textarea" },
              },
              { type: "string", name: "keywords", label: "Keywords", list: true },
              {
                type: "string",
                name: "share_description",
                label: "Share description",
                description: "Shown when the link is posted on social sites.",
                ui: { component: "textarea" },
              },
              { type: "image", name: "share_image", label: "Share image", accept: "image" },
              { type: "string", name: "share_image_alt", label: "Share image alt text" },
              {
                type: "string",
                name: "x_handle",
                label: "X handle",
                description: "Optional, including the @.",
              },
            ],
          },
          {
            type: "object",
            name: "navbar",
            label: "Navbar",
            fields: [
              { type: "string", name: "logo_text", label: "Logo text" },
              {
                type: "object",
                name: "menu_items",
                label: "Menu items",
                list: true,
                ui: {
                  itemProps: (item) => ({ label: item?.label || "New menu item" }),
                },
                fields: [
                  { type: "string", name: "label", label: "Label" },
                  {
                    type: "string",
                    name: "section",
                    label: "Section",
                    options: ["home", "about", "work", "projects", "contact"],
                  },
                ],
              },
              { type: "string", name: "resume_label", label: "Resume button label" },
              {
                type: "image",
                name: "resume_file",
                label: "Resume file",
                description: "Upload a PDF. The Resume button always serves this file.",
                accept: "pdf",
              },
            ],
          },
          {
            type: "object",
            name: "socials",
            label: "Social links",
            list: true,
            ui: {
              itemProps: (item) => ({ label: item?.label || "New link" }),
            },
            fields: [
              { type: "string", name: "label", label: "Label" },
              { type: "string", name: "url", label: "URL" },
              { type: "boolean", name: "show_in_contact", label: "Show in Contact" },
              { type: "boolean", name: "show_in_footer", label: "Show in Footer" },
            ],
          },
          { type: "string", name: "email", label: "Email address" },
          {
            type: "object",
            name: "footer",
            label: "Footer",
            fields: [
              { type: "string", name: "credit_text", label: "Credit text" },
              { type: "string", name: "credit_name", label: "Credit name" },
              { type: "string", name: "credit_url", label: "Credit URL" },
            ],
          },
        ],
      },
      {
        name: "banner",
        label: "Banner",
        path: "content/banner",
        format: "md",
        ui: { allowedActions: { create: false, delete: false } },
        fields: [
          { type: "string", name: "name", label: "Name", description: "The large heading at the top of the page." },
          {
            type: "string",
            name: "hero_text",
            label: "Hero text",
            description: "Runs on into the highlighted phrase below, so leave it unfinished.",
            ui: { component: "textarea" },
          },
          {
            type: "string",
            name: "highlighted_text",
            label: "Highlighted phrase",
            description: "Shown in the accent colour at the end of the hero sentence.",
          },
        ],
      },
      {
        name: "about",
        label: "About Section",
        path: "content/about",
        format: "md",
        ui: { allowedActions: { create: false, delete: false } },
        fields: [
          { type: "string", name: "tagline", label: "Tagline" },
          { type: "string", name: "label", label: "Section label" },
          { type: "string", name: "text", label: "Text", ui: { component: "textarea" } },
        ],
      },
      {
        name: "contact",
        label: "Contact Section",
        path: "content/contact",
        format: "md",
        ui: { allowedActions: { create: false, delete: false } },
        fields: [
          { type: "string", name: "label", label: "Section label" },
          { type: "string", name: "text", label: "Text", ui: { component: "textarea" } },
        ],
      },
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
