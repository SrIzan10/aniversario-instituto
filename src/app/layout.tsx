import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ClerkLoaded, ClerkLoading, ClerkProvider, currentUser } from '@clerk/nextjs';
import "./globals.css";
import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';
import { ColorSchemeScript, LoadingOverlay, MantineProvider } from "@mantine/core";
import NavBar from "@/components/NavBar/NavBar";
import { Notifications } from "@mantine/notifications";
import SchoolEmailLogin from "@/components/SchoolEmailLogin/SchoolEmailLogin";
import Providers from "@/providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Aniversario Instituto",
  description: "Formulario para el aniversario del instituto",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await currentUser()
  return (
        <ClerkProvider>
        <html lang="es">
          <head>
            {/* here was a <Script> tag with an umami analytics script */}
            <ColorSchemeScript />
          </head>
          <body className={inter.className}>
            <MantineProvider>
              <ClerkLoading>
                <LoadingOverlay visible />
              </ClerkLoading>
                <Providers>
                  <ClerkLoaded>
                      {
                        // the email was hardcoded before this open source release
                        user?.emailAddresses[0].emailAddress.endsWith(`@${process.env.EMAIL_DOMAIN}`) ?
                          (
                            <>
                              <Notifications />
                              <NavBar>{children}</NavBar>
                            </>
                          ) :
                          <SchoolEmailLogin />
                      }
                  </ClerkLoaded>
                </Providers>
            </MantineProvider>
          </body>
        </html>
    </ClerkProvider>
  );
}
