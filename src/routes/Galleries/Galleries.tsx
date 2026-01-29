import { HeaderSection } from "../../components/sections/HeaderSection";
import { FooterSection } from "../../components/sections/FooterSection";
import { BannerSection } from "./sections/BannerSection";
import { GallerySection } from "./sections/GallerySection";

export const Galleries = () => {
    return (
        <div className="overflow-hidden w-full relative">
            <HeaderSection />
            <BannerSection />
            <GallerySection />
            <FooterSection />
        </div>
    );
};
