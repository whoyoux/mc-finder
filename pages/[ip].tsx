import type { NextPage } from 'next';
import axios from 'axios';

import { motdParser } from '@sfirew/mc-motd-parser';
import ReactHtmlParser from 'react-html-parser';

import Head from 'next/head';
import Image from 'next/image';

import Header from '../components/Header';

import { Box, Center, Text, Divider } from '@chakra-ui/react';

import { useRouter } from 'next/router';

const ServerPage: NextPage = ({ data }: any) => {
    const router = useRouter();
    const { ip } = router.query;

    return (
        <>
            <Head>
                {!data.error ? (
                    <>
                        <title>Server {ip}</title>
                        <meta property="og:type" content="website" />
                        <meta
                            property="og:title"
                            content={`Info about ${ip}`}
                        />
                        <meta
                            property="og:site_name"
                            content="mc-finder.vercel.com"
                        />
                        <meta
                            property="og:description"
                            content={data.description}
                        />
                        <meta
                            property="og:url"
                            content={`mc-finder.vercel.app/${ip}`}
                        />
                        <meta property="og:image" content={data.favicon} />
                        <link rel="icon" type="image/png" href={data.favicon} />
                        <meta
                            name="twitter:card"
                            content="summary_large_image"
                        />
                    </>
                ) : (
                    <>
                        <title>Server not found!</title>
                        <meta property="og:type" content="website" />
                        <meta property="og:title" content="Server not found!" />
                        <meta
                            property="og:site_name"
                            content="mc-finder.vercel.com"
                        />
                        <meta
                            name="twitter:card"
                            content="summary_large_image"
                        />
                    </>
                )}
            </Head>
            <Header />
            <Box w="100%" h={500}>
                <Center h="100%">
                    {!data.error ? (
                        <>
                            <Box>
                                <Center>
                                    <Image
                                        src={data.favicon}
                                        quality="100"
                                        alt="Server icon"
                                        width={64}
                                        height={64}
                                    />
                                </Center>

                                <Divider my={4} />
                                <Text>IP: {ip}</Text>
                                <Divider my={4} />
                                <Text>
                                    MOTD:{' '}
                                    {data.description !== ''
                                        ? ReactHtmlParser(
                                              motdParser.textToHTML(
                                                  data.description
                                              )
                                          )
                                        : `MOTD is empty`}
                                </Text>
                            </Box>
                        </>
                    ) : (
                        <>
                            <Text>Server not found!</Text>
                        </>
                    )}
                </Center>
            </Box>
        </>
    );
};

export async function getServerSideProps({ query }: any) {
    const { ip } = query;
    let response;
    try {
        const res = await axios.get(
            `https://eu.mc-api.net/v3/server/ping/${ip}`
        );
        response = res.data;
    } catch (err: any) {
        console.log(err.message);
        response = { error: true, message: err };
    }

    return {
        props: {
            data: response
        }
    };
}
export default ServerPage;
