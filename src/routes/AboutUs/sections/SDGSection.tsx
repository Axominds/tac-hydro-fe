import { Zap, TrendingUp, Cog, Leaf } from 'lucide-react';

const sdgData = [
    {
        id: '7',
        title: 'Affordable and Clean Energy',
        description: 'We develop reliable, clean hydropower projects that strengthen energy security and reduce dependence on fossil fuels.',
        color: '#FDB713',
        label: 'CLEAN POWER',
        icon: <Zap className="w-5 h-5" />
    },
    {
        id: '8',
        title: 'Decent Work & Economic Growth',
        description: 'We create skilled employment and build local technical capacity through responsible engineering practices.',
        color: '#A21942',
        label: 'LOCAL GROWTH',
        icon: <TrendingUp className="w-5 h-5" />
    },
    {
        id: '9',
        title: 'Industry & Infrastructure',
        description: 'We deliver innovative engineering solutions across the full hydro cycle from identification to construction supervision.',
        color: '#FD6925',
        label: 'RESILIENT INFRA',
        icon: <Cog className="w-5 h-5" />
    },
    {
        id: '13',
        title: 'Climate Action',
        description: 'By promoting renewable energy and climate-resilient designs, we contribute to long-term carbon emission reduction.',
        color: '#3F7E44',
        label: 'LOW CARBON',
        icon: <Leaf className="w-5 h-5" />
    }
];

export const SDGSection = () => {
    return (
        <section id="sdg-section" className="w-full py-10 sm:py-16 bg-[#f8f9fa]">
            <div className="max-w-[1240px] mx-auto px-6 sm:px-8">
                {/* Header with Logos */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-8">
                    <div className="flex flex-col gap-4">
                        <img
                            src="/sustainableDevelopmentGoals/sdg_logo.png"
                            alt="UN SDG Logo"
                            className="h-16 md:h-20 object-contain w-fit"
                        />
                        <h2 className="text-3xl sm:text-4xl lg:text-[40px] font-bold text-[#2c3e50] leading-tight">
                            Our Contribution to the Sustainable Development Goals (SDGs)
                        </h2>
                    </div>
                    <img
                        src="/sustainableDevelopmentGoals/sdg_wheel_with_icon.png"
                        alt="SDG Color Wheel"
                        className="h-32 md:h-40 object-contain"
                    />
                </div>

                {/* Intro Description */}
                <p className="text-[#555555] text-lg leading-relaxed mb-8 max-w-4xl">
                    TAC Hydro Consultancy Pvt. Ltd. aligns its engineering services with the United Nations Sustainable Development Goals through practical, project-based actions:
                </p>

                {/* SDG Cards Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {sdgData.map((sdg) => (
                        <div
                            key={sdg.id}
                            className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 flex flex-col h-full hover:shadow-md transition-shadow duration-300"
                        >
                            {/* SDG Number Box */}
                            <div
                                className="w-12 h-12 rounded-lg flex items-center justify-center text-white font-bold text-xl mb-6 shadow-sm"
                                style={{ backgroundColor: sdg.color }}
                            >
                                {sdg.id}
                            </div>

                            {/* Title & Description */}
                            <h3 className="text-xl font-bold text-[#2c3e50] mb-4">
                                {sdg.title}
                            </h3>
                            <p className="text-[#666666] text-base leading-relaxed mb-8 flex-grow">
                                {sdg.description}
                            </p>

                            {/* Label & Icon at Bottom */}
                            <div
                                className="flex items-center gap-2 mt-auto font-bold text-xs tracking-wider"
                                style={{ color: sdg.color }}
                            >
                                {sdg.icon}
                                <span>{sdg.label}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};
