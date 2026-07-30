const directory = [
  ["Fahad", "فهد", ""],
  ["Bader", "بدر", ""],
  ["Ali", "علي", ""]
];

export const employees = directory.map(([name, nameAr, image], index) => {
  const number = String(index + 1).padStart(2, "0");
  return {
    id: `emp_${number}`,
    name,
    nameAr,
    image
  };
});
