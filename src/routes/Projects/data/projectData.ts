
export type ProjectDivision =
    | "Feasibility Study"
    | "Detailed Engineering Design"
    | "Construction Supervision"
    | "Due Diligence Appraisal";

export interface Project {
    id: string;
    title: string;
    division: ProjectDivision;
    location: [number, number]; // [latitude, longitude]
    role: string;
    technicalHighlights: Record<string, string>;
    images: string[]; // Mock images since we don't have real ones yet
    description: string;
}

export const projectData: Project[] = [
    // --- FEASIBILITY STUDY (15 Projects) ---
    {
        id: "fs-1",
        title: "Ghatte Khola Small Hydropower Project",
        division: "Feasibility Study",
        location: [27.863, 86.17],
        role: "TAC Hydro Consultancy Pvt. Ltd. was awarded by Manakamana Engineering Hydropower Pvt. Ltd. for the Updated Feasibility Study of the project. Our role involved verifying the hydrological data, optimizing the project's capacity to 5 MW, and refining the technical layout to ensure financial and technical viability. This included conducting updated surveys and preparing the Project Feasibility Study Report to meet the requirements for the power purchase agreement (PPA) and generation licensing.",
        technicalHighlights: {
            "Project Location": "Gaurishankar Gaupalika (Marbu), Dolakha District, Bagmati Province",
            "Installed Capacity": "5.00 MW",
            "Design Discharge": "1.78 m³/s (Q40)",
            "Gross Head": "330 m",
            "Design Flood": "125 m³/s",
            "Diversion Type": "Side orifice intake with boulder riprap weir",
            "Headrace Pipe Length/Diameter": "2,129.25 m / 1.2 m diameter",
            "Penstock Pipe Length/Diameter": "1,022.25 m / 0.9 m diameter",
            "Thickness of Pipe": "8 mm to 20 mm",
            "Unit Capacity": "2.5 MW per unit (2 units of Pelton Turbines)"
        },
        images: ["/downloads/mjlodvw6RB1obD/img/mask-group.png", "/downloads/mjlodvw6RB1obD/img/mask-group-1.png", "/downloads/mjlodvw6RB1obD/img/mask-group-2.png", "/downloads/mjlodvw6RB1obD/img/mask-group-3.png"],
        description: "The Ghatte Khola Small Hydropower Project is a 5 MW run-of-the-river development located in the Dolakha District of Bagmati Province. The project utilizes the flow of the Ghatte Khola, a tributary of the Khare/Khani Khola, within the Gaurishankar Gaupalika region. Its location near Thambu Dobhan allows it to harness the significant elevation drops characteristic of the Tama Koshi river basin to contribute renewable energy to the national grid."
    },
    {
        id: "fs-2",
        title: "Lohore Khola Hydropower Project",
        division: "Feasibility Study",
        location: [28.9, 81.8],
        role: "TAC Hydro Consultancy Pvt. Ltd. was commissioned by Lohore Khola Hydropower Company Pvt. Ltd. to conduct the Updated Feasibility Study for the 4.2 MW project. In this capacity, our firm was responsible for verifying the hydrological data and optimizing the technical layout of the civil and hydromechanical components. Our work ensured the technical and financial viability of the scheme, providing the essential Project Feasibility Study Report required for further project development and grid interconnection licensing.",
        technicalHighlights: {
            "Project Location": "Toli VDC (Ward 5), Naumule VDC (Ward 6), and Baluatar VDC (Ward 3), Dailekh District",
            "Installed Capacity": "4.2 MW",
            "Design Discharge": "4.767 m³/s (Q40)",
            "Gross Head": "113.20 m",
            "Design Flood": "361 m³/s",
            "Diversion Type": "Concrete diversion weir with side intake",
            "Headrace Pipe Length/Diameter": "2,825 m / 1.2 m diameter (MS Pipe)",
            "Penstock Pipe Length/Diameter": "180 m / 1.1 m diameter",
            "Thickness of Pipe": "6 mm to 12 mm",
            "Unit Capacity": "2.1 MW per unitFeaturing Horizontal Axis Pelton Turbines (Total 2 units)"
        },
        images: ["/downloads/mjlodvw6RB1obD/img/mask-group-4.png", "/downloads/mjlodvw6RB1obD/img/mask-group.png", "/downloads/mjlodvw6RB1obD/img/mask-group-1.png", "/downloads/mjlodvw6RB1obD/img/mask-group-2.png"],
        description: "The Lohore Khola Hydropower Project is a 4.2 MW run-of-the-river facility located on the perennial, rain-fed flows of the Lohore Khola and Padam Khola in the Dailekh district of Karnali Province. Situated within the Toli, Naumule, and Baluatar regions, the project is designed for both isolated and parallel grid operation. It utilizes a significant gross head to contribute sustainable energy to the national power grid while maintaining a minimal environmental footprint."
    },
    {
        id: "fs-3",
        title: "Tamor-Mewa Hydroelectric Project",
        division: "Feasibility Study",
        location: [27.36, 87.65],
        role: "The Sanima Hydro and Engineering Pvt. Ltd (SHEPL)-TAC Hydro Consultancy Pvt. Ltd. J.V. was commissioned by Spark Hydroelectric Company Limited (SHECL) on October 8th 2024 to conduct the Updated Feasibility Study for the 128 MW project. In this capacity, our firm focused on re-evaluating the hydrological parameters, optimizing the project layout, and verifying the technical and economic viability of the scheme. Our work provided the refined technical framework and updated feasibility reporting necessary to move the project toward its next phase of development and detailed engineering.",
        technicalHighlights: {
            "Project Location": "Phungling Municipality, Meringden RM, Mikwakhola RM, and Athrai Tribeni RM, Taplejung District",
            "Installed Capacity": "128 MW",
            "Design Discharge": "95.38 m³/s (Q40)",
            "Gross Head": "170 m",
            "Design Flood": "N/A",
            "Diversion Type": "Concrete diversion weir with side intake",
            "Headrace Pipe Length/Diameter": "N/A",
            "Penstock Pipe Length/Diameter": "N/A",
            "Thickness of Pipe": "N/A",
            "Unit Capacity": "4 units of vertical axis Francis turbine"
        },
        images: ["/downloads/mjlodvw6RB1obD/img/mask-group-2.png", "/downloads/mjlodvw6RB1obD/img/mask-group-3.png", "/downloads/mjlodvw6RB1obD/img/mask-group-4.png", "/downloads/mjlodvw6RB1obD/img/mask-group.png"],
        description: "The Tamor-Mewa Hydroelectric Project (TMHEP) is a major 128 MW run-of-the-river hydropower project located in the Taplejung District of Koshi Province, eastern Nepal. The project is being developed by Spark Hydroelectric Company Limited (SHECL) and utilizes the substantial flow of the Tamor River for power generation. The project area extends across Phungling Municipality (Wards 1, 2, 3, and 9), Meringden Rural Municipality (Wards 2 and 3), Mikwakhola Rural Municipality (Wards 1 and 2), and Athrai Tribeni Rural Municipality (Wards 2, 3, and 5)."
    },
    {
        id: "fs-4",
        title: "Rawa Khola Hydropower Project",
        division: "Feasibility Study",
        location: [27.32, 86.76],
        role: "TAC Hydro Consultancy Pvt. Ltd. provided consulting services for the Updated Feasibility Study of the Rawa Khola Hydropower Project (RKHP), developed by Halesi Hydropower Private Limited in Khotang District, eastern Nepal. The assignment involved reviewing and updating the original feasibility study to support the project's capacity upgradation from 5.4 MW to 6.7 MW. The Final Updated Feasibility Report was successfully completed and submitted in October 2025.",
        technicalHighlights: {
            "Project Location": "Kepilasgadhi and Aiselukharka Rural Municipalities, Khotang District, Koshi Province",
            "Installed Capacity": "6.7 MW",
            "Design Discharge": "7.55 m³/s (Q40)",
            "Gross Head": "113.5 m",
            "Design Flood": "N/A",
            "Diversion Type": "N/A",
            "Headrace Pipe Length/Diameter": "N/A",
            "Penstock Pipe Length/Diameter": "N/A",
            "Thickness of Pipe": "N/A",
            "Unit Capacity": "2 units of Francis turbine"
        },
        images: ["/downloads/mjlodvw6RB1obD/img/mask-group-1.png", "/downloads/mjlodvw6RB1obD/img/mask-group-2.png", "/downloads/mjlodvw6RB1obD/img/mask-group.png", "/downloads/mjlodvw6RB1obD/img/mask-group-3.png"],
        description: "The Rawa Khola Hydropower Project is a 6.7 MW run-of-the-river (RoR) scheme located in the Khotang District of Koshi Province. The project strategically utilizes the combined flow of the Lidim Khola and Rawa Khola, with an intake positioned just 150m downstream of their confluence in Kepilasgadhi Rural Municipality. A unique engineering feature of this project is its headrace alignment, which begins on the left bank before crossing the river via a siphon system to reach the powerhouse on the right bank in Aiselukharka Rural Municipality."
    },
    {
        id: "fs-5",
        title: "Super Seti Hydropower Project",
        division: "Feasibility Study",
        location: [28.45, 84.0],
        role: "TAC Hydro Consultancy was awarded the contract by S.N. Energy (SNEL) to undertake the Inception Study and Updated Feasibility Study of the proposed hydropower project, covering technical, economic, financial, and environmental aspects required for project development.",
        technicalHighlights: {
            "Project Location": "Machhapuchhre Gaupalika, Kaski district, Gandaki Province, Nepal",
            "Installed Capacity": "24.00 MW",
            "Design Discharge": "8.5 m³/s (Q40)",
            "Gross Head": "340 m",
            "Design Flood": "N/A",
            "Diversion Type": "Concrete gravity ogee",
            "Headrace Pipe Length/Diameter": "1965.0 m / 3.25 m",
            "Penstock Pipe Length/Diameter": "1196.0 m / 2.2 to 2.0 m",
            "Thickness of Pipe": "12 mm to 36 mm",
            "Unit Capacity": "2 units of horizontal axis Pelton turbines"
        },
        images: ["/downloads/mjlodvw6RB1obD/img/mask-group-3.png", "/downloads/mjlodvw6RB1obD/img/mask-group-4.png", "/downloads/mjlodvw6RB1obD/img/mask-group.png", "/downloads/mjlodvw6RB1obD/img/mask-group-1.png"],
        description: "Developed by S. N. Energy Ltd. in Kaski, the Super Seti Hydropower Project (24 MW) is a technically optimized Run-of-River scheme designed to maximize dry-season output. By integrating flow from the Batase Khola into the Seti River during low-flow months, the project ensures enhanced energy reliability. Its robust infrastructure features a headrace tunnel, an underground settling basin, and a semi-surface powerhouse, all engineered to harness a design discharge of 8.5 m³/s."
    },
    {
        id: "fs-6",
        title: "Lower Chameliya Hydropower Project",
        division: "Feasibility Study",
        location: [29.5, 80.6],
        role: "Feasibility Study",
        technicalHighlights: {
            "Project Location": "Chameliya River, Sudurpaschim Province",
            "Installed Capacity": "20.00 MW",
            "Design Discharge": "N/A",
            "Gross Head": "N/A",
            "Design Flood": "N/A",
            "Diversion Type": "N/A",
            "Headrace Pipe Length/Diameter": "N/A",
            "Penstock Pipe Length/Diameter": "N/A",
            "Thickness of Pipe": "N/A",
            "Unit Capacity": "N/A"
        },
        images: ["/downloads/mjlodvw6RB1obD/img/mask-group.png", "/downloads/mjlodvw6RB1obD/img/mask-group-2.png", "/downloads/mjlodvw6RB1obD/img/mask-group-1.png", "/downloads/mjlodvw6RB1obD/img/mask-group-3.png"],
        description: "A proposed 20 MW hydropower project on the Chameliya River, currently in the study phase."
    },
    {
        id: "fs-7",
        title: "Lower Dudhkunda Hydropower Project",
        division: "Feasibility Study",
        location: [27.5, 86.6],
        role: "Feasibility Study",
        technicalHighlights: {
            "Project Location": "Solu Dudhkunda Municipality, Solukhumbu District, Koshi Province",
            "Installed Capacity": "9.6 MW",
            "Design Discharge": "5.52 m³/s (Q40)",
            "Gross Head": "210.5 m",
            "Design Flood": "N/A",
            "Diversion Type": "N/A",
            "Headrace Pipe Length/Diameter": "N/A",
            "Penstock Pipe Length/Diameter": "N/A",
            "Thickness of Pipe": "N/A",
            "Unit Capacity": "N/A"
        },
        images: ["/downloads/mjlodvw6RB1obD/img/mask-group-4.png", "/downloads/mjlodvw6RB1obD/img/mask-group.png", "/downloads/mjlodvw6RB1obD/img/mask-group-3.png", "/downloads/mjlodvw6RB1obD/img/mask-group-2.png"],
        description: "The Lower Dudhkunda Hydropower Project (9.6 MW) is a Run-of-River (RoR) type scheme located in the Solukhumbu District, utilizing the water resources of the Solu and Dudhkunda rivers."
    },
    {
        id: "fs-8",
        title: "Lower Khani B Hydropower Project",
        division: "Feasibility Study",
        location: [27.5, 86.0],
        role: "Feasibility Study",
        technicalHighlights: {
            "Project Location": "N/A",
            "Installed Capacity": "6.2 MW",
            "Design Discharge": "N/A",
            "Gross Head": "N/A",
            "Design Flood": "N/A",
            "Diversion Type": "N/A",
            "Headrace Pipe Length/Diameter": "N/A",
            "Penstock Pipe Length/Diameter": "N/A",
            "Thickness of Pipe": "N/A",
            "Unit Capacity": "N/A"
        },
        images: ["/downloads/mjlodvw6RB1obD/img/mask-group-1.png", "/downloads/mjlodvw6RB1obD/img/mask-group-2.png", "/downloads/mjlodvw6RB1obD/img/mask-group-4.png", "/downloads/mjlodvw6RB1obD/img/mask-group-3.png"],
        description: "A 6.2 MW hydropower project currently in the proposal and study phase."
    },
    {
        id: "fs-9",
        title: "Mathillo Inkhu Hydropower Project",
        division: "Feasibility Study",
        location: [27.55, 86.8],
        role: "TAC Hydro Consultancy Pvt. Ltd. was commissioned by the developer Universal Power Company for the works of feasibility study, hydrological analysis, optimization of project capacity, detail topographical survey, location of different component, hydraulic design and detail design of civil, hydromechanical, electromechanical and transmission line components.",
        technicalHighlights: {
            "Project Location": "Sotang RM–2 and Mapya Dudhkoshi RM–6, Solukhumbu District, Koshi Province",
            "Installed Capacity": "24.22 MW",
            "Design Discharge": "7.52 m³/s (Q45)",
            "Gross Head": "395 m",
            "Design Flood": "500 m³/s (100-year)",
            "Diversion Type": "Drop Type Tyrolean Intake",
            "Headrace Pipe Length/Diameter": "Tunnel: 5,350 m / 3.0 m diameter",
            "Penstock Pipe Length/Diameter": "1,050 m / 1.6 m diameter",
            "Thickness of Pipe": "12 mm to 40 mm",
            "Unit Capacity": "12.11 MW per unit (2 units of Vertical Axis Pelton Turbines)"
        },
        images: ["/downloads/mjlodvw6RB1obD/img/mask-group-3.png", "/downloads/mjlodvw6RB1obD/img/mask-group-4.png", "/downloads/mjlodvw6RB1obD/img/mask-group.png", "/downloads/mjlodvw6RB1obD/img/mask-group-2.png"],
        description: "The Mathilo Inkhu Hydropower Project (often referred to as Upper Inkhu Khola HEP) is a 24.22 MW run-of-river (RoR) project located in the Solukhumbu district of Koshi Province, Nepal. The project is designed to generate significant annual energy, with development led by Universal Power Company Limited."
    },
    {
        id: "fs-10",
        title: "Middle Chameliya Hydropower Project",
        division: "Feasibility Study",
        location: [29.7, 80.7],
        role: "TAC Hydro Consultancy Pvt. Ltd. provided consulting services for the preparation of the Detailed Feasibility Study of the project, including hydrological analysis, site investigations, project layout optimization, design review, cost estimation, and assessment of technical and economic feasibility to support project implementation.",
        technicalHighlights: {
            "Project Location": "Api Himal & Marma Rural Municipalities, Darchula District, Sudurpaschim Province",
            "Installed Capacity": "28.304 MW",
            "Design Discharge": "25.17 m³/s (Q40)",
            "Gross Head": "136.26 m",
            "Design Flood": "505.07 m³/s",
            "Diversion Type": "Ogee Shaped Sloping Glacis Weir",
            "Headrace Pipe Length/Diameter": "7,200 m / 3.8 m diameter",
            "Penstock Pipe Length/Diameter": "300 m / 3.0 m diameter",
            "Thickness of Pipe": "14 mm to 16 mm",
            "Unit Capacity": "14.152 MW per unit (2 units of Horizontal Francis Turbines)"
        },
        images: ["/downloads/mjlodvw6RB1obD/img/mask-group-2.png", "/downloads/mjlodvw6RB1obD/img/mask-group-1.png", "/downloads/mjlodvw6RB1obD/img/mask-group-3.png", "/downloads/mjlodvw6RB1obD/img/mask-group-4.png"],
        description: "Madhya Chameliya Hydropower Project (MCHPP) is a Run-of-the-River (ROR) project proposed with an installed capacity of 28.304 MW. MCHPP is located in the Darchula District, Sudurpaschim Province of Nepal. Water from Chameliya River is diverted to intake by sloping glacis weir and conveyed to gravel trap and then to the settling basin through approach pipe. The design discharge will be conveyed to powerhouse through water conveyance system (headrace pipe, surge pipe and penstock)"
    },
    {
        id: "fs-11",
        title: "Sanjen Khola Hydropower Project",
        division: "Feasibility Study",
        location: [28.2, 85.3],
        role: "TAC Hydro Consultancy Pvt. Ltd. was engaged as the Consultant for the preparation of the Detailed Feasibility Study, with responsibilities covering hydromechanical and electromechanical components of the project.",
        technicalHighlights: {
            "Project Location": "Chilime Village, Amachhodingmo RM, Rasuwa District, Bagmati Province, Nepal",
            "Installed Capacity": "78 MW",
            "Design Discharge": "9.10 m³/s (Q40)",
            "Gross Head": "1,003.5 m",
            "Design Flood": "150 m³/s",
            "Diversion Type": "Boulder lined weir with side intake",
            "Headrace Pipe Length/Diameter": "3,630 m",
            "Penstock Pipe Length/Diameter": "1,030 m to 1,081 m",
            "Thickness of Pipe": "8 mm to 14 mm",
            "Unit Capacity": "26 MW per unit (3 units of Pelton Turbines)"
        },
        images: ["/downloads/mjlodvw6RB1obD/img/mask-group-4.png", "/downloads/mjlodvw6RB1obD/img/mask-group-2.png", "/downloads/mjlodvw6RB1obD/img/mask-group.png", "/downloads/mjlodvw6RB1obD/img/mask-group-1.png"],
        description: "The 78 MW Sanjen Khola Hydroelectric Project is a run-of-the-river facility in the Rasuwa District of Nepal, constructed by China Harbour Engineering Company (CHEC) and was developed by Sanjen Jalavidhyut Company Limited - SJCL and operational as of April 2025. It utilizes a high-head design of roughly 1,000 meters to generate approximately 412.7 GWh of electricity annually for the national grid."
    },
    {
        id: "fs-12",
        title: "Super Inkhu Hydropower Project",
        division: "Feasibility Study",
        location: [27.6, 86.8],
        role: "Feasibility Study",
        technicalHighlights: {
            "Project Location": "Bung RM (Ward 1, 2, 3), Sotang RM (Ward 2), Solukhumbu District, Koshi Province",
            "Installed Capacity": "22.12 MW",
            "Design Discharge": "10.33 m³/s (Q40)",
            "Gross Head": "250.7 m",
            "Design Flood": "1,038 m³/s (100-year)",
            "Diversion Type": "High dam with side intake",
            "Headrace Pipe Length/Diameter": "Tunnel: 3,400 m",
            "Penstock Pipe Length/Diameter": "650 m",
            "Thickness of Pipe": "12 mm to 36 mm",
            "Unit Capacity": "11.06 MW per unit (2 units of Francis Turbines)"
        },
        images: ["/downloads/mjlodvw6RB1obD/img/mask-group-1.png", "/downloads/mjlodvw6RB1obD/img/mask-group-4.png", "/downloads/mjlodvw6RB1obD/img/mask-group-2.png", "/downloads/mjlodvw6RB1obD/img/mask-group-3.png"],
        description: "The Super Inkhu Hydropower Project (SIHP) is a 22.12 MW run-of-river project located in the Solukhumbu District. It is being developed by Saptakoshi Hydro Power Company Ltd."
    },
    {
        id: "fs-13",
        title: "Super Mai Hydropower Project",
        division: "Feasibility Study",
        location: [26.9, 87.9],
        role: "TAC Hydro Consultancy was actively involved in the Feasibility study with further hydrological analysis and optimization of project capacity, detail topographical survey, survey data analysis and selection of most suitable waterway alignment, location of the diversion weir and other headworks components, location of powerhouse and transmission line alignment.",
        technicalHighlights: {
            "Project Location": "Maimajhuwa/Mabu, Illam District, Koshi Province, Nepal",
            "Installed Capacity": "7.8 MW",
            "Design Discharge": "8.16 m³/s (Q40)",
            "Gross Head": "114 m",
            "Design Flood": "64.1 m³/s",
            "Diversion Type": "Tyrolean Intake",
            "Headrace Pipe Length/Diameter": "3,000 m / 2.0 m diameter",
            "Penstock Pipe Length/Diameter": "426 m / 1.8 m diameter",
            "Thickness of Pipe": "10 mm to 14 mm",
            "Unit Capacity": "3.9 MW per unit (2 units of Francis Turbines)"
        },
        images: ["/downloads/mjlodvw6RB1obD/img/mask-group-3.png", "/downloads/mjlodvw6RB1obD/img/mask-group.png", "/downloads/mjlodvw6RB1obD/img/mask-group-4.png", "/downloads/mjlodvw6RB1obD/img/mask-group-2.png"],
        description: "Super Mai Hydropower Project (7.8 MW) developed by Super mai Hydropower Ltd. is a run-of-river hydroelectric project using river flow to generate power in Illam District, eastern Nepal on the Mai River. The project has been in operation since its Commercial Operation Date (COD) on 2075-07-11 BS."
    },
    {
        id: "fs-14",
        title: "Super Seti Hydropower Project (30 MW)",
        division: "Feasibility Study",
        location: [28.45, 84.1],
        role: "Feasibility Study",
        technicalHighlights: {
            "Project Location": "Seti River, Kaski District, Gandaki Province",
            "Installed Capacity": "30.00 MW",
            "Design Discharge": "11.8 m³/s",
            "Gross Head": "295 m",
            "Design Flood": "N/A",
            "Diversion Type": "Side intake",
            "Headrace Pipe Length/Diameter": "N/A",
            "Penstock Pipe Length/Diameter": "N/A",
            "Thickness of Pipe": "N/A",
            "Unit Capacity": "N/A"
        },
        images: ["/downloads/mjlodvw6RB1obD/img/mask-group-2.png", "/downloads/mjlodvw6RB1obD/img/mask-group-3.png", "/downloads/mjlodvw6RB1obD/img/mask-group-1.png", "/downloads/mjlodvw6RB1obD/img/mask-group-4.png"],
        description: "Super Seti Hydropower Project (30MW) is a run-of-river scheme located in Kaski District, separate from the 24MW project."
    },
    {
        id: "fs-15",
        title: "Super Molung Hydropower Project",
        division: "Feasibility Study",
        location: [27.4, 86.4],
        role: "Comprehensive Feasibility Study",
        technicalHighlights: {
            "Project Location": "Harkapur and Bigutar regions, Okhaldhunga District, Koshi Province",
            "Installed Capacity": "9.79 MW",
            "Design Discharge": "2.1 m³/s (Q40)",
            "Gross Head": "370 m",
            "Design Flood": "145 m³/s (100-year)",
            "Diversion Type": "Tyrolean Intake",
            "Headrace Pipe Length/Diameter": "3,480 m / 1.5 m diameter",
            "Penstock Pipe Length/Diameter": "1,320 m / 1.2 m diameter",
            "Thickness of Pipe": "12 mm to 40 mm",
            "Unit Capacity": "4.895 MW per unit (2 units of Pelton Turbines)"
        },
        images: ["/downloads/mjlodvw6RB1obD/img/mask-group.png", "/downloads/mjlodvw6RB1obD/img/mask-group-1.png", "/downloads/mjlodvw6RB1obD/img/mask-group-4.png", "/downloads/mjlodvw6RB1obD/img/mask-group-3.png"],
        description: "Super Molung Hydropower Project (SMHP) is a Run-of-River scheme located in Okhaldhunga District, utilizing the Malun Khola."
    },

    // --- DETAILED ENGINEERING DESIGN (9 Projects) ---
    {
        id: "ded-1",
        title: "Ghatte Khola Small Hydropower Project",
        division: "Detailed Engineering Design",
        location: [27.863, 86.17],
        role: "TAC Hydro Consultancy Pvt. Ltd. was commissioned by Manakamana Engineering Hydropower Pvt. Ltd. to carry out the Detailed Engineering Design (DED) for the project. In this role, our firm was responsible for the complete technical design of the civil and hydromechanical components, translating the feasibility framework into actionable construction blueprints. Additionally, we provided on-site consulting services to supervise construction activities and managed technical coordination from our Kathmandu office to ensure the project met its commercial and engineering requirements.",
        technicalHighlights: {
            "Project Location": "Gaurishankar Gaupalika (Marbu), Dolakha District, Bagmati Province",
            "Installed Capacity": "5.00 MW",
            "Design Discharge": "1.78 m³/s (Q40)",
            "Gross Head": "330 m",
            "Design Flood": "125 m³/s",
            "Diversion Type": "Side orifice intake with boulder riprap weir",
            "Headrace Pipe Length/Diameter": "2,129.25 m / 1.2 m diameter",
            "Penstock Pipe Length/Diameter": "1,022.25 m / 0.9 m diameter",
            "Thickness of Pipe": "8 mm to 20 mm",
            "Unit Capacity": "2.5 MW per unit (2 units of Pelton Turbines)"
        },
        images: ["/downloads/mjlodvw6RB1obD/img/mask-group-3.png", "/downloads/mjlodvw6RB1obD/img/mask-group-4.png", "/downloads/mjlodvw6RB1obD/img/mask-group.png", "/downloads/mjlodvw6RB1obD/img/mask-group-1.png"],
        description: "The Ghatte Khola Small Hydropower Project is a 5 MW run-of-the-river facility located on the Ghatte Khola, a tributary of the Khare/Khani Khola, in Gaurishankar Gaupalika, Dolakha District. Positioned in the steep terrain of Bagmati Province, the project harrnesses a high head system to contribute renewable energy to the national grid via the Singati Substation."
    },
    {
        id: "ded-2",
        title: "Lohore Khola Hydropower Project",
        division: "Detailed Engineering Design",
        location: [28.9, 81.8],
        role: "TAC Hydro Consultancy Pvt. Ltd. was awarded the contract for the Detailed Engineering Design of the project by the promoter, Lohore Khola Hydropower Company Pvt. Ltd. In this capacity, our firm was responsible for finalizing the technical layout of the civil and hydromechanical components, verifying the hydrological data, and providing the necessary engineering blueprints for construction.",
        technicalHighlights: {
            "Project Location": "Toli, Naumule, and Baluatar regions, Dailekh District, Karnali Province",
            "Installed Capacity": "4.2 MW",
            "Design Discharge": "4.767 m³/s (Q40)",
            "Gross Head": "113.20 m",
            "Design Flood": "361 m³/s",
            "Diversion Type": "Concrete diversion weir with side intake",
            "Headrace Pipe Length/Diameter": "2,825 m / 1.2 m diameter (MS Pipe)",
            "Penstock Pipe Length/Diameter": "180 m / 1.1 m diameter",
            "Thickness of Pipe": "6 mm to 12 mm",
            "Unit Capacity": "2.1 MW per unit (2 units of Horizontal Axis Pelton Turbines)"
        },
        images: ["/downloads/mjlodvw6RB1obD/img/mask-group-2.png", "/downloads/mjlodvw6RB1obD/img/mask-group-3.png", "/downloads/mjlodvw6RB1obD/img/mask-group-4.png", "/downloads/mjlodvw6RB1obD/img/mask-group.png"],
        description: "The Lohore Khola Hydropower Project is a 4.2 MW run-of-the-river facility located in the Dailekh District of Karnali Province. The project harrnesses the perennial, rain-fed flows of the Lohore Khola and Padam Khola in the Naumule and Toli regions. Designed for both isolated and parallel grid operation, the plant utilizes a high gross head of 113.20 m to contribute to the regional power supply."
    },
    {
        id: "ded-3",
        title: "Rawa Khola Hydropower Project",
        division: "Detailed Engineering Design",
        location: [27.32, 86.76],
        role: "Detailed Engineering Design (Ongoing)",
        technicalHighlights: {
            "Project Location": "Kepilasgadhi and Aiselukharka Rural Municipalities, Khotang District, Koshi Province",
            "Installed Capacity": "6.7 MW",
            "Design Discharge": "7.55 m³/s (Q40)",
            "Gross Head": "113.5 m",
            "Design Flood": "N/A",
            "Diversion Type": "N/A",
            "Headrace Pipe Length/Diameter": "N/A",
            "Penstock Pipe Length/Diameter": "N/A",
            "Thickness of Pipe": "N/A",
            "Unit Capacity": "2 units of Francis turbine"
        },
        images: ["/downloads/mjlodvw6RB1obD/img/mask-group-4.png", "/downloads/mjlodvw6RB1obD/img/mask-group.png", "/downloads/mjlodvw6RB1obD/img/mask-group-1.png", "/downloads/mjlodvw6RB1obD/img/mask-group-2.png"],
        description: "A contract agreement for the Detailed Engineering Design of the Rawa Khola HPP (6.7 MW), including Hydromechanical and Transmission Line works, was signed on 10th December, 2025, which is ongoing."
    },
    {
        id: "ded-4",
        title: "Upper Piluwa Khola-3",
        division: "Detailed Engineering Design",
        location: [27.3, 87.4],
        role: "TAC Hydro Consultancy Pvt. Ltd. was appointed by the EPC contractor, Growth/PES JV Pvt. Ltd., to provide critical Design Review and Engineering Support during the construction of both civil and hydromechanical works. Our involvement, which began on March 30, 2021, ensures that the construction adheres to technical specifications and structural integrity standards. We provide real-time engineering solutions for complex project components, including the dual diversion weirs, the 1,360 m headrace pipe, and the Lakhuwa Khola penstock crossing, ensuring the project transitions smoothly from design to operational status.",
        technicalHighlights: {
            "Project Location": "Madi and Chainpur Municipalities, Sankhuwasabha district, Koshi Province",
            "Installed Capacity": "4.95 MW",
            "Design Discharge": "5.02 m³/s (Q45)",
            "Gross Head": "128 m",
            "Design Flood": "N/A",
            "Diversion Type": "Dual-river intake (Piluwa and Sikhuwa Khola)",
            "Headrace Pipe Length/Diameter": "1,360 m / 1.6 m to 1.3 m",
            "Penstock Pipe Length/Diameter": "1,270 m / 1.3 m to 0.77 m",
            "Thickness of Pipe": "8 mm to 24 mm",
            "Unit Capacity": "2 units of Horizontal axis Francis turbine"
        },
        images: ["/downloads/mjlodvw6RB1obD/img/mask-group.png", "/downloads/mjlodvw6RB1obD/img/mask-group-3.png", "/downloads/mjlodvw6RB1obD/img/mask-group-2.png", "/downloads/mjlodvw6RB1obD/img/mask-group-4.png"],
        description: "The Upper Piluwa Khola-3 Hydroelectric Project is a 4.95 MW run-of-the-river facility located in the Madi and Chainpur Municipalities of Sankhuwasabha District, Koshi Province. Developed by Mabilung Energy Private Limited (MEPL), the project features a unique dual-river intake system, utilizing water from both the Piluwa and Sikhuwa Khola. The scheme is designed to harness a gross head of 128 m, with the penstock crossing the Lakhuwa Khola to reach a surface powerhouse located near the river confluence."
    },
    {
        id: "ded-5",
        title: "Liping Khola Hydropower Project",
        division: "Detailed Engineering Design",
        location: [27.98, 85.95],
        role: "TAC Hydro Consultancy Pvt. Ltd. has been awarded the Detail Engineering Design for the project, supporting the Client in maintaining quality, safety, and compliance throughout the construction phase. The services commenced after contract agreement signed with Him River Power Limited on 10th Baisakh 2078 B.S.",
        technicalHighlights: {
            "Project Location": "Tatopani, Sindhupalchowk district, Bagmati Province, Nepal",
            "Installed Capacity": "16.26 MW",
            "Design Discharge": "2.45 m³/s (Q40)",
            "Gross Head": "807 m",
            "Design Flood": "245 m³/s",
            "Diversion Type": "High dam with side intake",
            "Headrace Pipe Length/Diameter": "3,480 m / 1.5 m diameter",
            "Penstock Pipe Length/Diameter": "1,320 m / 1.2 m diameter",
            "Thickness of Pipe": "12 mm to 40 mm",
            "Unit Capacity": "8.13 MW per unit (2 units of Pelton Turbines)"
        },
        images: ["/downloads/mjlodvw6RB1obD/img/mask-group-1.png", "/downloads/mjlodvw6RB1obD/img/mask-group-2.png", "/downloads/mjlodvw6RB1obD/img/mask-group-4.png", "/downloads/mjlodvw6RB1obD/img/mask-group-3.png"],
        description: "Liping Khola Hydropower Project is a Run-of-River (RoR) scheme developed by Him River Power Limited, located in Sindhupalchowk District, Bagmati Province, Nepal. The project site is accessible via the Araniko National Highway and lies approximately 115 km from Kathmandu. All major components, including the headworks, water conveyance system, and underground powerhouse, are situated on the left bank of Liping Khola. The project layout consists of a diversion weir with two side intake orifices leading to a cobble trap, followed by a 108 m long approach tunnel to underground settling basins."
    },
    {
        id: "ded-6",
        title: "Jagdulla Hydroelectric Project",
        division: "Detailed Engineering Design",
        location: [29.05, 82.6],
        role: "TAC Hydro Consultancy Pvt. Ltd. was commissioned to carry out the Detailed Engineering Design (DED) for the project. In this role, our firm was responsible for the complete technical design of the civil and hydromechanical components, translating the feasibility framework into actionable construction blueprints.",
        technicalHighlights: {
            "Project Location": "Mudkechula & Jagdulla RM, Dolpa District, Karnali Province",
            "Installed Capacity": "106.00 MW",
            "Design Discharge": "15.42 m³/s (Q45)",
            "Gross Head": "789.6 m",
            "Design Flood": "300 m³/s (at intake)",
            "Diversion Type": "Full overflow gravity dam",
            "Headrace Pipe Length/Diameter": "Tunnel: 6,135 m / 3.8 m excavated diameter",
            "Penstock Pipe Length/Diameter": "N/A",
            "Thickness of Pipe": "N/A",
            "Unit Capacity": "53 MW per unit (2 units of Vertical Pelton Turbines)"
        },
        images: ["/downloads/mjlodvw6RB1obD/img/mask-group-3.png", "/downloads/mjlodvw6RB1obD/img/mask-group.png", "/downloads/mjlodvw6RB1obD/img/mask-group-4.png", "/downloads/mjlodvw6RB1obD/img/mask-group-2.png"],
        description: "The Jagdulla PRoR Hydroelectric Project (JHEP) is one of the peaking run-of-river schemes in Nepal, designed to provide a six-hour peaking capability during the dry season. It is located in Wards 1, 2, and 3 of Jagdulla Rural Municipality and Ward 4 of Mudkechula Rural Municipality in Dolpa District of Karnali Province. The projects Regional geological survey and engineering geological survey has been complete and Geotechnical Investigation is proposed at different location of headworks, surge tank and powerhouse area and will be conducted soon."
    },
    {
        id: "ded-7",
        title: "Super Mai Hydropower Project",
        division: "Detailed Engineering Design",
        location: [26.9, 87.9],
        role: "TAC Hydro Consultancy Pvt. Ltd. was commissioned to carry out the Detailed Engineering Design (DED) of civil, hydromechanical, electromechanical and transmission line components for the project which includes the hydraulic design, structural design and general arrangement drawing with detail layout of all components along with preparation of employer's requirement, technical specifications and all documentation required for contract agreement.",
        technicalHighlights: {
            "Project Location": "Maimajhuwa/Mabu, Illam District, Koshi Province, Nepal",
            "Installed Capacity": "7.8 MW",
            "Design Discharge": "8.16 m³/s (Q40)",
            "Gross Head": "114 m",
            "Design Flood": "64.1 m³/s",
            "Diversion Type": "Tyrolean Intake",
            "Headrace Pipe Length/Diameter": "3,000 m / 2.0 m diameter",
            "Penstock Pipe Length/Diameter": "426 m / 1.8 m diameter",
            "Thickness of Pipe": "10 mm to 14 mm",
            "Unit Capacity": "3.9 MW per unit (2 units of Francis Turbines)"
        },
        images: ["/downloads/mjlodvw6RB1obD/img/mask-group-4.png", "/downloads/mjlodvw6RB1obD/img/mask-group-1.png", "/downloads/mjlodvw6RB1obD/img/mask-group-3.png", "/downloads/mjlodvw6RB1obD/img/mask-group-2.png"],
        description: "Super Mai Hydropower Project (7.8 MW) developed by Super mai Hydropower Ltd. is a run-of-river hydroelectric project using river flow to generate power in Illam District, eastern Nepal on the Mai River. The project has been in operation since its Commercial Operation Date (COD) on 2075-07-11 BS."
    },
    {
        id: "ded-8",
        title: "Sano Milti Khola Small Hydropower",
        division: "Detailed Engineering Design",
        location: [27.6, 86.2], // Approx
        role: "Project Role Not Specified",
        technicalHighlights: {
            "Project Location": "Shailung Gaupalika and Jiri Municipality, Dolakha and Ramechhap Districts",
            "Installed Capacity": "3.00 MW",
            "Design Discharge": "2.41 m³/s (Q40)",
            "Gross Head": "153 m",
            "Design Flood": "115.35 m³/s (100-year)",
            "Diversion Type": "Boulder weir with side intake",
            "Headrace Pipe Length/Diameter": "2,840 m / 1.3 m to 1.1 m diameter",
            "Penstock Pipe Length/Diameter": "430 m / 0.9 m diameter",
            "Thickness of Pipe": "8 mm to 14 mm",
            "Unit Capacity": "1.5 MW per unit (2 units of Francis Turbines)"
        },
        images: ["/downloads/mjlodvw6RB1obD/img/mask-group-2.png", "/downloads/mjlodvw6RB1obD/img/mask-group-3.png", "/downloads/mjlodvw6RB1obD/img/mask-group-1.png", "/downloads/mjlodvw6RB1obD/img/mask-group.png"],
        description: "The Sano Milti Khola Small Hydropower Project (3.00 MW) is a Run-of-River (RoR) energy project located on the border of the Dolakha and Ramechhap districts in Nepal. Developed by Sano Milti Khola Hydropower Pvt. Ltd., it utilizes the water resources of the Milti Khola, a tributary within the Tamakoshi river basin."
    },
    {
        id: "ded-9",
        title: "Dwari Khola Hydropower Project",
        division: "Detailed Engineering Design",
        location: [28.9, 81.7], // Approx Dailekh/Dwari area
        role: "TAC Hydro Consultancy Pvt. Ltd. was awarded the Review of feasibility study with further hydrological analysis and optimization of project capacity, detail topographical survey, survey data analysis and selection of most suitable waterway alignment, location of the diversion weir and other headworks components, location of powerhouse and transmission line alignment along with hydraulic design, structural design and general arrangement drawing with detail layout of all civil, hydromechanical (HM), electromechanical (EM) and transmission line (TL) components and detail estimate of the project cost and also in Preparation of employer's requirement, technical specifications and all documentation required for contract agreement for civil, HM, EM and TL works",
        technicalHighlights: {
            "Project Location": "Naumule and Toli regions, Dailekh District, Karnali Province",
            "Installed Capacity": "3.75 MW",
            "Design Discharge": "3.70 m³/s (Q40)",
            "Gross Head": "125.7 m",
            "Design Flood": "233 m³/s (100-year)",
            "Diversion Type": "Gravity dam with side intake",
            "Headrace Pipe Length/Diameter": "2,480 m / 1.6 m diameter",
            "Penstock Pipe Length/Diameter": "315 m / 1.4 m diameter",
            "Thickness of Pipe": "8 mm to 16 mm",
            "Unit Capacity": "1.875 MW per unit (2 units of Pelton Turbines)"
        },
        images: ["/downloads/mjlodvw6RB1obD/img/mask-group.png", "/downloads/mjlodvw6RB1obD/img/mask-group-4.png", "/downloads/mjlodvw6RB1obD/img/mask-group-2.png", "/downloads/mjlodvw6RB1obD/img/mask-group-1.png"],
        description: "Dwari Khola Small Hydroelectric Project developed by Bhugol Energy Development Company Pvt. Ltd. is conceived as a simple Run - of – River (ROR) scheme. The proposed project will have an installed capacity of 3.75 MW and will be able to generate 21.09 GWh of energy annually before outages and losses. The water from the Dwari Khola will be diverted at point about 3 km upstream from Dwari and Lohore Khola confluence. A gravity structure of low height dam, with the height of about 2.5m from the river bed, will be constructed as a diversion weir to ensure safe passage of design flow through orifice type side intake"
    },

    // --- CONSTRUCTION SUPERVISION (4 Projects) ---
    {
        id: "cs-1",
        title: "Upper Piluwa Khola-3",
        division: "Construction Supervision",
        location: [27.3, 87.4],
        role: "TAC Hydro Consultancy Pvt. Ltd. was appointed by the EPC contractor, Growth/PES JV Pvt. Ltd., to provide critical Design Review and Engineering Support during the construction of both civil and hydromechanical works. Our involvement, which began on March 30, 2021, ensures that the construction adheres to technical specifications and structural integrity standards. We provide real-time engineering solutions for complex project components, including the dual diversion weirs, the 1,360 m headrace pipe, and the Lakhuwa Khola penstock crossing, ensuring the project transitions smoothly from design to operational status.",
        technicalHighlights: {
            "Project Location": "Madi and Chainpur Municipalities, Sankhuwasabha district, Koshi Province",
            "Installed Capacity": "4.95 MW",
            "Design Discharge": "5.02 m³/s (Q45)",
            "Gross Head": "128 m",
            "Design Flood": "N/A",
            "Diversion Type": "Dual-river intake (Piluwa and Sikhuwa Khola)",
            "Headrace Pipe Length/Diameter": "1,360 m / 1.6 m to 1.3 m",
            "Penstock Pipe Length/Diameter": "1,270 m / 1.3 m to 0.77 m",
            "Thickness of Pipe": "8 mm to 24 mm",
            "Unit Capacity": "2 units of Horizontal axis Francis turbine"
        },
        images: ["/downloads/mjlodvw6RB1obD/img/mask-group-1.png", "/downloads/mjlodvw6RB1obD/img/mask-group-2.png", "/downloads/mjlodvw6RB1obD/img/mask-group-3.png", "/downloads/mjlodvw6RB1obD/img/mask-group-4.png"],
        description: "The Upper Piluwa Khola-3 Hydroelectric Project is a 4.95 MW run-of-the-river facility located in the Madi and Chainpur Municipalities of Sankhuwasabha District, Koshi Province. Developed by Mabilung Energy Private Limited (MEPL), the project features a unique dual-river intake system, utilizing water from both the Piluwa and Sikhuwa Khola. The scheme is designed to harness a gross head of 128 m, with the penstock crossing the Lakhuwa Khola to reach a surface powerhouse located near the river confluence."
    },
    {
        id: "cs-2",
        title: "Liping Khola Hydropower Project",
        division: "Construction Supervision",
        location: [27.98, 85.95],
        role: "TAC Hydro Consultancy Pvt. Ltd. is providing Construction Supervision services for the project, supporting the Client in maintaining quality, safety, and compliance throughout the construction phase. The services commenced after contract agreement signed with Him River Power Limited on 10th Baisakh 2078 B.S",
        technicalHighlights: {
            "Project Location": "Tatopani, Sindhupalchowk district, Bagmati Province, Nepal",
            "Installed Capacity": "16.26 MW",
            "Design Discharge": "2.45 m³/s (Q40)",
            "Gross Head": "807 m",
            "Design Flood": "245 m³/s",
            "Diversion Type": "High dam with side intake",
            "Headrace Pipe Length/Diameter": "3,480 m / 1.5 m diameter",
            "Penstock Pipe Length/Diameter": "1,320 m / 1.2 m diameter",
            "Thickness of Pipe": "12 mm to 40 mm",
            "Unit Capacity": "8.13 MW per unit (2 units of Pelton Turbines)"
        },
        images: ["/downloads/mjlodvw6RB1obD/img/mask-group.png", "/downloads/mjlodvw6RB1obD/img/mask-group-1.png", "/downloads/mjlodvw6RB1obD/img/mask-group-2.png", "/downloads/mjlodvw6RB1obD/img/mask-group-3.png"],
        description: "Liping Khola Hydropower Project is a Run-of-River (RoR) scheme developed by Him River Power Limited, located in Sindhupalchowk District, Bagmati Province, Nepal. The project site is accessible via the Araniko National Highway and lies approximately 115 km from Kathmandu. All major components, including the headworks, water conveyance system, and underground powerhouse, are situated on the left bank of Liping Khola. The project layout consists of a diversion weir with two side intake orifices leading to a cobble trap, followed by a 108 m long approach tunnel to underground settling basins."
    },
    {
        id: "cs-3",
        title: "Ghatte Khola Small Hydropower Project",
        division: "Construction Supervision",
        location: [27.863, 86.17],
        role: "TAC Hydro Consultancy Pvt. Ltd. was commissioned by Manakamana Engineering Hydropower Pvt. Ltd. to provide Engineering Supervision and Quality Control for the project. In this role, our firm was responsible for the complete technical design of the civil and hydromechanical components, translating the feasibility framework into actionable construction blueprints. Additionally, we provided on-site consulting services to supervise construction activities and managed technical coordination from our Kathmandu office to ensure the project met its commercial and engineering requirements.",
        technicalHighlights: {
            "Project Location": "Gaurishankar Gaupalika (Marbu), Dolakha District, Bagmati Province",
            "Installed Capacity": "5.00 MW",
            "Design Discharge": "1.78 m³/s (Q40)",
            "Gross Head": "330 m",
            "Design Flood": "125 m³/s",
            "Diversion Type": "Side orifice intake with boulder riprap weir",
            "Headrace Pipe Length/Diameter": "2,129.25 m / 1.2 m diameter",
            "Penstock Pipe Length/Diameter": "1,022.25 m / 0.9 m diameter",
            "Thickness of Pipe": "8 mm to 20 mm",
            "Unit Capacity": "2.5 MW per unit (2 units of Pelton Turbines)"
        },
        images: ["/downloads/mjlodvw6RB1obD/img/mask-group-2.png", "/downloads/mjlodvw6RB1obD/img/mask-group.png", "/downloads/mjlodvw6RB1obD/img/mask-group-3.png", "/downloads/mjlodvw6RB1obD/img/mask-group-1.png"],
        description: "The Ghatte Khola Small Hydropower Project is a 5 MW run-of-the-river facility located on the Ghatte Khola, a tributary of the Khare/Khani Khola, in Gaurishankar Gaupalika, Dolakha District. Positioned in the steep terrain of Bagmati Province, the project harrnesses a high head system to contribute renewable energy to the national grid via the Singati Substation."
    },
    {
        id: "cs-4",
        title: "Middle Modi Hydropower Project",
        division: "Construction Supervision",
        location: [28.3, 83.8],
        role: "TAC Hydro Consultancy Pvt. Ltd. is providing Construction Supervision services for the project, supporting the Client in maintaining quality, safety, and compliance throughout the construction phase.",
        technicalHighlights: {
            "Project Location": "Birethanti, Nayapul (Kaski) and Chuwa (Parbat), Gandaki Province, Nepal",
            "Installed Capacity": "15.10 MW",
            "Design Discharge": "25.0 m³/s (Q40)",
            "Gross Head": "77.0 m",
            "Design Flood": "1,143 m³/s",
            "Diversion Type": "Concrete weir with side intake",
            "Headrace Pipe Length/Diameter": "Tunnel: 2,840 m (inverted D-shaped)",
            "Penstock Pipe Length/Diameter": "115 m / 3.8 m to 2.7 m diameter",
            "Thickness of Pipe": "12 mm to 16 mm",
            "Unit Capacity": "7.55 MW per unit (2 units of Vertical Axis Francis Turbines)"
        },
        images: ["/downloads/mjlodvw6RB1obD/img/mask-group-3.png", "/downloads/mjlodvw6RB1obD/img/mask-group-4.png", "/downloads/mjlodvw6RB1obD/img/mask-group-2.png", "/downloads/mjlodvw6RB1obD/img/mask-group.png"],
        description: "Middle Modi Hydroelectric Project (15 MW) was developed by Middle Modi Hydropower Limited, a company associated with Himal Hydro and General Construction Ltd, which is promoted by the Chaudhary Group (CG) of Nepal. It is located approximately 40 km north-west of Pokhara in Kaski and Parbat Districts of Gandaki Province, Nepal. The project headworks are situated at Birethanti village, with access via a 1.5 km earthen road from Nayapul Bazaar, which connects to the Pokhara–Baglung Highway. The powerhouse is located on the right bank of the Modi Khola, opposite the Pokhara–Baglung Highway, with the waterway alignment also along the right bank."
    },

    // --- DUE DILLIGENCE APPRAISAL (10 Projects) ---
    {
        id: "dd-1",
        title: "Likhu-1 Hydropower Project",
        division: "Due Diligence Appraisal",
        location: [27.4, 86.3], // Dummy
        role: "Due Diligence",
        technicalHighlights: {
            "Project Location": "Umakunda RM (Ramechhap) and Jiri Municipality (Ramechhap), Bagmati Province",
            "Installed Capacity": "77.00 MW",
            "Design Discharge": "11.16 m³/s (Q45)",
            "Gross Head": "796 m",
            "Design Flood": "349 m³/s (100-year)",
            "Diversion Type": "Concrete gravity dam",
            "Headrace Pipe Length/Diameter": "Tunnel: 8,143 m / 3.2 m to 2.8 m diameter",
            "Penstock Pipe Length/Diameter": "1,245 m / 2.2 m to 1.8 m diameter",
            "Thickness of Pipe": "12 mm to 40 mm",
            "Unit Capacity": "25.66 MW per unit (3 units of Pelton Turbines)"
        },
        images: ["/downloads/mjlodvw6RB1obD/img/mask-group-4.png", "/downloads/mjlodvw6RB1obD/img/mask-group.png", "/downloads/mjlodvw6RB1obD/img/mask-group-1.png", "/downloads/mjlodvw6RB1obD/img/mask-group-2.png"],
        description: "Large scale 77 MW project on the Likhu River."
    },
    {
        id: "dd-2",
        title: "Nupche Likhu Hydropower Project",
        division: "Due Diligence Appraisal",
        location: [27.69, 86.46],
        role: "TAC Hydro Consultancy Pvt. Ltd. is responsible for conducting due diligence Study on behalf of Equity Investor Avasar Equity Diversified fund which includes evaluating, verifying, and de-risking hydroelectric projects for investors as well as review technical, financial, environmental, and legal aspects to ensure the project's feasibility, safety, and profitability.",
        technicalHighlights: {
            "Project Location": "Umakunda Rural Municipality, Ramechhap District, Bagmati Province",
            "Installed Capacity": "57.50 MW",
            "Design Discharge": "7.11 m³/s (Q45)",
            "Gross Head": "1003.50 m",
            "Design Flood": "76 m³/s (At Nupche) / 63 m³/s (At Likhu)",
            "Diversion Type": "Boulder lined weir with side intakes",
            "Headrace Pipe Length/Diameter": "Tunnel: 6318.03 m; Pipe: 1215 m",
            "Penstock Pipe Length/Diameter": "2422.50 m / 1.25 to 0.72 m",
            "Thickness of Pipe": "8 mm to 56 mm",
            "Unit Capacity": "3 units of horizontal axis Pelton turbines"
        },
        images: ["/downloads/mjlodvw6RB1obD/img/mask-group-3.png", "/downloads/mjlodvw6RB1obD/img/mask-group-4.png", "/downloads/mjlodvw6RB1obD/img/mask-group.png", "/downloads/mjlodvw6RB1obD/img/mask-group-1.png"],
        description: "Nupche Likhu Hydropower Project (NLHPP), developed by Vision Energy & Power Ltd., is a run-of-river hydropower project located in Ramechhap District, Bagmati Province (Province No. 3), Nepal. The project is situated within Umakunda Rural Municipality, where both the intake and powerhouse sites are located. The project is designed with multiple headworks to capture flows from both the Nupche and Likhu rivers. The source of water for the Nupche Likhu Hydropower Project originates from snow-fed rivers in the high mountain and hilly regions. The project is one of the highest head hydropower projects currently under construction in Nepal."
    },
    {
        id: "dd-3",
        title: "Lower Erkhuwa Hydropower Project",
        division: "Due Diligence Appraisal",
        location: [27.42, 87.11],
        role: "TAC Hydro Consultancy Pvt. Ltd. is responsible for conducting due diligence Study on behalf of lenders consortium (lead bank: Machhapuchchhre Bank Ltd) which includes evaluating, verifying, and de-risking hydroelectric projects for lenders as well as review technical, financial, environmental, and legal aspects to ensure the project's feasibility, safety, and profitability.",
        technicalHighlights: {
            "Project Location": "Khadananda Municipality and Shalpa Silicho RM, Bhojpur District, Koshi Province",
            "Installed Capacity": "14.15 MW",
            "Design Discharge": "11.20 m³/s (Q40)",
            "Gross Head": "150.63 m",
            "Design Flood": "218.28 m³/s",
            "Diversion Type": "Ogee Shaped Overflow Type",
            "Headrace Pipe Length/Diameter": "Tunnel: 2,525 m",
            "Penstock Pipe Length/Diameter": "595 m / 2.2 m diameter",
            "Thickness of Pipe": "10 mm to 16 mm",
            "Unit Capacity": "7.294 MW per Unit (2 units of Francis turbines)"
        },
        images: ["/downloads/mjlodvw6RB1obD/img/mask-group-1.png", "/downloads/mjlodvw6RB1obD/img/mask-group-3.png", "/downloads/mjlodvw6RB1obD/img/mask-group-2.png", "/downloads/mjlodvw6RB1obD/img/mask-group-4.png"],
        description: "Lower Erkhuwa Hydropower Project (LEHPP) developed by Lower Erkhuwa Hydropower Company Pvt. Ltd. is a run-of-the-river (RoR) hydropower scheme with an installed capacity of 14.15 MW and an average annual energy generation of 79.79 GWh, comprising 12.68 GWh dry season energy and 67.11 GWh wet season energy in Khadananda Municipality and Shalpa Silicho Rural Municipality, Bhojpur District, Koshi Province, Nepal, utilizing the Erkhuwa Khola. The intake located in Khadananda Municipality and Shalpa Silicho, and the powerhouse in Khadananda Municipality."
    },
    {
        id: "dd-4",
        title: "Midim-1 Hydropower Project",
        division: "Due Diligence Appraisal",
        location: [28.25, 84.27],
        role: "TAC Hydro Consultancy Pvt. Ltd. had signed an agreement with the client Mount Rasuwa Hydropower Pvt. Ltd (MRHPL) for the Due Diligence study of this project with the client on 27th June, 2025. The firm is responsible for evaluating, verifying, and de-risking hydroelectric projects for investors, lenders, and developers as well as review technical, financial, environmental, and legal aspects to ensure the project's feasibility, safety, and profitability.",
        technicalHighlights: {
            "Project Location": "Pasagaun and Karapu, Lamjung District, Gandaki province, Nepal",
            "Installed Capacity": "13.424 MW",
            "Design Discharge": "4.64 m³/s (Q42)",
            "Gross Head": "347 m",
            "Design Flood": "251 m³/s (100-year)",
            "Diversion Type": "Boulder lined weir",
            "Headrace Pipe Length/Diameter": "4,866 m / 1.75 m diameter",
            "Penstock Pipe Length/Diameter": "948 m / 1.4 m diameter",
            "Thickness of Pipe": "N/A",
            "Unit Capacity": "6.92 MW per unit (2 units of Vertical-axis Pelton turbines)"
        },
        images: ["/downloads/mjlodvw6RB1obD/img/mask-group.png", "/downloads/mjlodvw6RB1obD/img/mask-group-2.png", "/downloads/mjlodvw6RB1obD/img/mask-group-4.png", "/downloads/mjlodvw6RB1obD/img/mask-group-1.png"],
        description: "The Midim-1 Hydropower Project of installed capacity 13,424 kW, is being constructed by Mount Rasuwa Hydropower Pvt. Ltd. as a run-of-river scheme in Lamjung District in Gandaki province. The project utilizes the stream of Midim Khola which is a tributary of Marsyangdi River. The headworks of Midim 1 hydropower project is located at 50 m U/S from the confluence of Midim Khola and Tiju Khola. There is side intake with orifice and trashrack to control entry of debris, followed by gravel trap and desander at the left bank of Midim Khola."
    },
    {
        id: "dd-5",
        title: "Upper Tadi Khola Hydropower Project",
        division: "Due Diligence Appraisal",
        location: [27.98, 85.42],
        role: "TAC Hydro Consultancy Pvt. Ltd. is responsible for conducting due diligence Study on behalf of lenders consortium (lead bank: Kumari Bank Ltd) which includes evaluating, verifying, and de-risking hydroelectric projects for lenders as well as review technical, financial, environmental, and legal aspects to ensure the project's feasibility, safety, and profitability.",
        technicalHighlights: {
            "Project Location": "Ghyangphedi and Shikharbesi regions, Nuwakot District, Bagmati province",
            "Installed Capacity": "11.00 MW",
            "Design Discharge": "6.3 m³/s (Q40)",
            "Gross Head": "216.8 m",
            "Design Flood": "207 m³/s (100-year)",
            "Diversion Type": "Boulder Riprap weir",
            "Headrace Pipe Length/Diameter": "N/A",
            "Penstock Pipe Length/Diameter": "2,459 m / 1.14 m to 1.8 m",
            "Thickness of Pipe": "N/A",
            "Unit Capacity": "2 units of Vertical shaft Pelton turbines"
        },
        images: ["/downloads/mjlodvw6RB1obD/img/mask-group-2.png", "/downloads/mjlodvw6RB1obD/img/mask-group-1.png", "/downloads/mjlodvw6RB1obD/img/mask-group-3.png", "/downloads/mjlodvw6RB1obD/img/mask-group.png"],
        description: "The Upper Tadi Khola Hydroelectric Project of installed capacity 11 MW, is being constructed by Suryakunda Hydro Electric Limited. The Project location is in Nuwakot District of Bagmati province. The project utilizes the stream of Tadi khola, which is a tributary of Trishuli River. A 25 m long boulder riprap weir having one bay of under sluice is provided to divert the flow. The Intake, gravel trap, settling basin, and forebay are proposed along the right bank of the river."
    },
    {
        id: "dd-6",
        title: "Madhya Super Daraudi Hydropower",
        division: "Due Diligence Appraisal",
        location: [28.22, 84.73],
        role: "TAC Hydro Consultancy Pvt. Ltd. is responsible for conducting due diligence Study on behalf of lenders consortium (lead bank: Prime Commercial Bank Ltd) which includes evaluating, verifying, and de-risking hydroelectric projects for lenders as well as review technical, financial, environmental, and legal aspects to ensure the project's feasibility, safety, and profitability.",
        technicalHighlights: {
            "Project Location": "Ajirkot and Barpak Sulikot Rural Municipalities, Gorkha district, Gandaki Province",
            "Installed Capacity": "10.00 MW",
            "Design Discharge": "5.09 m³/s (Q40)",
            "Gross Head": "249.5 m",
            "Design Flood": "519 m³/s",
            "Diversion Type": "Ogee-Shaped Concrete Weir",
            "Headrace Pipe Length/Diameter": "1,746 m / 1.7 m diameter",
            "Penstock Pipe Length/Diameter": "2,425 m / 1.6 m diameter",
            "Thickness of Pipe": "8 mm to 26 mm",
            "Unit Capacity": "5 MW per unit (2 units of Horizontal axis Francis turbine)"
        },
        images: ["/downloads/mjlodvw6RB1obD/img/mask-group-4.png", "/downloads/mjlodvw6RB1obD/img/mask-group.png", "/downloads/mjlodvw6RB1obD/img/mask-group-2.png", "/downloads/mjlodvw6RB1obD/img/mask-group-1.png"],
        description: "The Madhya Super Daraudi Hydropower Project (10 MW) is a Run-of-River (RoR) scheme located in the Gorkha district (Ajirkot and Barpak Sulikot Rural Municipalities) of Gandaki Province, Nepal. Developed by Barpak Daraudi Hydropower Private Limited (BDHPL), the project utilizes the water resources of the Daraudi River to generate clean energy for the national grid."
    },
    {
        id: "dd-7",
        title: "Tadi Ghyangphedi Hydropower Project",
        division: "Due Diligence Appraisal",
        location: [28.0, 85.4], // Approx
        role: "Due Diligence",
        technicalHighlights: {
            "Project Location": "Ghyangphedi, Nuwakot District, Bagmati Province, Nepal",
            "Installed Capacity": "8.00 MW",
            "Design Discharge": "5.02 m³/s (Q40)",
            "Gross Head": "194.5 m",
            "Design Flood": "141.6 m³/s",
            "Diversion Type": "Tyrolean Intake",
            "Headrace Pipe Length/Diameter": "4,480 m / 1.6 m diameter",
            "Penstock Pipe Length/Diameter": "360 m / 1.4 m diameter",
            "Thickness of Pipe": "10 mm to 16 mm",
            "Unit Capacity": "4.0 MW per unit (2 units of Francis Turbines)"
        },
        images: ["/downloads/mjlodvw6RB1obD/img/mask-group-3.png", "/downloads/mjlodvw6RB1obD/img/mask-group-4.png", "/downloads/mjlodvw6RB1obD/img/mask-group.png", "/downloads/mjlodvw6RB1obD/img/mask-group-2.png"],
        description: "8.00 MW project located in Ghyangphedi area."
    },
    {
        id: "dd-8",
        title: "Jurimba Khola Small Hydropower",
        division: "Due Diligence Appraisal",
        location: [27.91, 85.9],
        role: "TAC Hydro Consultancy Pvt. Ltd. had signed an agreement with Jurimba Hydropower Company Pvt. Ltd. for the Due Diligence study of this project with the client on 27th October, 2024.",
        technicalHighlights: {
            "Project Location": "Sindhupalchowk district, Bagmati Province, Nepal",
            "Installed Capacity": "7.63 MW",
            "Design Discharge": "1.06 m³/s (Q40)",
            "Gross Head": "870.28 m",
            "Design Flood": "N/A",
            "Diversion Type": "Boulder weir with side intake",
            "Headrace Pipe Length/Diameter": "N/A",
            "Penstock Pipe Length/Diameter": "N/A",
            "Thickness of Pipe": "N/A",
            "Unit Capacity": "2 units of horizontal axis Pelton turbines"
        },
        images: ["/downloads/mjlodvw6RB1obD/img/mask-group-1.png", "/downloads/mjlodvw6RB1obD/img/mask-group-2.png", "/downloads/mjlodvw6RB1obD/img/mask-group-4.png", "/downloads/mjlodvw6RB1obD/img/mask-group-3.png"],
        description: "Jurimba Khola Small Hydropower Project developed by Jurimba Hydropower Company Pvt. Ltd. (JHCPL) is a Peaking Run-of-River (PROR) type project in Sindhupalchowk district, Bagmati Province, Nepal. The main components of the project are headworks with boulder weir, intake, settling basin, peaking pond, headrace pipe, surge shaft, penstock pipe, surface powerhouse and tailrace. The proposed surface powerhouse is in the right bank of Bhotekoshi River and just upstream from confluence of Bhotekhosi River and Jurimba Khola. The headwork diverts the Jurimba khola discharge to toward the powerhouse and the tail water will then be discharged back to Jurimba khola through tailrace culvert."
    },
    {
        id: "dd-9",
        title: "Upper Piluwa Hills Small Hydropower",
        division: "Due Diligence Appraisal",
        location: [27.35, 87.35],
        role: "TAC Hydro Consultancy Pvt. Ltd. was engaged by the client, Milke Jaljale Hydropower Pvt. Ltd to conduct a comprehensive Due Diligence Study of the project. Our role involved a rigorous technical and financial audit of the existing Detailed Project Report (DPR). We performed field data verification, reviewed the civil and hydromechanical designs, and conducted an independent financial analysis to ensure the project’s viability and readiness for implementation. Our Due Diligence Report provides the essential third-party validation required for stakeholders and potential investors.",
        technicalHighlights: {
            "Project Location": "Nundhaki, Siddhakali, Sankhuwasabha district, Nepal",
            "Installed Capacity": "4.99 MW",
            "Design Discharge": "N/A",
            "Gross Head": "N/A",
            "Design Flood": "N/A",
            "Diversion Type": "N/A",
            "Headrace Pipe Length/Diameter": "2,100 m",
            "Penstock Pipe Length/Diameter": "972 m",
            "Thickness of Pipe": "N/A",
            "Unit Capacity": "N/A"
        },
        images: ["/downloads/mjlodvw6RB1obD/img/mask-group-2.png", "/downloads/mjlodvw6RB1obD/img/mask-group-3.png", "/downloads/mjlodvw6RB1obD/img/mask-group.png", "/downloads/mjlodvw6RB1obD/img/mask-group-4.png"],
        description: "Upper Piluwa Hills Small Hydropower Project is a 4.99 MW run-of-the-river facility developed by Milke Jaljale Hydropower Pvt. Ltd. in the Sankhuwasabha District. This project features a unique dual-source water supply, supplementing the primary Piluwa River intake with additional flow from the Tapuwa Khola during the dry season. Its infrastructure includes a 2.1 km headrace pipe and a penstock that crosses the Tapuwa Khola to deliver water to the powerhouse, generating 29.085 GWh of renewable energy annually."
    },
    {
        id: "dd-10",
        title: "Upper Gaddigad Hydropower Project",
        division: "Due Diligence Appraisal",
        location: [29.28, 81.07],
        role: "TAC Hydro Consultancy Pvt. Ltd. is responsible for conducting due diligence Study on behalf of lenders consortium (lead bank: Machhapuchchhre Bank Ltd) which includes evaluating, verifying, and de-risking hydroelectric projects for lenders as well as review technical, financial, environmental, and legal aspects to ensure the project's feasibility, safety, and profitability.",
        technicalHighlights: {
            "Project Location": "Gaihragau, Kadamadaun, and Sanagau, Doti District, Sudurpaschim Province",
            "Installed Capacity": "1.55 MW",
            "Design Discharge": "2.01 m³/s (Q40)",
            "Gross Head": "102.5 m",
            "Design Flood": "199 m³/s (100-year)",
            "Diversion Type": "Free overflow gravity dam",
            "Headrace Pipe Length/Diameter": "1,550 m",
            "Penstock Pipe Length/Diameter": "450 m",
            "Thickness of Pipe": "N/A",
            "Unit Capacity": "0.775 MW per unit (2 units of Horizontal axis Francis Turbines)"
        },
        images: ["/downloads/mjlodvw6RB1obD/img/mask-group-4.png", "/downloads/mjlodvw6RB1obD/img/mask-group-1.png", "/downloads/mjlodvw6RB1obD/img/mask-group-2.png", "/downloads/mjlodvw6RB1obD/img/mask-group-3.png"],
        description: "Upper Gaddigad Hydropower Project is a 1.55 MW, under-construction, run-of-river project located on the Gaddigad river in the Doti district of Nepal. Developed by Shaileshwari Power Nepal, this small hydropower project is located in the areas of Gaihragau, Kadamadaun, and Sanagau. As a project with an installed capacity above 1 MW, it is part of the ongoing efforts to harness local water resources for electricity, with initial licensing and development activities having commenced around 2018."
    }
];
