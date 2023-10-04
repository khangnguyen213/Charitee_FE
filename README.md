# CHARITEE - Front-end

This is the website I made for my capstone project in the web-fullstack course. The website was developed with the purpose of helping charitable organizations collect donations from the community conveniently and quickly. At the same time, Charitee also helps users find ongoing charities and participate in charitable activities.

This repository only includes the front-end part of my website. You can visit the back-end part [here](https://github.com/khangnguyen213/Charitee_BE).

## Features:
<img width="960" alt="image" src="https://github.com/khangnguyen213/Charitee_FE/assets/125236469/b2bcfeef-8ccd-4d0b-b69d-c8b64a378733">


- User registration, login, and account authorization
- Email confirmation when registering and reset password
- Displaying current data from the database
- Search and filter data
- Transaction tracking for user
- Admin summary statistic
- Admin Manager

![image](https://github.com/khangnguyen213/Charitee_FE/assets/125236469/08042ffb-9286-4fc0-ae53-fb3f5644bf6c)

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
You can create an account to try by your own or you can use one of my accounts listed below.
I have created some dummy accounts for you to try different functions of the website:

<h1>LIST OF ACCOUNTS</h1>
<table>
  <tr>
    <th>Role</th>
    <th>Email</th>
    <th>Password</th>
  </tr>
  <tr>
    <td>User</td>
    <td>user1@test</td>
    <td>user123//</td>
  </tr>
   <tr>
    <td>Admin</td>
    <td>admin1@test</td>
    <td>admin123//</td>
  </tr>
    <tr>
    <td>Master</td>
    <td>master1@test</td>
    <td>master123//</td>
  </tr>
</table>

This repository is FE only, you can see the source code of BE [here](https://github.com/khangnguyen213/Charitee_BE).

You also can adjust the website using your own backend server by editing BASE_BACKEND_API inside file src/global.js

## Demo

Link: [demo](https://charitee-rj-tw.netlify.app/)
