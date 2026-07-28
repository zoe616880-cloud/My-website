import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "./icons";

type PageHeroProps = {
  eyebrow: string;
  title: string;
  description: string;
  image?: string;
  actionLabel?: string;
  actionHref?: string;
};

export function PageHero({
  eyebrow,
  title,
  description,
  image,
  actionLabel = "Request a Quote",
  actionHref = "/request-a-quote",
}: PageHeroProps) {
  return (
    <section className={`page-hero${image ? " page-hero-image" : ""}`}>
      <div className="page-hero-inner">
        <div className="page-hero-copy">
          <p>{eyebrow}</p>
          <h1>{title}</h1>
          <span>{description}</span>
          <Link className="button" href={actionHref}>
            {actionLabel} <ArrowRight size={18} />
          </Link>
        </div>
        {image ? (
          <div className="page-hero-media">
            <Image 
              src={image} 
              alt="" 
              width={800} 
              height={600} 
              style={{ objectFit: 'cover', width: '100%', height: '100%' }} 
            />
          </div>
        ) : null}
      </div>
    </section>
  );
}
