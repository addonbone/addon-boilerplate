declare module '*.scss';

declare module "*.png" {
    const value: string;
    export default value;
}

declare module "*.apng" {
    const value: string;
    export default value;
}

declare module "element-change" {
    const value: (selector: string, callback: { (): void }) => void;

    export default value;
}
