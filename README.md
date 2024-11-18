## Introduction
This project is built using Next.js, a popular React framework for building fast and modern web applications. The app integrates with the NewsAPI to fetch and display the latest news articles. Users can explore news from various categories and sources in a clean and responsive interface.

## Features
- Integration with NewsAPI to fetch up-to-date news articles.
- Responsive design for seamless viewing on both desktop and mobile devices.
- Dynamic filtering to explore news from different topics.
- Lightweight and fast loading with optimized code and styling.

## Prerequisites
Before running the project, ensure you have the following installed on your system:

- Node.js (version 14 or higher)
- npm or yarn for package management

## Project Setup
1. Clone the repo
```bash
git clone https://github.com/stezengi-surge/news-holocron.git

```

2. Navigate to the project directory
```bash
cd news-holocron

```
3. Install the dependencies 
```bash
npm install

```
or 
```bash
yarn install

```

## Project Configuration
1. Sign up at NewsAPI and generate an API key.
2. Create a .env.local file in the root of the project
3. set the environment variable NEWSAPI_API_KEY to your newsapi API key
```bash
NEWSAPI_API_KEY=slkdfjashaof.....

```

## Starting the Project
1. Start the dev server

```bash
npm run dev
```
or
```bash
yarn dev
```

2. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Build & Deployment
1. Build the project for production:
```bash
npm run build  
```
or
```bash
yarn build  
```

2. Start the production server:

```bash
npm run start  
```
or
```bash
yarn start 
``` 

3. Deploy the app to any hosting platform that supports Next.js, such as Vercel.

## License
This project is licensed under the MIT License.