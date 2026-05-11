# Yihonal Trading

Next.js frontend for Yihonal Trading / Yihonal Coffee.

## Stack

- Git and GitHub for version control and collaboration
- Docker for repeatable builds and deployment
- Next.js as the main React framework
- React for the UI
- TypeScript for safer application code
- Tailwind CSS for styling
- GSAP for focused motion and reveal animations

## Development

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Production Build

```bash
npm run build
npm start
```

## Docker

```bash
docker build -t yihonal-trading .
docker run --rm -p 3000:3000 yihonal-trading
```
