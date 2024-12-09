const Intro = () => {
  return (
    <>
      <section className="flex flex-col md:flex-row items-center justify-around px-8 py-16 text-center md:text-left bg-slate-900">
        <div className="max-w-lg space-y-6">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-300">
            Hackernews but audio
          </h1>
          <p className="text-small md:text-small text-slate-300">
            Stay informed on the go! Our app transforms Hacker News posts into
            concise, high-quality audio summaries. Perfect for busy
            professionals, students, or anyone who prefers listening over
            reading, the app uses cutting-edge AI technology to convert top
            stories into audio that’s easy to consume anytime, anywhere.
          </p>
          <p className="text-slate-300">
            Whether you're commuting, working out, or relaxing, HackCast ensures
            you never miss out on the latest tech news and discussions. Listen,
            learn, and stay ahead effortlessly!
          </p>
          <a target="_blank" href="https://hack-cast.vercel.app/">
            <button className="bg-slate-800 no-underline group cursor-pointer relative shadow-2xl shadow-zinc-900 rounded-full p-px text-xs font-semibold leading-6  text-white inline-block">
              <span className="absolute inset-0 overflow-hidden rounded-full">
                <span className="absolute inset-0 rounded-full bg-[image:radial-gradient(75%_100%_at_50%_0%,rgba(56,189,248,0.6)_0%,rgba(56,189,248,0)_75%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              </span>
              <div className="relative flex space-x-2 items-center z-10 rounded-full bg-zinc-950 py-0.5 px-4 ring-1 ring-white/10 ">
                <span>Listen Now!</span>
                <svg
                  fill="none"
                  height="16"
                  viewBox="0 0 24 24"
                  width="16"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M10.75 8.75L14.25 12L10.75 15.25"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                  />
                </svg>
              </div>
              <span className="absolute -bottom-0 left-[1.125rem] h-px w-[calc(100%-2.25rem)] bg-gradient-to-r from-emerald-400/0 via-emerald-400/90 to-emerald-400/0 transition-opacity duration-500 group-hover:opacity-40" />
            </button>
          </a>
        </div>
        <img
          src="https://via.placeholder.com/500"
          alt="AI transforming news into audio"
          className="rounded-lg shadow-lg w-full md:w-1/2 max-w-lg mt-8 md:mt-0"
        />
      </section>
    </>
  );
};

export default Intro;
