import AppLayout from '@/components/Layouts/AppLayout'
import Head from 'next/head'
import useSWR from 'swr'
import { axios } from '@/lib/axios'
import { useRouter } from 'next/router'
import Link from 'next/link'

const Profile = () => {
  const address = `/api/workSpace`;
  const fetcher = async (url) => await axios.get(url).then((res) => res.data);
  const { data, error } = useSWR(address, fetcher);

  if (error) return <div>Failed to load</div>
  if (!data) return <div>Loading...</div>

  console.log('data :', data);

  const router = useRouter()
  const { id } = router.query

  return (
    <AppLayout
      header={
        <h2 className="font-semibold text-xl text-gray-800 leading-tight">
          Espaces de travail
        </h2>
      }>

      <Head>
        <title>Tous les espaces de travail { }</title>
      </Head>

      {/* Espaces de travail */}
      {data.page.data.map((item) => (
        <div className="py-12">
          <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
              <div className="p-6 bg-white border-b border-gray-200">
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
              </div>
            </div>
          </div>
        </div>
      ))}
    </AppLayout>
  )
}

export default Profile
