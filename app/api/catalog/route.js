import { NextResponse } from "next/server";
import { MongoClient } from "mongodb";
//import price from '../../price/lutner_new.csv'
//import { redirect } from "next/navigation";

//удаление всего прайса
export async function DELETE(Request) {
    //console.log("Request---", Request);

    const client = await MongoClient.connect(process.env.dbConnect);
    const db = client.db();
    const collection = db.collection("pricecollection");

    const response = new Response();

    const result = await collection
        .deleteMany({})
        .then((value) => response.text);
    //console.log("response----", response);

    //response.json = result.deletedCount;
    return response;
}

//основная функция получения данных. далее по параметрам делим ее
export async function GET(Request, Response) {
    // var myHeaders = new Headers();
    //console.log("Request---", Request);

    const query = Request.nextUrl.searchParams.get("type");

    let resultCount; //чтобы общая видимость была

    //----------------------
    //----------------------
    //загрузка прайса
    if (query == "upload") {
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
            //console.log('lines------------------',lines)   //массив строк прайса

            //for (let i = 0; i < lines.length; i++) {
            for (let i = 0; i < 10000; i++) {
                csvData[i] = lines[i].split(";"); //массис массивов. В каждом массиве строка прайса 200 штук
                //console.log("---lenth ", csvData[i].length);
            }

            // console.log('csvData ------   ',csvData)
            //console.log('csvData .length ------   ',csvData.length) //200 штук

            let arrayOfObjectForMongoDB = new Array();

            for (let k = 0; k < csvData.length - 1; k++) {
                //for (let k = 0; k < 200; k++) {
                if (csvData[k].length == 41) {
                    //console.log("csvData[k]-------------", csvData[k]);
                    // for (let t = 0; t < csvData[k].length; t++) {
                    try {
                        //  for (let t = 0; t < 100; t++) {
                        const priceString = {
                            _id: csvData[k][0],
                            IE_NAME: csvData[k][1],
                            IE_PREVIEW_TEXT: csvData[k][2],
                            IE_DETAIL_PICTURE:
                                "http://www.lutner.ru" + csvData[k][3],
                            CP_QUANTITY: csvData[k][4], //Остаток
                            IP_PROP134: csvData[k][5], //Количество струн
                            IP_PROP140: csvData[k][6], //Актуальность товара (Снят с производства)
                            IP_PROP113: csvData[k][7], //Тип губной гармошки
                            IP_PROP112: csvData[k][8], //Количество частей у блок-флейт
                            IP_PROP114: csvData[k][9], //Производитель
                            IP_PROP111: csvData[k][10], //Тип блок-флейты
                            IP_PROP121: csvData[k][11], //Цвет1
                            IP_PROP96: csvData[k][12], //Артикул
                            IP_PROP99: csvData[k][13], //Единица измерения
                            IP_PROP127: csvData[k][14], //Не используется
                            IP_PROP100: csvData[k][15], //Ставка НДС
                            IP_PROP97: csvData[k][16], //Не используется
                            IP_PROP95: csvData[k][17], //Штрих код
                            IP_PROP122: csvData[k][18], //Верхняя дека
                            IP_PROP123: csvData[k][19], //Тональность
                            IP_PROP149: csvData[k][20], //Не используется
                            IP_PROP106: csvData[k][21], //вес брутто
                            IP_PROP107: csvData[k][22], //Объем
                            IP_PROP165: csvData[k][23], //Мощность
                            IP_PROP110: csvData[k][24], //Высота звучания
                            IC_GROUP0: csvData[k][25], //Группа1
                            IC_GROUP1: csvData[k][26], //Группа2
                            IC_GROUP2: csvData[k][27], //Группа3
                            IP_PROP131: csvData[k][28], //Размер
                            IP_PROP142: csvData[k][29], //Ширина верхнего порожка
                            IP_PROP153: csvData[k][30], //Диаметр
                            IP_PROP139: csvData[k][31], //Цвет2
                            CV_PRICE_13: csvData[k][32], //Цена дилер
                            IP_PROP152: csvData[k][33], //Материал обмотки
                            CV_CURRENCY_13: csvData[k][34], //Валюта
                            IP_PROP176: csvData[k][35], //Хит продаж
                            IP_PROP150: csvData[k][36], //Диаметр первой струны
                            CV_PRICE_18: csvData[k][37], //Цена розница
                            CV_CURRENCY_18: csvData[k][38], //Валюта
                            CV_PRICE_20: csvData[k][39], //Цена МП
                            CV_CURRENCY_20: csvData[k][40], //Валюта
                        };
                        arrayOfObjectForMongoDB.push(priceString);

                        // console.log("priceString--", priceString);
                        // }
                    } catch (error) {
                        console.log("error-----", error, "--->", csvData[k]);
                    }
                    // }
                }
            }

            //console.log("---", csvData);
            // console.log("---lenth ", csvData.length);
            // console.log("arrayOfObjectForMongoDB ---", arrayOfObjectForMongoDB);

            //const req = {heading: 'head', description: 'desc'}

            const client = await MongoClient.connect(process.env.dbConnect);
            const db = client.db();
            const collection = db.collection("pricecollection");

            const result = await collection.insertMany(arrayOfObjectForMongoDB);

            //console.log('result-----',result)
            await client.close();
            return result;
        }

        //сделать возврат результата на вызывающую страницу
        // redirect(`/admin/upload?p=${dat}`);
        //redirect("/admin/upload");

        //----------------
        //----------------
        //----------------
        //счетчик загруженных товаров в базе
    } else if (query == "count") {
        //запрос количеста товаров

        // console.log(" ------------------------------сюда мы попадаем? No!!!");

        const clientCount = await MongoClient.connect(process.env.dbConnect);
        const dbCount = clientCount.db();
        const collectionCount = dbCount.collection("pricecollection");

        resultCount = await collectionCount.estimatedDocumentCount();

        await clientCount.close();

        //return  resultCount;
        // return Response;
        //в заголовок количество вставил
        return new NextResponse(
            JSON.stringify({ Success: true, message: resultCount }),
            {
                status: 200,
                headers: {
                    "content-type": "application/json",
                    countItems: resultCount,
                },
            }
        );

        //----------------
        //----------------
        //----------------
        //создание каталога меню на основе прайса
    } else if (query == "createCatalog") {
        const client = await MongoClient.connect(process.env.dbConnect);
        const db = client.db();
        const collection = db.collection("pricecollection");

        const catalog_1_level = await collection.distinct("IC_GROUP0");

        let Catalog = new Array();

        let Menu = {};

        for (let index = 0; index < catalog_1_level.length; index++) {
            const catalog_2_level = await collection.distinct("IC_GROUP1", {
                IC_GROUP0: catalog_1_level[index],
            });
            (Menu.firstLevel = catalog_1_level[index]),
                (Menu.secondLevel = { sec: catalog_2_level });

            for (
                let index_2 = 0;
                index_2 < Menu.secondLevel.sec.length;
                index_2++
            ) {
                // const element = array[_2];
                // console.log("----------", Menu.secondLevel.sec[index_2]);

                const catalog_3_level = await collection.distinct("IC_GROUP2", {
                    IC_GROUP1: Menu.secondLevel.sec[index_2],
                });
                // console.log("catalog_3_level--", catalog_3_level);
                if (Array.isArray(Menu.secondLevel.sec[index_2])) {
                    Menu.secondLevel.sec[index_2].push = {
                        third: catalog_3_level,
                    };
                }
            }

            Catalog.push(Menu);
        }
        console.log("menu--", Catalog);

        // for (let index = 0; index < catalog_1_level.length; index++) {
        //     const catalog_2_level = await collection.distinct("IC_GROUP1", {
        //         IC_GROUP0: catalog_1_level[index],
        //     });

        //     for (let index_2 = 0; index_2 < catalog_2_level.length; index_2++) {
        //         const catalog_3_level = await collection.distinct("IC_GROUP2", {
        //             IC_GROUP1: catalog_2_level[index_2],
        //         });
        //         console.log(
        //             "catalog_1_level------> ",
        //             catalog_1_level[index],
        //             "catalog_2_level--->",
        //             catalog_2_level[index_2],
        //             "catalog_3_level--->",
        //             catalog_3_level[index_2]
        //         );
        //         Catalog.push({
        //             first: catalog_1_level[index],
        //             second: catalog_2_level[index_2],
        //             thyrd: catalog_3_level[index_2],
        //         });
        //     }
        // }

        console.log("Catalog ---> ", Catalog);

        //const client = await MongoClient.connect(process.env.dbConnect);
        //  const db = client.db();
        const collectionCatalog = db.collection("catalogcollection");

        //сначала удаляем все потом загружаем заново
        const result = await collectionCatalog.deleteMany({});
        if (result) {
            const resultInsert = await collectionCatalog.insertMany(Catalog);
        }

        await client.close();

        return new NextResponse(
            JSON.stringify({ Success: true, message: "result" }),
            {
                status: 200,
                headers: {
                    "content-type": "application/json",
                },
            }
        );

        //----------------
        //----------------
        //----------------
        //получить весь каталог для создания меню на странице
    } else if (query == "getCatalog") {
        const client = await MongoClient.connect(process.env.dbConnect);
        const db = client.db();
        const collectionCatalog = db.collection("catalogcollection");

        const result = await collectionCatalog
            // .find({})
            .distinct("first");
        // .toArray(function (err, result) {
        //     if (err) throw err;
        //     //console.log("result--------->", result);
        //     db.close();
        // });

        console.log("result-----", result);

        // console.log("result-----", result);

        await client.close();

        return new NextResponse(
            JSON.stringify({ Success: true, message: result }),
            {
                status: 200,
                headers: {
                    "content-type": "application/json",
                },
            }
        );
    }

    return NextResponse.json({ message: resultCount });
}
