// services/reportGenerator.js

import jsPDF from "jspdf";
import "jspdf-autotable";

// Date Fns is used to format the dates we receive
// from our API call
import { format } from "date-fns";

// define a generatePDF function that accepts a tickets argument
const generatePDF = (
    title,
    column,
    menus,
    menuDatabaseName,
    categorySecondParam
) => {
    // initialize jsPDF
    const doc = new jsPDF();

    // define the columns we want and their titles
    const tableColumn = column;
    // define an empty array of rows
    const tableRows = [];

    // for each menu pass all its data into an array
    menus.forEach((menu) => {
        const menuData = menuDatabaseName.map((name) =>
            name === "category"
                ? categorySecondParam
                    ? menu[name][categorySecondParam]
                    : menu[name]
                : menu[name]
        );
        // push each menu's info into a row
        tableRows.push(menuData);
    });

    // startY is basically margin-top
    doc.autoTable(tableColumn, tableRows, { startY: 20 });
    const date = Date().split(" ");
    // we use a date string to generate our filename.
    const dateStr = date[0] + date[1] + date[2] + date[3] + date[4];
    // ticket title. and margin-top + margin-left
    doc.text(title, 14, 15);
    // we define the name of our PDF file.
    doc.save(`report_${dateStr}.pdf`);
};

export default generatePDF;
