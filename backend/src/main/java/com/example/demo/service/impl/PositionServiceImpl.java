package com.example.demo.service.impl;

import com.example.demo.entity.Employee;
import com.example.demo.entity.Position;
import com.example.demo.repository.PositionRepository;
import com.example.demo.service.PositionService;
import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.List;
import java.util.Optional;

@Service
public class PositionServiceImpl implements PositionService {

    @Autowired
    PositionRepository repository;

    @Override
    public Page<Position> findAll(Pageable pageable) {
            return repository.findAll(pageable);
        }

    @Override
    public List<Position> findAl() {
        return repository.findAll();
    }

    @Override
    public Optional<Position> findById(Long id) {
        return repository.findById(id);
    }

    @Override
    public Position add(Position position) {
        return repository.save(position);
    }

    @Override
    public Position update(Long id, Position position) {
        Optional<Position> existingPositionOptional = repository.findById(id);
        if (existingPositionOptional.isPresent()) {
            Position existingPosition = existingPositionOptional.get();

            existingPosition.setName(position.getName());

            return repository.save(existingPosition);
        } else {
            throw new RuntimeException("Position not found with id: " + id);
        }
    }

    public byte[] exportPositionToExcel() throws IOException {
        List<Position> positions = repository.findAll();

        // Tạo Workbook và Sheet
        Workbook workbook = new XSSFWorkbook();
        Sheet sheet = workbook.createSheet("Positions");

        // Tạo style cho header
        CellStyle headerStyle = createHeaderStyle(workbook);

        // Tạo style cho các ô dữ liệu
        CellStyle dataStyle = createDataStyle(workbook);

        // Tạo header row
        Row headerRow = sheet.createRow(0);
        String[] headers = {"ID", "Name"};
        for (int i = 0; i < headers.length; i++) {
            Cell cell = headerRow.createCell(i);
            cell.setCellValue(headers[i]);
            cell.setCellStyle(headerStyle);
        }

        // Điền dữ liệu vào các hàng
        int rowNum = 1;
        for (Position p : positions) {
            Row row = sheet.createRow(rowNum++);
            Cell cellId = row.createCell(0);
            cellId.setCellValue(p.getId());
            cellId.setCellStyle(dataStyle);

            Cell cellName = row.createCell(1);
            cellName.setCellValue(p.getName());
            cellName.setCellStyle(dataStyle);
        }

        // Tự động điều chỉnh độ rộng cột - Auto size columns
        for (int i = 0; i < headers.length; i++) {
            sheet.autoSizeColumn(i);
        }

        // Điều chỉnh độ rộng cột theo mong muốn - Manually set column width
        // Đơn vị đo của setColumnWidth là một phần của ký tự, với giá trị 256 tương đương với độ rộng của một ký tự
        sheet.setColumnWidth(0, 4000); // ID column width
        sheet.setColumnWidth(1, 8000); // Name column width

        // Ghi dữ liệu vào ByteArrayOutputStream
        ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
        workbook.write(outputStream);
        workbook.close();

        return outputStream.toByteArray();
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
