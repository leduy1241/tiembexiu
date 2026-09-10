import Image from "next/image";

/** Lossless source crops: bypass recompression to preserve the reference lettering. */
export function ReferenceImage({ name, width, height, alt = "", className = "", preload = false }: {
  name: string; width: number; height: number; alt?: string; className?: string; preload?: boolean;
}) {
  return <Image src={`/assets/reference/${name}.webp`} width={width} height={height} alt={alt} className={className} unoptimized preload={preload} />;
}
