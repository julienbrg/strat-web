'use client'

import { Box, Button, Flex, Container, Image } from '@chakra-ui/react'
import { useAppKit } from '@reown/appkit/react'
import { useAppKitAccount, useDisconnect } from '@reown/appkit/react'

export default function Header() {
  const { open } = useAppKit()
  const { isConnected, address } = useAppKitAccount()
  const { disconnect } = useDisconnect()

  const handleConnect = () => {
    open({ view: 'Connect' })
  }

  const handleDisconnect = () => {
    disconnect()
  }

  const buttonStyles = {
    bg: '#8c1c84',
    color: 'white',
    _hover: {
      bg: '#6d1566',
    },
    _active: {
      bg: '#4e1049'
    }
  }

  return (
    <Box as="header" py={4} position="fixed" w="100%" top={0} zIndex={10}>
      <Container maxW="container.xl">
        <Flex justify="space-between" align="center">
          <Image 
            src="/stratLogoWhitepng.png" 
            alt="Strat Logo"
            height="32px"
            objectFit="contain"
          />
          {!isConnected ? (
            <Button
              {...buttonStyles}
              onClick={handleConnect}
              size="sm"
            >
              Login
            </Button>
          ) : (
            <Button
              {...buttonStyles}
              onClick={handleDisconnect}
              size="sm"
            >
              Logout
            </Button>
          )}
        </Flex>
      </Container>
    </Box>
  )
}