const roles = [
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

const placeholderImages = [
  "/images/employees/avatar-orange.svg",
  "/images/employees/avatar-slate.svg",
  "/images/employees/avatar-sand.svg"
];

export const employees = roles.map(([role, roleAr, department, departmentAr], index) => {
  const number = String(index + 1).padStart(2, "0");
  return {
    id: `emp_${number}`,
    name: `Employee ${number}`,
    nameAr: `الموظف ${number}`,
    role,
    roleAr,
    department,
    departmentAr,
    image: placeholderImages[index % placeholderImages.length]
  };
});
