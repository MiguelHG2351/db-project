import Image from 'next/image'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="w-full max-w-[450px]">
        <div className="flex gap-x-4 items-center">
          <Image src="/images/UNI.png" width={128} height={128} alt='Logo de la universidad Nacional de Ingeniería' />
          <div className="">
            <h2 className='text-center'>Universidad Nacional de ingeniería</h2>
            <h3 className='text-center'>Facultad de electrotecnia y computación</h3>
          </div>
        </div>
        
        <h1 className='text-center mt-6 font-medium'>Proyecto de fin de curso para la asignatura de Bases de datos</h1>

        <p className='text-center font-bold mt-6'>Sistema de control financiero e inventario de bodega para taller de refrigeración y aire acondicionado domiciliar &quot;Refrikar&quot;</p>

        <div className="block">
          <h2 className='font-bold'>Integrantes:</h2>
          <ul className='flex flex-col gap-y-4'>
            <li className='flex justify-between items-center'>
            <p className='mt-6 font-medium'>Miguel Angel Hernández Gaitan</p>
            <p>2020-1049U</p>
            </li>
            <li className='flex justify-between items-center'>
            <p className='mt-6 font-medium'>Miguel Angel Hernández Gaitan</p>
            <p>2020-1049U</p>
            </li>
            <li className='flex justify-between items-center'>
            <p className='mt-6 font-medium'>Miguel Angel Hernández Gaitan</p>
            <p>2020-1049U</p>
            </li>
          </ul>
        </div>

        <div className="flex items-center mt-6 gap-x-2">
          <h2 className='font-bold'>Tutor:</h2>
          <p className='font-medium'>Msc. Luis Eduardo Chávez Mairena</p>
        </div>
      </div>
    </main>
  )
}
