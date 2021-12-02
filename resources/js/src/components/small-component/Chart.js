import { Line } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";

const Chart = ({ chartData, text }) => {
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
                            font: {
                                size: 18,
                                weight: "bolder",
                                color: "#000",
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
