import { ArrowUpRight } from "lucide-react";

const fallbackAvatar = "/images/employees/default-avatar.svg";

export default function EmployeeCard({ employee, lang, contactLabel, pendingLabel, onContact }) {
  const isAr = lang === "ar";
  const name = isAr ? employee.nameAr : employee.name;
  const role = isAr ? employee.roleAr : employee.role;
  const department = isAr ? employee.departmentAr : employee.department;

  const useFallback = (event) => {
    if (event.currentTarget.src.endsWith(fallbackAvatar)) return;
    event.currentTarget.src = fallbackAvatar;
  };

  return (
    <article className="employee-card" data-reveal>
      <div className="employee-photo">
        <img src={employee.image || fallbackAvatar} alt="" onError={useFallback} />
      </div>
      <div className="employee-card-copy">
        <span>{department}</span>
        <h3>{name}</h3>
        <b>{role}</b>
        <p>{pendingLabel}</p>
      </div>
      <button type="button" onClick={() => onContact(employee)}>
        {contactLabel} {name} <ArrowUpRight />
      </button>
    </article>
  );
}
