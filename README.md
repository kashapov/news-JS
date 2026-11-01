# news-JS

News Portal migrated to TypeScript (RS School task).

## Run locally

- Copy `.env.example` to `.env` and set your News API key
- `npm install`
- `npm start`

## Environment

```
API_URL=https://newsapi.org/v2/
API_KEY=your_key
```

For a deployed build (News API blocks non-localhost origins), use the RS proxy:

```
API_URL=https://rss-news-api.onrender.com/
API_KEY=your_key
```

## Scripts

- `npm start` — dev server
- `npm run build` — production build
- `npm run lint` — ESLint
