import { cn } from "@/lib/utils";

const TORN_EDGE_SRC = "/torn-edge.svg";

export default function TornPhoto({
  src,
  alt,
  className,
  imageClassName,
  edgeClassName,
  children,
  ...imageProps
}) {
  return (
    <div className={cn("torn-photo-container", className)}>
      <div className="torn-photo-mask">
        <img
          className={cn("torn-photo-image", imageClassName)}
          src={src}
          alt={alt}
          {...imageProps}
        />
        {children}
      </div>

      <img
        className={cn("torn-bottom", edgeClassName)}
        src={TORN_EDGE_SRC}
        alt=""
        aria-hidden="true"
      />
    </div>
  );
}
