import { usePortfolioContent } from "../store";
import { useMemo } from "react";
import { Link } from "react-router-dom";

export default function NotFoundPage() {
  const content = usePortfolioContent();
  const theme = content.theme;

  const cssVars = useMemo(
    () =>
      ({
        "--color-primary": theme.primary,
        "--color-secondary": theme.secondary,
        "--color-background": theme.background,
        "--color-text": theme.text,
        "--color-muted": theme.muted,
        "--color-panel": theme.panel,
      }) as React.CSSProperties,
    [theme]
  );

  return (
    <main style={cssVars} className="min-h-screen bg-[var(--color-background)] text-[var(--color-text)] overflow-hidden">
      <div className="relative min-h-screen w-full flex items-center justify-center px-5 py-20 sm:px-8">
        {/* Background effects */}
        <div className="absolute inset-0 opacity-50" aria-hidden="true">
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[40rem] w-[40rem] rounded-full bg-[radial-gradient(circle,var(--color-primary),transparent_50%)] blur-[120px]" />
          <div className="absolute bottom-[-10%] right-[-10%] h-[30rem] w-[30rem] rounded-full bg-[radial-gradient(circle,var(--color-secondary),transparent_50%)] blur-[100px]" />
          <div className="absolute top-[-10%] left-[-10%] h-[25rem] w-[25rem] rounded-full bg-[radial-gradient(circle,var(--color-primary),transparent_40%)] blur-[80px]" />
        </div>

        {/* Animated grid pattern overlay */}
        <div className="absolute inset-0 opacity-[0.03]" aria-hidden="true">
          <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
                <path d="M 60 0 L 0 0 0 60" fill="none" stroke="var(--color-primary)" strokeWidth="1" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>

        {/* Main content */}
        <div className="relative z-10 max-w-4xl w-full mx-auto text-center">
          {/* 404 Number */}
          <div className="mb-8 sm:mb-12" aria-hidden="true">
            <div className="relative inline-block">
              <div className="absolute -inset-4 bg-[var(--color-primary)]/20 blur-3xl rounded-full" />
              <span className="relative block text-[10rem] sm:text-[12rem] md:text-[16rem] font-black tracking-[-0.05em] text-transparent bg-clip-text bg-gradient-to-br from-[var(--color-primary)] via-[var(--color-secondary)] to-[var(--color-primary)] select-none">
                404
              </span>
            </div>
          </div>

          {/* Title */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-white mb-4 sm:mb-6">
            Page Not Found
          </h1>

          {/* Description */}
          <p className="max-w-xl mx-auto text-lg sm:text-xl text-[var(--color-muted)] mb-10 sm:mb-12 leading-relaxed px-4">
            The page you're looking for doesn't exist or has been moved. Let's get you back on track.
          </p>

          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 mb-12 sm:mb-16">
            <Link
              to="/"
              className="group relative inline-flex items-center justify-center gap-2 rounded-full bg-white px-8 py-4 text-sm sm:text-base font-bold text-zinc-950 transition-all duration-300 hover:-translate-y-1 hover:bg-white/90 hover:shadow-[0_0_40px_rgba(255,255,255,0.2)] focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-background)]"
            >
              <svg
                className="h-5 w-5 sm:h-6 sm:w-6 transition-transform group-hover:-translate-x-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to Home
            </Link>

            <Link
              to="/projects"
              className="group relative inline-flex items-center justify-center gap-2 rounded-full border border-white/20 px-8 py-4 text-sm sm:text-base font-bold text-white transition-all duration-300 hover:-translate-y-1 hover:bg-white/10 hover:border-white/40 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-background)]"
            >
              View Projects
              <svg
                className="h-5 w-5 sm:h-6 sm:w-6 transition-transform group-hover:translate-x-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
          </div>

          {/* Help text */}
          <div className="pt-8 border-t border-white/10 max-w-lg mx-auto">
            <p className="text-sm text-[var(--color-muted)] mb-4">
              Need help finding what you're looking for?
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 text-sm">
              <a
                href={`mailto:${content.hero.email}`}
                className="text-[var(--color-primary)] hover:text-white hover:underline transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-background)] rounded px-2 py-1"
              >
                Contact Support
              </a>
              <span className="text-[var(--color-muted)] hidden sm:inline">•</span>
              <Link
                to="/"
                className="text-[var(--color-primary)] hover:text-white hover:underline transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-background)] rounded px-2 py-1"
              >
                Browse All Pages
              </Link>
            </div>
          </div>
        </div>

        {/* Floating particles/ornaments */}
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <div className="absolute top-1/4 left-10 h-2 w-2 sm:h-3 sm:w-3 rounded-full bg-[var(--color-primary)]/60 blur-[2px] animate-float" style={{ animationDelay: '0s' }} />
          <div className="absolute top-1/3 right-20 h-1 w-1 sm:h-2 sm:w-2 rounded-full bg-[var(--color-secondary)]/50 blur-[1px] animate-float" style={{ animationDelay: '1s' }} />
          <div className="absolute bottom-1/4 left-32 h-1.5 w-1.5 sm:h-2 sm:w-2 rounded-full bg-[var(--color-primary)]/40 blur-[1px] animate-float" style={{ animationDelay: '2s' }} />
          <div className="absolute bottom-1/3 right-32 h-2 w-2 sm:h-3 sm:w-3 rounded-full bg-[var(--color-secondary)]/30 blur-[2px] animate-float" style={{ animationDelay: '0.5s' }} />
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) scale(1); opacity: 1; }
          50% { transform: translateY(-20px) scale(1.1); opacity: 0.7; }
        }
        .animate-float {
          animation: float 4s ease-in-out infinite;
        }
        
        @media (prefers-reduced-motion: reduce) {
          .animate-float {
            animation: none;
          }
        }

        @media (max-width: 480px) {
          .text-[10rem] { font-size: 8rem; }
          .text-[12rem] { font-size: 9rem; }
          .text-[16rem] { font-size: 10rem; }
        }
      `}</style>
    </main>
  );
}
