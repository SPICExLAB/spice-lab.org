# Spice Lab Site

This is the official repository for the Spice Lab website, built using Gatsby. This README provides instructions on how to set up the site for local development, update team profiles, add new projects and publications, and manage news and site text using the CMS.

## Table of Contents

1. [Local Development Setup](#local-development-setup)
2. [Updating Team Profiles](#updating-team-profiles)
3. [Adding Projects and Publications](#adding-projects-and-publications)
4. [Managing Content with the CMS](#managing-content-with-the-cms)

## Local Development Setup

To set up the project for local development, follow these steps:

1. **Clone the repository:**

   ```bash
   git clone https://github.com/SPICExLAB/spice-lab.org.git
   cd spice-lab.org
2. **Install dependencies:**
   Ensure you have Node.js and npm installed. Then run:
   
   ```bash
   npm install
4. **Start the development server:**
   This will start the Gatsby development server. Open your browser and navigate to http://localhost:8000 to view the site.
   
   ```bash
   npm run develop

## Updating Team Profiles

Team profiles are stored in the src/content/people/team.json file. Each team member is represented as an object in the JSON array. To update or add a profile, edit this file and follow the structure

### Adding Headshots
Save the headshot image in the src/content/people/headshots/ directory.
Ensure the photo field in the team.json file matches the filename of the headshot.

## Adding Projects and Publications
Projects and publications are stored as MDX files in the src/content/projects/ directory. Each project should have its own subdirectory containing an index.mdx file (this will create a project page for it) and any related images.


```
src/content/projects/MobilePoser/
├── images
│   ├── 0.png
│   ├── 1.png
│   └── 2.png
└── index.mdx
```

```
type: Specifies the type of content. For projects, it should be "project".
slug: A unique identifier for the project, used in the URL.
title: The title of the project.
subtitle: A short description or subtitle for the project.
authors: A list of authors involved in the project, plaese provide the full name.
year: The year the project was published or created.
coverImage: The path to the cover image for the project, which should be in the images folder within the same project folder.
published: A flag indicating whether the project is published. It can be 'yes' or 'no'.
award: Any awards the project has won, if none, leave it blank.
pdfLink: A link to a PDF file associated with the project, which should be in our google drive.
github: A link to the project's GitHub repository.
videoLink: A link to a video related to the project, which should be either youtube or vemo.
conference: The name of the conference where the project was presented.
conferencePage: A link to the conference page where the project is listed.
citation: The citation for the project.
bibtex: The BibTeX entry for the project.


## Managing Content with the CMS
Our site uses Decap CMS (formerly Netlify CMS) for easy content management. The CMS allows you to update news posts and certain text on the website without needing to edit the code directly.

1. **Accessing the CMS**
Go to https://yoursite.netlify.app/admin.
Log in using your Netlify Identity credentials.
2. **Updating News**
Navigate to the "News" section in the CMS.
Click "New News" to add a new news item.
Fill in the required fields and save the entry.
3. **Editing Homepage Text**
Navigate to the "Settings" section in the CMS.
Click on "Homepage" to edit the introductory paragraph.
Save your changes.
