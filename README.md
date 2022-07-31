### Interests-Chart
- Node.js 16.X script that pulls information from Primary Interests.html page
- Creates Yearly Calendars based on the pulled information
- Appends the Calendars to the original Primary Interests.html page
- The Original HTML files are kept under test directory. The output will be generated in Primary Interests.html under test directory.

### Prerequisites
- Node v 16.x.x / 14.x.x
- NPM v 6.x.x
- node-html-parser

### Github Action To Automate the Script Workflow
- The action Primary-Interests-Chart - YAML  
    ````
    # This is a basic workflow to help you get started with Actions

    name: primary-interests-puller
    description: This action pulls interests from HTML Page and Saves output into another HTML Page.

    branding: 
      icon: 'activity'
      color: 'green'

    # Controls when the workflow will run
    on:
    # Allows you to run this workflow manually from the Actions tab
      workflow_dispatch:

    # A workflow run is made up of one or more jobs that can run sequentially or in parallel
    runs:
      using: 'node12'
      main: 'pullInterests.js'
    ````
- After the script execution, the action automatically commits the changes to current repository with Primary Interests.html being overridden with new content, containing the Yearly Calendars.
- On git pull, one can view the modified Primary Interests.html file.

### Steps to Trigger the Workflow
- To Trigger this Action, use code below 

