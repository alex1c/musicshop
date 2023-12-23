import { NextResponse } from "next/server";
import { MongoClient } from "mongodb";
//import price from '../../price/lutner_new.csv'
import { redirect } from "next/navigation";
//import { useRouter } from "next/navigation";
//import sendReport from "./helper";
//import setValue from '.../admin/upload/page'
import connectString from "@/app/db";


//не работает. Вместо общей сделал в каждом методе
async function handler(arrayOfObjectForMongoDB) {
    const client = await MongoClient.connect(
        process.env.dbConnect
    );
    const db = client.db();
    const collection = db.collection("pricecollection");

    //delete
    if (arrayOfObjectForMongoDB.length === 0) {
        // try {
        const result = await collection.deleteMany({});
        return result;
        // } catch (e) {
        //   console.log("Ошибка при удалении ", e);
        // }
    } else {
        // const result = await collection.insertOne({heading, description, done})
        const result = await collection.insertMany(arrayOfObjectForMongoDB);
        return result;
    }

    //insert
    //try { //
    // const client = await MongoClient.connect(
    //     "mongodb+srv://alex1cspb:4VWWdH31VLw6SN62@lutner.vfkxvei.mongodb.net/lutnerdatabase"
    // );
    // const db = client.db();
    // const collection = db.collection("pricecollection");
    // // const result = await collection.insertOne({heading, description, done})
    // const result = await collection.insertMany(arrayOfObjectForMongoDB);
    //const result = await collection.deleteMany({})
    //console.log('result --------- ',typeof result)
    //return result

    //  } catch (error) {
    // console.log('error --------- ',error)
    //  return redirect('/admin/upload')
    //  return error;
    //  }
}

export async function DELETE(Request) {
    //console.log("Request---", Request);

    const client = await MongoClient.connect(
       // "mongodb+srv://alex1cspb:4VWWdH31VLw6SN62@lutner.vfkxvei.mongodb.net/lutnerdatabase"
       //connectString.toString()
       process.env.dbConnect
    );
    const db = client.db();
    const collection = db.collection("pricecollection");

    const response = new Response();

    const result = await collection
        .deleteMany({})
        .then((value) => response.text);
    //console.log("response----", response);

    //response.json = result.deletedCount;
    return response;

    //ниже не работает. Нужен был возврат резулттата . С редиректом были траблы. Сделал так

    let arrayOfObjectForMongoDB = new Array();

    // let res = handler(arrayOfObjectForMongoDB).then((value) => {
    //     console.log("value----", value).then(redirect(`/admin/upload?p=${value}`));
    let res = handler(arrayOfObjectForMongoDB).then((value) => {
        redirect(`/admin/upload?p=${value.deletedCount}`);

        //здесь { acknowledged: true, deletedCount: 0 }
    });
    // .then(redirect(`/admin/upload?p=${value}`));

    // console.log('result---',res)

    return NextResponse.json({ message: "dat" });
}

