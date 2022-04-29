import Button from "@/components/Button";
import Input from "@/components/Input";
import AppLayout from "@/components/Layouts/AppLayout";
import Head from "next/head";
import React from "react";
import { useForm } from "react-hook-form";

export default function App() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm();
  const onSubmit = (data) => {
    console.log(data)
  }

  console.log(watch("example")); // watch input value by passing the name of it

  // API adresse.data.gouv.fr
  // fetch('https://api-adresse.data.gouv.fr/search/?q=4%20Rue%20des%20Forges%2085620%20Rocheservi%C3%A8re&type=housenumber&autocomplete=1')
  //   .then(response => {
  //     console.log(response)
  //   })
  //   .then(data => console.log(data))
  //   .catch(error => console.log(error))

  const fetchData = async () => {
    const res = await fetch('https://api-adresse.data.gouv.fr/search/?q=4%20Rue%20des%20Forges%2085620%20Rocheservi%C3%A8re&type=housenumber&autocomplete=1')
    const data = await res.json()
    console.log(data)
  }

  fetchData()


  return (
    <AppLayout
      header={
        <h2 className="font-semibold text-xl text-gray-800 leading-tight">
          Ajouter un espace de travail
        </h2>
      }>

      <Head>
        <title>Ajouter un espace de travail</title>
      </Head>

      <div className="min-h-screen flex flex-col sm:justify-center items-center pt-6 sm:pt-0 bg-gray-100">
        <div className="w-full sm:max-w-md mt-6 px-6 py-4 bg-white shadow-md overflow-hidden sm:rounded-lg">
          { /* "handleSubmit" will validate your inputs before invoking "onSubmit" */}
          < form onSubmit={handleSubmit(onSubmit)} >
            <div>
              <p className="block mt-1 w-full">
                Maison, appartement ou bureau ?
              </p>
            </div>
            <div>
              {/* register your input into the hook by invoking the "register" function */}
              <Input
                placeholder="Superficie en m²" {...register("surface")}
                className="block mt-1 w-full"
                autoFocus
              />
            </div>
            <div>
              <p className="block mt-1 w-full">
                Quelles sont les caractéristiques de votre espace de travail ?
              </p>
              {/* register your input into the hook by invoking the "register" function */}
              <Input
                placeholder="" {...register("name")}
                className="block mt-1 w-full"
                autoFocus
              />
            </div>
            <div>
              <label htmlFor="kitchen">
                Coin cuisine
              </label>
              <Input type="checkbox" name="kitchen" placeholder="kitchen" {...register("kitchen", {})} />
            </div>
            <div>
              <label htmlFor="kitchen">
                Parking
              </label>
              <Input type="checkbox" placeholder="parking" {...register("parking", {})} />
            </div>
            <div>
              <label htmlFor="kitchen">
                Accès PMR
              </label>
              <Input type="checkbox" placeholder="handicappedPersonAccess" {...register("handicappedPersonAccess", {})} />
            </div>
            <div>
              <label htmlFor="kitchen">
                Nombre d'écrans d'ordinateur
              </label>
              <Input type="number" placeholder="computerScreen" {...register("computerScreen", {})} />
            </div>
            <div>
              <label htmlFor="kitchen">
                Burea
              </label>
              <Input type="number" placeholder="Bureau" {...register("desk", {})} />
            </div>
            <div>
              <label htmlFor="kitchen">
                Projecteurs
              </label>
              <Input type="number" placeholder="projector" {...register("projector", {})} />
            </div>
            <div>
              <label htmlFor="kitchen">
                Description
              </label>
              <textarea {...register("description", {})} />
            </div>
            <div>
              <label htmlFor="kitchen">
                Adresse
              </label>
              <Input type="text" placeholder="adress" {...register("adress", { required: true })} />
            </div>
            <div>
              <label htmlFor="kitchen">
                Ville
              </label>
              <Input type="text" placeholder="city" {...register("city", { required: true })} />
            </div>
            <div>
              <label htmlFor="kitchen">
                Code postal
              </label>
              <Input type="text" placeholder="zipCode" {...register("zipCode", { required: true, max: 5 })} />
            </div>
            <div>
              <label htmlFor="kitchen">
                Département
              </label>
              <Input type="text" placeholder="departement" {...register("departement", { required: true })} />
            </div>
            <div>
              <label htmlFor="kitchen">
                Région
              </label>
              <Input type="text" placeholder="region" {...register("region", { required: true })} />
            </div>

            {/* errors will return when field validation fails  */}
            {errors.exampleRequired && <span>This field is required</span>}
            <div>
              <Button className="ml-3">Ajouter</Button>
            </div>

          </form>
        </div>
      </div>
    </AppLayout >
  );
}