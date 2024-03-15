import * as React from 'react';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';
import { useMediaQuery } from '@/hooks/use-media-query';

interface ResponsiveDrawerProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  trigger: React.ReactNode;
  drawerProps: {
    title: string;
    description: string;
    children: React.ReactNode;
  };
}

export function ResponsiveDrawer({
  open,
  setOpen,
  trigger,
  drawerProps,
}: ResponsiveDrawerProps) {
  const isDesktop = useMediaQuery('(min-width: 768px)');

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>{trigger}</DialogTrigger>
        <DialogContent className='sm:max-w-[425px]'>
          <DialogHeader>
            <DialogTitle>{drawerProps.title}</DialogTitle>
            {drawerProps.description && (
              <DialogDescription>{drawerProps.description}</DialogDescription>
            )}
          </DialogHeader>
          {drawerProps.children}
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>{trigger}</DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className='text-left'>
          <DrawerTitle>{drawerProps.title}</DrawerTitle>
          {drawerProps.description && (
            <DrawerDescription>{drawerProps.description}</DrawerDescription>
          )}
        </DrawerHeader>
        {drawerProps.children}
      </DrawerContent>
    </Drawer>
  );
}
