import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "A.L.I.A - Academic Lead & Intelligence Assistant",
    short_name: 'A.L.I.A',
    description: "O'quv markazlari uchun CRM va boshqaruv tizimi.",
    start_url: '/',
    display: 'standalone',
    background_color: '#07080e',
    theme_color: '#07080e',
    icons: [
      {
        src: '/favicon.ico',
        sizes: 'any',
        type: 'image/x-icon',
      },
    ],
  }
}
