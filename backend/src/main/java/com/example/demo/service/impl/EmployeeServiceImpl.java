package com.example.demo.service.impl;

import com.example.demo.entity.Employee;
import com.example.demo.entity.Position;
import com.example.demo.entity.specification.EmployeeSpecifications;
import com.example.demo.repository.EmployeeRepository;
import com.example.demo.service.EmployeeService;
import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.text.Normalizer;
import java.util.List;
import java.util.Optional;
import java.util.regex.Pattern;

@Service
public class EmployeeServiceImpl implements EmployeeService {

    @Autowired
    EmployeeRepository repo;

    @Override
    public Page<Employee> findAll(Pageable pageable) {
        return repo.findAll(pageable);
    }

    @Override
    public Optional<Employee> findById(Long id) {
        return repo.findById(id);
    }

    @Override
    public Employee add(Employee employee) {
        return repo.save(employee);
    }

    @Override
    public Employee update(Long id, Employee updatedEmployee) {
        Optional<Employee> existingEmployeeOptional = repo.findById(id);
        if (existingEmployeeOptional.isPresent()) {
            Employee existingEmployee = existingEmployeeOptional.get();

            existingEmployee.setCode(updatedEmployee.getCode());
            existingEmployee.setName(updatedEmployee.getName());
            existingEmployee.setAge(updatedEmployee.getAge());
            existingEmployee.setGender(updatedEmployee.isGender());
            existingEmployee.setAddress(updatedEmployee.getAddress());
            existingEmployee.setPosition(updatedEmployee.getPosition());

            return repo.save(existingEmployee);
        } else {
            throw new RuntimeException("Employee not found with id: " + id);
        }
    }

    @Override
    public void delete(Long id) {
        repo.deleteById(id);
    }

    @Override
    public List<Employee> searchEmployees(String name, Boolean gender, String position) {
        Specification<Employee> spec = Specification.where(null);

        if (name != null && !name.trim().isEmpty()) {
            spec = spec.and(EmployeeSpecifications.hasName(name));
        }

        if (gender != null) {
            spec = spec.and(EmployeeSpecifications.hasGender(gender));
        }

        if (position != null && !position.trim().isEmpty()) {
            spec = spec.and(EmployeeSpecifications.hasPosition(position));
        }

        return repo.findAll(spec);
    }

    public byte[] exportEmployeeToExcel() throws IOException {
        List<Employee> employees = repo.findAll();

        // Tạo Workbook và Sheet
        Workbook workbook = new XSSFWorkbook();
        Sheet sheet = workbook.createSheet("Employees");

        // Tạo style cho header
        CellStyle headerStyle = createHeaderStyle(workbook);

        // Tạo style cho các ô dữ liệu
        CellStyle dataStyle = createDataStyle(workbook);

        // Tạo header row
        Row headerRow = sheet.createRow(0);
        String[] headers = {"ID", "Code", "Name", "Age", "Gender", "Address", "Position"};
        for (int i = 0; i < headers.length; i++) {
            Cell cell = headerRow.createCell(i);
            cell.setCellValue(headers[i]);
            cell.setCellStyle(headerStyle);
        }

        // Điền dữ liệu vào các hàng
        int rowNum = 1;
        for (Employee e : employees) {
            Row row = sheet.createRow(rowNum++);
            createStyledCell(row, 0, e.getId(), dataStyle);
            createStyledCell(row, 1, e.getCode(), dataStyle);
            createStyledCell(row, 2, e.getName(), dataStyle);
            createStyledCell(row, 3, e.getAge(), dataStyle);
            createStyledCell(row, 4, e.isGender() ? "Male" : "Female", dataStyle);
            createStyledCell(row, 5, e.getAddress(), dataStyle);
            createStyledCell(row, 6, e.getPosition().getName(), dataStyle);
        }

        // Tự động điều chỉnh độ rộng cột - Auto size columns
        for (int i = 0; i < headers.length; i++) {
            sheet.autoSizeColumn(i);
        }

        // Điều chỉnh độ rộng cột theo mong muốn - Manually set column width
        // Đơn vị đo của setColumnWidth là một phần của ký tự, với giá trị 256 tương đương với độ rộng của một ký tự
        sheet.setColumnWidth(0, 2500); // ID column width
        sheet.setColumnWidth(1, 4000); // Code column width
        sheet.setColumnWidth(2, 8000); // Name column width

        // Ghi dữ liệu vào ByteArrayOutputStream
        ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
        workbook.write(outputStream);
        workbook.close();

        return outputStream.toByteArray();
    }

    private void createStyledCell(Row row, int column, Object value, CellStyle style) {
        Cell cell = row.createCell(column);
        if (value != null) {
            if (value instanceof Integer) {
                cell.setCellValue((Integer) value);
            } else if (value instanceof String) {
                cell.setCellValue((String) value);
            } else {
                // Xử lý trường hợp khác nếu cần
                cell.setCellValue(value.toString());
            }
        }
        cell.setCellStyle(style);
    }

    private CellStyle createHeaderStyle(Workbook workbook) {
        CellStyle headerStyle = workbook.createCellStyle();
        Font headerFont = workbook.createFont();
        headerFont.setBold(true);
        headerFont.setFontHeightInPoints((short) 12);
        headerStyle.setFont(headerFont);
        headerStyle.setFillForegroundColor(IndexedColors.GREY_25_PERCENT.getIndex());
        headerStyle.setFillPattern(FillPatternType.SOLID_FOREGROUND);
        headerStyle.setBorderBottom(BorderStyle.THIN);
        headerStyle.setBorderTop(BorderStyle.THIN);
        headerStyle.setBorderRight(BorderStyle.THIN);
        headerStyle.setBorderLeft(BorderStyle.THIN);
        headerStyle.setAlignment(HorizontalAlignment.CENTER);
        return headerStyle;
    }

    private CellStyle createDataStyle(Workbook workbook) {
        CellStyle dataStyle = workbook.createCellStyle();
        Font dataFont = workbook.createFont();
        dataFont.setFontHeightInPoints((short) 10);
        dataStyle.setFont(dataFont);
        dataStyle.setWrapText(true);
        dataStyle.setBorderBottom(BorderStyle.THIN);
        dataStyle.setBorderTop(BorderStyle.THIN);
        dataStyle.setBorderRight(BorderStyle.THIN);
        dataStyle.setBorderLeft(BorderStyle.THIN);
        dataStyle.setAlignment(HorizontalAlignment.CENTER);
        return dataStyle;
    }
}
