export default function ShapedVideoCard({
  shape = 'burger', // 'burger' | 'icecream'
  videoSrc, // e.g. '/videos/lina-dish.mp4'
  posterSrc, // optional fallback image
  className = '',
}) {
  const clipId = shape === 'burger' ? 'burger-clip' : 'icecream-clip'

  return (
    <div className={`relative aspect-square w-64 overflow-hidden sm:w-80 ${className}`}>
      <video
        className="h-full w-full object-cover"
        style={{
          clipPath: `url(#${clipId})`,
          WebkitClipPath: `url(#${clipId})`,
        }}
        src={videoSrc}
        poster={posterSrc}
        autoPlay
        loop
        muted
        playsInline
      />
    </div>
  )
}