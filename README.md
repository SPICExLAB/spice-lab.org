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
3. **Start the development server:**
        ```bash
        npm run develop
This will start the Gatsby development server. Open your browser and navigate to http://localhost:8000 to view the site.

## Updating Team Profiles

Team profiles are stored in the src/content/people/team.json file. Each team member is represented as an object in the JSON array. To update or add a profile, edit this file and ensure structure:

### Adding Headshots
Save the headshot image in the src/content/people/headshots/ directory.
Ensure the photo field in the team.json file matches the filename of the headshot.

## Adding Projects and Publications
Projects and publications are stored as MDX files in the src/content/projects/ directory. Each project should have its own subdirectory containing an index.mdx file (this will create a project page for it) and any related images.

src/content/projects/MobilePoser/
├── images
│   ├── 0.png
│   ├── 1.png
│   └── 2.png
└── index.mdx

    ---
    type: "project"
    slug: MobilePoser
    title: MobilePoser
    subtitle: A Mobile App for Facial Expression Recognition
    authors:
    - John Doe
    - Chenfeng Gao
    year: 2024
    coverImage: './images/0.png'
    published: 'yes'
    award: 'Best Paper Award'
    pdfLink: '/pdfs/project1.pdf'
    github: 'https://github.com/threedle/3d-paintbrush'
    videoLink: 'https://www.youtube.com/embed/W_BAASi9LG4?si=gwxwrPUR5eZkNpc9'
    conference: 'Proceedings of the Annual ACM Conference on Human Factors in Computing Systems (CHI)'
    conferencePage: 'https://dl.acm.org/doi/10.1145/3491102.3502069'
    citation: "Craig Shultz, Daehwa Kim, Karan Ahuja, and Chris Harrison. 2022. TriboTouch: Micro-Patterned Surfaces for Low Latency Touchscreens. In CHI Conference on Human Factors in Computing Systems (CHI '22). Association for Computing Machinery, New York, NY, USA, Article 347, 1–13. https://doi.org/10.1145/3491102.3502069"
    bibtex: |
    @article{park2021nerfies,
        author = {Park, Keunhong and Sinha, Utkarsh and Barron, Jonathan T. and Bouaziz, Sofien and Goldman, Dan B and Seitz, Steven M. and Martin-Brualla, Ricardo},
        title = {Nerfies: Deformable Neural Radiance Fields},
        journal = {ICCV},
        year = {2021}
    }
    ---


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
