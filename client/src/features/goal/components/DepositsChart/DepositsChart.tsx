import styles from "./DepositsChart.module.scss";
import {
  depositsChartData,
  depositsChartOptions,
  monthlyDepositsLabels,
} from "./DepositsChart.config";
import { registerBarChart } from "@/shared/lib/chartjs";
import { Bar } from "react-chartjs-2";

registerBarChart();

export const DepositsChart = () => {
  return (
    <div className={styles.chart}>
      <div className={styles.canvas}>
        <Bar data={depositsChartData} options={depositsChartOptions} />
      </div>
      <div className={styles.labels}>
        {monthlyDepositsLabels.map(([amount, month]) => (
          <div key={month} className={styles.label}>
            <span>{amount}</span>
            <span>{month}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
