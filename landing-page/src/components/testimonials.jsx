"use client";

import React from "react";
import { InfiniteMovingCards } from "./ui/infinite-moving-cards";

export function Testimonals() {
  return (
    <div className="bg-slate-950 rounded-md flex flex-col antialiased bg-white dark:bg-black dark:bg-grid-white/[0.05] items-center justify-center relative overflow-hidden">
      <InfiniteMovingCards
        items={testimonials}
        direction="right"
        speed="slow"
      />
    </div>
  );
}

const testimonials = [
  {
    quote:
      "'A Game-Changer for My Commute!' I've always struggled to stay updated with tech news during my busy day. Hack Cast makes it effortless. Now, I listen to Hacker News while driving or at the gym. It’s like having a personal tech podcast tailored just for me. Highly recommend it!",
    name: "— Alex M., Software Engineer",
    title: "A Game-Changer for My Commute!",
  },
  {
    quote:
      "'Tech News Meets Convenience!' Hack Cast combines my two favorite things: technology and podcasts. It’s smooth, fast, and intuitive. The audio quality is top-notch, and the playback customization makes it perfect for multitasking. This app has changed the way I consume news!",
    name: "— Priya K., Data Scientist",
  },
  {
    quote:
      "'Finally, News Without the Screen Time' I wanted to reduce my screen time but still stay informed about the tech world. Hack Cast delivers exactly that. Listening to curated stories while doing chores is such a productivity hack!",
    name: "— Ryan L., Product Manager",
  },
  {
    quote:
      "'Perfect for My Daily Runs!' I love listening to Hack Cast during my morning jogs. It’s engaging and makes me feel smarter with every step. The AI summaries are concise but still capture all the details.",
    name: "— Emma T., AI Enthusiast",
  },
  {
    quote:
      "'Seamless and Brilliant!' Hack Cast is exactly what I didn’t know I needed. The interface is clean, and the transition from text to audio is seamless. It’s my go-to app for tech updates now. Can't wait to see what features come next!",
    name: "— John P., Startup Founder",
  },
];
