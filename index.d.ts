export default function redactor(input: any): any;

export type Config = {
    mask?: string;
    keyPatterns: string[],
    textPatterns?: string[],
    envVariableNames?: string[],
    preserveDataLength?: boolean,
};

export function initialize(config: Config): void;