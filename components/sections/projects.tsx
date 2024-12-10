'use client';

import { motion } from 'framer-motion';
import { ProjectGrid, type Project } from '@/components/project-grid';
import { assets } from '@/config/assets';

const projects: Project[] = [
  {
    title: 'Replit + Y Combinator + a16z',
    description: "Replit's biggest event of 2024, hosted at Y Combinator in partnership with a16z.",
    liveUrl: 'https://x.com/mattppal/status/1844400953371333035',
    imageUrl: assets.projects.yc,
    imageAlt: 'Replit and Y Combinator event showcase',
    badges: ['Event', 'Partnership'],
  },
  {
    title: 'xAI Hackathon',
    description:
      'The first hackathon at xAI, located in their new office at the historic Pioneer Building in Mission.',
    imageUrl: assets.projects.xai,
    liveUrl: 'https://x.com/mattppal/status/1845583077692903884',
    badges: ['Event', 'AI'],
  },
];

const codeProjects: Project[] = [
  {
    title: 'Magnetic Feel',
    description:
      'An interactive web experiment using Three.js and magnetic field equations to create realistic attraction effects. Built with shadcn components and fully responsive for mobile touch interactions.',
    imageUrl: assets.projects['magnetic-feel'],
    liveUrl: 'https://magnetic-feel.replit.app/',
    badges: ['Web App', 'Interactive'],
  },
  // {
  //   title: 'vid2gif',
  //   description: 'A simple web app that converts video files to animated GIFs.',
  //   imageUrl: assets.projects.vid2gif,
  //   liveUrl: 'https://vid2gif.replit.app/',
  //   badges: ['Web App', 'Tools'],
  // },
  {
    title: "What's the WiFi",
    description: 'QR code generator for sharing WiFi credentials easily.',
    imageUrl: assets.projects.wtw,
    liveUrl: 'https://whats-the-wifi.replit.app/',
    badges: ['Web App', 'Tools'],
  },
];

const content: Project[] = [
  {
    title: 'Replit Content',
    description: 'Educational content and tutorials about coding and deployment on Replit.',
    imageUrl: assets.projects.youtube,
    liveUrl: 'https://youtube.com/@replit',
    badges: ['Education', 'Video'],
  },
  {
    title: 'Technical Whitepapers',
    description:
      "Technical whitepapers, written in collaboration with O'Reilly Media for Coalesce & Databricks",
    imageUrl: assets.projects.uetl,
    liveUrl: 'https://zdntzuxuw3xqvcia.public.blob.vercel-storage.com/whitepapers/orm-uetl.pdf',
    badges: ['Technical Writing', 'Education'],
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export function ProjectsSection() {
  const allProjects = [
    ...projects.map((p) => ({ ...p, category: 'event' as const })),
    ...codeProjects.map((p) => ({ ...p, category: 'code' as const })),
    ...content.map((p) => ({ ...p, category: 'content' as const })),
  ];

  return (
    <section id="projects" className="section-padding">
      <div className="container mx-auto px-s">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
        >
          <motion.h2
            className="mb-l text-center text-3xl font-bold md:text-3xl"
            variants={itemVariants}
          >
            Fun Projects
          </motion.h2>

          <ProjectGrid projects={allProjects} showCategories />
        </motion.div>
      </div>
    </section>
  );
}
