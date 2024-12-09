'use client'

import { Container, Flex, Text, VStack, Stat, StatLabel, StatNumber } from '@chakra-ui/react'
import { useAppKitAccount, useAppKitNetwork, useAppKitProvider } from '@reown/appkit/react'
import { BrowserProvider, formatEther } from 'ethers'
import { useEffect, useState } from 'react'

export default function Home() {
  const { address, isConnected } = useAppKitAccount()
  const { caipNetwork } = useAppKitNetwork()
  const { walletProvider } = useAppKitProvider('eip155')
  const [balance, setBalance] = useState<string>('0')

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

  return (
    <Container maxW="container.xl" py={20}>
      <VStack spacing={12} align="center">
        {!isConnected ? (
          <Text color="gray.500">Please login.</Text>
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