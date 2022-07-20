const fs = require('fs'),
    path = require('path'),
    HTMLParser = require('node-html-parser'),
    template = require('./template'),
    filePath = path.join(__dirname, "Rodrigo Franco's Notes — Primary Interests_Calendar.html") // Iteration here for multiple files

const months = ["January", "February", "March", 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'] // months array to match Month Name with Month Number
const years = []; // to hold years (of Primary Interests Information)
const today = getDayOfYear();
const currentYear = (new Date()).getFullYear();

// Get Date From a Day Number
function getDateFromDay(year, day) {
    var date = new Date(year, 0);
    var d = new Date(date.setDate(day))
    return months[d.getMonth()] + " " + d.getDate() + ", " + d.getFullYear();
}

// Converting Date Format (Month Date, Year) to (YYYY-MM-DD) for getDayOfYear()
function modifyOriginalDate(dateToModify) {
    let [month, day, year] = dateToModify.split(" ")
    let fullDate = "";

    // add year number to the list of years
    if (years.indexOf(year) === -1) {
        years.push(year);
    }
    //fetch and append year to fulldate
    fullDate += year

    // fetch month & modify
    month = months.indexOf(month) + 1;
    if (month < 10) {
        month = ('0' + month)
        fullDate += "-" + month

    } else {
        month = (month)
        fullDate += "-" + month
    }

    //fetch Day
    day = day.match(/\d+/)

    // modify day
    if (day < 10) {
        day = ('0' + day)
        fullDate += "-" + day

    } else {
        day = day
        fullDate += "-" + day
    }
    return fullDate;
}

// Calculate Day Number in a Year according to Date
function getDayOfYear(date = new Date()) {
    const timestamp1 = Date.UTC(
        date.getFullYear(),
        date.getMonth(),
        date.getDate(),
    );
    const timestamp2 = Date.UTC(date.getFullYear(), 0, 0);

    const differenceInMilliseconds = timestamp1 - timestamp2;

    const differenceInDays = differenceInMilliseconds / 1000 / 60 / 60 / 24;

    return differenceInDays;
}

// to find number of days in a year (for number of divs in Calendar of a year)
function numberOfDays(year) {
    return ((year % 4 === 0 && year % 100 > 0) || year % 400 == 0) ? 366 : 365;
}

// extract from Html file and create Html according to the pulled data
fs.readFile(filePath, { encoding: 'utf-8' }, async function (err, data) {
    if (!err) {
        // Promise to fetch data from the html file read.
        const dataPromise = await new Promise((resolve, reject) => {

            const root = HTMLParser.parse(data)
            const mainDiv = root.getElementsByTagName('article')[0];
            const dataDivs = mainDiv.getElementsByTagName('h3'); // contains date and primary interest information
            const _tempData = []; // to hold Primary Interests Information along with the Dates

            dataDivs.map((h3, index) => {
                let text = h3.nextElementSibling.structuredText;
                console.log(typeof (text), typeof (h3.structuredText));
                let dayNumber = modifyOriginalDate(h3.structuredText);// so to find Day Number in a Year
                let thisYear = dayNumber.split("-")[0];
                dayNumber = getDayOfYear(new Date(dayNumber));

                // fetch Primary Interest Data from the parsed text
                if (text.includes("/Interests/")) {
                    let interestOutText = text.slice(text.indexOf("Primary Interests/Interests"));
                    let interestText = interestOutText.split("\n")[0]
                    let interest = interestText.split("/")[interestText.split("/").length - 1]
                    _tempData.push({
                        date: dayNumber,
                        interest: interest,
                        year: thisYear,
                        tooltipData: text,
                        tooltipDate: h3.structuredText
                    })
                } else if (text.includes(" Interests ")) {
                    let interestText = text.slice(text.indexOf("Primary Interests "))
                    let _splitInterestText = interestText.split(" ")
                    let interest = _splitInterestText[_splitInterestText.length - 1]
                    _tempData.push({
                        date: dayNumber,
                        interest: interest,
                        year: thisYear,
                        tooltipData: text,
                        tooltipDate: h3.structuredText
                    })
                }
                // console.log(_tempData);
                // to resolve dataPromise
                if (index === dataDivs.length - 1) {
                    resolve(_tempData)
                }
            })
        })
        let _template = template.templateTop // Adding Top section to _template.
        let fillerValue = ""; // to hold interests
        let fillerClass = "empty"; // to hold interest classes
        let tooltipFiller = "";

        years.forEach(function (year) {
            // Adding Calendar and Year Header Div to _template
            _template +=
                `<div class="calendar">
                <!-- 100 -->` +
                `<h1>` +
                year + // Adding Year Number
                `</h1>`;

            //fetch day number of a year
            let _days = numberOfDays(parseInt(year));

            // Iteration to add day divs of a year in the _template
            for (let i = 1; i <= _days; i++) {
                if (dataPromise.filter(dp => dp.date === i && dp.year == year).length > 0) {
                    tooltipFiller = dataPromise.filter(dp => dp.date === i && dp.year == year)[0]
                    fillerValue = dataPromise.filter(dp => dp.date === i && dp.year == year)[0].interest
                    fillerClass = fillerValue;
                    _template += `<div class="day ${i} ${fillerClass.toLocaleLowerCase()}" tooltip-content="${getDateFromDay(year, i) + "&#xa;" + tooltipFiller.tooltipData}">${fillerValue[0]}</div>`
                } else {
                    // Marks till today
                    if (year == currentYear && i > today) {
                        fillerClass = 'empty';
                        fillerValue = ""
                    }
                    _template += `<div class="day ${i} ${fillerClass.toLocaleLowerCase()}" tooltip-content="${getDateFromDay(year, i) + "&#xa;" + tooltipFiller.tooltipData}">${fillerValue[0] ? fillerValue[0] : ""}</div>`
                }

                //  to end the Calendar div
                if (i === _days) {
                    _template += `</div>`
                }
            }

            // to end the Body
            if (year === years[years.length - 1]) {
                _template += template.templateBottom;
            }
        })

        // write template to sampleOutput.html file
        // fs.writeFileSync('./sampleOutput-' + Date.now() + '.html', _template)
        fs.writeFileSync("sampleOutput-1658304793818.html", _template)

    } else {
        // error
        console.log(err)
    }
}
);

