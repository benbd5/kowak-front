import AppLayout from '@/components/Layouts/AppLayout'
import Head from 'next/head'
import { useState, useEffect } from 'react'
import useSWR from 'swr'
import { axios } from '@/lib/axios'
import Link from 'next/link'

const Profile = () => {
  const address = `/api/user`;
  const fetcher = async (url) => await axios.get(url).then((res) => res.data);
  const { data, error } = useSWR(address, fetcher);
  console.log('data profile :', data);

  if (error) return <div>Failed to load</div>
  if (!data) return <div>Loading...</div>

  console.log('data :', data);

  // @todo: exporter les sections en composants

  return (
    <AppLayout
      header={
        <h2 className="font-semibold text-xl text-gray-800 leading-tight">
          Profile
        </h2>
      }>

      <Head>
        <title>Bienvenue sur votre profile { }</title>
      </Head>

      {/* Informations personnelles */}
      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
            <div className="p-6 bg-white border-b border-gray-200">
              <h2>Vos informations personnelles</h2>
              <div key={data.item.id}>
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">
                      {data.item.firstName} {data.item.lastName}
                    </h3>
                    <p className="mt-1 text-sm leading-5 text-gray-500">
                      {data.item.email}
                    </p>
                    <p className="mt-1 text-sm leading-5 text-gray-500">
                      {data.item.phone}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Espaces de travail de l'utilisateur */}
      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
            <div className="p-6 bg-white border-b border-gray-200">
              <h2>Vos espaces de travail</h2>
              {data.item.work_space_appartenir.map((item) => (
                <div key={item.id}>
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <h3 className="text-lg leading-6 font-medium text-gray-900">
                        {/* {item.firstName} */}
                      </h3>
                      <p className="mt-1 text-sm leading-5 text-gray-500">
                        {/* {item.email} */}
                      </p>
                      <p className="mt-1 text-sm leading-5 text-gray-500">
                        {/* {item.phone} */}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Espaces de travail que l'utilisateur a loué */}
      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
            <div className="p-6 bg-white border-b border-gray-200">
              <h2>Les espaces de travail que vous avez loué</h2>
              {data.item.work_space_location.map((item) => (
                <div key={item.id}>
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <h3 className="text-lg leading-6 font-medium text-gray-900">
                        {/* {item.firstName} */}
                      </h3>
                      <p className="mt-1 text-sm leading-5 text-gray-500">
                        {/* {item.email} */}
                      </p>
                      <p className="mt-1 text-sm leading-5 text-gray-500">
                        {/* {item.phone} */}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Espaces de travail que l'utilisateur a ajouté en favoris */}
      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
            <div className="p-6 bg-white border-b border-gray-200">
              <h2>Les espaces de travail que vous avez ajouté en favoris</h2>
              {data.user.original.favorites.map((item) => (
                <div key={item.workSpaceId}>
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <h3 className="text-lg leading-6 font-medium text-gray-900">
                        {item.name}
                      </h3>
                      <p className="mt-1 text-sm leading-5 text-gray-500">
                        Description : {item.description}
                      </p>
                      <p className="mt-1 text-sm leading-5 text-gray-500">
                        Région : {item.region}
                      </p>
                      <p className="mt-1 text-sm leading-5 text-gray-500">
                        Département : {item.departement}
                      </p>
                      <p className="mt-1 text-sm leading-5 text-gray-500">
                        Code postal : {item.zipCode}
                      </p>
                      <p className="mt-1 text-sm leading-5 text-gray-500">
                        Ville : {item.city}
                      </p>
                      <p className="mt-1 text-sm leading-5 text-gray-500">
                        Surface : {item.surface}m²
                      </p>
                      <p className="mt-1 text-sm leading-5 text-gray-500">
                        Nombre de bureaux : {item.desk}
                      </p>
                      <p className="mt-1 text-sm leading-5 text-gray-500">
                        Nombre d'écrans : {item.computerScreen}
                      </p>
                      <p className="mt-1 text-sm leading-5 text-gray-500">
                        Nombre de projecteurs : {item.projector}
                      </p>
                      <p className="mt-1 text-sm leading-5 text-gray-500">
                        Parking :
                        {item.parking == 1 ? ' Oui' : ' Non'}
                      </p>
                      <p className="mt-1 text-sm leading-5 text-gray-500">
                        Accès personnes handicapées :
                        {item.handicappedPersonsAccess == 1 ? ' Oui' : ' Non'}
                      </p>
                      <p className="mt-1 text-sm leading-5 text-gray-500">
                        <Link href=
                          {{
                            pathname: '/workspaces/[id]',
                            query: { id: `${item.workSpaceId}` },
                          }}>
                          Consulter l'annonce
                        </Link>
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  )
}

export default Profile
