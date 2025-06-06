export type ProductType = {
    title: string,
    description: string,
    images: object[],
    available: boolean | null | undefined,
    category?: string,
    material?: string
}
