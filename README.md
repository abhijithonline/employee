# employee
Single page application using Angular JS and Spring boot

Application can be deployed using mvn spring-boot:run with Maven (3+) and JDK 1.7+
Accessible as http://localhost:8080/ and REST services details can be viewed in http://localhost:8080/profile/employees

Uses Spring boot 1.5.2 and Angular JS 1.5.x packaged using Bower
Spring REST services as exposed using Spring boot rest data starter
Application can be deployed as spring boot using Maven embedded tomcat
Angular JS files are packaged in webapp which also be deployed in a separate server (CORS is handled in Spring REST)
Backend used Spring H2 DB

Assignment:

Single page application accepts and saves employee details. All employee information is listed.

Spring boot manages REST services for CRUD operations

Application is created using bootstrap design

UI is designed to be responsive and tablet friendly

Employee information can be modifed / deleted using  'Update' and 'Remove' options in the data table

Employee information can be view in table and card layout

Employee information can be downloaded to excel or CSV (Uses ng-table-excel-export)

Employee information can uploaded using Import Excel (Uses js-xlsx and requires column header matching JSON)
