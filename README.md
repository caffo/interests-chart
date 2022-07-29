### Interests-Chart
- Node.js 16.X script that pulls information from Primary Interests.html page
- Creates Yearly Calendars based on the pulled information
- Appends the Calendars to the original Primary Interests.html page

### Prerequisites
- Node v 16.x.x / 14.x.x
- NPM v 6.x.x
- node-html-parser

### Github Action To Automate the Script Workflow
- The action Primary-Interests-Chart - YAML  
    ````
    # This is a basic workflow that is manually triggered

    name: Primary-Interests-Charts

    # Controls when the action will run. Workflow runs when manually triggered using the UI
    # or API.
    on:
      workflow_dispatch:

    # A workflow run is made up of one or more jobs that can run sequentially or in parallel
    jobs:
      pullInterests:
       # The type of runner that the job will run on
        runs-on: windows-latest

        # Steps represent a sequence of tasks that will be executed as part of the job
          steps:
          # Checks-out your repository under $GITHUB_WORKSPACE, so your job can access it
            - uses: actions/checkout@v3

            # Runs a set of commands using the runners shell
            - run: npm ci & npm run dev
      
            - uses: stefanzweifel/git-auto-commit-action@v4
              with:
                commit_message: Apply HTML changes to Primary Interests.html
    ````
- The action when triggered manually, checks out the branch, cache installs the npm dependencies and executes the pullInterests.js script.
- After the script execution, the action automatically commits the changes to current repository with Primary Interests.html being overridden with new content     containing the Yearly Calendars.
- On git pull in the repository, one can view the modified Primary Interests.html file.

### Steps to Trigger the Workflow
- Go to Actions tab in the repository,
- Select Primary-Interests-Charts Workflow
- Click on Run Workflow
