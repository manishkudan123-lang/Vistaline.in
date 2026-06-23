const SPOTLIGHT_R = 260;

interface SpotlightRevealProps {
  baseImage: string;
  revealImage: string;
  cursorX: number;
  cursorY: number;
}

export default function SpotlightReveal({ baseImage, revealImage, cursorX, cursorY }: SpotlightRevealProps) {
  const maskStyle = {
    maskImage: `radial-gradient(circle ${SPOTLIGHT_R}px at ${cursorX}px ${cursorY}px, white 0%, white 40%, rgba(255,255,255,0.75) 60%, rgba(255,255,255,0.4) 75%, rgba(255,255,255,0.12) 88%, transparent 100%)`,
    WebkitMaskImage: `radial-gradient(circle ${SPOTLIGHT_R}px at ${cursorX}px ${cursorY}px, white 0%, white 40%, rgba(255,255,255,0.75) 60%, rgba(255,255,255,0.4) 75%, rgba(255,255,255,0.12) 88%, transparent 100%)`,
  };

  return (
    <>
      <img
        src={baseImage}
        alt=""
        referrerPolicy="no-referrer"
        className="absolute inset-0 w-full h-full object-cover"
        draggable={false}
      />
      <div
        className="absolute inset-0 z-30 pointer-events-none"
        style={maskStyle}
      >
        <img
          src={revealImage}
          alt=""
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover"
          draggable={false}
        />
      </div>
    </>
  );
}
