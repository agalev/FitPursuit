![nav_logo_orange](https://github.com/agalev/FitPursuit/assets/17399666/26c1bb41-b20a-47ed-84fe-1ed6b6c303c4)
### Join teams and compete with others for prizes!
Check out the live app ~> https://fit-pursuit.vercel.app

# <img src="https://media2.giphy.com/media/QssGEmpkyEOhBCb7e1/giphy.gif?cid=ecf05e47a0n3gi1bfqntqmob8g9aid1oyj2wr3ds3mg700bl&rid=giphy.gif" width ="25"> Tech Stack & Dependencies
**`Next.js` `Tailwind` `Python3` `Flask` `SQLAlchemy` `Alembic` `Postgres` `Pandas` `Docker`**

FitPursuit is a fitness app powered by Strava allowing users to join teams and compete with others for prizes while tracking their fitness activities and progress towards their goals. This is my capstone project and the culmination of my time at the Flatiron School. It took 6 weeks to go through the whole software development lifecycle. I faced and overcame numerous challenges - oAuth, using cutting edge libraries & frameworks still in beta, implementing cron jobs, dockerizing and deploying containers. As an avid Strava user myself, my idea was to comprise a database of personal, live data that can be synced easily. My focus was on creating a visually appealing user experience, gamifying competitions with the implementation of a virtual currency, providing a sense of community in the form of a Teams functionality and presenting the opportunity to communicate through a messaging system. To accomplish that, I leveraged the power of Object Oriented Programming to control & transform data, utilized an Object Relational Mapping methodology and made use of `SQL` to communicate with a `Postgres` database.

Here is a diagram of the relationships established between the tables for this project:

![FitPursuit Database table relations](https://github.com/agalev/FitPursuit/assets/17399666/8eb933ad-3411-4e42-845c-77dc96661871)

The application utilizes the publicly available [`Strava API`](https://developers.strava.com) for fetching `profile` and `activities` data into the application. The data is then stored remotely in a `Postgres` database hosted on AWS RDS. `SQL` queries and commands are handled through the powerful ORM module `SQLAlchemy`. Version control on DB was implemented through `Alembic`. With the help of `Pandas` module, I then used the data to aggregate some additional stats that are not part of the original Strava app.

### Future goals include:

❖ Implement activities data from different sources: Apple's HealthKit API, Android's equivalent

❖ Develop a mobile App with React Native

❖ Implement Websockets for the Messenger

❖ Implement a global chat

❖ Rework backend with a different framework (Python+Django or Java+Spring Boot)

# <img src="https://media2.giphy.com/media/QssGEmpkyEOhBCb7e1/giphy.gif?cid=ecf05e47a0n3gi1bfqntqmob8g9aid1oyj2wr3ds3mg700bl&rid=giphy.gif" width ="25"> User Stories

If you'd like to follow along, visit the following url to access the live application ~> https://fit-pursuit.vercel.app

❖ Upon visiting the front page, users are greeted with a brief explanation of what `FitPursuit` is, a mission statement and the purpose of the application.

❖ Unauthenticated users can navigate to either `Login` or `Signup` pages by clicking links on the navbar at the top. Alternatively, a Call To Action button is also present at the front page that routes to `/login`.

❖ At the `Login` page users are presented with the option to connect to the application using their Strava account, or enter an email/password to login.

❖ At the `Signup` page users are once again prompted to connect to the application using their Strava account, or alternatively fill a form with their personal information. When submitted, the data is sent to the backend, an account is created in the database and the user is logged in.

❖ Validation on inputs is presented in a toast format at the bottom right corner, signaling errors in user's input.

❖ If a user chooses to connect using their Strava credentials, they are routed to the Strava website to authenticate and give permissions to FitPursuit to access their data. Upon agreement, the user is routed back to the FitPursuit application and an action is dispatched to the backend, which logs the user in, if an account matching their `strava_id` is present in the database, or otherwise creates a new account using their Strava information. 

❖ Upon authentication, an action is dispatched which:

- Logs a backend session with the user. This session persists through manual page refresh.
- If the user used the Strava button, it also logs a session with Strava
- Updates the global state to an authenticated state
- Transforms the available options in the navbar: `Home` `Teams` `Competitions` `Dashboard` `Messages` `Logout`
- Navigates the user to the dashboard

❖ A bubble is present next to the `Messages` nav link where a number indicates new, unread messages.

❖ After the user is authenticated, they are routed to `/dashboard` which is the richest page. Users can:

- View and edit Profile details.
- Connect to Strava if they haven't yet.
- Sync activities from Strava.
- View Team information along with team members and team stats, if they belong to a team.
- Leave their team by navigating to a button below the Team's avatar.
- If the user is a team leader, they can also kick members and disband the team.
- View a dynamic chart that aggregates stats from all their activities and groups them by activity_type. Options include: `distance` `moving_time` `total_elevation_gain` `average_speed` `max_speed` `average_heartrate` `max_heartrate`
- Show an interactive table with a list of all the activities belonging to the user. Activities can be sorted in ascending/descending order by clicking the desired table header.

❖ The `Home` page is now transformed and users are prompted to 'Browse the Ranks'. There's a form in a radio format with 4 choices to choose from: `Show Users` `Show Teams` `Show Competitions` `Show Activities`.

❖ Upon navigating through the different tabs, the table below changes with corresponding data based on the choice the user picked. The table is an identical format of the table used in the `Dashboard` page, which allows for sorting by field. 

❖ A Search bar is also provided to filter entries. The search bar sifts through all the fields, which makes it a very powerful tool. For example, users can search for other users from "San Francisco". At the moment, the search bar is only available for the `Show Users` option.

❖ Upon navigating to the `Teams` page, a user can:

- View a list of cards of all the teams. Information includes: Avatar, Name, Primary Activity, Leader, Members, Wins and Stats.
- If the user doesn't belong to a team, they can create a team, or ask a team's leader to join using a button below each team's card.

❖ Upon navigating to the `Competitions` page, a user can:

- View a list of cards of all the competitions. Information includes: Name, Type(solo/team), Activity, Prize Pool, Organizer, Objective(Currently only Distance), Starting and Ending date.
- If the user is eligible, they can decide to join competition, or view details with buttons provided at the bottom of each card.
- Upon navigating to the detailed view using the 'View Details' button, a modal pops up with additional information about the competition.
- View a list of competition rules and a form at the top of the page. Users can use the provided form to register a new competition.

❖ Upon navigating to the `Messages` page, a user can:

- Browse all users. There's a search bar provided for convenience.
- View Team Chat if the user belongs to a team.
- View a list of active conversations at the bottom of the 'Users' column. When a conversation with unread messages is selected, an action is dispatched to the backend marking unread messages as read.
- Click a user/team chat from the left column, which will select the user/team chat, bring an ongoing conversation, if any, and allow the user to send messages.

❖ Upon selecting the `Logout` option from the navbar, an action is dispatched which:

- Clears the backend session with the user
- Clears the session with Strava
- Updates the global state to an unauthenticated state
- Navigates the user to the homepage

## How To Run The App 

You're welcome to explore the app through `Github` or fork/clone it to test yourself. Below are the steps for running the app on your local machine:

❖ Before you start, make sure you obtain your own [`Strava API Key`](https://developers.strava.com)

❖ Clone/fork the repo. This is a monorepo, containing the `client` and `server` applications.

### For `client`:

❖ After you've done so, make sure you are running [`Python 3.11`](https://www.python.org/downloads/release/python-3110/)

❖ Navigate to the Root folder where the `Pipfile` file is located.

❖ Run `pipenv install` then enter the shell with `pipenv shell`

❖ Type `python main.py` to start the application.

***Please reach out if you have suggestions, run into hurdles or have questions regarding the setup.***
