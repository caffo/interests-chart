exports.templateTop = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>primary interests calendar</title>
</head>
<body>`

exports.templateBottom = `
</div>
<style> 
    :root {
        --body-font: "Degular Text";
        --header-font: "Redaction 35";
    }
    @media (prefers-color-scheme: dark) {
        :root {
        --bg-color: #35363a;
        --text-color: #c5c5c5;
        --link-color: #c5c5c5;
        --code-block-bg: #252528;
        --header-color: rgba(255, 255, 255, 0.5);
        --divider-color: rgba(255, 255, 255, 0.15);
        --lighter-divider-color: rgba(255, 255, 255, 0.05);
        }
    }
    @media (prefers-color-scheme: light) {
        :root {
        --bg-color: #fdfcfb;
        --text-color: #3a3a3a;
        --link-color: #000;
        --code-block-bg: #f3f3f3;
        --header-color: rgba(0, 0, 0, 0.65);
        --divider-color: rgba(0, 0, 0, 0.1);
        --lighter-divider-color: rgba(0, 0, 0, 0.05);
        }
    }

    a[href^="https://"]:after {
        background-image: none!important;
    } 

    .Calendars {
        margin-bottom: 50px;
    }

    .calendar{
        width: 98%;
        height: auto;
        margin: auto;
        background-color: var(--bg-color);
    }

    .calendar h3 {
        margin: 15px 0px !important;
    }

    .tooltip {
        display: none;
        background: var(--bg-color);
        border: 1px solid var(--divider-color);
        border-radius: 4px;
        color: var(--text-color);
        position: absolute;    
        white-space: pre;
        bottom: 100%;
        z-index: 1;
        text-align: start;
        height: fit-content;
        width: fit-content;
        text-transform: capitalize;
        padding: 5px;
    }

    .days {
        display: inline-block;
        border-top: 1px solid var(--divider-color);
        border-left: 1px solid var(--divider-color);
        margin: auto;
    }

    .days > * {
        vertical-align: middle;
    }

    .day {
        border-right: 1px solid var(--divider-color);
        border-bottom: 1px solid var(--divider-color);
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
        background-color: var(--lighter-divider-color);
        color: var(--text-color);
        position: relative;
        display: inline-block;
        opacity: 0.8;
    }

    .day:not(:empty) {
        cursor: pointer;
        background-color: var(--bg-color);
        color: var(--text-color);
        position: relative;
        display: inline-block;
    }

    // .day:not(:empty):hover .tooltip {
    //     display: flex;
    //     flex-direction: column;
    //     position: absolute;
    // }

    .tooltip h3{
        margin-top: 0px !important;
        margin-left: 5px !important;
        margin-right: 0px !important;
        margin-bottom: 0px !important;
        line-height: 2em !important;
        font-size: x-large;
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
        color: var(--link-color);
    }

    /* IMPROVED TOOLTIPS  */

    .day>.itooltip {
        display: none;
        position: absolute;
        bottom: 110%;
        transform: translateX(-50%);
        z-index: 1;
        border: 1px solid var(--divider-color);
        border-radius: 4px;
        width: 250px;
        background: var(--bg-color);
        padding: 20px;
        text-transform: none;
        font-size: medium;
        text-align: center !important;
    }
    
    .day:hover>.itooltip { 
        display: flex;
        flex-direction: column;
        align-items: flex-start;
    }

    .day>.itooltip h3 { 
        margin: 0px !important;
        padding: 0px !important;
        line-height: 1em !important;
        font-size: 18px !important;
    }

    .day>.itooltip ul { 
        margin: 0px !important;
        padding: 0px !important;
        font-size: 16px;
    }

    .day>.itooltip li { 
        margin: 0px !important;
        padding: 0px !important;
        margin-left: 15px !important;
        list-style-type: disc !important;
        line-height: 20px;
        text-align: left;
    }

    .day>.itooltip p { 
        margin: 0px !important;
        padding: 0px !important;
        line-height: 20px !important;
        text-align: left !important;
    }

    @media screen and (max-width: 1024px) {
        .day>.itooltip {
            width: 200px !important;
        }
    }

    @media screen and (max-width: 768px) {
        .day>.itooltip {
            width: 150px !important;
            transform: translateX(-40%);
            font-size: 14px !important;
        }

        .day>.itooltip h3 { 
            font-size: 16px !important;
        }

        .day>.itooltip ul { 
            font-size: 14px !important;
        }

        .main article ul {
            padding: 0 50px !important;
        }
    }

    @media screen and (max-width: 428px) {
        .days {
            position: relative !important;
        }

        .day {
            position: static !important;
        }

        .day>.itooltip {
            box-sizing: border-box !important;
            left: 0 !important;
            min-width: unset !important;
            width: 100% !important;
            top: unset !important;
            bottom: unset !important;
            margin: 0 auto !important;
            right: 0 !important;
            transform: none !important;
        }

        .main article ul {
            padding: 0 10px !important;
            margin: 0;
        }
    }
    
/* IMPROVED TOOLTIPS  */

</style>`
