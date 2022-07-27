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
        font-family: var(--body-font, "Degular Text")
    }
    h1 {
        color: #585858;
        font-family: var(--header-font, "Redaction 35")
    }
    
    a[href^="https://"]:after {
        background-image: none!important;
    }
    .calendar{
        width: 600px;
        height: auto;
        margin: auto;
        background-color: #FDFCFB;
    }

    .calendar h3 {
        margin: 15px 0px !important;
    }

    .tooltip {
        display: none;
        background: #FDFCFB;
        border: 1px solid grey;
        border-radius: 4px;
        color: #585858;
        position: relative;    
        white-space: pre;
        bottom: 100%;
        margin-left: -125px;
        z-index: 1;
        text-align: start;
        overflow: auto;
        height: auto;
        width: fit-content;
        text-transform: capitalize;

    }

    .days {
        display: inline-block;
        border-top: 1px solid grey;
        border-left: 1px solid grey;
        margin: auto;
    }

    .days > * {
        vertical-align: middle;
    }

    .day {
        border-right: 1px solid grey;
        border-bottom: 1px solid grey;
        box-sizing: border-box;
        width: 23px;
        text-align: center;
        justify-content: center;
        height: 35px;
        display: inline-block;
        padding: 5px 0px;
        text-transform: lowercase;
        line-height: 30px;
        font-size: medium;
        margin: 0px;
        position: relative;
    }

    .day:empty {
        cursor: auto;
        background-color: white;
        color: white;
        position: relative;
        display: inline-block;
    }

    .day:not(:empty) {
        cursor: pointer;
        background-color: rgb(240, 240, 240);
        color: #585858;
        position: relative;
        display: inline-block;
    }

    .day:not(:empty):hover .tooltip {
        display: block;
        position: absolute;
    }


    .tooltip h3{
        padding: 10px !important;
        margin-top: 5px !important;
        margin-left: 5px !important;
        margin-right: 0px !important;
        margin-bottom: 0px !important;
        line-height: 0 !important;
        font-size: medium;
    }

    .tooltip li{
        list-style-type: none!important;
        padding: 0 !important;
        margin: 0 5px !important;
        line-height: 0 !important;
        font-size: medium;
    }

    .tooltip ul{
        padding: 0 !important;
        margin: 0 5px !important;
        line-height: 0 !important;
        font-size: medium;
    }

    .tooltip p:before {
        content: "• "
    }

    .tooltip p{
        padding: 0 !important;
        margin: 0 5px !important;
        line-height: 20px !important;
        font-size: medium;
    }

    .tooltip a {
        color: #00308F;
        text-decoration: none;
    }

</style>`    
