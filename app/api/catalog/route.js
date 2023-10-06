import { NextResponse } from "next/server";
//import price from '../../price/lutner_new.csv'

export async function GET(Request) {
    let price;
    var myHeaders = new Headers();

    myHeaders.append("Content-Type", "text/plain; charset=windows 1251");

    //fetch('https://lutner.ru/bitrix/catalog_export/upload/lutner_new.csv')
    fetch("http://localhost:3000/lutner_new.csv", myHeaders, {
        cache: "no-store",
    })
        .then((response) => response.text())
        .then((data) => parse(data)); //console.log(data));

    // console.log(data)

    function parse(price) {
        //console.log(price);

        const csvData = [];
        const lines = price.split("\n");

        //for (let i = 0; i < lines.length; i++) {
        for (let i = 0; i < 200; i++) {
            csvData[i] = lines[i].split(";");
        }

        console.log("---", csvData[5]);
    }

    

    // console.log("---", csvData);

    return NextResponse.json({ message: csvData });
}
