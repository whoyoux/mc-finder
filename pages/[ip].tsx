import type { NextPage } from 'next';
import axios from 'axios';

import Head from 'next/head';
import Image from 'next/image';

import Header from '../components/Header';

import {
    Box,
    Center,
    Stack,
    IconButton,
    VStack,
    Text,
    Divider
} from '@chakra-ui/react';
import { useRouter } from 'next/router';

const ServerPage: NextPage = ({ data }: any) => {
    const router = useRouter();
    const { ip } = router.query;
    return (
        <>
            <Head>
                <title>
                    {data.debug.dns?.error
                        ? 'Server not found!'
                        : data.hostname}
                </title>
                <meta property="og:type" content="website" />
                <meta
                    property="og:title"
                    content={
                        data.debug.dns?.error
                            ? 'Server not found!'
                            : `${data.hostname}`
                    }
                    key="title"
                />
                <meta
                    property="og:description"
                    content={
                        data.debug.dns?.error
                            ? 'Server not found!'
                            : `Info about ${data.hostname}`
                    }
                />
                <meta
                    property="og:url"
                    content={`mc-finder.vercel.app/${ip}`}
                />
                <meta property="og:image" content={data.icon} />
                <link rel="icon" type="image/png" href={data.icon} />
            </Head>
            <Header />
            <Box w="100%" h={500}>
                <Center h="100%">
                    <Box>
                        <Center>
                            <Image
                                src={data.icon}
                                quality="100"
                                alt="Server icon"
                                width={64}
                                height={64}
                            />
                        </Center>

                        <Divider my={4} />
                        <Text>IP: {data.hostname}</Text>
                        <Divider my={4} />
                        <Text>
                            MOTD:{' '}
                            {data.motd.clean.map((motd: string) => {
                                return motd;
                            })}
                        </Text>
                    </Box>
                </Center>
            </Box>
        </>
    );
};

export async function getServerSideProps({ query }: any) {
    const { ip } = query;
    let response;
    try {
        const res = await axios.get(`https://api.mcsrvstat.us/2/${ip}`);
        response = res.data;
    } catch (err) {
        response = { error: true, message: err };
    }

    return {
        props: {
            data: response
        }
    };
}
export default ServerPage;
