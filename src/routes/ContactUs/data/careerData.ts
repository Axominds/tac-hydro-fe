
export type JobType = "Full Time" | "Internship" | "Independent Consultant";

export interface JobRole {
    id: string;
    title: string;
    type: JobType;
    location: string;
    description: string;
    responsibilities: string[];
    qualifications: string[];
}

export const CAREER_DATA: JobRole[] = [
    // Civil/Design Engineering
    {
        id: "civil-engineer",
        title: "Civil Engineer",
        type: "Full Time",
        location: "Kathmandu / Site",
        description: "Participate in the design and drafting of hydropower project components, including site selection, conceptual design, and detailed engineering drawings.",
        responsibilities: [
            "Participate in the design and drafting of hydropower project components, including site selection.",
            "Collaborate with project teams to develop comprehensive design plans, ensuring alignment with project goals and technical specifications.",
            "Utilize design software and tools to produce accurate and detailed engineering drawings for various project components.",
            "Assist in the preparation of technical reports, documentation, and progress updates related to design activities.",
            "Review and interpret engineering drawings, specifications, and calculations to ensure accuracy and compliance.",
            "Work closely with senior engineers to ensure designs meet quality standards, safety regulations, and project requirements.",
            "Proactively contribute innovative ideas and solutions to enhance the efficiency and effectiveness of hydropower project designs.",
            "Keep up-to-date with industry trends and advancements to continuously improve design methodologies."
        ],
        qualifications: [
            "Bachelor’s degree in Civil Engineering or equivalent.",
            "At least 2-5 year of relevant experience in the design and drafting of hydropower/Water Resources project components.",
            "Strong understanding of civil engineering principles, particularly in hydropower applications.",
            "Proficiency in design software and tools used in engineering drafting.",
            "Excellent attention to detail and a commitment to producing accurate and high-quality design drawings.",
            "Effective communication skills to work collaboratively with project teams and stakeholders.",
            "Enthusiasm for learning and keeping up with the latest advancements in hydropower design.",
            "Ability to contribute creative and innovative ideas to design solutions.",
            "Desire to work in a dynamic and challenging environment."
        ]
    },
    {
        id: "hydropower-hydraulic-engineer",
        title: "Hydropower/Hydraulic Engineer",
        type: "Full Time",
        location: "Kathmandu / Site",
        description: "Provide technical support in hydropower projects, from site selection to project commissioning, including design capabilities in different disciplines of Hydraulics.",
        responsibilities: [
            "Provide technical support in hydropower projects, from site selection to project commissioning.",
            "Design capabilities in different disciplines of Hydraulics, assisting in headworks, waterways, surge shaft and powerhouse layouts.",
            "Understanding of Hydro-mechanical requirements of gates, valves, stoplogs, trash racks.",
            "Preparing technical reports (pre-feasibility, feasibility study, detailed design, tender design), documentation, and progress updates for effective project communication.",
            "Liaising with supervisors, draftspersons and other specialists on issues relating to the designated tasks and delivery of work on packages and projects."
        ],
        qualifications: [
            "Minimum master’s degree in hydropower, hydraulics, water resource, structural or civil engineering.",
            "At least 5-10 years of working experience in the hydraulic design of hydropower/Water Resources components.",
            "Enthusiastic with knowledge in fundamental aspects of civil engineering and eager to learn and update.",
            "Excellent command in English both speaking and writing- is a must.",
            "Software knowledge: full proficiency in MS office, Auto CAD and other relevant design software will be an advantage.",
            "Ability to work in multi-disciplinary teams.",
            "Flexibility and mobility to travel to site is expected."
        ]
    },
    {
        id: "structural-engineer",
        title: "Structural Engineer",
        type: "Full Time",
        location: "Kathmandu",
        description: "Lead our structural engineering team, providing technical direction, mentorship, and oversight throughout the project lifecycle.",
        responsibilities: [
            "Work with the structural engineering team on hydropower projects, providing technical direction, mentorship, and oversight throughout the project lifecycle.",
            "Develop and review detailed structural designs and analyses for hydropower structures, including concrete and steel elements for dams, spillways, intake structures, and other infrastructure components.",
            "Provide expert advice on structural engineering issues, including advanced structural analysis, load calculations, and material selection.",
            "Manage project schedules, budgets, and resources, ensuring timely delivery of high-quality engineering solutions.",
            "Ensure all engineering work adheres to relevant codes, standards, and best practices. Perform quality checks on design documents, reports, and calculations.",
            "Drive innovation in structural design and construction methods.",
            "Ensure that designs and construction practices comply with environmental regulations, safety standards, and other legal requirements.",
            "Prepare and review technical reports, design documents, and project documentation.",
            "Work closely with other engineering disciplines, such as geotechnical, hydraulic, and mechanical engineers."
        ],
        qualifications: [
            "Bachelor’s degree in Civil Engineering (Master’s degree in Structural Engineering preferred).",
            "At least 2–5 years of relevant experience in the structural design and analysis of hydropower or water resource project components.",
            "Advanced knowledge of structural mechanics, finite element analysis (FEA), and seismic engineering specifically for hydraulic structures.",
            "Expert-level command of structural software like SAP2000, STAAD.Pro, MIDAS, and AutoCAD.",
            "Proven ability to manage multidisciplinary teams, mentor junior staff, and handle complex project logistics.",
            "Exceptional communication and presentation skills.",
            "Strong track record of completing complex engineering projects on time and within budget.",
            "Ability to identify technical risks and implement innovative mitigation strategies."
        ]
    },
    {
        id: "independent-consultant-hydraulics",
        title: "Independent Consultant (Hydraulics)",
        type: "Independent Consultant",
        location: "Remote / On-site",
        description: "Serve as a high-level technical advisor for our most complex hydropower projects, validating sophisticated numerical and physical models.",
        responsibilities: [
            "Provide high-level peer reviews of hydraulic transient analyses, including water hammer simulations and surge tank optimization.",
            "Validate protocols and results for Physical Hydraulic Model (PHM) testing to ensure design reliability.",
            "Offer strategic advisory on headworks design, focusing on de-sanding basin efficiency and the mitigation of intake vortices.",
            "Oversee and verify Computational Fluid Dynamics (CFD) modeling for spillway performance and energy dissipator effectiveness.",
            "Deliver technical direction on river training works and sediment management strategies tailored to the unique challenges of Himalayan river systems.",
            "Advise on the rehabilitation and modernization of existing hydraulic structures to improve operational efficiency."
        ],
        qualifications: [
            "Master’s degree or PhD in Hydraulics, Fluid Mechanics, or Water Resources Engineering.",
            "15+ years of specialized experience in the hydraulic design and review of major hydropower projects.",
            "Proven track record in conducting peer reviews for high-head projects and complex hydraulic systems.",
            "Expert-level understanding of sediment transport, hydraulic transients, and flood routing.",
            "Familiarity with international standards (USBR, IS, IEC) and best practices in hydraulic engineering.",
            "Demonstrated ability to provide strategic technical leadership and mentorship to senior design teams.",
            "Prior experience with Himalayan hydropower projects or similar geologically active regions."
        ]
    },
    {
        id: "independent-consultant-structural",
        title: "Independent Consultant (Structural)",
        type: "Independent Consultant",
        location: "Remote / On-site",
        description: "Provide expert oversight for large-scale hydropower projects, navigating the complexities of mass concrete behavior and high-seismic zones.",
        responsibilities: [
            "Provide expert peer review of advanced Finite Element Analysis (FEA) for concrete gravity dams, arch dams, and spillway structures.",
            "Lead seismic vulnerability assessments and validate dynamic response analyses using site-specific seismic design parameters.",
            "Offer strategic advisory on mass concrete thermal analysis, cooling systems, and crack control measures.",
            "Conduct structural integrity audits for powerhouse superstructures, underground caverns, and desanding chambers.",
            "Oversee the design and validation of specialized hydraulic steel structures, including high-head radial gates and stoplogs.",
            "Advise on the selection of advanced construction materials and reinforcement techniques for high-wear hydraulic environments.",
            "Review and approve structural monitoring and instrumentation plans for long-term project safety."
        ],
        qualifications: [
            "Master’s degree or PhD in Structural Engineering or Earthquake Engineering.",
            "15+ years of specialized experience in the design and structural analysis of major hydropower or water resource infrastructure.",
            "Expert-level proficiency in advanced structural software such as SAP2000, STAAD.Pro, MIDAS, or ANSYS.",
            "Deep expertise in seismic design codes and the application of Finite Element Methods (FEM) to hydraulic structures.",
            "Proven experience in the design of underground caverns and complex support systems in varying rock mass conditions.",
            "Demonstrated ability to provide leadership and technical mentorship to multi-disciplinary engineering teams.",
            "Significant experience addressing the unique structural challenges of the Himalayan region or similar active tectonic zones."
        ]
    },
    {
        id: "civil-engineering-intern",
        title: "Civil Engineering Intern",
        type: "Internship",
        location: "Kathmandu",
        description: "Gain practical exposure to the 'Detail Engineering Design' phase of hydropower development under the mentorship of senior engineers.",
        responsibilities: [
            "Support senior engineers in drafting and 3D modeling of hydraulic structures using AutoCAD and Civil 3D.",
            "Assist in the preparation of quantity estimates, feasibility reports, and technical project documentation.",
            "Help organize and manage project databases, technical drawings, and survey data logs.",
            "Participate in internal design reviews and shadow engineers during project site visits and topographical surveys.",
            "Contribute to the preparation of tender documents and progress updates for active project packages."
        ],
        qualifications: [
            "Final year student or recent graduate in Civil Engineering.",
            "Foundational proficiency in AutoCAD and a strong interest in learning Civil 3D.",
            "Strong academic background in fluid mechanics, structural analysis, and water resources engineering.",
            "High attention to detail and an eagerness to learn specialized hydropower design methodologies.",
            "Effective communication skills and the ability to work collaboratively in a professional office environment."
        ]
    },

    // Mechanical Engineering
    {
        id: "mechanical-engineer",
        title: "Mechanical Engineer",
        type: "Full Time",
        location: "Site",
        description: "Play a pivotal role in the installation, supervision, and quality control of pipes and gates at our hydropower project site.",
        responsibilities: [
            "Lead the installation and supervision of pipes and gates at the hydropower project site, ensuring adherence to design specifications and quality standards.",
            "Collaborate closely with project teams to develop detailed installation plans, schedules, and resource allocation for mechanical components.",
            "Monitor and oversee the installation process, ensuring efficient workflow, safety compliance, and timely project milestones.",
            "Conduct quality control inspections and tests to verify the integrity of installed mechanical systems, including pipes and gates.",
            "Proactively identify and address any installation challenges or discrepancies to ensure seamless project execution.",
            "Coordinate with contractors, suppliers, and subcontractors to ensure the smooth procurement and delivery of mechanical components.",
            "Document installation activities, progress reports, and quality control records for accurate project documentation.",
            "Uphold strict compliance with safety regulations and environmental standards throughout the installation process."
        ],
        qualifications: [
            "Bachelor’s degree in Mechanical Engineering or equivalent.",
            "At least 2-5 year of hands-on experience in the installation and supervision of pipes and gates at a hydropower project site.",
            "Strong understanding of mechanical engineering principles, particularly in hydropower project applications.",
            "Proficiency in reading and interpreting engineering drawings and specifications related to pipes and gates.",
            "Excellent problem-solving skills and attention to detail, with a focus on delivering high-quality results.",
            "Effective communication skills to coordinate with project teams, contractors, and stakeholders.",
            "Knowledge of quality control procedures and the ability to conduct inspections and tests.",
            "Willingness to work on-site at the hydropower project location and travel as needed."
        ]
    },
    {
        id: "mechanical-engineering-intern",
        title: "Mechanical Engineering Intern",
        type: "Internship",
        location: "Site",
        description: "Support our site-based project teams in the installation and quality control of mechanical components.",
        responsibilities: [
            "Assist mechanical engineers in the site supervision of pipe, gate, and valve installations.",
            "Support the documentation of daily site activities, progress reports, and equipment delivery logs.",
            "Observe and help document quality control inspections, including welding checks and pressure testing protocols.",
            "Assist in coordinating the logistics of mechanical components from procurement to site delivery.",
            "Support the implementation of site safety regulations and environmental compliance standards during installation."
        ],
        qualifications: [
            "Final year student or recent graduate in Mechanical Engineering.",
            "Willingness to work in remote project site environments and mountainous terrains.",
            "Basic understanding of hydro-mechanical components, materials science, and fluid machinery.",
            "Strong awareness of industrial safety standards and a commitment to precision.",
            "Adaptable mindset with the ability to solve practical challenges in a dynamic site environment."
        ]
    },

    // Electrical Engineering
    {
        id: "electrical-engineer",
        title: "Electrical Engineer",
        type: "Full Time",
        location: "Kathmandu / Site",
        description: "Design, analyze, and implement electrical systems for hydropower projects, including powerhouses, switchyards, and transmission components.",
        responsibilities: [
            "Design, analyze, and implement electrical systems for hydropower projects, including powerhouses, switchyards, and transmission components.",
            "Prepare detailed electrical designs, drawings, and specifications for various project stages (feasibility, detailed design, and construction).",
            "Perform load flow, short circuit, and protection coordination studies using relevant electrical software.",
            "Ensure that all electrical systems comply with national and international standards and project requirements.",
            "Collaborate closely with multidisciplinary teams to integrate electrical designs with civil, mechanical, and hydromechanical components.",
            "Conduct site visits and inspections to verify design implementation and ensure quality control.",
            "Assist in preparing tender documents, technical specifications, and cost estimates for electrical works.",
            "Support commissioning, testing, and troubleshooting activities during project implementation.",
            "Stay updated on emerging technologies and best practices in hydropower electrical systems."
        ],
        qualifications: [
            "Minimum Bachelor’s degree in Electrical Engineering (Master’s degree preferred).",
            "Minimum 2 years of experience in electrical design and implementation for hydropower or similar infrastructure projects.",
            "Strong understanding of power system design, protection systems, switchgear, transformers, and control systems.",
            "Proficiency in relevant software such as ETAP, AutoCAD, or similar electrical design tools.",
            "Excellent analytical and problem-solving skills with strong attention to detail.",
            "Ability to work effectively in multidisciplinary project teams.",
            "Willingness to travel and work in project or remote site locations as required."
        ]
    },
    {
        id: "electrical-engineering-intern",
        title: "Electrical Engineering Intern",
        type: "Internship",
        location: "Kathmandu / Site",
        description: "Support our design and implementation team, gaining a comprehensive look at the electrical life cycle of a hydropower project.",
        responsibilities: [
            "Assist in the drafting of Single Line Diagrams (SLDs), electrical layout plans, and grounding system designs.",
            "Support engineers in data collection and preliminary analysis for load flow and short circuit studies.",
            "Help maintain and document technical specifications for transformers, switchgear, and control systems.",
            "Shadow senior engineers during site inspections, commissioning activities, and troubleshooting phases.",
            "Assist in the preparation of technical checklists and project monitoring reports."
        ],
        qualifications: [
            "Final year student or recent graduate in Electrical Engineering.",
            "Sound knowledge of basic circuit theory, power systems, and electrical machines.",
            "Basic proficiency in AutoCAD; familiarity with ETAP or similar electrical design tools is a plus.",
            "Analytical mindset with a strong interest in sustainable energy and grid integration.",
            "Proactive attitude and the ability to handle technical data with high accuracy."
        ]
    },

    // Engineering Geology
    {
        id: "engineering-geologist",
        title: "Engineering Geologist",
        type: "Full Time",
        location: "Site",
        description: "Undertake tunnel geology assessments, focusing on rock classification and collaborative analysis of geological conditions.",
        responsibilities: [
            "Undertake tunnel geology assessments, focusing on rock classification as per face mapping.",
            "Analyze geological conditions to support safe and efficient tunnel construction in hydropower projects.",
            "Collaborate closely with project teams to provide insights and recommendations based on geological data.",
            "Conduct field surveys, geological mapping, and rock sampling to ensure accurate classification.",
            "Use specialized tools and equipment to gather geological data and monitor tunnel conditions.",
            "Prepare comprehensive reports detailing rock classification, geological hazards, and recommendations.",
            "Liaise with geotechnical engineers and other experts to ensure integration of geological findings.",
            "Stay updated with advancements in tunnel geology and contribute to the development of best practices."
        ],
        qualifications: [
            "Minimum master’s degree in Geology or related field.",
            "Minimum 2 years of hands-on experience in tunnel geology, specifically in rock classification as per face mapping.",
            "Sound knowledge of geological principles, rock types, and classification methodologies.",
            "Proficiency in geotechnical software and tools used for geological assessments.",
            "Excellent analytical skills and attention to detail in interpreting geological data.",
            "Ability to work in multi-disciplinary teams.",
            "Willingness to work in remote locations and travel as required."
        ]
    },
    {
        id: "independent-consultant-geology",
        title: "Independent Consultant (Engineering Geology)",
        type: "Independent Consultant",
        location: "Remote / On-site",
        description: "Provide high-level technical oversight for tunneling and underground works, translating complex geological data into actionable risk assessments.",
        responsibilities: [
            "Provide independent verification of rock mass classifications using RMR, Q-system, and GSI.",
            "Lead seismotectonic assessments, including active fault mapping and determination of PGA impacts.",
            "Optimize rock support systems (NATM/NMT) for large-span powerhouse caverns.",
            "Develop hydrogeological models to predict and manage high-pressure groundwater ingress.",
            "Perform expert interpretation of geophysical survey data (SRT, ERT) and deep borehole logging.",
            "Validate the implementation of real-time convergence monitoring and specialized instrumentation."
        ],
        qualifications: [
            "Master’s degree or PhD in Engineering Geology or Applied Geology.",
            "15+ years of specialized experience in Himalayan tunneling.",
            "Advanced knowledge of rock mechanics, including brittle failure and squeezing ground behavior.",
            "Proven expertise in interpreting subsurface investigation data for significant overburdens.",
            "Deep understanding of the seismotectonics of the Main Himalayan Thrust (MHT) and associated fault systems.",
            "Exceptional technical reporting skills.",
            "Demonstrated history of acting as a 'Proof Consultant' or 'Expert Reviewer'."
        ]
    },
    {
        id: "independent-consultant-geotechnical",
        title: "Independent Consultant (Geotechnical Engineering)",
        type: "Independent Consultant",
        location: "Remote / On-site",
        description: "Provide expert advisory on foundation engineering and slope stabilization, ensuring the geomechanical integrity of critical structures.",
        responsibilities: [
            "Lead advanced geomechanical modeling for dam foundation stability using 3D LEM and FEM.",
            "Conduct peer reviews of slope stabilization designs in fragile terrains.",
            "Provide technical oversight for deep foundation systems.",
            "Advise on specialized ground improvement techniques such as jet grouting and consolidation grouting.",
            "Analyze complex seepage regimes through foundations and embankments.",
            "Validate geotechnical investigation programs to ensure accuracy of shear strength and stiffness parameters."
        ],
        qualifications: [
            "Master’s degree or PhD in Geotechnical Engineering.",
            "15+ years of specialized experience in geotechnical design for major hydropower or critical infrastructure.",
            "Expert-level proficiency in geomechanical software suites such as Plaxis 2D/3D, Rocscience, and GeoStudio.",
            "Deep expertise in soil-structure interaction and rock-socketed foundations.",
            "Extensive experience in excessive glacial till, colluvium, and alluvial deposits.",
            "Proven ability to provide strategic technical leadership."
        ]
    },
    {
        id: "geology-intern",
        title: "Geology Intern",
        type: "Internship",
        location: "Site",
        description: "Transition from classroom maps to actual tunnel faces, learning to interpret earth's secrets under the mentorship of seasoned geologists.",
        responsibilities: [
            "Support senior geologists in conducting tunnel face mapping and detailed rock mass logging.",
            "Assist in the systematic collection, labeling, and cataloging of rock samples for laboratory analysis.",
            "Help maintain geological data logs and digitize field mapping results into professional geological reports.",
            "Observe the installation of rock support systems (shotcrete, rock bolts, steel sets) based on real-time data.",
            "Participate in the monitoring of geological hazards and ground deformation.",
            "Support the preparation of geological longitudinal sections and 3D subsurface models."
        ],
        qualifications: [
            "Recent graduate or current Master’s student in Geology, Engineering Geology, or Applied Geology.",
            "Comfortable working in physically demanding environments, including active tunnel sites.",
            "Basic understanding of rock mass classification systems such as RMR, Q, and GSI.",
            "Strong interest in Himalayan geology, tectonics, and underground construction.",
            "High level of safety awareness and eagerness to learn specialized software."
        ]
    }
];

