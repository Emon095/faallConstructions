const directory = [
  ["Fahad", "فهد", ""],
  ["Bader", "بدر", ""],
  ["Ali", "علي", ""],
  [
    "Jahangir Alam",
    "Jahangir Alam",
    `${import.meta.env.BASE_URL}assets/images/leadership/jahangir-alam.png`,
    {
      featured: true,
      position: "Marketing Manager",
      positionAr: "مدير التسويق",
      email: "Jahangir@faallbusiness.com",
      phone: "00 966 50 458 8131",
      phoneHref: "tel:+966504588131"
    }
  ]
];

export const employees = directory
  .map(([name, nameAr, image, details = {}], index) => {
    const number = String(index + 1).padStart(2, "0");
    return {
      id: `emp_${number}`,
      name,
      nameAr,
      image,
      ...details
    };
  })
  .sort((employeeA, employeeB) => Number(Boolean(employeeB.featured)) - Number(Boolean(employeeA.featured)));
