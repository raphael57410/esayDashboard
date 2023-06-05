export const deleteQuery = async (url: string, id: string) => {
    return await fetch(`${url}/${id}`, { method: 'DELETE' }).then(res => res.json)
}