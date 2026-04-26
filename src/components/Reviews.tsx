import { usePortfolioContent } from "../store";
import { SectionShell } from "./SectionShell";

export function ReviewsSection() {
  const content = usePortfolioContent();
  const reviews = [...content.reviews, ...content.reviews];

  return (
    <SectionShell id="reviews" eyebrow="Testimonials" title="What collaborators say about delivery, leadership, and engineering judgment.">
      <div className="review-slider overflow-hidden">
        <div className="review-track flex w-max gap-6">
          {reviews.map((review, index) => (
            <figure key={`${review.id}-${index}`} className="review-card w-[min(82vw,520px)] shrink-0 rounded-[2rem] border border-white/10 bg-gradient-to-br from-white/[0.05] to-white/[0.02] p-8">
              <div className="mb-4 flex gap-1">{[1,2,3,4,5].map((star) => (<svg key={star} className="h-5 w-5 text-amber-400" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>))}</div>
              <blockquote className="text-xl font-medium leading-9 text-white/85">&ldquo;{review.quote}&rdquo;</blockquote>
              <figcaption className="mt-6 flex items-center gap-4 border-t border-white/10 pt-5">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-cyan-500 text-sm font-bold">{review.author.split(" ").map((w) => w[0]).join("").slice(0, 2)}</div>
                <div><p className="font-semibold text-white">{review.author}</p><p className="text-sm text-white/50">{review.role}</p></div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </SectionShell>
  );
}
