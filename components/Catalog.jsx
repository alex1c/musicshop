import React, { useState, useEffect } from "react";

const Catalog = () => {
    const [catalog, setCatalog] = useState([]);

    async function getPriceCatalog() {
        const responseCount = await fetch("/api/catalog?type=catalog", {
            method: "GET",
            // body: formData,
        });

        // console.log(
        //     "responseCount-----===",
        //     responseCount.headers.get("countItems")
        // );

        if (responseCount.status == 200) {
            setCatalog("Каталог получен ");
        } else {
            setCatalog("Каталог не получен. Ошибка(");
        }
    }

    useEffect(() => {
        getPriceCatalog();
    }, []);

    return <div>Catalog</div>;
};

export default Catalog;
