import { ArrowUpRight } from "lucide-react";

const defaultAvatar = "/images/default-employee-avatar.svg";

export default function EmployeeCard({ employee, lang, contactLabel, employeeLabel, onContact }) {
  const isAr = lang === "ar";
  const name = isAr ? employee.nameAr : employee.name;
  const position = isAr ? employee.positionAr : employee.position;

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
        <div>
          <h3>{name}</h3>
          {position && <p className="employee-position">{position}</p>}
          {(employee.email || employee.phone) && (
            <address className="employee-contact">
              {employee.email && <a href={`mailto:${employee.email}`}>{employee.email}</a>}
              {employee.phone && <a href={employee.phoneHref}>{employee.phone}</a>}
            </address>
          )}
        </div>
      </div>
      <button type="button" onClick={() => onContact(employee)}>
        {contactLabel} {name} <ArrowUpRight />
      </button>
    </article>
  );
}
