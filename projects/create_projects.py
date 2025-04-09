import os

# Base directory for the portfolio
base_dir = r"c:\Users\ajgru\Documents\MEEN 357\AlexGrusinPortfolio\projects"

# List of project names
projects = [
    "custom-cybertruck",
    "hybrid-racecar",
    "scissor-lift",
    "machined-hammer",
    "hydrolysis-power-cell",
    "custom-electric-skateboard",
    "restomod-3000gt-vr4"
]

# HTML template for placeholder files
html_template = """<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>{title} | Alex Grusin</title>
    <script src="https://cdn.tailwindcss.com"></script>
  </head>
  <body class="bg-gray-100 text-gray-900 font-sans">
    <nav class="bg-white shadow p-4">
      <a href="../../index.html" class="text-blue-600 hover:underline">&larr; Back to Home</a>
    </nav>
    <main class="max-w-4xl mx-auto px-6 py-12">
      <h1 class="text-3xl font-bold mb-4">{title}</h1>
      <p class="text-lg">Placeholder content for the {title} project.</p>
    </main>
  </body>
</html>
"""

# Create folders and files
for project in projects:
    project_dir = os.path.join(base_dir, project)
    os.makedirs(project_dir, exist_ok=True)  # Create the project folder
    html_content = html_template.format(title=project.replace("-", " ").title())
    with open(os.path.join(project_dir, "index.html"), "w") as file:
        file.write(html_content)

print("Folders and placeholder files created successfully!")