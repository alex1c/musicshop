"use client";

import Footer from "@/components/Footer";
import Menu from "@/components/Menu";
import React, { useState, useEffect } from "react";
//import { FormEvent } from 'react'

// после загрузки не отображает количестов товара. Что то с асинхронностью
const upload = () => {
    const [result, setResult] = useState("");
    const [count, setCount] = useState("");

    async function getCountItems() {
        const responseCount = await fetch("/api/catalog?type=count", {
            method: "GET",
            // body: formData,
        });

        if (responseCount.status == 200) {
            setCount(
                "В базе товаров " + responseCount.headers.get("countItems")
            );
        } else {
            setCount("Товары не посчитаны. Ошибка(");
        }
    }

    useEffect(() => {
        getCountItems();
    }, [result]);


    //загрузка прайса
    async function onSubmit(FormEvent) {
        FormEvent.preventDefault();

        //const formData = new FormData(FormEvent.currentTarget);
        const response = await fetch("/api/catalog?type=upload", {
            method: "GET",
        });

        //console.log('response-----===', response)

        if (response.status == 200) {
            setResult("Прайс загружен");
            getCountItems();
        } else {
            setResult("Прайс не загружен. Ошибка(");
        }
    }


    //созлание каталога на основе загруженного прайса
    async function onSubmitCatalog(FormEvent) {
        FormEvent.preventDefault();

        //const formData = new FormData(FormEvent.currentTarget);
        const response = await fetch("/api/catalog?type=createCatalog", {
            method: "GET",
        });

        //console.log("response-----===", response);

        if (response.status == 200) {
            setResult("Каталог создан");
            //getCountItems();
        } else {
            setResult("Каталог не создан. Ошибка(");
        }
    }

    //удаление всего прайса
    async function onSubmitDelete(FormEvent) {
        FormEvent.preventDefault();

        const response = await fetch("/api/catalog", {
            method: "DELETE",
        });

        //  console.log("---responce", response);

        if (response.status == 200) {
            setResult("Прайс удален");
            setCount("");
        } else {
            setResult("Прайс не удален. Ошибка(");
        }
    }

    return (
        <div>
            <Menu />

            <div className="flex justify-between mx-14 mt-72">
                <form onSubmit={onSubmit}>
                    <button
                        type="submit"
                        className="ml-14 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                        Upload price
                    </button>
                </form>

                <form onSubmit={onSubmitCatalog}>
                    <button
                        type="submit"
                        className="ml-14 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                        Create catalog
                    </button>
                </form>

                <span>
                    {result} {count}
                </span>
                <form onSubmit={onSubmitDelete}>
                    <button
                        type="submit"
                        className="ml-14 text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
                    >
                        Delete price
                    </button>
                </form>
            </div>
            <Footer />
        </div>
    );
};

export default upload;
