export default function convertPath(path) {
    const splited =  path.split("\\")
    return `http://localhost:8080/${splited[1]}/${splited[2]}`
}