import React, { useState, useEffect } from "react";

const Catalog = () => {
    const [catalog, setCatalog] = useState([]);

    async function getPriceCatalog() {
        const responseCatalog = await fetch("/api/catalog?type=getCatalog", {
            method: "GET",
            // body: formData,
        });

        //const res = responseCatalog.json().then((dat) => console.log(dat.message))
        const res = responseCatalog.json().then((dat) => dat);

        //console.log("responseCatalog--->", res);

        return res;

        if (responseCatalog.status == 200) {
            setCatalog("Каталог получен ");
        } else {
            setCatalog("Каталог не получен. Ошибка(");
        }
    }

    useEffect(() => {
        getPriceCatalog().then((dat) => setCatalog(dat.message));
    }, []);
    // const temp = getPriceCatalog()

    // temp.then((dat)=> setCatalog(dat.message))

    // console.log('catalog----',catalog)

    return (
        <div>
            Catalog
            <ul className="max-w-md space-y-1 text-gray-500 list-disc list-inside dark:text-gray-400">
                {catalog.map((item) => (
                    <li>{item}</li>
                ))}
            </ul>
        </div>
    );
};

export default Catalog;
