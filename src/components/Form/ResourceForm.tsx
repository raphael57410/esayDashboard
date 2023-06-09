import { ChevronRightIcon } from "@heroicons/react/outline"
import { Card, TextInput, SelectBox, SelectBoxItem } from "@tremor/react"
import { Controller, useFormContext } from "react-hook-form"

type Props = {
    index: number
}
export const ResourceForm = ({ index }: Props) => {
    const { control } = useFormContext();



    return (
        <Card>
            <div key={index} className="flex gap-5 ">
                <div className="flex basis-1/2 items-center gap-1">
                    <label>Clé: </label>
                    <Controller
                        control={control}
                        name={`properties.${index}.key`}
                        rules={{ required: true }}
                        render={({
                            field: { onChange, onBlur, value, name, ref },
                            fieldState: { invalid, isTouched, isDirty, error },
                            formState,
                        }) => <TextInput ref={ref} value={value} onChange={(e) => onChange(e.target.value)} placeholder="Ajouterla clé" />}
                    />
                </div>
                <div className="flex basis-1/2 items-center gap-1">
                    <label>Valeur: </label>
                    <Controller
                        control={control}
                        name={`properties.${index}.type`}
                        rules={{ required: true }}
                        render={({
                            field: { onChange, onBlur, value, name, ref },
                            fieldState: { invalid, isTouched, isDirty, error },
                            formState,
                        }) => <SelectBox ref={ref} value={value} onValueChange={(e) => onChange(e)} placeholder="Ajouter le type">
                                <SelectBoxItem value="String" icon={ChevronRightIcon} >
                                    String
                                </SelectBoxItem>
                                <SelectBoxItem value="Number" icon={ChevronRightIcon}>
                                    Number
                                </SelectBoxItem>
                            </SelectBox>}
                    />
                </div>
            </div>
        </Card>)
}
