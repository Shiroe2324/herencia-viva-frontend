'use client';

import { buttonVariants } from '@heroui/react';
import Link from 'next/link';
import type { ComponentProps } from 'react';
import type { VariantProps } from 'tailwind-variants';

export type LinkButtonProps = ComponentProps<typeof Link> & VariantProps<typeof buttonVariants>;

export default function LinkButton({ variant, size, fullWidth, className, ...rest }: LinkButtonProps) {
  return <Link className={buttonVariants({ variant, size, fullWidth, className })} {...rest} />;
}
