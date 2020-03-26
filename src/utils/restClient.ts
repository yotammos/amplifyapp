export async function getData (request: DetailedRequest | DirectRequest) {
    return ('url' in request)
        ? getDataBasedOnUrl(request)
        : getDataBasedOnPath(request.path, request.host, request.useTls, request.port)
}

export interface DirectRequest {
    url: string
}

export interface DetailedRequest {
    path: string | undefined
    host: string | undefined
    useTls: boolean | undefined
    port: number | undefined
}

async function getDataBasedOnUrl (request: DirectRequest) {
    const res = await fetch(request.url)
    return await res.json()
}

async function getDataBasedOnPath (path: string = '/', host: string = 'localhost', useTls: boolean = false, port: number = 8080) {
    const protocol: string = useTls ? 'https' : 'http'
    const res = await fetch(`${protocol}://${host}:${port}${path}`)
    return await res.json()
}

export async function postData (url: string = '', data = {}) {
    // Default options are marked with *
    const response = await fetch(url, {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
            'Content-Type': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: 'follow', // manual, *follow, error
        referrer: 'no-referrer', // no-referrer, *client
        body: JSON.stringify(data) // body data type must match "Content-Type" header
    })
    return await response.json() // parses JSON response into native JavaScript objects
}
