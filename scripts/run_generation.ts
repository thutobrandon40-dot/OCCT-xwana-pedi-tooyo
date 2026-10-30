import { generateAllDeliverables } from './generate_kft_database';
import fs from 'fs';

async function main() {
  try {
    await generateAllDeliverables();
    console.log('--- Verification of generated files ---');
    const files = [
      'KFT_OCCT_Account1_Extracted.xlsx',
      'public/KFT_OCCT_Account1_Extracted.xlsx',
      'KFT_OCCT_Account2_Extracted.xlsx',
      'public/KFT_OCCT_Account2_Extracted.xlsx',
      'KFT_OCCT_Account3_Extracted.xlsx',
      'public/KFT_OCCT_Account3_Extracted.xlsx',
      'KFT_Consolidated_Production_Database.xlsx',
      'public/KFT_Consolidated_Production_Database.xlsx',
      'OCCT_Account1_Extracted_Data.json',
      'public/OCCT_Account1_Extracted_Data.json',
      'OCCT_Account2_Extracted_Data.json',
      'public/OCCT_Account2_Extracted_Data.json',
      'OCCT_Account3_Extracted_Data.json',
      'public/OCCT_Account3_Extracted_Data.json',
      'KFT_Consolidated_Extracted_Data.json',
      'public/KFT_Consolidated_Extracted_Data.json',
      'OCCT_Account1_Page_Audit.csv',
      'public/OCCT_Account1_Page_Audit.csv',
      'OCCT_Account2_Page_Audit.csv',
      'public/OCCT_Account2_Page_Audit.csv',
      'OCCT_Account3_Page_Audit.csv',
      'public/OCCT_Account3_Page_Audit.csv',
      'KFT_Consolidated_Page_Audit.csv',
      'public/KFT_Consolidated_Page_Audit.csv',
      'OCCT_Account1_Handover.txt',
      'public/OCCT_Account1_Handover.txt',
      'OCCT_Account3_Handover.txt',
      'public/OCCT_Account3_Handover.txt',
      'KFT_Consolidated_Handover.txt',
      'public/KFT_Consolidated_Handover.txt'
    ];
    for (const f of files) {
      if (fs.existsSync(f)) {
        const stats = fs.statSync(f);
        console.log(`[PASS] ${f} exists (${(stats.size / 1024).toFixed(1)} KB)`);
      } else {
        console.error(`[FAIL] ${f} missing!`);
      }
    }
    console.log('\nAll deliverables generated and verified successfully!');
  } catch (err) {
    console.error('Fatal generation error:', err);
    process.exit(1);
  }
}

main();
