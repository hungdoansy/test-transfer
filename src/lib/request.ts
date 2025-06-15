const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

export async function simulateNetworkDelay<T>(request: () => Promise<T>): Promise<T> {
    const [, result] = await Promise.allSettled([sleep(300), request()])

    if (result.status === "fulfilled") return result.value
    throw result.reason
}
