import { SideNavLink, UserMenuLink } from '@/components';
import { useAuth } from '@/hooks';
import { getUserPermissions } from '@/lib/Utils/getPermissions';
import {
  Avatar,
  Box,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Text,
} from '@chakra-ui/react';
import {
  IconLogout,
  IconNotes,
  IconUser,
  IconUserCheck,
  IconReport,
  IconReportAnalytics,
} from '@tabler/icons';

export const UserMenu = () => {
  const { user, signOut } = useAuth();
  const permissions = getUserPermissions(user?.role);

  const handleSignout = () => {
    signOut();
  };

  return (
    <Menu autoSelect={false}>
      <MenuButton
        outlineOffset="0"
        _focus={{
          outlineColor: 'primary.surface',
          outlineWidth: '3px',
        }}
        _active={{
          outlineColor: 'primary.surface',
          outlineWidth: '3px',
        }}
        borderRadius="full"
      >
        <Avatar
          name={user?.name}
          src={user?.profilePhotoUrl}
          w={{ base: '24', lg: '40' }}
          h={{ base: '24', lg: '40' }}
        />
      </MenuButton>
      <MenuList
        py="24"
        shadow="none"
        position="relative"
        right="-10"
        top="14"
        borderColor="neutral.300"
      >
        <Box
          position="absolute"
          w="20"
          h="20"
          bg="surface.white"
          top="-10"
          right={{ base: '11', lg: '18' }}
          transform="rotateZ(45deg)"
          borderLeft="1px"
          borderTop="1px"
          borderColor="neutral.300"
        ></Box>
        <Box px="24" py="10">
          <Text variant="body-md" fontWeight="semibold" color="neutral.900">
            {user?.name}
          </Text>
          <Text variant="body-sm" fontWeight="medium" color="neutral.700">
            {user?.email}
          </Text>
        </Box>
        <MenuDivider />
        <UserMenuLink
          as={MenuItem}
          href="/draft"
          icon={<IconNotes />}
          px="12"
          py="10"
          borderRadius="0"
        >
          Draft
        </UserMenuLink>
        {permissions > 1 && (
          <UserMenuLink
            as={MenuItem}
            href="/review"
            icon={<IconReportAnalytics />}
            px="12"
            py="10"
            borderRadius="0"
          >
            Review
          </UserMenuLink>
        )}
        <MenuDivider />
        {permissions > 2 && (
          <>
            <UserMenuLink
              as={MenuItem}
              href="/manage-users"
              icon={<IconUserCheck />}
              px="12"
              py="10"
              borderRadius="0"
            >
              Manage Users
            </UserMenuLink>

            {permissions > 3 && (
              <UserMenuLink
                as={MenuItem}
                href="/logs"
                icon={<IconReport />}
                px="12"
                py="10"
                borderRadius="0"
              >
                Logs
              </UserMenuLink>
            )}
            <MenuDivider />
          </>
        )}
        <UserMenuLink
          as={MenuItem}
          href="/profile"
          icon={<IconUser />}
          px="12"
          py="10"
          borderRadius="0"
        >
          Profile
        </UserMenuLink>
        <SideNavLink
          as={MenuItem}
          href="#"
          icon={<IconLogout />}
          px="12"
          py="10"
          borderRadius="0"
          onClick={handleSignout}
        >
          Logout
        </SideNavLink>
      </MenuList>
    </Menu>
  );
};
