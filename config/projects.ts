import { type Project } from '@/components/project-grid';
import { assets } from '@/config/assets';

export const projects: Project[] = [
  // Video Projects
  {
    title: 'Agent + Assistant Explainer',
    description:
      'A 1-minute explainer breaking down the difference between Replit Agent and Assistant.',
    videoId: 'rkB4PT5yuhw',
    imageUrl: 'https://i.ytimg.com/vi/rkB4PT5yuhw/maxresdefault.jpg',
    imageAlt: 'Agent + Assistant Explainer thumbnail',
    badges: ['Video', 'AI'],
    category: 'content',
  },
  {
    title: 'Assistant Launch',
    description:
      'Assistant launch video for Replit, featuring the new Assistant and a look at the future of AI.',
    videoId: 'Do_lq8RZ9GU',
    imageUrl: 'https://i.ytimg.com/vi/Do_lq8RZ9GU/maxresdefault.jpg',
    imageAlt: 'Agent + Assistant Explainer thumbnail',
    badges: ['Video', 'AI'],
    category: 'content',
  },
  {
    title: 'First Look: Replit Assistant',
    description: 'An introduction to the new Replit Assistant.',
    videoId: 'ooYwXr2lPaA',
    imageUrl: 'https://i.ytimg.com/vi/ooYwXr2lPaA/maxresdefault.jpg',
    imageAlt: 'First Look: Replit Assistant thumbnail',
    badges: ['Video', 'AI'],
    category: 'content',
  },
  // Writing Projects
  {
    title: 'Understanding ETL',
    description:
      "100-page technical data engineering whitepaper, written in collaboration with O'Reilly Media for Databricks.",
    imageUrl: assets.projects.uetl,
    liveUrl: assets.whitepapers['orm-data-transformation'],
    badges: ['Writing', 'Data Engineering'],
    category: 'content',
  },
  {
    title: 'Data Transformation Guide',
    description:
      "Technical guide on Data Transformation, written in collaboration with O'Reilly Media for Coalesce.",
    // imageUrl: assets.projects.bdp,
    liveUrl: assets.whitepapers['orm-uetl'],
    badges: ['Writing', 'Tutorial'],
    category: 'content',
  },
  // Event Projects
  {
    title: 'Replit + Y Combinator + a16z',
    description: "Replit's biggest event of 2024, hosted at Y Combinator in partnership with a16z.",
    liveUrl: 'https://x.com/mattppal/status/1844400953371333035',
    imageUrl: assets.projects.yc,
    imageAlt: 'Replit and Y Combinator event showcase',
    badges: ['Event', 'Partnership'],
    category: 'event',
  },
  {
    title: 'xAI Hackathon',
    description: 'Professional photography and color grading for the first ever hackathon at xAI.',
    imageUrl: assets.projects.xai,
    liveUrl: 'https://x.com/mattppal/status/1845583077692903884',
    badges: ['Event', 'AI'],
    category: 'event',
  },
  // Web Projects
  {
    title: 'Magnetic Feel',
    description:
      'An interactive web experiment using Three.js and magnetic field equations to create realistic attraction effects.',
    imageUrl: assets.projects['magnetic-feel'],
    liveUrl: 'https://magnetic-feel.replit.app/',
    badges: ['Web App', 'Interactive'],
    category: 'code',
  },
  {
    title: "What's the WiFi",
    description: 'QR code generator for sharing WiFi credentials easily.',
    imageUrl: assets.projects.wtw,
    liveUrl: 'https://whats-the-wifi.replit.app/',
    badges: ['Web App', 'Tools'],
    category: 'code',
  },
];
