import { useState, useEffect } from 'react';
import type { NextPage } from 'next';
import axios from 'axios';

import Head from 'next/head';

import Header from '../components/Header';

import { SearchIcon } from '@chakra-ui/icons';
import {
    Box,
    Center,
    Input,
    Stack,
    IconButton,
    VStack,
    Text
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
                <meta property="og:type" content="McFinder" />
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
            </Head>
            <Header />
            <Box w="100%" h={500}>
                <Center h="100%">{data.toString()}</Center>
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
