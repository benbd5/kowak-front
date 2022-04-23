import AppLayout from '@/components/Layouts/AppLayout'
import Head from 'next/head'
import useSWR from 'swr'
import { axios } from '@/lib/axios'
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'

const Profile = () => {
  const [message, setMessage] = useState('')
  const [favorite, setFavorite] = useState()
  const [userInfos, setUserInfos] = useState()

  const router = useRouter()
  const { id } = router.query

  const address = `/api/workSpace/${id}`;
  const fetcher = async (url) => await axios.get(url).then((res) => res.data);
  const { data, error } = useSWR(address, fetcher);

  const like = async () => {
    await axios
      .get(`/api/like/${id}`)
      .then(res => setMessage(res.data.message)
      )
      .catch(err => {
        console.log('err :', err);
      }
      )
  }

  const user = async () => {
    await axios
      .get(`/api/user`)
      .then(res => setUserInfos(res.data)
      )
      .catch(err => {
        console.log('err :', err);
      }
      )
    if (userInfos?.user.original.favorites.map(favorite => favorite.workSpaceId).includes(data.item.workSpaceId)) {
      console.log('already in favorites');
      setFavorite(true)
      console.log('favorite :', favorite);
    } else {
      console.log('not in favorites');
      setFavorite(false)
      console.log('favorite :', favorite);
    }
  }

  useEffect(() => {
    user()
  }, [])

  if (error) return <div>Failed to load</div>
  if (!data) return <div>Loading...</div>

  console.log('fav', userInfos?.user.original.favorites.map(favorite => favorite.workSpaceId));
  console.log('data.item.workSpaceId', data.item.workSpaceId);
  console.log('favorite :', favorite);


  const addToFavorite = async () => {
    await like()
    setFavorite(!favorite)
  }

  return (
    <AppLayout
      header={
        <h2 className="font-semibold text-xl text-gray-800 leading-tight">
          Espace de travail
        </h2>
      }>

      <Head>
        <title>{data.item.name}</title>
      </Head>

      {/* Espaces de travail */}
      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">

          {/* Message ajouter/retirer en favoris */}
          {message && (
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative" role="alert">
              <span className="block sm:inline">{message}</span>
              <button onClick={
                () => setMessage('')
              }>
                <span className="absolute top-0 bottom-0 right-0 px-4 py-3">
                  <svg className="fill-current h-6 w-6 text-green-500"
                    role="button" xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20">
                    <title>Fermer</title>
                    <path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" />
                  </svg>
                </span>
              </button>
            </div>
          )}

          <br />

          <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
            <div className="p-6 bg-white border-b border-gray-200">
              <div key={data.item.workSpaceId}>
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">
                      {data.item.name}
                    </h3>
                    <p className="mt-1 text-sm leading-5 text-gray-500">
                      Description : {data.item.description}
                    </p>
                    <p className="mt-1 text-sm leading-5 text-gray-500">
                      Région : {data.item.region}
                    </p>
                    <p className="mt-1 text-sm leading-5 text-gray-500">
                      Département : {data.item.departement}
                    </p>
                    <p className="mt-1 text-sm leading-5 text-gray-500">
                      Code postal : {data.item.zipCode}
                    </p>
                    <p className="mt-1 text-sm leading-5 text-gray-500">
                      Ville : {data.item.city}
                    </p>
                    <p className="mt-1 text-sm leading-5 text-gray-500">
                      Surface : {data.item.surface}m²
                    </p>
                    <p className="mt-1 text-sm leading-5 text-gray-500">
                      Nombre de bureaux : {data.item.desk}
                    </p>
                    <p className="mt-1 text-sm leading-5 text-gray-500">
                      Nombre d'écrans : {data.item.computerScreen}
                    </p>
                    <p className="mt-1 text-sm leading-5 text-gray-500">
                      Nombre de projecteurs : {data.item.projector}
                    </p>
                    <p className="mt-1 text-sm leading-5 text-gray-500">
                      Parking :
                      {data.item.parking == 1 ? ' Oui' : ' Non'}
                    </p>
                    <p className="mt-1 text-sm leading-5 text-gray-500">
                      Accès personnes handicapées :
                      {data.item.handicappedPersonsAccess == 1 ? ' Oui' : ' Non'}
                    </p>
                    <p className="mt-1 text-sm leading-5 text-gray-500">
                      <button onClick={addToFavorite}>
                        {!favorite ? 'Retirer des favoris' : 'Ajouter aux favoris'}
                      </button>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* L'espace de travail appartient à : */}
      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
            <div className="p-6 bg-white border-b border-gray-200">
              <h2>Propriétaire</h2>
              <div key={data.item.workSpaceId}>
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">
                      {data.item.users_appartenir.firstName} {data.item.users_appartenir.lastName}
                    </h3>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  )
}

export default Profile
