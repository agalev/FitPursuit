![nav_logo_orange](https://github.com/agalev/FitPursuit/assets/17399666/26c1bb41-b20a-47ed-84fe-1ed6b6c303c4)
### Join teams and compete with others for prizes!
### Check out the live app ~> https://fit-pursuit.vercel.app

# <img src="https://media2.giphy.com/media/QssGEmpkyEOhBCb7e1/giphy.gif?cid=ecf05e47a0n3gi1bfqntqmob8g9aid1oyj2wr3ds3mg700bl&rid=giphy.gif" width ="25"> Tech Stack & Dependencies
**`Next.js` `Tailwind` `Python3` `Flask` `SQLAlchemy` `Alembic` `Postgres` `Pandas` `Docker`**

FitPursuit is a fitness app powered by Strava allowing users to join teams and compete with others for prizes while tracking their fitness activities and progress towards their goals. This is my capstone project and the culmination of my time at Flatiron School. I devoted 6 weeks to go through each step of the software development lifecycle. I faced and overcame numerous challenges - oAuth, implementing encryption, sessions, global state, cutting edge libraries & frameworks still in beta, cron jobs, dockerizing and deploying a container to AWS to name a few.

As an avid Strava user myself, my idea was to comprise a database of personal, live data that can be easily synced and accessed. My focus was on creating a visually appealing user experience, gamifying competitions with the implementation of a virtual currency, providing a sense of community in the form of a Teams functionality and presenting the opportunity to communicate through a messaging system. To accomplish that, I leveraged responsive design, accessibility fundamentals, the power of Object Oriented Programming to control & transform data, utilized an Object Relational Mapping methodology and made use of `SQL` to communicate with a `Postgres` database.

Here is a diagram of the relationships established between the tables for this project:

![FitPursuit Database table relations](https://github.com/agalev/FitPursuit/assets/17399666/8eb933ad-3411-4e42-845c-77dc96661871)

The application utilizes the publicly available [`Strava API`](https://developers.strava.com) for fetching `profile` and `activities` data into the application. The data is then stored remotely in a `Postgres` database instance hosted on AWS RDS. `SQL` queries and commands are handled through the powerful ORM module `SQLAlchemy`. Version control on DB was implemented through `Alembic`. With the help of `Pandas` module, I then used the data to aggregate some additional stats that are not part of the original Strava app.

### Future goals include:

❖ Implement activities data from different sources: Apple's HealthKit API and Android's equivalent

❖ Develop a mobile application with `React Native`

❖ Incorporate websockets for the `Messenger` page

❖ Implement a global chat

❖ Rework backend with a different framework (Python+Django or Java+Spring Boot)

# <img src="https://media2.giphy.com/media/QssGEmpkyEOhBCb7e1/giphy.gif?cid=ecf05e47a0n3gi1bfqntqmob8g9aid1oyj2wr3ds3mg700bl&rid=giphy.gif" width ="25"> User Stories

### You are welcome to follow along with the user stories. Visit the following url to access the live application ~> https://fit-pursuit.vercel.app

❖ Upon visiting the front page, users are greeted with a brief explanation of what `FitPursuit` is, a mission statement and the purpose of the application

❖ Unauthenticated users can navigate to either `Login` or `Signup` pages by clicking nav links on the navbar at the top. Alternatively, a Call To Action button is also present at the front page that routes to `/login`

❖ On the `Login` page users are presented with the option to connect to the application using their Strava account, or enter an email/password to login

❖ On the `Signup` page users are once again prompted to connect to the application using their Strava account, or alternatively fill a form with their information. When submitted, the data is sent to the backend, an account is created with the provided data in the database and the user is logged in

❖ Validation of inputs is presented in a toast format at the bottom right corner, signaling errors in user's input

❖ If a user chooses to connect using their Strava credentials, they are routed to the Strava website to authenticate and give permissions to FitPursuit to access their data. Upon agreement, the user is routed back to the FitPursuit application and an action is dispatched to the backend, which logs the user in if an account matching their `strava_id` is present in the database. Otherwise, the application creates a new account using their Strava information

❖ Upon authentication, an action is dispatched which:
- Creates a backend session with the user. This session persists through manual page refresh
- If the user used the Strava button, it also logs a session with Strava
- Updates the global state to an authenticated state
- Updates the available options in the navbar: `Home`, `Teams`, `Competitions`, `Dashboard`, `Messages`, `Logout`
- Navigates the user to the `Dashboard`

❖ A bubble is present next to the `Messages` nav link where a number indicates new, unread messages

❖ After the user is authenticated, they are routed to `/dashboard` which is the richest page. Users can:
- View and edit Profile details
- Connect to Strava if they haven't yet
- Sync activities from Strava
- View Team information along with team members and team stats, if they belong to a team
- Leave their team by navigating to a button below the Team's avatar
- *If the user is a team leader, they can also kick members and disband the team*
- View a dynamic chart that aggregates stats from all their activities and groups them by `activity_type`. Options include: `distance`, `moving_time`, `total_elevation_gain`, `average_speed`, `max_speed`, `average_heartrate`, `max_heartrate`
- Show an interactive table with a list of all the activities belonging to the user. Activities can be sorted in ascending/descending order by clicking the desired table header

❖ The `Home` page is now transformed and users are prompted to 'Browse the Ranks'. There's a form in a radio format with 4 choices to choose from: `Show Users`, `Show Teams`, `Show Competitions`, `Show Activities`

❖ Upon navigating through the different tabs, the table below updates with the corresponding data based on the choice the user picked. This table has an identical format of the table used in the `Dashboard` page, which allows for sorting by field

❖ A Search bar is also provided to filter entries. The search bar sifts through all the fields, which makes it a very powerful tool. For example, users can search for other users from "San Francisco". At the moment, the search bar is only available for the `Show Users` option

❖ Upon navigating to the `Teams` page, a user can:
- View a list of cards of all the teams. Information includes: `Avatar`, `Name`, `Primary Activity`, `Leader`, `Members`, `Wins` and `Stats`
- *If the user doesn't belong to a team, they can create a new team*
- *If the user doesn't belong to a team, they can ask a team's leader to join an existing one using a button below each team's card*

❖ Upon navigating to the `Competitions` page, a user can:

- View a list of competition rules and a form at the top of the page. Users can use the provided form to register a new competition
- View a list of cards of all the competitions. Information includes: `Name`, `Type(solo/team)`, `Activity Type`, `Prize Pool`, `Organizer`, `Objective(Currently only Distance)`, `Starting date` and `Ending date`
- *If the user is eligible, they can decide to join competition by engaging with a button provided at the bottom of each card*
- View specific competition details by clicking a `View Details` button provided at the bottom of each card
- Upon navigating to the detailed view using the `View Details` button, a modal pops up with additional information about the competition

❖ Upon navigating to the `Messages` page, a user can:
- Browse all users. There's a search bar provided for convenience
- View Team Chat if the user belongs to a team
- View a list of active conversations at the bottom of the 'Users' column. When a conversation with unread messages is selected, an action is dispatched to the backend marking unread messages as read
- Click a user/team chat from the left column, which will select the user/team chat, bring an ongoing conversation, if any, and allow the user to send messages

❖ Upon selecting the `Logout` option from the nav bar, an action is dispatched which:
- Clears the backend session with the user
- Clears the session with Strava, if any
- Updates the global state to an unauthenticated state
- Navigates the user to `Home`

❖ At any point, the user can navigate to the `Feedback Form` located in the footer of the application and can send a feedback/suggestions/issues to the developers 

# <img src="https://media2.giphy.com/media/QssGEmpkyEOhBCb7e1/giphy.gif?cid=ecf05e47a0n3gi1bfqntqmob8g9aid1oyj2wr3ds3mg700bl&rid=giphy.gif" width ="25"> How To Run The App 

### You're welcome to explore the app through `Github` or fork/clone it to test yourself. Below are the steps for running the app on your local machine:

❖ Before you start, make sure you obtain your own [`Strava API Key`](https://developers.strava.com)

❖ Navigate to https://www.strava.com/settings/api and make a record of your Client ID and Client Secret. You will need these to access the Strava API later

❖ Clone/fork the repo. This is a monorepo, containing the `client` and `server` applications

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
