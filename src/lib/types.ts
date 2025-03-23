/* eslint-disable  @typescript-eslint/no-explicit-any */
export type ProductType = {
    title: string,
    description: string,
    images: object[],
    available: boolean | null | undefined,
    category?: any,
    material?: any
}
