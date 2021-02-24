export function formatDate(date){
    if (!date.getDate) date = new Date(date)
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`
}