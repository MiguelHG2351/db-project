import Image from 'next/image'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="flex flex-col items-center w-full max-w-[450px]">
        <div className="flex gap-x-4 items-center">
          <Image src="/images/UNI.png" width={128} height={128} alt='Logo de la universidad Nacional de Ingeniería' />
          <div className="">
            <h2 className='text-center'>Universidad Nacional de ingeniería</h2>
            <h3 className='text-center'>Facultad de electrotecnia y computación</h3>
          </div>
        </div>
        
        <h2 className='text-center'>Asignatura: Bases de datos</h2>
        <h1 className='text-center'>Proyecto de fin de curso para la asignatura de Bases de datos</h1>

        <p className='text-center'>Sistema de control financiero e inventario de bodega para taller de refrigeración y aire acondicionado domiciliar &quot;Refrikar&quot;</p>

        <div className="block">
          <h2>Integrantes:</h2>
          <ul className='flex flex-col gap-y-4'>
            <li>
            <p className='mt-6'>Miguel Angel Hernández Gaitan</p>
            <p>2020-1049U</p>
            </li>
            <li>
            <p className='mt-6'>Miguel Angel Hernández Gaitan</p>
            <p>2020-1049U</p>
            </li>
            <li>
            <p className='mt-6'>Miguel Angel Hernández Gaitan</p>
            <p>2020-1049U</p>
            </li>
          </ul>
        </div>

        <div className="block">
          <h2>Tutor:</h2>
          <p className='mt-6'>Msc. Luis Eduardo Chávez Mairena</p>
        </div>
      </div>
    </main>
  )
}
