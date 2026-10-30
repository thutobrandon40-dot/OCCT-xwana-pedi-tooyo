// Master Dataset for KFT Production Database OCCT_1.pdf (Pages 1 to 76)

export interface HourlySlot {
  time_slot: string;
  target: number;
  actual: number;
  difference: number | string;
  note?: string;
}

export interface QCInspection {
  time: string;
  min_mm?: number;
  max_mm?: number;
  squareness_mm?: number;
  edges: string;
  color: string;
  surface: string;
  status: string;
}

export interface Incident {
  category: string;
  description: string;
  impact?: string;
}

export interface KFTPageRecord {
  page_no: number;
  date: string;
  shift: string;
  batch_id: string;
  color: string;
  thickness_nominal_mm: string;
  thickness_range?: string;
  cpw_kg?: number;
  line_speed_hz?: string;
  mixer_operator?: string;
  checked_by_qai?: string;
  supervisor?: string;
  target_total_boxes: number;
  actual_total_boxes: number;
  box_difference_total: number;
  has_production_data: boolean;
  transcription_issues: boolean;
  verification_status: 'VERIFIED' | 'REVIEW' | 'ILLEGIBLE' | 'MISSING' | 'CONFLICT';
  verification_notes?: string;
  remarks?: string;
  hourly_production?: HourlySlot[];
  inspections?: QCInspection[];
  incidents?: Incident[];
}

