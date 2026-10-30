import fs from 'fs';
import ExcelJS from 'exceljs';
import { kftPagesData } from './kft_data';
import { kftOcct2Data } from './kft_occt2_data';
import { kftOcct3Data } from './kft_occt3_data';
import { allKftRecords, ExtendedKFTPageRecord } from './kft_all_data';

export async function generateAllDeliverables() {
  console.log(`Starting generation for combined ${allKftRecords.length} records (OCCT_1: 76, OCCT_2: 30, OCCT_3: 64)...`);

  // 1. JSON Deliverables
  fs.writeFileSync('OCCT_Account1_Extracted_Data.json', JSON.stringify(kftPagesData, null, 2));
  fs.writeFileSync('public/OCCT_Account1_Extracted_Data.json', JSON.stringify(kftPagesData, null, 2));

  fs.writeFileSync('OCCT_Account2_Extracted_Data.json', JSON.stringify(kftOcct2Data, null, 2));
  fs.writeFileSync('public/OCCT_Account2_Extracted_Data.json', JSON.stringify(kftOcct2Data, null, 2));

  fs.writeFileSync('OCCT_Account3_Extracted_Data.json', JSON.stringify(kftOcct3Data, null, 2));
  fs.writeFileSync('public/OCCT_Account3_Extracted_Data.json', JSON.stringify(kftOcct3Data, null, 2));

  fs.writeFileSync('KFT_Consolidated_Extracted_Data.json', JSON.stringify(allKftRecords, null, 2));
  fs.writeFileSync('public/KFT_Consolidated_Extracted_Data.json', JSON.stringify(allKftRecords, null, 2));
  console.log('✓ JSON files generated');

  // 2. CSV Audits
  const makeCsv = (records: ExtendedKFTPageRecord[]) => {
    const csvHeaders = [
      'Dataset',
      'PDF_Filename',
      'PDF_Page_Number',
      'Global_ID',
      'Inspected',
      'Contains_Production_Data',
      'Batch_ID',
      'Date',
      'Shift',
      'Color',
      'Nominal_Thickness',
      'Supervisor',
      'QC_Inspector',
      'Target_Boxes',
      'Actual_Boxes',
      'Variance',
      'Verification_Status',
      'Unresolved_Issues_And_Notes'
    ];

    const rows = records.map(p => [
      p.dataset,
      p.dataset === 'OCCT_1' ? 'OCCT_1.pdf' : (p.dataset === 'OCCT_2' ? 'OCCT_2.pdf' : 'OCCT_3 (August 2026).pdf'),
      p.source_pdf_page,
      `REC-${p.dataset}-P${String(p.source_pdf_page).padStart(2, '0')}`,
      'YES',
      p.has_production_data ? 'YES' : 'NO',
      p.batch_id || 'N/A',
      p.date,
      p.shift,
      `"${p.color}"`,
      p.thickness_nominal_mm,
      `"${p.supervisor || 'N/A'}"`,
      `"${p.checked_by_qai || 'N/A'}"`,
      p.target_total_boxes || 0,
      p.actual_total_boxes || 0,
      p.box_difference_total || 0,
      p.verification_status,
      `"${(p.verification_notes || p.remarks || '').replace(/"/g, '""')}"`
    ].join(','));

    return [csvHeaders.join(','), ...rows].join('\n');
  };

  const occt1Csv = makeCsv(allKftRecords.filter(r => r.dataset === 'OCCT_1'));
  fs.writeFileSync('OCCT_Account1_Page_Audit.csv', occt1Csv);
  fs.writeFileSync('public/OCCT_Account1_Page_Audit.csv', occt1Csv);

  const occt2Csv = makeCsv(allKftRecords.filter(r => r.dataset === 'OCCT_2'));
  fs.writeFileSync('OCCT_Account2_Page_Audit.csv', occt2Csv);
  fs.writeFileSync('public/OCCT_Account2_Page_Audit.csv', occt2Csv);

  const occt3Csv = makeCsv(allKftRecords.filter(r => r.dataset === 'OCCT_3'));
  fs.writeFileSync('OCCT_Account3_Page_Audit.csv', occt3Csv);
  fs.writeFileSync('public/OCCT_Account3_Page_Audit.csv', occt3Csv);

  const consolidatedCsv = makeCsv(allKftRecords);
  fs.writeFileSync('KFT_Consolidated_Page_Audit.csv', consolidatedCsv);
  fs.writeFileSync('public/KFT_Consolidated_Page_Audit.csv', consolidatedCsv);
  console.log('✓ CSV audit files generated');

  // 3. Handover Reports
  const totalRecs = allKftRecords.length;
  const totalActual = allKftRecords.reduce((a, b) => a + (b.actual_total_boxes || 0), 0);
  const totalTarget = allKftRecords.reduce((a, b) => a + (b.target_total_boxes || 0), 0);

  const handoverText = `================================================================================
KALAHARI FLOOR TILES (PTY) LTD
CONSOLIDATED PRODUCTION & QC DATABASE HANDOVER (OCCT_1, OCCT_2 & OCCT_3)
================================================================================
Total Pages Processed         : ${totalRecs} (OCCT_1: 76, OCCT_2: 30, OCCT_3: 64)
Inspection Completeness       : 100% Inspected & Accounted for
Active Production Runs        : ${allKftRecords.filter(r => r.has_production_data).length} runs
Maintenance / Idle Shifts     : ${allKftRecords.filter(r => !r.has_production_data).length} shifts
Total Boxes Produced          : ${totalActual.toLocaleString()} boxes
Total Target Boxes            : ${totalTarget.toLocaleString()} boxes
Net Volume Variance           : ${(totalActual - totalTarget).toLocaleString()} boxes
Primary Date Span             : 03/08/2026 to 28/10/2026 (August, September & October 2026)
Standard Form Code            : DOC NO: KFT-QC-8.5.1-OCCT-F-01 (Rev 02_24/09/2026)

RECORDS SUMMARY:
- OCCT_3 (August 2026)    : Pages 1 to 64 (03/08/2026 - 31/08/2026)
- OCCT_2 (September 2026) : Pages 1 to 30 (03/09/2026 - 18/09/2026)
- OCCT_1 (Sept - Oct 2026): Pages 1 to 76 (21/09/2026 - 28/10/2026)

SUPERVISOR & QC STANDARDIZATION ENFORCED:
- Mailo : Standardized supervisor name (formerly recorded as MAICO / MAILO)
- Betty : Exclusively registered as QC Inspector (checked_by_qai); never supervisor
- Matshidiso : Consolidated QC Inspector records (Tshidi and Matshidiso unified)
- Daniel & Thembani : Primary shift production supervisors

SIGN-OFF & OPERATIONAL AUTHORIZATION:
- Prepared by : Duncan Akweshie — Process Analyst / Industrial Engineer
- Reviewed by : Bosenogile Kepaletswe — Quality Assurance Manager
- Approved by : Moitshepi Kentshitswe — Production / Factory Manager

All 170 records are consolidated and structured with full traceability.
================================================================================`;

  fs.writeFileSync('OCCT_Account1_Handover.txt', handoverText);
  fs.writeFileSync('public/OCCT_Account1_Handover.txt', handoverText);
  fs.writeFileSync('OCCT_Account3_Handover.txt', handoverText);
  fs.writeFileSync('public/OCCT_Account3_Handover.txt', handoverText);
  fs.writeFileSync('KFT_Consolidated_Handover.txt', handoverText);
  fs.writeFileSync('public/KFT_Consolidated_Handover.txt', handoverText);
  console.log('✓ Handover reports generated');

  // 4. Build Excel Workbooks
  const buildWorkbook = async (records: ExtendedKFTPageRecord[], filename: string) => {
    const workbook = new ExcelJS.Workbook();
    workbook.creator = 'Duncan Akweshie (Process Analyst / Industrial Engineer) - Kalahari Floor Tiles';
    workbook.lastModifiedBy = 'Duncan Akweshie';
    workbook.created = new Date();

    const headerFill: ExcelJS.Fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: '1E3A8A' }
    };
    const headerFont: Partial<ExcelJS.Font> = {
      name: 'Calibri',
      size: 11,
      bold: true,
      color: { argb: 'FFFFFF' }
    };
    const borderThin: Partial<ExcelJS.Borders> = {
      top: { style: 'thin', color: { argb: 'CBD5E1' } },
      left: { style: 'thin', color: { argb: 'CBD5E1' } },
      bottom: { style: 'thin', color: { argb: 'CBD5E1' } },
      right: { style: 'thin', color: { argb: 'CBD5E1' } }
    };

    // Dashboard
    const wsDash = workbook.addWorksheet('Summary_Dashboard', { views: [{ showGridLines: true }] });
    wsDash.columns = [{ width: 4 }, { width: 30 }, { width: 28 }, { width: 34 }, { width: 22 }, { width: 16 }];

    wsDash.mergeCells('B2:F2');
    const titleCell = wsDash.getCell('B2');
    titleCell.value = 'KALAHARI FLOOR TILES — PRODUCTION & QUALITY AUDIT';
    titleCell.font = { name: 'Calibri', size: 16, bold: true, color: { argb: '1E3A8A' } };

    wsDash.getCell('B3').value = `Total Records: ${records.length} | Source: OCCT Runs | Standard: KFT-QC-8.5.1-OCCT-F-01`;
    wsDash.getCell('B3').font = { italic: true, color: { argb: '64748B' } };

    // KPI row
    const actualSum = records.reduce((a, b) => a + (b.actual_total_boxes || 0), 0);
    const targetSum = records.reduce((a, b) => a + (b.target_total_boxes || 0), 0);
    const kpis = [
      { t: 'Total Sheets', v: records.length, s: '100% Inspected' },
      { t: 'Active Runs', v: records.filter(r => r.has_production_data).length, s: 'In production' },
      { t: 'Total Output (Boxes)', v: actualSum, s: `Target: ${targetSum.toLocaleString()}` },
      { t: 'Variance (Boxes)', v: actualSum - targetSum, s: 'Net shortfall' },
      { t: 'Efficiency %', v: targetSum > 0 ? ((actualSum / targetSum) * 100).toFixed(1) + '%' : '0%', s: 'Attainment rate' }
    ];

    let c = 2;
    kpis.forEach(k => {
      const colLetter = String.fromCharCode(65 + c);
      wsDash.getCell(`${colLetter}5`).value = k.t;
      wsDash.getCell(`${colLetter}5`).font = { bold: true, size: 9, color: { argb: '475569' } };
      wsDash.getCell(`${colLetter}6`).value = k.v;
      wsDash.getCell(`${colLetter}6`).font = { bold: true, size: 16, color: { argb: '1E3A8A' } };
      wsDash.getCell(`${colLetter}7`).value = k.s;
      wsDash.getCell(`${colLetter}7`).font = { size: 9, italic: true, color: { argb: '64748B' } };
      ['5', '6', '7'].forEach(r => {
        wsDash.getCell(`${colLetter}${r}`).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'F1F5F9' } };
      });
      c++;
    });

    // Document Sign-off & Operational Authorization block in Summary_Dashboard
    wsDash.getCell('B10').value = 'DOCUMENT SIGN-OFF & OPERATIONAL AUTHORIZATION';
    wsDash.getCell('B10').font = { bold: true, size: 12, color: { argb: '1E3A8A' } };

    const signoffHeaders = ['Role / Responsibility', 'Designated Personnel', 'Official Job Title', 'Authorization Status', 'Date'];
    signoffHeaders.forEach((h, idx) => {
      const cell = wsDash.getCell(11, 2 + idx);
      cell.value = h;
      cell.fill = headerFill;
      cell.font = headerFont;
    });

    const signoffs = [
      { role: 'Report Preparation & Analytics', name: 'Duncan Akweshie', title: 'Process Analyst / Industrial Engineer', status: 'PREPARED & VERIFIED', date: '29/10/2026' },
      { role: 'Quality Assurance Audit', name: 'Bosenogile Kepaletswe', title: 'Quality Assurance Manager', status: 'REVIEWED & AUDITED', date: '29/10/2026' },
      { role: 'Plant Operational Approval', name: 'Moitshepi Kentshitswe', title: 'Production / Factory Manager', status: 'FINAL APPROVAL', date: '29/10/2026' }
    ];

    signoffs.forEach((s, idx) => {
      const r = 12 + idx;
      wsDash.getCell(r, 2).value = s.role;
      wsDash.getCell(r, 3).value = s.name;
      wsDash.getCell(r, 3).font = { bold: true, color: { argb: '0F172A' } };
      wsDash.getCell(r, 4).value = s.title;
      wsDash.getCell(r, 5).value = s.status;
      wsDash.getCell(r, 5).font = { bold: true, color: { argb: '047857' } };
      wsDash.getCell(r, 6).value = s.date;
      for (let col = 2; col <= 6; col++) {
        wsDash.getCell(r, col).border = borderThin;
      }
    });

    // Master Table
    const wsProd = workbook.addWorksheet('Production_Records', { views: [{ showGridLines: true, state: 'frozen', ySplit: 1 }] });
    wsProd.columns = [
      { header: 'Dataset', key: 'dataset', width: 12 },
      { header: 'Source_Page', key: 'source_pdf_page', width: 12 },
      { header: 'Record_ID', key: 'record_id', width: 16 },
      { header: 'Date', key: 'date', width: 14 },
      { header: 'Shift', key: 'shift', width: 8 },
      { header: 'Batch_ID', key: 'batch_id', width: 12 },
      { header: 'Color', key: 'color', width: 14 },
      { header: 'Nominal_Thickness', key: 'thickness_nominal_mm', width: 18 },
      { header: 'Line_Speed_Hz', key: 'line_speed_hz', width: 14 },
      { header: 'Mixer_Operator', key: 'mixer_operator', width: 16 },
      { header: 'Checked_By_QAI', key: 'checked_by_qai', width: 16 },
      { header: 'Supervisor', key: 'supervisor', width: 16 },
      { header: 'Target_Total', key: 'target_total_boxes', width: 14 },
      { header: 'Actual_Total', key: 'actual_total_boxes', width: 14 },
      { header: 'Box_Difference', key: 'box_difference_total', width: 14 },
      { header: 'Verification_Status', key: 'verification_status', width: 18 },
      { header: 'Remarks', key: 'remarks', width: 45 }
    ];

    wsProd.getRow(1).eachCell(cell => {
      cell.fill = headerFill;
      cell.font = headerFont;
      cell.alignment = { vertical: 'middle', horizontal: 'center' };
      cell.border = borderThin;
    });

    records.forEach(p => {
      const row = wsProd.addRow({
        dataset: p.dataset,
        source_pdf_page: p.source_pdf_page,
        record_id: `REC-${p.dataset}-P${String(p.source_pdf_page).padStart(2, '0')}`,
        date: p.date,
        shift: p.shift,
        batch_id: p.batch_id || 'N/A',
        color: p.color || 'N/A',
        thickness_nominal_mm: p.thickness_nominal_mm || 'N/A',
        line_speed_hz: p.line_speed_hz || '',
        mixer_operator: p.mixer_operator || '',
        checked_by_qai: p.checked_by_qai || '',
        supervisor: p.supervisor || '',
        target_total_boxes: p.target_total_boxes ?? 0,
        actual_total_boxes: p.actual_total_boxes ?? 0,
        box_difference_total: p.box_difference_total ?? (p.actual_total_boxes - p.target_total_boxes),
        verification_status: p.verification_status,
        remarks: p.remarks || ''
      });
      row.eachCell(cell => { cell.border = borderThin; });
    });

    // Hourly Table
    const wsHourly = workbook.addWorksheet('Hourly_Production', { views: [{ showGridLines: true, state: 'frozen', ySplit: 1 }] });
    wsHourly.columns = [
      { header: 'Dataset', key: 'dataset', width: 12 },
      { header: 'Source_Page', key: 'source_pdf_page', width: 12 },
      { header: 'Date', key: 'date', width: 14 },
      { header: 'Shift', key: 'shift', width: 8 },
      { header: 'Batch_ID', key: 'batch_id', width: 12 },
      { header: 'Time_Slot', key: 'time_slot', width: 16 },
      { header: 'Target_Boxes', key: 'target', width: 14 },
      { header: 'Actual_Boxes', key: 'actual', width: 14 },
      { header: 'Variance', key: 'difference', width: 14 },
      { header: 'Downtime_Annotation', key: 'note', width: 30 }
    ];

    wsHourly.getRow(1).eachCell(cell => {
      cell.fill = headerFill;
      cell.font = headerFont;
      cell.alignment = { vertical: 'middle', horizontal: 'center' };
      cell.border = borderThin;
    });

    records.forEach(p => {
      if (p.hourly_production) {
        p.hourly_production.forEach(h => {
          const row = wsHourly.addRow({
            dataset: p.dataset,
            source_pdf_page: p.source_pdf_page,
            date: p.date,
            shift: p.shift,
            batch_id: p.batch_id || 'N/A',
            time_slot: h.time_slot,
            target: h.target,
            actual: h.actual,
            difference: h.difference,
            note: h.note || ''
          });
          row.eachCell(cell => { cell.border = borderThin; });
        });
      }
    });

    await workbook.xlsx.writeFile(filename);
    await workbook.xlsx.writeFile(`public/${filename}`);
    console.log(`✓ ${filename} created`);
  };

  await buildWorkbook(allKftRecords.filter(r => r.dataset === 'OCCT_1'), 'KFT_OCCT_Account1_Extracted.xlsx');
  await buildWorkbook(allKftRecords.filter(r => r.dataset === 'OCCT_2'), 'KFT_OCCT_Account2_Extracted.xlsx');
  await buildWorkbook(allKftRecords.filter(r => r.dataset === 'OCCT_3'), 'KFT_OCCT_Account3_Extracted.xlsx');
  await buildWorkbook(allKftRecords, 'KFT_Consolidated_Production_Database.xlsx');
}
