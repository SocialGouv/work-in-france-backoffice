import { format, getMonth, getYear } from "date-fns";
import { createWriteStream } from 'fs';
import { Observable } from "rxjs";
import { flatMap, map, mergeMap, tap } from "rxjs/operators";
import { Stream } from "stream";
import { DossierRecord, DSGroup, getNationality, isClosed, isLong, isRefused, isWithoutContinuation } from "../model";
import { initReport, MonthlyReport } from "../model/monthly-report.model";
import { monthlyReportRepository } from "../repository";
import { logger } from "../util";
import { dossierRecordService } from "./dossier-record.service";
import { writeMonthlyReport } from "./monthly-report.excel";

class MonthlyReportService {

    public generateMonthlyReports() {
        monthlyReportRepository.all().pipe(
            flatMap(x => x),
            tap((report) => {
                const monthDate = new Date(report.year, report.month, 1);
                const monthNumber = format(monthDate, 'MM');
                const file = `excel/WIF_${report.year}-${monthNumber}_ud${report.group.id}.xlsx`
                const stream = createWriteStream(file);
                writeMonthlyReport(report, stream);
            })
        ).subscribe();
    }

    public async writeMonthlyReport(year: number, month: number, groupId: string, stream: Stream) {
        const reports: MonthlyReport[] = await monthlyReportRepository.find(year, month, groupId).toPromise();
        logger.info(`[MonthlyReportService.writeMonthlyReport] ${reports.length} reports found for year: ${year}, month: ${month}, group: ${groupId}`)
        if (reports.length === 0) {
            return;
        }
        await writeMonthlyReport(reports[0], stream);
    }

    public syncMonthlyReports(year: number, month: number): Observable<MonthlyReport> {
        return monthlyreportService.createMonthlyReports(year, month).pipe(
            mergeMap((report) => monthlyreportService.saveOrUpdate(report))
        )
    }

    public createMonthlyReports(year: number, month: number): Observable<MonthlyReport> {
        return dossierRecordService.allByMonth(year, month).pipe(
            map(groupByGroup),
            map(buildReports),
            flatMap(x => x),
        )
    }

    public saveOrUpdate(report: MonthlyReport): Observable<MonthlyReport> {
        return monthlyReportRepository.delete(report.year, report.month, report.group.id).pipe(
            mergeMap(() => monthlyReportRepository.add(report))
        )
    }
}

export const monthlyreportService = new MonthlyReportService();

const buildReports = (dossiersByGroup: Map<string, DossierRecord[]>) => {
    const reports: MonthlyReport[] = [];
    dossiersByGroup.forEach((dossiers: DossierRecord[]) => {
        if (dossiers.length === 0) {
            return;
        }
        const firstDossier = dossiers[0];
        if (!firstDossier.metadata.processed_at) {
            throw new Error(`[MonthlyReportService.buildReports] processed_at is not defined`);
        }
        const processedAt = new Date(firstDossier.metadata.processed_at);
        const report = buildReport(getYear(processedAt), getMonth(processedAt), firstDossier.metadata.group, dossiers);
        reports.push(report)
    });
    return reports;
}

const groupByGroup = (dossiers: DossierRecord[]) => {
    const dossiersByGroup = new Map<string, DossierRecord[]>();
    return dossiers.reduce((acc: Map<string, DossierRecord[]>, dossier) => {
        const groupId = dossier.metadata.group.id;
        let group = acc.get(groupId);
        if (!group) {
            group = [];
            acc.set(groupId, group);
        }
        group.push(dossier);
        return acc;
    }, dossiersByGroup);
}

const buildReport = (year: number, month: number, group: DSGroup, dossiers: DossierRecord[]) => {
    const report = initReport(year, month, group);
    return dossiers.reduce((acc, dossier) => {
        return incrementReport(acc, dossier);
    }, report);
}

const determineCounter = (dossier: DossierRecord, report: MonthlyReport) => {
    if (isClosed(dossier)) {
        return isLong(dossier) ? report.accepted.more3Months : report.accepted.less3Months;

    } else if (isRefused(dossier)) {
        return report.refused;
    } else if (isWithoutContinuation(dossier)) {
        return report.withoutContinuation;
    }
    throw new Error(`[MonthlyReportService.determineCounter] no counter found for dossier ${dossier.ds_key} ${dossier.metadata.state}`);
}

const incrementReport = (report: MonthlyReport, dossier: DossierRecord) => {
    const counter = determineCounter(dossier, report);
    const nationality = getNationality(dossier);
    counter.count++;
    if (!counter.countries[nationality]) {
        counter.countries[nationality] = 0;
    }
    counter.countries[nationality]++;
    return report;
}