export const kftPagesData: KFTPageRecord[] = [
  // Page 1
  {
    page_no: 1,
    date: '28/10/2026',
    shift: 'C',
    batch_id: '40405',
    color: 'CL12',
    thickness_nominal_mm: '2.00mm',
    thickness_range: '1.87-2.13',
    cpw_kg: 79,
    line_speed_hz: '40',
    mixer_operator: 'ALFRED',
    checked_by_qai: 'SENTLE',
    supervisor: 'DANIEL',
    target_total_boxes: 288,
    actual_total_boxes: 173,
    box_difference_total: -115,
    has_production_data: true,
    transcription_issues: false,
    verification_status: 'VERIFIED',
    verification_notes: '04:00-05:00 actual output written as 22/26; totals reconcile with actual sum 173.',
    remarks: '1. Colour change. 2. No thickness change. 3. Slight shade variation observed on boxes 24-32 separated to another pallet (9 boxes) with the balance pallet.',
    hourly_production: [
      { time_slot: '22:00-23:00', target: 36, actual: 24, difference: -12 },
      { time_slot: '23:00-00:00', target: 36, actual: 28, difference: -8 },
      { time_slot: '00:00-01:00', target: 36, actual: 24, difference: -12 },
      { time_slot: '01:00-02:00', target: 36, actual: 20, difference: -16 },
      { time_slot: '02:00-03:00', target: 36, actual: 17, difference: -19 },
      { time_slot: '03:00-04:00', target: 36, actual: 24, difference: -12 },
      { time_slot: '04:00-05:00', target: 36, actual: 22, difference: -14 },
      { time_slot: '05:00-06:00', target: 36, actual: 14, difference: 'changing colour' }
    ],
    inspections: [
      { time: '22:25', min_mm: 1.94, max_mm: 1.98, squareness_mm: 0.10, edges: 'Complies', color: 'No', surface: 'Complies', status: 'WITHIN_TOLERANCE' },
      { time: '22:50', min_mm: 1.93, max_mm: 1.96, squareness_mm: 0.06, edges: 'Complies', color: 'Slight shade variation', surface: 'Complies', status: 'WITHIN_TOLERANCE' },
      { time: '23:15', min_mm: 1.90, max_mm: 1.93, squareness_mm: 0.08, edges: 'Complies', color: 'No', surface: 'Complies', status: 'WITHIN_TOLERANCE' },
      { time: '23:40', min_mm: 1.92, max_mm: 1.97, squareness_mm: 0.00, edges: 'Complies', color: 'No', surface: 'Complies', status: 'WITHIN_TOLERANCE' },
      { time: '00:05', min_mm: 1.94, max_mm: 1.96, squareness_mm: 0.05, edges: 'Complies', color: 'No', surface: 'Complies', status: 'WITHIN_TOLERANCE' },
      { time: '00:30', min_mm: 1.92, max_mm: 1.95, squareness_mm: 0.08, edges: 'Complies', color: 'No', surface: 'Complies', status: 'WITHIN_TOLERANCE' },
      { time: '00:55', min_mm: 1.90, max_mm: 1.97, squareness_mm: 0.07, edges: 'Complies', color: 'No', surface: 'Complies', status: 'WITHIN_TOLERANCE' },
      { time: '01:20', min_mm: 1.95, max_mm: 1.98, squareness_mm: 0.10, edges: 'Complies', color: 'No', surface: 'Complies', status: 'WITHIN_TOLERANCE' },
      { time: '01:45', min_mm: 1.95, max_mm: 1.98, squareness_mm: 0.06, edges: 'Complies', color: 'No', surface: 'Complies', status: 'WITHIN_TOLERANCE' },
      { time: '02:10', min_mm: 1.95, max_mm: 1.99, squareness_mm: 0.02, edges: 'Complies', color: 'No', surface: 'Complies', status: 'WITHIN_TOLERANCE' },
      { time: '02:35', min_mm: 1.90, max_mm: 1.95, squareness_mm: 0.00, edges: 'Complies', color: 'No', surface: 'Complies', status: 'WITHIN_TOLERANCE' },
      { time: '03:00', min_mm: 1.95, max_mm: 1.96, squareness_mm: 0.02, edges: 'Complies', color: 'No', surface: 'Complies', status: 'WITHIN_TOLERANCE' },
      { time: '03:25', min_mm: 1.94, max_mm: 1.98, squareness_mm: 0.00, edges: 'Complies', color: 'No', surface: 'Complies', status: 'WITHIN_TOLERANCE' },
      { time: '03:50', min_mm: 1.90, max_mm: 1.95, squareness_mm: 0.05, edges: 'Complies', color: 'No', surface: 'Complies', status: 'WITHIN_TOLERANCE' },
      { time: '04:15', min_mm: 1.91, max_mm: 1.98, squareness_mm: 0.08, edges: 'Complies', color: 'No', surface: 'Complies', status: 'WITHIN_TOLERANCE' },
      { time: '04:40', min_mm: 1.94, max_mm: 1.97, squareness_mm: 0.10, edges: 'Complies', color: 'No', surface: 'Complies', status: 'WITHIN_TOLERANCE' },
      { time: '05:05', min_mm: 1.95, max_mm: 1.96, squareness_mm: 0.10, edges: 'Complies', color: 'No', surface: 'Complies', status: 'WITHIN_TOLERANCE' },
      { time: '05:30', min_mm: 1.95, max_mm: 1.97, squareness_mm: 0.10, edges: 'Complies', color: 'No', surface: 'Complies', status: 'WITHIN_TOLERANCE' },
      { time: '05:55', min_mm: 2.00, max_mm: 2.00, squareness_mm: 0.10, edges: 'Complies', color: 'CL49 Transition', surface: 'Complies', status: 'WITHIN_TOLERANCE' }
    ],
    incidents: [
      { category: 'Quality Deviation', description: 'Slight shade variation observed on boxes 24-32 (9 boxes quarantined to separate pallet)', impact: 'Pallet segregation' },
      { category: 'Batch Transition', description: 'Transitioning to color CL49 Batch 40415 at 05:55', impact: 'Reduced output final hour' }
    ]
  },

  // Page 2
  {
    page_no: 2,
    date: '28/10/2026',
    shift: 'B',
    batch_id: '9101',
    color: 'marbling',
    thickness_nominal_mm: '2.00mm',
    thickness_range: '1.87-2.13',
    cpw_kg: 48,
    line_speed_hz: '38',
    mixer_operator: 'REFILWE',
    checked_by_qai: 'KARABO',
    supervisor: 'THEMBANI',
    target_total_boxes: 36,
    actual_total_boxes: 12,
    box_difference_total: -24,
    has_production_data: true,
    transcription_issues: false,
    verification_status: 'VERIFIED',
    verification_notes: 'Production was stopped across shift due to lack of marbling feedstock; resumed at 21:35 for 12 boxes.',
    remarks: '1. Colour change. 2. No thickness change.',
    hourly_production: [
      { time_slot: '21:35-22:00', target: 36, actual: 12, difference: -24, note: 'Restart after stoppage' }
    ],
    inspections: [
      { time: '21:30', min_mm: 1.92, max_mm: 1.97, squareness_mm: 0.10, edges: 'Complies', color: 'No', surface: 'Complies', status: 'WITHIN_TOLERANCE' },
      { time: '21:55', min_mm: 1.92, max_mm: 1.97, squareness_mm: 0.10, edges: 'Complies', color: 'No', surface: 'Complies', status: 'WITHIN_TOLERANCE' }
    ],
    incidents: [
      { category: 'Raw Material Delay', description: 'PRODUCTION STOPPED - NO MARBLING feedstock from 14:00 to 21:30', impact: 'Line idle 7.5 hours' }
    ]
  },

  // Page 3
  {
    page_no: 3,
    date: '28/10/2026',
    shift: 'A',
    batch_id: '40395',
    color: 'CL15',
    thickness_nominal_mm: '2.00mm',
    thickness_range: '1.87-2.13',
    cpw_kg: 79,
    line_speed_hz: '40',
    mixer_operator: 'BOAGO',
    checked_by_qai: 'BETTY',
    supervisor: 'Mailo',
    target_total_boxes: 288,
    actual_total_boxes: 167,
    box_difference_total: -121,
    has_production_data: true,
    transcription_issues: false,
    verification_status: 'VERIFIED',
    verification_notes: '12:00-13:00 reduced to 9 boxes due to color change to marbling 2.00 9101; 13:00-14:00 blank.',
    remarks: '1. Colour change. 2. No thickness change. 3. Material fell from mixing mill causing several line cuts.',
    hourly_production: [
      { time_slot: '06:00-07:00', target: 36, actual: 26, difference: -10 },
      { time_slot: '07:00-08:00', target: 36, actual: 24, difference: -12 },
      { time_slot: '08:00-09:00', target: 36, actual: 30, difference: -6 },
      { time_slot: '09:00-10:00', target: 36, actual: 28, difference: -8 },
      { time_slot: '10:00-11:00', target: 36, actual: 24, difference: -12, note: 'Line cut' },
      { time_slot: '11:00-12:00', target: 36, actual: 26, difference: -10 },
      { time_slot: '12:00-13:00', target: 36, actual: 9, difference: 'Colour change marbling 2.00 9101' }
    ],
    inspections: [
      { time: '06:25', min_mm: 1.90, max_mm: 1.97, squareness_mm: 0.08, edges: 'Complies', color: 'No', surface: 'Complies', status: 'WITHIN_TOLERANCE' },
      { time: '06:50', min_mm: 1.94, max_mm: 1.97, squareness_mm: 0.08, edges: 'Complies', color: 'No', surface: 'Complies', status: 'WITHIN_TOLERANCE' },
      { time: '07:15', min_mm: 1.92, max_mm: 1.98, squareness_mm: 0.10, edges: 'Complies', color: 'No', surface: 'Complies', status: 'WITHIN_TOLERANCE' },
      { time: '07:40', min_mm: 1.94, max_mm: 1.97, squareness_mm: 0.00, edges: 'Complies', color: 'No', surface: 'Complies', status: 'WITHIN_TOLERANCE' },
      { time: '08:05', min_mm: 1.94, max_mm: 1.98, squareness_mm: 0.00, edges: 'Complies', color: 'No', surface: 'Complies', status: 'WITHIN_TOLERANCE' },
      { time: '08:30', min_mm: 1.92, max_mm: 1.97, squareness_mm: 0.05, edges: 'Complies', color: 'No', surface: 'Complies', status: 'WITHIN_TOLERANCE' },
      { time: '08:55', min_mm: 1.94, max_mm: 1.99, squareness_mm: 0.10, edges: 'Complies', color: 'No', surface: 'Complies', status: 'WITHIN_TOLERANCE' },
      { time: '09:20', min_mm: 1.93, max_mm: 1.95, squareness_mm: 0.08, edges: 'Complies', color: 'No', surface: 'Complies', status: 'WITHIN_TOLERANCE' },
      { time: '09:45', min_mm: 1.91, max_mm: 1.97, squareness_mm: 0.02, edges: 'Complies', color: 'No', surface: 'Complies', status: 'WITHIN_TOLERANCE' },
      { time: '10:10', min_mm: 1.90, max_mm: 1.95, squareness_mm: 0.08, edges: 'Complies', color: 'No', surface: 'Complies', status: 'WITHIN_TOLERANCE' },
      { time: '10:35', min_mm: 1.92, max_mm: 1.99, squareness_mm: 0.10, edges: 'Complies', color: 'No', surface: 'Complies', status: 'WITHIN_TOLERANCE' },
      { time: '11:00', min_mm: 1.90, max_mm: 1.97, squareness_mm: 0.02, edges: 'Complies', color: 'No', surface: 'Complies', status: 'WITHIN_TOLERANCE' },
      { time: '11:25', min_mm: 1.94, max_mm: 1.97, squareness_mm: 0.05, edges: 'Complies', color: 'No', surface: 'Complies', status: 'WITHIN_TOLERANCE' },
      { time: '11:50', min_mm: 1.93, max_mm: 1.98, squareness_mm: 0.00, edges: 'Complies', color: 'No', surface: 'Complies', status: 'WITHIN_TOLERANCE' },
      { time: '12:40', min_mm: 1.92, max_mm: 1.96, squareness_mm: 0.08, edges: 'Complies', color: 'No', surface: 'Complies', status: 'WITHIN_TOLERANCE' }
    ],
    incidents: [
      { category: 'Line Cut', description: 'Material fell from mixing mill causing several line cuts', impact: 'Output shortfall' }
    ]
  },

  // Page 4
  {
    page_no: 4,
    date: '27/10/2026',
    shift: 'C',
    batch_id: '5265',
    color: '207',
    thickness_nominal_mm: '2.50mm',
    thickness_range: '2.37-2.63',
    cpw_kg: 90.5,
    line_speed_hz: '32/41',
    mixer_operator: 'ALFRED',
    checked_by_qai: 'SENTLE',
    supervisor: 'DANIEL',
    target_total_boxes: 288,
    actual_total_boxes: 186,
    box_difference_total: -102,
    has_production_data: true,
    transcription_issues: false,
    verification_status: 'VERIFIED',
    verification_notes: 'Surface roughness noted on first sample 22:25.',
    remarks: '1. No colour change. 2. Thickness change. 3. Material falling at mixing mill causing low production.',
    hourly_production: [
      { time_slot: '22:00-23:00', target: 36, actual: 17, difference: -19 },
      { time_slot: '23:00-00:00', target: 36, actual: 36, difference: 0 },
      { time_slot: '00:00-01:00', target: 36, actual: 22, difference: -14 },
      { time_slot: '01:00-02:00', target: 36, actual: 26, difference: -10 },
      { time_slot: '02:00-03:00', target: 36, actual: 28, difference: -8 },
      { time_slot: '03:00-04:00', target: 36, actual: 26, difference: -10 },
      { time_slot: '04:00-05:00', target: 36, actual: 18, difference: -18 },
      { time_slot: '05:00-06:00', target: 36, actual: 13, difference: 'changing thickness' }
    ],
    inspections: [
      { time: '22:25', min_mm: 2.45, max_mm: 2.46, squareness_mm: 0.10, edges: 'Complies', color: 'No', surface: 'Rough', status: 'WITHIN_TOLERANCE' },
      { time: '22:50', min_mm: 2.42, max_mm: 2.45, squareness_mm: 0.06, edges: 'Complies', color: 'No', surface: 'Complies', status: 'WITHIN_TOLERANCE' },
      { time: '23:15', min_mm: 2.40, max_mm: 2.45, squareness_mm: 0.08, edges: 'Complies', color: 'No', surface: 'Complies', status: 'WITHIN_TOLERANCE' },
      { time: '23:40', min_mm: 2.44, max_mm: 2.49, squareness_mm: 0.10, edges: 'Complies', color: 'No', surface: 'Complies', status: 'WITHIN_TOLERANCE' },
      { time: '00:05', min_mm: 2.44, max_mm: 2.45, squareness_mm: 0.08, edges: 'Complies', color: 'No', surface: 'Complies', status: 'WITHIN_TOLERANCE' },
      { time: '00:30', min_mm: 2.46, max_mm: 2.50, squareness_mm: 0.06, edges: 'Complies', color: 'No', surface: 'Complies', status: 'WITHIN_TOLERANCE' },
      { time: '00:55', min_mm: 2.45, max_mm: 2.50, squareness_mm: 0.02, edges: 'Complies', color: 'No', surface: 'Complies', status: 'WITHIN_TOLERANCE' },
      { time: '01:20', min_mm: 2.40, max_mm: 2.45, squareness_mm: 0.08, edges: 'Complies', color: 'No', surface: 'Complies', status: 'WITHIN_TOLERANCE' },
      { time: '01:45', min_mm: 2.43, max_mm: 2.48, squareness_mm: 0.05, edges: 'Complies', color: 'No', surface: 'Complies', status: 'WITHIN_TOLERANCE' },
      { time: '02:10', min_mm: 2.43, max_mm: 2.47, squareness_mm: 0.05, edges: 'Complies', color: 'No', surface: 'Complies', status: 'WITHIN_TOLERANCE' },
      { time: '02:35', min_mm: 2.45, max_mm: 2.50, squareness_mm: 0.10, edges: 'Complies', color: 'No', surface: 'Complies', status: 'WITHIN_TOLERANCE' },
      { time: '03:00', min_mm: 2.45, max_mm: 2.48, squareness_mm: 0.10, edges: 'Complies', color: 'No', surface: 'Complies', status: 'WITHIN_TOLERANCE' },
      { time: '03:25', min_mm: 2.45, max_mm: 2.47, squareness_mm: 0.00, edges: 'Complies', color: 'No', surface: 'Complies', status: 'WITHIN_TOLERANCE' },
      { time: '03:50', min_mm: 2.42, max_mm: 2.45, squareness_mm: 0.10, edges: 'Complies', color: 'No', surface: 'Complies', status: 'WITHIN_TOLERANCE' },
      { time: '04:15', min_mm: 2.45, max_mm: 2.49, squareness_mm: 0.03, edges: 'Complies', color: 'No', surface: 'Complies', status: 'WITHIN_TOLERANCE' },
      { time: '04:40', min_mm: 2.43, max_mm: 2.45, squareness_mm: 0.05, edges: 'Complies', color: 'No', surface: 'Complies', status: 'WITHIN_TOLERANCE' },
      { time: '05:05', min_mm: 2.41, max_mm: 2.45, squareness_mm: 0.08, edges: 'Complies', color: 'No', surface: 'Complies', status: 'WITHIN_TOLERANCE' },
      { time: '05:30', min_mm: 2.00, max_mm: 2.00, squareness_mm: 0.10, edges: 'Complies', color: 'CL15 transition', surface: 'Complies', status: 'WITHIN_TOLERANCE' }
    ],
    incidents: [
      { category: 'Mixing Mill', description: 'Material falling at mixing mill causing low production', impact: 'Reduced throughput' }
    ]
  },

  // Page 5
  {
    page_no: 5,
    date: '27/10/2026',
    shift: 'B',
    batch_id: '5265',
    color: '207',
    thickness_nominal_mm: '2.50mm',
    thickness_range: '2.37-2.63',
    cpw_kg: 90.5,
    line_speed_hz: '34',
    mixer_operator: 'BOAGO',
    checked_by_qai: 'KARABO',
    supervisor: 'THEMBANI',
    target_total_boxes: 288,
    actual_total_boxes: 177,
    box_difference_total: -111,
    has_production_data: true,
    transcription_issues: false,
    verification_status: 'VERIFIED',
    verification_notes: 'Shade variation noted on boxes 128-180.',
    remarks: '1. No colour change. 2. No thickness change. 3. Slight shade variation (light) observed from box 128-180. 4. Material fell from mixing mill causing several line cuts.',
    hourly_production: [
      { time_slot: '14:00-15:00', target: 36, actual: 18, difference: -18, note: 'Line cut' },
      { time_slot: '15:00-16:00', target: 36, actual: 24, difference: -12 },
      { time_slot: '16:00-17:00', target: 36, actual: 28, difference: -8 },
      { time_slot: '17:00-18:00', target: 36, actual: 24, difference: -12 },
      { time_slot: '18:00-19:00', target: 36, actual: 24, difference: -12, note: 'Line cut' },
      { time_slot: '19:00-20:00', target: 36, actual: 18, difference: -18 },
      { time_slot: '20:00-21:00', target: 36, actual: 20, difference: -16 },
      { time_slot: '21:00-22:00', target: 36, actual: 21, difference: -15 }
    ],
    incidents: [
      { category: 'Quality Deviation', description: 'Light shade variation observed on boxes 128-180', impact: 'Batch segregation' },
      { category: 'Line Cut', description: 'Material fell from mixing mill causing multiple line cuts', impact: 'Output reduction' }
    ]
  },

  // Page 6
  {
    page_no: 6,
    date: '27/10/2026',
    shift: 'A',
    batch_id: '5255',
    color: '204',
    thickness_nominal_mm: '2.00mm',
    thickness_range: '1.87-2.13',
    cpw_kg: 79,
    line_speed_hz: '44',
    mixer_operator: 'BOAGO',
    checked_by_qai: 'BETTY',
    supervisor: 'Mailo',
    target_total_boxes: 288,
    actual_total_boxes: 160,
    box_difference_total: -128,
    has_production_data: true,
    transcription_issues: false,
    verification_status: 'VERIFIED',
    verification_notes: '11:25-12:15 Knives changed.',
    remarks: '1. Colour change. 2. Thickness change. 3. Several line cuts due to material fall from mixing mill.',
    hourly_production: [
      { time_slot: '06:00-07:00', target: 36, actual: 20, difference: 'in 30 mins' },
      { time_slot: '07:00-08:00', target: 36, actual: 24, difference: -12 },
      { time_slot: '08:00-09:00', target: 36, actual: 16, difference: 'No marbling' },
      { time_slot: '09:00-10:00', target: 36, actual: 30, difference: -6 },
      { time_slot: '10:00-11:00', target: 36, actual: 18, difference: 'Colour & thickness change' },
      { time_slot: '11:00-12:00', target: 36, actual: 11, difference: 'Changing knives' },
      { time_slot: '12:00-13:00', target: 36, actual: 20, difference: 'in 25 mins' },
      { time_slot: '13:00-14:00', target: 36, actual: 29, difference: -7 }
    ],
    incidents: [
      { category: 'Tooling / Knives', description: 'Punching press knives changed between 11:25 and 12:15', impact: '50 min line stoppage' }
    ]
  },

  // Page 7
  {
    page_no: 7,
    date: '26/10/2026',
    shift: 'C',
    batch_id: '5245',
    color: '202',
    thickness_nominal_mm: '2.00mm',
    thickness_range: '1.87-2.13',
    cpw_kg: 79,
    line_speed_hz: '41',
    mixer_operator: 'ALFRED',
    checked_by_qai: 'MATSHIDISO',
    supervisor: 'DANIEL',
    target_total_boxes: 288,
    actual_total_boxes: 251,
    box_difference_total: -37,
    has_production_data: true,
    transcription_issues: false,
    verification_status: 'VERIFIED',
    remarks: '1. No thickness change and colour change.',
    hourly_production: [
      { time_slot: '22:00-23:00', target: 36, actual: 32, difference: -4 },
      { time_slot: '23:00-00:00', target: 36, actual: 31, difference: -5 },
      { time_slot: '00:00-01:00', target: 36, actual: 28, difference: -8 },
      { time_slot: '01:00-02:00', target: 36, actual: 36, difference: 0 },
      { time_slot: '02:00-03:00', target: 36, actual: 28, difference: -8 },
      { time_slot: '03:00-04:00', target: 36, actual: 32, difference: -4 },
      { time_slot: '04:00-05:00', target: 36, actual: 28, difference: -8 },
      { time_slot: '05:00-06:00', target: 36, actual: 36, difference: 0 }
    ]
  },

  // Page 8
  {
    page_no: 8,
    date: '26/10/2026',
    shift: 'B',
    batch_id: '5245',
    color: '202',
    thickness_nominal_mm: '2.00mm',
    thickness_range: '1.87-2.13',
    cpw_kg: 79,
    line_speed_hz: '41',
    mixer_operator: 'REFILWE',
    checked_by_qai: 'KARABO',
    supervisor: 'THEMBANI',
    target_total_boxes: 288,
    actual_total_boxes: 223,
    box_difference_total: -65,
    has_production_data: true,
    transcription_issues: false,
    verification_status: 'VERIFIED',
    remarks: '1. No colour change. 2. No thickness change.',
    hourly_production: [
      { time_slot: '14:00-15:00', target: 36, actual: 31, difference: -5, note: 'Line cut' },
      { time_slot: '15:00-16:00', target: 36, actual: 24, difference: -12 },
      { time_slot: '16:00-17:00', target: 36, actual: 26, difference: -10 },
      { time_slot: '17:00-18:00', target: 36, actual: 30, difference: -6, note: 'Line cuts' },
      { time_slot: '18:00-19:00', target: 36, actual: 24, difference: -12 },
      { time_slot: '19:00-20:00', target: 36, actual: 32, difference: -4, note: 'Line cut' },
      { time_slot: '20:00-21:00', target: 36, actual: 24, difference: -12 },
      { time_slot: '21:00-22:00', target: 36, actual: 32, difference: -4 }
    ]
  },

  // Page 9
  {
    page_no: 9,
    date: '26/10/2026',
    shift: 'A',
    batch_id: '5235',
    color: 'VT38',
    thickness_nominal_mm: '2.50mm',
    thickness_range: '2.37-2.63',
    cpw_kg: 80,
    line_speed_hz: '35',
    mixer_operator: 'REFILWE',
    checked_by_qai: 'BETTY',
    supervisor: 'Mailo',
    target_total_boxes: 288,
    actual_total_boxes: 168,
    box_difference_total: -120,
    has_production_data: true,
    transcription_issues: false,
    verification_status: 'VERIFIED',
    remarks: '1. Colour change. 2. Thickness change. 3. Material fell from mixing mill causing several line cuts.',
    hourly_production: [
      { time_slot: '06:00-07:00', target: 36, actual: 10, difference: 'in 25 mins' },
      { time_slot: '07:00-08:00', target: 36, actual: 9, difference: 'colour + thickness change in 50 mins' },
      { time_slot: '08:00-09:00', target: 36, actual: 20, difference: 'Line cut' },
      { time_slot: '09:00-10:00', target: 36, actual: 28, difference: -8 },
      { time_slot: '10:00-11:00', target: 36, actual: 26, difference: -10 },
      { time_slot: '11:00-12:00', target: 36, actual: 26, difference: -10 },
      { time_slot: '12:00-13:00', target: 36, actual: 22, difference: -14 },
      { time_slot: '13:00-14:00', target: 36, actual: 27, difference: -9 }
    ]
  },

  // Page 10
  {
    page_no: 10,
    date: '23/10/2026',
    shift: 'C',
    batch_id: '5235',
    color: 'VT38',
    thickness_nominal_mm: '2.50mm',
    thickness_range: '2.37-2.63',
    cpw_kg: 79,
    line_speed_hz: '34',
    mixer_operator: 'BOAGO',
    checked_by_qai: 'KARABO',
    supervisor: 'THEMBANI',
    target_total_boxes: 288,
    actual_total_boxes: 210,
    box_difference_total: -78,
    has_production_data: true,
    transcription_issues: false,
    verification_status: 'VERIFIED',
    remarks: '1. No colour change. 2. No thickness change.',
    hourly_production: [
      { time_slot: '22:00-23:00', target: 36, actual: 20, difference: -16, note: 'Line cuts' },
      { time_slot: '23:00-00:00', target: 36, actual: 24, difference: -12 },
      { time_slot: '00:00-01:00', target: 36, actual: 28, difference: -8 },
      { time_slot: '01:00-02:00', target: 36, actual: 32, difference: -4 },
      { time_slot: '02:00-03:00', target: 36, actual: 32, difference: -4 },
      { time_slot: '03:00-04:00', target: 36, actual: 24, difference: -12 },
      { time_slot: '04:00-05:00', target: 36, actual: 24, difference: -12 },
      { time_slot: '05:00-06:00', target: 36, actual: 26, difference: -10 }
    ]
  },

  // Page 11
  {
    page_no: 11,
    date: '23/10/2026',
    shift: 'B',
    batch_id: '5235',
    color: 'VT38',
    thickness_nominal_mm: '2.50mm',
    thickness_range: '2.37-2.63',
    cpw_kg: 80,
    line_speed_hz: '35',
    mixer_operator: 'ALFRED',
    checked_by_qai: 'BETTY',
    supervisor: 'Mailo',
    target_total_boxes: 288,
    actual_total_boxes: 204,
    box_difference_total: -84,
    has_production_data: true,
    transcription_issues: false,
    verification_status: 'VERIFIED',
    remarks: '1. No colour change. 2. No thickness change. 3. Material fell from mixing mill causing several line cuts. 4. Inconsistent shade.',
    hourly_production: [
      { time_slot: '14:00-15:00', target: 36, actual: 32, difference: 'changing knives' },
      { time_slot: '15:00-16:00', target: 36, actual: 30, difference: -6 },
      { time_slot: '16:00-17:00', target: 36, actual: 26, difference: 'Line cut' },
      { time_slot: '17:00-18:00', target: 36, actual: 30, difference: -6 },
      { time_slot: '18:00-19:00', target: 36, actual: 32, difference: -4 },
      { time_slot: '19:00-20:00', target: 36, actual: 24, difference: 'Line cut' },
      { time_slot: '20:00-21:00', target: 36, actual: 30, difference: -6 },
      { time_slot: '21:00-22:00', target: 36, actual: 30, difference: -6 }
    ]
  },

  // Page 12
  {
    page_no: 12,
    date: '23/10/2026',
    shift: 'A',
    batch_id: '5225',
    color: '202',
    thickness_nominal_mm: '2.00mm',
    thickness_range: '1.87-2.13',
    cpw_kg: 79,
    mixer_operator: 'ALFRED',
    checked_by_qai: 'MATSHIDISO',
    supervisor: 'DANIEL',
    target_total_boxes: 288,
    actual_total_boxes: 183,
    box_difference_total: -105,
    has_production_data: true,
    transcription_issues: false,
    verification_status: 'REVIEW',
    verification_notes: 'Hourly table unsummed in footer; row sums = 183; order replacement of 15 boxes noted in remarks.',
    remarks: '1. Colour change. 2. Slight shade variation observed from box 69 to 82. QC Manager to review shade for approval. Separated box 70->82 (reserved them for recycling) and replaced with CL14 2.00 39245 (15 boxes) from dispatch to complete the order of 84 boxes. 3. Changing Punching Press Knives at 13:55.',
    hourly_production: [
      { time_slot: '06:00-07:00', target: 36, actual: 32, difference: -4 },
      { time_slot: '07:00-08:00', target: 36, actual: 26, difference: -10 },
      { time_slot: '08:00-09:00', target: 36, actual: 26, difference: -10 },
      { time_slot: '09:00-10:00', target: 36, actual: 29, difference: -7 },
      { time_slot: '10:00-11:00', target: 36, actual: 19, difference: 'Colour change' },
      { time_slot: '11:00-12:00', target: 36, actual: 24, difference: -12 },
      { time_slot: '12:00-13:00', target: 36, actual: 27, difference: -9 }
    ]
  },

  // Page 13
  {
    page_no: 13,
    date: '22/10/2026',
    shift: 'C',
    batch_id: '5225',
    color: '202',
    thickness_nominal_mm: '2.00mm',
    thickness_range: '1.87-2.13',
    cpw_kg: 79,
    line_speed_hz: '41',
    mixer_operator: 'REFILWE',
    checked_by_qai: 'KARABO',
    supervisor: 'THEMBANI',
    target_total_boxes: 237,
    actual_total_boxes: 174,
    box_difference_total: -63,
    has_production_data: true,
    transcription_issues: false,
    verification_status: 'VERIFIED',
    remarks: '1. No colour change. 2. No thickness change. 3. Production started late because of the combi.',
    hourly_production: [
      { time_slot: '23:25-00:00', target: 20, actual: 16, difference: 'Line cut' },
      { time_slot: '00:00-01:00', target: 36, actual: 20, difference: 'Line cuts -16' },
      { time_slot: '01:00-02:00', target: 36, actual: 24, difference: 'Line cuts -12' },
      { time_slot: '02:00-03:00', target: 36, actual: 30, difference: -6 },
      { time_slot: '03:00-04:00', target: 36, actual: 26, difference: -10 },
      { time_slot: '04:00-05:00', target: 36, actual: 26, difference: -10 },
      { time_slot: '05:00-06:00', target: 36, actual: 28, difference: -8 }
    ]
  },

  // Page 14
  {
    page_no: 14,
    date: '22/10/2026',
    shift: 'B',
    batch_id: '9212',
    color: 'MARBLING',
    thickness_nominal_mm: '2.00mm',
    thickness_range: '1.87-2.13',
    cpw_kg: 50,
    line_speed_hz: '34',
    mixer_operator: 'BOAGO',
    checked_by_qai: 'BETTY',
    supervisor: 'Mailo',
    target_total_boxes: 288,
    actual_total_boxes: 140,
    box_difference_total: -148,
    has_production_data: true,
    transcription_issues: false,
    verification_status: 'VERIFIED',
    remarks: '1. No colour change. 2. No thickness change. 3. Material fell from mixing mill causing several line cuts.',
    hourly_production: [
      { time_slot: '16:00-17:00', target: 36, actual: 12, difference: 'in 30 mins' },
      { time_slot: '17:00-18:00', target: 36, actual: 28, difference: 'Line cut -8' },
      { time_slot: '18:00-19:00', target: 36, actual: 26, difference: -10 },
      { time_slot: '19:00-20:00', target: 36, actual: 30, difference: -6 },
      { time_slot: '20:00-21:00', target: 36, actual: 24, difference: 'Line cuts' },
      { time_slot: '21:00-22:00', target: 36, actual: 20, difference: -16 }
    ]
  },

  // Page 15
  {
    page_no: 15,
    date: '22/10/2026',
    shift: 'A',
    batch_id: '40365',
    color: 'Q14',
    thickness_nominal_mm: '2.50mm',
    thickness_range: '2.37-2.63',
    cpw_kg: 80,
    line_speed_hz: '31',
    mixer_operator: 'ALFRED',
    checked_by_qai: 'MATSHIDISO',
    supervisor: 'DANIEL',
    target_total_boxes: 252,
    actual_total_boxes: 135,
    box_difference_total: -117,
    has_production_data: true,
    transcription_issues: false,
    verification_status: 'REVIEW',
    verification_notes: 'Footer total boxes missing; sum of actual hours (18+20+28+32+29+24) = 151 (or 135 depending on 10:00-11:00 index reading).',
    remarks: '1. No colour change. 2. Thickness change.',
    hourly_production: [
      { time_slot: '06:00-07:00', target: 36, actual: 18, difference: -18 },
      { time_slot: '08:00-09:00', target: 36, actual: 20, difference: -16 },
      { time_slot: '09:00-10:00', target: 36, actual: 28, difference: -8 },
      { time_slot: '10:00-11:00', target: 36, actual: 32, difference: -4 },
      { time_slot: '11:00-12:00', target: 36, actual: 29, difference: -7 },
      { time_slot: '12:00-13:00', target: 36, actual: 24, difference: -12 }
    ]
  },

  // Page 16
  {
    page_no: 16,
    date: '21/10/2026',
    shift: 'C',
    batch_id: '40365',
    color: 'Q14',
    thickness_nominal_mm: '2.50mm',
    thickness_range: '2.37-2.63',
    cpw_kg: 80,
    line_speed_hz: '31',
    mixer_operator: 'REFILWE',
    checked_by_qai: 'KARABO',
    supervisor: 'THEMBANI',
    target_total_boxes: 288,
    actual_total_boxes: 190,
    box_difference_total: -98,
    has_production_data: true,
    transcription_issues: false,
    verification_status: 'VERIFIED',
    remarks: '1. No colour change. 2. No thickness change. 3. Material fell from mixing mill causing several line cuts.',
    hourly_production: [
      { time_slot: '22:00-23:00', target: 36, actual: 19, difference: 'Line cuts -17' },
      { time_slot: '23:00-00:00', target: 36, actual: 24, difference: 'Line cuts -12' },
      { time_slot: '00:00-01:00', target: 36, actual: 19, difference: -17 },
      { time_slot: '01:00-02:00', target: 36, actual: 30, difference: -6 },
      { time_slot: '02:00-03:00', target: 36, actual: 24, difference: -12 },
      { time_slot: '03:00-04:00', target: 36, actual: 24, difference: -12 },
      { time_slot: '04:00-05:00', target: 36, actual: 24, difference: -12 },
      { time_slot: '05:00-06:00', target: 36, actual: 26, difference: -10 }
    ],
    incidents: [
      { category: 'Breakdown', description: 'Breakdown at mixing mill at 04:15, restarted at 05:05', impact: '50 min line stoppage' }
    ]
  },

  // Page 17
  {
    page_no: 17,
    date: '21/10/2026',
    shift: 'B',
    batch_id: '40365',
    color: 'Q14',
    thickness_nominal_mm: '2.50mm',
    thickness_range: '2.37-2.63',
    cpw_kg: 80,
    line_speed_hz: '33',
    mixer_operator: 'BOAGO',
    checked_by_qai: 'BETTY',
    supervisor: 'Mailo',
    target_total_boxes: 288,
    actual_total_boxes: 187,
    box_difference_total: -65,
    has_production_data: true,
    transcription_issues: false,
    verification_status: 'VERIFIED',
    remarks: '1. No colour change. 2. No thickness change. 3. Pin hole observed, knives were changed, then tiles were much better after that.',
    hourly_production: [
      { time_slot: '14:00-15:00', target: 36, actual: 32, difference: -4 },
      { time_slot: '15:00-16:00', target: 36, actual: 28, difference: -8 },
      { time_slot: '16:00-17:00', target: 36, actual: 10, difference: 'changing knives in 15 mins' },
      { time_slot: '17:00-18:00', target: 36, actual: 32, difference: -4 },
      { time_slot: '18:00-19:00', target: 36, actual: 26, difference: -10 },
      { time_slot: '19:00-20:00', target: 36, actual: 30, difference: -6 },
      { time_slot: '20:00-21:00', target: 36, actual: 29, difference: -7 }
    ]
  },

  // Page 18
  {
    page_no: 18,
    date: '21/10/2026',
    shift: 'A',
    batch_id: '40365',
    color: 'Q14',
    thickness_nominal_mm: '2.50mm',
    thickness_range: '2.37-2.63',
    cpw_kg: 80,
    mixer_operator: 'ALFRED',
    checked_by_qai: 'MATSHIDISO',
    supervisor: 'DANIEL',
    target_total_boxes: 288,
    actual_total_boxes: 136,
    box_difference_total: -152,
    has_production_data: true,
    transcription_issues: false,
    verification_status: 'REVIEW',
    verification_notes: '136 boxes rejected due to incorrect marbling setting.',
    remarks: '1. Q14 2.50mm 40365 136 boxes rejected and kept as stock due to incorrect marbling setting resulting in a marbling pattern that did not meet the required quality standard & specification. 2. No colour and thickness change.',
    hourly_production: [
      { time_slot: '06:00-07:00', target: 36, actual: 27, difference: 'Several line cuts' },
      { time_slot: '07:00-08:00', target: 36, actual: 20, difference: -16 },
      { time_slot: '08:00-09:00', target: 36, actual: 24, difference: 'Line cuts' },
      { time_slot: '09:00-10:00', target: 36, actual: 20, difference: -16 },
      { time_slot: '10:00-11:00', target: 36, actual: 28, difference: -8 }
    ],
    incidents: [
      { category: 'Major Quality Rejection', description: '136 boxes rejected & kept as stock due to incorrect marbling pattern setting', impact: 'Stock rejection / quarantine' }
    ]
  },

  // Page 19
  {
    page_no: 19,
    date: '20/10/2026',
    shift: 'C',
    batch_id: '9215',
    color: 'MARBLING',
    thickness_nominal_mm: '2.00mm',
    thickness_range: '1.87-2.13',
    cpw_kg: 50,
    line_speed_hz: '34',
    mixer_operator: 'REFILWE',
    checked_by_qai: 'KARABO',
    supervisor: 'THEMBANI',
    target_total_boxes: 144,
    actual_total_boxes: 73,
    box_difference_total: -71,
    has_production_data: true,
    transcription_issues: false,
    verification_status: 'VERIFIED',
    remarks: '1. Colour change. 2. Thickness change. 3. WRONG MARBLING SPEC WAS USED. 36 boxes Rejected and kept as stock. 4. Material fell from mixing mill causing several line cuts.',
    hourly_production: [
      { time_slot: '23:05-00:00', target: 36, actual: 12, difference: 'Line cuts -24' },
      { time_slot: '00:00-01:00', target: 36, actual: 17, difference: 'Line cuts -19' },
      { time_slot: '01:00-02:00', target: 36, actual: 0, difference: 'Production stopped' },
      { time_slot: '04:00-05:00', target: 36, actual: 27, difference: -9 },
      { time_slot: '05:00-06:00', target: 36, actual: 17, difference: -19 }
    ],
    incidents: [
      { category: 'Specification Error', description: 'WRONG MARBLING SPEC WAS USED - 36 boxes rejected and held in stock', impact: 'Batch quarantine' },
      { category: 'Breakdown', description: 'Breakdown at punching press from 01:20 to 03:50', impact: '2.5 hr downtime' }
    ]
  },

  // Page 20
  {
    page_no: 20,
    date: '20/10/2026',
    shift: 'B',
    batch_id: '40335',
    color: 'CL12',
    thickness_nominal_mm: '2.00mm',
    thickness_range: '1.87-2.13',
    cpw_kg: 79,
    line_speed_hz: '43',
    mixer_operator: 'BOAGO',
    checked_by_qai: 'BETTY',
    supervisor: 'Mailo',
    target_total_boxes: 158,
    actual_total_boxes: 104,
    box_difference_total: -54,
    has_production_data: true,
    transcription_issues: false,
    verification_status: 'VERIFIED',
    remarks: '1. Colour change. 2. No thickness change. 3. Material fell from mixing mill causing several line cuts.',
    hourly_production: [
      { time_slot: '14:00-15:00', target: 36, actual: 18, difference: 'in 50 mins' },
      { time_slot: '15:00-16:00', target: 36, actual: 20, difference: 'Line cuts' },
      { time_slot: '16:00-17:00', target: 36, actual: 32, difference: -4 },
      { time_slot: '17:00-18:00', target: 36, actual: 34, difference: -2 },
      { time_slot: '18:00-19:00', target: 16, actual: 0, difference: 'marbling 2.00 9246, changing knives' }
    ]
  },

  // Page 21
  {
    page_no: 21,
    date: '20/10/2026',
    shift: 'A',
    batch_id: '40345',
    color: 'Q10',
    thickness_nominal_mm: '2.00mm',
    thickness_range: '1.87-2.13',
    cpw_kg: 79,
    line_speed_hz: '43',
    mixer_operator: 'ALFRED',
    checked_by_qai: 'MATSHIDISO',
    supervisor: 'Daniel Setswaba',
    target_total_boxes: 180,
    actual_total_boxes: 123,
    box_difference_total: -57,
    has_production_data: true,
    transcription_issues: false,
    verification_status: 'VERIFIED',
    remarks: '1. No thickness change. 2. Colour change. 3. Several line cuts observed.',
    hourly_production: [
      { time_slot: '06:00-07:00', target: 36, actual: 32, difference: -4 },
      { time_slot: '07:00-08:00', target: 36, actual: 13, difference: 'Breakdown at marbling mill' },
      { time_slot: '11:00-12:00', target: 36, actual: 30, difference: -6 },
      { time_slot: '12:00-13:00', target: 36, actual: 20, difference: -16 },
      { time_slot: '13:00-14:00', target: 36, actual: 27, difference: -9 }
    ],
    incidents: [
      { category: 'Breakdown', description: 'Breakdown at marbling mill - replacing gasket from 07:40 to 10:30', impact: 'Nearly 3 hrs stoppage' }
    ]
  },

  // Page 22
  {
    page_no: 22,
    date: '19/10/2026',
    shift: 'C',
    batch_id: '40345',
    color: 'Q10',
    thickness_nominal_mm: '2.00mm',
    thickness_range: '1.87-2.13',
    cpw_kg: 59,
    line_speed_hz: '40',
    mixer_operator: 'REFILWE',
    checked_by_qai: 'KARABO',
    supervisor: 'THEMBANI',
    target_total_boxes: 288,
    actual_total_boxes: 215,
    box_difference_total: -73,
    has_production_data: true,
    transcription_issues: false,
    verification_status: 'VERIFIED',
    remarks: '1. No colour change. 2. No thickness change.',
    hourly_production: [
      { time_slot: '22:30-23:00', target: 36, actual: 16, difference: 'in 30 mins' },
      { time_slot: '23:00-00:00', target: 36, actual: 28, difference: -8 },
      { time_slot: '00:00-01:00', target: 36, actual: 32, difference: -4 },
      { time_slot: '01:00-02:00', target: 36, actual: 28, difference: -8 },
      { time_slot: '02:00-03:00', target: 36, actual: 28, difference: -8 },
      { time_slot: '03:00-04:00', target: 36, actual: 28, difference: -8 },
      { time_slot: '04:00-05:00', target: 36, actual: 32, difference: -4 },
      { time_slot: '05:00-06:00', target: 36, actual: 23, difference: -13 }
    ]
  },

  // Page 23
  {
    page_no: 23,
    date: '19/10/2026',
    shift: 'B',
    batch_id: '9272',
    color: 'MARBLING',
    thickness_nominal_mm: '2.00mm',
    thickness_range: '1.87-2.13',
    cpw_kg: 50,
    line_speed_hz: '35',
    mixer_operator: 'BOAGO',
    checked_by_qai: 'BETTY',
    supervisor: 'Mailo',
    target_total_boxes: 0,
    actual_total_boxes: 0,
    box_difference_total: 0,
    has_production_data: false,
    transcription_issues: false,
    verification_status: 'VERIFIED',
    verification_notes: 'Sheet contains marbling batch setup but no box production logged.',
    remarks: '1. Colour change. 2. No thickness change.'
  },

  // Page 24
  {
    page_no: 24,
    date: '19/10/2026',
    shift: 'A',
    batch_id: 'MAINTENANCE',
    color: 'N/A',
    thickness_nominal_mm: 'N/A',
    target_total_boxes: 0,
    actual_total_boxes: 0,
    box_difference_total: 0,
    has_production_data: false,
    transcription_issues: false,
    verification_status: 'VERIFIED',
    remarks: 'No production - Maintenance going on.',
    checked_by_qai: 'SENTLE',
    supervisor: 'DANIEL'
  },

  // Page 25
  {
    page_no: 25,
    date: '16/10/2026',
    shift: 'C',
    batch_id: '40325',
    color: 'Q14',
    thickness_nominal_mm: '2.00mm',
    thickness_range: '1.87-2.13',
    cpw_kg: 79,
    line_speed_hz: '42',
    mixer_operator: 'BOAGO',
    checked_by_qai: 'BETTY',
    supervisor: 'Mailo',
    target_total_boxes: 288,
    actual_total_boxes: 161,
    box_difference_total: -127,
    has_production_data: true,
    transcription_issues: false,
    verification_status: 'VERIFIED',
    remarks: '1. No thickness change. 2. Production Stopped - fixing auto switch of the punching press because it was loose. 3. Shortage of line operators. 4. Several line cuts due to material fell from mixing mill. 5. Tile 2 of Q10 2.00 40325 failed dimensional stability with a minimum of 299.06 (machine direction).',
    hourly_production: [
      { time_slot: '22:00-23:00', target: 36, actual: 12, difference: 'in 35 mins' },
      { time_slot: '23:00-00:00', target: 36, actual: 24, difference: 'Line cuts' },
      { time_slot: '00:00-01:00', target: 36, actual: 30, difference: -6 },
      { time_slot: '01:00-02:00', target: 36, actual: 22, difference: -14 },
      { time_slot: '02:00-03:00', target: 36, actual: 20, difference: 'Colour change' },
      { time_slot: '03:00-04:00', target: 36, actual: 32, difference: -4 },
      { time_slot: '04:00-05:00', target: 36, actual: 23, difference: 'Line cuts' }
    ],
    incidents: [
      { category: 'Mechanical Breakdown', description: 'Punching press auto switch was loose', impact: 'Line stoppage' },
      { category: 'Quality Failure', description: 'Tile 2 failed dimensional stability (299.06mm)', impact: 'Dimensional compliance defect' }
    ]
  },

  // Page 26
  {
    page_no: 26,
    date: '16/10/2026',
    shift: 'B',
    batch_id: '40295',
    color: 'Q28',
    thickness_nominal_mm: '1.30mm',
    thickness_range: '1.17-1.43',
    cpw_kg: 79,
    line_speed_hz: '50.00',
    mixer_operator: 'ALFRED',
    checked_by_qai: 'SENTLE',
    supervisor: 'DANIEL',
    target_total_boxes: 248,
    actual_total_boxes: 182,
    box_difference_total: -66,
    has_production_data: true,
    transcription_issues: false,
    verification_status: 'VERIFIED',
    remarks: '1. Colour change. 2. Thickness change. 3. Shade variation observed from boxes 31-44 light shade (separated to another pallet).',
    hourly_production: [
      { time_slot: '14:00-15:00', target: 28, actual: 25, difference: -3 },
      { time_slot: '15:00-16:00', target: 28, actual: 15, difference: 'changing colour' },
      { time_slot: '16:00-17:00', target: 28, actual: 23, difference: -5 },
      { time_slot: '17:00-18:00', target: 28, actual: 26, difference: -2 },
      { time_slot: '18:00-19:00', target: 28, actual: 10, difference: 'changing colour' },
      { time_slot: '19:00-20:00', target: 36, actual: 34, difference: -2 },
      { time_slot: '20:00-21:00', target: 36, actual: 31, difference: -5 },
      { time_slot: '21:00-22:00', target: 36, actual: 18, difference: -18 }
    ]
  },

  // Page 27
  {
    page_no: 27,
    date: '16/10/2026',
    shift: 'A',
    batch_id: '40285',
    color: 'Q14',
    thickness_nominal_mm: '1.30mm',
    thickness_range: '1.17-1.43',
    checked_by_qai: 'MATSHIDISO',
    supervisor: 'THEMBANI',
    target_total_boxes: 224,
    actual_total_boxes: 138,
    box_difference_total: -86,
    has_production_data: true,
    transcription_issues: false,
    verification_status: 'VERIFIED',
    remarks: '1. Colour change. 2. No thickness change. (QC Inspector signed as Tshidi / Matshidiso)',
    hourly_production: [
      { time_slot: '06:00-07:00', target: 28, actual: 10, difference: -18 },
      { time_slot: '07:00-08:00', target: 28, actual: 22, difference: -6 },
      { time_slot: '08:00-09:00', target: 28, actual: 18, difference: 'changing pp knives' },
      { time_slot: '09:15-10:00', target: 28, actual: 20, difference: -8 },
      { time_slot: '10:00-11:00', target: 28, actual: 20, difference: -8 },
      { time_slot: '11:00-12:00', target: 28, actual: 6, difference: 'changing colour' },
      { time_slot: '12:00-13:00', target: 28, actual: 21, difference: -7 },
      { time_slot: '13:00-14:00', target: 28, actual: 21, difference: -7 }
    ]
  },

  // Page 28
  {
    page_no: 28,
    date: '15/10/2026',
    shift: 'C',
    batch_id: '40275',
    color: 'CL49',
    thickness_nominal_mm: '2.00mm',
    thickness_range: '1.87-2.13',
    checked_by_qai: 'BETTY',
    supervisor: 'Mailo',
    target_total_boxes: 288,
    actual_total_boxes: 211,
    box_difference_total: -77,
    has_production_data: true,
    transcription_issues: false,
    verification_status: 'VERIFIED',
    remarks: '1. No colour change. 2. No thickness change. 3. Material fell from mixing mill causing several line cuts.',
    hourly_production: [
      { time_slot: '22:00-23:00', target: 36, actual: 30, difference: -6 },
      { time_slot: '23:00-00:00', target: 36, actual: 30, difference: -6 },
      { time_slot: '00:00-01:00', target: 36, actual: 30, difference: -6 },
      { time_slot: '01:00-02:00', target: 36, actual: 28, difference: 'Line cut' },
      { time_slot: '02:00-03:00', target: 36, actual: 30, difference: -6 },
      { time_slot: '03:00-04:00', target: 36, actual: 28, difference: -8 },
      { time_slot: '04:00-05:00', target: 36, actual: 13, difference: 'Line cuts' },
      { time_slot: '05:00-06:00', target: 36, actual: 9, difference: 'Line cuts' }
    ]
  },

  // Page 29
  {
    page_no: 29,
    date: '15/10/2026',
    shift: 'B',
    batch_id: '40265',
    color: 'CL49',
    thickness_nominal_mm: '2.00mm',
    thickness_range: '1.87-2.13',
    cpw_kg: 79,
    line_speed_hz: '40',
    mixer_operator: 'ALFRED',
    checked_by_qai: 'SENTLE',
    supervisor: 'DANIEL',
    target_total_boxes: 288,
    actual_total_boxes: 216,
    box_difference_total: -72,
    has_production_data: true,
    transcription_issues: false,
    verification_status: 'VERIFIED',
    remarks: '1. No colour change. 2. No thickness change. 3. Bluish marbling observed on the tiles.',
    hourly_production: [
      { time_slot: '14:00-15:00', target: 36, actual: 25, difference: -11 },
      { time_slot: '15:00-16:00', target: 36, actual: 28, difference: -8 },
      { time_slot: '16:00-17:00', target: 36, actual: 16, difference: 'changing colour' },
      { time_slot: '17:00-18:00', target: 36, actual: 28, difference: -8 },
      { time_slot: '18:00-19:00', target: 36, actual: 28, difference: -8 },
      { time_slot: '19:00-20:00', target: 36, actual: 28, difference: -8 },
      { time_slot: '20:00-21:00', target: 36, actual: 28, difference: -8 },
      { time_slot: '21:00-22:00', target: 36, actual: 28, difference: -8 }
    ]
  },

  // Page 30
  {
    page_no: 30,
    date: '15/10/2026',
    shift: 'A',
    batch_id: '40265',
    color: 'CL49',
    thickness_nominal_mm: '2.50mm',
    thickness_range: '2.37-2.63',
    cpw_kg: 79,
    line_speed_hz: '40',
    mixer_operator: 'REFILWE',
    checked_by_qai: 'MATSHIDISO',
    supervisor: 'THEMBANI',
    target_total_boxes: 288,
    actual_total_boxes: 194,
    box_difference_total: -94,
    has_production_data: true,
    transcription_issues: false,
    verification_status: 'VERIFIED',
    remarks: '1. Q10 2.00 40255 Box 1-35 rejected because dark shade. Pallet 1 dispatched box 36-194. Pallet 2 box 120-203: 35 boxes was replaced with the balance of KK10 2.00 40255.',
    hourly_production: [
      { time_slot: '06:00-07:00', target: 36, actual: 23, difference: 'thickness change' },
      { time_slot: '07:00-08:00', target: 36, actual: 28, difference: -8 },
      { time_slot: '08:00-09:00', target: 36, actual: 28, difference: -8 },
      { time_slot: '09:00-10:00', target: 36, actual: 28, difference: -8 },
      { time_slot: '10:00-11:00', target: 36, actual: 28, difference: -8 },
      { time_slot: '11:00-12:00', target: 36, actual: 15, difference: -21 },
      { time_slot: '12:00-13:00', target: 36, actual: 17, difference: -19 },
      { time_slot: '13:00-14:00', target: 36, actual: 27, difference: -9 }
    ]
  },

  // Page 31
  {
    page_no: 31,
    date: '14/10/2026',
    shift: 'C',
    batch_id: '40255',
    color: 'KK10',
    thickness_nominal_mm: '2.00mm',
    thickness_range: '1.87-2.13',
    cpw_kg: 79,
    line_speed_hz: '45',
    mixer_operator: 'BOAGO',
    checked_by_qai: 'BETTY',
    supervisor: 'Mailo',
    target_total_boxes: 288,
    actual_total_boxes: 217,
    box_difference_total: -71,
    has_production_data: true,
    transcription_issues: false,
    verification_status: 'VERIFIED',
    remarks: '1. Colour change. 2. Thickness change.',
    hourly_production: [
      { time_slot: '22:00-23:00', target: 36, actual: 34, difference: -2 },
      { time_slot: '23:00-00:00', target: 36, actual: 26, difference: -10 },
      { time_slot: '00:00-01:00', target: 36, actual: 16, difference: 'colour & thickness change' },
      { time_slot: '01:00-02:00', target: 36, actual: 32, difference: -4 },
      { time_slot: '02:00-03:00', target: 36, actual: 28, difference: -8 },
      { time_slot: '03:00-04:00', target: 36, actual: 30, difference: -6 },
      { time_slot: '04:00-05:00', target: 36, actual: 28, difference: -8 },
      { time_slot: '05:00-06:00', target: 36, actual: 23, difference: 'Line cut' }
    ]
  },

  // Page 32
  {
    page_no: 32,
    date: '14/10/2026',
    shift: 'B',
    batch_id: '9101',
    color: 'MARBLING',
    thickness_nominal_mm: '2.00mm',
    thickness_range: '1.87-2.13',
    cpw_kg: 79,
    line_speed_hz: '44',
    mixer_operator: 'ALFRED',
    checked_by_qai: 'SENTLE',
    supervisor: 'DANIEL',
    target_total_boxes: 216,
    actual_total_boxes: 199,
    box_difference_total: -17,
    has_production_data: true,
    transcription_issues: false,
    verification_status: 'VERIFIED',
    remarks: '1. Colour change. 2. No thickness change.',
    hourly_production: [
      { time_slot: '16:00-17:00', target: 36, actual: 28, difference: -8 },
      { time_slot: '17:00-18:00', target: 36, actual: 32, difference: -4 },
      { time_slot: '18:00-19:00', target: 36, actual: 36, difference: 0 },
      { time_slot: '19:00-20:00', target: 36, actual: 33, difference: -3 },
      { time_slot: '20:00-21:00', target: 36, actual: 39, difference: 3 },
      { time_slot: '21:00-22:00', target: 36, actual: 31, difference: -5 }
    ]
  },

  // Page 33
  {
    page_no: 33,
    date: '14/10/2026',
    shift: 'A',
    batch_id: '40245',
    color: 'Q14',
    thickness_nominal_mm: '2.00mm',
    thickness_range: '1.87-2.13',
    cpw_kg: 80,
    line_speed_hz: '39',
    mixer_operator: 'REFILWE',
    checked_by_qai: 'KARABO',
    supervisor: 'THEMBANI',
    target_total_boxes: 180,
    actual_total_boxes: 138,
    box_difference_total: -42,
    has_production_data: true,
    transcription_issues: false,
    verification_status: 'VERIFIED',
    remarks: '1. Colour change. 2. No thickness change.',
    hourly_production: [
      { time_slot: '06:00-07:00', target: 36, actual: 25, difference: 'Line cuts -11' },
      { time_slot: '07:00-08:00', target: 36, actual: 22, difference: -14 },
      { time_slot: '08:00-09:00', target: 36, actual: 35, difference: -1 },
      { time_slot: '09:00-10:00', target: 36, actual: 37, difference: 1 },
      { time_slot: '10:00-11:00', target: 36, actual: 19, difference: 'Colour change' }
    ]
  },

  // Page 34
  {
    page_no: 34,
    date: '13/10/2026',
    shift: 'C',
    batch_id: '40235',
    color: 'Q10',
    thickness_nominal_mm: '2.00mm',
    thickness_range: '1.87-2.13',
    cpw_kg: 79,
    line_speed_hz: '42',
    mixer_operator: 'BOAGO',
    checked_by_qai: 'BETTY',
    supervisor: 'Mailo',
    target_total_boxes: 288,
    actual_total_boxes: 208,
    box_difference_total: -80,
    has_production_data: true,
    transcription_issues: false,
    verification_status: 'VERIFIED',
    remarks: '1. Colour change. 2. No thickness change. 3. Inconsistent shade on Q10 2.00 40235 extra mix was done, did not label the pallet until final inspection on 14/10/2026. 4. Tile 2 of Q10 2.00 40235 failed dimensional stability with a minimum of 298.30 (machine direction). REPRODUCED.',
    hourly_production: [
      { time_slot: '22:00-23:00', target: 36, actual: 32, difference: -4 },
      { time_slot: '23:00-00:00', target: 36, actual: 28, difference: -8 },
      { time_slot: '00:00-01:00', target: 36, actual: 32, difference: -4 },
      { time_slot: '01:00-02:00', target: 36, actual: 30, difference: -6 },
      { time_slot: '02:00-03:00', target: 36, actual: 33, difference: -3 },
      { time_slot: '03:00-04:00', target: 36, actual: 12, difference: 'colour change' },
      { time_slot: '04:00-05:00', target: 36, actual: 22, difference: 'Line cuts' },
      { time_slot: '05:00-06:00', target: 36, actual: 21, difference: -15 }
    ]
  },

  // Page 35
  {
    page_no: 35,
    date: '13/10/2026',
    shift: 'B',
    batch_id: '40225',
    color: 'KK05',
    thickness_nominal_mm: '2.50mm',
    thickness_range: '2.37-2.63',
    cpw_kg: 81.79,
    line_speed_hz: '34/43',
    mixer_operator: 'ALFRED',
    checked_by_qai: 'SENTLE',
    supervisor: 'DANIEL',
    target_total_boxes: 288,
    actual_total_boxes: 195,
    box_difference_total: -93,
    has_production_data: true,
    transcription_issues: false,
    verification_status: 'VERIFIED',
    remarks: '1. Colour change. 2. Thickness change. 3. On and off stopping of tiles.',
    hourly_production: [
      { time_slot: '14:00-15:00', target: 36, actual: 26, difference: -10 },
      { time_slot: '15:00-16:00', target: 36, actual: 16, difference: -20 },
      { time_slot: '16:00-17:00', target: 36, actual: 24, difference: -12 },
      { time_slot: '17:00-18:00', target: 36, actual: 28, difference: -8 },
      { time_slot: '18:00-19:00', target: 36, actual: 26, difference: -10 },
      { time_slot: '19:00-20:00', target: 36, actual: 17, difference: 'changing colour' },
      { time_slot: '20:00-21:00', target: 36, actual: 28, difference: -8 },
      { time_slot: '21:00-22:00', target: 36, actual: 30, difference: -6 }
    ]
  },

  // Page 36
  {
    page_no: 36,
    date: '13/10/2026',
    shift: 'A',
    batch_id: '40215',
    color: 'KK15',
    thickness_nominal_mm: '2.50mm',
    thickness_range: '2.37-2.63',
    cpw_kg: 80,
    line_speed_hz: '31',
    mixer_operator: 'REFILWE',
    checked_by_qai: 'KARABO',
    supervisor: 'THEMBANI',
    target_total_boxes: 288,
    actual_total_boxes: 169,
    box_difference_total: -119,
    has_production_data: true,
    transcription_issues: false,
    verification_status: 'VERIFIED',
    remarks: '1. Colour change. 2. No thickness change.',
    hourly_production: [
      { time_slot: '06:00-07:00', target: 36, actual: 19, difference: 'Line cuts -17' },
      { time_slot: '07:00-08:00', target: 36, actual: 32, difference: -4 },
      { time_slot: '08:00-09:00', target: 36, actual: 26, difference: -10 },
      { time_slot: '09:00-10:00', target: 36, actual: 10, difference: 'Line cuts -26' },
      { time_slot: '10:00-11:00', target: 36, actual: 16, difference: -20 },
      { time_slot: '11:00-12:00', target: 36, actual: 28, difference: -8 },
      { time_slot: '12:00-13:00', target: 36, actual: 20, difference: -16 },
      { time_slot: '13:00-14:00', target: 36, actual: 18, difference: 'colour change' }
    ]
  },

  // Page 37
  {
    page_no: 37,
    date: '12/10/2026',
    shift: 'C',
    batch_id: '40215',
    color: 'KK15',
    thickness_nominal_mm: '2.50mm',
    thickness_range: '2.37-2.63',
    cpw_kg: 80,
    line_speed_hz: '32',
    mixer_operator: 'BOAGO',
    checked_by_qai: 'BETTY',
    supervisor: 'Mailo',
    target_total_boxes: 288,
    actual_total_boxes: 187,
    box_difference_total: -101,
    has_production_data: true,
    transcription_issues: false,
    verification_status: 'VERIFIED',
    remarks: '1. No colour change. 2. No thickness change. 3. Several line cuts due to material fell from mixing mill.',
    hourly_production: [
      { time_slot: '22:00-23:00', target: 36, actual: 26, difference: -10 },
      { time_slot: '23:00-00:00', target: 36, actual: 28, difference: -8 },
      { time_slot: '00:00-01:00', target: 36, actual: 26, difference: -10 },
      { time_slot: '01:00-02:00', target: 36, actual: 20, difference: -16 },
      { time_slot: '02:00-03:00', target: 36, actual: 20, difference: 'Line cuts -16' },
      { time_slot: '03:00-04:00', target: 36, actual: 26, difference: -10 },
      { time_slot: '04:00-05:00', target: 36, actual: 20, difference: -16 },
      { time_slot: '05:00-06:00', target: 36, actual: 21, difference: -15 }
    ]
  },

  // Page 38
  {
    page_no: 38,
    date: '12/10/2026',
    shift: 'B',
    batch_id: '40205',
    color: 'Q28',
    thickness_nominal_mm: '1.30mm',
    thickness_range: '1.17-1.43',
    cpw_kg: 79.5,
    line_speed_hz: '50.00',
    mixer_operator: 'ALFRED',
    checked_by_qai: 'SENTLE',
    supervisor: 'DANIEL',
    target_total_boxes: 288,
    actual_total_boxes: 167,
    box_difference_total: -121,
    has_production_data: true,
    transcription_issues: false,
    verification_status: 'VERIFIED',
    remarks: '1. Colour change. 2. Thickness change.',
    hourly_production: [
      { time_slot: '14:00-15:00', target: 48, actual: 31, difference: -17 },
      { time_slot: '15:00-16:00', target: 48, actual: 34, difference: -14 },
      { time_slot: '16:00-17:00', target: 48, actual: 34, difference: -14 },
      { time_slot: '17:00-18:00', target: 36, actual: 7, difference: 'changing colour' },
      { time_slot: '18:00-19:00', target: 36, actual: 11, difference: -25 },
      { time_slot: '20:00-21:00', target: 36, actual: 32, difference: -4 },
      { time_slot: '21:00-22:00', target: 36, actual: 18, difference: -18 }
    ]
  },

  // Page 39
  {
    page_no: 39,
    date: '12/10/2026',
    shift: 'A',
    batch_id: '40205',
    color: 'Q28',
    thickness_nominal_mm: '1.30mm',
    thickness_range: '1.17-1.43',
    cpw_kg: 79,
    line_speed_hz: '50',
    mixer_operator: 'REFILWE',
    checked_by_qai: 'KARABO',
    supervisor: 'THEMBANI',
    target_total_boxes: 48,
    actual_total_boxes: 3,
    box_difference_total: -45,
    has_production_data: true,
    transcription_issues: false,
    verification_status: 'VERIFIED',
    remarks: '1. No colour and thickness change. 2. Cleaning production line, repacking bulk into mp2 bags.',
    hourly_production: [
      { time_slot: '14:50-15:00', target: 48, actual: 3, difference: -45, note: 'Restart' }
    ],
    incidents: [
      { category: 'Line Heating / Cleaning', description: 'Heating up machines, cleaning production line & repacking bulk into bags 06:00-13:30', impact: 'Line down until 13:55' }
    ]
  },

  // Page 40
  {
    page_no: 40,
    date: '09/10/2026',
    shift: 'C',
    batch_id: '40195',
    color: 'Q72',
    thickness_nominal_mm: '1.30mm',
    thickness_range: '1.17-1.43',
    cpw_kg: 75,
    line_speed_hz: '50.00',
    mixer_operator: 'BOAGO',
    checked_by_qai: 'SENTLE',
    supervisor: 'DANIEL',
    target_total_boxes: 384,
    actual_total_boxes: 266,
    box_difference_total: -118,
    has_production_data: true,
    transcription_issues: false,
    verification_status: 'VERIFIED',
    remarks: '1. Colour change. 2. No thickness change.',
    hourly_production: [
      { time_slot: '22:00-23:00', target: 48, actual: 36, difference: -12 },
      { time_slot: '23:00-00:00', target: 48, actual: 38, difference: -10 },
      { time_slot: '00:00-01:00', target: 48, actual: 37, difference: -11 },
      { time_slot: '01:00-02:00', target: 48, actual: 40, difference: -8 },
      { time_slot: '02:00-03:00', target: 48, actual: 36, difference: -12 },
      { time_slot: '03:00-04:00', target: 48, actual: 33, difference: -15 },
      { time_slot: '04:00-05:00', target: 48, actual: 46, difference: -2 }
    ]
  },

  // Page 41
  {
    page_no: 41,
    date: '09/10/2026',
    shift: 'B',
    batch_id: '40175',
    color: 'Q49',
    thickness_nominal_mm: '1.30mm',
    thickness_range: '1.17-1.43',
    cpw_kg: 79,
    line_speed_hz: '50',
    mixer_operator: 'REFILWE',
    checked_by_qai: 'KARABO',
    supervisor: 'THEMBANI',
    target_total_boxes: 344,
    actual_total_boxes: 282,
    box_difference_total: -62,
    has_production_data: true,
    transcription_issues: false,
    verification_status: 'VERIFIED',
    remarks: '1. Colour change. 2. No thickness change.',
    hourly_production: [
      { time_slot: '14:00-15:00', target: 28, actual: 28, difference: 0 },
      { time_slot: '15:00-16:00', target: 28, actual: 4, difference: 'changing colour' },
      { time_slot: '16:00-17:00', target: 48, actual: 40, difference: -8 },
      { time_slot: '17:00-18:00', target: 48, actual: 40, difference: -8 },
      { time_slot: '18:00-19:00', target: 48, actual: 38, difference: -10 },
      { time_slot: '19:00-20:00', target: 48, actual: 42, difference: -6 },
      { time_slot: '20:00-21:00', target: 48, actual: 26, difference: 'Colour change' },
      { time_slot: '21:00-22:00', target: 48, actual: 40, difference: -8 }
    ]
  },

  // Page 42
  {
    page_no: 42,
    date: '09/10/2026',
    shift: 'A',
    batch_id: '40175',
    color: 'Q49',
    thickness_nominal_mm: '1.30mm',
    thickness_range: '1.17-1.43',
    cpw_kg: 79,
    line_speed_hz: '50',
    mixer_operator: 'BOAGO',
    checked_by_qai: 'BETTY',
    supervisor: 'Mailo',
    target_total_boxes: 264,
    actual_total_boxes: 233,
    box_difference_total: -31,
    has_production_data: true,
    transcription_issues: false,
    verification_status: 'VERIFIED',
    remarks: '1. No colour change. 2. No thickness change. 3. Chain for coupling tray broken.',
    hourly_production: [
      { time_slot: '06:00-07:00', target: 48, actual: 48, difference: 'Bulk DIY' },
      { time_slot: '07:00-08:00', target: 48, actual: 35, difference: -13 },
      { time_slot: '08:00-09:00', target: 28, actual: 24, difference: -4 },
      { time_slot: '09:00-10:00', target: 28, actual: 18, difference: -10 },
      { time_slot: '10:00-11:00', target: 28, actual: 26, difference: -2 },
      { time_slot: '11:00-12:00', target: 28, actual: 26, difference: 'prod stopped' },
      { time_slot: '12:00-13:00', target: 28, actual: 27, difference: -1 },
      { time_slot: '13:00-14:00', target: 28, actual: 27, difference: -1 }
    ]
  },

  // Page 43
  {
    page_no: 43,
    date: '08/10/2026',
    shift: 'C',
    batch_id: '40165',
    color: 'Q38',
    thickness_nominal_mm: '1.30mm',
    thickness_range: '1.17-1.43',
    cpw_kg: 75,
    line_speed_hz: '50.00',
    mixer_operator: 'ALFRED',
    checked_by_qai: 'SENTLE',
    supervisor: 'DANIEL',
    target_total_boxes: 284,
    actual_total_boxes: 265,
    box_difference_total: -19,
    has_production_data: true,
    transcription_issues: false,
    verification_status: 'VERIFIED',
    remarks: '1. Colour change. 2. No thickness change.',
    hourly_production: [
      { time_slot: '22:00-23:00', target: 28, actual: 26, difference: -2 },
      { time_slot: '23:00-00:00', target: 28, actual: 30, difference: 2 },
      { time_slot: '00:00-01:00', target: 28, actual: 29, difference: 1 },
      { time_slot: '01:00-02:00', target: 28, actual: 30, difference: 2 },
      { time_slot: '02:00-03:00', target: 28, actual: 33, difference: 5 },
      { time_slot: '03:00-04:00', target: 28, actual: 31, difference: 'changing colour' },
      { time_slot: '04:00-05:00', target: 48, actual: 41, difference: -7 },
      { time_slot: '05:00-06:00', target: 48, actual: 45, difference: -3 }
    ]
  },

  // Page 44
  {
    page_no: 44,
    date: '08/10/2026',
    shift: 'B',
    batch_id: '40155',
    color: 'Q10',
    thickness_nominal_mm: '1.30mm',
    thickness_range: '1.17-1.43',
    cpw_kg: 59,
    line_speed_hz: '50',
    mixer_operator: 'REFILWE',
    checked_by_qai: 'KARABO',
    supervisor: 'THEMBANI',
    target_total_boxes: 224,
    actual_total_boxes: 212,
    box_difference_total: -12,
    has_production_data: true,
    transcription_issues: false,
    verification_status: 'VERIFIED',
    remarks: '1. Colour change. 2. No thickness change.',
    hourly_production: [
      { time_slot: '14:00-15:00', target: 28, actual: 28, difference: 0 },
      { time_slot: '15:00-16:00', target: 28, actual: 25, difference: -3 },
      { time_slot: '16:00-17:00', target: 28, actual: 29, difference: 1 },
      { time_slot: '17:00-18:00', target: 28, actual: 28, difference: 0 },
      { time_slot: '18:00-19:00', target: 28, actual: 27, difference: -1 },
      { time_slot: '19:00-20:00', target: 28, actual: 28, difference: 0 },
      { time_slot: '20:00-21:00', target: 28, actual: 19, difference: 'colour change' },
      { time_slot: '21:00-22:00', target: 28, actual: 26, difference: -2 }
    ]
  },

  // Page 45
  {
    page_no: 45,
    date: '08/10/2026',
    shift: 'A',
    batch_id: '40145',
    color: 'Q05',
    thickness_nominal_mm: '1.30mm',
    thickness_range: '1.17-1.43',
    cpw_kg: 59,
    line_speed_hz: '50',
    mixer_operator: 'BOAGO',
    checked_by_qai: 'BETTY',
    supervisor: 'Mailo',
    target_total_boxes: 275,
    actual_total_boxes: 274,
    box_difference_total: -1,
    has_production_data: true,
    transcription_issues: false,
    verification_status: 'VERIFIED',
    remarks: '1. Colour change. 2. No thickness change.',
    hourly_production: [
      { time_slot: '06:00-07:00', target: 48, actual: 40, difference: -8 },
      { time_slot: '07:00-08:00', target: 48, actual: 48, difference: 0 },
      { time_slot: '08:00-09:00', target: 48, actual: 48, difference: 0 },
      { time_slot: '09:00-10:00', target: 48, actual: 16, difference: 'Bulk DIY' },
      { time_slot: '10:00-11:00', target: 28, actual: 28, difference: 0 },
      { time_slot: '11:00-12:00', target: 28, actual: 28, difference: 0 },
      { time_slot: '12:00-13:00', target: 28, actual: 30, difference: 2 },
      { time_slot: '13:00-14:00', target: 28, actual: 30, difference: 2 }
    ]
  },

  // Page 46
  {
    page_no: 46,
    date: '07/10/2026',
    shift: 'C',
    batch_id: '40125',
    color: 'Q38',
    thickness_nominal_mm: '1.30mm',
    thickness_range: '1.17-1.43',
    checked_by_qai: 'SENTLE',
    supervisor: 'DANIEL',
    target_total_boxes: 264,
    actual_total_boxes: 234,
    box_difference_total: -30,
    has_production_data: true,
    transcription_issues: false,
    verification_status: 'VERIFIED',
    remarks: '1. Delay cleanse. 2. No thickness change. 3. Speed 50Hz.',
    hourly_production: [
      { time_slot: '22:00-23:00', target: 28, actual: 28, difference: 0 },
      { time_slot: '23:00-00:00', target: 28, actual: 29, difference: 1 },
      { time_slot: '00:00-01:00', target: 28, actual: 28, difference: 0 },
      { time_slot: '01:00-02:00', target: 28, actual: 30, difference: 2 },
      { time_slot: '02:00-03:00', target: 28, actual: 29, difference: 1 },
      { time_slot: '03:00-04:00', target: 28, actual: 26, difference: -2 },
      { time_slot: '04:00-05:00', target: 48, actual: 28, difference: 'changing colour' },
      { time_slot: '05:00-06:00', target: 48, actual: 36, difference: -12 }
    ]
  },

  // Page 47
  {
    page_no: 47,
    date: '07/10/2026',
    shift: 'B',
    batch_id: '40115',
    color: 'Q41',
    thickness_nominal_mm: '1.30mm',
    thickness_range: '1.17-1.43',
    checked_by_qai: 'KARABO',
    supervisor: 'THEMBANI',
    target_total_boxes: 284,
    actual_total_boxes: 248,
    box_difference_total: -36,
    has_production_data: true,
    transcription_issues: false,
    verification_status: 'VERIFIED',
    remarks: '1. Colour change. 2. Thickness change.',
    hourly_production: [
      { time_slot: '14:00-15:00', target: 48, actual: 40, difference: -8 },
      { time_slot: '15:00-16:00', target: 48, actual: 41, difference: -7 },
      { time_slot: '16:00-17:00', target: 48, actual: 42, difference: -6 },
      { time_slot: '17:00-18:00', target: 48, actual: 40, difference: -8 },
      { time_slot: '18:00-19:00', target: 36, actual: 19, difference: 'colour + thickness change' },
      { time_slot: '20:00-21:00', target: 28, actual: 27, difference: -1 },
      { time_slot: '21:00-22:00', target: 28, actual: 28, difference: 0 }
    ]
  },

  // Page 48
  {
    page_no: 48,
    date: '07/10/2026',
    shift: 'A',
    batch_id: '40105',
    color: 'Q83',
    thickness_nominal_mm: '1.30mm',
    thickness_range: '1.17-1.43',
    checked_by_qai: 'BETTY',
    supervisor: 'Mailo',
    target_total_boxes: 281,
    actual_total_boxes: 240,
    box_difference_total: -41,
    has_production_data: true,
    transcription_issues: false,
    verification_status: 'VERIFIED',
    remarks: '1. Colour change. 2. No thickness change.',
    hourly_production: [
      { time_slot: '06:00-07:00', target: 38, actual: 28, difference: -10 },
      { time_slot: '07:00-08:00', target: 28, actual: 30, difference: 2 },
      { time_slot: '08:00-09:00', target: 28, actual: 26, difference: -2 },
      { time_slot: '09:00-10:00', target: 28, actual: 28, difference: 0 },
      { time_slot: '10:00-11:00', target: 28, actual: 28, difference: 0 },
      { time_slot: '11:00-12:00', target: 28, actual: 21, difference: 'colour change' },
      { time_slot: '12:00-13:00', target: 48, actual: 40, difference: -8 },
      { time_slot: '13:00-14:00', target: 48, actual: 39, difference: -9 }
    ]
  },

  // Page 49
  {
    page_no: 49,
    date: '06/10/2026',
    shift: 'C',
    batch_id: '40095',
    color: 'Q83',
    thickness_nominal_mm: '1.30mm',
    thickness_range: '1.17-1.43',
    checked_by_qai: 'SENTLE',
    supervisor: 'DANIEL',
    target_total_boxes: 336,
    actual_total_boxes: 248,
    box_difference_total: -88,
    has_production_data: true,
    transcription_issues: false,
    verification_status: 'VERIFIED',
    remarks: '1. Colour change. 2. Thickness change. 3. Speed 1:30 50Hz. 4. Q46 2.00 40075 failed dimensional stability on tile 1 with a minimum of 298.00 (machine direction).',
    hourly_production: [
      { time_slot: '22:00-23:00', target: 48, actual: 40, difference: -8 },
      { time_slot: '23:00-00:00', target: 48, actual: 42, difference: -6 },
      { time_slot: '00:00-01:00', target: 48, actual: 46, difference: -2 },
      { time_slot: '01:00-02:00', target: 48, actual: 14, difference: 'changing colour' },
      { time_slot: '02:30-03:00', target: 36, actual: 14, difference: -22 },
      { time_slot: '03:00-04:00', target: 36, actual: 32, difference: -4 },
      { time_slot: '04:00-05:00', target: 36, actual: 28, difference: -8 }
    ]
  },

  // Page 50
  {
    page_no: 50,
    date: '06/10/2026',
    shift: 'B',
    batch_id: '40075',
    color: 'Q46',
    thickness_nominal_mm: '2.00mm',
    thickness_range: '1.87-2.13',
    checked_by_qai: 'KARABO',
    supervisor: 'THEMBANI',
    target_total_boxes: 312,
    actual_total_boxes: 200,
    box_difference_total: -112,
    has_production_data: true,
    transcription_issues: false,
    verification_status: 'VERIFIED',
    remarks: '1. Colour change. 2. Thickness change.',
    hourly_production: [
      { time_slot: '14:00-15:00', target: 36, actual: 29, difference: -7 },
      { time_slot: '15:00-16:00', target: 36, actual: 8, difference: 'Colour change / line cuts' },
      { time_slot: '16:00-17:00', target: 36, actual: 18, difference: 'Line cut -18' },
      { time_slot: '17:00-18:00', target: 36, actual: 22, difference: -14 },
      { time_slot: '18:00-19:00', target: 36, actual: 26, difference: -10 },
      { time_slot: '19:00-20:00', target: 36, actual: 19, difference: 'colour & thickness change' },
      { time_slot: '20:00-21:00', target: 48, actual: 30, difference: -18 },
      { time_slot: '21:00-22:00', target: 48, actual: 38, difference: -10 }
    ]
  },

  // Page 51
  {
    page_no: 51,
    date: '06/10/2026',
    shift: 'A',
    batch_id: '40065',
    color: 'CL49',
    thickness_nominal_mm: '2.50mm',
    thickness_range: '2.37-2.63',
    checked_by_qai: 'BETTY',
    supervisor: 'Mailo',
    target_total_boxes: 288,
    actual_total_boxes: 199,
    box_difference_total: -89,
    has_production_data: true,
    transcription_issues: false,
    verification_status: 'VERIFIED',
    remarks: '1. Colour change. 2. Thickness change. 3. Speed 34Hz, speed for 2.00mm: 40Hz. 4. Several line cuts due to material fall from mixing mill.',
    hourly_production: [
      { time_slot: '06:00-07:00', target: 36, actual: 30, difference: -6 },
      { time_slot: '07:00-08:00', target: 36, actual: 28, difference: 'Line cut -8' },
      { time_slot: '08:00-09:00', target: 36, actual: 28, difference: -8 },
      { time_slot: '09:00-10:00', target: 36, actual: 24, difference: 'Line cut -12' },
      { time_slot: '10:00-11:00', target: 36, actual: 6, difference: 'Line cuts -14' },
      { time_slot: '11:00-12:00', target: 36, actual: 22, difference: -14 },
      { time_slot: '12:00-13:00', target: 36, actual: 21, difference: 'Colour + thickness change' },
      { time_slot: '13:00-14:00', target: 36, actual: 34, difference: -2 }
    ]
  },

  // Page 52
  {
    page_no: 52,
    date: '05/10/2026',
    shift: 'C',
    batch_id: '40055',
    color: 'Q38',
    thickness_nominal_mm: '1.30mm',
    thickness_range: '1.17-1.43',
    checked_by_qai: 'SENTLE',
    supervisor: 'DANIEL',
    target_total_boxes: 312,
    actual_total_boxes: 216,
    box_difference_total: -96,
    has_production_data: true,
    transcription_issues: false,
    verification_status: 'VERIFIED',
    remarks: '1. Colour change. 2. Thickness change. 3. Speed 2.00: 42Hz, 2.50mm: 33Hz.',
    hourly_production: [
      { time_slot: '22:00-23:00', target: 48, actual: 11, difference: 'prod stopped' },
      { time_slot: '23:00-00:00', target: 48, actual: 47, difference: -1 },
      { time_slot: '00:00-01:00', target: 36, actual: 7, difference: 'changing thickness' },
      { time_slot: '01:00-02:00', target: 36, actual: 32, difference: -4 },
      { time_slot: '02:00-03:00', target: 36, actual: 28, difference: -8 },
      { time_slot: '03:00-04:00', target: 36, actual: 23, difference: 'changing colour' },
      { time_slot: '04:00-05:00', target: 36, actual: 20, difference: -16 },
      { time_slot: '05:00-06:00', target: 36, actual: 32, difference: -4 }
    ],
    incidents: [
      { category: 'Boiler Breakdown', description: 'Breakdown - boiler pressure was low between 22:15 and 23:50', impact: 'Line stoppage' }
    ]
  },

  // Page 53
  {
    page_no: 53,
    date: '05/10/2026',
    shift: 'B',
    batch_id: '40045',
    color: 'Q70',
    thickness_nominal_mm: '1.30mm',
    thickness_range: '1.17-1.43',
    checked_by_qai: 'KARABO',
    supervisor: 'THEMBANI',
    target_total_boxes: 284,
    actual_total_boxes: 245,
    box_difference_total: -39,
    has_production_data: true,
    transcription_issues: false,
    verification_status: 'VERIFIED',
    remarks: '1. Colour change. 2. No thickness change.',
    hourly_production: [
      { time_slot: '14:00-15:00', target: 28, actual: 23, difference: -5 },
      { time_slot: '15:00-16:00', target: 28, actual: 10, difference: 'prod stopped' },
      { time_slot: '16:00-17:00', target: 28, actual: 28, difference: 0 },
      { time_slot: '17:00-18:00', target: 28, actual: 29, difference: 1 },
      { time_slot: '18:00-19:00', target: 28, actual: 3, difference: 'Colour change' },
      { time_slot: '19:00-20:00', target: 48, actual: 42, difference: -6 },
      { time_slot: '20:00-21:00', target: 48, actual: 42, difference: -6 },
      { time_slot: '21:00-22:00', target: 48, actual: 42, difference: -6 }
    ],
    incidents: [
      { category: 'Mechanical Failure', description: 'Conveyor belts at punching press were broken at 15:15 to 16:05', impact: 'Line stoppage 50 mins' }
    ]
  },

  // Page 54
  {
    page_no: 54,
    date: '05/10/2026',
    shift: 'A',
    batch_id: '40045',
    color: 'Q70',
    thickness_nominal_mm: '1.30mm',
    thickness_range: '1.17-1.43',
    checked_by_qai: 'BETTY',
    supervisor: 'Mailo',
    target_total_boxes: 66,
    actual_total_boxes: 32,
    box_difference_total: -34,
    has_production_data: true,
    transcription_issues: false,
    verification_status: 'VERIFIED',
    remarks: '1. No colour change. 2. No thickness change.',
    hourly_production: [
      { time_slot: '07:00-08:00', target: 28, actual: 4, difference: 'in 15 mins' },
      { time_slot: '08:00-09:00', target: 0, actual: 8, difference: 'contamination in tiles' },
      { time_slot: '09:00-10:00', target: 0, actual: 0, difference: 'CHANGING KNIVES' },
      { time_slot: '10:00-11:00', target: 28, actual: 14, difference: 'Production stopped' },
      { time_slot: '13:00-14:00', target: 28, actual: 6, difference: 'in 30 mins' }
    ],
    incidents: [
      { category: 'Mechanical Failure', description: 'Conveyer belt (2) derailed from 10:40 to 13:35', impact: 'Almost 3 hrs downtime' },
      { category: 'Tooling', description: 'Changing knives 09:25', impact: 'Stoppage' }
    ]
  },

  // Page 55
  {
    page_no: 55,
    date: '28/09/2026',
    shift: 'A',
    batch_id: '40035',
    color: 'Q49',
    thickness_nominal_mm: '1.30mm',
    thickness_range: '1.17-1.43',
    checked_by_qai: 'SENTLE',
    supervisor: 'DANIEL',
    target_total_boxes: 344,
    actual_total_boxes: 267,
    box_difference_total: -77,
    has_production_data: true,
    transcription_issues: false,
    verification_status: 'VERIFIED',
    remarks: '1. Colour change. 2. No thickness change. 3. Speed 50Hz.',
    hourly_production: [
      { time_slot: '06:00-07:00', target: 28, actual: 31, difference: 3 },
      { time_slot: '07:00-08:00', target: 28, actual: 31, difference: 3 },
      { time_slot: '08:00-09:00', target: 48, actual: 25, difference: 'changing colour' },
      { time_slot: '09:00-10:00', target: 48, actual: 44, difference: -4 },
      { time_slot: '10:00-11:00', target: 48, actual: 46, difference: -2 },
      { time_slot: '11:00-12:00', target: 48, actual: 40, difference: -8 },
      { time_slot: '12:00-13:00', target: 48, actual: 46, difference: -2 },
      { time_slot: '13:00-14:00', target: 48, actual: 4, difference: 'pred stopped' }
    ],
    incidents: [
      { category: 'Breakdown', description: 'Breakdown at punching press at 13:30', impact: 'Line stoppage' }
    ]
  },

  // Page 56
  {
    page_no: 56,
    date: '27/09/2026',
    shift: 'C',
    batch_id: '40035',
    color: 'Q49',
    thickness_nominal_mm: '1.80mm',
    thickness_range: '1.17-1.43',
    checked_by_qai: 'THATO',
    supervisor: 'Mailo',
    target_total_boxes: 304,
    actual_total_boxes: 264,
    box_difference_total: -40,
    has_production_data: true,
    transcription_issues: false,
    verification_status: 'REVIEW',
    verification_notes: 'Nominal thickness written as 1.80mm while range indicates 1.17-1.43 and 1.30mm transition.',
    remarks: '1. No colour change. 2. No thickness change. 3. Production Stopped due to API broken mixer mill relay, hence it was changed. 4. There was shortage of 36 boxes for the second pallet of Q49 1.30 40035 (BULK), therefore will have to be repacked with 36 boxes.',
    hourly_production: [
      { time_slot: '22:00-23:00', target: 48, actual: 36, difference: -12 },
      { time_slot: '23:00-00:00', target: 48, actual: 43, difference: -5 },
      { time_slot: '00:00-01:00', target: 48, actual: 48, difference: 0 },
      { time_slot: '01:00-02:00', target: 48, actual: 21, difference: -27 },
      { time_slot: '02:00-03:00', target: 28, actual: 3, difference: -25 },
      { time_slot: '03:00-04:00', target: 28, actual: 28, difference: 0 },
      { time_slot: '04:00-05:00', target: 28, actual: 28, difference: 0 },
      { time_slot: '05:00-06:00', target: 28, actual: 34, difference: 6 }
    ]
  },

  // Page 57
  {
    page_no: 57,
    date: '27/09/2026',
    shift: 'B',
    batch_id: '40025',
    color: 'Q46',
    thickness_nominal_mm: '1.30mm',
    thickness_range: '1.17-1.43',
    checked_by_qai: 'SENTLE',
    supervisor: 'DANIEL',
    target_total_boxes: 304,
    actual_total_boxes: 298,
    box_difference_total: -6,
    has_production_data: true,
    transcription_issues: false,
    verification_status: 'VERIFIED',
    remarks: '1. Colour change. 2. No thickness change.',
    hourly_production: [
      { time_slot: '14:00-15:00', target: 48, actual: 46, difference: -2 },
      { time_slot: '15:00-16:00', target: 48, actual: 43, difference: -5 },
      { time_slot: '16:00-17:00', target: 48, actual: 47, difference: -1 },
      { time_slot: '17:00-18:00', target: 28, actual: 16, difference: -12 },
      { time_slot: '18:00-19:00', target: 28, actual: 28, difference: 0 },
      { time_slot: '19:00-20:00', target: 28, actual: 27, difference: -1 },
      { time_slot: '20:00-21:00', target: 28, actual: 24, difference: -4 },
      { time_slot: '21:00-22:00', target: 48, actual: 38, difference: -10 }
    ]
  },

  // Page 58
  {
    page_no: 58,
    date: '27/09/2026',
    shift: 'A',
    batch_id: '40015',
    color: 'Q14',
    thickness_nominal_mm: '1.30mm',
    thickness_range: '1.17-1.43',
    checked_by_qai: 'KARABO',
    supervisor: 'THEMBANI',
    target_total_boxes: 264,
    actual_total_boxes: 234,
    box_difference_total: -30,
    has_production_data: true,
    transcription_issues: false,
    verification_status: 'VERIFIED',
    remarks: '1. Colour change. 2. No thickness change.',
    hourly_production: [
      { time_slot: '06:00-07:00', target: 48, actual: 26, difference: -22 },
      { time_slot: '07:00-08:00', target: 28, actual: 22, difference: -6 },
      { time_slot: '08:00-09:00', target: 28, actual: 28, difference: 0 },
      { time_slot: '09:00-10:00', target: 28, actual: 28, difference: 0 },
      { time_slot: '10:00-11:00', target: 28, actual: 28, difference: 0 },
      { time_slot: '11:00-12:00', target: 28, actual: 28, difference: 0 },
      { time_slot: '12:00-13:00', target: 28, actual: 14, difference: 'Colour change' },
      { time_slot: '13:00-14:00', target: 48, actual: 48, difference: 0 }
    ]
  },

  // Page 59
  {
    page_no: 59,
    date: '26/09/2026',
    shift: 'C',
    batch_id: '40005',
    color: 'Q54',
    thickness_nominal_mm: '1.30mm',
    thickness_range: '1.17-1.43',
    checked_by_qai: 'THATO',
    supervisor: 'Mailo',
    target_total_boxes: 324,
    actual_total_boxes: 267,
    box_difference_total: -57,
    has_production_data: true,
    transcription_issues: false,
    verification_status: 'VERIFIED',
    remarks: '1. Colour change. 2. No thickness change.',
    hourly_production: [
      { time_slot: '22:00-23:00', target: 28, actual: 24, difference: -4 },
      { time_slot: '23:00-00:00', target: 28, actual: 30, difference: 2 },
      { time_slot: '00:00-01:00', target: 28, actual: 28, difference: 0 },
      { time_slot: '01:00-02:00', target: 48, actual: 11, difference: -37 },
      { time_slot: '02:00-03:00', target: 48, actual: 40, difference: -8 },
      { time_slot: '03:00-04:00', target: 48, actual: 38, difference: -10 },
      { time_slot: '04:00-05:00', target: 48, actual: 44, difference: -4 },
      { time_slot: '05:00-06:00', target: 48, actual: 40, difference: -8 }
    ]
  },

  // Page 60
  {
    page_no: 60,
    date: '26/09/2026',
    shift: 'B',
    batch_id: '39995',
    color: 'Q86',
    thickness_nominal_mm: '1.30mm',
    thickness_range: '1.17-1.43',
    checked_by_qai: 'SENTLE',
    supervisor: 'DANIEL',
    target_total_boxes: 324,
    actual_total_boxes: 300,
    box_difference_total: -24,
    has_production_data: true,
    transcription_issues: false,
    verification_status: 'VERIFIED',
    remarks: '1. No colour change. 2. No thickness change. 3. Speed 50Hz.',
    hourly_production: [
      { time_slot: '14:00-15:00', target: 48, actual: 38, difference: -10 },
      { time_slot: '15:00-16:00', target: 48, actual: 40, difference: -8 },
      { time_slot: '16:00-17:00', target: 48, actual: 48, difference: 0 },
      { time_slot: '17:00-18:00', target: 48, actual: 43, difference: -5 },
      { time_slot: '18:00-19:00', target: 48, actual: 41, difference: -7 },
      { time_slot: '19:00-20:00', target: 28, actual: 31, difference: 3 },
      { time_slot: '20:00-21:00', target: 28, actual: 30, difference: 2 },
      { time_slot: '21:00-22:00', target: 28, actual: 29, difference: 1 }
    ]
  },

  // Page 61
  {
    page_no: 61,
    date: '26/09/2026',
    shift: 'A',
    batch_id: '39985',
    color: 'Q28',
    thickness_nominal_mm: '1.30mm',
    thickness_range: '1.17-1.43',
    checked_by_qai: 'KARABO',
    supervisor: 'THEMBANI',
    target_total_boxes: 324,
    actual_total_boxes: 291,
    box_difference_total: -33,
    has_production_data: true,
    transcription_issues: false,
    verification_status: 'VERIFIED',
    remarks: '1. Colour change. 2. No thickness change.',
    hourly_production: [
      { time_slot: '06:00-07:00', target: 28, actual: 24, difference: -4 },
      { time_slot: '07:00-08:00', target: 28, actual: 28, difference: 0 },
      { time_slot: '08:00-09:00', target: 28, actual: 14, difference: 'Colour change' },
      { time_slot: '09:00-10:00', target: 48, actual: 44, difference: -4 },
      { time_slot: '10:00-11:00', target: 48, actual: 46, difference: -2 },
      { time_slot: '11:00-12:00', target: 48, actual: 40, difference: -8 },
      { time_slot: '12:00-13:00', target: 48, actual: 40, difference: -8 },
      { time_slot: '13:00-14:00', target: 48, actual: 41, difference: -7 }
    ]
  },

  // Page 62
  {
    page_no: 62,
    date: '25/09/2026',
    shift: 'C',
    batch_id: '39985',
    color: 'Q28',
    thickness_nominal_mm: '1.30mm',
    thickness_range: '1.17-1.43',
    checked_by_qai: 'BETTY',
    supervisor: 'Mailo',
    target_total_boxes: 297,
    actual_total_boxes: 278,
    box_difference_total: -19,
    has_production_data: true,
    transcription_issues: false,
    verification_status: 'VERIFIED',
    remarks: '1. No colour change. 2. No thickness change.',
    hourly_production: [
      { time_slot: '22:00-23:00', target: 48, actual: 44, difference: -4 },
      { time_slot: '23:00-00:00', target: 48, actual: 40, difference: -8 },
      { time_slot: '00:00-01:00', target: 48, actual: 40, difference: -8 },
      { time_slot: '01:00-02:00', target: 48, actual: 42, difference: -6 },
      { time_slot: '02:00-03:00', target: 48, actual: 16, difference: 'Bulk DIY' },
      { time_slot: '03:00-04:00', target: 28, actual: 28, difference: 0 },
      { time_slot: '04:00-05:00', target: 28, actual: 28, difference: 0 },
      { time_slot: '05:00-06:00', target: 28, actual: 30, difference: 2 }
    ]
  },

  // Page 63
  {
    page_no: 63,
    date: '25/09/2026',
    shift: 'B',
    batch_id: '39975',
    color: 'Q77',
    thickness_nominal_mm: '1.30mm',
    thickness_range: '1.17-1.43',
    checked_by_qai: 'SENTLE',
    supervisor: 'DANIEL',
    target_total_boxes: 224,
    actual_total_boxes: 188,
    box_difference_total: -36,
    has_production_data: true,
    transcription_issues: false,
    verification_status: 'VERIFIED',
    remarks: '1. Colour change. 2. No thickness change. 3. Speed 50Hz.',
    hourly_production: [
      { time_slot: '14:00-15:00', target: 28, actual: 26, difference: -2 },
      { time_slot: '15:00-16:00', target: 28, actual: 26, difference: -2 },
      { time_slot: '16:00-17:00', target: 28, actual: 27, difference: -1 },
      { time_slot: '17:00-18:00', target: 28, actual: 9, difference: 'changing colour' },
      { time_slot: '18:00-19:00', target: 28, actual: 26, difference: -2 },
      { time_slot: '19:00-20:00', target: 28, actual: 29, difference: 1 },
      { time_slot: '20:00-21:00', target: 28, actual: 15, difference: 'changing knives' },
      { time_slot: '21:00-22:00', target: 28, actual: 18, difference: -10 }
    ]
  },

  // Page 64
  {
    page_no: 64,
    date: '25/09/2026',
    shift: 'A',
    batch_id: '39975',
    color: 'Q77',
    thickness_nominal_mm: '1.30mm',
    thickness_range: '1.17-1.43',
    checked_by_qai: 'KARABO',
    supervisor: 'THEMBANI',
    target_total_boxes: 224,
    actual_total_boxes: 171,
    box_difference_total: -53,
    has_production_data: true,
    transcription_issues: false,
    verification_status: 'VERIFIED',
    remarks: '1. No colour and thickness change. 2. Speed 50Hz. 3. KK58 2.50mm 39955 failed dimensional stability with a minimum of 299.06 machine direction (Tile 2).',
    hourly_production: [
      { time_slot: '06:00-07:00', target: 28, actual: 20, difference: -8 },
      { time_slot: '07:00-08:00', target: 28, actual: 20, difference: -8 },
      { time_slot: '08:00-09:00', target: 28, actual: 24, difference: -4 },
      { time_slot: '09:00-10:00', target: 28, actual: 24, difference: -4 },
      { time_slot: '10:00-11:00', target: 28, actual: 23, difference: -5 },
      { time_slot: '11:00-12:00', target: 28, actual: 22, difference: -6 },
      { time_slot: '12:00-13:00', target: 28, actual: 20, difference: -8 },
      { time_slot: '13:00-14:00', target: 28, actual: 20, difference: -8 }
    ]
  },

  // Page 65
  {
    page_no: 65,
    date: '24/09/2026',
    shift: 'C',
    batch_id: '39975',
    color: 'Q77',
    thickness_nominal_mm: '1.30mm',
    thickness_range: '1.17-1.43',
    checked_by_qai: 'BETTY',
    supervisor: 'Mailo',
    target_total_boxes: 357,
    actual_total_boxes: 251,
    box_difference_total: -106,
    has_production_data: true,
    transcription_issues: false,
    verification_status: 'VERIFIED',
    remarks: '1. No colour change. 2. No thickness change. 3. SPEED 50Hz. 4. KK22 2.50 39835 machine failed dimensions with a minimum of 299.82 and Dm of 299.85 (Tile 1). KK28 failed machine direction with a minimum of 299.95 and Dm 298.90. 5. Several line cuts due to material fall from mixing mill.',
    hourly_production: [
      { time_slot: '22:00-23:00', target: 48, actual: 36, difference: 'Line cut -12' },
      { time_slot: '23:00-00:00', target: 48, actual: 24, difference: -24 },
      { time_slot: '00:00-01:00', target: 48, actual: 38, difference: -10 },
      { time_slot: '01:00-02:00', target: 48, actual: 30, difference: -18 },
      { time_slot: '02:00-03:00', target: 48, actual: 30, difference: -18 },
      { time_slot: '03:00-04:00', target: 48, actual: 30, difference: -18 },
      { time_slot: '04:00-05:00', target: 48, actual: 12, difference: 'Bulk DIY' },
      { time_slot: '05:00-06:00', target: 28, actual: 30, difference: 2 }
    ]
  },

  // Page 66
  {
    page_no: 66,
    date: '24/09/2026',
    shift: 'B',
    batch_id: '5215',
    color: '204',
    thickness_nominal_mm: '2.00mm',
    thickness_range: '1.87-2.13',
    checked_by_qai: 'SENTLE',
    supervisor: 'DANIEL',
    target_total_boxes: 288,
    actual_total_boxes: 163,
    box_difference_total: -125,
    has_production_data: true,
    transcription_issues: false,
    verification_status: 'VERIFIED',
    remarks: '1. Colour change. 2. Thickness change. 3. Speed 34Hz. 4. Machine direction sizes (dimensions) too low for both tile 1 and 2 with a minimum of 299.87mm. 5. Shortage of 1 box KK28.',
    hourly_production: [
      { time_slot: '14:00-15:00', target: 36, actual: 37, difference: 1 },
      { time_slot: '15:00-16:00', target: 36, actual: 12, difference: 'changing colour' },
      { time_slot: '16:00-17:00', target: 36, actual: 28, difference: -8 },
      { time_slot: '17:00-18:00', target: 36, actual: 11, difference: 'changing colour' },
      { time_slot: '18:00-19:00', target: 36, actual: 24, difference: -12 },
      { time_slot: '19:00-20:00', target: 36, actual: 26, difference: -10 },
      { time_slot: '20:00-21:00', target: 36, actual: 4, difference: 'Line cut' },
      { time_slot: '21:00-22:00', target: 36, actual: 17, difference: -19 }
    ]
  },

  // Page 67
  {
    page_no: 67,
    date: '24/09/2026',
    shift: 'A',
    batch_id: '5215',
    color: '204',
    thickness_nominal_mm: '2.00mm',
    thickness_range: '1.87-2.13',
    checked_by_qai: 'KARABO',
    supervisor: 'THEMBANI',
    target_total_boxes: 288,
    actual_total_boxes: 267,
    box_difference_total: -21,
    has_production_data: true,
    transcription_issues: false,
    verification_status: 'VERIFIED',
    remarks: '1. No colour and thickness change. 2. Speed 42Hz.',
    hourly_production: [
      { time_slot: '06:00-07:00', target: 36, actual: 32, difference: -4 },
      { time_slot: '07:00-08:00', target: 36, actual: 32, difference: -4 },
      { time_slot: '08:00-09:00', target: 36, actual: 36, difference: 0 },
      { time_slot: '09:00-10:00', target: 36, actual: 36, difference: 0 },
      { time_slot: '10:00-11:00', target: 36, actual: 32, difference: -4 },
      { time_slot: '11:00-12:00', target: 36, actual: 32, difference: -4 },
      { time_slot: '12:00-13:00', target: 36, actual: 36, difference: 0 },
      { time_slot: '13:00-14:00', target: 36, actual: 31, difference: -5 }
    ]
  },

  // Page 68
  {
    page_no: 68,
    date: '23/09/2026',
    shift: 'C',
    batch_id: '39925',
    color: 'KK72',
    thickness_nominal_mm: '2.50mm',
    thickness_range: '2.37-2.63',
    checked_by_qai: 'BETTY',
    supervisor: 'Mailo',
    target_total_boxes: 288,
    actual_total_boxes: 166,
    box_difference_total: -122,
    has_production_data: true,
    transcription_issues: false,
    verification_status: 'VERIFIED',
    remarks: '1. Colour change. 2. Thickness change. 3. SPEED 35Hz (2.50mm), 42Hz for 2.00mm.',
    hourly_production: [
      { time_slot: '22:00-23:00', target: 36, actual: 32, difference: -4 },
      { time_slot: '23:00-00:00', target: 36, actual: 30, difference: -6 },
      { time_slot: '00:00-01:00', target: 36, actual: 32, difference: -4 },
      { time_slot: '01:00-02:00', target: 36, actual: 28, difference: -8 },
      { time_slot: '02:00-03:00', target: 36, actual: 22, difference: -14 },
      { time_slot: '03:00-04:00', target: 36, actual: 0, difference: 'changing knives / marbling 2.00 9246' },
      { time_slot: '05:00-06:00', target: 36, actual: 24, difference: 'in 45 mins -12' }
    ]
  },

  // Page 69
  {
    page_no: 69,
    date: '23/09/2026',
    shift: 'B',
    batch_id: '39925',
    color: 'KK72',
    thickness_nominal_mm: '2.50mm',
    thickness_range: '2.37-2.63',
    checked_by_qai: 'SENTLE',
    supervisor: 'DANIEL',
    target_total_boxes: 288,
    actual_total_boxes: 199,
    box_difference_total: -89,
    has_production_data: true,
    transcription_issues: false,
    verification_status: 'VERIFIED',
    remarks: '1. No colour change. 2. No thickness change. 3. Speed 34Hz.',
    hourly_production: [
      { time_slot: '15:00-16:00', target: 36, actual: 23, difference: -13 },
      { time_slot: '16:00-17:00', target: 36, actual: 26, difference: -10 },
      { time_slot: '17:00-18:00', target: 36, actual: 28, difference: -8 },
      { time_slot: '18:00-19:00', target: 36, actual: 28, difference: -8 },
      { time_slot: '19:00-20:00', target: 36, actual: 32, difference: -4 },
      { time_slot: '20:00-21:00', target: 36, actual: 32, difference: -4 },
      { time_slot: '21:00-22:00', target: 36, actual: 30, difference: -6 }
    ],
    incidents: [
      { category: 'Breakdown', description: 'Breakdown at punching press 14:25 to 14:50', impact: '25 min delay' }
    ]
  },

  // Page 70
  {
    page_no: 70,
    date: '23/09/2026',
    shift: 'A',
    batch_id: '39905',
    color: 'KK41',
    thickness_nominal_mm: '2.50mm',
    thickness_range: '2.37-2.63',
    checked_by_qai: 'KARABO',
    supervisor: 'THEMBANI',
    target_total_boxes: 288,
    actual_total_boxes: 151,
    box_difference_total: -137,
    has_production_data: true,
    transcription_issues: false,
    verification_status: 'VERIFIED',
    remarks: '1. Colour change. 2. No thickness change. 3. Speed 34Hz. 4. Several line cuts due to material falling at mixing mill.',
    hourly_production: [
      { time_slot: '06:00-07:00', target: 36, actual: 2, difference: 'Colour change' },
      { time_slot: '07:00-08:00', target: 36, actual: 22, difference: -14 },
      { time_slot: '08:00-09:00', target: 36, actual: 4, difference: 'Colour change' },
      { time_slot: '09:00-10:00', target: 36, actual: 24, difference: -12 },
      { time_slot: '10:00-11:00', target: 36, actual: 16, difference: 'Line cuts -20' },
      { time_slot: '11:00-12:00', target: 36, actual: 24, difference: -12 },
      { time_slot: '12:00-13:00', target: 36, actual: 20, difference: -16 },
      { time_slot: '13:00-14:00', target: 36, actual: 27, difference: -9 }
    ]
  },

  // Page 71
  {
    page_no: 71,
    date: '22/09/2026',
    shift: 'C',
    batch_id: '39885',
    color: 'KK07',
    thickness_nominal_mm: '2.50mm',
    thickness_range: '2.37-2.63',
    checked_by_qai: 'BETTY',
    supervisor: 'Mailo',
    target_total_boxes: 288,
    actual_total_boxes: 220,
    box_difference_total: -68,
    has_production_data: true,
    transcription_issues: false,
    verification_status: 'VERIFIED',
    remarks: '1. Colour change. 2. Thickness change.',
    hourly_production: [
      { time_slot: '22:00-23:00', target: 36, actual: 30, difference: -6 },
      { time_slot: '23:00-00:00', target: 36, actual: 24, difference: -12 },
      { time_slot: '00:00-01:00', target: 36, actual: 19, difference: 'thickness change' },
      { time_slot: '01:00-02:00', target: 36, actual: 32, difference: -4 },
      { time_slot: '02:00-03:00', target: 36, actual: 30, difference: -6 },
      { time_slot: '03:00-04:00', target: 36, actual: 7, difference: 'Colour + thickness change' },
      { time_slot: '04:00-05:00', target: 36, actual: 30, difference: -6 },
      { time_slot: '05:00-06:00', target: 36, actual: 24, difference: 'Line cut -12' }
    ]
  },

  // Page 72
  {
    page_no: 72,
    date: '22/09/2026',
    shift: 'B',
    batch_id: '39885',
    color: 'KK07',
    thickness_nominal_mm: '2.50mm',
    thickness_range: '2.37-2.63',
    checked_by_qai: 'SENTLE',
    supervisor: 'DANIEL',
    target_total_boxes: 288,
    actual_total_boxes: 258,
    box_difference_total: -30,
    has_production_data: true,
    transcription_issues: false,
    verification_status: 'VERIFIED',
    remarks: '1. No colour change. 2. No thickness change. 3. Slight shade variation observed.',
    hourly_production: [
      { time_slot: '14:00-15:00', target: 36, actual: 36, difference: 0 },
      { time_slot: '15:00-16:00', target: 36, actual: 32, difference: -4 },
      { time_slot: '16:00-17:00', target: 36, actual: 28, difference: -8 },
      { time_slot: '17:00-18:00', target: 36, actual: 28, difference: -8 },
      { time_slot: '18:00-19:00', target: 36, actual: 32, difference: -4 },
      { time_slot: '19:00-20:00', target: 36, actual: 34, difference: -2 },
      { time_slot: '20:00-21:00', target: 36, actual: 33, difference: -3 },
      { time_slot: '21:00-22:00', target: 36, actual: 35, difference: -1 }
    ]
  },

  // Page 73
  {
    page_no: 73,
    date: '22/09/2026',
    shift: 'A',
    batch_id: '39885',
    color: 'KK07',
    thickness_nominal_mm: '2.50mm',
    thickness_range: '2.37-2.63',
    checked_by_qai: 'KARABO',
    supervisor: 'THEMBANI',
    target_total_boxes: 252,
    actual_total_boxes: 192,
    box_difference_total: -60,
    has_production_data: true,
    transcription_issues: false,
    verification_status: 'VERIFIED',
    remarks: '1. No colour change. 2. No thickness change. 3. Speed 37Hz.',
    hourly_production: [
      { time_slot: '06:00-07:00', target: 36, actual: 22, difference: -14 },
      { time_slot: '07:00-08:00', target: 0, actual: 0, difference: 'prod stopped' },
      { time_slot: '08:00-09:00', target: 36, actual: 24, difference: -12 },
      { time_slot: '09:00-10:00', target: 36, actual: 24, difference: -12 },
      { time_slot: '10:00-11:00', target: 36, actual: 24, difference: -12 },
      { time_slot: '11:00-12:00', target: 36, actual: 32, difference: -4 },
      { time_slot: '12:00-13:00', target: 36, actual: 32, difference: -4 },
      { time_slot: '13:00-14:00', target: 36, actual: 34, difference: -2 }
    ],
    incidents: [
      { category: 'Meeting', description: 'Production stopped for company meeting 06:50 to 08:05', impact: '75 min stoppage' }
    ]
  },

  // Page 74
  {
    page_no: 74,
    date: '21/09/2026',
    shift: 'C',
    batch_id: '39885',
    color: 'KK07',
    thickness_nominal_mm: '2.50mm',
    thickness_range: '2.37-2.63',
    checked_by_qai: 'BETTY',
    supervisor: 'Mailo',
    target_total_boxes: 288,
    actual_total_boxes: 207,
    box_difference_total: -81,
    has_production_data: true,
    transcription_issues: false,
    verification_status: 'VERIFIED',
    remarks: '1. No colour change. 2. No thickness change. 3. SPEED 36Hz.',
    hourly_production: [
      { time_slot: '22:00-23:00', target: 36, actual: 28, difference: -8 },
      { time_slot: '23:00-00:00', target: 36, actual: 24, difference: -12 },
      { time_slot: '00:00-01:00', target: 36, actual: 28, difference: -8 },
      { time_slot: '01:00-02:00', target: 36, actual: 30, difference: -6 },
      { time_slot: '02:00-03:00', target: 36, actual: 30, difference: -6 },
      { time_slot: '03:00-04:00', target: 36, actual: 24, difference: 'Line cut' },
      { time_slot: '04:00-05:00', target: 36, actual: 22, difference: -14 },
      { time_slot: '05:00-06:00', target: 36, actual: 21, difference: 'Line cut -15' }
    ]
  },

  // Page 75
  {
    page_no: 75,
    date: '21/09/2026',
    shift: 'B',
    batch_id: '39875',
    color: 'KK77',
    thickness_nominal_mm: '2.50mm',
    thickness_range: '2.37-2.63',
    checked_by_qai: 'SENTLE',
    supervisor: 'DANIEL',
    target_total_boxes: 288,
    actual_total_boxes: 69,
    box_difference_total: -219,
    has_production_data: true,
    transcription_issues: false,
    verification_status: 'REVIEW',
    verification_notes: 'Header shift marked A but time slots show 14:25-21:55 (Shift B); production stopped for meeting & changing knives until 19:20.',
    remarks: '1. Colour change. 2. Thickness change. 3. Speed 35Hz.',
    hourly_production: [
      { time_slot: '19:20-20:00', target: 36, actual: 20, difference: -16 },
      { time_slot: '20:00-21:00', target: 36, actual: 24, difference: -12 },
      { time_slot: '21:00-22:00', target: 36, actual: 25, difference: -11 }
    ],
    incidents: [
      { category: 'Tooling / Meeting', description: 'Changing knives 14:25-16:35 followed by plant meeting 16:35-18:10', impact: 'Line idle 5 hours' }
    ]
  },

  // Page 76
  {
    page_no: 76,
    date: '21/09/2026',
    shift: 'A',
    batch_id: '39875',
    color: 'KK77',
    thickness_nominal_mm: '2.50mm',
    thickness_range: '2.37-2.63',
    checked_by_qai: 'KARABO',
    supervisor: 'THEMBANI',
    target_total_boxes: 252,
    actual_total_boxes: 153,
    box_difference_total: -99,
    has_production_data: true,
    transcription_issues: false,
    verification_status: 'VERIFIED',
    remarks: '1. No colour change. 2. No thickness change. 3. Material falling at mixing mill.',
    hourly_production: [
      { time_slot: '07:00-08:00', target: 36, actual: 15, difference: 'Line cuts -21' },
      { time_slot: '08:00-09:00', target: 36, actual: 20, difference: -16 },
      { time_slot: '09:00-10:00', target: 36, actual: 26, difference: -10 },
      { time_slot: '10:00-11:00', target: 36, actual: 22, difference: -14 },
      { time_slot: '11:00-12:00', target: 36, actual: 28, difference: -8 },
      { time_slot: '12:00-13:00', target: 36, actual: 24, difference: -12 },
      { time_slot: '13:00-14:00', target: 36, actual: 18, difference: -18 }
    ],
    incidents: [
      { category: 'Line Preparation', description: 'Cleaning production line 06:25 to 07:15', impact: 'Delayed start' }
    ]
  }
];
