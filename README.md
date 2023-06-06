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

❖ Implementing activities data from different sources: Apple's HealthKit API

❖ Develop a mobile App with React Native

❖ Implementing Websockets for the Messenger

❖ Rework backend with a different framework (Python+Django or Java+Spring Boot)

# <img src="https://media2.giphy.com/media/QssGEmpkyEOhBCb7e1/giphy.gif?cid=ecf05e47a0n3gi1bfqntqmob8g9aid1oyj2wr3ds3mg700bl&rid=giphy.gif" width ="25"> User Stories

If you'd like to follow along, visit the following url to access the live application ~> https://fit-pursuit.vercel.app

❖ Upon visiting the front page, users are greeted with a brief explanation of what "FitPursuit" is, a mission statement and the purpose of the application.

❖ Unauthenticated users can navigate to either `/login` or `/signup` routes by clicking links on the navbar at the top. Alternatively, a Call To Action button is also present at the front page that routes to `/login`.

❖ At the `login` route users are presented with the option to connect to the application using their Strava account, or enter an email/password to login.

❖ At the `signup` route users are once again prompted to connect to the application using their Strava account, or alternatively fill a form with their personal information.

❖ Validation on inputs is presented in a toast format at the bottom right corner, signaling errors in user's input.

❖ If a user chooses to connect using their Strava credentials, they are routed to the Strava website to authenticate and give permissions to FitPursuit to access their data. Upon agreement, the user is routed back to the FitPursuit application.

❖ Upon authentication, the navbar transforms the available options and lists: `Home` `Teams` `Competitions` `Dashboard` `Messages` `Logout`

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

❖ Upon navigating through the different tabs, the table below changes with corresponding data based on the choice the user picked. The table is an identical format of the table used in the `Dashboard` page. 

❖ A Search bar is also provided to filter entries. The search bar sifts through all the fields, which makes it a very powerful tool. For example, users can search for other users from "San Francisco". At the moment, the search bar is only available for the `Show Users` option.





## How To Run The App 

You're welcome to explore the app through `Github` or fork/clone it to test yourself. Below are the steps for running the app on your local machine:

❖ Before you start, make sure you obtain your own [`Strava API Key`](https://developers.strava.com)

❖ Clone/fork the repo.

❖ After you've done so, make sure you are running [`Python 3.11`](https://www.python.org/downloads/release/python-3110/)

❖ Navigate to the Root folder where the `Pipfile` file is located.

❖ Run `pipenv install` then enter the shell with `pipenv shell`

❖ Type `python main.py` to start the application.

***Please reach out if you have suggestions, run into hurdles or have questions regarding the setup.***
