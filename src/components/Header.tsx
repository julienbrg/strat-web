'use client'

import { Box, Button, Flex, Image } from '@chakra-ui/react'
import { useAppKit } from '@reown/appkit/react'
import { useAppKitAccount, useDisconnect } from '@reown/appkit/react'
import Link from 'next/link'

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
      <Flex justify="space-between" align="center" px={4}>
        <Link href="/">
          <Image 
            src="/stratLogoWhitepng.png" 
            alt="Strat Logo"
            height="32px"
            objectFit="contain"
            cursor="pointer"
            _hover={{ opacity: 0.9 }}
          />
        </Link>
        <Flex gap={2} align="center">
          {!isConnected ? (
            <Button
              {...buttonStyles}
              onClick={handleConnect}
              size="sm"
            >
              Login
            </Button>
          ) : (
            <>
              <Box 
                transform="scale(0.85)"
                transformOrigin="right center"
              >
                <appkit-network-button />
              </Box>
              <Button
                {...buttonStyles}
                onClick={handleDisconnect}
                size="sm"
                ml={4}
              >
                Logout
              </Button>
            </>
          )}
        </Flex>
      </Flex>
    </Box>
  )
}