const fs = require('fs'),
    path = require('path'),
    HTMLParser = require('node-html-parser'),
    template = require('./template'),
    filePath = path.join(__dirname, "Rodrigo Franco's Notes — Primary Interests_Calendar.html") // Iteration here for multiple files

const months = ["January", "February", "March", 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'] // months array to match Month Name with Month Number
const years = []; // to hold years (of Primary Interests Information)

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
                let dayNumber = modifyOriginalDate(h3.structuredText); // so to find Day Number in a Year
                dayNumber = getDayOfYear(new Date(dayNumber));

                // fetch Primary Interest Data from the parsed text
                if (text.includes("/Interests/")) {
                    let interestOutText = text.slice(text.indexOf("Primary Interests/Interests"));
                    let interestText = interestOutText.split("\n")[0]
                    let interest = interestText.split("/")[interestText.split("/").length - 1]
                    _tempData.push({
                        date: dayNumber,
                        interest: interest
                    })
                } else if (text.includes(" Interests ")) {
                    let interestText = text.slice(text.indexOf("Primary Interests "))
                    let _splitInterestText = interestText.split(" ")
                    let interest = _splitInterestText[_splitInterestText.length - 1]
                    _tempData.push({
                        date: dayNumber,
                        interest: interest,
                    })
                }

                // to resolve dataPromise
                if (index === dataDivs.length - 1) {
                    resolve(_tempData)
                }
            })
        })

        let _template = template.templateTop // Adding Top section to _template.

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

                // Filter to check if Primary Interest is available on any day of the year
                (dataPromise.filter(dp => dp.date === i).length > 0) ?
                    _template += `<div class="day ${i + " " + dataPromise.filter(dp => dp.date === i)[0].interest.toLocaleLowerCase()}">` + `${dataPromise.filter(dp => dp.date === i)[0].interest[0].toLocaleUpperCase()}` + `</div>` :
                    _template += `<div class="day ${i} empty"></div>`

                // to add comment after every 100 day divs
                if (i === 100 || i === 200 || i === 300) {
                    if (i === 300) {
                        _template += `<!-- ${i + 65} -->`
                    } else {
                        _template += `<!-- ${i + 100} -->`
                    }
                }

                // to end the Calendar div
                if (i === _days) {
                    _template += `</div>`
                }
            }

            // Add Bottom section to template 
            if (year === years[years.length - 1]) {
                _template += template.templateBottom;
            }
        })

        // _template output check
        console.log(_template);

        // write template to sampleOutput.html file
        fs.writeFileSync('./sampleOutput-' + Date.now() + '.html', _template)

    } else {
        // error
        console.log(err)
    }
}
);

