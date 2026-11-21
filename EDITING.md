# Editing your portfolio

Open **index.html** to view the home page. Each section has its own page, and the navigation links connect them:

- `index.html` — Home
- `about.html` — About
- `projects.html` — Projects
- `experience.html` — Experience
- `skills.html` — Skills
- `contact.html` — Contact

## Update your details

Open **projects.js** in a text editor. Your name, introduction, About text, email, phone, engineering skills, software tools, experience, and social links are together near the top under `profile`. The `about` list uses one quoted entry per paragraph. Edit the text between quotes and keep the commas and brackets in place.

Edit the `skills` list for your engineering and people skills, and the `tools` list for software shown with logos on the Skills page. The `experience` fields control the role, organization, description, status, and research skills shown on the Experience page. A LinkedIn link looks like this:

```js
{ label: "LinkedIn", url: "https://www.linkedin.com/in/your-name" }
```

## Add or update projects

In the same file, find the `projects` list. Copy a complete project object, paste it after the last project (add a comma between objects), and update its fields:

```js
{
  title: "Your project title",
  course: "KIE1005 · Course title",
  category: "Coursework",
  filters: ["Circuits"],
  status: "Completed",
  summary: "A short one-sentence project overview shown before expanding the card.",
  description: "What you built or studied, what you did, and what you learned.",
  tools: ["LTspice"],
  tags: ["Circuit analysis", "PCB design"],
  visual: "PROJECT / 01",
  featured: false,
  linkLabel: "View report",
  link: ""
}
```

The short `summary` appears on the card; visitors click **View details** to read the full `description`, tools, and focus tags. The `tools` list shows software logos for supported names such as `COMSOL Multiphysics`, `MATLAB`, `Verilog`, `Arduino IDE`, `nanoHUB`, `LTspice`, `C++`, `Autodesk Tinkercad`, and `Microsoft Office`. To add a different software logo, add its image address to the `toolIcons` map in `app.js`. The `filters` list controls the project filter buttons, such as `Digital`, `Embedded`, `Signals`, `Robotics`, `Circuits`, `Software`, or `Research`. Add reports or other files in a folder beside `index.html`, then put their relative path in `link`, for example `files/report.pdf`. Leave it empty if you do not have a link yet.

Save your changes and refresh the page. All six pages read the same `projects.js`, so your shared profile details stay consistent across the site.
