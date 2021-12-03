import { Line } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";

const Chart = ({ chartData, text, titleColor }) => {
    return (
        <div>
            <Line
                datasetIdKey="id"
                data={chartData}
                options={{
                    plugins: {
                        title: {
                            display: true,
                            text: text,
                            align: "start",
                            padding: 12,
                            color: titleColor,
                            font: {
                                size: 18,
                                weight: "bolder",
                                lineHeight: 3,
                            },
                        },
                        legend: {
                            display: true,
                            position: "bottom",
                        },
                    },
                }}
            />
        </div>
    );
};

export default Chart;
