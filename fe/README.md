RUN: 
     - npm run dev


Library: 
     - npm install axios
     - npm install antd
     - npm install @ant-design/icons
     - npm install react-router-dom
     - npm install react-dom
     - npm install bootstrap


application.properties: 
     spring.application.name=demo
     spring.datasource.url=jdbc:sqlserver://localhost:1433;databaseName=PRJ_1;encrypt=true;trustServerCertificate=true;
     spring.datasource.username=sa
     spring.datasource.password=123456
     spring.datasource.driverClassName=com.microsoft.sqlserver.jdbc.SQLServerDriver
     spring.jpa.properties.hibernate.globally_quoted_identifiers=true
     spring.jpa.hibernate.naming.physical-strategy=org.hibernate.boot.model.naming.PhysicalNamingStrategyStandardImpl
     spring.jpa.hibernate.ddl-auto=none


Dependencies:
     <dependencies>
          <dependency>
               <groupId>org.springframework.boot</groupId>
               <artifactId>spring-boot-starter-web</artifactId>
          </dependency>
          <dependency>
               <groupId>org.springframework.boot</groupId>
               <artifactId>spring-boot-starter-data-jpa</artifactId>
          </dependency>
          <dependency>
               <groupId>org.projectlombok</groupId>
               <artifactId>lombok</artifactId>
               <optional>true</optional>
          </dependency>
          <!--  https://mvnrepository.com/artifact/com.microsoft.sqlserver/mssql-jdbc  -->
          <dependency>
               <groupId>com.microsoft.sqlserver</groupId>
               <artifactId>mssql-jdbc</artifactId>
               <version>9.4.1.jre8</version>
          </dependency>
          <dependency>
               <groupId>org.springframework.boot</groupId>
               <artifactId>spring-boot-devtools</artifactId>
               <scope>runtime</scope>
               <optional>true</optional>
          </dependency>
          <dependency>
               <groupId>org.springframework.boot</groupId>
               <artifactId>spring-boot-starter-test</artifactId>
               <scope>test</scope>
          </dependency>
          <dependency>
               <groupId>org.springframework.boot</groupId>
               <artifactId>spring-boot-starter-tomcat</artifactId>
               <scope>test</scope>
          </dependency>
          <!--  https://mvnrepository.com/artifact/org.apache.tomcat.embed/tomcat-embed-jasper  -->
          <dependency>
               <groupId>org.apache.tomcat.embed</groupId>
               <artifactId>tomcat-embed-jasper</artifactId>
          </dependency>
          <dependency>
               <groupId>jakarta.servlet.jsp.jstl</groupId>
               <artifactId>jakarta.servlet.jsp.jstl-api</artifactId>
          </dependency>
          <dependency>
               <groupId>org.glassfish.web</groupId>
               <artifactId>jakarta.servlet.jsp.jstl</artifactId>
          </dependency>
          <dependency>
               <groupId>org.springframework.boot</groupId>
               <artifactId>spring-boot-starter-validation</artifactId>
          </dependency>
          <dependency>
               <groupId>org.springframework.boot</groupId>
               <artifactId>spring-boot-starter-thymeleaf</artifactId>
          </dependency>
          <!--  https://mvnrepository.com/artifact/javax.servlet/jstl  -->
          <dependency>
               <groupId>javax.servlet</groupId>
               <artifactId>jstl</artifactId>
               <version>1.2</version>
          </dependency>
          <dependency>
               <groupId>org.apache.poi</groupId>
               <artifactId>poi-ooxml</artifactId>
               <version>5.2.3</version>
          </dependency>
     <!--        <dependency>-->
     <!--            <groupId>org.springframework.boot</groupId>-->
     <!--            <artifactId>spring-boot-starter-security</artifactId>-->
     <!--        </dependency>-->
     </dependencies>
