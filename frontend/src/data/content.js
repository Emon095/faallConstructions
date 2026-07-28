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

export const inquiryTypes = [
  "General Inquiry", "Project Consultation", "Request for Quotation",
  "Tender Invitation", "Supplier Inquiry", "Employment Inquiry",
  "Partnership Opportunity", "Existing Project Support", "Other"
];
