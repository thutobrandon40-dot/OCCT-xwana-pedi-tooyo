import { kftPagesData, KFTPageRecord } from './kft_data';
import { kftOcct2Data } from './kft_occt2_data';
import { kftOcct3Data } from './kft_occt3_data';

export interface ExtendedKFTPageRecord extends KFTPageRecord {
  dataset: 'OCCT_1' | 'OCCT_2' | 'OCCT_3';
  source_pdf_page: number;
}

export const allKftRecords: ExtendedKFTPageRecord[] = [
  ...kftPagesData.map(r => ({
    ...r,
    dataset: 'OCCT_1' as const,
    source_pdf_page: r.page_no
  })),
  ...kftOcct2Data.map(r => ({
    ...r,
    dataset: 'OCCT_2' as const,
    source_pdf_page: r.page_no - 76 // 1 to 30
  })),
  ...kftOcct3Data.map(r => ({
    ...r,
    dataset: 'OCCT_3' as const,
    source_pdf_page: r.page_no - 106 // 1 to 64
  }))
];