export async function GET(Request) {
    // var myHeaders = new Headers();
    //console.log("Request---", Request);

    // myHeaders.append("Content-Type", "text/plain; charset=windows 1251");
    //читаем прайс в локальном каталоге. Он должен быть переведен в кодировку UTF8
    //заголовки не работали
    // не забывай добавлять текущий ип в монго
    //fetch('https://lutner.ru/bitrix/catalog_export/upload/lutner_new.csv')
    fetch("http://localhost:3000/lutner_new.csv", {
        cache: "no-store",
    })
        .then((response) => response.text())
        .then((data) => parse(data));
    // .then(console.log(data)); //console.log(data));

    // console.log(data)

    //разбиваем прайс сначала построчно и потом каждую строку кладем в массив по точке с запятой
    async function parse(price) {
        //console.log(price);

        const csvData = [];
        const lines = price.split("\n");

        //for (let i = 0; i < lines.length; i++) {
        for (let i = 0; i < 200; i++) {
            csvData[i] = lines[i].split(";");
            //console.log("---lenth ", csvData[i].length);
        }

        let arrayOfObjectForMongoDB = new Array();

        for (let k = 0; k < csvData.length - 1; k++) {
            //for (let k = 0; k < 200; k++) {
            if (csvData[k].length == 41) {
                for (let t = 0; t < csvData[k].length; t++) {
                    const priceString = {
                        _id: csvData[t][0],
                        IE_NAME: csvData[t][1],
                        IE_PREVIEW_TEXT: csvData[t][2],
                        IE_DETAIL_PICTURE:
                            "http://www.lutner.ru" + csvData[t][3],
                        CP_QUANTITY: csvData[t][4], //Остаток
                        IP_PROP134: csvData[t][5], //Количество струн
                        IP_PROP140: csvData[t][6], //Актуальность товара (Снят с производства)
                        IP_PROP113: csvData[t][7], //Тип губной гармошки
                        IP_PROP112: csvData[t][8], //Количество частей у блок-флейт
                        IP_PROP114: csvData[t][9], //Производитель
                        IP_PROP111: csvData[t][10], //Тип блок-флейты
                        IP_PROP121: csvData[t][11], //Цвет1
                        IP_PROP96: csvData[t][12], //Артикул
                        IP_PROP99: csvData[t][13], //Единица измерения
                        IP_PROP127: csvData[t][14], //Не используется
                        IP_PROP100: csvData[t][15], //Ставка НДС
                        IP_PROP97: csvData[t][16], //Не используется
                        IP_PROP95: csvData[t][17], //Штрих код
                        IP_PROP122: csvData[t][18], //Верхняя дека
                        IP_PROP123: csvData[t][19], //Тональность
                        IP_PROP149: csvData[t][20], //Не используется
                        IP_PROP106: csvData[t][21], //вес брутто
                        IP_PROP107: csvData[t][22], //Объем
                        IP_PROP165: csvData[t][23], //Мощность
                        IP_PROP110: csvData[t][24], //Высота звучания
                        IC_GROUP0: csvData[t][25], //Группа1
                        IC_GROUP1: csvData[t][26], //Группа2
                        IC_GROUP2: csvData[t][27], //Группа3
                        IP_PROP131: csvData[t][28], //Размер
                        IP_PROP142: csvData[t][29], //Ширина верхнего порожка
                        IP_PROP153: csvData[t][30], //Диаметр
                        IP_PROP139: csvData[t][31], //Цвет2
                        CV_PRICE_13: csvData[t][32], //Цена дилер
                        IP_PROP152: csvData[t][33], //Материал обмотки
                        CV_CURRENCY_13: csvData[t][34], //Валюта
                        IP_PROP176: csvData[t][35], //Хит продаж
                        IP_PROP150: csvData[t][36], //Диаметр первой струны
                        CV_PRICE_18: csvData[t][37], //Цена розница
                        CV_CURRENCY_18: csvData[t][38], //Валюта
                        CV_PRICE_20: csvData[t][39], //Цена МП
                        CV_CURRENCY_20: csvData[t][40], //Валюта
                    };
                    arrayOfObjectForMongoDB.push(priceString);

                    // console.log("priceString--", priceString);
                }
            }
        }

        // console.log("---", csvData);
        // console.log("---lenth ", csvData.length);
        // console.log("arrayOfObjectForMongoDB ---", arrayOfObjectForMongoDB);

        //const req = {heading: 'head', description: 'desc'}

        const client = await MongoClient.connect(
            process.env.dbConnect
        );
        const db = client.db();
        const collection = db.collection("pricecollection");

        const result = await collection.insertMany(arrayOfObjectForMongoDB);

        //console.log('result-----',result)
        return result;

        //без хендлера все в однм месте
        // handler(arrayOfObjectForMongoDB);
        //res.then((res) => res.json())
        //console.log("result-----", res);
        // console.log("---", dat);
    }

    //сделать возврат результата на вызывающую страницу
    // redirect(`/admin/upload?p=${dat}`);
    //redirect("/admin/upload");

    return NextResponse.json({ message: 'result' });
}
