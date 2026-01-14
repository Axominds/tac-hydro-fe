export const VideoSection = () => {
    return (
        <section id="video-section" className="relative w-full h-screen overflow-hidden">
            <video
                className="absolute inset-0 w-full h-full object-cover"
                autoPlay
                muted
                loop
                playsInline
                src="/videoSection.webm"
            />
            <div className="absolute inset-0 bg-black/20" />

        </section>
    );
};
