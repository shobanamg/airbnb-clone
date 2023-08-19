# Airbnb Clone with Next 13 


## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [Setup .env file](#setup-env-file)

## Overview
 
This app is built with Next 13. It uses Next 13's App Router, React, Tailwind, Prisma, MongoDB, NextAuth

### The challenge

This app should support two actors: **Guests** and **Owners**. 

1. [x] Both Guests and Owners should be able to login with username and password.
2. [x] Both Guests and Owners should be able to login with Google and Github accounts.

#### Guests should be able to:

1. [x]  Search for properties by location, date range, number of guests, number of rooms and number of bathrooms.
2. [x]  Book a property for a given date range.
3. [x]  See the trips they have booked and cancel the trip.
4. [x]  Add properties to favorites.
5. [x]  Share a URL with filters and see the same results.
6. [x]  See the price of a property for a given date range.
7. [x]  See the location of a property on a map.
8. [x]  See the number of guests, rooms and bathrooms for a property.
9. [x]  See the description of a property.
10.[x]  See the host of a property.

#### Owners should be able to:

1. [x]  Add rental properties.
2. [x]  See the properties they have added.
3. [x]  See the reservations for their properties.
4. [x]  Cancel reservations for their properties.


### Built with

- [Next 13](https://nextjs.org/)
- [React](https://reactjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Prisma](https://www.prisma.io/)
- [MongoDB](https://www.mongodb.com/)
- [NextAuth](https://next-auth.js.org/)


### What I learned

In this project I have learned how to use Next 13's App Router, how to use NextAuth, how to use Prisma with MongoDB. 
Below are features I have learned to implement in this project.

- Credential authentication
- Google authentication
- Github authentication
- Image upload using Cloudinary CDN
- Client form validation and handling using react-hook-form
- Server error handling using react-toast
- Calendars with react-date-range
- How to write POST and DELETE routes in route handlers (app/api)
- How to fetch data in server react components by directly accessing database
- How to handle files like error.tsx and loading.tsx which are new Next 13 templating files to unify loading and error handling
- How to handle relations between Server and Child components!

### Setup .env file

```js
DATABASE_URL
GOOGLE_CLIENT_ID
GOOGLE_CLIENT_SECRET
GITHUB_ID
GITHUB_SECRET
NEXTAUTH_SECRET
```