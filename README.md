# Spice Lab Site

This is the official repository for the Spice Lab website, built using Gatsby. This README provides instructions on how to set up the site for local development, update team profiles, add new projects and publications, and manage news and site text using the CMS(only for Admins).

## Table of Contents

1. [Local Development Setup](#local-development-setup)
2. [Updating Team Profiles](#updating-team-profiles)
3. [Adding Projects and Publications](#adding-projects-and-publications)
4. [Managing Content with the CMS](#managing-content-with-the-cms)

## Local Development Setup

Please, ask Admins to add you into this repo first. To set up the project for local development, follow these steps:

1. **Clone the repository:**

   ```bash
   git clone https://github.com/SPICExLAB/spice-lab.org.git
   cd spice-lab.org
2. **Install Node.js and npm:**
You can download and install them from [Node.js official]([url](https://nodejs.org/en/download/package-manager/current)) website.

- On macOS:
   ```bash
   brew install node

- On Ubuntu:
   ```bash
   sudo apt update
   sudo apt install nodejs npm

- On Windows:
   Download the installer from Node.js official website and run it.

  After installation, verify that you have Node.js and npm installed:
   ```bash
   node -v
   npm -v

3. **Install dependencies:**
   Ensure you have Node.js and npm installed. Then run one of the following(the first one might now work as expected, I will fix later):

   ```bash
   npm install
   npm install --legacy-peer-deps


4. **Start the development server:**
   This will start the Gatsby development server. Open your browser and navigate to http://localhost:8000 to view the site.

   ```bash
   npm run develop

## Updating Team Profiles

1. **Profile information:**:
Team profiles are stored in the ```src/content/people/team.json``` file. Each team member is represented as an object in the JSON array. To update or add a profile, edit this file and follow the structure in the Json.

2. **Adding Headshots:**
Save the headshot image in the ```src/content/people/headshots/``` directory.
Ensure the photo field in the team.json file matches the filename and path of the headshot.

## Adding Projects and Publications
Projects and publications are stored as MDX files in the ```src/content/projects/``` directory. Each project should have its own subdirectory containing an index.mdx file (this will create a project page for it, so that you can add more content to show your work) and any related images. As for publication pdfs, please dump into /static/papers/.

You can start by copying ControllerPose/Pose-on-the-go. If you have multiple images to be shown at one time, you can use the `medias` field. If you just want a markdown style to display one image in a section, just use `![alt](./images/pathToImage)`.


```
src/content/projects/YourProjectName/
├── images
│   ├── 0.png
│   ├── 1.png
│   └── 2.png
└── index.mdx
```

+ ```type```: Specifies the type of content. For projects, it should be "project".
+ ```slug```: A unique identifier for the project, used in the URL.
+ ```title```: The title of the project.
+ ```subtitle```: Subtitle for the project, if none, leave it blank.
+ ```authors```: A list of authors involved in the project, plaese provide the full name. If co-first-author exists, just keep the '* 'as it displayed in the paper.
+ ```year```: The year the project was published or created.
+ ```dateAdded```: The data you add the project in YYY-MM-DD, you can leave it blank.
+ ```coverImage```: The path to the cover image for the project, which should be in the images folder within the same project folder.
+ ```published```: A flag indicating whether the project is published. It can be 'yes' or 'no'. *note: as for no, it means the paper is gong to be published, but not yet. You can upload projects after camera-ready*
+ ```ishomePage```: A flag indicating whether the project will be showcased in home page. It can be 'yes' or 'no'.
+ ```award```: Any awards the project has won, if none, leave it blank. (Best paper award and honorable mention, etc)
+ ```pdfLink```: A link to a PDF file associated with the project, link to static/papers.
+ ```github```: A link to the project's GitHub repository.
+ ```videoLink```: A link to a video related to the project, ask GPT to convert it to a embeded version.
+ ```previewLink```: the 30s preview video link, if you have (no need to convert it).
+ ```conference```: The name of the conference/journal where the project was presented.
+ ```conferencePage```: A link to the conference/journal page where the project is listed, it should be the doi link.
+ ```citation```: The citation for the project(APA style).
+ ```bibtex```: The BibTeX entry for the project. *note: make sure the indentation after you pasted it from google scholar.*

 ### More personalized content in the body:
 if you want to embed other video, check EITPoser; if you want to add gif/img gallery, check ControllerPose/Pose-on-the-go; If you want to embed a pdf, check EyeSpyVR.

## Managing Content with the CMS
Our site uses Decap CMS (formerly Netlify CMS) for easy content management. The CMS allows you to update news posts and certain text on the website without needing to edit the code directly.

1. **Accessing the CMS**
Go to ```https://spice-lab.org/admin```.
Log in using your github account(I think our lab members/admins can do that).
2. **Updating News**
Navigate to the "**News**" section in the CMS.
Click "**New News**" to add a new news item.
Fill in the required fields and save the entry(you can update more than one image).
3. **Editing Homepage Text**
Navigate to the "**Settings**" section in the CMS.
Click on "**Homepage**" to edit the introductory paragraph.
Save your changes.
