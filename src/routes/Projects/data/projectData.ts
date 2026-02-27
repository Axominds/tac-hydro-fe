
export type ProjectScope =
    | "Detailed Feasibility Study"
    | "Detailed Engineering Design"
    | "Construction Supervision"
    | "Due Diligence Appraisal"
    | "Progress Monitoring and Bill Vetting";

export interface Project {
    id: string;
    title: string;
    scope: ProjectScope;
    location: [number, number]; // [latitude, longitude]
    role: string;
    technicalHighlights: Record<string, string>;
    images: string[]; // Mock images since we don't have real ones yet
    description: string;
}

export const projectData: Project[] = [
    // --- DETAILED FEASIBILITY STUDY (15 Projects) ---
    {
        id: "fs-1",
        title: "Ghatte Khola Small Hydropower Project (5 MW)",
        scope: "Detailed Feasibility Study",
        location: [27.78, 86.30],
        role: "TAC Hydro Engineers (P). Ltd. was commissioned to conduct the Updated Detailed Feasibility Study. Our role involves a comprehensive technical assessment, including the design and calculation of hydraulic structures, construction planning, and cost estimation to contributing renewable energy to the national grid via the Singati Substation.",
        technicalHighlights: {
            "Project Location": "Gaurishankar Gaupalika (Marbu), Dolakha District, Bagmati Province",
            "Installed Capacity": "5.00 MW",
            "Design Discharge": "1.78 m³/s (Q40)",
            "Gross Head": "328 m",
            "Design Flood": "90.70 m³/s",
            "Diversion Type": "Side orifice intake with boulder riprap weir",
            "Headrace Pipe Length/Diameter": "2,129.25 m / 1.2 m diameter",
            "Penstock Pipe Length/Diameter": "1,022.25 m / 0.9 m diameter",
            "Thickness of Pipe": "8 mm to 20 mm",
            "Unit Capacity": "2.5 MW per unit (2 units of Pelton Turbines)"
        },
        images: ["/downloads/mjlodvw6RB1obD/img/mask-group.png", "/downloads/mjlodvw6RB1obD/img/mask-group-1.png", "/downloads/mjlodvw6RB1obD/img/mask-group-2.png", "/downloads/mjlodvw6RB1obD/img/mask-group-3.png"],
        description: "The Ghatte Khola Small Hydropower Project is a 5 MW run-of-the-river facility located on the Ghatte Khola, a tributary of the Khare/Khani Khola, in Gaurishankar Gaupalika, Dolakha District. Positioned in the steep terrain of Bagmati Province, the project harnesses a high head system to contribute renewable energy to the national grid via the Singati Substation."
    },
    {
        id: "fs-2",
        title: "Lohore Khola Hydropower Project",
        scope: "Detailed Feasibility Study",
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
        scope: "Detailed Feasibility Study",
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
        title: "Rawa Khola Hydropower Project (6.7 MW)",
        scope: "Detailed Feasibility Study",
        location: [27.32, 86.76],
        role: "TAC Hydro Consultancy Pvt. Ltd. provided consulting services for the Updated Feasibility Study of the Rawa Khola Hydropower Project (RKHP), developed by Haleshi Hydropower Private Limited in Khotang District, Eastern Nepal, to upgrade the project capacity from the existing 5.4 MW to 6.7 MW.",
        technicalHighlights: {
            "Project Location": "Kepilasgadhi and Aiselukharka Rural Municipalities, Khotang District, Koshi Province",
            "Installed Capacity": "6.7 MW",
            "Design Discharge": "7.55 m³/s (Q40)",
            "Gross Head": "113.5 m",
            "Design Flood": "374.3 m³/s",
            "Diversion Type": "Ogee weir with side intake",
            "Headrace Pipe Length/Diameter": "2840.09 m / 2 m, 1.9 m, 1.8 m",
            "Thickness of Headrace Pipe": "8-12 mm",
            "Connecting Pipe Length/Diameter": "100 m / 1.8 m",
            "Penstock Pipe Length/Diameter": "473.70 m / 1.8 m, 1.275 m",
            "Unit Capacity": "3.454 MW per unit (2 units of Francis turbine)"
        },
        images: ["/downloads/mjlodvw6RB1obD/img/mask-group-1.png", "/downloads/mjlodvw6RB1obD/img/mask-group-2.png", "/downloads/mjlodvw6RB1obD/img/mask-group.png", "/downloads/mjlodvw6RB1obD/img/mask-group-3.png"],
        description: "The Rawa Khola Hydropower Project is a 6.7 MW run-of-the-river (RoR) scheme located in the Khotang District of Koshi Province. The available gross head is about 113.5 m, and the design discharge is 7.55 m3/s. The major objective of the study is to upgrade the project capacity from 5.4 MW to 6.7 MW."
    },
    {
        id: "fs-5",
        title: "Super Seti Hydropower Project (SSHP)",
        scope: "Detailed Feasibility Study",
        location: [28.45, 84.0],
        role: "TAC Hydro Consultancy was awarded the contract for the Inception Study, Updated Feasibility Study, Detailed Engineering Design of Civil works, Tender Documents Preparation, and Detailed Design of Hydromechanical works by SNEL.",
        technicalHighlights: {
            "Project Location": "Machhapuchhre Gaupalika, Kaski district, Gandaki Province, Nepal",
            "Installed Capacity": "24.0 MW",
            "Design Discharge": "8.5 m³/s (Q40)",
            "Gross Head": "340 m",
            "Design Flood": "8.5 m³/s",
            "Diversion Type": "Concrete gravity ogee",
            "Headrace Tunnel Length/Diameter": "1965.0 m / 3.25 m",
            "Penstock Pipe Length/Diameter": "1196.0 m / 2.2 to 2.0 m",
            "Thickness of Pipe": "12 mm to 36 mm",
            "Unit Capacity": "2 units of horizontal-axis Pelton turbines"
        },
        images: ["/downloads/mjlodvw6RB1obD/img/mask-group-3.png", "/downloads/mjlodvw6RB1obD/img/mask-group-4.png", "/downloads/mjlodvw6RB1obD/img/mask-group.png", "/downloads/mjlodvw6RB1obD/img/mask-group-1.png"],
        description: "S. N. Energy Ltd. (SNEL) is developing the Super Seti Hydropower Project (SSHP) in Machhapuchhre Gaupalika, Kaski district. To increase dry season energy, the flow from Batase Khola will be tapped and mixed with the flow of Seti River."
    },
    {
        id: "fs-6",
        title: "Lower Chameliya Hydropower Project (20MW)",
        scope: "Detailed Feasibility Study",
        location: [29.68, 80.62],
        role: "TAC Hydro Engineers (P). Ltd., in Joint Venture with ERMC (P). Ltd., was commissioned by the Department of Electricity Development (DoED) to conduct the Feasibility Study. Our role involves a comprehensive technical assessment, including the design and calculation of hydraulic structures, construction planning, and cost estimation.",
        technicalHighlights: {
            "Project Location": "Shailyashikhar, Darchula, SudurPaschim",
            "Installed Capacity": "20.00 MW",
            "Design Discharge": "36.38 m³/s (Q40)",
            "Gross Head": "67.35 m",
            "Design Flood": "N/A",
            "Diversion Type": "Surface Rectangular Headpond with 1 bay",
            "Headrace Pipe Length/Diameter": "Buried pipe of length 5840 m / 4.40 m dia.",
            "Penstock Pipe Length/Diameter": "Buried pipe of length 258 m / 3.5 m to 4 m dia.",
            "Thickness of Pipe": "At headrace 16 mm, at penstock 12 to 16 mm",
            "Unit Capacity": "2 units; 10 MW each"
        },
        images: ["/downloads/mjlodvw6RB1obD/img/mask-group.png", "/downloads/mjlodvw6RB1obD/img/mask-group-2.png", "/downloads/mjlodvw6RB1obD/img/mask-group-1.png", "/downloads/mjlodvw6RB1obD/img/mask-group-3.png"],
        description: "The Lower Chamelia Hydropower Project (LCHP) is a 20 MW Cascade Peaking Run-of-River (PRoR) development situated along the Chamelia River. LCHP is strategically designed to utilize the tailrace water from CHEP, ensuring optimal water resource management."
    },
    {
        id: "fs-7",
        title: "Lower Dudhkunda Hydropower Project",
        scope: "Detailed Feasibility Study",
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
        title: "Lower Khani B Hydropower Project (6.2 MW)",
        scope: "Detailed Feasibility Study",
        location: [27.82, 86.33],
        role: "TAC Hydro Consultancy Pvt. Ltd. was commissioned by Koplang Energy Hydropower Pvt. Ltd. to conduct the Updated Feasibility. Our firm is responsible for hydrological analysis, site investigations, project layout optimization, design review, cost estimation, and feasibility assessment.",
        technicalHighlights: {
            "Project Location": "Marbu VDC of Dolakha District, Bagmati Province",
            "Installed Capacity": "6.2 MW",
            "Design Discharge": "5.1 m³/s (Q43.2)",
            "Gross Head": "152.68 m",
            "Design Flood": "185 m³/s",
            "Diversion Type": "Broad Crested Weir",
            "Penstock Pipe Length/Diameter": "1010 m length / 1.2 m diameter",
            "Thickness of Pipe": "6 mm to 14 mm",
            "Unit Capacity": "3.229 MW per unit featuring Horizontal Axis Pelton Turbines (Total 2 units)"
        },
        images: ["/downloads/mjlodvw6RB1obD/img/mask-group-1.png", "/downloads/mjlodvw6RB1obD/img/mask-group-2.png", "/downloads/mjlodvw6RB1obD/img/mask-group-4.png", "/downloads/mjlodvw6RB1obD/img/mask-group-3.png"],
        description: "The Lower Khani B Hydropower Project (LKBHP) is a Run-of-River (RoR) hydropower scheme with an installed capacity of 6.2 MW. It utilizes a design discharge of 5.1 m³/s which corresponds to Q43.2 and a gross head of 152.68 m."
    },
    {
        id: "fs-9",
        title: "Mathillo Inkhu Hydropower Project",
        scope: "Detailed Feasibility Study",
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
        title: "Middle Chameliya Hydropower Project (28.304 MW)",
        scope: "Detailed Feasibility Study",
        location: [29.73, 80.75],
        role: "TAC Hydro Consultancy Pvt. Ltd. provided consulting services for the preparation of the Detailed Feasibility Study of the project, including hydrological analysis, site investigations, project layout optimization, design review, cost estimation, and feasibility assessment.",
        technicalHighlights: {
            "Project Location": "Lama Bagar, Darchula District",
            "Installed Capacity": "28.304 MW",
            "Design Discharge": "25.17 m³/s (Q40)",
            "Gross Head": "136.26 m",
            "Design Flood": "505.07 m³/s",
            "Diversion Type": "Ogee Shaped type",
            "Headrace Pipe Length/Diameter": "7200 m / 3.8 m",
            "Penstock Pipe Length/Diameter": "300 m / 3 m",
            "Thickness of Pipe": "14 to 16 mm",
            "Unit Capacity": "2 Horizontal Francis turbine with 14.59 MW (each) units"
        },
        images: ["/downloads/mjlodvw6RB1obD/img/mask-group-2.png", "/downloads/mjlodvw6RB1obD/img/mask-group-1.png", "/downloads/mjlodvw6RB1obD/img/mask-group-3.png", "/downloads/mjlodvw6RB1obD/img/mask-group-4.png"],
        description: "Madhya Chameliya Hydropower Project (MCHPP) is a Run-of-the-River (ROR) project proposed with an installed capacity of 28.304 MW. The design discharge will be conveyed to powerhouse through water conveyance system consisting of headrace pipe, surge pipe and penstock."
    },
    {
        id: "fs-11",
        title: "Sanjen Khola Hydropower Project",
        scope: "Detailed Feasibility Study",
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
        title: "Super Inkhu Hydropower Project (22.12 MW)",
        scope: "Detailed Feasibility Study",
        location: [27.61, 86.79],
        role: "TAC Hydro Consultancy Pvt. Ltd. was commissioned to conduct the Detailed Feasibility Study, including hydrological analysis, optimization of project capacity, and design of all major components.",
        technicalHighlights: {
            "Project Location": "Makpe Dudhkoshika and Mahakulung Rural Municipality",
            "Installed Capacity": "24.41 MW",
            "Design Discharge": "7.24 m³/s (Q41)",
            "Gross Head": "398 m",
            "Design Flood": "455.54 m³/s",
            "Diversion Type": "Ogee Shape Weir, 29 m",
            "Headrace Tunnel Shape/Length/Diameter": "Inverted-D Shaped Tunnel / 1617 m / 2.8 m",
            "Penstock Pipe Length/Diameter": "597 m / 2.0 m",
            "Thickness of Pipe": "11 mm - 26 mm",
            "Unit Capacity": "2 units, Pelton Turbine (Horizontal), 12.205 MW"
        },
        images: ["/downloads/mjlodvw6RB1obD/img/mask-group-1.png", "/downloads/mjlodvw6RB1obD/img/mask-group-4.png", "/downloads/mjlodvw6RB1obD/img/mask-group-2.png", "/downloads/mjlodvw6RB1obD/img/mask-group-3.png"],
        description: "The Super Inkhu Hydropower Project (often referred to as Upper Inkhu Khola HEP) is a 24.41 MW run-of-river (RoR) project located in the Solukhumbu district. The project is designed to generate significant annual energy."
    },
    {
        id: "fs-13",
        title: "Super Mai Hydropower Project",
        scope: "Detailed Feasibility Study",
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
        scope: "Detailed Feasibility Study",
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
        title: "Super Molung Hydropower Project (9.79 MW)",
        scope: "Detailed Feasibility Study",
        location: [27.42, 86.39],
        role: "TAC Hydro Consultancy Pvt. Ltd. delivered consultancy services for the preparation of the Detailed Feasibility Study for the project, including hydrological assessments, site investigations, and design evaluation.",
        technicalHighlights: {
            "Project Location": "Okhaldhunga",
            "Installed Capacity": "9.79 MW",
            "Design Discharge": "2.1 m³/s (Q40)",
            "Gross Head": "370 m",
            "Design Flood": "146 m³/s",
            "Diversion Type": "Boulder Weir with side intake",
            "Headrace Pipe Length/Diameter": "5630 m / 1.2 m",
            "Penstock Pipe Length/Diameter": "650 m / 0.9 m",
            "Thickness of Pipe": "6 mm, 8 mm to 15 mm",
            "Unit Capacity": "2 unit of horizontal axis pelton turbine"
        },
        images: ["/downloads/mjlodvw6RB1obD/img/mask-group.png", "/downloads/mjlodvw6RB1obD/img/mask-group-1.png", "/downloads/mjlodvw6RB1obD/img/mask-group-4.png", "/downloads/mjlodvw6RB1obD/img/mask-group-3.png"],
        description: "Super Molung Hydropower Project (SMHP) developed by Noble Hydropower Pvt. Ltd. is a Run-of-River scheme on Malun Khola in Okhaldhunga District. The project features diversion weirs with side intakes, settling basins, and a headrace tunnel."
    },

    // --- DETAILED ENGINEERING DESIGN (9 Projects) ---
    {
        id: "ded-1",
        title: "Ghatte Khola Small Hydropower Project (5 MW)",
        scope: "Detailed Engineering Design",
        location: [27.78, 86.30],
        role: "TAC Hydro Consultancy Pvt. Ltd. was commissioned by Manakamana Engineering Hydropower Pvt. Ltd. to provide Engineering Supervision and Quality Control for the project. In this role, our firm was responsible for the complete technical design of the civil and hydromechanical components, translating the feasibility framework into actionable construction blueprints. Additionally, we provided on-site consulting services to supervise construction activities and managed technical coordination from our Kathmandu office to ensure the project met its commercial and engineering requirements.",
        technicalHighlights: {
            "Project Location": "Gaurishankar Gaupalika (Marbu), Dolakha District, Bagmati Province",
            "Installed Capacity": "5.00 MW",
            "Design Discharge (Q40)": "1.78 m³/s",
            "Gross Head": "328 m",
            "Design Flood": "90.70 m³/s",
            "Diversion Type": "Side orifice intake with boulder riprap weir",
            "Headrace Pipe Length/Diameter": "2,129.25 m length / 1.2 m diameter",
            "Penstock Pipe Length/Diameter": "1,022.25 m length / 0.9 m diameter",
            "Thickness of Pipe": "8 mm to 20 mm",
            "Unit Capacity": "2.5 MW per unit (2 units of Pelton Turbines)"
        },
        images: ["/downloads/mjlodvw6RB1obD/img/mask-group-3.png", "/downloads/mjlodvw6RB1obD/img/mask-group-4.png", "/downloads/mjlodvw6RB1obD/img/mask-group.png", "/downloads/mjlodvw6RB1obD/img/mask-group-1.png"],
        description: "The Ghatte Khola Small Hydropower Project is a 5 MW run-of-the-river facility located on the Ghatte Khola, a tributary of the Khare/Khani Khola, in Gaurishankar Gaupalika, Dolakha District. Positioned in the steep terrain of Bagmati Province, the project harnesses a high head system to contribute renewable energy to the national grid via the Singati Substation."
    },
    {
        id: "ded-2",
        title: "Lohore Khola Hydropower Project",
        scope: "Detailed Engineering Design",
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
        title: "Rawa Khola Hydropower Project (6.7 MW)",
        scope: "Detailed Engineering Design",
        location: [27.32, 86.76],
        role: "TAC Hydro Consultancy Pvt. Ltd. provided consulting services for Detailed Engineering Design of the Rawa Khola Hydropower Project (RKHP), developed by Halesi Hydropower Private Limited in Khotang District, eastern Nepal. A contract agreement for the Detailed Engineering Design of the Rawa Khola HPP (6.7 MW), including Hydromechanical and Transmission Line works, was signed on 10th December 2025, which is ongoing.",
        technicalHighlights: {
            "Project Location": "Kepilasgadhi and Aiselukharka Rural Municipalities, Khotang District, Koshi Province",
            "Installed Capacity": "6.7 MW",
            "Design Discharge (Q40)": "7.55 m³/s",
            "Gross Head": "113.5 m",
            "Design Flood": "374.3 m³/s",
            "Diversion Type": "Ogee weir with side intake",
            "Headrace Pipe Length/Diameter": "2840.09m; 2m, 1.9m, 1.8m",
            "Thickness of Headrace Pipe": "8-12mm",
            "Connecting Pipe Length/Diameter": "100m; 1.8m",
            "Thickness of Connecting Pipe": "8mm",
            "Penstock Pipe Length/Diameter": "473.70m; 1.8m, 1.275m",
            "Thickness of Penstock Pipe": "10-12mm",
            "Unit Capacity": "3.454 MW per unit (2 units of Francis turbine)"
        },
        images: ["/downloads/mjlodvw6RB1obD/img/mask-group-4.png", "/downloads/mjlodvw6RB1obD/img/mask-group.png", "/downloads/mjlodvw6RB1obD/img/mask-group-1.png", "/downloads/mjlodvw6RB1obD/img/mask-group-2.png"],
        description: "The Rawa Khola Hydropower Project is a 6.7 MW run-of-the-river (RoR) scheme located in the Khotang District of Koshi Province. The headworks of Rawa Khola are located approximately 150m downstream of the confluence of Lidim Khola and Rawa Khola. The available gross head is about 113.5 m, and the design discharge is 7.55 m3/s, resulting in the installed capacity of 6.7 MW."
    },
    {
        id: "ded-4",
        title: "Upper Piluwa Khola-3 Hydroelectric Project (4.95 MW)",
        scope: "Detailed Engineering Design",
        location: [27.29, 87.41],
        role: "TAC Hydro Consultancy Pvt. Ltd. was appointed by the EPC contractor, Growth/PES JV Pvt. Ltd., to provide critical Design Review and Engineering Support during the construction of both civil and hydromechanical works. Our involvement, which began on March 30, 2021, ensures that the construction adheres to technical specifications and structural integrity standards.",
        technicalHighlights: {
            "Project Location": "Madi and Chainpur Municipalities of Sankhuwasabha District, Province 1",
            "Installed Capacity": "4.95 MW",
            "Design Discharge (Q40)": "5.02 m³/s (Piluwa Khola: 4.11 m³/s & Sikhuwa Khola: 0.91 m³/s)",
            "Gross Head": "128 m",
            "Design Flood": "259 m³/s (1 in 100 years flood)",
            "Diversion Type": "Boulder weir with undersluice, 25 m long",
            "Headrace Pipe Length/Diameter": "1360 m, 1550 mm",
            "Penstock Pipe Length/Diameter": "395m/ 1350 mm",
            "Thickness of Pipe": "8 – 16 mm",
            "Unit Capacity": "2 unit of Horizontal axis Francis turbine"
        },
        images: ["/downloads/mjlodvw6RB1obD/img/mask-group.png", "/downloads/mjlodvw6RB1obD/img/mask-group-3.png", "/downloads/mjlodvw6RB1obD/img/mask-group-2.png", "/downloads/mjlodvw6RB1obD/img/mask-group-4.png"],
        description: "The Upper Piluwa Khola-3 Hydroelectric Project is a 4.95 MW run-of-the-river facility located in the Madi and Chainpur Municipalities of Sankhuwasabha District, Koshi Province. Developed by Mabilung Energy Private Limited (MEPL), the project features a unique dual-river intake system, utilizing water from both the Piluwa and Sikhuwa Khola."
    },
    {
        id: "ded-5",
        title: "Liping Khola Hydropower Project (16.26 MW)",
        scope: "Detailed Engineering Design",
        location: [27.97, 85.95],
        role: "TAC Hydro Consultancy Pvt. Ltd. has been awarded the Detail Engineering Design for the project, supporting the Client in maintaining quality, safety, and compliance throughout the construction phase. The services commenced after contract agreement signed with Him River Power Limited on 10th Baisakh 2078 B.S.",
        technicalHighlights: {
            "Project Location": "Tatopani, Sindhupalchowk district, Bagmati Province",
            "Installed Capacity": "16.26 MW",
            "Design Discharge (Q40)": "2.45 m³/s",
            "Gross Head": "807 m",
            "Design Flood": "146 m³/s",
            "Diversion Type": "Boulder weir with side intake",
            "Tunnel Length/Diameter": "1,267 m, D shape - 2.55 m high x 2.6 m wide",
            "Penstock Pipe Length/Diameter": "1355 m; 1.1, 1.0, 0.9 m",
            "Thickness of Pipe": "8 mm to 24 mm",
            "Unit Capacity": "8.13 MW per unit (2 units of Pelton Turbines)"
        },
        images: ["/downloads/mjlodvw6RB1obD/img/mask-group-1.png", "/downloads/mjlodvw6RB1obD/img/mask-group-2.png", "/downloads/mjlodvw6RB1obD/img/mask-group-4.png", "/downloads/mjlodvw6RB1obD/img/mask-group-3.png"],
        description: "Liping Khola Hydropower Project is a Run-of-River (RoR) scheme developed by Him River Power Limited, located in Sindhupalchowk District, Bagmati Province, Nepal. The project site is accessible via the Araniko National Highway and lies approximately 115 km from Kathmandu. All major components, including the headworks, water conveyance system, and underground powerhouse, are situated on the left bank of Liping Khola."
    },
    {
        id: "ded-6",
        title: "Jagdulla Hydroelectric Project (106.00 MW)",
        scope: "Detailed Engineering Design",
        location: [29.09, 82.59],
        role: "TAC Hydro Consultancy Pvt. Ltd. was commissioned to carry out the Detailed Engineering Design (DED) for the project. In this role, our firm is responsible for the complete technical design of the civil and hydromechanical components, translating the feasibility framework into actionable construction blueprints.",
        technicalHighlights: {
            "Project Location": "Jagdulla Rural Municipality and Mudkechula Rural Municipality, Dolpa District, Karnali Province",
            "Installed Capacity": "106.50 MW",
            "Design Discharge (Q40)": "16.2 m³/s",
            "Gross Head": "789.6 m",
            "Design Flood": "1000 years flood, 1141 m³/s (headworks) and 1703 m³/s (powerhouse)",
            "Diversion Type": "Dam/Barrage type with emergency spillway",
            "Headrace Tunnel Length/Diameter": "6135 m / 3.8 m excavated diameter",
            "Penstock Pipe Length/Diameter": "1406.69 m/ 2.1 m diameter",
            "Thickness of Pipe": "10-48 mm",
            "Unit Capacity": "36 MW"
        },
        images: ["/downloads/mjlodvw6RB1obD/img/mask-group-3.png", "/downloads/mjlodvw6RB1obD/img/mask-group.png", "/downloads/mjlodvw6RB1obD/img/mask-group-4.png", "/downloads/mjlodvw6RB1obD/img/mask-group-2.png"],
        description: "The Jagdulla PRoR Hydroelectric Project (JHEP) is one of the peaking run-of-river schemes in Nepal, designed to provide a six-hour peaking capability during the dry season. It is located in Wards 1, 2, and 3 of Jagdulla Rural Municipality and Ward 4 of Mudkechula Rural Municipality in Dolpa District of Karnali Province."
    },
    {
        id: "ded-7",
        title: "Super Mai Hydropower Project",
        scope: "Detailed Engineering Design",
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
        scope: "Detailed Engineering Design",
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
        scope: "Detailed Engineering Design",
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
    {
        id: "ded-10",
        title: "Kasuwa Khola Hydropower Project (92 MW)",
        scope: "Detailed Engineering Design",
        location: [27.6, 87.3],
        role: "TAC Hydro Consultancy Pvt. Ltd. provided consulting services for the Detailed Engineering Design of the Kasuwa Khola Hydropower Project (KKHP) 45MW, developed by Kasuwa Khola Hydropower Limited in Sankhawasabha District, Eastern Nepal, on 13th Baisakh 2078 B.S. The project study is revised to accommodate the study for 92MW under the Additional Study Agreement.",
        technicalHighlights: {
            "Project Location": "Sankhawasabha",
            "Installed Capacity": "92 MW",
            "Design Discharge (Q42.55)": "20.57 m³/s",
            "Gross Head": "560m",
            "Design Flood": "340 m³/s",
            "Primary Headworks": "Kasuwa Khola (Weir with side intake, orifice intake (10 orifices at the right bank and 4 at d/s of the intake)",
            "Secondary Headworks": "Hiwa Khola (Stone masonry weir with Double trench bottom intake)",
            "Connecting Pipe Length/ Diameter": "463.7m; 1m",
            "Headrace Tunnel Length/Diameter": "3107.2m; (3.4 X 3.7 m for rock class I, II, and III 4.1 x 4.1 m for rock class IV and V)",
            "Surge shaft Type/Diameter": "Simple Surge shaft; 8m",
            "Penstock Pipe Length/Diameter": "Surface; 948.5m; 2.4m",
            "Thickness of Pipe": "14-28mm",
            "Drop Shaft Length/Pipe Diameter": "Circular Concrete infill; 171.175m;2.4m",
            "Inclined Penstock Tunnel Length/Pipe Diameter": "Steel pipe, Inverted D-type; 994.8m;1.95m",
            "Unit Capacity": "31.665 per unit (No. of Units =3; Vertical axis Pelton Turbine)"
        },
        images: ["/downloads/mjlodvw6RB1obD/img/mask-group.png", "/downloads/mjlodvw6RB1obD/img/mask-group-1.png", "/downloads/mjlodvw6RB1obD/img/mask-group-2.png", "/downloads/mjlodvw6RB1obD/img/mask-group-3.png"],
        description: "Kasuwa Khola Hydropower Project is a Peaking Run-of-River (PRoR) type project with a peaking capacity of 1 hour, developed by Kasuwa Khola Hydropower Limited. The project has an installed capacity of 92 MW. The right bank of the Kasuwa Khola comprises nearly all of the headworks’ components, water conveyance system, and the powerhouse of the project."
    },
    {
        id: "ded-11",
        title: "Khani Khola-1 Hydropower Project (40 MW)",
        scope: "Detailed Engineering Design",
        location: [27.81, 86.34],
        role: "TAC Hydro Consultancy Pvt. Ltd. was commissioned by Greenlife Hydropower Ltd. to conduct the Detailed Engineering Design for the 40 MW project. In this capacity, our firm is responsible for preparing Detailed Engineering Design, construction level drawings, reinforcement details including bar bending Schedule that will be good for construction and can be issued to the contractor.",
        technicalHighlights: {
            "Project Location": "Marbu VDC of Dolakha District, Bagmati Province",
            "Installed Capacity": "40 MW",
            "Design Discharge (Q40)": "5.1 m³/s",
            "Gross Head": "963 m",
            "Design Flood": "193 m³/s",
            "Diversion Type": "Broad Crested Concrete Ogee Overflow Weir",
            "Headrace Pipe Length/Diameter": "1900 m length / 2.2 m diameter",
            "Penstock Pipe Length/Diameter": "1470 m length / 1.2 m-1.3 m diameter",
            "Thickness of Pipe": "12 mm to 26 mm",
            "Unit Capacity": "13.75 MW per unit featuring Horizontal Axis Pelton Turbines (Total 3 units)"
        },
        images: ["/downloads/mjlodvw6RB1obD/img/mask-group-4.png", "/downloads/mjlodvw6RB1obD/img/mask-group.png", "/downloads/mjlodvw6RB1obD/img/mask-group-1.png", "/downloads/mjlodvw6RB1obD/img/mask-group-2.png"],
        description: "Khani Khola-1 Hydropower Project is a Run-of-River (RoR) type project with a developed by Greenlife Hydropower Limited. The project has an installed capacity of 40MW. All the structures for 25 MW have been constructed and is in testing phase."
    },
    {
        id: "ded-12",
        title: "Mathillo Inkhu Hydropower Project (24.22 MW)",
        scope: "Detailed Engineering Design",
        location: [27.57, 86.77],
        role: "TAC Hydro Consultancy Pvt. Ltd. was commissioned by the developer Universal Power Company for the works of feasibility study, hydrological analysis, optimization of project capacity, detail topographical survey, location of different component, hydraulic design and detail design of civil, hydromechanical, electromechanical and transmission line components.",
        technicalHighlights: {
            "Project Location": "Dudhkoshika, Mahakulung and Sotang Rural Municipality, Solukhumbu District, Koshi Province",
            "Installed Capacity": "24.79 MW",
            "Design Discharge (Q41)": "7.45 m³/sec",
            "Gross Head": "400 m",
            "Design Flood": "477.14 m³/sec (1 in 100 years)",
            "Diversion Type": "Ogee Shape Weir, 29 m long",
            "Headrace Tunnel Shape/ Length/Diameter": "Inverted-D Shaped Tunnel/ 2950 m/ 2.8 m",
            "Penstock Pipe Length/Diameter": "825 m/ 2.0 m",
            "Thickness of Pipe": "6 mm - 24 mm",
            "Unit Capacity": "Pelton Turbine (Horizontal), 2 units, 12.395 MW"
        },
        images: ["/downloads/mjlodvw6RB1obD/img/mask-group-3.png", "/downloads/mjlodvw6RB1obD/img/mask-group-2.png", "/downloads/mjlodvw6RB1obD/img/mask-group-1.png", "/downloads/mjlodvw6RB1obD/img/mask-group-4.png"],
        description: "The Mathilo Inkhu Hydropower Project (often referred to as Upper Inkhu Khola HEP) is a 24.79 MW run-of-river (RoR) project located in the Solukhumbu district of Koshi Province, Nepal. The project is designed to generate significant annual energy, with development led by Universal Power Company Limited."
    },
    {
        id: "ded-13",
        title: "Tamor-Mewa Hydroelectric Project (128 MW)",
        scope: "Detailed Engineering Design",
        location: [27.36, 87.64],
        role: "The Sanima Hydro and Engineering Pvt. Ltd (SHEPL)-TAC Hydro Consultancy Pvt. Ltd. J.V. was commissioned by SFHECL on October 8th 2024 to conduct the Updated Feasibility Study for the 128 MW project. In this capacity, our firm focused on re-evaluating the hydrological parameters, optimizing the project layout, and verifying the technical and economic viability of the scheme.",
        technicalHighlights: {
            "Project Location": "Phungling Municipality, Meringden RM, Mikwakhola RM, and Athrai Tribeni RM of Taplejung District",
            "Installed Capacity": "128 MW",
            "Design Discharge (Q40)": "95.38 m³/s",
            "Gross Head": "170 m",
            "Design Flood at Headwork": "2899.22 m³/s (1 in 200-years Flood)",
            "Diversion Type": "Concrete diversion weir with side intake",
            "Headrace Pipe Length/Diameter": "1520.21 m / 5.9 m",
            "Headrace Tunnel Type/Length/Diameter": "Modified Horseshoe/ 4939.33 m/ 7.1 m",
            "Penstock Pipe Length/Diameter": "404 m/ 5.5 m",
            "Thickness of Pipe": "22 to 40 mm",
            "Unit Capacity": "4 units of vertical axis Francis turbine"
        },
        images: ["/downloads/mjlodvw6RB1obD/img/mask-group.png", "/downloads/mjlodvw6RB1obD/img/mask-group-2.png", "/downloads/mjlodvw6RB1obD/img/mask-group-4.png", "/downloads/mjlodvw6RB1obD/img/mask-group-1.png"],
        description: "The Tamor-Mewa Hydroelectric Project (TMHEP) is a major 128 MW run-of-the-river hydropower project located in the Taplejung District of Koshi Province, eastern Nepal. The project is being developed by Spark Hydroelectric Company Limited (SHECL) and utilizes the substantial flow of the Tamor River for power generation."
    },
    {
        id: "ded-14",
        title: "Middle Chameliya Hydropower Project (28.304 MW)",
        scope: "Detailed Engineering Design",
        location: [29.73, 80.75],
        role: "TAC Hydro Consultancy Pvt. Ltd. provided consulting services for the preparation of the Detailed Engineering Design of the project. Our firm was responsible for translating the feasibility framework into construction-ready engineering solutions. Our scope included the detailed structural design of the headworks, the hydraulic optimization of the 7,200 m water conveyance system, and the preparation of precise specifications for the hydromechanical and electromechanical components.",
        technicalHighlights: {
            "Project Location": "Lama Bagar, Darchula District",
            "Installed Capacity": "28.304 MW",
            "Design Discharge (Q40)": "25.17 m³/s",
            "Gross Head": "136.26 m",
            "Design Flood": "505.07 m³/s",
            "Diversion Type": "Ogee Shaped type",
            "Headrace Pipe Length/Diameter": "7200m / 3.8 m",
            "Penstock Pipe Length/Diameter": "300m / 3m",
            "Thickness of Pipe": "14 to 16 mm",
            "Unit Capacity": "2 Horizontal Francis turbine with 14.59 MW (each) units."
        },
        images: ["/downloads/mjlodvw6RB1obD/img/mask-group-2.png", "/downloads/mjlodvw6RB1obD/img/mask-group-1.png", "/downloads/mjlodvw6RB1obD/img/mask-group-4.png", "/downloads/mjlodvw6RB1obD/img/mask-group-3.png"],
        description: "Madhya Chameliya Hydropower Project (MCHPP) is a Run-of-the-River (ROR) project proposed with an installed capacity of 28.304 MW. MCHPP is located in the Darchula District, Sudurpaschim Province of Nepal. Water from Chameliya River is diverted to intake by sloping glacis weir and conveyed to gravel trap and then to the settling basin through approach pipe."
    },

    // --- CONSTRUCTION SUPERVISION (4 Projects) ---
    {
        id: "cs-1",
        title: "Upper Piluwa Khola-3 Hydroelectric Project (4.95 MW)",
        scope: "Construction Supervision",
        location: [27.29, 87.41],
        role: "TAC Hydro Consultancy Pvt. Ltd. was appointed by the EPC contractor, Growth/PES JV Pvt. Ltd., to provide critical Design Review and Engineering Support during the construction of both civil and hydromechanical works. Our involvement, which began on March 30, 2021, ensures that the construction adheres to technical specifications and structural integrity standards. We provide real-time engineering solutions for complex project components, including the dual diversion weirs, the 1,360 m headrace pipe, and the Lakhuwa Khola penstock crossing, ensuring the project transitions smoothly from design to operational status.",
        technicalHighlights: {
            "Project Location": "Madi and Chainpur Municipalities of Sankhuwasabha District, Province 1",
            "Installed Capacity": "4.95 MW",
            "Design Discharge (Q40)": "5.02 m³/s (Piluwa Khola: 4.11 m³/s & Sikhuwa Khola: 0.91 m³/s)",
            "Gross Head": "128 m",
            "Design Flood": "259 m³/s (1 in 100 years flood)",
            "Diversion Type": "Boulder weir with undersluice, 25 m long",
            "Headrace Pipe Length/Diameter": "1360 m, 1550 mm",
            "Penstock Pipe Length/Diameter": "395m/ 1350 mm",
            "Thickness of Pipe": "8 – 16 mm",
            "Unit Capacity": "2 unit of Horizontal axis Fransis turbine"
        },
        images: ["/downloads/mjlodvw6RB1obD/img/mask-group-1.png", "/downloads/mjlodvw6RB1obD/img/mask-group-2.png", "/downloads/mjlodvw6RB1obD/img/mask-group-3.png", "/downloads/mjlodvw6RB1obD/img/mask-group-4.png"],
        description: "The Upper Piluwa Khola-3 Hydroelectric Project is a 4.95 MW run-of-the-river facility located in the Madi and Chainpur Municipalities of Sankhuwasabha District, Koshi Province. Developed by Mabilung Energy Private Limited (MEPL), the project features a unique dual-river intake system, utilizing water from both the Piluwa and Sikhuwa Khola."
    },
    {
        id: "cs-2",
        title: "Liping Khola Hydropower Project (16.26 MW)",
        scope: "Construction Supervision",
        location: [27.97, 85.95],
        role: "As per the scope of consulting services, TAC carries out inspection, measurement, and quality control of all civil construction works to ensure compliance with the approved drawings and specifications. In addition, daily discussions and meetings are held to review progress, set daily targets, and address site constraints. Based on site observations and progress review, TAC provides practical suggestions and recommendations to improve the speed and efficiency of construction works, with the objective of achieving the project milestones within the scheduled time.",
        technicalHighlights: {
            "Project Location": "Tatopani, Sindhupalchowk district, Bagmati Province",
            "Capacity": "16.26 MW",
            "Design Discharge (Q40)": "2.45 m3/s",
            "Gross Head": "807 m",
            "Design Flood": "146 m3/s",
            "Diversion Type": "Boulder weir with side intake",
            "Tunnel Length/Diameter": "1,267 m, D shape - 2.55 m high x 2.6 m wide",
            "Penstock Pipe Length/Diameter": "1355 m; 1.1, 1.0, 0.9 m",
            "Thickness of Pipe": "8 mm to 24 mm",
            "Unit Capacity": "8.13 MW per unit (2 units of Pelton Turbines)"
        },
        images: ["/downloads/mjlodvw6RB1obD/img/mask-group.png", "/downloads/mjlodvw6RB1obD/img/mask-group-1.png", "/downloads/mjlodvw6RB1obD/img/mask-group-2.png", "/downloads/mjlodvw6RB1obD/img/mask-group-3.png"],
        description: "Liping Khola Hydropower Project is a Run-of-River (RoR) scheme developed by Him River Power Limited, located in Sindhupalchowk District, Bagmati Province, Nepal. All major components, including the headworks, water conveyance system, and underground powerhouse, are situated on the left bank of Liping Khola."
    },
    {
        id: "cs-3",
        title: "Ghatte Khola Small Hydropower Project (5.00 MW)",
        scope: "Construction Supervision",
        location: [27.78, 86.30],
        role: "TAC Hydro Consultancy Pvt. Ltd. was commissioned by Manakamana Engineering Hydropower Pvt. Ltd. to provide Construction Supervision and Quality Control for the project. In this role, our firm was responsible to provide on-site consulting services to supervise construction activities and managed technical coordination from our Kathmandu office to ensure the project met its commercial and engineering requirements.",
        technicalHighlights: {
            "Project Location": "Gaurishankar Gaupalika (Marbu), Dolakha District, Bagmati Province",
            "Installed Capacity": "5.00 MW",
            "Design Discharge (Q40)": "1.78 m3/s",
            "Gross Head": "328 m",
            "Design Flood": "90.70 m3/s",
            "Diversion Type": "Side orifice intake with boulder riprap weir",
            "Headrace Pipe Length/Diameter": "2,129.25 m length / 1.2 m diameter",
            "Penstock Pipe Length/Diameter": "1,022.25 m length / 0.9 m diameter",
            "Thickness of Pipe": "8 mm to 20 mm",
            "Unit Capacity": "2.5 MW per unit (2 units of Pelton Turbines)"
        },
        images: ["/downloads/mjlodvw6RB1obD/img/mask-group-2.png", "/downloads/mjlodvw6RB1obD/img/mask-group.png", "/downloads/mjlodvw6RB1obD/img/mask-group-3.png", "/downloads/mjlodvw6RB1obD/img/mask-group-1.png"],
        description: "The Ghatte Khola Small Hydropower Project is a 5 MW run-of-the-river facility located on the Ghatte Khola, a tributary of the Khare/Khani Khola, in Gaurishankar Gaupalika, Dolakha District. Positioned in the steep terrain of Bagmati Province, the project harrnesses a high head system to contribute renewable energy to the national grid via the Singati Substation."
    },
    {
        id: "cs-4",
        title: "Middle Modi Hydropower Project",
        scope: "Construction Supervision",
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
        scope: "Due Diligence Appraisal",
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
        title: "Nupche Likhu Hydropower Project (57.50 MW)",
        scope: "Due Diligence Appraisal",
        location: [27.69, 86.46],
        role: "TAC Hydro Consultancy Pvt. Ltd. is responsible for conducting due diligence Study on behalf of Equity Investor Avasar Equity Diversified fund which includes evaluating, verifying, and de-risking hydroelectric projects for investors as well as review technical, financial, environmental, and legal aspects to ensure the project's feasibility, safety, and profitability.",
        technicalHighlights: {
            "Project Location": "Umakunda Rural Municipality, Ramechhap District, Bagmati Province (Province No. 3), Nepal",
            "Installed Capacity": "57.50 MW",
            "Design Discharge (Q45)": "7.11 m³/s (Nupche=3.89 m3/s & Likhu =3.22m3/s)",
            "Gross Head": "1003.50 m (Intake at 3337 masl; Powerhouse at 2334.50 masl)",
            "Design Flood": "76 m³/s (At Nupche Hedworks) / 63 m³/s (At Likhu Hedworks)",
            "Diversion Type": "Boulder lined weir with side intakes (at both Nupche and Likhu Headworks)",
            "Headrace Tunnel": "Nupche Inlet portal to Junction: 1677.32 m; Likhu Inlet portal to Junction: 1435.95 m; Outlet Inlet portal to Junction: 3204.76 m; Adit Tunnel Length: 362.39 m",
            "Headrace Pipe Length/Diameter": "Likhu Headrace Pipe: 940.00 m, 1.60 m ; Nupche Headrace pipe: 275 m, 1.60 m",
            "Penstock Pipe Length/Diameter": "2422.50 m, 1.25 to 0.72 m",
            "Thickness of Pipe": "8mm to 56mm, 10mm",
            "Unit Capacity": "3 units of horizontal axis Pelton turbines"
        },
        images: ["/downloads/mjlodvw6RB1obD/img/mask-group-3.png", "/downloads/mjlodvw6RB1obD/img/mask-group-4.png", "/downloads/mjlodvw6RB1obD/img/mask-group.png", "/downloads/mjlodvw6RB1obD/img/mask-group-1.png"],
        description: "Nupche Likhu Hydropower Project (NLHPP), developed by Vision Energy & Power Ltd., is a run-of-river hydropower project located in Ramechhap District, Bagmati Province (Province No. 3), Nepal. The project is situated within Umakunda Rural Municipality, where both the intake and powerhouse sites are located. The project is designed with multiple headworks to capture flows from both the Nupche and Likhu rivers. The source of water for the Nupche Likhu Hydropower Project originates from snow-fed rivers in the high mountain and hilly regions. The project is one of the highest head hydropower projects currently under construction in Nepal."
    },
    {
        id: "dd-3",
        title: "Lower Erkhuwa Hydropower Project (14.15 MW)",
        scope: "Due Diligence Appraisal",
        location: [27.42, 87.11],
        role: "TAC Hydro Consultancy Pvt. Ltd. is responsible for conducting due diligence Study on behalf of lenders consortium (lead bank: Machhapuchchhre Bank Ltd) which includes evaluating, verifying, and de-risking hydroelectric projects for lenders as well as review technical, financial, environmental, and legal aspects to ensure the project's feasibility, safety, and profitability.",
        technicalHighlights: {
            "Project Location": "Khadananda Municipality and Shalpa Silicho Rural Municipality, Bhojpur District, Koshi Province",
            "Installed Capacity": "14.15 MW",
            "Design Discharge (Q40)": "11.20 m³/s",
            "Gross Head": "150.63 m",
            "Design Flood": "218.28 m³/s",
            "Diversion Type": "Ogee Shaped, Overflow Type",
            "Headrace Tunnel": "2,524.95 m",
            "Penstock Pipe Length/Diameter": "595 m, 2.2 m",
            "Thickness of Pipe": "10 mm to 16 mm",
            "Unit Capacity": "7.294 MW per Unit (2 units of Horizontal-axis Francis turbines)"
        },
        images: ["/downloads/mjlodvw6RB1obD/img/mask-group-1.png", "/downloads/mjlodvw6RB1obD/img/mask-group-3.png", "/downloads/mjlodvw6RB1obD/img/mask-group-2.png", "/downloads/mjlodvw6RB1obD/img/mask-group-4.png"],
        description: "Lower Erkhuwa Hydropower Project (LEHPP) developed by Lower Erkhuwa Hydropower Company Pvt. Ltd. is a run-of-the-river (RoR) hydropower scheme with an installed capacity of 14.15 MW and an average annual energy generation of 79.79 GWh, comprising 12.68 GWh dry season energy and 67.11 GWh wet season energy in Khadananda Municipality and Shalpa Silicho Rural Municipality, Bhojpur District, Koshi Province, Nepal, utilizing the Erkhuwa Khola. The intake located in Khadananda Municipality and Shalpa Silicho, and the powerhouse in Khadananda Municipality."
    },
    {
        id: "dd-4",
        title: "Midim-1 Hydropower Project (13.424 MW)",
        scope: "Due Diligence Appraisal",
        location: [28.25, 84.27],
        role: "TAC Hydro Consultancy Pvt. Ltd. had signed an agreement with the client Mount Rasuwa Hydropower Pvt. Ltd (MRHPL) for the Due Diligence study of this project with the client on 27th June, 2025. The firm is responsible for evaluating, verifying, and de-risking hydroelectric projects for investors, lenders, and developers as well as review technical, financial, environmental, and legal aspects to ensure the project's feasibility, safety, and profitability.",
        technicalHighlights: {
            "Project Location": "Kholasothar and Marsyangdi Rural Municipality, Lamjung District, Gandaki Province",
            "Installed Capacity": "13.424 MW",
            "Design Discharge (Q42)": "4.64 m³/s",
            "Gross Head": "347 m",
            "Design Flood": "251 m³/s (1 in 100 yr Flood)",
            "Diversion Type": "Boulder lined weir",
            "Headrace Pipe Length/Diameter": "4866 m, 1.75 m (internal diameter)",
            "Penstock Pipe Length/Diameter": "920 m + 28 m (bifurcation), 1.4 m (internal diameter)",
            "Unit Capacity": "6.92 MW per unit (2 units of Vertical-axis Pelton turbines)"
        },
        images: ["/downloads/mjlodvw6RB1obD/img/mask-group.png", "/downloads/mjlodvw6RB1obD/img/mask-group-2.png", "/downloads/mjlodvw6RB1obD/img/mask-group-4.png", "/downloads/mjlodvw6RB1obD/img/mask-group-1.png"],
        description: "The Midim-1 Hydropower Project of installed capacity 13,424 kW, is being constructed by Mount Rasuwa Hydropower Pvt. Ltd. as a run-of-river scheme in Lamjung District in Gandaki province. The project utilizes the stream of Midim Khola which is a tributary of Marsyangdi River. The headworks of Midim 1 hydropower project is located at 50 m U/S from the confluence of Midim Khola and Tiju Khola. There is side intake with orifice and trashrack to control entry of debris, followed by gravel trap and desander at the left bank of Midim Khola."
    },
    {
        id: "dd-5",
        title: "Upper Tadi Khola Hydropower Project (11.00 MW)",
        scope: "Due Diligence Appraisal",
        location: [27.98, 85.42],
        role: "TAC Hydro Consultancy Pvt. Ltd. is responsible for conducting due diligence Study on behalf of lenders consortium (lead bank: Kumari Bank Ltd) which includes evaluating, verifying, and de-risking hydroelectric projects for lenders as well as review technical, financial, environmental, and legal aspects to ensure the project's feasibility, safety, and profitability.",
        technicalHighlights: {
            "Project Location": "Ghyangphedi, Dupcheshwor Rural Municipality, Nuwakot District",
            "Installed Capacity": "11.00 MW",
            "Design Discharge (Q40)": "6.3 m³/s",
            "Gross Head": "216.8 m",
            "Design Flood": "207 m³/s (1 in 100 year)",
            "Diversion Type": "Boulder Riprap weir",
            "Penstock Pipe Length/Diameter": "2459.46 m, 1.8, 1.70, 1.60 and 1.14 m",
            "Unit Capacity": "2 units of Vertical shaft Pelton turbines"
        },
        images: ["/downloads/mjlodvw6RB1obD/img/mask-group-2.png", "/downloads/mjlodvw6RB1obD/img/mask-group-1.png", "/downloads/mjlodvw6RB1obD/img/mask-group-3.png", "/downloads/mjlodvw6RB1obD/img/mask-group.png"],
        description: "The Upper Tadi Khola Hydroelectric Project of installed capacity 11 MW, is being constructed by Suryakunda Hydro Electric Limited. The Project location is in Nuwakot District of Bagmati province. The project utilizes the stream of Tadi khola, which is a tributary of Trishuli River. A 25 m long boulder riprap weir having one bay of under sluice is provided to divert the flow. The Intake, gravel trap, settling basin, and forebay are proposed along the right bank of the river."
    },
    {
        id: "dd-6",
        title: "Madhya Super Daraudi Hydropower Project (10.00 MW)",
        scope: "Due Diligence Appraisal",
        location: [28.22, 84.73],
        role: "TAC Hydro Consultancy Pvt. Ltd. is responsible for conducting due diligence Study on behalf of lenders consortium (lead bank: Prime Commercial Bank Ltd) which includes evaluating, verifying, and de-risking hydroelectric projects for lenders as well as review technical, financial, environmental, and legal aspects to ensure the project's feasibility, safety, and profitability.",
        technicalHighlights: {
            "Project Location": "Ajirkot & Sulikot Rural Municipality, Gorkha District, Gandaki Province",
            "Installed Capacity": "10.00 MW",
            "Design Discharge (Q40)": "5.09 m3/s",
            "Gross Head": "249.5m",
            "Design Flood": "519 m3/s",
            "Diversion Type": "Ogee-Shaped Weir, Concrete",
            "Headrace Pipe Length/Diameter": "1746 m/1.7m",
            "Penstock Pipe Length/Diameter": "2425 m/ 1.6 m",
            "Thickness of Pipe": "8, 10, 14, 18, 20, 22, 26",
            "Unit Capacity": "5 MW per unit (2 units of Horizontal axis Francis turbine)"
        },
        images: ["/downloads/mjlodvw6RB1obD/img/mask-group-4.png", "/downloads/mjlodvw6RB1obD/img/mask-group.png", "/downloads/mjlodvw6RB1obD/img/mask-group-2.png", "/downloads/mjlodvw6RB1obD/img/mask-group-1.png"],
        description: "The Madhya Super Daraudi Hydropower Project (10 MW) is a Run-of-River (RoR) scheme located in the Gorkha district (Ajirkot and Barpak Sulikot Rural Municipalities) of Gandaki Province, Nepal. Developed by Barpak Daraudi Hydropower Private Limited (BDHPL), the project utilizes the water resources of the Daraudi River to generate clean energy for the national grid."
    },
    {
        id: "dd-7",
        title: "Tadi Ghyangphedi Hydropower Project (8.00 MW)",
        scope: "Due Diligence Appraisal",
        location: [27.99, 85.45],
        role: "The Due Diligence Study was signed on 2025/03/28 as a tripartite agreement between Tadi Ghyangphedi Hydropower Project, Siddhartha Bank Limited, and TAC Hydro Consultancy Pvt. Ltd. as the Technical Consultant. Our role included the verification of technical feasibility, financial viability, and socio-environmental acceptability of the project facilitating Siddhartha Bank Limited to decide the technical and financial criteria, and whether the project is worth the investment.",
        technicalHighlights: {
            "Project Location": "Dupcheswor Rural Municipality, Nuwakot, Bagmati",
            "Installed Capacity": "8 MW",
            "Design Discharge": "Q43.6; 2.21 m3/s",
            "Gross Head": "446.0 m",
            "Design Flood": "246 m3/s at intake and 313 m3/s at powerhouse",
            "Diversion Type": "Broad Crested boulder weir at crest level 1990 masl of length 22 m and height 3 m",
            "Headrace Pipe Length/Diameter": "2281.36 m/ 1.2 m, 1.1 m & 1.0 m",
            "Penstock Pipe Length/Diameter": "1632.08 m up to bifurcation/ 1.0 m, 0.9 m & 0.8 m",
            "Thickness of Pipe": "8 mm to 14 mm at headrace and 14 mm to 20 mm at penstock",
            "Unit Capacity": "2 units of 4 MW each"
        },
        images: ["/downloads/mjlodvw6RB1obD/img/mask-group-3.png", "/downloads/mjlodvw6RB1obD/img/mask-group-4.png", "/downloads/mjlodvw6RB1obD/img/mask-group.png", "/downloads/mjlodvw6RB1obD/img/mask-group-2.png"],
        description: "The Tadi Ghyangphedi Hydropower Project is an 8 MW run-of-the-river (RoR) development located in the Nuwakot District of Bagmati Province. Developed by ABP Energy Pvt. Ltd., the project utilizes a high-head layout to capture the flow of the Tadi River at an elevation of 1,990 masl. With a substantial gross head of 446 m and a design discharge of 2.21 m3/s, the project is set to generate 48.746 GWh of energy annually."
    },
    {
        id: "dd-8",
        title: "Jurimba khola Small Hydropower Project (7.63 MW)",
        scope: "Due Diligence Appraisal",
        location: [27.91, 85.9],
        role: "TAC Hydro Consultancy Pvt. Ltd. had signed an agreement with Jurimba Hydropower Company Pvt. Ltd. for the Due Diligence study of this project with the client on 27th October, 2024.",
        technicalHighlights: {
            "Project Location": "Sindhupalchowk district, Bagmati Province, Nepal",
            "Installed Capacity": "7.63 MW",
            "Design Discharge (Q40)": "1.06 m3/s",
            "Gross Head": "870.28 m",
            "Design Flood": "64 m3/s",
            "Diversion Type": "Boulder weir, 25 m length",
            "Headrace Pipe Length/Diameter": "1445 m/ 0.95 m",
            "Penstock Pipe Length/Diameter": "0.8m",
            "Thickness of Pipe": "8 mm to 30 mm",
            "Unit Capacity": "2 unit of horizontal axis Pelton turbine"
        },
        images: ["/downloads/mjlodvw6RB1obD/img/mask-group-1.png", "/downloads/mjlodvw6RB1obD/img/mask-group-2.png", "/downloads/mjlodvw6RB1obD/img/mask-group-4.png", "/downloads/mjlodvw6RB1obD/img/mask-group-3.png"],
        description: "Jurimba Khola Small Hydropower Project developed by Jurimba Hydropower Company Pvt. Ltd. (JHCPL) is a Peaking Run-of-River (PROR) type project in Sindhupalchowk district, Bagmati Province, Nepal. The powerhouse is in the right bank of Bhotekoshi River and just upstream from confluence of Bhotekhosi River and Jurimba Khola."
    },
    {
        id: "dd-9",
        title: "Upper Piluwa Hills Small Hydropower",
        scope: "Due Diligence Appraisal",
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
        scope: "Due Diligence Appraisal",
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
    },
    {
        id: "dd-11",
        title: "Thuligad Khola Hydroelectric Project (17.00 MW)",
        scope: "Due Diligence Appraisal",
        location: [28.95, 80.82],
        role: "TAC Hydro Consultancy Pvt. Ltd. was commissioned to carry out the Due Diligence Study (DDS) for the project. In this role, our firm is responsible for the supervision of the technical and financial feasibility of the project as a technical consultant.",
        technicalHighlights: {
            "Project Location": "Badikedar rural municipality, Doti District, Sudurpachim Province",
            "Installed Capacity": "17 MW",
            "Design Discharge (Q40)": "12.65 m3 /s",
            "Gross Head": "173.50m",
            "Design Flood": "2417.70 m3 /s at 200 years return period at Headworks",
            "Diversion Type": "Overflow Cum Gated Barrage",
            "Headrace Tunnel Length/Size": "2191.66m(3m X 3m)",
            "Penstock Pipe Length/Diameter": "2531m / 2.4m",
            "Thickness of Pipe": "8mm to 24mm",
            "Unit Capacity": "8.5 MW"
        },
        images: ["/downloads/mjlodvw6RB1obD/img/mask-group.png", "/downloads/mjlodvw6RB1obD/img/mask-group-2.png", "/downloads/mjlodvw6RB1obD/img/mask-group-4.png", "/downloads/mjlodvw6RB1obD/img/mask-group-1.png"],
        description: "The Thuligad Khola Hydroelectric Project (TKHEP) is the peaking run-of-river schemes, designed to provide a four-hour peaking capacity during the dry season. It is located in Badikedar rural municipality in Doti district of Sudurpaschim province of Nepal."
    },
    // --- PROGRESS MONITORING AND BILL VETTING (11 Projects) ---
    {
        id: "pm-1",
        title: "Bhotekoshi-1 Hydropower Project (44.00 MW)",
        scope: "Progress Monitoring and Bill Vetting",
        location: [27.89, 85.91],
        role: "TAC Hydro Consultancy Pvt. Ltd., as the Technical Consultant, has been engaged under a tripartite contract among Electro Power Company Ltd. and Nepal Infrastructure Bank Ltd. (Lead Bank) to provide technical consulting services, progress monitoring, and bill verification for the successful completion of the project.",
        technicalHighlights: {
            "Project Location": "Sindhupalchowk District, Bhotekoshi Rural Municipality",
            "Installed Capacity": "44.00 MW",
            "Design Discharge": "49.12 m³/s",
            "Gross Head": "116.50 m",
            "Design Flood": "1372.00 m³/s",
            "Diversion Type": "Barrage-type weir",
            "Headrace Tunnel": "2675.00 m",
            "Penstock Pipe Length/Diameter": "283.56 m / 2.5 to 3.6 m",
            "Thickness of Pipe": "12 mm to 28 mm",
            "Unit Capacity": "22.68 MW per Unit (2 units of vertical axis Francis turbines)"
        },
        images: ["/downloads/mjlodvw6RB1obD/img/mask-group.png", "/downloads/mjlodvw6RB1obD/img/mask-group-1.png", "/downloads/mjlodvw6RB1obD/img/mask-group-2.png", "/downloads/mjlodvw6RB1obD/img/mask-group-3.png"],
        description: "Electro Power Company Ltd. is developing the Bhotekoshi-1 Hydropower Project (BK1HPP), a run-of-river hydropower project located in Chaku and Hindi Bazaar of Bhotekoshi Rural Municipality, Sindhupalchowk District, Bagmati Province, Nepal, utilizing the flow of the Bhotekoshi River. The facility utilizes a medium-head configuration to drive two vertical-axis Francis turbines units."
    },
    {
        id: "pm-2",
        title: "Dordi-1 HYDROELECTRIC PROJECT (12 MW)",
        scope: "Progress Monitoring and Bill Vetting",
        location: [28.24, 84.45],
        role: "TAC Hydro Engineers Pvt. Ltd., as the Technical Consultant, has been engaged under a tripartite agreement among Dordi Khola Jal Bidyut Co. Ltd. and Sanima bank limited. (Lead Bank) to provide technical consulting services, progress monitoring, and bill certification for the successful completion of the project.",
        technicalHighlights: {
            "Project Location": "Dordi Gaupalika, Lamjung District, Gandaki Province",
            "Installed Capacity": "12.00 MW",
            "Design Discharge": "11.36 m³/s",
            "Gross Head": "132 m",
            "Design Flood": "490 m³/s",
            "Diversion Type": "Free Flow Concrete Weir",
            "Headrace Tunnel Length/Diameter": "2550 m / 3.2 m",
            "Penstock Pipe Length/Diameter": "675 m / 2.1 m",
            "Thickness of Pipe": "6 mm to 16 mm",
            "Unit Capacity": "6.8 MW per Unit (2 Units of Horizontal axis Francis turbine)"
        },
        images: ["/downloads/mjlodvw6RB1obD/img/mask-group-4.png", "/downloads/mjlodvw6RB1obD/img/mask-group.png", "/downloads/mjlodvw6RB1obD/img/mask-group-1.png", "/downloads/mjlodvw6RB1obD/img/mask-group-2.png"],
        description: "Dordi-1 Hydroelectric Project of installed capacity 12,000 kW, is being constructed by Dordi Khola Jal Bidyut Co. Ltd. a subsidiary company of CEDB Hydro Fund Ltd. Site of this project lies in Lamjung District. This is a run-off-river scheme with conventional side intake on the left bank of Dordi Rural Municipality."
    },
    {
        id: "pm-3",
        title: "Karuwa Seti Hydropower Project (32.00 MW)",
        scope: "Progress Monitoring and Bill Vetting",
        location: [28.38, 83.97],
        role: "TAC Hydro Engineers Pvt. Ltd., as the Technical Consultant, has been engaged under a tripartite contract among Jhyamolongma Hydropower Company Ltd., Nepal Infrastructure Bank Ltd. (Lead Bank), and TAC to provide technical consulting services, progress monitoring, and bill verification for the project.",
        technicalHighlights: {
            "Project Location": "Kaski District, Gandaki Province",
            "Installed Capacity": "32.00 MW",
            "Design Discharge": "15.3 m³/s",
            "Gross Head": "248.45 m",
            "Design Flood": "709.86 m³/s",
            "Diversion Type": "Concrete Gravity Weir",
            "Headrace Tunnel": "2293.00 m",
            "Penstock Pipe Length/Diameter": "2250 m / 3.0 m",
            "Thickness of Pipe": "10 mm to 30 mm",
            "Unit Capacity": "3 units of Horizontal-axis Francis turbines"
        },
        images: ["/downloads/mjlodvw6RB1obD/img/mask-group-2.png", "/downloads/mjlodvw6RB1obD/img/mask-group-3.png", "/downloads/mjlodvw6RB1obD/img/mask-group-4.png", "/downloads/mjlodvw6RB1obD/img/mask-group.png"],
        description: "Jhyamolongma Hydropower Company Ltd. is developing the Karuwa Seti Hydropower Project (KSHP), a run-of-river hydropower project located in Kaski District, utilizing the flow of the Seti Khola. The facility utilizes a high-head configuration to drive three Horizontal-axis Francis turbines units."
    },
    {
        id: "pm-4",
        title: "Super Lower Bagmati Hydropower Project (41.314 MW)",
        scope: "Progress Monitoring and Bill Vetting",
        location: [27.37, 85.42],
        role: "TAC Hydro Consultancy Pvt. Ltd., as the Technical Consultant, has been engaged under a tripartite contract between Super Bagmati Hydropower Limited, Laxmi Sunrise Bank Limited (Lead Bank) to provide technical consulting services, progress monitoring and bill verification for the successful completion of the project.",
        technicalHighlights: {
            "Project Location": "Huchitar and Bageri Villages, Bagmati RM, Ward No. 7 & 9",
            "Installed Capacity": "41.314 MW",
            "Design Discharge": "24.12 m³/s",
            "Gross Head": "206.20 m",
            "Design Flood": "2296.00 m³/s",
            "Diversion Type": "Ogee profiled with Side Intake",
            "Headrace Tunnel": "6587.50 m",
            "Siphon Length/Diameter": "125.00 m / 3.5 m",
            "Penstock Pipe Length/Diameter": "1005 m / 2.8 m",
            "Unit Capacity": "14.35 MW per Unit (3 units of vertical-axis Francis turbines)"
        },
        images: ["/downloads/mjlodvw6RB1obD/img/mask-group-1.png", "/downloads/mjlodvw6RB1obD/img/mask-group-2.png", "/downloads/mjlodvw6RB1obD/img/mask-group.png", "/downloads/mjlodvw6RB1obD/img/mask-group-3.png"],
        description: "Super Bagmati Hydropower Limited is developing the Super Lower Bagmati Hydropower Project (SLBHPP), a run-of-river hydropower project located in Makwanpur, Lalitpur, Kavre, and Sindhuli districts. The facility utilizes a high-head configuration to drive three vertical-axis Francis turbines units."
    },
    {
        id: "pm-5",
        title: "TALLO KHARE KHOLA HYDROPOWER PROJECT (11 MW)",
        scope: "Progress Monitoring and Bill Vetting",
        location: [27.75, 86.21],
        role: "TAC Hydro Engineers Pvt. Ltd., as the Technical Consultant, has been engaged under a tripartite contract among Universal Power Company Limited. and Bank of Kathmandu Lumbini Limited. (Lead Bank) to provide technical consulting services, progress monitoring, and bill verification for the successful completion of the project.",
        technicalHighlights: {
            "Project Location": "Janakpur/Dolakha District",
            "Installed Capacity": "11 MW",
            "Design Discharge": "14.74 m³/s",
            "Gross Head": "136.70 m",
            "Design Flood": "290 m³/s",
            "Diversion Type": "Hard Stone Lined Gravity Free Flow Weir",
            "Headrace Pipe Length/Diameter": "5149.85 m / 2.5 m to 2.4 m",
            "Penstock Pipe Length/Diameter": "273 m / 1.7 to 2.3 m",
            "Thickness of Pipe": "8mm to 25 mm",
            "Unit Capacity": "5.8 MW per Unit (2 Units of Horizontal axis Francis turbine)"
        },
        images: ["/downloads/mjlodvw6RB1obD/img/mask-group-3.png", "/downloads/mjlodvw6RB1obD/img/mask-group-4.png", "/downloads/mjlodvw6RB1obD/img/mask-group.png", "/downloads/mjlodvw6RB1obD/img/mask-group-1.png"],
        description: "Tallo Khare Khola Hydropower Project is being constructed by Universal Power Company Limited. Site of this project lies in Dolakha District. The project utilizes the stream of Khare Khola which is a tributary of Tamakoshi River."
    },
    {
        id: "pm-6",
        title: "Upper Chameliya Hydropower Project (40MW)",
        scope: "Progress Monitoring and Bill Vetting",
        location: [29.74, 80.78],
        role: "TAC Hydro Consultancy Pvt. Ltd., as the Technical Consultant, has been engaged under a tripartite contract among Api Power Company Ltd. and Himalayan Bank Limited. (Lead Bank) to provide technical consulting services, progress monitoring, and bill verification for the successful completion of the project.",
        technicalHighlights: {
            "Project Location": "Api Himal Rural Municipality, Darchula District",
            "Installed Capacity": "40.00 MW",
            "Design Discharge": "23.47 m³/s",
            "Gross Head": "204.80 m",
            "Design Flood": "626 m³/s",
            "Diversion Type": "Overflow Type",
            "Headrace Pipe Length/Diameter": "5719m / 3.2m",
            "Penstock Pipe Length/Diameter": "832m / 2.26 to 3.2 m",
            "Thickness of Pipe": "25 mm to 32 mm",
            "Unit Capacity": "3 Units of Horizontal Axis Francis turbine"
        },
        images: ["/downloads/mjlodvw6RB1obD/img/mask-group.png", "/downloads/mjlodvw6RB1obD/img/mask-group-2.png", "/downloads/mjlodvw6RB1obD/img/mask-group-1.png", "/downloads/mjlodvw6RB1obD/img/mask-group-3.png"],
        description: "Upper Chameliya Hydropower Project (40MW) is being constructed by API Power Company Ltd. in Darchula district of Sudur Paschim Province, Nepal. The project site is located on Chameliya River which is a tributary of Mahakali River."
    },
    {
        id: "pm-7",
        title: "UPPER MARDI KHOLA HYDROPOWER PROJECT (7 MW)",
        scope: "Progress Monitoring and Bill Vetting",
        location: [28.39, 83.90],
        role: "TAC Hydro Engineers Pvt. Ltd., as the Technical Consultant, has been engaged under a tripartite agreement among United Idi Mardi & RB Hydropower Pvt. Ltd. and Prime Commercial Bank Ltd. (Lead Bank) to provide technical consulting services, progress monitoring, and bill verification for the successful completion of the project.",
        technicalHighlights: {
            "Project Location": "Pokhara, Kaski District, Gandaki Province",
            "Installed Capacity": "7 MW",
            "Design Discharge": "2.63 m³/s",
            "Gross Head": "335 m",
            "Design Flood": "159.00 m³/s",
            "Diversion Type": "Ogee shaped weir",
            "Penstock Pipe Length/Diameter": "3700m / 1.2m",
            "Thickness of Pipe": "6mm to 22mm",
            "Unit Capacity": "3.7 MW per Unit (2 Units of Pelton turbine)"
        },
        images: ["/downloads/mjlodvw6RB1obD/img/mask-group-4.png", "/downloads/mjlodvw6RB1obD/img/mask-group.png", "/downloads/mjlodvw6RB1obD/img/mask-group-3.png", "/downloads/mjlodvw6RB1obD/img/mask-group-2.png"],
        description: "Upper Mardi Khola Hydropower Project is constructed by United Idi Mardi & RB Hydropower Pvt. Ltd. at the upstream of existing Mardi Khola HPP in Kaski District. The project utilizes the stream of Mardi Khola which is a tributary of Seti River."
    },
    {
        id: "pm-8",
        title: "Upper Seti Hydropower Project (20.00 MW)",
        scope: "Progress Monitoring and Bill Vetting",
        location: [28.41, 83.99],
        role: "TAC Hydro Consultancy Pvt. Ltd., as the Technical Consultant, has been engaged under a tripartite contract among Upper Seti Hydropower Pvt. Ltd., Laxmi Sunrise Bank Ltd. (Lead Bank), to provide technical consulting services, progress monitoring, and bill verification for the successful completion of the project.",
        technicalHighlights: {
            "Project Location": "Machhapuchchhre Rural Municipality, Kaski District",
            "Installed Capacity": "20.00 MW",
            "Design Discharge": "13.00 m³/s",
            "Gross Head": "186.44 m",
            "Design Flood": "510 m³/s",
            "Diversion Type": "Ogee Shaped Concrete Weir",
            "Headrace Tunnel/Size": "2237.70 m / 3.1 m and 3.0 m",
            "Headrace Pipe Length/Diameter": "77 m / 2.3 m",
            "Penstock Pipe Length/Diameter": "505.70 m / 230 m",
            "Thickness of Pipe": "8mm to 28 mm",
            "Unit Capacity": "3 units of Horizontal-axis Francis turbines"
        },
        images: ["/downloads/mjlodvw6RB1obD/img/mask-group-1.png", "/downloads/mjlodvw6RB1obD/img/mask-group-2.png", "/downloads/mjlodvw6RB1obD/img/mask-group-4.png", "/downloads/mjlodvw6RB1obD/img/mask-group-3.png"],
        description: "Upper Seti Hydropower Pvt. Ltd. is developing the Upper Seti Hydropower Project (USHPP), a run-of-river hydropower project located in Kaski District, utilizing the flow of the Seti River along with the water from the sadhu khola."
    },
    {
        id: "pm-9",
        title: "Lower Erkhuwa Hydropower Project (14.15 MW)",
        scope: "Progress Monitoring and Bill Vetting",
        location: [27.41, 87.11],
        role: "TAC Hydro Consultancy Pvt. Ltd., as the Technical Consultant, has been engaged under a tripartite contract among Lower Erkhuwa Hydropower Company Pvt. Ltd. and Machhapuchre Bank Ltd. (Lead Bank) to provide technical consulting services, progress monitoring, and bill verification for the successful completion of the project.",
        technicalHighlights: {
            "Project Location": "Bhojpur District, Koshi Province",
            "Installed Capacity": "14.15 MW",
            "Design Discharge": "11.20 m³/s",
            "Gross Head": "150.63 m",
            "Design Flood": "218.28 m³/s",
            "Diversion Type": "Ogee Shaped, Overflow Type",
            "Headrace Tunnel": "2,525 m",
            "Penstock Pipe Length/Diameter": "595 m / 2.2 m",
            "Thickness of Pipe": "10 mm to 16 mm",
            "Unit Capacity": "7.294 MW per Unit (2 units of Horizontal-axis Francis turbines)"
        },
        images: ["/downloads/mjlodvw6RB1obD/img/mask-group-3.png", "/downloads/mjlodvw6RB1obD/img/mask-group-4.png", "/downloads/mjlodvw6RB1obD/img/mask-group.png", "/downloads/mjlodvw6RB1obD/img/mask-group-2.png"],
        description: "Lower Erkhuwa Hydropower Project (LEHPP) is a run-of-the-river hydropower scheme with an installed capacity of 14.15 MW in Bhojpur District, Koshi Province, Nepal, utilizing the Erkhuwa Khola."
    },
    {
        id: "pm-10",
        title: "Nupche Likhu Hydropower Project (57.50 MW)",
        scope: "Progress Monitoring and Bill Vetting",
        location: [27.7, 86.47],
        role: "TAC Hydro Consultancy Pvt. Ltd., as the Technical Consultant, has been engaged under a tripartite contract among Vision Energy & Power Ltd. and Machhapuchhre Bank Ltd. (Lead Bank) to provide technical consulting services, progress monitoring, and bill verification for the successful completion of the project",
        technicalHighlights: {
            "Project Location": "Umakunda Rural Municipality, Ramechhap District",
            "Installed Capacity": "57.50 MW",
            "Design Discharge": "7.11 m³/s",
            "Gross Head": "1003.50 m",
            "Design Flood": "76 m³/s (Nupche) / 63 m³/s (Likhu)",
            "Diversion Type": "Boulder lined weir with side intakes",
            "Headrace Tunnel": "6318 m (Total)",
            "Headrace Pipe Length/Diameter": "1215 m / 1.60 m",
            "Penstock Pipe Length/Diameter": "2422.50 m / 1.25 to 0.72 m",
            "Thickness of Pipe": "8mm to 56mm",
            "Unit Capacity": "3 units of horizontal axis Pelton turbines"
        },
        images: ["/downloads/mjlodvw6RB1obD/img/mask-group-2.png", "/downloads/mjlodvw6RB1obD/img/mask-group-1.png", "/downloads/mjlodvw6RB1obD/img/mask-group-3.png", "/downloads/mjlodvw6RB1obD/img/mask-group-4.png"],
        description: "Nupche Likhu Hydropower Project (NLHPP) is a run-of-river hydropower project located in Ramechhap District. The project is designed with multiple headworks to capture flows from both the Nupche and Likhu rivers."
    },
    {
        id: "pm-11",
        title: "Upper Balephi Hydropower Project (46.00 MW)",
        scope: "Progress Monitoring and Bill Vetting",
        location: [28.00, 85.79],
        role: "TAC Hydro Consultancy Pvt. Ltd., as the Technical Consultant, has been engaged under a tripartite contract among Upper Balephi Hydropower Ltd., Laxmi Sunrise Bank Ltd. (Lead Bank) to provide technical consulting services, progress monitoring, and bill verification for the successful completion of the project.",
        technicalHighlights: {
            "Project Location": "Sindhupalchowk District, Bagmati Province",
            "Installed Capacity": "46.00 MW",
            "Design Discharge": "12.7 m³/s",
            "Gross Head": "438.50 m",
            "Design Flood": "974 m³/s",
            "Diversion Type": "Broad Crested weir",
            "Headrace Tunnel/Size": "2080.6 m / 3.25 m x 3.50 m",
            "Penstock Pipe Length/Diameter": "586.02 m / 2.2 m",
            "Thickness of Pipe": "10 mm to 40 mm",
            "Unit Capacity": "15.807 MW per Unit (3 units of Horizontal-axis Pelton turbines)"
        },
        images: ["/downloads/mjlodvw6RB1obD/img/mask-group-4.png", "/downloads/mjlodvw6RB1obD/img/mask-group-2.png", "/downloads/mjlodvw6RB1obD/img/mask-group.png", "/downloads/mjlodvw6RB1obD/img/mask-group-1.png"],
        description: "Upper Balephi Hydropower Ltd. is developing the Upper Balephi Hydropower Project (UBHP) in Sindhupalchowk District, utilizing the flow of the Balephi Khola. The facility utilizes a very high-head configuration to drive three Horizontal-axis Pelton turbines units."
    }
];
