![nav_logo_orange](https://github.com/agalev/FitPursuit/assets/17399666/26c1bb41-b20a-47ed-84fe-1ed6b6c303c4)
### Join teams and compete with others for prizes!
### Check out the live app ~> https://fit-pursuit.vercel.app

# <img src="https://media2.giphy.com/media/QssGEmpkyEOhBCb7e1/giphy.gif?cid=ecf05e47a0n3gi1bfqntqmob8g9aid1oyj2wr3ds3mg700bl&rid=giphy.gif" width ="25"> Tech Stack & Dependencies
![Next JS](https://img.shields.io/badge/Next-black?style=for-the-badge&logo=next.js&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Python](https://img.shields.io/badge/python-3670A0?style=for-the-badge&logo=python&logoColor=ffdd54)
![Flask](https://img.shields.io/badge/flask-%23000.svg?style=for-the-badge&logo=flask&logoColor=white)
![Postgres](https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white)
![AWS](https://img.shields.io/badge/AWS-%23FF9900.svg?style=for-the-badge&logo=amazon-aws&logoColor=white)
![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white)

FitPursuit is a fitness app powered by Strava allowing users to join teams and compete with others for prizes while tracking their fitness activities and progress towards their goals. This is my capstone project and the culmination of my time at Flatiron School. I devoted 6 weeks to implement each step of the software development lifecycle. I faced and overcame numerous challenges while incorporating features like oAuth, encryption, sessions, global state, dark/light automatic theme switching, cutting edge libraries & frameworks still in beta, cron jobs, dockerizing and deploying a container to AWS to name a few.

As an avid Strava user myself, my idea was to comprise a database of personal, live data that can be easily synced and accessed. My focus was on creating a visually appealing user experience, gamifying competitions with the implementation of a virtual currency, providing a sense of community in the form of a Teams functionality and presenting the opportunity to communicate through a messaging system. To accomplish that, I leveraged responsive design, accessibility fundamentals, the power of Object Oriented Programming to control & transform data, utilized an Object Relational Mapping methodology and made use of `SQL` to communicate with a `Postgres` database.

Here is a diagram of the relationships established between the tables for this project:

![FitPursuit Database table relations](https://github.com/agalev/FitPursuit/assets/17399666/8eb933ad-3411-4e42-845c-77dc96661871)

The application utilizes the publicly available [`Strava API`](https://developers.strava.com) for fetching `profile` and `activities` data into the application. The data is then stored remotely in a `Postgres` database instance hosted on AWS RDS. `SQL` queries and commands are handled through the powerful ORM module `SQLAlchemy`. Version control on DB was implemented through `Alembic`. With the help of `Pandas` module, I then used the data to aggregate some additional stats that are not part of the original Strava application.

### Future goals include:

❖ Incorporate websockets for the `Messenger` page

❖ Implement a global chat

❖ Implement activities data from different sources: Apple's HealthKit API and Android's equivalent

❖ Develop a mobile application with `React Native`

❖ Rework backend with a different framework (Python+Django or Java+Spring Boot)

# <img src="https://media2.giphy.com/media/QssGEmpkyEOhBCb7e1/giphy.gif?cid=ecf05e47a0n3gi1bfqntqmob8g9aid1oyj2wr3ds3mg700bl&rid=giphy.gif" width ="25"> User Stories

### You are welcome to follow along with the user stories. Visit the following url to access the live application ~> https://fit-pursuit.vercel.app

❖ Upon visiting the front page, users are greeted with a brief explanation of what `FitPursuit` is, a mission statement and the purpose of the application

*Front Page(unauthenticated)*
![Front Page](https://github.com/agalev/FitPursuit/assets/17399666/29f044ed-a516-4415-9595-9aebd65e3b8b)

❖ Unauthenticated users can navigate to either `Login` or `Signup` pages by clicking nav links on the nav bar at the top. Alternatively, a Call To Action button is also present at the front page that routes to `/login`

❖ On the `Login` page users are presented with the option to connect to the application using their Strava account, or enter an email/password to login

*Login Page*
![Login Page](https://github.com/agalev/FitPursuit/assets/17399666/9381b2ce-d2cb-495d-889d-7d2c081f2b19)

❖ On the `Signup` page users are once again prompted to connect to the application using their Strava account, or alternatively fill a form with their information. When submitted, the data is sent to the backend, an account is created with the provided data in the database and the user is logged in

*Signup Page*
![Signup Page](https://github.com/agalev/FitPursuit/assets/17399666/be3e6b39-c4fa-4290-9b60-b69d23965206)

❖ Validation of inputs is presented in a toast format at the bottom right corner, signaling errors in user's input

*Toast Error Notification*

![Toast](https://github.com/agalev/FitPursuit/assets/17399666/66e43460-8362-4886-b50b-710cb3be519f)

❖ If a user chooses to connect using their Strava credentials, they are routed to the Strava website to authenticate and give permissions to FitPursuit to access their data.

*Strava oAuth*

![Strava](https://github.com/agalev/FitPursuit/assets/17399666/19a7405f-a09f-48b3-8242-e50ec33d780a)

❖ Upon agreement, the user is routed back to the FitPursuit application and an action is dispatched to the backend, which logs the user in if an account matching their `strava_id` is present in the database. Otherwise, the application creates a new account using their Strava information

*Toast Success Notification*

![Toast](https://github.com/agalev/FitPursuit/assets/17399666/5a38cf66-7ace-4d56-9a23-70af810bc3a2)

❖ Upon authentication, an action is dispatched which:
- Creates a backend session with the user. This session persists through manual page refresh
- If the user used the Strava button, it also logs a session with Strava
- Updates the global state to an authenticated state
- Updates the available options in the navbar: `Home`, `Teams`, `Competitions`, `Dashboard`, `Messages`, `Logout`
- Navigates the user to the `Dashboard`

❖ A bubble is present next to the `Messages` nav link where a number indicates new, unread messages

*Unread Message Count Bubble*

![Message Bubble](https://github.com/agalev/FitPursuit/assets/17399666/ff0e6136-3178-461f-b31d-a71eddd223c4)

❖ After the user is authenticated, they are routed to `/dashboard` which is the richest page. Users can:
- View and edit Profile details
- Connect to Strava if they haven't yet
- Sync activities from Strava
- View Team information along with team members and team stats, if they belong to a team
- Leave their team by navigating to a button below the Team's avatar
- *If the user is a team leader, they can also kick members and disband the team*
- View a dynamic chart that aggregates stats from all their activities and groups them by `activity_type`. Options include: `distance`, `moving_time`, `total_elevation_gain`, `average_speed`, `max_speed`, `average_heartrate`, `max_heartrate`
- Show an interactive table with a list of all the activities belonging to the user. Activities can be sorted in ascending/descending order by clicking the desired table header

*Dashboard Page*
![Dashboard Page](https://github.com/agalev/FitPursuit/assets/17399666/f33fdfff-126b-41b5-9dc5-2f7494399e2e)

*Dynamic Chart*
![Dynamic Chart](https://github.com/agalev/FitPursuit/assets/17399666/1174fabd-3fd1-4309-9e49-6bce79d94d11)

*Activities Table*
<img width="1440" alt="Activities Table" src="https://github.com/agalev/FitPursuit/assets/17399666/ba8808ac-a2c2-41f5-85e5-8f8b7a4ace40">


❖ The `Home` page is now transformed and users are prompted to 'Browse the Ranks'. There's a form in a radio format with 4 choices to choose from: `Show Users`, `Show Teams`, `Show Competitions`, `Show Activities`

*Home Page(authenticated)
<img width="1437" alt="Home Page" src="https://github.com/agalev/FitPursuit/assets/17399666/3b150ac2-b2ed-48d7-8c1c-c999e0629c76">

❖ Upon navigating through the different tabs, the table below updates with the corresponding data based on the choice the user picked. This table has an identical format of the table used in the `Dashboard` page, which allows for sorting by field

❖ A Search bar is also provided to filter entries. The search bar sifts through all the fields, which makes it a very powerful tool. For example, users can search for other users from "San Francisco". At the moment, the search bar is only available for the `Show Users` option

❖ Upon navigating to the `Teams` page, a user can:
- View a list of cards of all the teams. Information includes: `Avatar`, `Name`, `Primary Activity`, `Leader`, `Members`, `Wins` and `Stats`
- *If the user doesn't belong to a team, they can create a new team*
- *If the user doesn't belong to a team, they can ask a team's leader to join an existing one using a button below each team's card*

*Teams Page*
<img width="1437" alt="Screenshot 2023-06-07 at 10 46 38 AM" src="https://github.com/agalev/FitPursuit/assets/17399666/088c224c-5580-4ed5-9478-8f7d70123c5a">

❖ Upon navigating to the `Competitions` page, a user can:
- View a list of competition rules and a form at the top of the page. Users can use the provided form to register a new competition
- View a list of cards of all the competitions. Information includes: `Name`, `Type(solo/team)`, `Activity Type`, `Prize Pool`, `Organizer`, `Objective(Currently only Distance)`, `Starting date` and `Ending date`
- *If the user is eligible, they can decide to join competition by engaging with a button provided at the bottom of each card*
- View specific competition details by clicking a `View Details` button provided at the bottom of each card
- Upon navigating to the detailed view using the `View Details` button, a modal pops up with additional information about the competition

*Competitions Page*
<img width="1432" alt="Screenshot 2023-06-07 at 10 47 36 AM" src="https://github.com/agalev/FitPursuit/assets/17399666/fa97061a-eda3-4fa1-a9fb-b48dddc1f487">

*View Details Modal*

<img width="458" alt="Screenshot 2023-06-07 at 12 09 42 PM" src="https://github.com/agalev/FitPursuit/assets/17399666/c8c65385-5f86-4d22-9784-76d9df2357a9">

❖ Upon navigating to the `Messages` page, a user can:
- Browse all users. There's a search bar provided for convenience
- View Team Chat if the user belongs to a team
- View a list of active conversations at the bottom of the 'Users' column. When a conversation with unread messages is selected, an action is dispatched to the backend marking unread messages as read
- Click a user/team chat from the left column, which will select the user/team chat, bring an ongoing conversation, if any, and allow the user to send messages

*Messages Page*
<img width="1436" alt="Screenshot 2023-06-07 at 10 53 11 AM" src="https://github.com/agalev/FitPursuit/assets/17399666/15f9bf24-4050-4277-af7e-08d409f30e2f">

❖ Upon selecting the `Logout` option from the nav bar, an action is dispatched which:
- Clears the backend session with the user
- Clears the session with Strava, if any
- Updates the global state to an unauthenticated state
- Navigates the user to `Home`

❖ At any point, the user can navigate to the `Feedback Form` located in the footer of the application and can send a feedback/suggestions/issues to the developers

*Feedback Form*

<img width="729" alt="Screenshot 2023-06-07 at 11 51 56 AM" src="https://github.com/agalev/FitPursuit/assets/17399666/1caa38ed-e442-4e95-bc45-0060746cc1eb">

# <img src="https://media2.giphy.com/media/QssGEmpkyEOhBCb7e1/giphy.gif?cid=ecf05e47a0n3gi1bfqntqmob8g9aid1oyj2wr3ds3mg700bl&rid=giphy.gif" width ="25"> How To Run The App 

### You're welcome to explore the app through `Github` or fork/clone it to test yourself. Below are the steps for running the app on your local machine:

❖ Before you start, make sure you obtain your own [`Strava API Key`](https://developers.strava.com)

❖ Navigate to https://www.strava.com/settings/api and make a record of your Client ID and Client Secret. You will need these to access the Strava API later

❖ Clone/fork the repo. This is a monorepo, containing both the `client` and `server` applications

### For `client`:

❖ Navigate to the `client` folder where the `package.json` file is located

❖ Run `npm install` which installs the necessary dependencies
 
❖ Create a `.env.local` file which contains environment variables. The necessary env variables for the frontend applications are:
- NEXT_PUBLIC_STRAVA_CLIENT_ID='*YOUR STRAVA API CLIENT ID*'
- NEXT_PUBLIC_STRAVA_CLIENT_SECRET='*YOUR STRAVA API CLIENT SECRET*'
- NEXTAUTH_URL=http://localhost:3000/auth Note: Change port if you decide to run the application on a different port
- NEXTAUTH_SECRET='*Generate your own random string*'

❖ Finally, run `npm run dev` to start the application and navigate to http://localhost:3000
 
### For `server`:

❖ Make sure you are running [`Python 3.11`](https://www.python.org/downloads/release/python-3110/)

❖ Navigate to the `server` folder where the `Pipfile` file is located

❖ Create a `.env` file which contains environment variables. The necessary env variables for the backend applications are:
- SECRET_KEY=*Generate your own random string with `python -c 'import os; print(os.urandom(16))'`*
- DATABASE_URI=*Link to your postgres db. You can use SQLite alternatively*
- MAIL_USERNAME=*E-mail address used for the feedback form*
- MAIL_PASSWORD=*Password associated with email adress*

❖ Run `pipenv install` then enter the shell with `pipenv shell`

❖ Run `flask db init` `flask db revision --autogenerate -m 'create tables'` `flask db upgrade` to create the tables in the database

❖ Run `python seed.py` to execute the seeding script which populates the database with some dummy data

❖ Finally, run `python app.py` to start the application

***Logo design by Marinela Angelova***

***Please reach out if you have suggestions, run into hurdles or have questions regarding the setup.***

[![](https://visitcount.itsvg.in/api?id=ashen&label=Repo%20Views&color=2&icon=5&pretty=false)](https://visitcount.itsvg.in)
