import type { SokolReport } from "./_sokolReport.js";


export type Messenger = {
    report: () => SokolReport;
    copy: (message: SokolReport) => void;
}