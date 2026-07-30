import EmployeeCard from "./EmployeeCard";

export default function EmployeeList({ employees, lang, contactLabel, employeeLabel, onContact }) {
  return (
    <div className="employee-grid">
      {employees.map(employee => (
        <EmployeeCard
          key={employee.id}
          employee={employee}
          lang={lang}
          contactLabel={contactLabel}
          employeeLabel={employeeLabel}
          onContact={onContact}
        />
      ))}
    </div>
  );
}
