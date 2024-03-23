'use client'

import { useEffect, useState } from 'react';
import { Center, Tooltip, UnstyledButton, Stack, rem } from '@mantine/core';
import {
  TbHome2 as IconHome2,
  TbCalendar as IconCalendar,
  TbUsersGroup as IconUsersGroup,
  TbHelp,
} from 'react-icons/tb';
import { LuSchool } from "react-icons/lu";
import classes from './index.module.css';
import { usePathname } from 'next/navigation';
import { useRouter } from 'next-nprogress-bar';
import {UserButton, useUser} from "@clerk/nextjs";
import {RiAdminLine} from "react-icons/ri";
import Countdown from "@/components/Countdown/Countdown";

interface NavbarLinkProps {
  icon: typeof IconHome2;
  label: string;
  active?: boolean;
  onClick?(): void;
}

function NavbarLink({ icon: Icon, label, active, onClick }: NavbarLinkProps) {
  return (
    <Tooltip label={label} position="right" transitionProps={{ duration: 0 }}>
      <UnstyledButton onClick={onClick} className={classes.link} data-active={active || undefined}>
        <Icon style={{ width: rem(20), height: rem(20) }} strokeWidth={label === 'Administración' ? .1 : 1.5} />
      </UnstyledButton>
    </Tooltip>
  );
}

const mockdata = [
  { icon: IconHome2, label: 'Inicio', routes: ['/'] },
  { icon: IconUsersGroup, label: 'Mis equipos', routes: ['/teams', '/teams/create', '/teams/join'] },
  { icon: IconCalendar, label: 'Horario', routes: ['/schedule'] },
  { icon: TbHelp, label: 'Ayuda', routes: ['/help'] },
  { icon: RiAdminLine, label: 'Administración', routes: ['/admin'] }
];

export default function NavBar({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [active, setActive] = useState(0);

  useEffect(() => {
    const index = mockdata.findIndex((link) => link.routes.includes(pathname));
    setActive(index);
  }, [pathname]);

  const links = mockdata.map((link, index) => (
    <NavbarLink
      {...link}
      key={link.label}
      active={index === active}
      onClick={() => router.push(link.routes[0])}
    />
  ));

  return (
    <div className={classes.parent}>
      <nav className={classes.navbar}>
        <Center>
          <LuSchool type="mark" size={30} />
        </Center>

        <div className={classes.navbarMain}>
          <Stack justify="center" gap={0}>
            {links}
          </Stack>
        </div>

        <Stack justify="center" gap={0}>
          <UserButton />
        </Stack>
      </nav>
      <div className={classes.content}>
        <Countdown />
        {children}
      </div>
    </div>
  );
}