exports.templateTop = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>primary interests calendar</title>
</head>
<body>`

exports.templateBottom = `
<style>
    body {
        background-color: #FDFCFB;
        color: rgb(58, 58, 58);
        font-size: 16px;
    }
    h1 {
        color: #585858;
        text-align: center;

    }
    h3 {
        margin-left: -30px;
    }
    .calendar{
        width: 800px;
        height: auto;
        margin: 0 auto;
        padding-top: 20px;
        display: block;
        background-color: #FDFCFB;
    }

    .tooltip {
        display: inline-block;
    }

    .day {
        outline: 1px solid grey;
        width: 3.75em;
        text-align: center;
        height: 2.25em;
        display: inline-block;
        vertical-align: top;
        padding: 5px;
        text-transform: lowercase;
    }

    .day:empty {
        cursor: auto;
        background-color: white;
        color: white;
    }

    .day:not(:empty) {
        cursor: pointer;
        background-color: rgb(240, 240, 240);
        color: #585858;
        position: relative;
    }

    .day:not(:empty):hover::after {
        background: #FDFCFB;
        border: 1px solid grey;
        border-radius: 4px;
        color: #585858;
        bottom: 100%;
        content: attr(tooltip-content);
        display: block;
        position: absolute;    
        width: fit-content;
        height: fit-content;
        white-space: pre;
        z-index: 1;
        text-transform: capitalize;
        text-align: start;
    }

</style>
</body>
</html>`    
