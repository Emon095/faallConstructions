export const services = [
  { n: "01", title: "General Contracting", text: "Coordinated construction delivery from mobilization through close-out.", icon: "Building2" },
  { n: "02", title: "Civil & Structural", text: "Disciplined execution for concrete, structural and enabling works.", icon: "Landmark" },
  { n: "03", title: "Project Management", text: "Clear planning, controls, reporting and stakeholder coordination.", icon: "ClipboardCheck" },
  { n: "04", title: "Design & Build", text: "An integrated route from technical development to site delivery.", icon: "PenTool" },
  { n: "05", title: "MEP Coordination", text: "Buildability-led coordination across critical building systems.", icon: "Cable" },
  { n: "06", title: "Fit-Out & Handover", text: "Detail-focused completion and practical project handover.", icon: "HardHat" }
];

const directoryRoles = [
  ["General Manager", "المدير العام", "Management", "الإدارة"],
  ["Executive Office", "المكتب التنفيذي", "Management", "الإدارة"],
  ["Operations Manager", "مدير العمليات", "Operations", "العمليات"],
  ["Projects Manager", "مدير المشاريع", "Projects", "المشاريع"],
  ["Senior Project Manager", "مدير مشاريع أول", "Projects", "المشاريع"],
  ["Project Manager", "مدير مشروع", "Projects", "المشاريع"],
  ["Construction Manager", "مدير الإنشاءات", "Projects", "المشاريع"],
  ["Site Manager", "مدير الموقع", "Projects", "المشاريع"],
  ["Planning Manager", "مدير التخطيط", "Project Controls", "ضبط المشاريع"],
  ["Planning Engineer", "مهندس تخطيط", "Project Controls", "ضبط المشاريع"],
  ["Commercial Manager", "المدير التجاري", "Commercial", "الشؤون التجارية"],
  ["Quantity Surveyor", "حاسب كميات", "Commercial", "الشؤون التجارية"],
  ["Business Development Manager", "مدير تطوير الأعمال", "Business Development", "تطوير الأعمال"],
  ["Client Relations", "علاقات العملاء", "Business Development", "تطوير الأعمال"],
  ["Engineering Manager", "مدير الهندسة", "Engineering", "الهندسة"],
  ["Civil Engineer", "مهندس مدني", "Engineering", "الهندسة"],
  ["Structural Engineer", "مهندس إنشائي", "Engineering", "الهندسة"],
  ["MEP Engineer", "مهندس كهروميكانيكي", "Engineering", "الهندسة"],
  ["Technical Office Engineer", "مهندس مكتب فني", "Engineering", "الهندسة"],
  ["Procurement Manager", "مدير المشتريات", "Procurement", "المشتريات"],
  ["Procurement Officer", "مسؤول مشتريات", "Procurement", "المشتريات"],
  ["Contracts Manager", "مدير العقود", "Contracts", "العقود"],
  ["HSE Manager", "مدير الصحة والسلامة", "Health & Safety", "الصحة والسلامة"],
  ["Safety Officer", "مسؤول السلامة", "Health & Safety", "الصحة والسلامة"],
  ["QA/QC Manager", "مدير الجودة", "Quality", "الجودة"],
  ["Quality Engineer", "مهندس جودة", "Quality", "الجودة"],
  ["Finance Manager", "المدير المالي", "Finance", "المالية"],
  ["Human Resources Manager", "مدير الموارد البشرية", "Human Resources", "الموارد البشرية"],
  ["Administration Manager", "مدير الإدارة", "Administration", "الشؤون الإدارية"],
  ["General Enquiries", "الاستفسارات العامة", "Administration", "الشؤون الإدارية"]
];

export const team = directoryRoles.map(([title, titleAr, department, departmentAr], index) => {
  const number = String(index + 1).padStart(3, "0");
  const initials = title.split(/\s+/).slice(0, 2).map(word => word[0]).join("");
  return {
    id: `employee-${number}`,
    name: `Employee ${String(index + 1).padStart(2, "0")}`,
    nameAr: `الموظف ${String(index + 1).padStart(2, "0")}`,
    title,
    titleAr,
    department,
    departmentAr,
    initials,
    role: "Name, profile and protected recipient email pending client approval."
  };
});

