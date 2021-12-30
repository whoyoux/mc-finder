import { useState } from 'react';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';

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
    useToast
} from '@chakra-ui/react';
import Head from 'next/head';
import { redirect } from 'next/dist/server/api-utils';

const Home: NextPage = () => {
    const toast = useToast();
    const router = useRouter();
    const [ip, setIP] = useState('');
    const handleChangeIP = (event: any) => setIP(event.target.value);

    const handleKeyUp = (event: any) => {
        event.preventDefault();
        if (event.key === 'Enter') redirectToServerPage();
    };

    const redirectToServerPage = () => {
        if (!ip.trim() || ip.trim().length <= 0) {
            toast({
                title: 'Whoops!',
                description: "IP can't be empty.",
                status: 'error',
                duration: 9000,
                isClosable: true
            });
            return;
        }

        if (ip.trim().length > 25) {
            toast({
                title: 'Whoops!',
                description: "IP can't be more than 25 characters.",
                status: 'error',
                duration: 9000,
                isClosable: true
            });
            return;
        }

        if (ip.trim().length < 4) {
            toast({
                title: 'Whoops!',
                description: "IP can't be less than 4 characters.",
                status: 'error',
                duration: 9000,
                isClosable: true
            });
            return;
        }
        router.push(`/${ip.trim()}`);
    };
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
                            <Input
                                type="text"
                                variant="filled"
                                placeholder="Server ip"
                                size="lg"
                                value={ip}
                                onChange={handleChangeIP}
                                onKeyUp={handleKeyUp}
                            />

                            <IconButton
                                aria-label="Search database"
                                icon={<SearchIcon />}
                                size="lg"
                                onClick={redirectToServerPage}
                            />
                        </Stack>
                    </VStack>
                </Center>
            </Box>
        </>
    );
};

export default Home;
