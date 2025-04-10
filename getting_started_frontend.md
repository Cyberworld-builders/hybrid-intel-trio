## Notes 

### Frontend React Scaffolding
- need to upgrade npm
    - `npm install -g npm@11.3.0`
- i created the repo first so i'll need to run create react app in the existing directory
    - `npx create-react-app .`
    - needed to force
        - `npx create-react-app . --force`
    - still giving issues.
        - moved the markdown file temporarily to get through the process. i just want to keep moving forward.
- react scaffolding is up
    - ![Image](https://github.com/user-attachments/assets/10f68a23-1f4a-4c22-8575-7dac0d3f8ca0)


### Firebase Backend
I'm just doing this in the console and CLI for now. I have some interesting Terraform work, but it's not ready. More on that later.
- started a project in the console
- added billing account
- i've reached my quota. need to unlink a project
    - actually, i'm going to reuse the legendarium project for now. i could see these two sharing a lot of resources anyway and i'm not even doing anything with legendarium at the moment.
    - i could also see legendarium being a parent of hybrid intel and other initiateves like it.
    - ok nevermind. i added a new billing account for legendarium and i'm still putting it all in the same place.
- enabled storage
    - enable apis
    - created default storage bucket
    - using default settings
    - 
- cloud functions
    - enabled cloud functions
    - install firebase tools 
        - `npm install -g firebase-tools`
        - `firebase init` (not yet)
        - `firebase deploy` (not yet)
- create web app
    - registered and copied the js snippet
    - doing firebase init
        - chose functions and storage
        - use an existing project
        - having trouble connecting to storage 

![Image](https://github.com/user-attachments/assets/4e61b885-2e0f-4bac-b018-f1d5ba4b5bfe)

## Notes 

### Frontend React Scaffolding
- need to upgrade npm
    - `npm install -g npm@11.3.0`
- i created the repo first so i'll need to run create react app in the existing directory
    - `npx create-react-app .`
    - needed to force
        - `npx create-react-app . --force`
    - still giving issues.
        - moved the markdown file temporarily to get through the process. i just want to keep moving forward.
- react scaffolding is up
    - ![Image](https://github.com/user-attachments/assets/10f68a23-1f4a-4c22-8575-7dac0d3f8ca0)


### Firebase Backend
I'm just doing this in the console and CLI for now. I have some interesting Terraform work, but it's not ready. More on that later.
- started a project in the console
- added billing account
- i've reached my quota. need to unlink a project
    - actually, i'm going to reuse the legendarium project for now. i could see these two sharing a lot of resources anyway and i'm not even doing anything with legendarium at the moment.
    - i could also see legendarium being a parent of hybrid intel and other initiateves like it.
    - ok nevermind. i added a new billing account for legendarium and i'm still putting it all in the same place.
- enabled storage
    - enable apis
    - created default storage bucket
    - using default settings
    - 
- cloud functions
    - enabled cloud functions
    - install firebase tools 
        - `npm install -g firebase-tools`
        - `firebase init` (not yet)
        - `firebase deploy` (not yet)
- create web app
    - registered and copied the js snippet
    - doing firebase init
        - chose functions and storage
        - use an existing project
        - having trouble connecting to storage 

![Image](https://github.com/user-attachments/assets/4e61b885-2e0f-4bac-b018-f1d5ba4b5bfe)

        - ok sweet, we're connected
        - i was missing the storage import and export in `firebase.js`

![Image](https://github.com/user-attachments/assets/83f760f3-0fe9-44f9-bd9e-a7ddae2306c4)