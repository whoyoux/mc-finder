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

const ServerPage: NextPage = ({ data }: any) => {
    useEffect(() => {
        console.log(data);
    }, []);
    return (
        <>
            <Head>
                <title>
                    {data.debug.dns?.error
                        ? 'Server not found!'
                        : data.hostname}
                </title>
                <meta
                    property="og:title"
                    content={
                        data.debug.dns?.error
                            ? 'Server not found!'
                            : `Info about ${data.hostname}`
                    }
                    key="title"
                />
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
        console.log(res.data);
        response = res.data;
    } catch (err) {
        console.log(err);
        response = { error: true, message: err };
    }

    return {
        props: {
            data: response
        }
    };
}
export default ServerPage;
