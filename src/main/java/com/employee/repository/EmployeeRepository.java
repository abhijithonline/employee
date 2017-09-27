package com.employee.repository;

import java.util.List;

import com.employee.model.Employee;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.data.rest.core.annotation.RestResource;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.data.repository.query.Param;

@RepositoryRestResource
public interface EmployeeRepository extends CrudRepository<Employee, Long> {    

    void delete(Employee employee);

    void delete(Long id);

    void deleteAll();

    List<Employee> findByFirstName(@Param("firstName") String firstName);
}
