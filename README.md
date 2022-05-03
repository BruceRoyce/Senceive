# Senceive
<i>A Tech Test by Bruce Royce for Senceive</i>

## Project: Question and Description
### Requirements:

You take on the role of a Senceive engineer and your task is to create a web application for the company
that displays a list of customers retrieved from the following API endpoint:

Endpoints can be from:
https://reqres.in/api/users?page=1
or
https://gorest.co.in/public/v1/users?page=1

<i>Samples of the data structure pulled from the endpoints are in assets/data_samples/ (sample_01.json and sample_02.json for each endpoint respectively)</i>  

The application shall contain the following functionality:

* Contains a list view - a list of users retrieved from the API, displaying the id and the full name.

* the list can be sorted

* the list can be filtered

* detail view - selecting a user opens a detail view that displays all the customer information

### Submission:

Use Vue.Js as the framework

Submit the application as a zip file with any instructions needed to run the code.  Note down any prerequisites that are assumed to exist outside the zip file.

### Assessment:

We will be reviewing the submitted application using the following guidelines:

#### functionality
- can the app be made to run by following the instructions?
- does the app perform the required functionality?
- does the app handle error conditions?

#### readability
- is the code well-formatted? - is the code well structured? - does the code contain comments if not self-explanatory?

#### consistency
- does the code follow consistent patterns of use? - does the code conform consistently to a particular implementation pattern?

#### use of modern language features
- if the code uses async/await or promises, are they used correctly?
- are modern features used to improve the conciseness of code while preserving readability?

#### code style
- is markup valid and does it use the proper elements
- are classes and styles efficiently using the cascade and well-thought-out
- does the JavaScript follow logical abstractions


## Solution

### Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```
