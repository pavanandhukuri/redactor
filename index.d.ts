export default function redactor(input: any): any;

export type Config = {
    mask?: string;
    textPatterns: string[],
    keyPatterns: string[],
    preserveDataLength?: boolean,
};

export function initialize(config: Config): void;