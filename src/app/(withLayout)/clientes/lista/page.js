'use client'
import ClientList from "@/components/Listagem/ClientList";
import DarkTheme from "@/components/darkTheme";

export default function ListClientes() {
    return (
        <div>
            <DarkTheme>
                <div className="h-full w-full flex items-center justify-center mt-5">
                    <ClientList />
                </div>
            </DarkTheme>
        </div>
    )
}