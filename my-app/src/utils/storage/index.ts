export function createOnStorage(key: string, value: string) {
    localStorage.setItem(key, value)
}
export function getFromStorage(key: string) {
    return localStorage.getItem(key)
}
export function deleteFromStorage(key: string) {
    localStorage.removeItem(key)
}
export function updateFromStorage(key: string, value: string) {
    localStorage.removeItem(key)
    localStorage.setItem(key, value)
}