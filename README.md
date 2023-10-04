# CHARITEE - Front-end

This is the website I made for my capstone project in the web-fullstack course. The website was developed with the purpose of helping charitable organizations collect donations from the community conveniently and quickly. At the same time, Charitee also helps users find ongoing charities and participate in charitable activities.

This repository only includes the front-end part of my website. You can visit the back-end part [here](https://github.com/khangnguyen213/Charitee_BE).

## Features:

- User registration, login, and account authorization
- Email confirmation when registering and reset password
- Displaying current data from the database
- Search and filter data
- Transaction tracking for user
- Admin summary statistic
- Admin Manager

## Technologies:

Technologies I used include:

- ReactJS
- TailwindCSS

I also used:

- AlertifyJS (for notifying information)
- Redux (for global state)
- react-hook-form (for simple form)
- Axios (for fetching API)
- Chart.js + react-chartjs-2

The design of this website I gathered from the internet and not from my idea.

## Installation

Use the package manager npm to install necessary dependencies.

```bash
npm install
```

Run the website in your local

```bash
npm start
```

## Usage

Current data comes from my [backend server](https://charitee-be.vercel.app).

This repository is FE only, you can see the source code of BE [here](https://github.com/khangnguyen213/Charitee_BE).

You also can adjust the website using your own backend server by editing BASE_BACKEND_API inside file src/global.js

## Demo

Link: [demo](https://charitee-rj-tw.netlify.app/)
