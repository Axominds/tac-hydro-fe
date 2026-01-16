
export interface TeamMember {
    id: string;
    category: "BOD" | "Department Heads" | "Design Heads" | "Engineering Professionals";
    name: string;
    position: string;
    education: string;
    bio: string;
    image: string;
}

export const TEAM_MEMBERS: TeamMember[] = [
    // BOD
    {
        id: "prahlad-chaudhary",
        category: "BOD",
        name: "Prahlad Chaudhary",
        position: "Chairman",
        education: "",
        bio: "",
        image: "/chairperson.png" // Assuming existing image or placeholder
    },
    {
        id: "balkrishna-pangeni",
        category: "BOD",
        name: "Balkrishna Pangeni",
        position: "CEO",
        education: "MSc. in Hydropower Engineering, Pulchowk Campus",
        bio: `Mr. Pangeni has experience of more than 10 years in the field of Hydropower development. He is involved in the design and construction of Lohore(5MW), Ghatte (5MW), Super Mai (7.8MW), Mai Beni (11.2MW), Sano Milti Khola (3MW), Lower Chameliya (20MW).He has completed the construction of Ghatte Khola Hydropower as a Resident Engineer. He is involved in the feasibility study of Super Inkhu and Upper Inkhu HPP and Detaiedl Engineering Design of Kasuwa Khola HPP(45 MW). He has been proposed as Project Coordinator and Hydropower Engineer for the Study team of Sailun Khola HPP.\n\nProjects: Lohore(5MW), Ghatte (5MW), Super Mai (7.8MW), Mai Beni (11.2MW), Sano Milti Khola (3MW), Lower Chameliya (20MW). Resident Engineer for Ghatte Khola HPP. Study team leader for Super Inkhu and Sailun Khola HPP.`,
        image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=1000&auto=format&fit=crop"
    },
    {
        id: "dipesh-thapa",
        category: "BOD",
        name: "Dipesh Thapa",
        position: "Director",
        education: "Master of Science in Renewable Energy Engineering, IOE, Pulchowk",
        bio: "Mr. Thapa is having more than 15 years of work experience in various fields of hydropower industries. He has worked as study organizer for detailed engineering study of Kasuwa Khola HPP,45 MW. He worked as Project Engineer for design, manufacture, erection, testing and commissioning of hydromechanical and electromechanical works. He has extensive experience in design of components such as gates, stoplogs, trashracks, penstock, microhydro turbines, cable cranes and steel structures such as towers and bridges. He has been involved in various hydropower projects such as Andhikhola(10MW), Rasuwagadhi(111MW), Lower Modi(10MW), Charnawati(3.5MW), Siprin(10MW), Mailun(5MW), Tungun-Thosne & KhaniKhola, Naughar Gad, Upper Naughar Gad, Kabeli B1, Iwa Khola, Upper Naughar Gad (8MW), Kasuwa Khola (45 mw) etc. He is proposed as Sr. Hydromechanical Engineer for Feasibility Study and Detailed Engineering Design of Sailun Khola HPP.",
        image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=1000&auto=format&fit=crop"
    },
    {
        id: "saurav-dulal",
        category: "BOD",
        name: "Saurav Dulal",
        position: "Director (Head of Dept. of Civil Engineering)",
        education: "Masters in Hydropower Engineering, IOE, Pulchowk",
        bio: "Mr. Dulal has been working as Hydropower Engineer for 5 years. He was involved in the hydraulic and structural design of hydropower components. He was involved in the design of Ghatte(5MW) Super Mai(7.8),Mai Beni(11.2MW), Lower Chameliya(20MW), Lower Dudhkunda (9.6 MW) and Rawa Khola (5.3 MW). He is proposed to team member for the hydraulic design of waterway alignment for the Feasibility Study and Detailed Engineering Design of Sailun Khola HPP.",
        image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=1000&auto=format&fit=crop"
    },

    // Department Heads
    {
        id: "prayash-rijal",
        category: "Department Heads",
        name: "Prayash Rijal",
        position: "Head of Dept. of Mechanical Engineering",
        education: "M.E. in Mechanical & Design Engineering | B.Tech in Mechanical Engineering",
        bio: "Mr. Rijal is a mechanical engineering professional with over 7 years of experience specializing in hydromechanical and electromechanical design. He possesses strong capabilities in analytical design, Finite Element Analysis (FEA), and Computational Fluid Dynamics (CFD) of hydromechanical structures. He has significant experience in hydropower and high-voltage substation projects, including the 220 kV GIS Substation at Lapsiphedi. Since joining TAC Hydro in 2021, he has contributed to major projects such as United Mewa HEP, Middle Mewa HEP, Seti Nadi HEP, Upper Rahughat, and Kasuwa HEP, ensuring technically sound solutions through advanced simulation and modeling.",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1000&auto=format&fit=crop"
    },
    {
        id: "rohit-gurung",
        category: "Department Heads",
        name: "Rohit Gurung",
        position: "Head of Business Development Dept.",
        education: "Diploma in Civil Engineering",
        bio: "Mr. Gurung leads the Business Development Department at TAC Hydro Consultancy with 12 years of professional experience. He is responsible for identifying strategic growth opportunities, managing high-level client relationships, and expanding the company's portfolio within the hydropower and infrastructure sectors. His role involves deep market analysis and the development of professional proposals to ensure the firm's competitive edge in the consultancy industry.",
        image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1000&auto=format&fit=crop"
    },
    {
        id: "subeen-lama",
        category: "Department Heads",
        name: "Subeen Lama",
        position: "Head of Account and Administration Dept.",
        education: "Bachelors in Business Administration",
        bio: "Mr. Lama manages the Account and Administration Department at TAC Hydro Consultancy. He ensures the smooth operational flow of the firm through diligent financial planning, budgeting, and administrative compliance. His leadership provides the necessary organizational framework that allows the technical teams to focus exclusively on engineering excellence and project delivery.",
        image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=1000&auto=format&fit=crop"
    },

    // Design Heads
    {
        id: "prithivi-raj-thapa",
        category: "Design Heads",
        name: "Prithivi Raj Thapa",
        position: "Head of EM/TL Design",
        education: "Bachelor’s in Electrical engineering",
        bio: "Mr. Thapa leads the Electro Mechanical and Transmission Line Design department at TAC Hydro Consultancy with 5 years of professional experience. He specializes in the design and integration of power evacuation systems and substation components for hydropower projects. His expertise ensures that electrical infrastructure is optimized for efficiency and compliance with national grid standards providing critical technical leadership from the design phase through to project implementation.",
        image: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=1000&auto=format&fit=crop"
    },
    {
        id: "kundan-chauhan",
        category: "Design Heads",
        name: "Kundan Chauhan",
        position: "Head of Civil Engineering and Design",
        education: "MSc in Hydropower Development, NTNU (Norway) | BE in Civil Engineering, KU",
        bio: "Mr. Chauhan holds over 10 years of professional experience, including over 7 years specifically in the hydropower sector specializing in Feasibility Studies, Detailed Engineering Design (DED), and Project Management. His expertise spans projects ranging from 3.5 MW to 456 MW, with notable contributions to the Langtang Khola (20 MW), Jagdulla PROR (106 MW), and the Upper Tamakoshi Hydropower Project (456 MW). He possesses extensive knowledge in the layout planning and design of Headworks, Waterways, and Powerhouse complexes. Experienced in the issuance of construction drawings (IFCs) and project cost estimation, he has successfully delivered engineering solutions for projects such as Bhotekhoshi-1 (44 MW) and Super Lower Bagmati (42 MW).",
        image: "https://images.unsplash.com/photo-1487309078313-fad80c3ec1e5?q=80&w=1000&auto=format&fit=crop"
    },
    {
        id: "ghanshyam-rana",
        category: "Design Heads",
        name: "Ghanshyam Rana",
        position: "Head of Project Management",
        education: "Diploma in Civil Engineering",
        bio: "Mr. Rana oversees the Project Management department with 10 years of professional experience in the infrastructure and energy sectors. He is responsible for the overall coordination of project lifecycles, ensuring that feasibility studies and detailed designs are delivered on schedule and within budget. His expertise focuses on resource optimization, risk management, and maintaining seamless communication between multidisciplinary engineering teams and project stakeholders to ensure high-quality project delivery.",
        image: "https://images.unsplash.com/photo-1504257432389-52343af06ae3?q=80&w=1000&auto=format&fit=crop"
    },

    // Engineering Professionals (Selected few to keep file reasonable, following format)
    {
        id: "ashish-thapa-magar",
        category: "Engineering Professionals",
        name: "Ashish Thapa Magar",
        position: "Mechanical Engineer",
        education: "Bachelors in Mechanical Engineering",
        bio: "Mr. Magar is a Mechanical Engineer at TAC Hydro Consultancy with a focus on hydro-mechanical design and technical documentation. Since joining the firm in 2025, he has been responsible for the hydro-mechanical drawing and drafting of critical components, including gates, stoplogs, bifurcations, and bellmouths.",
        image: "https://images.unsplash.com/photo-1504593811423-6dd665756598?q=80&w=1000&auto=format&fit=crop"
    },
    {
        id: "junuka-shrestha",
        category: "Engineering Professionals",
        name: "Junuka Shrestha",
        position: "Junior Mechanical Engineer",
        education: "Diploma in Mechanical Engineering, Thapathali Campus",
        bio: "Ms. Shrestha is a Mechanical Engineer at TAC Hydro Consultancy with 6 years of experience in the hydropower and infrastructure sector. Her expertise includes the preparation of detailed CAD drawings for penstocks, gates, trash racks, valves, and auxiliary systems. She is skilled in reviewing and approving mechanical design drawings, preparing Bill of Quantities (BOQs), and producing comprehensive technical reports and as-built documentation. Throughout her career, she has provided vital engineering support to site teams during erection, ensuring the practical and efficient implementation of mechanical components for small to medium-capacity hydropower plants.",
        image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1000&auto=format&fit=crop"
    },
    {
        id: "rakish-shrestha",
        category: "Engineering Professionals",
        name: "Rakish Shrestha",
        position: "Mechanical Engineer",
        education: "Masters by Research in Mechanical Engineering, Kathmandu University",
        bio: "Mr. Shrestha is a Hydro-Mechanical Engineer with over 2.5 years of experience specializing in the structural and fluid dynamics of hydropower components. His expertise includes sediment-induced turbine erosion, Finite Element Analysis (FEA), and Computational Fluid Dynamics (CFD) modeling. He has extensive experience in the design and experimental study of Francis turbines and the structural analysis of complex components like bifurcations and surge tees. His research-driven approach to erosion modeling and turbulence simulation ensures the delivery of highly durable and technically optimized hydro-mechanical systems.",
        image: "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?q=80&w=1000&auto=format&fit=crop"
    },
    {
        id: "tarakant-chaudhary",
        category: "Engineering Professionals",
        name: "Tarakant Chaudhary",
        position: "Junior Mechanical Engineer",
        education: "Diploma in Mechanical Engineering, Manmohan Memorial Polytechnic Institute",
        bio: "Mr. Chaudhary serves as a CAD Engineer at TAC Hydro Consultancy with 4 years of experience in the hydropower, irrigation, and infrastructure sectors. He specializes in CAD drafting and mechanical design, with a strong background in technical documentation and BOQ preparation. His professional experience includes providing essential site support and ensuring that mechanical designs are translated into accurate construction drawings, contributing to the delivery of practical and sustainable engineering solutions.",
        image: "https://images.unsplash.com/photo-1542909168-82c3e7fdca5c?q=80&w=1000&auto=format&fit=crop"
    },
    {
        id: "yogesh-niroula",
        category: "Engineering Professionals",
        name: "Yogesh Niroula",
        position: "Mechanical Engineer",
        education: "Bachelor in Mechanical Engineering, Kathmandu University | Diploma in Mechanical Engineering, Manmohan Memorial Polytechnic",
        bio: "Mr. Niroula is a detail oriented Mechanical Engineer at TAC Hydro Consultancy specializing in hydropower with practical experience in technical design machining and fabrication. He possesses significant expertise in vibrational characteristics of Francis turbines and has contributed to techno economic feasibility studies for rural energy systems. His professional background includes hands on experience in technical design and internship roles where he developed skills in SolidWorks CAD and analytical problem solving. With a strong commitment to sustainable energy solutions he provides critical support in the design and technical analysis of hydro mechanical components contributing to the delivery of innovative and practical engineering solutions.",
        image: "https://images.unsplash.com/photo-1566492031773-4fbc752fdb78?q=80&w=1000&auto=format&fit=crop"
    },
    {
        id: "sashikant-chaudhary",
        category: "Engineering Professionals",
        name: "Sashikant Chaudhary",
        position: "CAD Engineer",
        education: "Diploma in Civil Engineering, Thaha Polytechnic Institute",
        bio: "Mr. Chaudhary is a Junior Civil Engineer at TAC Hydro Consultancy with a focused background in the hydropower and infrastructure sectors. He specializes in the drafting and preparation of comprehensive civil drawings, including overall project layout planning, structural detailing, and the development of precise construction drawings. His technical proficiency in CAD ensures that complex engineering concepts are translated into practical, executable designs, contributing to the delivery of technically sound and sustainable engineering solutions.",
        image: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?q=80&w=1000&auto=format&fit=crop"
    },
    {
        id: "dipak-thapa",
        category: "Engineering Professionals",
        name: "Dipak Thapa",
        position: "Electrical Engineer",
        education: "Bachelor’s in Electrical Engineering, National College of Engineering",
        bio: "Mr. Thapa is an Electrical Engineer with a focus on site supervision and the management of electrical systems. With professional experience in on-site electrical supervision, including a tenure at Auster Engineering Consultancy, he ensures the rigorous monitoring of electrical installations and system integration. His expertise lies in coordinating on-site technical teams and overseeing the management of electrical infrastructure to ensure compliance with project specifications and safety standards.",
        image: "https://images.unsplash.com/photo-1517070208541-6ddc4d3efbcb?q=80&w=1000&auto=format&fit=crop"
    },
    {
        id: "prajwal-kharel",
        category: "Engineering Professionals",
        name: "Prajwal Kharel",
        position: "Electrical Engineer",
        education: "Bachelor of Electrical Engineering, Tribhuvan University",
        bio: "Mr. Kharel brings over 2 years of specialized hydropower experience to the TAC Hydro team. His technical expertise covers the installation of generators turbines and governors alongside the coordination of preventative maintenance schedules. By leveraging his training in solar photo voltaic systems and advanced AutoCAD proficiency he ensures that our electrical infrastructure projects are executed with modern precision and high safety standards.",
        image: "https://images.unsplash.com/photo-1506277886164-e25aa3f4ef7f?q=80&w=1000&auto=format&fit=crop"
    },
    {
        id: "bardan-dangi",
        category: "Engineering Professionals",
        name: "Bardan Dangi",
        position: "Hydropower Engineer",
        education: "MSc in Hydropower Engineering, IOE Pulchowk | BE in Civil Engineering, IOE Pulchowk",
        bio: "Mr. Dangi has over 8 years of experience as a Civil and Hydropower Engineer, specializing in construction supervision and project management. He has served as a Project Engineer for the construction of the Liping Khola Hydropower Project (16.26 MW) and contributed to the Due Diligence Study of the Madhya Chameliya Hydropower Project (28.304 MW). Currently, he leads the technical team for the Detailed Feasibility Study of the Super Molung Hydropower Project (8.6 MW), bringing extensive field experience to the design and planning phases.",
        image: "https://images.unsplash.com/photo-1534308143481-c55f00be8bd7?q=80&w=1000&auto=format&fit=crop"
    },
    {
        id: "amit-bastakoti",
        category: "Engineering Professionals",
        name: "Amit Bastakoti",
        position: "Structural Engineer",
        education: "Masters in Structural Engineering, University of Leeds (UK)| Bachelor’s in Civil Engineering, National College of Engineering",
        bio: "Mr. Bastakoti is a Structural Engineer with more than 3 years of professional experience in the structural design of hydropower and general civil infrastructure. He specializes in the Detailed Engineering Design (DED) of complex structures, ensuring stability and safety under diverse loading conditions. His notable project involvements at TAC Hydro include the Khani Khola-I Hydropower Project (25+15 MW), Super Seti Hydropower Project (30 MW), and the Jagdulla PROR HEP, where he provides high-level structural analysis and design inputs.",
        image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=1000&auto=format&fit=crop"
    },
    {
        id: "rashmi-jha",
        category: "Engineering Professionals",
        name: "Rashmi Jha",
        position: "Civil Engineer",
        education: "Bachelor's in Civil Engineering, Kathmandu University",
        bio: "Ms. Jha is a Civil Engineer with over two years of experience in the planning, design, and rehabilitation of hydropower projects. She has contributed significantly to the Detailed Engineering Design (DED) of the Kasuwa Khola Hydropower Project (45 MW) and the updated Feasibility Study of the Rawa Khola Hydropower Project (6.7 MW). Her expertise also extends to Due Diligence studies for projects such as Jurimba Khola and Thuligad Khola, as well as rehabilitation works for the Middle Modi Hydropower Project (18 MW), focusing on technical design inputs and detailed drawing preparation.",
        image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=1000&auto=format&fit=crop"
    },
    {
        id: "reinsha-rimal",
        category: "Engineering Professionals",
        name: "Reinsha Rimal",
        position: "Civil Engineer",
        education: "Bachelor’s in Civil and Rural Engineering, Pokhara University",
        bio: "Ms. Rimal is a Civil Engineer at TAC Hydro Consultancy with over two years of professional experience in the hydropower and infrastructure sectors. Her expertise includes civil engineering analysis, quantity estimation, and the preparation of comprehensive technical drawings and reports. She has contributed to various project stages, including feasibility studies, detailed engineering design (DED), and BOQ preparation. Her ability to coordinate effectively with multidisciplinary project teams ensures the delivery of technically sound, practical, and sustainable hydropower solutions.",
        image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=1000&auto=format&fit=crop"
    },
    {
        id: "siddhartha-kandel",
        category: "Engineering Professionals",
        name: "Siddhartha Kandel",
        position: "Civil Engineer",
        education: "Bachelor’s in Civil Engineering, IOE, Pulchowk Campus",
        bio: "Mr. Kandel is a Civil Engineer with 2 years of professional experience, specializing in hydrologic modeling and hydraulic design. At TAC Hydro Consultancy, he has been a key contributor to the technical analysis of major projects, including the Super Molung Hydropower Project, Super Seti Hydropower Project, and the Jagdulla PROR Hydropower Project. His technical precision in modeling and design facilitates the delivery of robust and efficient engineering solutions for complex hydraulic infrastructure.",
        image: "https://images.unsplash.com/photo-1542596594-649edbc13630?q=80&w=1000&auto=format&fit=crop"
    },
    {
        id: "gopal-bhattarai",
        category: "Engineering Professionals",
        name: "Gopal Bhattarai",
        position: "Hydropower Engineer",
        education: "MSc in Hydropower Engineering, IOE, Pulchowk Campus | Bachelor’s in Civil Engineering, IOE, Pulchowk Campus",
        bio: "Mr. Bhattarai is a specialist in hydropower assessment, hydraulic planning, and design. He brings a meticulous approach to engineering planning and drafting, helping define high standards across TAC Hydro’s project portfolio. His notable experience includes two years as the Site In-charge and Site Engineer for the Upper Tamakoshi Hydropower Project, where he managed critical site-level engineering challenges. His blend of site-based management and high-level hydraulic design ensures practical and technically excellent project outcomes.",
        image: "https://images.unsplash.com/photo-1522529599102-193c0d76b5b6?q=80&w=1000&auto=format&fit=crop"
    },
    {
        id: "suman-khanal",
        category: "Engineering Professionals",
        name: "Suman Khanal",
        position: "Hydropower Engineer",
        education: "Masters in Hydropower Engineering, IOE, Pulchowk Campus",
        bio: "Mr. Khanal is a Hydropower Engineer at TAC Hydro Consultancy who contributes to the technical planning and hydraulic design of our project portfolio. He brings a meticulous approach to engineering planning and drafting, focusing on applying advanced hydraulic principles to the analysis and design phases of hydropower infrastructure. By integrating rigorous academic foundations with the firm’s engineering workflows, he ensures that waterway alignments and infrastructure components are designed for technical excellence and operational reliability.",
        image: "https://images.unsplash.com/photo-1480455624313-e29b44bbfde1?q=80&w=1000&auto=format&fit=crop"
    },
    {
        id: "aashis-mishra",
        category: "Engineering Professionals",
        name: "Aashis Mishra",
        position: "Civil Engineer",
        education: "Bachelor’s in Civil and Rural Engineering, Pokhara University",
        bio: "Mr. Mishra is a Civil Engineer with professional experience focused on bill verification, project monitoring, and quality control. He is responsible for assessing the quantity and quality of completed works and reviewing contractor bills for accuracy and contract compliance. His role involves conducting site visits to cross-check work progress against planned targets and milestones. He has provided vital project monitoring for several projects, including Nupche Likhu HPP (57.50 MW), Bhotekoshi-1 HPP (44 MW), and Super Lower Bagmati HPP (41.314 MW), ensuring timely and cost-effective project execution.",
        image: "https://images.unsplash.com/photo-1463453091185-61582044d556?q=80&w=1000&auto=format&fit=crop"
    },
    {
        id: "amrit-bhusal",
        category: "Engineering Professionals",
        name: "Amrit Bhusal",
        position: "Civil Engineer",
        education: "Bachelor’s in Civil Engineering, Pulchowk Campus, Tribhuvan University",
        bio: "Mr. Bhusal is a Civil Engineer at TAC Hydro Consultancy with 1.5 years of experience in the hydropower and infrastructure sector. His expertise is focused on hydrology and hydraulic design, where he applies analytical rigor to water resource planning and infrastructure safety. He has contributed significantly to the detailed engineering design (DED) of the Lower Khani B Hydropower Project and the Khani Khola-1 Hydropower Project. His technical skills in hydraulic modeling and quantity estimation ensure the delivery of practical, technically sound, and efficient hydropower solutions.",
        image: "https://images.unsplash.com/photo-1548544149-4835e62ee5b3?q=80&w=1000&auto=format&fit=crop"
    },
    {
        id: "shradha-kisi",
        category: "Engineering Professionals",
        name: "Shradha Kisi",
        position: "Business Management Engineer",
        education: "MBA in Project Management, Islington College, London Metropoliton University | Bachelor’s in Civil Engineering, Khwopa Engineering College, Purbanchal University",
        bio: "Ms. Kisi is a versatile professional at TAC Hydro Consultancy who brings a strategic multidisciplinary approach to the hydropower sector with over 2 years of experience. She plays a dual role within the firm bridging the gap between technical civil design and overall business management. Her expertise lies in blending solid civil engineering foundations with a high level understanding of project lifecycles and infrastructure planning. She has supported the development of significant energy projects including Mewa Khola (50 MW) Super Lower Bagmati (41.86 MW) and Langtang Khola (20 MW) hydroelectric projects. Her ability to integrate technical design with management oversight ensures that project milestones are met with engineering precision and operational efficiency.",
        image: "https://images.unsplash.com/photo-1589156280159-27698a70f29e?q=80&w=1000&auto=format&fit=crop"
    },
    {
        id: "chandra-kumar-thapa",
        category: "Engineering Professionals",
        name: "Chandra Kumar Thapa",
        position: "Civil Engineer",
        education: "Bachelor’s in Civil Engineering",
        bio: "Mr. Thapa serves as a Civil Engineer at TAC Hydro Consultancy, specializing in site engineering and construction management. He is responsible for the direct supervision of civil works, ensuring that all construction activities align strictly with the approved technical drawings and project specifications.",
        image: "https://images.unsplash.com/photo-1552058544-f2b08422138a?q=80&w=1000&auto=format&fit=crop"
    },
    {
        id: "kumar-bishowkarma",
        category: "Engineering Professionals",
        name: "Kumar Bishowkarma",
        position: "Civil Engineer",
        education: "Bachelor’s in Civil Engineering",
        bio: "Mr. Rana is a Civil Engineer primarily engaged in the site supervision and technical monitoring of hydropower projects. His expertise lies in coordinating field activities, managing site logistics, and ensuring that civil structures are built to meet both safety and environmental standards.",
        image: "https://images.unsplash.com/photo-1548449112-96a38a643324?q=80&w=1000&auto=format&fit=crop"
    },
    {
        id: "rajendra-pulami",
        category: "Engineering Professionals",
        name: "Rajendra Pulami",
        position: "Surveyor",
        education: "Diploma in Civil Engineering",
        bio: "Mr. Pulami serves as the lead Surveyor at TAC Hydro Consultancy, providing the essential topographical and geospatial data required for accurate engineering design. He is responsible for conducting precise field surveys, including topographic mapping and the collection of longitudinal and cross-sectional data for headworks and waterway alignments.",
        image: "https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?q=80&w=1000&auto=format&fit=crop"
    },
    {
        id: "sital-rana",
        category: "Engineering Professionals",
        name: "Sital Rana",
        position: "Civil Engineer",
        education: "Bachelor’s in Civil Engineering ",
        bio: "Mr. Rana is a Civil Engineer at TAC Hydro Consultancy with 12 years of professional experience primarily focused on site engineering and the technical supervision of hydropower projects. He specializes in the field level implementation of civil designs ensuring that construction activities from headworks to powerhouse complexes adhere to precise engineering standards.",
        image: "https://images.unsplash.com/photo-1531384441138-2736e62e0919?q=80&w=1000&auto=format&fit=crop"
    },
    {
        id: "sushil-mishra",
        category: "Engineering Professionals",
        name: "Sushil Mishra",
        position: "Civil Engineer",
        education: "Bachelor’s in Civil Engineering",
        bio: "Mr. Mishra serves as a Site-based Civil Engineer at TAC Hydro Consultancy, where he focuses on the practical implementation of engineering designs. He is responsible for verifying on-site measurements, reviewing contractor progress, and ensuring that construction materials and methods meet the required technical standards.",
        image: "https://images.unsplash.com/photo-1517466787929-bc90951d0974?q=80&w=1000&auto=format&fit=crop"
    },
    {
        id: "ujwal-singh",
        category: "Engineering Professionals",
        name: "Ujwal Singh",
        position: "Assistant Admin",
        education: "Pursuing Bachelor’s in Business Administration",
        bio: "Mr. Singh provides vital administrative support to the TAC Hydro team, ensuring the smooth day-to-day operations of the office. He assists in project documentation, record-keeping, and the coordination of logistics for site visits and multidisciplinary team meetings.",
        image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=1000&auto=format&fit=crop"
    },
];
