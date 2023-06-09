import { Button, Card, TextInput } from "@tremor/react"
import { useAddRessourceStore } from "../../Store/addRessourceStore"
import { useEffect, useState } from "react"
import { Controller, FormProvider, useFieldArray, useForm } from "react-hook-form"
import { ResourceForm } from "../Form/ResourceForm"

type Props = {

}
export const AddRessource = ({ }: Props) => {
    const [isNameChoice, setisNameChoice] = useState<boolean>();
    const [setIsOPen] = useAddRessourceStore(state => [state.setIsOPen]);
    const methods = useForm();
    const control = methods.control;

    const { fields, append, prepend, remove, swap, move, insert } = useFieldArray({
        control, // control props comes from useForm (optional: if you are using FormContext)
        name: 'properties', // unique name for your Field Array
    });

    const onSubmit = async (data: any) => {

        const res = await fetch('http://localhost:3001/api/create', {
            method: 'POST', headers: {
                "Content-Type": "application/json",
            }, body: JSON.stringify(data)
        })
        console.log(res);

    }


    return (
        <div>
            <FormProvider {...methods}>
                <form className="h-screen w-screen bg-slate-800 p-5">
                    <h2>Ajout d'une ressource</h2>

                    <div className="flex flex-col gap-3">
                        <Controller
                            control={methods.control}
                            name="name"
                            render={({
                                field: { onChange, onBlur, value, name, ref },
                                fieldState: { invalid, isTouched, isDirty, error },
                                formState,
                            }) => <TextInput ref={ref} value={value} onChange={(e) => onChange(e.target.value)} placeholder="Nom de la nouvelle ressource" />}
                        />
                        {isNameChoice && fields && fields.map((field, index) => <ResourceForm key={field.id} index={index} />)}
                        {methods.watch('name') && !isNameChoice && <Button type="button" className="mt-5" onClick={() => setisNameChoice(true)}>Continuer</Button>}
                        {isNameChoice && <Button type="button" className="mt-5" onClick={() => append({ key: '', type: '' })}>Ajouter une propriétée</Button>}
                        {fields.length > 0 && <Button className="mt-5" onClick={() => methods.handleSubmit(data => onSubmit(data))()}>Envoyer</Button>}
                        <Button type="button" className="mt-5" onClick={() => setIsOPen()}>Fermer</Button>
                    </div>
                </form>
            </FormProvider>
        </div>
    )
}


