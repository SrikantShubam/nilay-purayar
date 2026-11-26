import { defineConfig } from "tinacms";

const branch =
  process.env.TINA_BRANCH ||
  process.env.VERCEL_GIT_COMMIT_REF ||
  "main";

const ACCENTS = ["navy", "blue", "red"];

const ROUTES = [
  { value: "/", label: "Overview" },
  { value: "/experience", label: "Experience" },
  { value: "/projects", label: "Projects" },
  { value: "/skills", label: "Skills" },
  { value: "/education", label: "Education" },
  { value: "/contact", label: "Contact" },
];

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
                  "Full address of the live site, used for the canonical tag and share links.",
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
                ui: { component: "textarea" },
              },
              { type: "image", name: "share_image", label: "Share image", accept: "image" },
              { type: "string", name: "share_image_alt", label: "Share image alt text" },
              {
                type: "string",
                name: "x_handle",
                label: "X handle",
                description: "Including the @. Leave empty to drop it from the share tags.",
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
                  defaultItem: { label: "", href: "/" },
                },
                fields: [
                  { type: "string", name: "label", label: "Label" },
                  {
                    type: "string",
                    name: "href",
                    label: "Page",
                    options: ROUTES,
                  },
                ],
              },
              { type: "string", name: "resume_label", label: "Resume button label" },
              {
                type: "image",
                name: "resume_file",
                label: "Resume file",
                accept: "pdf",
                description: "Upload the CV as a PDF. The button links straight to it.",
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
              defaultItem: {
                label: "",
                url: "",
                handle: "",
                action_label: "Open",
                show_in_contact: true,
                show_in_footer: true,
              },
            },
            fields: [
              { type: "string", name: "label", label: "Label" },
              { type: "string", name: "url", label: "URL" },
              {
                type: "string",
                name: "handle",
                label: "Handle",
                description: "Shown on the Contact page, for example purayar-nilay.",
              },
              {
                type: "string",
                name: "action_label",
                label: "Action label",
                description: "The small link text on the Contact card, for example Connect.",
              },
              { type: "boolean", name: "show_in_contact", label: "Show in Contact" },
              { type: "boolean", name: "show_in_footer", label: "Show in Footer" },
            ],
          },
          { type: "string", name: "email", label: "Email address" },
          {
            type: "object",
            name: "profile",
            label: "Where I am",
            description: "Shown in the Overview highlights, the Contact page and the footer.",
            fields: [
              {
                type: "string",
                name: "location",
                label: "Current location",
                description: "For example: Marseille, France",
              },
              {
                type: "string",
                name: "coordinates",
                label: "Coordinates",
                description: "Optional. For example: 43.2965° N, 5.3698° E",
              },
            ],
          },
          {
            type: "object",
            name: "footer",
            label: "Footer",
            fields: [
              { type: "string", name: "heading", label: "Heading" },
              {
                type: "string",
                name: "note",
                label: "Note",
                ui: { component: "textarea" },
              },
              { type: "string", name: "credit_text", label: "Credit text" },
              { type: "string", name: "credit_name", label: "Credit name" },
              { type: "string", name: "credit_url", label: "Credit URL" },
            ],
          },
        ],
      },
      {
        name: "page",
        label: "Page Headers",
        path: "content/pages",
        format: "md",
        ui: { allowedActions: { create: false, delete: false } },
        fields: [
          { type: "string", name: "title", label: "Page", required: true, isTitle: true },
          {
            type: "string",
            name: "eyebrow",
            label: "Eyebrow",
            description: "The small red line above the heading, for example 02 / Experience.",
          },
          {
            type: "string",
            name: "heading",
            label: "Heading",
            description: "The large heading. A line break here shows as a line break.",
            ui: { component: "textarea" },
          },
          {
            type: "string",
            name: "intro",
            label: "Intro",
            ui: { component: "textarea" },
          },
          {
            type: "object",
            name: "stats",
            label: "Stats",
            description:
              "Figures counted from content, such as roles, skills and tools, are added automatically and need no entry here.",
            list: true,
            ui: {
              itemProps: (item) => ({
                label: item?.label ? `${item.value ?? ""} ${item.label}` : "New stat",
              }),
              defaultItem: { value: "", label: "", accent: "navy" },
            },
            fields: [
              { type: "string", name: "value", label: "Value" },
              { type: "string", name: "label", label: "Label" },
              { type: "string", name: "accent", label: "Colour", options: ACCENTS },
            ],
          },
          {
            type: "object",
            name: "cta",
            label: "Call to action",
            description: "Optional. The dark box at the bottom of the right pane.",
            fields: [
              { type: "string", name: "heading", label: "Heading" },
              { type: "string", name: "text", label: "Text", ui: { component: "textarea" } },
              { type: "string", name: "button_label", label: "Button label" },
            ],
          },
        ],
      },
      {
        name: "banner",
        label: "Overview Profile",
        path: "content/banner",
        format: "md",
        ui: { allowedActions: { create: false, delete: false } },
        fields: [
          {
            type: "string",
            name: "label",
            label: "Label",
            description: "The small underlined line above the name.",
          },
          {
            type: "string",
            name: "name",
            label: "Name",
            description: "A line break here shows as a line break.",
            ui: { component: "textarea" },
          },
          { type: "image", name: "photo", label: "Photo", accept: "image" },
          { type: "string", name: "photo_alt", label: "Photo alt text" },
          {
            type: "string",
            name: "intro",
            label: "Intro",
            ui: { component: "textarea" },
          },
          {
            type: "object",
            name: "strengths",
            label: "Strength bars",
            list: true,
            ui: {
              itemProps: (item) => ({ label: item?.label || "New bar" }),
              defaultItem: { label: "", note: "", percent: 70, accent: "navy" },
            },
            fields: [
              { type: "string", name: "label", label: "Label" },
              { type: "string", name: "note", label: "Note", description: "Shown on the right." },
              {
                type: "number",
                name: "percent",
                label: "Percent",
                description: "0 to 100. Sets how far the bar fills.",
              },
              { type: "string", name: "accent", label: "Colour", options: ACCENTS },
            ],
          },
        ],
      },
      {
        name: "education",
        label: "Education",
        path: "content/education",
        format: "md",
        ui: { allowedActions: { create: false, delete: false } },
        fields: [
          {
            type: "object",
            name: "entries",
            label: "Entries",
            list: true,
            ui: {
              itemProps: (item) => ({ label: item?.school || "New entry" }),
              defaultItem: { school: "", degree: "", dates: "", location: "", badge: "" },
            },
            fields: [
              { type: "string", name: "degree", label: "Degree" },
              { type: "string", name: "school", label: "School" },
              { type: "string", name: "location", label: "Location" },
              { type: "string", name: "dates", label: "Dates" },
              {
                type: "string",
                name: "badge",
                label: "Badge",
                description: "Optional. The small tag on the right, for example Dual degree.",
              },
              {
                type: "string",
                name: "details",
                label: "Details",
                list: true,
                ui: { component: "textarea" },
              },
            ],
          },
          {
            type: "object",
            name: "languages",
            label: "Languages",
            list: true,
            ui: {
              itemProps: (item) => ({
                label: item?.name ? `${item.name} — ${item.level ?? ""}` : "New language",
              }),
              defaultItem: { name: "", level: "" },
            },
            fields: [
              { type: "string", name: "name", label: "Language" },
              { type: "string", name: "level", label: "Level" },
            ],
          },
        ],
      },
      {
        name: "skill",
        label: "Skills",
        path: "content/skills",
        format: "md",
        fields: [
          { type: "string", name: "name", label: "Name", required: true, isTitle: true },
          {
            type: "string",
            name: "group",
            label: "Group",
            options: [
              "Languages and Querying",
              "Machine Learning and AI",
              "Data and Databases",
              "Business and Strategy",
            ],
          },
          {
            type: "number",
            name: "order",
            label: "Order",
            description: "Lower numbers come first inside a group.",
          },
        ],
      },
      {
        name: "tool",
        label: "Tools",
        path: "content/tools",
        format: "md",
        fields: [
          { type: "string", name: "name", label: "Name", required: true, isTitle: true },
          {
            type: "string",
            name: "group",
            label: "Group",
            options: [
              "Data and Modelling",
              "BI and Visualisation",
              "Apps and Dashboards",
              "Workflow and Platforms",
            ],
          },
          {
            type: "number",
            name: "order",
            label: "Order",
            description: "Lower numbers come first inside a group.",
          },
        ],
      },
      {
        name: "work",
        label: "Experience",
        path: "content/work",
        format: "md",
        ui: { allowedActions: { create: false, delete: false } },
        fields: [
          {
            type: "object",
            name: "work",
            label: "Roles",
            description: "Newest first. The Overview shows the top three.",
            list: true,
            ui: {
              itemProps: (item) => ({
                label:
                  item?.title && item?.company
                    ? `${item.title} — ${item.company}`
                    : "New role",
              }),
              defaultItem: {
                title: "",
                company: "",
                department: "",
                location: "",
                dates: "",
                current: false,
                description: "",
                skills: "",
                tools: "",
              },
            },
            fields: [
              { type: "string", name: "title", label: "Position Title", required: true },
              { type: "string", name: "company", label: "Company Name", required: true },
              {
                type: "string",
                name: "department",
                label: "Department",
                description: "Optional, for example AI & Innovation Department.",
              },
              { type: "string", name: "location", label: "Location" },
              {
                type: "string",
                name: "dates",
                label: "Dates",
                description: "For example: October 2026 - Present",
              },
              {
                type: "boolean",
                name: "current",
                label: "Current role",
                description:
                  "Adds the red Current tag and the arrow on the Overview. Tick it on the new role and untick the old one.",
              },
              {
                type: "string",
                name: "description",
                label: "Description",
                description: "Leave a blank line between paragraphs to split them.",
                ui: { component: "textarea" },
              },
              {
                type: "string",
                name: "skills",
                label: "Skills",
                description: "Comma separated, for example Reporting automation, Process mapping.",
              },
              {
                type: "string",
                name: "tools",
                label: "Tools",
                description: "Comma separated, for example Jira, Python.",
              },
            ],
          },
        ],
      },
      {
        name: "projects",
        label: "Projects",
        path: "content/projects",
        format: "md",
        ui: { allowedActions: { create: false, delete: false } },
        fields: [
          {
            type: "object",
            name: "projects",
            label: "Projects",
            description:
              "Drag to reorder. The Overview shows the top three, in this order.",
            list: true,
            ui: {
              itemProps: (item) => ({
                label: item?.project_name ? `${item.project_name}` : "New Project",
              }),
              defaultItem: {
                project_name: "",
                short_description: "",
                domain: "",
                category: "Analytics",
                skills: "",
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
                name: "category",
                label: "Category",
                description: "Drives the filter buttons on the Projects page.",
                options: ["Analytics", "AI", "Finance", "Strategy"],
              },
              {
                type: "string",
                name: "skills",
                label: "Skills",
                description: "Comma separated. What you did, for example Python, Regression.",
              },
              {
                type: "string",
                name: "tools",
                label: "Tools",
                description: "Comma separated. What you used it with, for example Power BI, Pandas.",
              },
              {
                type: "string",
                name: "role",
                label: "Role",
                description:
                  "Optional. Only fill this in when your part of the project needs calling out.",
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
