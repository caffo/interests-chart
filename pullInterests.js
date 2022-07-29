const fs = require('fs'),
    path = require('path'),
    HTMLParser = require('node-html-parser'),
    DOMParser = require('dom-parser'),
    calendarTemplate = require('./templates/calendarTemplate'),
    primaryInterestsTemplate = require("./templates/primary_interests_template"),
    filePathToFetchCalendar = path.join(__dirname, "Rodrigo Franco's Notes — Primary Interests_Calendar.html"), // Iteration here for multiple files
    filePathToSaveCalendar = path.join(__dirname, "Rodrigo Franco's Notes — Primary Interests.html")


const months = ["January", "February", "March", 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'] // months array to match Month Name with Month Number
const years = []; // to hold years (of Primary Interests Information)
const today = getDayOfYear();
const currentYear = (new Date()).getFullYear();

// Get Date From a Day Number
function getDateFromDay(year, day) {
    var date = new Date(year, 0);
    var d = new Date(date.setDate(day))
    let finalDate = d.getDate();
    if (d.getDate() === 1 || d.getDate().toString()[d.getDate().toString().length - 1] == 1 && d.getDate() !== 11) {
        finalDate += "st"
    } else if (d.getDate() === 2 || d.getDate().toString()[d.getDate().toString().length - 1] == 2 && d.getDate() !== 12) {
        finalDate += "nd"
    } else if (d.getDate() === 3 || d.getDate().toString()[d.getDate().toString().length - 1] == 3 && d.getDate() !== 13) {
        finalDate += "rd"
    } else {
        if (d.getDate() === 11) {
            finalDate += "th"
        } else {
            finalDate += "th"
        }
    }
    return `<h3>` + months[d.getMonth()] + " " + finalDate + ", " + d.getFullYear() + `</h3>`;
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

// escape HTML tags
function escape(htmlStr) {
    let newStr = htmlStr.replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#39;");
    return newStr
}

// to build the ToolTip HTML content
function buildToolTipHTML(elem) {
    const nodex = new DOMParser().parseFromString(elem, 'text/html');
    return nodex.rawHTML;
}

// Write html to original primary interests page
function writeTemplateToHTML(_template) {
    // Read local copy of primary_interests.html
    // console.log(_template);
    fs.readFile(filePathToSaveCalendar, { encoding: 'utf-8' }, function (err, data) {
        let resultTemplate = primaryInterestsTemplate.templateTop
        if (!err) {
            const root = HTMLParser.parse(data);
            const main_section = root.getElementsByTagName("section")[0];
            main_section.innerHTML += `<h1>Primary Interests/Calendar</h1>` + _template;
            // console.log(main_section);
            resultTemplate += main_section + primaryInterestsTemplate.templateBottom;
            // following operation overwrites the original file so output added to an extra file for testing purposes.
            // after testing, can be merged with the Original Primary Interests Html File.
            fs.writeFileSync("./Rodrigo Franco's Notes — Primary Interests(Output).html", resultTemplate)
        }
    })
}

// extract from Html file and create Html according to the pulled data
fs.readFile(filePathToFetchCalendar, { encoding: 'utf-8' }, async function (err, data) {
    if (!err) {
        // Promise to fetch data from the html file read.
        const dataPromise = await new Promise((resolve, reject) => {

            const root = HTMLParser.parse(data)
            const mainDiv = root.getElementsByTagName('article')[0];
            const dataDivs = mainDiv.getElementsByTagName('h3'); // contains date and primary interest information
            const _tempData = []; // to hold Primary Interests Information along with the Dates

            dataDivs.map((h3, index) => {
                let text = h3.nextElementSibling.structuredText;
                let dayNumber = modifyOriginalDate(h3.structuredText);// so to find Day Number in a Year
                let thisYear = dayNumber.split("-")[0];
                dayNumber = getDayOfYear(new Date(dayNumber));
                h3.nextElementSibling.innerHTML.split("\n").map(el => el.trim()).join()
                // fetch Primary Interest Data from the parsed text
                if (text.includes("/Interests/")) {
                    let interestOutText = text.slice(text.indexOf("Primary Interests/Interests"));
                    let interestText = interestOutText.split("\n")[0]
                    let interest = interestText.split("/")[interestText.split("/").length - 1]

                    // Read the Tooltip Content
                    let tooltipContent = h3.nextElementSibling.innerHTML.split("\n");
                    tooltipContent = tooltipContent.map(ttc => {
                        if (ttc.indexOf('id') > -1) {
                            return ttc.trim().split(" ")[0] + '>'
                        } else {
                            return ttc.trim()
                        }
                    })
                    tooltipContent = buildToolTipHTML(tooltipContent.join(" "));
                    _tempData.push({
                        date: dayNumber,
                        interest: interest,
                        year: thisYear,
                        tooltipData: tooltipContent,
                        tooltipDate: h3.rawText
                    })
                } else if (text.includes(" Interests ")) {
                    let interestText = text.slice(text.indexOf("Primary Interests "))
                    let _splitInterestText = interestText.split(" ")
                    let interest = _splitInterestText[_splitInterestText.length - 1]

                    // Read the Tooltip Content
                    let tooltipContent = h3.nextElementSibling.innerHTML.split("\n");
                    tooltipContent = tooltipContent.map(ttc => {
                        if (ttc.indexOf('id') > -1) {
                            return ttc.trim().split(" ")[0] + '>'
                        } else {
                            return ttc.trim()
                        }
                    })
                    tooltipContent = buildToolTipHTML(tooltipContent.join(" "));
                    _tempData.push({
                        date: dayNumber,
                        interest: interest,
                        year: thisYear,
                        tooltipData: tooltipContent,
                        tooltipDate: h3.rawText
                    })
                }
                // to resolve dataPromise
                if (index === dataDivs.length - 1) {
                    resolve(_tempData)
                }
            })
        })

        // let _template = calendarTemplate.templateTop // Adding Top section to _template.
        let _template = "";
        let fillerValue = ""; // to hold interests
        let fillerClass = "empty"; // to hold interest classes
        let tooltipFiller = "";

        years.forEach(function (year) {
            // Adding Calendar and Year Header Div to _template
            let previousYearValues = dataPromise.filter(dp => dp.year == year - 1)
            let maxDate = 0;
            let interestFound = false;
            if (previousYearValues && previousYearValues.length > 0) {
                maxDate = Math.max.apply(Math, previousYearValues.map((pvy) => pvy.date))
            }
            previousYearValues = previousYearValues.filter(pvy => pvy.date == maxDate)
            _template +=
                `<div class="calendar">
                <!-- 100 -->` +
                `<h3>` +
                year + // Adding Year Number
                `</h3><div class="days">`;

            //fetch day number of a year
            let _days = numberOfDays(parseInt(year));

            // Iteration to add day divs of a year in the _template
            for (let i = 1; i <= _days; i++) {
                if (dataPromise.filter(dp => dp.date === i && dp.year == year).length > 0) {
                    interestFound = true;
                    tooltipFiller = dataPromise.filter(dp => dp.date === i && dp.year == year)[0]
                    fillerValue = dataPromise.filter(dp => dp.date === i && dp.year == year)[0].interest
                    fillerClass = fillerValue;
                    _template += `<div class="day ${i} ${fillerClass.toLocaleLowerCase()}">${fillerValue[0]}<div class="tooltip">${getDateFromDay(year, i) + "&#xa;" + tooltipFiller.tooltipData}</div></div>`
                } else {
                    // Marking till today only 
                    if (!interestFound && i < today && year == currentYear) {
                        let _holder = previousYearValues[0];
                        tooltipFiller = _holder.tooltipData;
                        fillerValue = _holder.interest;
                        fillerClass = fillerValue;
                        _template += `<div class="day ${i} ${fillerClass.toLocaleLowerCase()}">${fillerValue[0]}<div class="tooltip">${getDateFromDay(year, i) + tooltipFiller}</div></div>`
                    } else {
                        if ((year == currentYear && i > today) || !interestFound) {
                            fillerClass = 'empty';
                            fillerValue = "";
                            _template += `<div class="day ${i} ${fillerClass.toLocaleLowerCase()}">${fillerValue[0] ? fillerValue[0] : ""}</div>`
                        } else {
                            _template += `<div class="day ${i} ${fillerClass.toLocaleLowerCase()}">${fillerValue[0] ? fillerValue[0] : ""}<div class="tooltip">${getDateFromDay(year, i) + tooltipFiller.tooltipData}</div></div>`
                        }
                    }
                }

                //  to end the Calendar div
                if (i === _days) {
                    _template += `</div></div>`
                }
            }

            // to end the Body and add styling
            if (year === years[years.length - 1]) {
                _template += calendarTemplate.templateBottom;
            }
        })

        // write template to sampleOutput.html file
        // fs.writeFileSync('./sampleOutput-' + Date.now() + '.html', _template) // while in production mode
        // fs.writeFileSync("sampleOutput-1658391492274.html", _template) // while in dev mode

        // _template passed to save in Local Copy of Primary_Interests.html page
        writeTemplateToHTML(_template);
    } else {
        // error
        console.log(err)
    }
});

