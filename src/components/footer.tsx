"use client";

const Footer = () => {
  return (
    <footer className="bg-blue-950/50 backdrop-blur-sm border-t border-white/5 py-3">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-1 text-xs">
          <span className="text-white/40">Data sources:</span>
          <a
            href="https://oceanexplorer.noaa.gov/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-cyan-300 hover:text-white transition-colors relative px-2 py-0.5 font-medium"
          >
            <span className="relative z-10">NOAA</span>
            <span className="absolute inset-0 blur-xl bg-cyan-400/50 rounded-full scale-150 animate-pulse" />
            <span className="absolute inset-0 blur-md bg-cyan-300/60 rounded-full" />
          </a>
          <a
            href="https://www.mbari.org/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-300 hover:text-white transition-colors relative px-2 py-0.5 font-medium"
          >
            <span className="relative z-10">MBARI</span>
            <span className="absolute inset-0 blur-xl bg-blue-400/50 rounded-full scale-150 animate-pulse" />
            <span className="absolute inset-0 blur-md bg-blue-300/60 rounded-full" />
          </a>
          <a
            href="https://www.manoa.hawaii.edu/exploringourfluidearth/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-purple-300 hover:text-white transition-colors relative px-2 py-0.5 font-medium"
          >
            <span className="relative z-10">UH Mānoa</span>
            <span className="absolute inset-0 blur-xl bg-purple-400/50 rounded-full scale-150 animate-pulse" />
            <span className="absolute inset-0 blur-md bg-purple-300/60 rounded-full" />
          </a>
          <a
            href="https://www.marinespecies.org/deepsea/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-indigo-300 hover:text-white transition-colors relative px-2 py-0.5 font-medium"
          >
            <span className="relative z-10">WoRDSS</span>
            <span className="absolute inset-0 blur-xl bg-indigo-400/50 rounded-full scale-150 animate-pulse" />
            <span className="absolute inset-0 blur-md bg-indigo-300/60 rounded-full" />
          </a>
          <a
            href="https://ocean.si.edu/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-pink-300 hover:text-white transition-colors relative px-2 py-0.5 font-medium"
          >
            <span className="relative z-10">Smithsonian</span>
            <span className="absolute inset-0 blur-xl bg-pink-400/50 rounded-full scale-150 animate-pulse" />
            <span className="absolute inset-0 blur-md bg-pink-300/60 rounded-full" />
          </a>
          <span className="text-white/30">•</span>
          <span className="text-white/40 relative px-2 py-0.5">
            <span className="relative z-10">etc. c/o Google Search</span>
            <span className="absolute inset-0 blur-xl bg-white/30 rounded-full scale-150 animate-pulse" />
            <span className="absolute inset-0 blur-md bg-white/40 rounded-full" />
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
