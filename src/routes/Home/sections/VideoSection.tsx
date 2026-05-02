import { useSiteSettings } from "../../../../src/hooks/useSiteSettings";
import { convertToEmbedUrl } from "../../../../src/lib/utils";

export const VideoSection = () => {
  const { data: settings, isLoading } = useSiteSettings();

  if (isLoading) {
    return <div className="w-full h-screen bg-black/10 animate-pulse" />;
  }

  const youtubeEmbedUrl = settings?.youtube_url ? convertToEmbedUrl(settings.youtube_url) : null;
  const videoUrl = settings?.video;

  return (
    <section id="video-section" className="relative w-full h-screen overflow-hidden">
      {youtubeEmbedUrl ? (
        <iframe
          src={youtubeEmbedUrl}
          className="absolute inset-0 w-full h-full"
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      ) : videoUrl ? (
        <video
          className="absolute inset-0 w-full h-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          src={videoUrl}
        />
      ) : (
        <video
          className="absolute inset-0 w-full h-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          src="/videoSection.webm"
        />
      )}
      <div className="pointer-events-none absolute inset-0 bg-black/20" />
    </section>
  );
};
