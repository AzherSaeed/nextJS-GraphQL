'use client';

import { ApolloClient, ApolloProvider, HttpLink, InMemoryCache } from "@apollo/client";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { Menu } from "antd";
import { usePathname, useRouter } from "next/navigation";


const client = new ApolloClient({
    ssrMode: typeof window === 'undefined',

    link: new HttpLink({
        uri: '/api/graphql', // Update with your server URL
    }),
    cache: new InMemoryCache()
});
export function Providers({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const pathname = usePathname()
    return <ApolloProvider client={client}>

        <AntdRegistry>
            <Menu
                mode="horizontal"
                items={[
                    {
                        key: "books",
                        label: <p>Books</p>
                    },
                    {
                        key: "create",
                        label: <p>Create Book</p>
                    }
                ]
                }
                activeKey={pathname === "/" ? "books" : "create"}
                onClick={({ key }) => {
                    if (key === "books") {
                        router.push("/");
                    } else if (key === "create") {
                        router.push("/create");
                    }
                }}
            />
            {children}
        </AntdRegistry>
    </ApolloProvider>
}