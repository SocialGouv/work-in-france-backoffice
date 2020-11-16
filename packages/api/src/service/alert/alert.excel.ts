import { format } from "date-fns";
import { Stream } from "stream";
import { Alert } from "../../model";
import { asString } from "../../util";
import { createWorkbook } from "../excel.util";

interface RowAlert {
  ds_key: string;
  group: string;
  message: string;
  instructors_history: string;
  url: string;
}

export const exportAlertsInExcel = async (alerts: Alert[], stream: Stream) => {
  const workbook = createWorkbook();
  const worksheet = workbook.addWorksheet(`Dossiers en souffrance`);
  worksheet.columns = [
    { header: "Identifiant", key: "ds_key", width: 15 },
    { header: "Groupe", key: "group", width: 20 },
    { header: "Date traitement", key: "processed_at", width: 15 },
    { header: "Etat", key: "state", width: 15 },
    { header: "Alerte", key: "message", width: 40 },
    { header: "Instructeurs", key: "instructors_history", width: 30 },
    { header: "Lien", key: "url", width: 30 },
    { header: "Email - Date traitement", key: "email_processed_at", width: 30 },
    { header: "Email - Etat", key: "email_state", width: 30 },
    { header: "Email", key: "email", width: 100 },
  ];

  alerts
    .map((alert: Alert) => exportRows(alert))
    .forEach((row: RowAlert) => {
      worksheet.addRow(row);
    });

  await workbook.xlsx.write(stream);
};

const exportRows: (alert: Alert) => RowAlert = (alert: Alert) => {
  return {
    ds_key: alert.ds_key,
    email: alert.email ? JSON.stringify(alert.email, undefined, 2) : "",
    email_processed_at: alert.email_processed_at
      ? format(alert.email_processed_at, "DD/MM/YYYY")
      : "",
    email_state: alert.email_state ? alert.email_state : "",
    group: alert.group.label,
    instructors_history: asString(alert.instructors_history, ", "),
    message: alert.message,
    processed_at: alert.processed_at
      ? format(alert.processed_at, "DD/MM/YYYY")
      : "",
    state: alert.state,
    url: alert.url,
  };
};
