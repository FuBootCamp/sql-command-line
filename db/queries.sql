     select e.id as id_, e.first_name, e.last_name, role.title, department.name as department, role.salary, m.first_name || ' ' || m.last_name as manager
     from employee e, employee m, role, department
     where e.manager_id is not null and e.manager_id = m.id and department.id = role.department_id and role.id = e.role_id
     union 
     select e.id as ids, e.first_name, e.last_name, role.title, department.name as department, role.salary, null  as manager
     from employee e, role, department
     where e.manager_id is null and department.id = role.department_id and role.id = e.role_id
     order by id_;