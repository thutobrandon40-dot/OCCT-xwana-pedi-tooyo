import React, { useState, useMemo } from 'react';
import { 
  FileSpreadsheet, 
  FileCode, 
  FileText, 
  ClipboardCheck, 
  Search, 
  Filter, 
  CheckCircle2, 
  AlertCircle, 
  Clock, 
  Calendar, 
  Layers, 
  Download, 
  TrendingDown,
  BarChart3,
  ShieldCheck,
  AlertTriangle,
  Factory,
  Eye,
  RotateCcw,
  SlidersHorizontal,
  Printer,
  Copy,
  Check,
  Gauge,
  PieChart as PieIcon,
  X,
  HelpCircle,
  Sparkles,
  Activity,
  Loader2,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { allKftRecords, ExtendedKFTPageRecord } from '../scripts/kft_all_data';
import { HoverTooltip } from './components/HoverTooltip';

export default function App() {
  const [activeTab, setActiveTab] = useState<'analytics' | 'report' | 'records' | 'hourly' | 'incidents' | 'audit'>('analytics');
  
  // Slicers State
  const [datasetFilter, setDatasetFilter] = useState<'ALL' | 'OCCT_1' | 'OCCT_2' | 'OCCT_3'>('ALL');
  const [dateStart, setDateStart] = useState<string>('');
  const [dateEnd, setDateEnd] = useState<string>('');
  const [selectedShifts, setSelectedShifts] = useState<string[]>(['A', 'B', 'C']);
  const [selectedThicknesses, setSelectedThicknesses] = useState<string[]>(['1.30', '2.00', '2.50']);
  const [selectedColor, setSelectedColor] = useState<string>('ALL');
  const [minLineSpeed, setMinLineSpeed] = useState<number>(30);
  const [maxLineSpeed, setMaxLineSpeed] = useState<number>(55);
  const [selectedEfficiencyTier, setSelectedEfficiencyTier] = useState<string>('ALL'); // ALL, HIGH (>85%), MED (70-85%), LOW (<70%)
  const [selectedQai, setSelectedQai] = useState<string>('ALL');
  const [selectedSupervisor, setSelectedSupervisor] = useState<string>('ALL');
  const [incidentFilter, setIncidentFilter] = useState<string>('ALL'); // ALL, WITH_INCIDENT, LINE_CUT, BREAKDOWN, TOOLING
  const [searchQuery, setSearchQuery] = useState('');

  // UI state
  const [selectedRecord, setSelectedRecord] = useState<ExtendedKFTPageRecord | null>(null);
  const [reportTitle, setReportTitle] = useState('KFT Executive KPI & Production Performance Report');
  const [reportNotes, setReportNotes] = useState('Production analysis generated across verified calender operations with sliced parameter constraints.');
  const [copiedSummary, setCopiedSummary] = useState(false);
  const [showSlicersMobile, setShowSlicersMobile] = useState(false);
  const [downloadingFile, setDownloadingFile] = useState<string | null>(null);
  const [toast, setToast] = useState<string | null>(null);

  const showToast = (message: string) => {
    setToast(message);
    setTimeout(() => {
      setToast(prev => prev === message ? null : prev);
    }, 4000);
  };

  // Helper to parse date "DD/MM/YYYY" to Date object
  const parseKFTDate = (dStr: string) => {
    if (!dStr) return new Date(0);
    const parts = dStr.split('/');
    if (parts.length === 3) {
      return new Date(parseInt(parts[2]), parseInt(parts[1]) - 1, parseInt(parts[0]));
    }
    return new Date(dStr);
  };

  // Distinct Filter Options
  const distinctColors = useMemo(() => {
    const set = new Set<string>();
    allKftRecords.forEach(r => {
      if (r.color && r.color !== 'N/A') set.add(r.color.trim());
    });
    return Array.from(set).sort();
  }, []);

  const distinctQais = useMemo(() => {
    const set = new Set<string>();
    allKftRecords.forEach(r => {
      if (r.checked_by_qai) {
        r.checked_by_qai.split('/').forEach(q => {
          const trimmed = q.trim();
          if (trimmed === 'TSHIDI') {
            set.add('MATSHIDISO');
          } else if (trimmed) {
            set.add(trimmed);
          }
        });
      }
    });
    return Array.from(set).sort();
  }, []);

  const distinctSupervisors = useMemo(() => {
    const set = new Set<string>();
    allKftRecords.forEach(r => {
      if (r.supervisor) {
        r.supervisor.split('/').forEach(s => {
          const trimmed = s.trim();
          if (trimmed && trimmed.toUpperCase() !== 'BETTY') {
            set.add(trimmed);
          }
        });
      }
    });
    return Array.from(set).sort();
  }, []);

  // Quick Date Presets
  const applyDatePreset = (preset: 'ALL' | 'AUG' | 'SEPT' | 'OCT' | 'LAST14') => {
    if (preset === 'ALL') {
      setDateStart('');
      setDateEnd('');
      showToast('Date range cleared: Showing all production runs');
    } else if (preset === 'AUG') {
      setDateStart('2026-08-01');
      setDateEnd('2026-08-31');
      showToast('Filtered for August 2026 (01/08 - 31/08)');
    } else if (preset === 'SEPT') {
      setDateStart('2026-09-01');
      setDateEnd('2026-09-30');
      showToast('Filtered for September 2026 (01/09 - 30/09)');
    } else if (preset === 'OCT') {
      setDateStart('2026-10-01');
      setDateEnd('2026-10-31');
      showToast('Filtered for October 2026 (01/10 - 31/10)');
    } else if (preset === 'LAST14') {
      setDateStart('2026-10-15');
      setDateEnd('2026-10-28');
      showToast('Filtered for Late October (15/10 - 28/10)');
    }
  };

  // Reset all slicers
  const resetSlicers = () => {
    setDatasetFilter('ALL');
    setDateStart('');
    setDateEnd('');
    setSelectedShifts(['A', 'B', 'C']);
    setSelectedThicknesses(['1.30', '2.00', '2.50']);
    setSelectedColor('ALL');
    setMinLineSpeed(30);
    setMaxLineSpeed(55);
    setSelectedEfficiencyTier('ALL');
    setSelectedQai('ALL');
    setSelectedSupervisor('ALL');
    setIncidentFilter('ALL');
    setSearchQuery('');
    showToast('All multi-parameter slicers reset to default (170 records)');
  };

  // Main Slicing Engine
  const slicedRecords = useMemo(() => {
    return allKftRecords.filter(r => {
      // Dataset
      if (datasetFilter !== 'ALL' && r.dataset !== datasetFilter) return false;

      // Date Range
      if (dateStart || dateEnd) {
        const d = parseKFTDate(r.date);
        if (dateStart && d < new Date(dateStart)) return false;
        if (dateEnd && d > new Date(dateEnd + 'T23:59:59')) return false;
      }

      // Shifts
      if (!selectedShifts.includes(r.shift)) return false;

      // Thickness
      const matchesThick = selectedThicknesses.some(t => r.thickness_nominal_mm.includes(t));
      if (!matchesThick) return false;

      // Color
      if (selectedColor !== 'ALL' && r.color !== selectedColor) return false;

      // Line Speed
      const speedVal = parseFloat(r.line_speed_hz || '40');
      if (!isNaN(speedVal) && (speedVal < minLineSpeed || speedVal > maxLineSpeed)) return false;

      // Efficiency Tier
      const target = r.target_total_boxes || 0;
      const actual = r.actual_total_boxes || 0;
      const eff = target > 0 ? (actual / target) * 100 : 0;
      if (selectedEfficiencyTier === 'HIGH' && eff < 85) return false;
      if (selectedEfficiencyTier === 'MED' && (eff < 70 || eff >= 85)) return false;
      if (selectedEfficiencyTier === 'LOW' && (eff >= 70 || target === 0)) return false;

      // QAI (Matshidiso and Tshidi are the same QC Inspector)
      if (selectedQai !== 'ALL') {
        if (selectedQai === 'MATSHIDISO' || selectedQai === 'TSHIDI') {
          if (!r.checked_by_qai || (!r.checked_by_qai.includes('MATSHIDISO') && !r.checked_by_qai.includes('TSHIDI'))) return false;
        } else if (!r.checked_by_qai || !r.checked_by_qai.includes(selectedQai)) {
          return false;
        }
      }

      // Supervisor
      if (selectedSupervisor !== 'ALL' && (!r.supervisor || !r.supervisor.includes(selectedSupervisor))) return false;

      // Incident category
      if (incidentFilter === 'WITH_INCIDENT') {
        if (!r.incidents || r.incidents.length === 0) return false;
      } else if (incidentFilter === 'LINE_CUT') {
        const hasLineCut = (r.remarks && r.remarks.toLowerCase().includes('line cut')) || 
          (r.incidents && r.incidents.some(i => i.category.toLowerCase().includes('line cut')));
        if (!hasLineCut) return false;
      } else if (incidentFilter === 'BREAKDOWN') {
        const hasBreakdown = (r.remarks && r.remarks.toLowerCase().includes('breakdown')) ||
          (r.incidents && r.incidents.some(i => i.category.toLowerCase().includes('breakdown')));
        if (!hasBreakdown) return false;
      } else if (incidentFilter === 'TOOLING') {
        const hasTooling = (r.remarks && (r.remarks.toLowerCase().includes('knives') || r.remarks.toLowerCase().includes('knife'))) ||
          (r.incidents && r.incidents.some(i => i.category.toLowerCase().includes('tooling') || i.category.toLowerCase().includes('knives')));
        if (!hasTooling) return false;
      }

      // Search Query
      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        const matchesQ = 
          (r.batch_id && r.batch_id.toLowerCase().includes(q)) ||
          (r.color && r.color.toLowerCase().includes(q)) ||
          (r.date && r.date.includes(q)) ||
          (r.supervisor && r.supervisor.toLowerCase().includes(q)) ||
          (r.mixer_operator && r.mixer_operator.toLowerCase().includes(q)) ||
          (r.remarks && r.remarks.toLowerCase().includes(q)) ||
          String(r.source_pdf_page).includes(q);
        if (!matchesQ) return false;
      }

      return true;
    });
  }, [
    datasetFilter, dateStart, dateEnd, selectedShifts, selectedThicknesses,
    selectedColor, minLineSpeed, maxLineSpeed, selectedEfficiencyTier,
    selectedQai, selectedSupervisor, incidentFilter, searchQuery
  ]);

  // Sliced KPI Aggregations
  const analytics = useMemo(() => {
    const count = slicedRecords.length;
    const activeRuns = slicedRecords.filter(r => r.has_production_data);
    const maintenanceRuns = count - activeRuns.length;
    const totalActual = slicedRecords.reduce((a, b) => a + (b.actual_total_boxes || 0), 0);
    const totalTarget = slicedRecords.reduce((a, b) => a + (b.target_total_boxes || 0), 0);
    const variance = totalActual - totalTarget;
    const overallEfficiency = totalTarget > 0 ? ((totalActual / totalTarget) * 100).toFixed(1) : '0';
    const avgBoxesPerRun = activeRuns.length > 0 ? Math.round(totalActual / activeRuns.length) : 0;

    // Shift breakdown
    const shiftStats = ['A', 'B', 'C'].map(sh => {
      const recs = slicedRecords.filter(r => r.shift === sh && r.has_production_data);
      const act = recs.reduce((a, b) => a + (b.actual_total_boxes || 0), 0);
      const tgt = recs.reduce((a, b) => a + (b.target_total_boxes || 0), 0);
      return {
        shift: sh,
        runs: recs.length,
        actual: act,
        target: tgt,
        variance: act - tgt,
        efficiency: tgt > 0 ? ((act / tgt) * 100).toFixed(1) : '0'
      };
    });

    // Thickness breakdown
    const thickStats = ['1.30', '2.00', '2.50'].map(th => {
      const recs = slicedRecords.filter(r => r.thickness_nominal_mm.includes(th) && r.has_production_data);
      const act = recs.reduce((a, b) => a + (b.actual_total_boxes || 0), 0);
      const tgt = recs.reduce((a, b) => a + (b.target_total_boxes || 0), 0);
      return {
        thickness: `${th} mm`,
        runs: recs.length,
        actual: act,
        target: tgt,
        efficiency: tgt > 0 ? ((act / tgt) * 100).toFixed(1) : '0'
      };
    });

    // Top colors by output
    const colorMap: Record<string, { actual: number; target: number; runs: number }> = {};
    slicedRecords.forEach(r => {
      if (r.has_production_data && r.color) {
        if (!colorMap[r.color]) colorMap[r.color] = { actual: 0, target: 0, runs: 0 };
        colorMap[r.color].actual += r.actual_total_boxes || 0;
        colorMap[r.color].target += r.target_total_boxes || 0;
        colorMap[r.color].runs += 1;
      }
    });

    const topColors = Object.entries(colorMap)
      .map(([color, stats]) => ({
        color,
        runs: stats.runs,
        actual: stats.actual,
        target: stats.target,
        efficiency: stats.target > 0 ? ((stats.actual / stats.target) * 100).toFixed(1) : '0'
      }))
      .sort((a, b) => b.actual - a.actual)
      .slice(0, 6);

    // Incidents count
    let totalIncidentEntries = 0;
    const incidentCategoryMap: Record<string, number> = {};
    slicedRecords.forEach(r => {
      if (r.incidents) {
        r.incidents.forEach(inc => {
          totalIncidentEntries++;
          incidentCategoryMap[inc.category] = (incidentCategoryMap[inc.category] || 0) + 1;
        });
      }
      if (r.remarks && r.remarks.toLowerCase().includes('line cut')) {
        incidentCategoryMap['Line Cuts'] = (incidentCategoryMap['Line Cuts'] || 0) + 1;
      }
    });

    const topIncidents = Object.entries(incidentCategoryMap)
      .map(([cat, count]) => ({ category: cat, count }))
      .sort((a, b) => b.count - a.count);

    return {
      count,
      activeRunsCount: activeRuns.length,
      maintenanceRuns,
      totalActual,
      totalTarget,
      variance,
      overallEfficiency,
      avgBoxesPerRun,
      shiftStats,
      thickStats,
      topColors,
      totalIncidentEntries,
      topIncidents
    };
  }, [slicedRecords]);

  // Copy Executive Summary
  const copyExecutiveSummary = async () => {
    const text = `KFT EXECUTIVE KPI REPORT
Title: ${reportTitle}
Date Range: ${dateStart || 'Start'} to ${dateEnd || 'End'} (Shifts: ${selectedShifts.join(', ')})
Sample Count: ${analytics.count} runs (${analytics.activeRunsCount} active, ${analytics.maintenanceRuns} maintenance)
Total Output: ${analytics.totalActual.toLocaleString()} boxes (Target: ${analytics.totalTarget.toLocaleString()} boxes)
Net Variance: ${analytics.variance.toLocaleString()} boxes
Efficiency Attainment: ${analytics.overallEfficiency}%
Average Volume Per Active Run: ${analytics.avgBoxesPerRun} boxes
Shift Breakdown:
- Shift A: ${analytics.shiftStats[0].actual.toLocaleString()} boxes (${analytics.shiftStats[0].efficiency}%)
- Shift B: ${analytics.shiftStats[1].actual.toLocaleString()} boxes (${analytics.shiftStats[1].efficiency}%)
- Shift C: ${analytics.shiftStats[2].actual.toLocaleString()} boxes (${analytics.shiftStats[2].efficiency}%)

Sign-Off & Authorizations:
- Prepared by: Duncan Akweshie (Process Analyst / Industrial Engineer)
- Reviewed & Audited by: Bosenogile Kepaletswe (Quality Assurance Manager)
- Plant Approval by: Moitshepi Kentshitswe (Production / Factory Manager)

Generated from Kalahari Floor Tiles Online Controls System.`;

    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(text);
      } else {
        throw new Error('Clipboard API unavailable');
      }
    } catch (e) {
      const textarea = document.createElement('textarea');
      textarea.value = text;
      textarea.style.position = 'fixed';
      textarea.style.opacity = '0';
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
    }
    setCopiedSummary(true);
    showToast('Executive summary copied to clipboard');
    setTimeout(() => setCopiedSummary(false), 2000);
  };

  // Robust File Download Trigger
  const triggerFileDownload = async (url: string, filename: string, title: string) => {
    setDownloadingFile(filename);
    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error(`HTTP ${res.status}: ${res.statusText}`);
      const blob = await res.blob();
      const blobUrl = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.style.display = 'none';
      a.href = blobUrl;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      setTimeout(() => {
        document.body.removeChild(a);
        window.URL.revokeObjectURL(blobUrl);
      }, 2000);
      showToast(`Downloaded ${title}`);
    } catch (err) {
      console.warn('Fallback direct download:', err);
      const a = document.createElement('a');
      a.style.display = 'none';
      a.href = url;
      a.download = filename;
      a.target = '_blank';
      document.body.appendChild(a);
      a.click();
      setTimeout(() => {
        document.body.removeChild(a);
      }, 2000);
      showToast(`Downloaded ${title}`);
    } finally {
      setTimeout(() => {
        setDownloadingFile(null);
      }, 800);
    }
  };

  // Robust In-Memory Blob Download
  const triggerBlobDownload = (csvContent: string, filename: string, title: string) => {
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const blobUrl = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.style.display = 'none';
    a.href = blobUrl;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    setTimeout(() => {
      document.body.removeChild(a);
      window.URL.revokeObjectURL(blobUrl);
    }, 2000);
    showToast(`Exported ${title} (${filename})`);
  };

  // Export Sliced Master Records to CSV
  const exportSlicedCsv = () => {
    const headers = [
      'Dataset', 'Source_Page', 'Record_ID', 'Date', 'Shift', 'Batch_ID', 
      'Color', 'Nominal_Thickness', 'Target_Total', 'Actual_Total', 
      'Variance', 'Mixer_Operator', 'Checked_By_QAI', 'Supervisor', 'Remarks'
    ];
    const rows = slicedRecords.map(r => [
      r.dataset,
      r.source_pdf_page,
      `REC-${r.dataset}-P${String(r.source_pdf_page).padStart(2, '0')}`,
      r.date,
      r.shift,
      r.batch_id || 'N/A',
      `"${r.color}"`,
      r.thickness_nominal_mm,
      r.target_total_boxes || 0,
      r.actual_total_boxes || 0,
      r.box_difference_total || 0,
      `"${r.mixer_operator || ''}"`,
      `"${r.checked_by_qai || ''}"`,
      `"${r.supervisor || ''}"`,
      `"${(r.remarks || '').replace(/"/g, '""')}"`
    ].join(','));

    triggerBlobDownload([headers.join(','), ...rows].join('\n'), `KFT_Filtered_Master_Report_${new Date().toISOString().slice(0, 10)}.csv`, 'Filtered Master Records');
  };

  // Export Hourly Production Logs to CSV
  const exportHourlyLogsCsv = () => {
    const headers = ['Dataset', 'Source_Page', 'Date', 'Shift', 'Batch_ID', 'Time_Slot', 'Target_Boxes', 'Actual_Boxes', 'Variance', 'Downtime_Annotation'];
    const rows: string[] = [];
    slicedRecords.forEach(r => {
      (r.hourly_production || []).forEach(h => {
        rows.push([
          r.dataset,
          r.source_pdf_page,
          r.date,
          r.shift,
          r.batch_id || 'N/A',
          h.time_slot,
          h.target,
          h.actual,
          h.difference,
          `"${(h.note || '').replace(/"/g, '""')}"`
        ].join(','));
      });
    });
    triggerBlobDownload([headers.join(','), ...rows].join('\n'), `KFT_Hourly_Production_${new Date().toISOString().slice(0, 10)}.csv`, 'Hourly Production Logs');
  };

  // Export Downtime Pareto Analysis to CSV
  const exportDowntimeParetoCsv = () => {
    const headers = ['Incident_Category', 'Occurrences_Count', 'Operational_Impact'];
    const rows = analytics.topIncidents.map(inc => [
      `"${inc.category}"`,
      inc.count,
      '"Causes line speed reduction, requires operator intervention and generates start-up scrap"'
    ].join(','));
    triggerBlobDownload([headers.join(','), ...rows].join('\n'), `KFT_Downtime_Pareto_${new Date().toISOString().slice(0, 10)}.csv`, 'Downtime Pareto Analysis');
  };

  // Navigate through records inside detail drawer
  const navigateRecord = (direction: number) => {
    if (!selectedRecord) return;
    const currentIndex = slicedRecords.findIndex(r => r.page_no === selectedRecord.page_no && r.dataset === selectedRecord.dataset);
    if (currentIndex === -1) return;
    const nextIndex = currentIndex + direction;
    if (nextIndex >= 0 && nextIndex < slicedRecords.length) {
      setSelectedRecord(slicedRecords[nextIndex]);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      {/* Top Header */}
      <header className="border-b border-slate-800 bg-slate-900/90 backdrop-blur sticky top-0 z-30 px-6 py-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <HoverTooltip
              title="Kalahari Floor Tiles Quality Management System"
              description="Official manufacturing database management application for KFT online colour and thickness controls (OCCT)."
              actionDetails="Branding anchor representing the factory calender quality checksheet standard."
              category="System"
            >
              <div className="w-10 h-10 rounded-lg bg-blue-600 flex items-center justify-center text-white shadow-lg shadow-blue-500/20 cursor-help">
                <Factory className="w-6 h-6" />
              </div>
            </HoverTooltip>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="text-xl font-bold tracking-tight text-white">Kalahari Floor Tiles (Pty) Ltd</h1>
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20 font-medium">
                  OCCT Database & KPI Performance Studio
                </span>
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-medium">
                  170 Total Pages (OCCT 1, 2 & 3)
                </span>
              </div>
              <div className="flex items-center gap-2 mt-0.5">
                <p className="text-xs text-slate-400">
                  Online Controls for Colour & Thickness • Parameter Range Slicers • Dynamic KPI Analysis & Report Engine
                </p>
                <span className="text-[11px] text-amber-400/90 font-medium hidden lg:inline-flex items-center gap-1 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                  <Sparkles className="w-3 h-3" />
                  Hover cursor over any button &gt;7s for interactive explanation bubble
                </span>
              </div>
            </div>
          </div>

          {/* Quick Downloads Bar wrapped with 7-second Hover Tooltips */}
          <div className="flex items-center gap-2 flex-wrap">
            <HoverTooltip
              title="Download Consolidated Excel Database"
              description="Compiles all 170 production sheets across OCCT_1 (76 sheets), OCCT_2 (30 sheets), and OCCT_3 (64 sheets) into a formatted multi-tab spreadsheet."
              actionDetails="Downloads 'KFT_Consolidated_Production_Database.xlsx' directly to your computer."
              category="Export"
            >
              <button
                onClick={() => triggerFileDownload('/KFT_Consolidated_Production_Database.xlsx', 'KFT_Consolidated_Production_Database.xlsx', 'Consolidated Production Database Excel')}
                disabled={downloadingFile === 'KFT_Consolidated_Production_Database.xlsx'}
                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-md bg-blue-600 hover:bg-blue-500 disabled:bg-blue-800 text-white text-xs font-medium transition shadow-sm cursor-pointer"
              >
                {downloadingFile === 'KFT_Consolidated_Production_Database.xlsx' ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin text-blue-200" />
                    <span>Downloading Excel...</span>
                  </>
                ) : (
                  <>
                    <FileSpreadsheet className="w-4 h-4" />
                    <span>Consolidated Excel (170 Recs)</span>
                  </>
                )}
              </button>
            </HoverTooltip>

            <HoverTooltip
              title="Generate Executive Performance Report"
              description="Switches to the executive report creation studio to compile a printable, formal quality and performance audit."
              actionDetails="Opens the formal document preview with custom headers, KPI summaries, and printable format."
              category="Reporting"
            >
              <button
                onClick={() => setActiveTab('report')}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-amber-600 hover:bg-amber-500 text-white text-xs font-medium transition shadow-sm"
              >
                <Printer className="w-4 h-4" />
                <span>Generate KPI Report</span>
              </button>
            </HoverTooltip>
          </div>
        </div>
      </header>

      {/* Main Workspace Layout */}
      <div className="max-w-7xl mx-auto w-full p-6 flex-1 flex flex-col gap-6">
        {/* Navigation Tabs wrapped with Hover Tooltips */}
        <div className="flex items-center justify-between gap-4 border-b border-slate-800 pb-3 flex-wrap">
          <div className="flex items-center gap-1 bg-slate-900 p-1 rounded-lg border border-slate-800 overflow-x-auto">
            <HoverTooltip
              title="KPI Performance Analytics View"
              description="Displays dynamic executive scorecards, target attainment gauges, shift efficiency breakdowns, and thickness volume allocations."
              actionDetails="Activates the real-time visual KPI dashboard computed from current slicer values."
              category="Navigation"
            >
              <button
                onClick={() => setActiveTab('analytics')}
                className={`px-3.5 py-1.5 rounded-md text-xs font-medium transition flex items-center gap-1.5 ${
                  activeTab === 'analytics'
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Activity className="w-3.5 h-3.5" />
                <span>KPI Performance Analytics</span>
              </button>
            </HoverTooltip>

            <HoverTooltip
              title="Executive Report Generator View"
              description="Renders a formal, print-ready executive manufacturing report with customizable title, notes, and tables."
              actionDetails="Opens the formal report view ready for browser printing, PDF generation, or clipboard copy."
              category="Navigation"
            >
              <button
                onClick={() => setActiveTab('report')}
                className={`px-3.5 py-1.5 rounded-md text-xs font-medium transition flex items-center gap-1.5 ${
                  activeTab === 'report'
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <FileText className="w-3.5 h-3.5" />
                <span>Executive Report Generator</span>
              </button>
            </HoverTooltip>

            <HoverTooltip
              title="Master Production Records Table"
              description="Displays the tabular database of production runs matching all active parameter slicers."
              actionDetails="Switches to the searchable, paginated table of production batches with inspector signatures."
              category="Navigation"
            >
              <button
                onClick={() => setActiveTab('records')}
                className={`px-3.5 py-1.5 rounded-md text-xs font-medium transition flex items-center gap-1.5 ${
                  activeTab === 'records'
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Layers className="w-3.5 h-3.5" />
                <span>Sliced Master Records ({slicedRecords.length})</span>
              </button>
            </HoverTooltip>

            <HoverTooltip
              title="Granular Hourly Production Logs"
              description="Examines output hour by hour across all 8 hourly time-slots per shift."
              actionDetails="Opens the hourly logs table detailing boxes produced, targets, and time-annotated interruptions."
              category="Navigation"
            >
              <button
                onClick={() => setActiveTab('hourly')}
                className={`px-3.5 py-1.5 rounded-md text-xs font-medium transition flex items-center gap-1.5 ${
                  activeTab === 'hourly'
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Clock className="w-3.5 h-3.5" />
                <span>Hourly Logs</span>
              </button>
            </HoverTooltip>

            <HoverTooltip
              title="Downtime & Incident Pareto Analysis"
              description="Analyzes the root causes behind line cuts, machine breakdowns, punching press knife changes, and boiler failures."
              actionDetails="Displays the categorized downtime frequency bars ranked by occurrence."
              category="Navigation"
            >
              <button
                onClick={() => setActiveTab('incidents')}
                className={`px-3.5 py-1.5 rounded-md text-xs font-medium transition flex items-center gap-1.5 ${
                  activeTab === 'incidents'
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <AlertCircle className="w-3.5 h-3.5" />
                <span>Downtime Pareto</span>
              </button>
            </HoverTooltip>

            <HoverTooltip
              title="Consolidated Page Audit Manifest"
              description="Verifies the inspection and data status of all 170 scanned pages across OCCT_1, OCCT_2 and OCCT_3."
              actionDetails="Shows the traceability audit log with handwriting review notes and record IDs."
              category="Navigation"
            >
              <button
                onClick={() => setActiveTab('audit')}
                className={`px-3.5 py-1.5 rounded-md text-xs font-medium transition flex items-center gap-1.5 ${
                  activeTab === 'audit'
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <ClipboardCheck className="w-3.5 h-3.5" />
                <span>Audit Manifest (170)</span>
              </button>
            </HoverTooltip>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowSlicersMobile(!showSlicersMobile)}
              className="md:hidden px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-xs font-medium text-slate-300 flex items-center gap-1.5"
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>{showSlicersMobile ? 'Hide Slicers' : 'Show Slicers'}</span>
            </button>

            <HoverTooltip
              title="Reset All Slicers to Default"
              description="Clears all active filters including date ranges, shift selections, line speed boundaries, and search queries."
              actionDetails="Instantly restores the view to display all 170 records across the full date span."
              category="Filter Control"
            >
              <button
                onClick={resetSlicers}
                className="px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 text-xs font-medium text-slate-300 flex items-center gap-1.5 transition"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset Slicers</span>
              </button>
            </HoverTooltip>
          </div>
        </div>

        {/* Slicers Control Bar / Panel */}
        <div className={`bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-lg flex flex-col gap-4 ${
          showSlicersMobile ? 'block' : 'hidden md:flex'
        }`}>
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <SlidersHorizontal className="w-4 h-4 text-blue-400" />
              <span className="text-xs font-bold text-white uppercase tracking-wider">
                Multi-Parameter Performance Slicers
              </span>
              <span className="text-xs text-slate-400 ml-2">
                Active Filter Match: <strong className="text-blue-400">{slicedRecords.length}</strong> / {allKftRecords.length} records
              </span>
            </div>

            {/* Quick Preset Buttons wrapped with Hover Tooltips */}
            <div className="flex items-center gap-1.5">
              <span className="text-[11px] text-slate-500 mr-1 hidden lg:inline">Quick Presets:</span>
              <HoverTooltip
                title="All Time Date Slicer"
                description="Removes any start and end date restrictions, encompassing all production records from August 3 to October 28, 2026."
                actionDetails="Expands the time window to the maximum available date range."
                category="Date Slicer"
              >
                <button
                  onClick={() => applyDatePreset('ALL')}
                  className="px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 text-[11px] text-slate-300 transition"
                >
                  All Time
                </button>
              </HoverTooltip>

              <HoverTooltip
                title="August 2026 Production Filter"
                description="Restricts the analysis strictly to batches produced between 01/08/2026 and 31/08/2026 from OCCT_3."
                actionDetails="Sets start date to Aug 1 and end date to Aug 31, 2026."
                category="Date Slicer"
              >
                <button
                  onClick={() => applyDatePreset('AUG')}
                  className="px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 text-[11px] text-slate-300 transition"
                >
                  Aug 2026
                </button>
              </HoverTooltip>

              <HoverTooltip
                title="September 2026 Production Filter"
                description="Restricts the analysis strictly to batches produced between 01/09/2026 and 30/09/2026."
                actionDetails="Sets start date to Sept 1 and end date to Sept 30, 2026."
                category="Date Slicer"
              >
                <button
                  onClick={() => applyDatePreset('SEPT')}
                  className="px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 text-[11px] text-slate-300 transition"
                >
                  Sept 2026
                </button>
              </HoverTooltip>

              <HoverTooltip
                title="October 2026 Production Filter"
                description="Restricts the analysis strictly to batches produced between 01/10/2026 and 31/10/2026."
                actionDetails="Sets start date to Oct 1 and end date to Oct 31, 2026."
                category="Date Slicer"
              >
                <button
                  onClick={() => applyDatePreset('OCT')}
                  className="px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 text-[11px] text-slate-300 transition"
                >
                  Oct 2026
                </button>
              </HoverTooltip>

              <HoverTooltip
                title="Late October (14 Days) Window"
                description="Isolates the final two weeks of high-output production runs from 15/10/2026 to 28/10/2026."
                actionDetails="Filters records to the most recent 14-day production period."
                category="Date Slicer"
              >
                <button
                  onClick={() => applyDatePreset('LAST14')}
                  className="px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 text-[11px] text-slate-300 transition"
                >
                  Late Oct (14D)
                </button>
              </HoverTooltip>
            </div>
          </div>

          {/* Grid of Slicers with Hover Tooltips */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
            {/* Slicer 1: Dataset & Date Range */}
            <div className="flex flex-col gap-2 bg-slate-950 p-3 rounded-lg border border-slate-800">
              <span className="font-semibold text-slate-300 flex items-center justify-between">
                <span>Dataset & Date Range</span>
                <Calendar className="w-3.5 h-3.5 text-slate-500" />
              </span>
              <div className="grid grid-cols-4 gap-1">
                {(['ALL', 'OCCT_3', 'OCCT_2', 'OCCT_1'] as const).map(ds => (
                  <HoverTooltip
                    key={ds}
                    title={`Select ${ds === 'ALL' ? 'Combined Dataset' : ds}`}
                    description={
                      ds === 'ALL' 
                        ? 'Includes all 170 production records from OCCT_1, OCCT_2, and OCCT_3.'
                        : ds === 'OCCT_3'
                        ? 'Filters strictly for the 64 production sheets in OCCT_3 (August 2026).'
                        : ds === 'OCCT_2' 
                        ? 'Filters strictly for the 30 production sheets in OCCT_2 (September 2026).'
                        : 'Filters strictly for the 76 production sheets in OCCT_1 (Sept-Oct 2026).'
                    }
                    actionDetails={`Filters active view to ${ds}.`}
                    category="Dataset Slicer"
                  >
                    <button
                      onClick={() => setDatasetFilter(ds)}
                      className={`w-full py-1 rounded text-[10px] font-medium transition ${
                        datasetFilter === ds
                          ? 'bg-blue-600 text-white'
                          : 'bg-slate-900 text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      {ds === 'ALL' ? 'All (170)' : ds === 'OCCT_3' ? 'OCCT 3 (64)' : ds === 'OCCT_2' ? 'OCCT 2 (30)' : 'OCCT 1 (76)'}
                    </button>
                  </HoverTooltip>
                ))}
              </div>
              <div className="grid grid-cols-2 gap-2 mt-1">
                <div>
                  <label className="text-[10px] text-slate-500 block mb-0.5">From Date</label>
                  <input
                    type="date"
                    value={dateStart}
                    onChange={e => setDateStart(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 rounded px-2 py-1 text-[11px] text-slate-200 focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="text-[10px] text-slate-500 block mb-0.5">To Date</label>
                  <input
                    type="date"
                    value={dateEnd}
                    onChange={e => setDateEnd(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 rounded px-2 py-1 text-[11px] text-slate-200 focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>
            </div>

            {/* Slicer 2: Shifts & Nominal Thickness */}
            <div className="flex flex-col gap-2 bg-slate-950 p-3 rounded-lg border border-slate-800">
              <span className="font-semibold text-slate-300 flex items-center justify-between">
                <span>Shifts & Thickness Spec</span>
                <Layers className="w-3.5 h-3.5 text-slate-500" />
              </span>
              <div className="flex items-center gap-1.5">
                {['A', 'B', 'C'].map(sh => {
                  const active = selectedShifts.includes(sh);
                  const shiftDesc = 
                    sh === 'A' ? 'Morning shift operating from 06:00 to 14:00.' :
                    sh === 'B' ? 'Afternoon shift operating from 14:00 to 22:00.' :
                    'Night shift operating from 22:00 to 06:00.';
                  return (
                    <HoverTooltip
                      key={sh}
                      title={`Toggle Shift ${sh} Inclusion`}
                      description={shiftDesc}
                      actionDetails={`Click to ${active ? 'remove' : 'include'} Shift ${sh} records in the analysis.`}
                      category="Shift Slicer"
                      className="flex-1"
                    >
                      <button
                        onClick={() => {
                          if (active && selectedShifts.length > 1) {
                            setSelectedShifts(selectedShifts.filter(s => s !== sh));
                          } else if (!active) {
                            setSelectedShifts([...selectedShifts, sh]);
                          }
                        }}
                        className={`w-full py-1 rounded text-[11px] font-bold border transition ${
                          active
                            ? 'bg-blue-600/20 border-blue-500 text-blue-300'
                            : 'bg-slate-900 border-slate-800 text-slate-500'
                        }`}
                      >
                        Shift {sh}
                      </button>
                    </HoverTooltip>
                  );
                })}
              </div>
              <div className="flex items-center gap-1.5 mt-1">
                {['1.30', '2.00', '2.50'].map(th => {
                  const active = selectedThicknesses.includes(th);
                  return (
                    <HoverTooltip
                      key={th}
                      title={`Toggle ${th} mm Thickness Spec`}
                      description={`Filters for floor tiles produced to the nominal ${th} mm thickness specification.`}
                      actionDetails={`Click to ${active ? 'exclude' : 'include'} ${th} mm runs.`}
                      category="Thickness Slicer"
                      className="flex-1"
                    >
                      <button
                        onClick={() => {
                          if (active && selectedThicknesses.length > 1) {
                            setSelectedThicknesses(selectedThicknesses.filter(t => t !== th));
                          } else if (!active) {
                            setSelectedThicknesses([...selectedThicknesses, th]);
                          }
                        }}
                        className={`w-full py-1 rounded text-[11px] font-mono border transition ${
                          active
                            ? 'bg-emerald-600/20 border-emerald-500 text-emerald-300 font-semibold'
                            : 'bg-slate-900 border-slate-800 text-slate-500'
                        }`}
                      >
                        {th} mm
                      </button>
                    </HoverTooltip>
                  );
                })}
              </div>
            </div>

            {/* Slicer 3: Line Speed Range (Hz) & Efficiency Tier */}
            <div className="flex flex-col gap-2 bg-slate-950 p-3 rounded-lg border border-slate-800">
              <span className="font-semibold text-slate-300 flex items-center justify-between">
                <span>Line Speed & Efficiency Tier</span>
                <Gauge className="w-3.5 h-3.5 text-slate-500" />
              </span>
              <div className="flex items-center justify-between text-[11px] text-slate-400">
                <span>Speed Range:</span>
                <span className="font-mono text-blue-400 font-bold">{minLineSpeed} - {maxLineSpeed} Hz</span>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="range"
                  min="30"
                  max="50"
                  value={minLineSpeed}
                  onChange={e => setMinLineSpeed(Number(e.target.value))}
                  className="w-full accent-blue-500"
                />
                <input
                  type="range"
                  min="35"
                  max="55"
                  value={maxLineSpeed}
                  onChange={e => setMaxLineSpeed(Number(e.target.value))}
                  className="w-full accent-blue-500"
                />
              </div>
              <div className="grid grid-cols-4 gap-1 mt-1">
                {[
                  { id: 'ALL', label: 'All Eff', desc: 'Shows all runs regardless of output efficiency.' },
                  { id: 'HIGH', label: '≥85%', desc: 'Isolates high-performing shifts achieving 85% or greater of target output.' },
                  { id: 'MED', label: '70-85%', desc: 'Shows average runs with attainment between 70% and 85%.' },
                  { id: 'LOW', label: '<70%', desc: 'Highlights underperforming shifts achieving less than 70% of target boxes.' }
                ].map(tier => (
                  <HoverTooltip
                    key={tier.id}
                    title={`Efficiency Filter: ${tier.label}`}
                    description={tier.desc}
                    actionDetails={`Filters records according to the ${tier.label} attainment threshold.`}
                    category="Efficiency Slicer"
                  >
                    <button
                      onClick={() => setSelectedEfficiencyTier(tier.id)}
                      className={`w-full py-1 rounded text-[10px] font-medium transition ${
                        selectedEfficiencyTier === tier.id
                          ? 'bg-indigo-600 text-white'
                          : 'bg-slate-900 text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      {tier.label}
                    </button>
                  </HoverTooltip>
                ))}
              </div>
            </div>

            {/* Slicer 4: Product Color & Incidents */}
            <div className="flex flex-col gap-2 bg-slate-950 p-3 rounded-lg border border-slate-800">
              <span className="font-semibold text-slate-300 flex items-center justify-between">
                <span>Color & Incident Filter</span>
                <Filter className="w-3.5 h-3.5 text-slate-500" />
              </span>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-[10px] text-slate-500 block mb-0.5">Product Color</label>
                  <select
                    value={selectedColor}
                    onChange={e => setSelectedColor(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 rounded px-2 py-1 text-[11px] text-slate-200 focus:outline-none focus:border-blue-500"
                  >
                    <option value="ALL">All Colors ({distinctColors.length})</option>
                    {distinctColors.map(c => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-[10px] text-slate-500 block mb-0.5">Incident Type</label>
                  <select
                    value={incidentFilter}
                    onChange={e => setIncidentFilter(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 rounded px-2 py-1 text-[11px] text-slate-200 focus:outline-none focus:border-blue-500"
                  >
                    <option value="ALL">All Events</option>
                    <option value="WITH_INCIDENT">Any Logged Incident</option>
                    <option value="LINE_CUT">Line Cuts (Mill Fall)</option>
                    <option value="BREAKDOWN">Machine Breakdowns</option>
                    <option value="TOOLING">Knife / Tooling Change</option>
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2 mt-1">
                <div>
                  <select
                    value={selectedQai}
                    onChange={e => setSelectedQai(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 rounded px-2 py-1 text-[10px] text-slate-300 focus:outline-none"
                  >
                    <option value="ALL">All Inspectors</option>
                    {distinctQais.map(q => (
                      <option key={q} value={q}>
                        {q === 'MATSHIDISO' ? 'MATSHIDISO (Tshidi)' : q}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <select
                    value={selectedSupervisor}
                    onChange={e => setSelectedSupervisor(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 rounded px-2 py-1 text-[10px] text-slate-300 focus:outline-none"
                  >
                    <option value="ALL">All Supervisors</option>
                    {distinctSupervisors.map(s => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* TAB 1: KPI PERFORMANCE ANALYTICS */}
        {activeTab === 'analytics' && (
          <div className="flex flex-col gap-6">
            {/* Top Aggregated Performance Scorecard */}
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 flex flex-col justify-between shadow-sm">
                <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">Total Sliced Runs</span>
                <div className="my-2">
                  <span className="text-3xl font-bold text-white">{analytics.count}</span>
                  <span className="text-xs text-slate-500 ml-1">runs</span>
                </div>
                <span className="text-xs text-blue-400">
                  {analytics.activeRunsCount} active, {analytics.maintenanceRuns} idle
                </span>
              </div>

              <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 flex flex-col justify-between shadow-sm">
                <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">Total Actual Output</span>
                <div className="my-2">
                  <span className="text-3xl font-bold text-emerald-400">{analytics.totalActual.toLocaleString()}</span>
                  <span className="text-xs text-slate-400 ml-1">boxes</span>
                </div>
                <span className="text-xs text-slate-400">
                  Target: {analytics.totalTarget.toLocaleString()}
                </span>
              </div>

              <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 flex flex-col justify-between shadow-sm">
                <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">Target Attainment %</span>
                <div className="my-2 flex items-baseline gap-2">
                  <span className={`text-3xl font-bold ${
                    Number(analytics.overallEfficiency) >= 80 ? 'text-emerald-400' :
                    Number(analytics.overallEfficiency) >= 65 ? 'text-amber-400' : 'text-rose-400'
                  }`}>
                    {analytics.overallEfficiency}%
                  </span>
                </div>
                <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                  <div 
                    className="bg-blue-500 h-full rounded-full transition-all duration-500"
                    style={{ width: `${Math.min(100, Number(analytics.overallEfficiency))}%` }}
                  />
                </div>
              </div>

              <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 flex flex-col justify-between shadow-sm">
                <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">Net Box Variance</span>
                <div className="my-2">
                  <span className="text-3xl font-bold text-rose-400">
                    {analytics.variance > 0 ? `+${analytics.variance.toLocaleString()}` : analytics.variance.toLocaleString()}
                  </span>
                  <span className="text-xs text-slate-400 ml-1">boxes</span>
                </div>
                <span className="text-xs text-rose-400/80 flex items-center gap-1">
                  <TrendingDown className="w-3.5 h-3.5" /> Production gap
                </span>
              </div>

              <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 flex flex-col justify-between shadow-sm">
                <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">Avg Output Per Shift</span>
                <div className="my-2">
                  <span className="text-3xl font-bold text-indigo-400">{analytics.avgBoxesPerRun}</span>
                  <span className="text-xs text-slate-400 ml-1">boxes/run</span>
                </div>
                <span className="text-xs text-slate-400">
                  Theoretical: 288 boxes/shift
                </span>
              </div>

              <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 flex flex-col justify-between shadow-sm">
                <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">Logged Incidents</span>
                <div className="my-2">
                  <span className="text-3xl font-bold text-amber-400">{analytics.totalIncidentEntries}</span>
                  <span className="text-xs text-slate-400 ml-1">events</span>
                </div>
                <span className="text-xs text-amber-400 flex items-center gap-1">
                  <AlertTriangle className="w-3.5 h-3.5" /> Downtime impacts
                </span>
              </div>
            </div>

            {/* Performance Visualizations: Shift Comparison + Thickness Distribution */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Shift Performance Card */}
              <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-lg flex flex-col justify-between">
                <div>
                  <h3 className="text-sm font-bold text-white mb-1 flex items-center gap-2">
                    <BarChart3 className="w-4 h-4 text-blue-400" />
                    Shift Output & Efficiency Comparison
                  </h3>
                  <p className="text-xs text-slate-400 mb-4">
                    Comparison across Morning (A), Afternoon (B), and Night (C) shifts.
                  </p>

                  <div className="space-y-4">
                    {analytics.shiftStats.map(s => (
                      <div key={s.shift} className="bg-slate-950 p-3 rounded-lg border border-slate-800/80">
                        <div className="flex items-center justify-between text-xs mb-1.5">
                          <span className="font-bold text-white">Shift {s.shift}</span>
                          <span className="font-mono text-emerald-400 font-semibold">{s.actual.toLocaleString()} boxes ({s.efficiency}%)</span>
                        </div>
                        <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden mb-2">
                          <div
                            className={`h-full rounded-full transition-all duration-500 ${
                              s.shift === 'A' ? 'bg-amber-500' :
                              s.shift === 'B' ? 'bg-blue-500' : 'bg-purple-500'
                            }`}
                            style={{ width: `${Math.min(100, Number(s.efficiency))}%` }}
                          />
                        </div>
                        <div className="flex items-center justify-between text-[11px] text-slate-500 font-mono">
                          <span>Target: {s.target.toLocaleString()} boxes</span>
                          <span>Shortfall: {s.variance.toLocaleString()}</span>
                          <span>Runs: {s.runs}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-800 text-[11px] text-slate-400 flex items-center justify-between">
                  <span>Top Attainment Shift:</span>
                  <span className="font-bold text-blue-400">
                    Shift {analytics.shiftStats.reduce((max, s) => Number(s.efficiency) > Number(max.efficiency) ? s : max, analytics.shiftStats[0]).shift}
                  </span>
                </div>
              </div>

              {/* Output by Thickness Card */}
              <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-lg flex flex-col justify-between">
                <div>
                  <h3 className="text-sm font-bold text-white mb-1 flex items-center gap-2">
                    <PieIcon className="w-4 h-4 text-emerald-400" />
                    Volume by Tile Thickness Specification
                  </h3>
                  <p className="text-xs text-slate-400 mb-4">
                    Product mix allocation and attainment across 1.30mm, 2.00mm, and 2.50mm lines.
                  </p>

                  <div className="space-y-4">
                    {analytics.thickStats.map(t => (
                      <div key={t.thickness} className="bg-slate-950 p-3 rounded-lg border border-slate-800/80">
                        <div className="flex items-center justify-between text-xs mb-1.5">
                          <span className="font-mono font-bold text-slate-200">{t.thickness}</span>
                          <span className="font-mono text-emerald-400 font-semibold">{t.actual.toLocaleString()} boxes</span>
                        </div>
                        <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden mb-2">
                          <div
                            className="bg-emerald-500 h-full rounded-full transition-all duration-500"
                            style={{ width: `${Math.min(100, Number(t.efficiency))}%` }}
                          />
                        </div>
                        <div className="flex items-center justify-between text-[11px] text-slate-500 font-mono">
                          <span>Target: {t.target.toLocaleString()} boxes</span>
                          <span>Attainment: {t.efficiency}%</span>
                          <span>Batches: {t.runs}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-800 text-[11px] text-slate-400 flex items-center justify-between">
                  <span>Dominant Production Thickness:</span>
                  <span className="font-bold text-emerald-400">
                    {analytics.thickStats.reduce((max, t) => t.actual > max.actual ? t : max, analytics.thickStats[0]).thickness}
                  </span>
                </div>
              </div>

              {/* Downtime Pareto & Root Causes */}
              <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-lg flex flex-col justify-between">
                <div>
                  <h3 className="text-sm font-bold text-white mb-1 flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 text-amber-400" />
                    Downtime Pareto & Interruption Causes
                  </h3>
                  <p className="text-xs text-slate-400 mb-4">
                    Primary operational drivers causing line stoppages and volume gaps.
                  </p>

                  <div className="space-y-2.5">
                    {analytics.topIncidents.slice(0, 5).map((inc, i) => (
                      <div key={i} className="flex items-center justify-between text-xs bg-slate-950 px-3 py-2 rounded-lg border border-slate-800">
                        <div className="flex items-center gap-2">
                          <span className="w-4 h-4 rounded-full bg-slate-800 text-slate-300 flex items-center justify-center text-[10px] font-bold">
                            {i + 1}
                          </span>
                          <span className="text-slate-200 font-medium">{inc.category}</span>
                        </div>
                        <span className="font-mono px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20 text-[11px] font-semibold">
                          {inc.count} occurrences
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-800 text-[11px] text-slate-400 flex items-center justify-between">
                  <span>#1 Quality & Line Hazard:</span>
                  <span className="text-rose-400 font-medium">Mixing Mill Material Fall</span>
                </div>
              </div>
            </div>

            {/* Top Produced Colors & Performance Table */}
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-lg">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-sm font-bold text-white">Top Produced Product Colors & Recipe Performance</h3>
                  <p className="text-xs text-slate-400">Production throughput and attainment by tile color formulation.</p>
                </div>
                <HoverTooltip
                  title="Export Current Filtered Results"
                  description="Downloads the currently sliced production runs as a comma-separated values (.csv) spreadsheet file."
                  actionDetails="Downloads 'KFT_Filtered_Report_[Date].csv'."
                  category="Export"
                >
                  <button
                    onClick={exportSlicedCsv}
                    className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-medium text-slate-200 flex items-center gap-1.5 transition"
                  >
                    <Download className="w-3.5 h-3.5" /> Export Filtered Table (.csv)
                  </button>
                </HoverTooltip>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {analytics.topColors.map(c => (
                  <div key={c.color} className="bg-slate-950 border border-slate-800 rounded-lg p-3.5">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-bold text-white">{c.color}</span>
                      <span className="text-xs font-mono font-bold text-emerald-400">{c.actual.toLocaleString()} boxes</span>
                    </div>
                    <div className="flex items-center justify-between text-[11px] text-slate-400 font-mono mb-2">
                      <span>Target: {c.target.toLocaleString()}</span>
                      <span>Attainment: <strong className={Number(c.efficiency) >= 80 ? 'text-emerald-400' : 'text-amber-400'}>{c.efficiency}%</strong></span>
                      <span>Batches: {c.runs}</span>
                    </div>
                    <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                      <div
                        className="bg-blue-500 h-full rounded-full"
                        style={{ width: `${Math.min(100, Number(c.efficiency))}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: EXECUTIVE REPORT GENERATOR */}
        {activeTab === 'report' && (
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-lg flex flex-col gap-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-4">
              <div>
                <h2 className="text-base font-bold text-white flex items-center gap-2">
                  <FileText className="w-5 h-5 text-amber-400" />
                  Custom KPI Performance Report Generator
                </h2>
                <p className="text-xs text-slate-400">
                  Generate executive-ready manufacturing performance audits with dynamic slicer parameters and operational insights.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <HoverTooltip
                  title="Copy Executive Summary to Clipboard"
                  description="Formats key performance metrics, box variance, and shift breakdowns into a scannable text summary."
                  actionDetails="Copies text block directly to your clipboard for pasting into shift handover emails or chat."
                  category="Report Action"
                >
                  <button
                    onClick={copyExecutiveSummary}
                    className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-medium text-slate-200 flex items-center gap-1.5 transition"
                  >
                    {copiedSummary ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedSummary ? 'Copied to Clipboard' : 'Copy Summary'}</span>
                  </button>
                </HoverTooltip>

                <HoverTooltip
                  title="Print or Save Formal Report as PDF"
                  description="Invokes the browser print preview formatted specifically for paper printouts or PDF export."
                  actionDetails="Triggers your browser's print dialog with custom styling for A4 print layouts."
                  category="Report Action"
                >
                  <button
                    onClick={() => window.print()}
                    className="px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-xs font-medium text-white flex items-center gap-1.5 transition"
                  >
                    <Printer className="w-3.5 h-3.5" />
                    <span>Print / Save PDF</span>
                  </button>
                </HoverTooltip>

                <HoverTooltip
                  title="Export Sliced Data to CSV"
                  description="Compiles only the records matching your current slicers and downloads them as a comma-separated values file."
                  actionDetails="Downloads a .csv file containing batch IDs, dates, actuals, targets, and remarks."
                  category="Export"
                >
                  <button
                    onClick={exportSlicedCsv}
                    className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-xs font-medium text-white flex items-center gap-1.5 transition"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Export Sliced (.csv)</span>
                  </button>
                </HoverTooltip>
              </div>
            </div>

            {/* Custom Report Configuration Controls */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-slate-950 p-4 rounded-xl border border-slate-800">
              <div>
                <label className="text-xs font-semibold text-slate-400 block mb-1">Report Heading</label>
                <input
                  type="text"
                  value={reportTitle}
                  onChange={e => setReportTitle(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-blue-500"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-400 block mb-1">Executive Commentary / Notes</label>
                <input
                  type="text"
                  value={reportNotes}
                  onChange={e => setReportNotes(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>

            {/* The Formal Printable Report Document Preview */}
            <div className="bg-white text-slate-900 rounded-xl p-8 shadow-2xl border border-slate-200 font-sans print:shadow-none print:p-0">
              {/* Document Header */}
              <div className="flex items-start justify-between border-b-2 border-slate-900 pb-4 mb-6">
                <div>
                  <div className="text-xl font-black uppercase tracking-wider text-slate-900">
                    KALAHARI FLOOR TILES (PTY) LTD
                  </div>
                  <div className="text-sm font-bold text-blue-900 mt-0.5">
                    {reportTitle}
                  </div>
                  <div className="text-xs text-slate-600 mt-1">
                    Quality Assurance & Manufacturing Operations Analysis
                  </div>
                  <div className="text-xs font-semibold text-slate-800 mt-1 flex items-center gap-1.5">
                    <span className="text-slate-500 font-normal">Prepared by:</span>
                    <span className="text-blue-900 font-bold">Duncan Akweshie</span>
                    <span className="text-slate-500 font-normal">• Process Analyst / Industrial Engineer</span>
                  </div>
                </div>

                <div className="text-right text-xs text-slate-600">
                  <div className="font-bold text-slate-900">DOC NO: KFT-QC-8.5.1-OCCT-F-01</div>
                  <div>Report Generated: {new Date().toLocaleDateString()}</div>
                  <div className="font-semibold text-blue-700">Scope: {datasetFilter === 'ALL' ? 'Consolidated (OCCT_1 & 2)' : datasetFilter}</div>
                </div>
              </div>

              {/* Slicer Parameters Scope */}
              <div className="bg-slate-50 border border-slate-200 rounded-lg p-3.5 mb-6 text-xs text-slate-700">
                <span className="font-bold uppercase tracking-wider text-slate-900 block mb-1">
                  Active Filter Parameters (Slicers Applied)
                </span>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-[11px]">
                  <div><strong className="text-slate-900">Date Range:</strong> {dateStart || 'Inception'} to {dateEnd || 'Latest'}</div>
                  <div><strong className="text-slate-900">Shifts:</strong> {selectedShifts.join(', ')}</div>
                  <div><strong className="text-slate-900">Thicknesses:</strong> {selectedThicknesses.map(t => `${t}mm`).join(', ')}</div>
                  <div><strong className="text-slate-900">Product Color:</strong> {selectedColor}</div>
                  <div><strong className="text-slate-900">Speed Range:</strong> {minLineSpeed} - {maxLineSpeed} Hz</div>
                  <div><strong className="text-slate-900">Efficiency Tier:</strong> {selectedEfficiencyTier}</div>
                  <div><strong className="text-slate-900">Inspector:</strong> {selectedQai === 'MATSHIDISO' ? 'MATSHIDISO (Tshidi)' : selectedQai}</div>
                  <div><strong className="text-slate-900">Supervisor:</strong> {selectedSupervisor}</div>
                </div>
              </div>

              {/* Executive Commentary */}
              <div className="mb-6 text-xs text-slate-700 italic border-l-4 border-blue-600 pl-3 py-1">
                "{reportNotes}"
              </div>

              {/* Core KPI Table */}
              <div className="mb-6">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-2 border-b border-slate-300 pb-1">
                  1. Executive KPI Scorecard
                </h4>
                <table className="w-full text-xs border border-slate-300 border-collapse text-left">
                  <thead className="bg-slate-100 text-slate-800 font-bold">
                    <tr>
                      <th className="p-2 border border-slate-300">Metric</th>
                      <th className="p-2 border border-slate-300 text-right">Target</th>
                      <th className="p-2 border border-slate-300 text-right">Actual Recorded</th>
                      <th className="p-2 border border-slate-300 text-right">Variance</th>
                      <th className="p-2 border border-slate-300 text-right">Attainment %</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="p-2 border border-slate-300 font-semibold">Total Production Output (Boxes)</td>
                      <td className="p-2 border border-slate-300 text-right font-mono">{analytics.totalTarget.toLocaleString()}</td>
                      <td className="p-2 border border-slate-300 text-right font-mono font-bold text-slate-900">{analytics.totalActual.toLocaleString()}</td>
                      <td className="p-2 border border-slate-300 text-right font-mono text-red-600">{analytics.variance.toLocaleString()}</td>
                      <td className="p-2 border border-slate-300 text-right font-mono font-bold text-blue-900">{analytics.overallEfficiency}%</td>
                    </tr>
                    <tr className="bg-slate-50">
                      <td className="p-2 border border-slate-300 font-semibold">Sampled Runs / Production Shifts</td>
                      <td className="p-2 border border-slate-300 text-right font-mono">{analytics.count}</td>
                      <td className="p-2 border border-slate-300 text-right font-mono">{analytics.activeRunsCount} active</td>
                      <td className="p-2 border border-slate-300 text-right font-mono">{analytics.maintenanceRuns} idle/maint</td>
                      <td className="p-2 border border-slate-300 text-right font-mono">{analytics.count > 0 ? ((analytics.activeRunsCount / analytics.count) * 100).toFixed(0) : 0}% active</td>
                    </tr>
                    <tr>
                      <td className="p-2 border border-slate-300 font-semibold">Average Output per Active Run</td>
                      <td className="p-2 border border-slate-300 text-right font-mono">288 boxes</td>
                      <td className="p-2 border border-slate-300 text-right font-mono">{analytics.avgBoxesPerRun} boxes</td>
                      <td className="p-2 border border-slate-300 text-right font-mono text-red-600">{analytics.avgBoxesPerRun - 288} boxes</td>
                      <td className="p-2 border border-slate-300 text-right font-mono">{((analytics.avgBoxesPerRun / 288) * 100).toFixed(1)}%</td>
                    </tr>
                    <tr className="bg-slate-50">
                      <td className="p-2 border border-slate-300 font-semibold">Total Documented Incidents</td>
                      <td className="p-2 border border-slate-300 text-right font-mono">0</td>
                      <td className="p-2 border border-slate-300 text-right font-mono font-bold text-amber-700">{analytics.totalIncidentEntries}</td>
                      <td className="p-2 border border-slate-300 text-right font-mono">+{analytics.totalIncidentEntries}</td>
                      <td className="p-2 border border-slate-300 text-right font-mono text-amber-700">Adverse impact</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Shift Breakdown Table */}
              <div className="mb-6">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-2 border-b border-slate-300 pb-1">
                  2. Shift Performance Breakdown
                </h4>
                <table className="w-full text-xs border border-slate-300 border-collapse text-left">
                  <thead className="bg-slate-100 text-slate-800 font-bold">
                    <tr>
                      <th className="p-2 border border-slate-300">Shift</th>
                      <th className="p-2 border border-slate-300 text-center">Active Runs</th>
                      <th className="p-2 border border-slate-300 text-right">Target Output</th>
                      <th className="p-2 border border-slate-300 text-right">Actual Output</th>
                      <th className="p-2 border border-slate-300 text-right">Shortfall</th>
                      <th className="p-2 border border-slate-300 text-right">Attainment %</th>
                    </tr>
                  </thead>
                  <tbody>
                    {analytics.shiftStats.map(s => (
                      <tr key={s.shift} className="hover:bg-slate-50">
                        <td className="p-2 border border-slate-300 font-bold">Shift {s.shift}</td>
                        <td className="p-2 border border-slate-300 text-center font-mono">{s.runs}</td>
                        <td className="p-2 border border-slate-300 text-right font-mono">{s.target.toLocaleString()}</td>
                        <td className="p-2 border border-slate-300 text-right font-mono font-bold">{s.actual.toLocaleString()}</td>
                        <td className="p-2 border border-slate-300 text-right font-mono text-red-600">{s.variance.toLocaleString()}</td>
                        <td className="p-2 border border-slate-300 text-right font-mono font-bold text-blue-900">{s.efficiency}%</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Major Incidents & Downtime Summary */}
              <div className="mb-6">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-2 border-b border-slate-300 pb-1">
                  3. Key Downtime & Root Cause Occurrences
                </h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                  {analytics.topIncidents.slice(0, 4).map((inc, i) => (
                    <div key={i} className="p-2.5 rounded bg-slate-50 border border-slate-200">
                      <div className="font-bold text-slate-900 text-xs">{inc.category}</div>
                      <div className="text-xs text-red-700 font-mono font-bold mt-1">{inc.count} documented shifts</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Sign-off Block */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6 border-t-2 border-slate-900 text-xs text-slate-700">
                <div className="p-3 bg-slate-50 border border-slate-200 rounded">
                  <span className="block font-bold text-slate-900 mb-1">Prepared by (Statistics & Reports):</span>
                  <div className="font-bold text-sm text-blue-950">Duncan Akweshie</div>
                  <div className="text-[11px] text-slate-700 font-medium">Process Analyst / Industrial Engineer</div>
                  <div className="text-[10px] text-slate-500 italic mt-0.5">Statistical Analysis & KPI Reporting</div>
                  <div className="border-b border-slate-300 my-2.5"></div>
                  <div className="flex items-center justify-between text-[11px] text-slate-600">
                    <span>Status: <strong className="text-emerald-700">Prepared & Verified</strong></span>
                    <span>Date: {new Date().toLocaleDateString()}</span>
                  </div>
                </div>

                <div className="p-3 bg-slate-50 border border-slate-200 rounded">
                  <span className="block font-bold text-slate-900 mb-1">Reviewed & Audited by:</span>
                  <div className="font-bold text-sm text-blue-950">Bosenogile Kepaletswe</div>
                  <div className="text-[11px] text-slate-700 font-medium">Quality Assurance Manager</div>
                  <div className="text-[10px] text-slate-500 italic mt-0.5">Quality Assurance Audit & Compliance</div>
                  <div className="border-b border-slate-300 my-2.5"></div>
                  <div className="flex items-center justify-between text-[11px] text-slate-600">
                    <span>Status: <strong className="text-emerald-700">Reviewed & Audited</strong></span>
                    <span>Sign: ____________</span>
                  </div>
                </div>

                <div className="p-3 bg-slate-50 border border-slate-200 rounded">
                  <span className="block font-bold text-slate-900 mb-1">Plant Operational Approval:</span>
                  <div className="font-bold text-sm text-blue-950">Moitshepi Kentshitswe</div>
                  <div className="text-[11px] text-slate-700 font-medium">Production / Factory Manager</div>
                  <div className="text-[10px] text-slate-500 italic mt-0.5">Plant Operational Authorization</div>
                  <div className="border-b border-slate-300 my-2.5"></div>
                  <div className="flex items-center justify-between text-[11px] text-slate-600">
                    <span>Status: <strong className="text-emerald-700">Final Approval</strong></span>
                    <span>Sign: ____________</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: SLICED MASTER RECORDS */}
        {activeTab === 'records' && (
          <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-lg flex-1 flex flex-col">
            <div className="p-4 border-b border-slate-800 flex items-center justify-between flex-wrap gap-2">
              <div>
                <h3 className="text-sm font-bold text-white">Sliced Production Runs Master Table</h3>
                <p className="text-xs text-slate-400">Displaying {slicedRecords.length} records matching all current parameter slicers.</p>
              </div>

              <div className="flex items-center gap-2">
                <div className="relative">
                  <Search className="w-3.5 h-3.5 absolute left-2.5 top-2.5 text-slate-500" />
                  <input
                    type="text"
                    placeholder="Search in filtered..."
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    className="bg-slate-950 border border-slate-800 rounded-lg pl-8 pr-7 py-1.5 text-xs text-white focus:outline-none focus:border-blue-500"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery('')}
                      className="absolute right-2 top-2 text-slate-400 hover:text-white transition"
                      title="Clear search query"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
                <HoverTooltip
                  title="Export Current Filtered Results"
                  description="Exports all records matching the current slicer parameters to a comma-separated values (.csv) file."
                  actionDetails="Downloads a customized CSV containing the filtered production batch records."
                  category="Export"
                >
                  <button
                    onClick={exportSlicedCsv}
                    className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-xs font-medium text-white flex items-center gap-1.5 transition"
                  >
                    <Download className="w-3.5 h-3.5" /> Export (.csv)
                  </button>
                </HoverTooltip>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-300 border-collapse">
                <thead className="bg-slate-950 text-slate-400 font-semibold border-b border-slate-800 uppercase tracking-wider">
                  <tr>
                    <th className="px-3.5 py-3">Doc & Page</th>
                    <th className="px-3.5 py-3">Date</th>
                    <th className="px-3.5 py-3">Shift</th>
                    <th className="px-3.5 py-3">Batch ID</th>
                    <th className="px-3.5 py-3">Color</th>
                    <th className="px-3.5 py-3">Nominal</th>
                    <th className="px-3.5 py-3">Target</th>
                    <th className="px-3.5 py-3">Actual</th>
                    <th className="px-3.5 py-3">Variance</th>
                    <th className="px-3.5 py-3">Speed</th>
                    <th className="px-3.5 py-3">QAI / Sup</th>
                    <th className="px-3.5 py-3">Status</th>
                    <th className="px-3.5 py-3 text-right">View</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800">
                  {slicedRecords.map(r => (
                    <tr
                      key={`${r.dataset}-${r.source_pdf_page}`}
                      onClick={() => setSelectedRecord(r)}
                      className="hover:bg-slate-800/50 cursor-pointer transition"
                    >
                      <td className="px-3.5 py-2.5 font-mono text-slate-200">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold mr-1.5 ${
                          r.dataset === 'OCCT_1' ? 'bg-blue-900/60 text-blue-200 border border-blue-700' : 'bg-purple-900/60 text-purple-200 border border-purple-700'
                        }`}>
                          {r.dataset}
                        </span>
                        P.{r.source_pdf_page}
                      </td>
                      <td className="px-3.5 py-2.5 font-mono">{r.date}</td>
                      <td className="px-3.5 py-2.5">
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          r.shift === 'A' ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30' :
                          r.shift === 'B' ? 'bg-blue-500/20 text-blue-300 border border-blue-500/30' :
                          'bg-purple-500/20 text-purple-300 border border-purple-500/30'
                        }`}>
                          Shift {r.shift}
                        </span>
                      </td>
                      <td className="px-3.5 py-2.5 font-mono font-semibold text-white">{r.batch_id || '—'}</td>
                      <td className="px-3.5 py-2.5 font-medium text-white">{r.color}</td>
                      <td className="px-3.5 py-2.5 font-mono">{r.thickness_nominal_mm}</td>
                      <td className="px-3.5 py-2.5 font-mono text-slate-400">{r.target_total_boxes || '—'}</td>
                      <td className="px-3.5 py-2.5 font-mono font-bold text-white">{r.actual_total_boxes}</td>
                      <td className="px-3.5 py-2.5 font-mono">
                        {r.box_difference_total < 0 ? (
                          <span className="text-rose-400">{r.box_difference_total}</span>
                        ) : r.box_difference_total > 0 ? (
                          <span className="text-emerald-400">+{r.box_difference_total}</span>
                        ) : (
                          <span className="text-slate-400">0</span>
                        )}
                      </td>
                      <td className="px-3.5 py-2.5 font-mono text-slate-400">{r.line_speed_hz ? `${r.line_speed_hz} Hz` : '—'}</td>
                      <td className="px-3.5 py-2.5">
                        <div className="text-[11px] font-medium text-slate-200">{r.checked_by_qai || '—'}</div>
                        <div className="text-[10px] text-slate-500">{r.supervisor || '—'}</div>
                      </td>
                      <td className="px-3.5 py-2.5">
                        {r.verification_status === 'VERIFIED' ? (
                          <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                            Verified
                          </span>
                        ) : (
                          <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/20">
                            Review
                          </span>
                        )}
                      </td>
                      <td className="px-3.5 py-2.5 text-right">
                        <HoverTooltip
                          title="Open Sheet Details"
                          description="Opens the side inspection drawer to view all 25-minute interval QC readings and hourly slots."
                          actionDetails="Opens the detailed slide-over inspection modal."
                          category="Navigation"
                          position="left"
                        >
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedRecord(r);
                            }}
                            className="px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 text-[11px] font-medium transition inline-flex items-center gap-1"
                          >
                            <Eye className="w-3.5 h-3.5" />
                          </button>
                        </HoverTooltip>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {slicedRecords.length === 0 && (
              <div className="p-8 text-center text-slate-500 text-xs">
                No production records matched your active slicers. Try adjusting or resetting the slicer parameters above.
              </div>
            )}
          </div>
        )}

        {/* TAB 4: HOURLY LOGS */}
        {activeTab === 'hourly' && (
          <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-lg p-4">
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-800 flex-wrap gap-2">
              <div>
                <h3 className="text-sm font-bold text-white">Hourly Output Logs (Filtered Scope)</h3>
                <p className="text-xs text-slate-400">Granular production performance across 8 one-hour production slots.</p>
              </div>
              <HoverTooltip
                title="Export Hourly Production Logs to CSV"
                description="Downloads all hourly batch runs matching the active slicers as a detailed CSV spreadsheet."
                actionDetails="Downloads 'KFT_Hourly_Production_[Date].csv'."
                category="Export"
              >
                <button
                  onClick={exportHourlyLogsCsv}
                  className="px-3.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-xs font-medium text-white flex items-center gap-1.5 transition cursor-pointer shadow-sm"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Export Hourly CSV</span>
                </button>
              </HoverTooltip>
            </div>
            <div className="overflow-x-auto max-h-[600px] overflow-y-auto">
              <table className="w-full text-left text-xs text-slate-300 border-collapse">
                <thead className="bg-slate-950 text-slate-400 font-semibold border-b border-slate-800 uppercase tracking-wider sticky top-0">
                  <tr>
                    <th className="px-3 py-2.5">Doc</th>
                    <th className="px-3 py-2.5">Page</th>
                    <th className="px-3 py-2.5">Date</th>
                    <th className="px-3 py-2.5">Shift</th>
                    <th className="px-3 py-2.5">Batch ID</th>
                    <th className="px-3 py-2.5">Slot</th>
                    <th className="px-3 py-2.5">Target</th>
                    <th className="px-3 py-2.5">Actual</th>
                    <th className="px-3 py-2.5">Variance</th>
                    <th className="px-3 py-2.5">Downtime Note</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800">
                  {slicedRecords.flatMap(r => 
                    (r.hourly_production || []).map((h, idx) => (
                      <tr key={`${r.dataset}-${r.source_pdf_page}-${idx}`} className="hover:bg-slate-800/40">
                        <td className="px-3 py-1.5 font-mono text-[11px] text-blue-300">{r.dataset}</td>
                        <td className="px-3 py-1.5 font-mono text-[11px]">P.{r.source_pdf_page}</td>
                        <td className="px-3 py-1.5 font-mono">{r.date}</td>
                        <td className="px-3 py-1.5">Shift {r.shift}</td>
                        <td className="px-3 py-1.5 font-mono font-semibold text-white">{r.batch_id}</td>
                        <td className="px-3 py-1.5 font-mono text-blue-400">{h.time_slot}</td>
                        <td className="px-3 py-1.5 font-mono text-slate-400">{h.target}</td>
                        <td className="px-3 py-1.5 font-mono font-bold text-white">{h.actual}</td>
                        <td className="px-3 py-1.5 font-mono">
                          {String(h.difference).includes('-') ? (
                            <span className="text-rose-400">{h.difference}</span>
                          ) : (
                            <span className="text-slate-300">{h.difference}</span>
                          )}
                        </td>
                        <td className="px-3 py-1.5 text-slate-400 text-[11px]">{h.note || '—'}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 5: DOWNTIME PARETO */}
        {activeTab === 'incidents' && (
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-lg">
            <div className="flex items-center justify-between mb-6 pb-3 border-b border-slate-800 flex-wrap gap-2">
              <div>
                <h2 className="text-base font-bold text-white flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-amber-400" />
                  Machine Downtime & Root Cause Pareto Analysis
                </h2>
                <p className="text-xs text-slate-400 mt-0.5">
                  Categorized frequency and operational impact analysis based on filtered records.
                </p>
              </div>
              <HoverTooltip
                title="Export Downtime Pareto Analysis to CSV"
                description="Downloads the ranked failure categories and incidence frequencies as a CSV spreadsheet."
                actionDetails="Downloads 'KFT_Downtime_Pareto_[Date].csv'."
                category="Export"
              >
                <button
                  onClick={exportDowntimeParetoCsv}
                  className="px-3.5 py-1.5 rounded-lg bg-amber-600 hover:bg-amber-500 text-xs font-medium text-white flex items-center gap-1.5 transition cursor-pointer shadow-sm"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Export Downtime CSV</span>
                </button>
              </HoverTooltip>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {analytics.topIncidents.map((inc, i) => (
                <div key={i} className="bg-slate-950 border border-slate-800 rounded-lg p-4 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-bold text-white">{inc.category}</span>
                      <span className="px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20 text-xs font-mono font-semibold">
                        {inc.count} Occurrences
                      </span>
                    </div>
                    <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden mb-3">
                      <div
                        className="bg-amber-500 h-full rounded-full"
                        style={{ width: `${Math.min(100, (inc.count / (analytics.topIncidents[0]?.count || 1)) * 100)}%` }}
                      />
                    </div>
                  </div>
                  <p className="text-[11px] text-slate-400">
                    Impacts line speed, requires operator intervention, and generates scrap during restart.
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 6: AUDIT MANIFEST */}
        {activeTab === 'audit' && (
          <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-lg p-4">
            <div className="flex items-center justify-between mb-4 border-b border-slate-800 pb-3 flex-wrap gap-2">
              <div>
                <h3 className="text-sm font-bold text-white">Full Consolidated Audit Manifest (170 Pages)</h3>
                <p className="text-xs text-slate-400">
                  Comprehensive audit trail covering OCCT_1 (Pages 1–76), OCCT_2 (Pages 1–30), and OCCT_3 (Pages 1–64).
                </p>
              </div>
              <HoverTooltip
                title="Download Consolidated Audit Manifest CSV"
                description="Downloads the complete 170-row traceability manifest documenting inspection verification status, transcription quality, and audit observations across August, September, and October 2026."
                actionDetails="Downloads 'KFT_Consolidated_Page_Audit.csv'."
                category="Export"
              >
                <button
                  onClick={() => triggerFileDownload('/KFT_Consolidated_Page_Audit.csv', 'KFT_Consolidated_Page_Audit.csv', 'Consolidated Page Audit Manifest')}
                  disabled={downloadingFile === 'KFT_Consolidated_Page_Audit.csv'}
                  className="px-3.5 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 disabled:bg-blue-800 text-xs font-medium text-white flex items-center gap-1.5 transition cursor-pointer shadow-sm"
                >
                  {downloadingFile === 'KFT_Consolidated_Page_Audit.csv' ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin text-blue-200" />
                      <span>Downloading Manifest CSV...</span>
                    </>
                  ) : (
                    <>
                      <Download className="w-3.5 h-3.5" />
                      <span>Download Consolidated Manifest (.csv)</span>
                    </>
                  )}
                </button>
              </HoverTooltip>
            </div>

            <div className="overflow-x-auto max-h-[600px] overflow-y-auto">
              <table className="w-full text-left text-xs text-slate-300 border-collapse">
                <thead className="bg-slate-950 text-slate-400 font-semibold border-b border-slate-800 uppercase tracking-wider sticky top-0">
                  <tr>
                    <th className="px-3 py-2.5">Dataset</th>
                    <th className="px-3 py-2.5">Page #</th>
                    <th className="px-3 py-2.5">Inspected</th>
                    <th className="px-3 py-2.5">Production</th>
                    <th className="px-3 py-2.5">Batch ID</th>
                    <th className="px-3 py-2.5">Actual Boxes</th>
                    <th className="px-3 py-2.5">Status</th>
                    <th className="px-3 py-2.5">Audit Notes & Handwriting Observations</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800">
                  {allKftRecords.map((p, idx) => (
                    <tr key={idx} className="hover:bg-slate-800/40">
                      <td className="px-3 py-2 font-mono text-[11px] text-blue-300">{p.dataset}</td>
                      <td className="px-3 py-2 font-mono font-bold text-white">Page {p.source_pdf_page}</td>
                      <td className="px-3 py-2 text-emerald-400 font-semibold">YES</td>
                      <td className="px-3 py-2">
                        {p.has_production_data ? (
                          <span className="text-blue-300">YES</span>
                        ) : (
                          <span className="text-amber-400 font-semibold">NO (Maint)</span>
                        )}
                      </td>
                      <td className="px-3 py-2 font-mono text-slate-200">{p.batch_id || 'N/A'}</td>
                      <td className="px-3 py-2 font-mono">{p.actual_total_boxes}</td>
                      <td className="px-3 py-2">
                        {p.verification_status === 'VERIFIED' ? (
                          <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                            VERIFIED
                          </span>
                        ) : (
                          <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/20">
                            REVIEW
                          </span>
                        )}
                      </td>
                      <td className="px-3 py-2 text-slate-400 text-[11px]">
                        {p.verification_notes || p.remarks || 'Fully clear and reconciled with source document.'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* Slide-over Detail Drawer for Selected Record */}
      {selectedRecord && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex justify-end transition-opacity"
          onClick={() => setSelectedRecord(null)}
        >
          <div
            className="w-full max-w-2xl bg-slate-900 border-l border-slate-800 h-full overflow-y-auto p-6 flex flex-col gap-6 shadow-2xl"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <div className="flex items-center gap-3">
                <span className="px-3 py-1 rounded bg-blue-600 text-white font-mono font-bold text-sm">
                  {selectedRecord.dataset} • Page {selectedRecord.source_pdf_page}
                </span>
                <div>
                  <h3 className="text-base font-bold text-white">
                    Batch {selectedRecord.batch_id || 'N/A'} • {selectedRecord.color}
                  </h3>
                  <p className="text-xs text-slate-400">
                    {selectedRecord.date} • Shift {selectedRecord.shift}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1.5">
                <HoverTooltip
                  title="Previous Checksheet"
                  description="Navigate to the previous checksheet in the filtered dataset."
                  actionDetails="Steps back one sheet."
                  category="Navigation"
                  position="left"
                >
                  <button
                    onClick={() => navigateRecord(-1)}
                    className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 flex items-center justify-center transition"
                    title="Previous sheet"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                </HoverTooltip>

                <HoverTooltip
                  title="Next Checksheet"
                  description="Navigate to the next checksheet in the filtered dataset."
                  actionDetails="Steps forward one sheet."
                  category="Navigation"
                  position="left"
                >
                  <button
                    onClick={() => navigateRecord(1)}
                    className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 flex items-center justify-center transition"
                    title="Next sheet"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </HoverTooltip>

                <HoverTooltip
                  title="Close Sheet Detail Panel"
                  description="Closes the slide-over inspection modal and returns to the active workspace."
                  actionDetails="Hides the detailed drawer."
                  category="Action"
                  position="left"
                >
                  <button
                    onClick={() => setSelectedRecord(null)}
                    className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 flex items-center justify-center transition"
                    title="Close drawer"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </HoverTooltip>
              </div>
            </div>

            {/* Verification Status */}
            <div className={`p-4 rounded-xl border flex items-center justify-between ${
              selectedRecord.verification_status === 'VERIFIED'
                ? 'bg-emerald-950/40 border-emerald-800/60 text-emerald-300'
                : 'bg-amber-950/40 border-amber-800/60 text-amber-300'
            }`}>
              <div className="flex items-center gap-2">
                {selectedRecord.verification_status === 'VERIFIED' ? (
                  <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                ) : (
                  <AlertTriangle className="w-5 h-5 text-amber-400" />
                )}
                <div>
                  <div className="text-xs font-bold uppercase tracking-wider">
                    Status: {selectedRecord.verification_status}
                  </div>
                  <div className="text-xs text-slate-300 mt-0.5">
                    {selectedRecord.verification_notes || 'All entries verified from source scan.'}
                  </div>
                </div>
              </div>
            </div>

            {/* Details Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 bg-slate-950 p-4 rounded-xl border border-slate-800 text-xs">
              <div>
                <span className="text-slate-500 block text-[11px]">Nominal Thickness</span>
                <span className="font-semibold text-slate-200 font-mono">{selectedRecord.thickness_nominal_mm}</span>
              </div>
              <div>
                <span className="text-slate-500 block text-[11px]">Thickness Range</span>
                <span className="font-semibold text-slate-200 font-mono">{selectedRecord.thickness_range || 'Standard'}</span>
              </div>
              <div>
                <span className="text-slate-500 block text-[11px]">Line Speed</span>
                <span className="font-semibold text-slate-200 font-mono">{selectedRecord.line_speed_hz ? `${selectedRecord.line_speed_hz} Hz` : '—'}</span>
              </div>
              <div>
                <span className="text-slate-500 block text-[11px]">Mixer Operator</span>
                <span className="font-semibold text-slate-200">{selectedRecord.mixer_operator || '—'}</span>
              </div>
              <div>
                <span className="text-slate-500 block text-[11px]">Checked by QAI</span>
                <span className="font-semibold text-slate-200">{selectedRecord.checked_by_qai || '—'}</span>
              </div>
              <div>
                <span className="text-slate-500 block text-[11px]">Shift Supervisor</span>
                <span className="font-semibold text-slate-200">{selectedRecord.supervisor || '—'}</span>
              </div>
              <div>
                <span className="text-slate-500 block text-[11px]">Target Output</span>
                <span className="font-semibold text-slate-200 font-mono">{selectedRecord.target_total_boxes} boxes</span>
              </div>
              <div>
                <span className="text-slate-500 block text-[11px]">Actual Output</span>
                <span className="font-bold text-emerald-400 font-mono">{selectedRecord.actual_total_boxes} boxes</span>
              </div>
              <div>
                <span className="text-slate-500 block text-[11px]">Attainment %</span>
                <span className="font-bold text-blue-400 font-mono">
                  {selectedRecord.target_total_boxes > 0 ? ((selectedRecord.actual_total_boxes / selectedRecord.target_total_boxes) * 100).toFixed(1) : 0}%
                </span>
              </div>
            </div>

            {/* Remarks */}
            {selectedRecord.remarks && (
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                <span className="text-xs font-semibold text-slate-400 block mb-1 uppercase tracking-wider">
                  Handwritten Remarks & Observations
                </span>
                <p className="text-xs text-slate-200 italic leading-relaxed whitespace-pre-wrap">
                  "{selectedRecord.remarks}"
                </p>
              </div>
            )}

            {/* Hourly Breakdown */}
            {selectedRecord.hourly_production && selectedRecord.hourly_production.length > 0 && (
              <div>
                <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                  Hourly Production Slots
                </h4>
                <div className="bg-slate-950 border border-slate-800 rounded-xl overflow-hidden">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-900/60 text-slate-400 font-medium border-b border-slate-800">
                      <tr>
                        <th className="px-3 py-2">Time Slot</th>
                        <th className="px-3 py-2">Target</th>
                        <th className="px-3 py-2">Actual</th>
                        <th className="px-3 py-2">Difference</th>
                        <th className="px-3 py-2">Notes</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/60">
                      {selectedRecord.hourly_production.map((h, i) => (
                        <tr key={i}>
                          <td className="px-3 py-1.5 font-mono text-slate-300">{h.time_slot}</td>
                          <td className="px-3 py-1.5 font-mono text-slate-400">{h.target}</td>
                          <td className="px-3 py-1.5 font-mono font-bold text-white">{h.actual}</td>
                          <td className="px-3 py-1.5 font-mono">
                            {String(h.difference).includes('-') ? (
                              <span className="text-rose-400">{h.difference}</span>
                            ) : (
                              <span className="text-slate-300">{h.difference}</span>
                            )}
                          </td>
                          <td className="px-3 py-1.5 text-slate-400 text-[11px]">{h.note || '—'}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Drawer Footer Actions */}
            <div className="pt-4 border-t border-slate-800 flex items-center justify-between mt-auto">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => navigateRecord(-1)}
                  className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium flex items-center gap-1 transition cursor-pointer"
                >
                  <ChevronLeft className="w-3.5 h-3.5" /> Previous Sheet
                </button>
                <button
                  onClick={() => navigateRecord(1)}
                  className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium flex items-center gap-1 transition cursor-pointer"
                >
                  Next Sheet <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>

              <button
                onClick={() => setSelectedRecord(null)}
                className="px-4 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-medium transition shadow-sm cursor-pointer"
              >
                Close Drawer
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Floating Action Feedback Toast */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 px-4 py-3 rounded-xl bg-slate-900/95 backdrop-blur-md border border-emerald-500/50 text-white shadow-2xl shadow-black/80 text-xs font-medium animate-in fade-in slide-in-from-bottom-4 duration-200">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toast}</span>
          <button
            onClick={() => setToast(null)}
            className="ml-2 text-slate-400 hover:text-white p-0.5 rounded transition"
            title="Dismiss notification"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}
    </div>
  );
}
