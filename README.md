# lyrnivy.com: portfolio and travel blog

My personal site, built from scratch: a developer portfolio, a UGC creator media kit and a travel blog in one Next.js app.

**Live:** [www.lyrnivy.com](https://www.lyrnivy.com)

## What's on the site

| Page | What it does |
|------|--------------|
| `/` Home | Intro, about, photo cards from my travels, a small music player and my latest YouTube video |
| `/blogs` | Travel guides and how-tos written in MDX: trip cost breakdowns (Japan, Seoul, Vietnam, Thailand), Philippine destinations and Auckland. Each post has threaded comments stored in Supabase |
| `/development` | My web development services and career timeline |
| `/ugc` | Creator media kit: Instagram and TikTok metrics, brand partners, collaboration types and embedded content |
| `/ar` | A WebAR postcard: point your phone camera at the Busan postcard and a video plays on top of it (A-Frame + MindAR image tracking) |

Also:
- Light and dark themes, remembered between visits
- Click-to-load embeds for YouTube, TikTok, Instagram and Pinterest, so pages stay fast until you press play
- A generated sitemap and robots.txt, with every blog post in the sitemap

## Tech stack

- **Next.js 16** (App Router) with **React 19** and **TypeScript**
- **Tailwind CSS 4**
- **MDX** (`@next/mdx`) for blog posts, with a few custom components inside posts
- **Supabase** (Postgres with row-level security) for blog comments
- **Motion** for animations, **Lucide** for icons
- **A-Frame** and **MindAR** for the AR postcard
- Deployed on **Vercel**

## Project structure

```
app/
  (site)/          Home, blogs, development and UGC pages
  ar/              WebAR postcard page
  sitemap.ts       Sitemap built from the blog posts
components/        UI by section (home, blogs, development, ugc, ar, shared, layout)
content/blog/      Blog posts as .mdx files, each exporting its own metadata
data/              Site copy and settings (bio, links, services, media kit numbers)
lib/               Blog post loader and Supabase client
supabase/          SQL for the comments table and its access rules
public/            Photos, brand logos, AR target and video
```

## Running it locally

Requires Node.js 20.9 or later.

```bash
npm install
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000).

### Comments (optional)

Blog comments need a Supabase project. Without one, the site still works and the comment box shows as not configured.

1. Create a Supabase project and run `supabase/comments.sql` in its SQL Editor. It creates the `comments` table and lets visitors read and post comments and replies, but not edit or delete them.
2. Add the project's public URL and anon key to `.env.local`:

```bash
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

### Adding a blog post

Add a `.mdx` file to `content/blog/`. The file name becomes the URL (`/blogs/<file-name>`), and the post exports its metadata:

```js
export const metadata = {
  title: "Post title",
  date: "2026-01-31",
  excerpt: "One or two lines for the blog list.",
  tags: ["Travel"],
  location: "Auckland, New Zealand",
  cover: "/photos/cover.jpg",
};
```

## Scripts

| Command | What it does |
|---------|--------------|
| `npm run dev` | Start the development server |
| `npm run build` | Build for production |
| `npm run start` | Serve the production build |
| `npm run lint` | Run ESLint |

## About me

I'm Ivy Ocampo, a web developer, content creator and photographer based in Auckland, New Zealand, studying a Master of Information Technology.

[Website](https://www.lyrnivy.com) · [YouTube](https://www.youtube.com/@lyrnivy) · [Instagram](https://www.instagram.com/lyrnivy) · [TikTok](https://www.tiktok.com/@ivyocampo7)