export const leadership = [
  {
    name: "AHMED BIN ALI HUSSAIN ALSOUD ALGAMDI",
    nameAr: "أحمد بن علي حسين السعود الغامدي",
    title: "CEO",
    titleAr: "الرئيس التنفيذي",
    photo: `${import.meta.env.BASE_URL}assets/images/leadership/ahmed-algamdi.png`
  },
  {
    name: "Jahangir Alam",
    nameAr: "Jahangir Alam",
    title: "Marketing Manager",
    titleAr: "مدير التسويق",
    contact: "00 966 50 458 8131",
    contactHref: "tel:+966504588131",
    photo: `${import.meta.env.BASE_URL}assets/images/leadership/jahangir-alam.png`
  }
];

export const inquiryTypes = [
  "General Inquiry", "Project Consultation", "Request for Quotation",
  "Tender Invitation", "Supplier Inquiry", "Employment Inquiry",
  "Partnership Opportunity", "Existing Project Support", "Other"
];

export const divisions = [
  { title: "Civil Construction", items: ["Building construction", "Structural steel work", "Structural concrete work", "Civil finishing works", "Painting works", "Asphalt paving", "Gypsum-board partitions and ceilings", "Carpentry works", "Aluminum doors and windows", "Plumbing works", "Concrete works", "Civil maintenance", "Fencing works", "Swimming pools", "Landscaping and beautification"] },
  { title: "Electro-Mechanical", items: ["Steel doors and grills fabrication and installation", "Steel-building supply and erection", "Fire-fighting systems", "Laboratory casework and fume cupboards for industrial, laboratory and medical gases", "Welding", "Mechanical maintenance", "HVAC installation and maintenance", "Electrical and instrumentation", "Fusion-bonded epoxy coating systems", "Pipeline and process-piping erection", "RTR piping"] },
  { title: "Electrical Works", items: ["Residential and industrial electrical works", "Panel-board installation", "Cable laying and maintenance", "Telephone, electrical, fire-alarm, CCTV, CATV, MATV, data and control cabling in duct banks, open trenches and cable trays", "Cable trays, trunking and conduit systems", "SCECO-qualified medium-voltage cable termination and jointing", "Cable high-pressure testing up to 100 kV", "Data/control cable termination and telephone cable jointing", "Complete substation installation", "Medium-voltage switchgear", "Grounding and earthing installation and testing", "Ring main units", "CCTV systems", "Package-unit substations with lighting control panels", "Transformer repair", "Generator synchronizing panels", "Transformer and switchgear oil changing and testing", "Juice and UHT milk plant installation"] },
  { title: "Construction Technical Support", items: ["Engineers", "Technicians", "Skilled labor and manpower supply", "Integration management", "Work-scope management", "Cost management", "QA/QC management", "Safety-policy management", "Human-resources management", "Procurement management"] },
  { title: "Aluminum Cladding System", items: [] },
  { title: "Real Estate", items: [] },
  { title: "Heavy Equipment Rental Service", items: ["Cranes", "Tower cranes", "Dump trucks", "JCB equipment"] }
];

export const standards = [
  "American National Standards Institute (ANSI)", "American Society of Mechanical Engineers (ASME)",
  "American Society for Testing and Materials (ASTM)", "American Concrete Institute (ACI)",
  "American Society of Civil Engineers (ASCE)", "Institute of Electrical and Electronics Engineers (IEEE)",
  "Asphalt Institute (AI)", "Saudi Arabia Standard Organization (SASO)"
];

export const projects = [
  ["Ministry of Defence", "Technical Support", "Dawadmi"], ["National Grand Housing", "Civil", "Al Hasa"],
  ["National Water Company", "Pipe Line", "Riyadh"], ["Al Salman Mall", "Cladding", "Hail"],
  ["Riyadh Palma Housing", "Civil", "Riyadh"], ["Panda", "Cladding", "Yanbu"],
  ["Imam University", "Pipe Line", "Riyadh"], ["King Abdullah Financial District", "MEP", "Riyadh"],
  ["Jidha Sea Port", "Technical Support", "Jidha"], ["Aramco Water Tank", "Mechanical", "Jubail"],
  ["Saudi National Guard", "Civil", "Hail"], ["ITCC", "Structural & Cladding", "Riyadh"],
  ["KAFD", "MEP", "Riyadh"], ["Commercial Buildings", "Technical Support", "Dammam"],
  ["Private Hospital", "Civil", "Tabook"], ["Tagar Housing", "Civil", "Riyadh"],
  ["Retaj Housing", "Turnkey", "Riyadh"], ["Private Hospital", "Technical Support", "Riyadh"],
  ["Tagar Housing", "MEP", "Riyadh"]
];
