import { useMemo } from "react";
import { cn } from "@/lib/utils";
import manifest from "@/generated/image-manifest.json";

/**
 * Responsive image.
 *
 * Emits a <picture> with AVIF and WebP sources plus a JPEG fallback, each with a
 * srcset covering only the widths the source can actually fill (the build script
 * refuses to upscale, so a 200px original yields a single 200px entry).
 *
 * Every instance carries intrinsic width/height so the browser can reserve the
 * box before the bytes arrive — the site previously shipped no dimensions at all,
 * which meant layout shift on every image.
 *
 * Unknown `src` values fall back to a plain <img> rather than throwing, so an
 * image added to public/images without rerunning `npm run images` still renders.
 */

type ManifestEntry = {
  name: string;
  width: number;
  height: number;
  aspectRatio: number;
  widths: number[];
};

const entries = manifest as Record<string, ManifestEntry>;

/**
 * Derived-image root — absolute, and deliberately NOT prefixed with the app's
 * base path.
 *
 * The /variants sub-app is served from the same domain as the root site, so it
 * shares one copy of the images rather than carrying its own. Making these
 * base-relative duplicated 13 MB of derived AVIF/WebP/JPEG into the sub-app's
 * output for no benefit. Only the JS and CSS need the base prefix, and Vite
 * handles those itself.
 */
const DERIVED = "/images/derived";

export type ImgProps = Omit<
  React.ImgHTMLAttributes<HTMLImageElement>,
  "src" | "srcSet" | "width" | "height"
> & {
  /** Filename within public/images, e.g. "profile_image.jpg" or "images/QML.jpg". */
  src: string;
  alt: string;
  /**
   * The `sizes` attribute — how wide the image renders at each breakpoint.
   * Getting this right is what makes the browser pick a small file on a phone.
   */
  sizes?: string;
  /** Skip lazy-loading and fetch eagerly. Use only for above-the-fold images. */
  priority?: boolean;
  className?: string;
  /** Applied to the <picture> wrapper rather than the <img>. */
  wrapperClassName?: string;
};

/** Accepts "QML.jpg", "images/QML.jpg" or "/images/QML.jpg" and returns the key. */
function manifestKey(src: string): string {
  return src.replace(/^\/?images\//, "").replace(/^\//, "");
}

export function Img({
  src,
  alt,
  sizes = "100vw",
  priority = false,
  className,
  wrapperClassName,
  ...rest
}: ImgProps) {
  const key = manifestKey(src);
  const entry = entries[key];

  const srcSets = useMemo(() => {
    if (!entry) return null;
    const build = (ext: string) =>
      entry.widths.map((w) => `${DERIVED}/${entry.name}-${w}.${ext} ${w}w`).join(", ");
    return { avif: build("avif"), webp: build("webp"), jpg: build("jpg") };
  }, [entry]);

  // Not in the manifest — render the original so nothing silently disappears.
  if (!entry || !srcSets) {
    return (
      <img
        src={src.startsWith("/") ? src : `/images/${key}`}
        alt={alt}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        className={className}
        {...rest}
      />
    );
  }

  const fallbackWidth = entry.widths[entry.widths.length - 1];

  return (
    // `block` because <picture> is inline by default, which puts the image on a
    // text baseline and leaves a few pixels of gap beneath it inside the rounded
    // gallery and carousel containers.
    <picture className={cn("block", wrapperClassName)}>
      <source type="image/avif" srcSet={srcSets.avif} sizes={sizes} />
      <source type="image/webp" srcSet={srcSets.webp} sizes={sizes} />
      <img
        src={`${DERIVED}/${entry.name}-${fallbackWidth}.jpg`}
        srcSet={srcSets.jpg}
        sizes={sizes}
        alt={alt}
        width={entry.width}
        height={entry.height}
        loading={priority ? "eager" : "lazy"}
        // Lowercase `fetchpriority`, spread rather than written as a JSX prop:
        // React 18 does not recognise the camelCase `fetchPriority` and logs
        // "React does not recognize the fetchPriority prop on a DOM element" for
        // every instance. React 19 accepts the camelCase form, so this can be
        // simplified after that upgrade.
        {...(priority ? { fetchpriority: "high" } : {})}
        decoding="async"
        className={cn(className)}
        {...rest}
      />
    </picture>
  );
}

export default Img;
