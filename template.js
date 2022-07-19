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
        background-color: rgb(253, 252, 251);
        color: rgb(58, 58, 58);
        font-size: 16px;
        font-weight: bold;
    }
    h1 {
        color: #20b2aa;
        text-align: center;

    }
    .calendar{
        width: 800px;
        height: auto;
        margin: 0 auto;
        padding-top: 20px;
        display: block;
    }

    .day {
        border: 1px solid grey;
        width: 1.5em;
        text-align: center;
        height: 1.5em;
        display: inline-block;
        vertical-align: top;
        padding: 5px;
        text-transform: uppercase;
    }

    .day:empty {
        cursor: auto;
        background-color: white;
        color: white;
    }

    .day:not(empty) {
        cursor: pointer;
        background-color: rgb(240, 240, 240);
        color: #20b2aa;
    }

</style>
</body>
</html>`    
