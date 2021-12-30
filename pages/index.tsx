import { useState, useEffect } from 'react';
import type { NextPage } from 'next';
import axios from 'axios';

import Header from '../components/Header';

import { SearchIcon } from '@chakra-ui/icons';
import {
    Box,
    Center,
    Input,
    Stack,
    IconButton,
    VStack,
    Text,
    InputGroup,
    InputLeftAddon,
    InputRightAddon
} from '@chakra-ui/react';
import Head from 'next/head';

const Home: NextPage = () => {
    return (
        <>
            <Head>
                <title>McFinder</title>
                <meta
                    name="description"
                    content="Simple page for finding informations about Minecraft server."
                />
                <meta name="theme-color" content="#7289DA" />
            </Head>
            <Header />
            <Box w="100%" h={500}>
                <Center h="100%">
                    <VStack w={['90%', '70%', '50%', '40%', '35%', '35%']}>
                        <Text fontSize="4xl" m={4}>
                            Find stats about your favorite server!
                        </Text>
                        <Stack direction={['column', 'row']} w="100%">
                            <InputGroup size="lg">
                                <Input
                                    type="text"
                                    variant="filled"
                                    placeholder="Server ip"
                                    borderRightRadius={0}
                                    w="70%"
                                />
                                <Input
                                    type="number"
                                    variant="filled"
                                    placeholder="Server port"
                                    borderLeftRadius={0}
                                    w="30%"
                                />
                            </InputGroup>

                            <IconButton
                                aria-label="Search database"
                                icon={<SearchIcon />}
                                size="lg"
                            />
                        </Stack>
                    </VStack>
                </Center>
            </Box>
        </>
    );
};

export default Home;
