import Image from "next/image";
import Menu from "@/components/Menu";
import Footer from "@/components/Footer";
import AsideLeft from "@/components/AsideLeft";
import MainSection from "@/components/MainSection";
import AsideRight from "@/components/AsideRight";

export default function Home() {
    return (
        <>
            <Menu ></Menu>
            <div className="flex">
                <AsideLeft ></AsideLeft>
                <MainSection></MainSection>
                <AsideRight></AsideRight>
            </div>
            <Footer></Footer>
        </>
    );
}
