import { ArrowUpRight } from "lucide-react";

const defaultAvatar = "/images/default-employee-avatar.svg";

export default function EmployeeCard({ employee, lang, contactLabel, employeeLabel, onContact }) {
  const isAr = lang === "ar";
  const name = isAr ? employee.nameAr : employee.name;

  const useDefaultAvatar = (event) => {
    if (event.currentTarget.src.endsWith(defaultAvatar)) return;
    event.currentTarget.src = defaultAvatar;
  };

  return (
    <article className="employee-card" data-reveal>
      <div className="employee-photo">
        <img src={employee.image || defaultAvatar} alt={name} onError={useDefaultAvatar} />
      </div>
      <span className="employee-label">{employeeLabel}</span>
      <div className="employee-card-copy">
        <h3>{name}</h3>
      </div>
      <button type="button" onClick={() => onContact(employee)}>
        {contactLabel} {name} <ArrowUpRight />
      </button>
    </article>
  );
}
