import Image from 'next/image'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-start p-24 pt-0">
      <Image src="/images/presentacion.jpeg" alt='presentacion' width={650} height={420} />
    </main>
  )
}
