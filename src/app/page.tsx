'use client'

import { Container, Flex, Text, VStack, Stat, StatLabel, StatNumber, Image, SimpleGrid, Box } from '@chakra-ui/react'
import { useAppKitAccount, useAppKitNetwork, useAppKitProvider } from '@reown/appkit/react'
import { BrowserProvider, formatEther } from 'ethers'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

export default function Home() {
  const { address, isConnected } = useAppKitAccount()
  const { caipNetwork } = useAppKitNetwork()
  const { walletProvider } = useAppKitProvider('eip155')
  const [balance, setBalance] = useState<string>('0')
  const router = useRouter()

  useEffect(() => {
    async function getBalance() {
      if (address && walletProvider) {
        try {
          const provider = new BrowserProvider(walletProvider as any)
          const balance = await provider.getBalance(address)
          setBalance(formatEther(balance))
        } catch (error) {
          console.error('Error fetching balance:', error)
          setBalance('0')
        }
      }
    }

    if (isConnected) {
      getBalance()
    }
  }, [address, isConnected, walletProvider])

  const handleServiceClick = () => {
    router.push('/contact')
  }

  return (
    <Container maxW="container.xl" py={20}>
      <VStack spacing={16} align="center">
        {!isConnected ? (
          <VStack spacing={16}>
            <VStack spacing={12}>
              <Image
                src="/stratLogoWhitepng.png"
                alt="Strat Logo"
                width="100%"
                height="auto"
                maxW="600px"
                opacity={0}
                animation="fadeIn 3s ease-in forwards"
                sx={{
                  '@keyframes fadeIn': {
                    '0%': { opacity: 0 },
                    '100%': { opacity: 1 }
                  }
                }}
              />
              <Text
                fontSize="xl"
                color="gray.300"
                opacity={0}
                animation="fadeInText 3s ease-in forwards"
                style={{ animationDelay: '3s' }}
                sx={{
                  '@keyframes fadeInText': {
                    '0%': { opacity: 0 },
                    '100%': { opacity: 1 }
                  }
                }}
              >
                Building Web3 since 2013.
              </Text>
            </VStack>

            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={8} width="100%" maxW="1200px">
              {[
                {
                  title: 'Solidity Contracts Security Audit',
                  description: 'Comprehensive security assessments for smart contracts'
                },
                {
                  title: 'Web3 Project Design and Implementation',
                  description: 'End-to-end Web3 project development and deployment'
                },
                {
                  title: 'Custom DAO Deployment',
                  description: 'Tailored DAO solutions for your organization'
                },
                {
                  title: 'On-measure Web3 APIs',
                  description: 'Custom Web3 APIs built with Nest.js'
                }
              ].map((service) => (
                <Box
                  key={service.title}
                  bg="gray.800"
                  p={6}
                  borderRadius="lg"
                  cursor="pointer"
                  onClick={handleServiceClick}
                  transition="all 0.2s"
                  _hover={{
                    transform: 'translateY(-4px)',
                    bg: 'gray.700'
                  }}
                >
                  <Text fontSize="xl" fontWeight="bold" mb={3}>
                    {service.title}
                  </Text>
                  <Text color="gray.400">
                    {service.description}
                  </Text>
                </Box>
              ))}
            </SimpleGrid>
          </VStack>
        ) : (
          <Flex direction="column" gap={8} w="full" maxW="md">
            <Stat bg="gray.800" p={6} borderRadius="lg">
              <StatLabel color="gray.400" mb={2}>Network</StatLabel>
              <StatNumber>{caipNetwork?.name || 'Unknown Network'}</StatNumber>
            </Stat>

            <Stat bg="gray.800" p={6} borderRadius="lg">
              <StatLabel color="gray.400" mb={2}>Address</StatLabel>
              <StatNumber fontSize="lg" wordBreak="break-all">
                {address}
              </StatNumber>
            </Stat>

            <Stat bg="gray.800" p={6} borderRadius="lg">
              <StatLabel color="gray.400" mb={2}>Balance</StatLabel>
              <StatNumber>{parseFloat(balance).toFixed(4)} ETH</StatNumber>
            </Stat>
          </Flex>
        )}
      </VStack>
    </Container>
  )
}