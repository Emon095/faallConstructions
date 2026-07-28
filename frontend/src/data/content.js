export const services = [
  { n: "01", title: "General Contracting", text: "Coordinated construction delivery from mobilization through close-out.", icon: "Building2" },
  { n: "02", title: "Civil & Structural", text: "Disciplined execution for concrete, structural and enabling works.", icon: "Landmark" },
  { n: "03", title: "Project Management", text: "Clear planning, controls, reporting and stakeholder coordination.", icon: "ClipboardCheck" },
  { n: "04", title: "Design & Build", text: "An integrated route from technical development to site delivery.", icon: "PenTool" },
  { n: "05", title: "MEP Coordination", text: "Buildability-led coordination across critical building systems.", icon: "Cable" },
  { n: "06", title: "Fit-Out & Handover", text: "Detail-focused completion and practical project handover.", icon: "HardHat" }
];

const directoryRoles = [
  ["General Manager", "Management"], ["Executive Office", "Management"],
  ["Operations Manager", "Operations"], ["Projects Manager", "Projects"],
  ["Senior Project Manager", "Projects"], ["Project Manager", "Projects"],
  ["Construction Manager", "Projects"], ["Site Manager", "Projects"],
  ["Planning Manager", "Project Controls"], ["Planning Engineer", "Project Controls"],
  ["Commercial Manager", "Commercial"], ["Quantity Surveyor", "Commercial"],
  ["Business Development Manager", "Business Development"], ["Client Relations", "Business Development"],
  ["Engineering Manager", "Engineering"], ["Civil Engineer", "Engineering"],
  ["Structural Engineer", "Engineering"], ["MEP Engineer", "Engineering"],
  ["Technical Office Engineer", "Engineering"], ["Procurement Manager", "Procurement"],
  ["Procurement Officer", "Procurement"], ["Contracts Manager", "Contracts"],
  ["HSE Manager", "Health & Safety"], ["Safety Officer", "Health & Safety"],
  ["QA/QC Manager", "Quality"], ["Quality Engineer", "Quality"],
  ["Finance Manager", "Finance"], ["Human Resources Manager", "Human Resources"],
  ["Administration Manager", "Administration"], ["General Enquiries", "Administration"]
];

export const team = directoryRoles.map(([title, department], index) => {
  const number = String(index + 1).padStart(3, "0");
  const initials = title.split(/\s+/).slice(0, 2).map(word => word[0]).join("");
  return {
    id: `employee-${number}`,
    name: `Employee ${String(index + 1).padStart(2, "0")}`,
    title,
    department,
    initials,
    role: "Name, profile and protected recipient email pending client approval."
  };
});

export const inquiryTypes = [
  "General Inquiry", "Project Consultation", "Request for Quotation",
  "Tender Invitation", "Supplier Inquiry", "Employment Inquiry",
  "Partnership Opportunity", "Existing Project Support", "Other"
];
